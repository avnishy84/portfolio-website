# Implementation Plan: SEO Keyword Optimization

## Overview

Add comprehensive on-page SEO metadata to all 8 pages of the portfolio, then create a test file covering unit tests and all 13 property-based tests. All changes are direct edits to static HTML files — no build system involved.

## Tasks

- [x] 1. Add SEO tags to `index.html`
  - Update `<title>` to: `Avnish Yadav — Software Engineer & Full-Stack Developer`
  - Add `<meta name="description" content="Avnish Yadav is a Software Engineer and Full-Stack Developer with 4+ years of experience in C#, .NET, SQL Server, and JavaScript. Explore his portfolio of projects." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/" />`
  - Add `<link rel="icon" href="/images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="website"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Append JSON-LD Person schema `<script type="application/ld+json">` block at end of `<head>`
  - Append JSON-LD WebSite schema `<script type="application/ld+json">` block at end of `<head>`
  - Verify existing `<h1>` already reads `Hi, I'm Avnish Yadav` (no change needed)
  - Verify `#about` second paragraph contains a Secondary_Keyword naturally (no change needed)
  - _Requirements: 1.1, 1.5, 1.6, 2.1, 2.2, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 6.1–6.7, 7.1–7.5, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2_

- [x] 2. Add SEO tags to `about.html`
  - Update `<title>` to: `About Avnish Yadav — Software Engineer`
  - Add `<meta name="description" content="Learn about Avnish Yadav, a Software Engineer with expertise in C#, .NET, React, Angular, and AI-assisted development. Based in Pune, India." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/about.html" />`
  - Add `<link rel="icon" href="/images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="website"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - _Requirements: 1.2, 1.5, 1.6, 2.1, 2.3, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 8.3, 8.4, 8.5, 9.1_

- [x] 3. Add SEO tags to `contact.html`
  - Update `<title>` to: `Contact Avnish Yadav — Software Engineer`
  - Add `<meta name="description" content="Get in touch with Avnish Yadav, Software Engineer and Full-Stack Developer. Available for new opportunities and exciting projects." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/contact.html" />`
  - Add `<link rel="icon" href="/images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="website"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - _Requirements: 1.3, 1.5, 1.6, 2.1, 2.4, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 8.3, 8.4, 8.5, 9.1_

- [x] 4. Add SEO tags to `projects/compufy.html`
  - Update `<title>` to: `Compufy Technology — Avnish Yadav`
  - Add `<meta name="description" content="Compufy Technology: a corporate marketing website built by Avnish Yadav using Angular 18 SSR, Tailwind CSS, and Firebase with a hidden rocket game easter egg." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/projects/compufy.html" />`
  - Add `<link rel="icon" href="../images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="article"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Update `<h1>Compufy Technology</h1>` to `<h1>Compufy Technology — Avnish Yadav</h1>`
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.4, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3_

- [x] 5. Add SEO tags to `projects/one-note.html`
  - Update `<title>` to: `One Note — Avnish Yadav`
  - Add `<meta name="description" content="One Note: a fast, secure note-taking web app built by Avnish Yadav with cloud sync, rich text formatting, Firebase auth, and a hidden Snake game easter egg." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/projects/one-note.html" />`
  - Add `<link rel="icon" href="../images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="article"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Update `<h1>One Note</h1>` to `<h1>One Note — Avnish Yadav</h1>`
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.4, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3_

- [x] 6. Add SEO tags to `projects/team-chat-logs.html`
  - Update `<title>` to: `TeamChatLogs — Avnish Yadav`
  - Add `<meta name="description" content="TeamChatLogs: a Chrome Extension built by Avnish Yadav that exports full Microsoft Teams chat history to a plain-text file with one click. 87 tests." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/projects/team-chat-logs.html" />`
  - Add `<link rel="icon" href="../images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="article"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Update `<h1>TeamChatLogs</h1>` to `<h1>TeamChatLogs — Avnish Yadav</h1>`
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.4, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3_

- [x] 7. Add SEO tags to `projects/portfolio.html`
  - Update `<title>` to: `Portfolio Website — Avnish Yadav`
  - Add `<meta name="description" content="Portfolio Website: a fully responsive personal portfolio built by Avnish Yadav in under a day using prompt engineering and agentic AI workflows with Kiro." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/projects/portfolio.html" />`
  - Add `<link rel="icon" href="../images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="article"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Update `<h1>Modern Portfolio Website</h1>` to `<h1>Modern Portfolio Website — Avnish Yadav</h1>`
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.4, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3_

- [x] 8. Add SEO tags to `projects/ai-dress-tryon.html`
  - Update `<title>` to: `AI Dress Try-On App — Avnish Yadav`
  - Add `<meta name="description" content="AI Dress Try-On App: a virtual fitting room built by Avnish Yadav powered by Google Gemini Nano and Banana AI for realistic outfit try-on results." />`
  - Add `<meta name="author" content="Avnish Yadav" />`
  - Add `<meta name="robots" content="index, follow" />`
  - Add `<link rel="canonical" href="https://avnish-portfolio-c14e6.web.app/projects/ai-dress-tryon.html" />`
  - Add `<link rel="icon" href="../images/favicon.ico" />`
  - Add all 5 OG tags: `og:type="article"`, `og:title`, `og:description`, `og:url`, `og:image`
  - Add all 4 Twitter Card tags: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
  - Update `<h1>AI Dress Try-On App</h1>` to `<h1>AI Dress Try-On App — Avnish Yadav</h1>`
  - _Requirements: 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.1, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.4, 8.3, 8.4, 8.5, 8.6, 9.1, 9.3_

- [x] 9. Create `tests/seo-keyword-optimization.test.js` with unit tests
  - Import `node:fs`, `node:path`, `node:url`, `node:test`, `node:assert/strict`, `node-html-parser`, and `fast-check` (same pattern as `tests/seo-google-verification.test.js`)
  - Define `TARGET_FILES` array (all 8 pages) and `PROJECT_FILES` array (5 project pages)
  - Define `BASE_URL = 'https://avnish-portfolio-c14e6.web.app'` and `OG_IMAGE` constant
  - Write unit test: `index.html` title equals `"Avnish Yadav — Software Engineer & Full-Stack Developer"` — _Requirements: 1.1_
  - Write unit test: `about.html` title equals `"About Avnish Yadav — Software Engineer"` — _Requirements: 1.2_
  - Write unit test: `contact.html` title equals `"Contact Avnish Yadav — Software Engineer"` — _Requirements: 1.3_
  - Write unit test: `index.html` meta description contains `"Avnish Yadav"` and `"Software Engineer"` — _Requirements: 2.2_
  - Write unit test: `index.html` `og:type` equals `"website"` — _Requirements: 3.2_
  - Write unit test: `index.html` canonical href equals `"https://avnish-portfolio-c14e6.web.app/"` — _Requirements: 5.3_
  - Write unit test: `index.html` Person schema has correct `@type`, `name`, `url`, `jobTitle`, `sameAs` (LinkedIn + GitHub), and `knowsAbout` (≥5 skills) — _Requirements: 6.1–6.7_
  - Write unit test: `index.html` WebSite schema has correct `@type`, `name`, `url`, and `author.name` — _Requirements: 7.1–7.5_
  - Write unit test: `index.html` `<h1>` contains `"Avnish Yadav"` — _Requirements: 8.1_
  - Write unit test: `index.html` `#about` section text contains a Secondary_Keyword — _Requirements: 8.2_
  - Write unit test: `index.html` favicon href equals `"/images/favicon.ico"` — _Requirements: 9.2_

