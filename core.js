
/** Reads a list from localStorage; on first run it saves the fallback and returns that. */
function load(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) return saved;
  } catch (e) { /* ignore broken data */ }
  save(key, fallback);
  return fallback;
}

/** Saves any value to localStorage as JSON. */
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Version of the built-in email set. When data.js gets a new set of emails, change this text:
// the browser then drops its old saved copy (and the results that pointed to it) and uses the new emails.
const SCENARIO_VERSION = "uae-18";
if (localStorage.getItem("scenarioVersion") !== SCENARIO_VERSION) {
  save("scenarios", defaultScenarios);
  save("attempts", []);
  localStorage.setItem("scenarioVersion", SCENARIO_VERSION);
}

let users       = load("users", defaultUsers);
let scenarios   = load("scenarios", defaultScenarios);
let attempts    = load("attempts", []);      // { email, scenarioId, category, level, isCorrect, seconds, time }
let lang        = localStorage.getItem("lang") || "en";
// Accounts saved by an older version stored a hash instead of a password: start again from the demo users
if (users.some(u => u.pass === undefined)) { users = defaultUsers; save("users", users); }

// Page files add their draw function here, e.g. pages.inbox = refreshInbox
const pages = {};

/* ---------------------------------------------------------------
   2. SMALL HELPERS
   --------------------------------------------------------------- */

const $ = id => document.getElementById(id);   // shortcut for getElementById

/** Interface text in the current language (falls back to English). */
function t(key) { return (T[lang] && T[lang][key]) || T.en[key] || key; }

/** Returns the English or Arabic version of a value, depending on the language. */
function pick(en, ar) { return lang === "ar" ? ar : en; }

/** Level name ("Easy") in the current language. */
function levelName(level) { return levelNames[level][lang]; }

/** Category name in the current language. */
function catName(cat) { return catNames[cat] ? catNames[cat][lang] : cat; }

/** Role name ("Admin") in the current language. */
function roleName(role) { return t(roleKeys[role]); }

/** Creates an element with an optional class name and text. */
function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

/** Shows or hides an element with an inline style. */
function show(id, visible) { $(id).style.display = visible ? "block" : "none"; }

/** Percentage rounded to a whole number (0 when there is nothing to divide). */
function percent(part, whole) { return whole ? Math.round(part / whole * 100) : 0; }

/** Number of correct attempts in a list. */
function countRight(list) { return list.filter(a => a.isCorrect).length; }

/** Formats a timestamp as a short local date and time ("—" when empty). */
function fmtDate(ts) {
  return ts ? new Date(ts).toLocaleString(lang === "ar" ? "ar" : "en-GB", { dateStyle: "short", timeStyle: "short" }) : "—";
}

/** Shows a translated status message in an element (green when ok, red when not). */
function setMsg(id, key, ok) {
  $(id).textContent = t(key);
  $(id).className = "msg " + (ok ? "good" : "error");
}

/** Adds a table row. Each cell is text or an element; classes = { cellIndex: className }. */
function addRow(tbody, cells, classes = {}) {
  const row = el("tr");
  cells.forEach((cell, i) => {
    const td = el("td", classes[i]);
    if (cell instanceof Node) td.appendChild(cell); else if (cell !== null) td.textContent = cell;
    row.appendChild(td);
  });
  tbody.appendChild(row);
}

/**
 * Finds the category with the lowest accuracy (used by the inbox for FR-06 and the dashboard).
 * Returns { key, rate } or null. Categories need at least minAttempts attempts to count.
 */
function getWeakestCategory(list, includeLegit, minAttempts) {
  let weak = null;
  for (const key in catNames) {
    if (key === "legit" && !includeLegit) continue;
    const mine = list.filter(a => a.category === key);
    if (mine.length < minAttempts) continue;
    const rate = percent(countRight(mine), mine.length);
    if (!weak || rate < weak.rate) weak = { key, rate };
  }
  return weak;
}

/* ---------------------------------------------------------------
   3. LANGUAGE TOGGLE
   Flexbox flips automatically when body.dir = "rtl".
   --------------------------------------------------------------- */

