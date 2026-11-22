/* =====================================================================
   dashboard.js — Security Manager dashboard (dashboard.html)
   Totals, correct rate, weakest topic and accuracy bars.
   ===================================================================== */

/** Draws the three cards and one accuracy bar per category. */
function renderDashboard() {
  $("totalAttempts").textContent = attempts.length;
  $("correctRate").textContent = percent(countRight(attempts), attempts.length) + "%";
  const weak = getWeakestCategory(attempts, false, 1);          // same check the learner inbox uses
  $("weakestTopic").textContent = weak ? catName(weak.key) : "—";

  const bars = $("bars");
  bars.innerHTML = "";
  for (const key in catNames) {
    const mine = attempts.filter(a => a.category === key);
    const rate = percent(countRight(mine), mine.length);
    const secs = mine.reduce((sum, a) => sum + a.seconds, 0);

    const label = el("div", "bar-label");
    label.appendChild(el("span", "", catName(key)));
    label.appendChild(el("span", "", mine.length ? `${rate}%  (${mine.length} ${t("attemptsWord")}, ${t("avgTime")} ${Math.round(secs / mine.length)}${t("sec")})` : t("noData")));

    const fill = el("div", "bar-fill" + (rate < 40 ? " low" : rate < 70 ? " mid" : ""));
    fill.style.width = rate + "%";
    const bg = el("div", "bar-bg");
    bg.appendChild(fill);

    const row = el("div", "bar-row");
    row.appendChild(label);
    row.appendChild(bg);
    bars.appendChild(row);
  }
}

/** Deletes every saved result after confirmation. */
function resetAttempts() {
  if (!confirm(t("confirmReset"))) return;
  attempts = [];
  save("attempts", attempts);
  renderDashboard();
}

/** Fills the dashboard with 40 fake results so the demo looks good. */
function loadDemoData() {
  const chance = { credential: 0.45, invoice: 0.65, prize: 0.85, impersonation: 0.3, legit: 0.8 };
  for (let i = 0; i < 40; i++) {
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    attempts.push({
      email: "student@demo.com", scenarioId: s.id, category: s.category, level: s.level,
      isCorrect: Math.random() < (chance[s.category] ?? 0.6),
      seconds: 4 + Math.floor(Math.random() * 36),
      time: Date.now() - Math.floor(Math.random() * 7 * 24 * 3600 * 1000)
    });
  }
  save("attempts", attempts);
  renderDashboard();
}

pages.dashboard = renderDashboard;   // lets core.js redraw this page after a language change

