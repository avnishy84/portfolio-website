# Implementation Plan: linkedin-contact-layout

## Overview

Restructure the `#contact` section of `index.html` to display the existing contact form and a new LinkedIn profile panel side-by-side on desktop (≥ 768 px) and stacked on mobile. Add all required CSS classes to `css/style.css`. No new JS files, no new external stylesheets. Tests use the project's existing stack: Node `node:test` + `node-html-parser` + `fast-check`.

---

## Tasks

- [x] 1. Restructure the `#contact` section HTML in `index.html`
  - [x] 1.1 Wrap the existing `#contact-form` in a `.contact-form-col` div and introduce the `.contact-columns` grid wrapper
    - Remove the duplicate `<div class="container">` block currently in `#contact` (the section has two identical containers — collapse to one)
    - Move the `<h2>Get In Touch</h2>` and intro `<p>` outside and above `.contact-columns`, still inside `.container`
    - Wrap the existing `#contact-form` markup in `<div class="contact-form-col">…</div>`
    - Add `<div class="contact-columns">` around `.contact-form-col` and the (not-yet-created) `.linkedin-panel` placeholder
    - Remove the `style="position:relative;overflow:hidden;display: flex;"` inline style from `<section id="contact">` — layout is now handled by CSS classes
    - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.2_

  - [x] 1.2 Add the `.linkedin-panel` HTML inside `.contact-columns`
    - Insert the full LinkedIn panel markup as the second child of `.contact-columns`, after `.contact-form-col`
    - Avatar: `<img src="images/avnish-transparent.png" alt="Avnish Yadav's LinkedIn profile photo" class="lp-avatar" width="80" height="80" onerror="this.style.display='none';this.nextElementSibling.style.opacity='1'">`
    - Fallback: `<div class="lp-avatar-fallback" aria-hidden="true">AY</div>` immediately after the `<img>`
    - Identity block: `<h3 class="lp-name"><i class="fab fa-linkedin" aria-hidden="true"></i> Avnish Yadav</h3>`, `<p class="lp-role">Software Engineer · Full-Stack Developer</p>`, profile URL anchor with `href="https://www.linkedin.com/in/avnishy84/"`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Visit Avnish Yadav's LinkedIn profile"`, visible text `linkedin.com/in/avnishy84`
    - Divider: `<hr class="lp-divider" aria-hidden="true">`
    - Summary paragraph with `.lp-summary`
    - CTA: `<a href="https://www.linkedin.com/in/avnishy84/" class="lp-cta" target="_blank" rel="noopener noreferrer" aria-label="Connect with Avnish Yadav on LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i> Connect on LinkedIn</a>`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1, 5.2, 5.3_

- [x] 2. Add layout and panel CSS to `css/style.css`
  - [x] 2.1 Add `.contact-columns` grid layout rules
    - Desktop rule: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; margin-top: 2rem;`
    - Mobile override inside `@media (max-width: 767px)`: `grid-template-columns: 1fr;`
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4_

  - [x] 2.2 Add `.linkedin-panel` card styles
    - Outer card: `background: var(--color-surface); border-radius: 15px; box-shadow: 0 5px 20px var(--shadow); border: 1px solid rgba(255,255,255,0.07); padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem;`
    - Use `border-radius` in the 14–16 px range (15 px satisfies Requirement 4.3)
    - Use `box-shadow` via `--shadow` (Requirement 4.4)
    - All color values via CSS custom properties only: `--color-surface`, `--color-soft`, `--color-accent`, `--color-accent-2`, `--color-text`, `--color-text-muted`, `--shadow` (Requirement 4.1)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 2.3 Add avatar, identity, divider, and summary sub-component styles
    - `.lp-avatar-wrap`: `position: relative; width: 80px; height: 80px; flex-shrink: 0;`
    - `.lp-avatar`: `width: 80px; height: 80px; border-radius: 50%; object-fit: cover; display: block;`
    - `.lp-avatar-fallback`: `position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(45deg, var(--color-accent), var(--color-accent-2)); display: flex; align-items: center; justify-content: center; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 1.4rem; color: #fff; opacity: 0; transition: opacity 0.2s;`
    - `.lp-identity`: `display: flex; flex-direction: column; gap: 0.3rem;`
    - `.lp-name`: `font-family: 'Montserrat', sans-serif; font-size: 1.15rem; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 0.45rem; margin: 0;`
    - `.lp-name i`: `color: var(--color-accent); font-size: 1.1rem;`
    - `.lp-role`: `font-family: 'Lato', 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-muted); margin: 0;`
    - `.lp-profile-url`: `font-family: 'Lato', 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-accent); text-decoration: none; word-break: break-all;` + hover underline
    - `.lp-divider`: `border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 0;`
    - `.lp-summary`: `font-family: 'Lato', 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.7; margin: 0;`
    - _Requirements: 4.1, 4.5_

  - [x] 2.4 Add `.lp-cta` button styles with focus outline
    - Base: `display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1.4rem; border-radius: 999px; background: linear-gradient(45deg, var(--color-accent), var(--color-accent-2)); color: #fff; font-family: 'Lato', 'Inter', sans-serif; font-weight: 600; font-size: 0.9rem; text-decoration: none; align-self: flex-start; transition: transform 0.2s ease, box-shadow 0.2s ease;`
    - Hover: `transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow);`
    - Focus/focus-visible: `outline: 3px solid var(--color-accent); outline-offset: 3px;` — ensures visible focus ring with ≥ 3:1 contrast (Requirement 5.4)
    - _Requirements: 4.1, 4.5, 5.4_

