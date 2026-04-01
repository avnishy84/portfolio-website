# Design Document: SEO Google Verification

## Overview

This feature adds a Google Site Verification meta tag to all 8 HTML pages of Avnish Yadav's static portfolio website. The tag enables Google Search Console to verify site ownership, unlocking SEO monitoring, indexing insights, and search performance data.

The site is pure static HTML with no build system — changes are direct file edits. The approach is therefore a straightforward, targeted insertion of a single `<meta>` element into each file's `<head>` section.

**Verification tag to insert:**
```html
<meta name="google-site-verification" content="g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4" />
```

**Target files (8 total):**
- `index.html`
- `about.html`
- `contact.html`
- `projects/ai-dress-tryon.html`
- `projects/compufy.html`
- `projects/one-note.html`
- `projects/portfolio.html`
- `projects/team-chat-logs.html`

---

## Architecture

No runtime architecture is introduced. This is a static content change — the verification tag is a passive HTML element read by Google's crawler. There is no JavaScript, no server-side logic, and no build pipeline involved.

```mermaid
flowchart LR
    A[Google Search Console] -->|HTTP GET any page| B[Firebase Hosting CDN]
    B --> C[HTML file served]
    C -->|head contains verification tag| D[Ownership verified]
```

The tag must be present in the `<head>` of every page because Google may crawl any URL as the verification entry point.

---

## Components and Interfaces

There is one logical operation: **head tag insertion**.

### Insertion Rule

For each target HTML file:
1. Locate the `<head>` element.
2. Find the `<meta charset="...">` tag (always the first child of `<head>` per HTML best practice and confirmed in all existing files).
3. Insert the verification tag on the line immediately after the charset meta tag.
4. If the verification tag is already present, skip — do not insert a duplicate.

### Existing `<head>` pattern (all files follow this structure):

```html
<head>
    <meta charset="UTF-8" />
    <!-- INSERT HERE -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>...</title>
    ...
</head>
```

### After insertion:

```html
<head>
    <meta charset="UTF-8" />
    <meta name="google-site-verification" content="g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>...</title>
    ...
</head>
```

---

## Data Models

No new data models. The only data involved is the static string value of the tag:

| Attribute | Value |
|---|---|
| `name` | `google-site-verification` |
| `content` | `g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4` |

The tag is a void element (self-closing, no children) per the HTML5 spec for `<meta>`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Tag presence in all target files

*For any* file in the set of 8 target HTML files, the `<head>` section SHALL contain exactly one element matching `<meta name="google-site-verification" ...>`.

**Validates: Requirements 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 2: Tag position immediately after charset meta

*For any* target HTML file, the sibling element immediately following the `<meta charset>` tag SHALL be the verification tag.

**Validates: Requirements 1.4, 2.6**

### Property 3: Exact attribute values

*For any* occurrence of the verification tag across all target files, the `name` attribute SHALL equal `google-site-verification` and the `content` attribute SHALL equal `g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4`.

**Validates: Requirements 1.5, 1.6**

### Property 4: Existing head elements preserved

*For any* target HTML file, all `<meta>`, `<link>`, `<script>`, and `<title>` elements that existed in `<head>` before the insertion SHALL still be present and unchanged after the insertion.

**Validates: Requirements 3.2**

### Property 5: Idempotent insertion (no duplicates)

*For any* target HTML file that already contains the verification tag, applying the insertion logic again SHALL result in exactly one verification tag — the count SHALL NOT increase.

**Validates: Requirements 3.3**

---

## Error Handling

Since this is a direct static file edit with no runtime logic, error handling applies to the editing process itself:

| Scenario | Handling |
|---|---|
| File does not contain `<meta charset>` | Do not insert; flag the file for manual review |
| Verification tag already present | Skip insertion (idempotence — Property 5) |
| File is not valid HTML | Do not modify; flag for manual review |
| Indentation style varies between files | Match the surrounding indentation of each file |

All 8 target files have been inspected and confirmed to follow the standard `<meta charset="UTF-8" />` pattern as the first child of `<head>`, so no error cases are expected in practice.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. Unit tests verify each specific file; property tests verify the universal rules that must hold across all files.

### Unit Tests

Each unit test reads a specific target file and asserts a concrete fact:

- `index.html` contains the verification tag in `<head>`
- `about.html` contains the verification tag in `<head>`
- `contact.html` contains the verification tag in `<head>`
- `projects/ai-dress-tryon.html` contains the verification tag in `<head>`
- `projects/compufy.html` contains the verification tag in `<head>`
- `projects/one-note.html` contains the verification tag in `<head>`
- `projects/portfolio.html` contains the verification tag in `<head>`
- `projects/team-chat-logs.html` contains the verification tag in `<head>`

These are straightforward file-read + DOM-parse assertions. Use a lightweight HTML parser (e.g., `node-html-parser` or the browser's `DOMParser`) to avoid brittle string matching.

### Property-Based Tests

Property-based testing library: **fast-check** (JavaScript, works with Node.js, no build system required for tests).

Each property test runs a minimum of **100 iterations** (where applicable — for file-set properties, the "iterations" are the 8 target files treated as the input space, supplemented by generated variants for idempotence testing).

**Tag format for each test:**
```
// Feature: seo-google-verification, Property {N}: {property_text}
```

#### Property Test 1 — Tag presence
```
// Feature: seo-google-verification, Property 1: Tag presence in all target files
```
For each of the 8 target files, parse the HTML and assert exactly one `<meta name="google-site-verification">` exists in `<head>`.

#### Property Test 2 — Tag position
```
// Feature: seo-google-verification, Property 2: Tag position immediately after charset meta
```
For each target file, parse the head children, find the charset meta, and assert the next sibling is the verification tag.

#### Property Test 3 — Exact attribute values
```
// Feature: seo-google-verification, Property 3: Exact attribute values
```
For each target file, find the verification tag and assert `name === "google-site-verification"` and `content === "g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4"`.

#### Property Test 4 — Existing elements preserved
```
// Feature: seo-google-verification, Property 4: Existing head elements preserved
```
For each target file, snapshot all head element tag names and key attributes before and after a simulated insertion, then assert the pre-existing set is a subset of the post-insertion set.

#### Property Test 5 — Idempotent insertion
```
// Feature: seo-google-verification, Property 5: Idempotent insertion (no duplicates)
```
Using fast-check, generate arbitrary HTML strings that already contain the verification tag. Apply the insertion logic and assert the count of verification tags remains exactly 1. Run 100+ iterations with varied surrounding content.
