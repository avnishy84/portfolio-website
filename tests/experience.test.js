/**
 * Unit tests for getExperience()
 * Runner: Node built-in test runner (node --test)
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Import the utility directly (no DOM needed — pure function)
import { getExperience } from '../js/experience.js';

// Helper: build a local-midnight Date from a 'YYYY-MM-DD' string
function d(str) {
  const [y, m, day] = str.split('-').map(Number);
  return new Date(y, m - 1, day);
}

describe('getExperience', () => {

  // ── Spec reference case ────────────────────────────────────────────────────
  it('2026-10-24 → 4 yrs 8 mos', () => {
    const { years, months } = getExperience('2022-02-12', d('2026-10-24'));
    assert.equal(years, 4);
    assert.equal(months, 8);
  });

  // ── Exact anniversary ──────────────────────────────────────────────────────
  it('2027-02-12 (exact anniversary) → 5 yrs 0 mos', () => {
    const { years, months } = getExperience('2022-02-12', d('2027-02-12'));
    assert.equal(years, 5);
    assert.equal(months, 0);
  });

  // ── One day before anniversary ─────────────────────────────────────────────
  it('2027-02-11 → 4 yrs 11 mos', () => {
    const { years, months } = getExperience('2022-02-12', d('2027-02-11'));
    assert.equal(years, 4);
    assert.equal(months, 11);
  });

  // ── Range spanning 29 Feb 2024 (leap year) ─────────────────────────────────
  // From 2024-02-01 to 2024-02-29 = 0 yrs, 0 mos (day 29 > day 1 so no borrow)
  it('2024-02-01 join → 2024-02-29 today = 0 yrs 0 mos', () => {
    const { years, months } = getExperience('2024-02-01', d('2024-02-29'));
    assert.equal(years, 0);
    assert.equal(months, 0);
  });

  // From 2024-01-31 to 2024-03-01: crosses leap day
  // Jan 31 → Mar 1 2024: 1 month + 1 day → whole months = 1, years = 0
  it('2024-01-31 join → 2024-03-01 today = 0 yrs 1 mo (spans leap day)', () => {
    const { years, months } = getExperience('2024-01-31', d('2024-03-01'));
    assert.equal(years, 0);
    assert.equal(months, 1);
  });

  // From 2024-02-29 to 2025-02-28: non-leap year anniversary
  // JS Date(2025, 1, 29) → 2025-03-01, so today(Feb 28) < anniversary day 29 → borrow
  // years = 0, months = 11
  it('2024-02-29 join → 2025-02-28 today = 0 yrs 11 mos (leap-year join date edge case)', () => {
    const { years, months } = getExperience('2024-02-29', d('2025-02-28'));
    assert.equal(years, 0);
    assert.equal(months, 11);
  });

  // ── Future join date ───────────────────────────────────────────────────────
  it('future join date → { years: 0, months: 0 }', () => {
    const { years, months } = getExperience('2099-01-01', d('2026-10-24'));
    assert.equal(years, 0);
    assert.equal(months, 0);
  });

  // ── Same day as join → 0, 0 ───────────────────────────────────────────────
  it('join date === today → { years: 0, months: 0 }', () => {
    const { years, months } = getExperience('2022-02-12', d('2022-02-12'));
    assert.equal(years, 0);
    assert.equal(months, 0);
  });

  // ── Just one day after join → 0, 0 ────────────────────────────────────────
  it('one day after join → { years: 0, months: 0 }', () => {
    const { years, months } = getExperience('2022-02-12', d('2022-02-13'));
    assert.equal(years, 0);
    assert.equal(months, 0);
  });

  // ── Exactly one month ─────────────────────────────────────────────────────
  it('exactly one month later → { years: 0, months: 1 }', () => {
    const { years, months } = getExperience('2022-02-12', d('2022-03-12'));
    assert.equal(years, 0);
    assert.equal(months, 1);
  });

  // ── Month-end: Jan 31 join, Feb 28 today (non-leap) → 0 mos ───────────────
  it('Jan 31 join → Feb 28 today (non-leap) = 0 yrs 0 mos (day 28 < 31)', () => {
    const { years, months } = getExperience('2023-01-31', d('2023-02-28'));
    assert.equal(years, 0);
    assert.equal(months, 0);
  });

  // ── Month-end: Jan 31 join, Mar 1 today → 1 mo ────────────────────────────
  it('Jan 31 join → Mar 1 today = 0 yrs 1 mo', () => {
    const { years, months } = getExperience('2023-01-31', d('2023-03-01'));
    assert.equal(years, 0);
    assert.equal(months, 1);
  });

});