/** Applies the current language: text direction, all data-i18n texts, then redraws the page. */
function applyLang() {
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  refreshPage();
}

/** Switches between English and Arabic and remembers the choice. */
function toggleLang() {
  lang = lang === "en" ? "ar" : "en";
  localStorage.setItem("lang", lang);
  applyLang();
}

/* ---------------------------------------------------------------
   4. LOGIN / REGISTER / LOGOUT / PAGE GUARD
   --------------------------------------------------------------- */

/** The logged-in user (or undefined when nobody is logged in). */
function getUser() {
  return users.find(u => u.email === localStorage.getItem("currentEmail") && u.isActive !== false);
}

/** Sends a user to the page that matches their role. */
function goToHome(user) { location.href = homePage[user.role]; }

/** Checks the email and password; opens the user's page, or shows an error. */
function login() {
  const email = $("email").value.trim().toLowerCase(), pass = $("password").value;
  const user = users.find(u => u.email.toLowerCase() === email && u.pass === pass && u.isActive !== false);
  if (user) {
    localStorage.setItem("currentEmail", user.email);
    goToHome(user);
  } else {
    $("loginError").textContent = t("loginError");
    $("loginError").classList.remove("hidden");
  }
}

/** Shows the register box and hides the login box. */
function showRegister() { $("loginBox").style.display = "none"; $("registerBox").style.display = "block"; }

/** Shows the login box and hides the register box. */
function showLogin() { $("registerBox").style.display = "none"; $("loginBox").style.display = "block"; }

/** Builds a new user object. */
function makeUser(name, email, pass, role) {
  return { id: Date.now(), name, email, pass, role, level: "Easy", isActive: true, mistakes: 0, phishCorrect: 0 };
}

/** True if an account with this (lowercase) email already exists. */
function emailTaken(email) { return users.some(u => u.email.toLowerCase() === email); }

/** Creates an account from the register form, logs the person in and opens their page.
 *  Self-registration always creates a Student / Employee; only an Admin can change a role (FR-02, NFR-03). */
function registerUser() {
  const name = $("regName").value.trim(), email = $("regEmail").value.trim().toLowerCase();
  const pass = $("regPass").value;
  if (!name || !email || !pass) return setMsg("regMsg", "regEmpty", false);
  if (!email.includes("@")) return setMsg("regMsg", "regBadEmail", false);
  if (emailTaken(email)) return setMsg("regMsg", "regDuplicate", false);

  const newUser = makeUser(name, email, pass, "learner");
  users.push(newUser);
  save("users", users);
  localStorage.setItem("currentEmail", newUser.email);   // log in automatically
  goToHome(newUser);
}

/** Logs out and returns to the login page. */
function logout() {
  localStorage.removeItem("currentEmail");
  location.href = "index.html";
}

/** Returns true if the logged-in user has one of the allowed roles; otherwise goes to login. */
function requireRole(allowedRoles) {
  const user = getUser();
  if (user && allowedRoles.includes(user.role)) return true;
  location.href = "index.html";
  return false;
}

/* ---------------------------------------------------------------
   5. PAGE START-UP
   --------------------------------------------------------------- */

let pageAllowed = true;

/** Redraws the current page (called after a language change). */
function refreshPage() {
  if (pageAllowed && pages[document.body.dataset.page]) pages[document.body.dataset.page]();
}

/** Runs once when the page loads: login redirect or role check, then draws the page. */
function initPage() {
  const page = document.body.dataset.page;
  if (page === "login") {
    const user = getUser();
    if (user) { pageAllowed = false; return goToHome(user); }
    $("password").addEventListener("keydown", e => e.key === "Enter" && login());
    $("regPass").addEventListener("keydown", e => e.key === "Enter" && registerUser());
  } else {
    pageAllowed = requireRole(pageRoles[page]);
  }
  if (pageAllowed) applyLang();
}

// Run once the page (and every script on it) has loaded
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPage);
else initPage();
