/**
 * experience.js
 * Auto-updating experience calculator.
 *
 * To change the joining date, update JOINING_DATE below — that is the ONLY
 * place it lives. Format: 'YYYY-MM-DD'.
 */

// ─── Config ───────────────────────────────────────────────────────────────────
export const JOINING_DATE = '2022-02-12';

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Returns the whole years and whole remaining months between joinDate and today.
 *
 * @param {string} joinDate - ISO date string 'YYYY-MM-DD'
 * @param {Date}   [today=new Date()] - reference date (injectable for tests)
 * @returns {{ years: number, months: number }}
 *
 * Algorithm:
 *   - Work with local-midnight dates to avoid timezone/DST off-by-one errors.
 *   - Count whole years: if this year's anniversary has not yet passed, step back one year.
 *   - Count remaining whole months the same way.
 *   - If joinDate is in the future return { years: 0, months: 0 }.
 *
 * Edge-case: joining on Feb 29 — anniversary is Mar 1 in non-leap years
 *   (new Date(year, 1, 29) rolls to Mar 1 automatically in JS, which is correct).
 *
 * Reference: 2026-10-24 from 2022-02-12 → { years: 4, months: 8 }
 */
export function getExperience(joinDate, today = new Date()) {
  // Parse join date at local midnight
  const [jy, jm, jd] = joinDate.split('-').map(Number);
  const join = new Date(jy, jm - 1, jd); // months are 0-indexed

  // Today at local midnight (strips time component)
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Future join date
  if (join > now) return { years: 0, months: 0 };

  let years = now.getFullYear() - join.getFullYear();
  let months = now.getMonth() - join.getMonth();

  // Adjust if anniversary day hasn't passed yet this month
  if (now.getDate() < join.getDate()) {
    months -= 1;
  }

  // Carry: if months went negative, borrow a year
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

// ─── Pluralisation helpers ─────────────────────────────────────────────────────

/** "1&nbsp;yr" / "2&nbsp;yrs" — non-breaking space keeps number+unit together */
function fmtYrs(n) {
  return `${n}\u00a0${n === 1 ? 'yr' : 'yrs'}`;
}

/** "1&nbsp;mo" / "2&nbsp;mos" */
function fmtMos(n) {
  return `${n}\u00a0${n === 1 ? 'mo' : 'mos'}`;
}

/** "1 year" / "2 years" */
function fmtYear(n) {
  return `${n} ${n === 1 ? 'year' : 'years'}`;
}

/** "1 month" / "2 months" */
function fmtMonth(n) {
  return `${n} ${n === 1 ? 'month' : 'months'}`;
}

// ─── DOM update ───────────────────────────────────────────────────────────────

/**
 * Reads JOINING_DATE, computes experience, and updates every experience-bound
 * element in the document.
 *
 * Bound elements:
 *   [data-exp="pill-text"]  — hero pill label  (short: "4 yrs 8 mos of experience")
 *   [data-exp="pill-aria"]  — hero pill aria-label
 *   [data-exp="about-span"] — inline span inside the about paragraph
 */
export function updateExperienceUI() {
  const { years, months } = getExperience(JOINING_DATE);

  // Short pill: numbers in bold purple, "of experience" in lighter text
  // gap:6px on .exp-pill handles spacing; &nbsp; inside each token keeps number+unit unbreakable
  const pillHTML =
    `<span class="exp-num">${fmtYrs(years)}</span>` +
    `<span class="exp-num">${fmtMos(months)}</span>` +
    `<span class="exp-pill__label">of experience</span>`;

  // Plain text version for aria-label
  const ariaLabel = `${fmtYear(years)} and ${fmtMonth(months)} of experience`;

  // Long form for about paragraph: "4 years 8 months"
  const longForm = `${fmtYear(years)} ${fmtMonth(months)}`;

  document.querySelectorAll('[data-exp="pill-text"]').forEach(el => {
    el.innerHTML = pillHTML;
  });

  document.querySelectorAll('[data-exp="pill-aria"]').forEach(el => {
    el.setAttribute('aria-label', ariaLabel);
  });

  document.querySelectorAll('[data-exp="about-span"]').forEach(el => {
    el.textContent = longForm;
  });
}

// ─── Scheduler: recompute at next local midnight + on tab visibility ──────────

let _midnightTimer = null;

function scheduleNextMidnight() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const msUntilMidnight = next - now;

  _midnightTimer = setTimeout(() => {
    updateExperienceUI();
    scheduleNextMidnight(); // reschedule for the following midnight
  }, msUntilMidnight);
}

function handleVisibilityChange() {
  if (!document.hidden) {
    updateExperienceUI();
  }
}

/**
 * Initialise: run once immediately, then keep in sync.
 * Safe to call multiple times — cleans up previous listeners/timers first.
 */
export function initExperience() {
  // Cleanup any previous run
  if (_midnightTimer !== null) {
    clearTimeout(_midnightTimer);
    _midnightTimer = null;
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);

  // Immediate render
  updateExperienceUI();

  // Schedule nightly refresh
  scheduleNextMidnight();

  // Refresh when the user returns to the tab
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
