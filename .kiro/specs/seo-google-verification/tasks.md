# Implementation Plan: SEO Google Verification

## Overview

Direct insertion of the Google Site Verification meta tag into the `<head>` of all 8 target HTML files, immediately after `<meta charset>`. Includes property-based and unit tests using fast-check and node-html-parser.

## Tasks

- [x] 1. Install test dependencies and set up test file
  - Add `fast-check` and `node-html-parser` as devDependencies via `npm install --save-dev fast-check node-html-parser`
  - Create `tests/seo-google-verification.test.js` with imports and the list of 8 target file paths
  - Add a `"test"` script to `package.json` if not present: `"test": "node --test tests/seo-google-verification.test.js"`
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Insert verification tag into root pages
  - [x] 2.1 Edit `index.html` — add `<meta name="google-site-verification" content="g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4" />` on the line immediately after `<meta charset="UTF-8" />`
    - _Requirements: 1.1, 1.4, 1.5, 1.6_
  - [x] 2.2 Edit `about.html` — same insertion after `<meta charset>`
    - _Requirements: 1.2, 1.4, 1.5, 1.6_
  - [x] 2.3 Edit `contact.html` — same insertion after `<meta charset>`
    - _Requirements: 1.3, 1.4, 1.5, 1.6_

- [x] 3. Insert verification tag into project detail pages
  - [x] 3.1 Edit `projects/ai-dress-tryon.html` — add verification tag immediately after `<meta charset>`
    - _Requirements: 2.1, 2.6_
  - [x] 3.2 Edit `projects/compufy.html` — same insertion
    - _Requirements: 2.2, 2.6_
  - [x] 3.3 Edit `projects/one-note.html` — same insertion
    - _Requirements: 2.3, 2.6_
  - [x] 3.4 Edit `projects/portfolio.html` — same insertion
    - _Requirements: 2.4, 2.6_
  - [x] 3.5 Edit `projects/team-chat-logs.html` — same insertion
    - _Requirements: 2.5, 2.6_

- [x] 4. Write unit tests — one assertion per target file
  - [x] 4.1 Write unit tests in `tests/seo-google-verification.test.js` that read each of the 8 HTML files, parse with `node-html-parser`, and assert the verification tag exists inside `<head>`
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_
  - [x] 4.2 Write property test for tag presence across all target files (Property 1)
    - **Property 1: Tag presence in all target files**
    - **Validates: Requirements 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5**
    - Use `fc.constantFrom(...targetFiles)` to sample files; assert exactly one `<meta name="google-site-verification">` in `<head>`
  - [x] 4.3 Write property test for tag position after charset meta (Property 2)
    - **Property 2: Tag position immediately after charset meta**
    - **Validates: Requirements 1.4, 2.6**
    - For each target file, find head children, locate charset meta, assert next sibling is the verification tag
  - [x] 4.4 Write property test for exact attribute values (Property 3)
    - **Property 3: Exact attribute values**
    - **Validates: Requirements 1.5, 1.6**
    - For each target file, find the verification tag and assert `name === "google-site-verification"` and `content === "g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4"`
  - [x] 4.5 Write property test for existing head elements preserved (Property 4)
    - **Property 4: Existing head elements preserved**
    - **Validates: Requirements 3.2**
    - Snapshot all head element tag names and key attributes; assert the pre-existing set is a subset of the post-insertion set
  - [x] 4.6 Write property test for idempotent insertion (Property 5)
    - **Property 5: Idempotent insertion (no duplicates)**
    - **Validates: Requirements 3.3**
    - Use `fc.string()` to generate arbitrary surrounding HTML content; wrap it with a head already containing the verification tag; apply insertion logic; assert count remains exactly 1 across 100+ iterations

- [x] 5. Checkpoint — Ensure all tests pass
  - Run `npm test` and confirm all unit tests and any implemented property tests pass. Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- The verification tag is a void element — no closing tag, no inner content (Requirement 3.1)
- Match the indentation style of each file when inserting (4-space indent in all confirmed target files)
- Property tests use `fast-check`; unit tests use Node's built-in `node:test` runner