- [x] 10. Add all 13 property tests to `tests/seo-keyword-optimization.test.js`
  - [x] 10.1 Write property test for Property 1: title contains "Avnish Yadav" on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert `<title>` text includes `"Avnish Yadav"`
    - `// Feature: seo-keyword-optimization, Property 1: Title contains primary keyword`
    - _Validates: Requirements 1.6_
  - [x] 10.2 Write property test for Property 2: title length in [50, 60] on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert title length `>= 50` and `<= 60`
    - `// Feature: seo-keyword-optimization, Property 2: Title length is within SEO bounds`
    - _Validates: Requirements 1.5_
  - [x] 10.3 Write property test for Property 3: meta description exists and length in [140, 160] on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert `meta[name="description"]` exists and content length `>= 140` and `<= 160`
    - `// Feature: seo-keyword-optimization, Property 3: Meta description presence and length`
    - _Validates: Requirements 2.1, 2.6_
  - [x] 10.4 Write property test for Property 4: OG tags completeness and consistency on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert all 5 OG tags present; `og:title` === title; `og:description` === meta description; `og:url` starts with base URL; `og:image` === OG_IMAGE constant
    - `// Feature: seo-keyword-optimization, Property 4: Open Graph tags completeness and consistency`
    - _Validates: Requirements 3.1, 3.3, 3.4, 3.5, 3.6_
  - [x] 10.5 Write property test for Property 5: Twitter Card tags completeness and consistency on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert all 4 Twitter tags present; `twitter:card` === `"summary_large_image"`; `twitter:title` === title; `twitter:description` === meta description; `twitter:image` === OG_IMAGE constant
    - `// Feature: seo-keyword-optimization, Property 5: Twitter Card tags completeness and consistency`
    - _Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 10.6 Write property test for Property 6: canonical URL present and HTTPS on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert `link[rel="canonical"]` exists and `href` starts with `"https://avnish-portfolio-c14e6.web.app"`
    - `// Feature: seo-keyword-optimization, Property 6: Canonical URL presence and HTTPS format`
    - _Validates: Requirements 5.1, 5.2_
  - [x] 10.7 Write property test for Property 7: semantic HTML signals on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert `<html lang="en">`, `meta[name="author"][content="Avnish Yadav"]` exists, `meta[name="robots"][content="index, follow"]` exists
    - `// Feature: seo-keyword-optimization, Property 7: Semantic HTML signals on every page`
    - _Validates: Requirements 8.3, 8.4, 8.5_
  - [x] 10.8 Write property test for Property 8: favicon present on all 8 pages
    - Generator: `fc.constantFrom(...TARGET_FILES)`, `numRuns: 100`
    - Assert `link[rel="icon"]` exists in `<head>`
    - `// Feature: seo-keyword-optimization, Property 8: Favicon present on every page`
    - _Validates: Requirements 9.1_
  - [x] 10.9 Write property test for Property 9: project page title ends with "— Avnish Yadav"
    - Generator: `fc.constantFrom(...PROJECT_FILES)`, `numRuns: 100`
    - Assert title text ends with `"— Avnish Yadav"`
    - `// Feature: seo-keyword-optimization, Property 9: Project page title follows naming pattern`
    - _Validates: Requirements 1.4_
  - [x] 10.10 Write property test for Property 10: project canonical URL contains "/projects/"
    - Generator: `fc.constantFrom(...PROJECT_FILES)`, `numRuns: 100`
    - Assert canonical `href` includes `"/projects/"`
    - `// Feature: seo-keyword-optimization, Property 10: Project page canonical URL contains projects path`
    - _Validates: Requirements 5.4_
  - [x] 10.11 Write property test for Property 11: project page h1 contains "Avnish Yadav"
    - Generator: `fc.constantFrom(...PROJECT_FILES)`, `numRuns: 100`
    - Assert first `<h1>` text includes `"Avnish Yadav"`
    - `// Feature: seo-keyword-optimization, Property 11: Project page h1 contains primary keyword`
    - _Validates: Requirements 8.6_
  - [x] 10.12 Write property test for Property 12: project favicon uses relative path `"../images/favicon.ico"`
    - Generator: `fc.constantFrom(...PROJECT_FILES)`, `numRuns: 100`
    - Assert `link[rel="icon"]` `href` equals `"../images/favicon.ico"`
    - `// Feature: seo-keyword-optimization, Property 12: Project page favicon uses relative path`
    - _Validates: Requirements 9.3_
  - [x] 10.13 Write property test for Property 13: meta descriptions are unique across all 8 pages
    - Single run (not `fc.property`) — read all 8 files, collect all description content values, assert all are distinct
    - `// Feature: seo-keyword-optimization, Property 13: Meta descriptions are unique across all pages`
    - _Validates: Requirements 2.5_

- [x] 11. Checkpoint — run tests and confirm all pass
  - Run `node --test tests/seo-keyword-optimization.test.js`
  - All unit tests and property tests must pass with zero failures
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- OG image URL for all pages: `https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png`
- Root pages use favicon path `/images/favicon.ico`; project pages use `../images/favicon.ico`
- JSON-LD schemas (Person + WebSite) are added to `index.html` only
- Tag insertion order within `<head>`: charset → google-site-verification → viewport → title → description → author → robots → canonical → favicon → OG tags → Twitter tags → stylesheets/fonts
- Property tests use `fc.constantFrom(...TARGET_FILES)` with `numRuns: 100`, matching the pattern in `tests/seo-google-verification.test.js`