- [x] 3. Checkpoint — verify HTML and CSS are wired correctly
  - Open `index.html` in a browser at ≥ 768 px and confirm two-column layout renders
  - Resize to ≤ 767 px and confirm single-column stacked layout
  - Confirm "Get In Touch" h2 and intro paragraph span full width above both columns
  - Confirm dark mode colors apply automatically (no JS toggle needed)
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Write DOM/unit tests for the LinkedIn panel
  - [x] 4.1 Create `tests/linkedin-contact-layout.test.js` with Node `node:test` + `node-html-parser`
    - Parse `index.html` once at module level using `readFileSync` + `parse` (same pattern as `seo-google-verification.test.js`)
    - Test: `#contact` contains exactly one `<h2>` with text "Get In Touch" — _Requirements: 6.1_
    - Test: `<h2>` and intro `<p>` appear before `.contact-columns` in DOM order — _Requirements: 6.2_
    - Test: `.linkedin-panel` contains `<h3>` whose text includes "Avnish Yadav" — _Requirements: 3.1_
    - Test: `.linkedin-panel` contains an element whose text includes "Software Engineer · Full-Stack Developer" — _Requirements: 3.2_
    - Test: CTA anchor has `href="https://www.linkedin.com/in/avnishy84/"`, `target="_blank"`, `rel="noopener noreferrer"` — _Requirements: 3.3, 3.4, 5.2_
    - Test: CTA anchor visible text is "Connect on LinkedIn" — _Requirements: 3.4_
    - Test: Font Awesome LinkedIn icon (`fa-linkedin` or `fa-linkedin-in`) is present inside `.lp-name` or `.lp-cta` — _Requirements: 3.5_
    - Test: `<img class="lp-avatar">` has a non-empty `alt` attribute — _Requirements: 5.3_
    - Test: `.lp-profile-url` anchor has `aria-label` attribute — _Requirements: 5.1_
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 6.1, 6.2_

  - [x] 4.2 Write property test for LinkedIn panel required content (Property 1)
    - **Property 1: LinkedIn panel required content is always present**
    - Use `fc.constantFrom('index.html')` as the arbitrary (same pattern as existing PBT tests; extend to other HTML files if the panel is ever replicated)
    - For each sampled file: parse HTML, assert `.linkedin-panel` exists, assert `<h3>` text includes "Avnish Yadav", assert role text includes "Software Engineer · Full-Stack Developer", assert profile URL anchor `href` equals `https://www.linkedin.com/in/avnishy84/`, assert CTA text equals "Connect on LinkedIn"
    - `numRuns: 100`
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

- [x] 5. Write layout/structural tests
  - [x] 5.1 Add layout structure tests to `tests/linkedin-contact-layout.test.js`
    - Test: `.contact-columns` exists as a child of `#contact .container` — _Requirements: 1.3_
    - Test: `.contact-form-col` is the first child of `.contact-columns` and `.linkedin-panel` is the second — _Requirements: 1.2_
    - Test: `#contact-form` is a descendant of `.contact-form-col` — _Requirements: 1.2_
    - Test: `.linkedin-panel` has `aria-label` attribute — _Requirements: 5.1_
    - Test: `.lp-avatar-fallback` element exists and contains text "AY" — _Requirements: 3.6_
    - Test: `<img class="lp-avatar">` has `onerror` attribute — _Requirements: 3.6_
    - _Requirements: 1.2, 1.3, 3.6, 5.1_

  - [x] 5.2 Write unit tests for CSS class presence and attribute correctness
    - Test: `.lp-cta` anchor has `rel="noopener noreferrer"` — _Requirements: 5.2_
    - Test: `.lp-profile-url` anchor has `target="_blank"` — _Requirements: 3.3_
    - Test: `.lp-profile-url` visible text includes `linkedin.com/in/avnishy84` — _Requirements: 3.3_
    - Test: `.lp-divider` element exists inside `.linkedin-panel` — _Requirements: design_
    - _Requirements: 3.3, 5.2_

- [x] 6. Update `package.json` test script and run all tests
  - [x] 6.1 Update the `"test"` script in `package.json` to run both test files
    - Change to: `"node --test tests/seo-google-verification.test.js tests/linkedin-contact-layout.test.js"`
    - _Requirements: all_

  - [x] 6.2 Run the full test suite and confirm all tests pass
    - Execute `npm test` and verify zero failures
    - Fix any assertion mismatches found (e.g., whitespace in text content, selector mismatches)
    - _Requirements: all_

- [x] 7. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The design uses **no pseudocode** — implementation language is HTML + CSS throughout; no language selection was needed
- Tests follow the existing project pattern: Node `node:test` runner + `node-html-parser` + `fast-check` (no Jest, no jsdom, no Playwright)
- Property 1 is the only correctness property defined in the design; all other test tasks are unit/structural assertions
- The duplicate `<div class="container">` block in the current `#contact` section (visible in `index.html`) must be collapsed as part of Task 1.1 — leaving it would produce two "Get In Touch" headings
- Dark mode works automatically because all new CSS uses existing custom properties; no JS changes are needed
- The `border-radius: 15px` on `.linkedin-panel` satisfies the 14–16 px range from Requirement 4.3
- The `onerror` inline attribute on `<img class="lp-avatar">` is the only inline JS in this feature and is explicitly permitted by Requirement 4.6 / design decision

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "4.1"] },
    { "id": 4, "tasks": ["4.2", "5.1"] },
    { "id": 5, "tasks": ["5.2", "6.1"] },
    { "id": 6, "tasks": ["6.2"] }
  ]
}
```
