/* =====================================================================
   admin.js — Admin and Content Manager (admin.html)
   Users, roles and levels (Admin) and scenarios (Admin + Content Manager).
   ===================================================================== */

/* ---------------------------------------------------------------
   ADMIN HELPERS
   --------------------------------------------------------------- */

/** Fills a <select> from [[value, label], ...] and keeps the old choice if it still exists. */
function fillSelect(select, options) {
  const chosen = select.value;
  select.innerHTML = "";
  options.forEach(([value, label]) => { const o = el("option", "", label); o.value = value; select.appendChild(o); });
  if (options.some(o => o[0] === chosen)) select.value = chosen;
}

/** Creates a <select> with a starting value and a function to call when it changes. */
function makeSelect(options, value, onChange) {
  const select = el("select");
  fillSelect(select, options);
  select.value = value;
  select.onchange = () => onChange(select.value);
  return select;
}

/** Creates a small red Delete button. */
function delButton(onClick) {
  const b = el("button", "btn-red btn-small", t("delete"));
  b.onclick = onClick;
  return b;
}

/** Asks "Delete this item?", runs the action if confirmed, then redraws the admin page. */
function confirmDelete(action) {
  if (!confirm(t("confirmDelete"))) return;
  action();
  renderAdmin();
}

/* ---------------------------------------------------------------
   DRAWING THE PAGE
   --------------------------------------------------------------- */

/** Draws the admin page. Users are for Admins; scenarios for both roles. */
function renderAdmin() {
  const me = getUser(), isAdmin = me.role === "admin";
  $("roleBadge").textContent = roleName(me.role);
  $("userSection").classList.toggle("hidden", !isAdmin);
  $("scenarioSection").classList.remove("hidden");

  const levelOptions = levelOrder.map(l => [l, levelName(l)]);
  fillSelect($("scLevel"), levelOptions);
  fillSelect($("scCategory"), Object.keys(catNames).map(k => [k, catName(k)]));
  if (isAdmin) renderUsers(me);
  renderScenarios();
}

/** Changes some fields of one user (role, level...), saves and redraws. */
function updateUser(email, changes) {
  Object.assign(users.find(u => u.email === email), changes);
  save("users", users);
  renderAdmin();
}

/** Draws the users table: role dropdown, level dropdown (learners only) and delete button. */
function renderUsers(me) {
  const body = $("userTable");
  body.innerHTML = "";
  users.forEach(u => {
    const roleSelect = makeSelect(Object.keys(roleKeys).map(r => [r, roleName(r)]), u.role, role => updateUser(u.email, { role }));
    roleSelect.disabled = u.email === me.email;                  // cannot change your own role
    const levelCell = u.role !== "learner" ? "—"
      : makeSelect(levelOrder.map(l => [l, levelName(l)]), u.level, level => updateUser(u.email, { level, streak: 0, mistakes: 0 }));
    addRow(body, [u.name, u.email, roleSelect, levelCell, u.email === me.email ? null : delButton(() => deleteUser(u.email))]);
  });
}

/** Draws the table of all scenarios with delete buttons. */
function renderScenarios() {
  const body = $("scenarioTable");
  body.innerHTML = "";
  scenarios.forEach(s => addRow(body, [s.id, levelName(s.level), catName(s.category), t(s.isPhishing ? "typePhish" : "typeLegit"),
    pick(s.titleEn, s.titleAr), delButton(() => deleteScenario(s.id))]));
}

/* ---------------------------------------------------------------
   USERS AND SCENARIOS
   --------------------------------------------------------------- */

/** Deletes a user after confirmation. */
function deleteUser(email) {
  confirmDelete(() => {
    users = users.filter(u => u.email !== email);
    save("users", users);
  });
}

/** Deletes a scenario after confirmation. */
function deleteScenario(id) {
  confirmDelete(() => {
    scenarios = scenarios.filter(s => s.id !== id);
    save("scenarios", scenarios);
  });
}

/** Adds a user from the Admin's "Add a user" form. */
function addUser() {
  const name = $("newName").value.trim(), email = $("newEmail").value.trim().toLowerCase(), pass = $("newPass").value;
  if (!name || !email || !pass || emailTaken(email)) return setMsg("userMsg", "userExists", false);

  users.push(makeUser(name, email, pass, $("newRole").value));
  save("users", users);
  ["newName", "newEmail", "newPass"].forEach(id => $(id).value = "");
  setMsg("userMsg", "userAdded", true);
  renderAdmin();
}

/** Adds a bilingual scenario from the "Add a scenario" form (all fields are required). */
function addScenario() {
  const fields = ["scSender", "scTitleEn", "scTitleAr", "scBodyEn", "scBodyAr", "scReasonEn", "scReasonAr"];
  const v = id => $(id).value.trim();
  if (fields.some(f => !v(f))) return setMsg("scMsg", "scenarioError", false);

  const isPhishing = $("scType").value === "phishing";
  scenarios.push({
    id: Math.max(0, ...scenarios.map(s => s.id)) + 1,
    level: $("scLevel").value, category: isPhishing ? $("scCategory").value : "legit", isPhishing,
    sender: v("scSender"), titleEn: v("scTitleEn"), titleAr: v("scTitleAr"),
    bodyEn: v("scBodyEn"), bodyAr: v("scBodyAr"), reasonEn: v("scReasonEn"), reasonAr: v("scReasonAr")
  });
  save("scenarios", scenarios);
  fields.forEach(f => $(f).value = "");
  setMsg("scMsg", "scenarioAdded", true);
  renderAdmin();
}

pages.admin = renderAdmin;   // lets core.js redraw this page after a language change

