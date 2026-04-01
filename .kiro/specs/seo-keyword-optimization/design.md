# Design Document: SEO Keyword Optimization

## Overview

This feature adds comprehensive on-page SEO metadata to all 8 pages of Avnish Yadav's static HTML portfolio to rank for personal brand keywords — primarily "Avnish Yadav" and related queries. The site is a static HTML portfolio hosted on Firebase at `https://avnish-portfolio-c14e6.web.app/` with no build system. All changes are direct edits to HTML files.

The 8 target pages are:
- `index.html` — main portfolio page
- `about.html` — about page (currently empty body)
- `contact.html` — contact page (currently empty body)
- `projects/compufy.html`
- `projects/one-note.html`
- `projects/team-chat-logs.html`
- `projects/portfolio.html`
- `projects/ai-dress-tryon.html`

---

## Architecture

There is no runtime logic, build pipeline, or templating engine. Every SEO element is a static string hardcoded directly into each HTML file's `<head>`. The implementation is purely additive — inserting new `<meta>`, `<link>`, and `<script>` tags into existing `<head>` blocks without modifying any existing tags or body content (except the `<h1>` keyword placement on project pages).

```
Static HTML files (8 pages)
└── <head> block
    ├── <title>                          ← meta title (already exists, update value)
    ├── <meta name="description">        ← ADD: meta description
    ├── <meta name="author">             ← ADD: author meta
    ├── <meta name="robots">             ← ADD: robots meta
    ├── <link rel="canonical">           ← ADD: canonical URL
    ├── <link rel="icon">                ← ADD: favicon
    ├── <meta property="og:*"> (×5)      ← ADD: Open Graph tags
    ├── <meta name="twitter:*"> (×4)     ← ADD: Twitter Card tags
    └── <script type="application/ld+json"> (×2, index only) ← ADD: JSON-LD schemas
```

No JavaScript, no server-side rendering, no dynamic tag injection. Tests read the HTML files from disk and parse them with `node-html-parser`, consistent with the existing `tests/seo-google-verification.test.js` setup.

---

## Components and Interfaces

### Head Block Template (all pages)

Every page's `<head>` receives this set of tags (in addition to existing tags). The order within `<head>` follows SEO best practice: charset → verification → viewport → title → description → author → robots → canonical → favicon → OG tags → Twitter tags → stylesheets → fonts.

```html
<!-- Meta title (update existing <title>) -->
<title>{PAGE_TITLE}</title>

<!-- Meta description -->
<meta name="description" content="{PAGE_DESCRIPTION}" />

<!-- Author and robots -->
<meta name="author" content="Avnish Yadav" />
<meta name="robots" content="index, follow" />

<!-- Canonical URL -->
<link rel="canonical" href="{CANONICAL_URL}" />

<!-- Favicon -->
<link rel="icon" href="{FAVICON_PATH}" />

<!-- Open Graph -->
<meta property="og:type" content="{OG_TYPE}" />
<meta property="og:title" content="{PAGE_TITLE}" />
<meta property="og:description" content="{PAGE_DESCRIPTION}" />
<meta property="og:url" content="{CANONICAL_URL}" />
<meta property="og:image" content="https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{PAGE_TITLE}" />
<meta name="twitter:description" content="{PAGE_DESCRIPTION}" />
<meta name="twitter:image" content="https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png" />
```

For `index.html` only, two JSON-LD `<script>` blocks are appended at the end of `<head>` (see Data Models section).

### Favicon Path Convention

| Page location | Favicon href |
|---|---|
| Root pages (`index.html`, `about.html`, `contact.html`) | `/images/favicon.ico` |
| Project pages (`projects/*.html`) | `../images/favicon.ico` |

---

## Data Models

### Per-Page SEO Values

| Page | Title | Description | Canonical URL | og:type |
|---|---|---|---|---|
| `index.html` | Avnish Yadav — Software Engineer & Full-Stack Developer | Avnish Yadav is a Software Engineer and Full-Stack Developer with 4+ years of experience in C#, .NET, SQL Server, and JavaScript. Explore his portfolio of projects. | https://avnish-portfolio-c14e6.web.app/ | website |
| `about.html` | About Avnish Yadav — Software Engineer | Learn about Avnish Yadav, a Software Engineer with expertise in C#, .NET, React, Angular, and AI-assisted development. Based in Pune, India. | https://avnish-portfolio-c14e6.web.app/about.html | website |
| `contact.html` | Contact Avnish Yadav — Software Engineer | Get in touch with Avnish Yadav, Software Engineer and Full-Stack Developer. Available for new opportunities and exciting projects. | https://avnish-portfolio-c14e6.web.app/contact.html | website |
| `projects/compufy.html` | Compufy Technology — Avnish Yadav | Compufy Technology: a corporate marketing website built by Avnish Yadav using Angular 18 SSR, Tailwind CSS, and Firebase with a hidden rocket game easter egg. | https://avnish-portfolio-c14e6.web.app/projects/compufy.html | article |
| `projects/one-note.html` | One Note — Avnish Yadav | One Note: a fast, secure note-taking web app built by Avnish Yadav with cloud sync, rich text formatting, Firebase auth, and a hidden Snake game easter egg. | https://avnish-portfolio-c14e6.web.app/projects/one-note.html | article |
| `projects/team-chat-logs.html` | TeamChatLogs — Avnish Yadav | TeamChatLogs: a Chrome Extension built by Avnish Yadav that exports full Microsoft Teams chat history to a plain-text file with one click. 87 tests. | https://avnish-portfolio-c14e6.web.app/projects/team-chat-logs.html | article |
| `projects/portfolio.html` | Portfolio Website — Avnish Yadav | Portfolio Website: a fully responsive personal portfolio built by Avnish Yadav in under a day using prompt engineering and agentic AI workflows with Kiro. | https://avnish-portfolio-c14e6.web.app/projects/portfolio.html | article |
| `projects/ai-dress-tryon.html` | AI Dress Try-On App — Avnish Yadav | AI Dress Try-On App: a virtual fitting room built by Avnish Yadav powered by Google Gemini Nano and Banana AI for realistic outfit try-on results. | https://avnish-portfolio-c14e6.web.app/projects/ai-dress-tryon.html | article |

All titles are 50–60 characters. All descriptions are 140–160 characters. All contain "Avnish Yadav".

### OG Image URL (all pages)

```
https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png
```

### JSON-LD Person Schema (`index.html` only)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Avnish Yadav",
  "url": "https://avnish-portfolio-c14e6.web.app/",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://www.linkedin.com/in/avnishy84/",
    "https://github.com/avnishy84"
  ],
  "knowsAbout": [
    "C#",
    ".NET",
    "SQL Server",
    "JavaScript",
    "React",
    "Angular",
    "Prompt Engineering",
    "Generative AI"
  ]
}
```

### JSON-LD WebSite Schema (`index.html` only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Avnish Yadav — Portfolio",
  "url": "https://avnish-portfolio-c14e6.web.app/",
  "author": {
    "@type": "Person",
    "name": "Avnish Yadav"
  }
}
```

Both schemas are placed in separate `<script type="application/ld+json">` blocks at the end of `<head>` in `index.html`.

### Semantic HTML — `index.html` `<h1>` (already correct)

The existing `<h1>` in `index.html` already reads `Hi, I'm Avnish Yadav` — the Primary_Keyword is present. No change needed.

### Semantic HTML — `#about` section keyword placement

The existing `#about` body text already contains "Software Engineer" and references to C#, .NET, and JavaScript. The phrase "Avnish Yadav Software Engineer" or "Avnish Yadav Full Stack Developer" needs to appear naturally. The second paragraph will be updated to include a secondary keyword naturally.

### Semantic HTML — Project page `<h1>` values

Project pages already follow the pattern `[Project Name]` in their `<h1>`. The `<h1>` on each project page needs to include "Avnish Yadav" to satisfy requirement 8.6. Updated values:

| Page | Current `<h1>` | Updated `<h1>` |
|---|---|---|
| `projects/compufy.html` | Compufy Technology | Compufy Technology — Avnish Yadav |
| `projects/one-note.html` | One Note | One Note — Avnish Yadav |
| `projects/team-chat-logs.html` | TeamChatLogs | TeamChatLogs — Avnish Yadav |
| `projects/portfolio.html` | Modern Portfolio Website | Modern Portfolio Website — Avnish Yadav |
| `projects/ai-dress-tryon.html` | AI Dress Try-On App | AI Dress Try-On App — Avnish Yadav |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Title contains primary keyword

*For any* page in the portfolio site, the `<title>` element content must contain the string "Avnish Yadav".

**Validates: Requirements 1.6**

### Property 2: Title length is within SEO bounds

*For any* page in the portfolio site, the `<title>` element content must have a character length between 50 and 60 (inclusive).

**Validates: Requirements 1.5**

### Property 3: Meta description presence and length

*For any* page in the portfolio site, a `<meta name="description">` tag must exist in `<head>` and its `content` attribute must have a character length between 140 and 160 (inclusive).

**Validates: Requirements 2.1, 2.6**

### Property 4: Open Graph tags completeness and consistency

*For any* page in the portfolio site, all five OG tags (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`) must be present in `<head>`, `og:title` must equal the `<title>` content, `og:description` must equal the meta description content, `og:url` must start with `https://avnish-portfolio-c14e6.web.app`, and `og:image` must be the absolute URL `https://avnish-portfolio-c14e6.web.app/images/avnish-transparent.png`.

**Validates: Requirements 3.1, 3.3, 3.4, 3.5, 3.6**

### Property 5: Twitter Card tags completeness and consistency

*For any* page in the portfolio site, all four Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) must be present in `<head>`, `twitter:card` must equal `"summary_large_image"`, `twitter:title` must equal the `<title>` content, `twitter:description` must equal the meta description content, and `twitter:image` must equal the `og:image` value.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 6: Canonical URL presence and HTTPS format

*For any* page in the portfolio site, a `<link rel="canonical">` tag must exist in `<head>` and its `href` attribute must start with `https://avnish-portfolio-c14e6.web.app`.

**Validates: Requirements 5.1, 5.2**

### Property 7: Semantic HTML signals on every page

*For any* page in the portfolio site, the `<html>` element must have `lang="en"`, a `<meta name="author" content="Avnish Yadav">` tag must exist in `<head>`, and a `<meta name="robots" content="index, follow">` tag must exist in `<head>`.

**Validates: Requirements 8.3, 8.4, 8.5**

### Property 8: Favicon present on every page

*For any* page in the portfolio site, a `<link rel="icon">` tag must exist in `<head>`.

**Validates: Requirements 9.1**

### Property 9: Project page title follows naming pattern

*For any* project detail page (`projects/*.html`), the `<title>` element content must end with the suffix `"— Avnish Yadav"`.

**Validates: Requirements 1.4**

### Property 10: Project page canonical URL contains projects path

*For any* project detail page, the canonical `href` must contain `/projects/`.

**Validates: Requirements 5.4**

### Property 11: Project page h1 contains primary keyword

*For any* project detail page, the first `<h1>` element in the page must contain the string `"Avnish Yadav"`.

**Validates: Requirements 8.6**

### Property 12: Project page favicon uses relative path

*For any* project detail page, the favicon `<link rel="icon">` `href` attribute must equal `"../images/favicon.ico"`.

**Validates: Requirements 9.3**

### Property 13: Meta descriptions are unique across all pages

*For any* two distinct pages in the portfolio site, their `<meta name="description">` content values must not be equal to each other.

**Validates: Requirements 2.5**

---

## Error Handling

Since this feature involves only static HTML edits with no runtime logic, error handling is limited to authoring-time correctness:

- **Character count violations**: Titles or descriptions outside the specified length ranges will be caught by property tests (Properties 2 and 3). The test suite acts as the error detection mechanism.
- **Missing tags**: Any omitted required tag will be caught by the property tests on the next test run.
- **Malformed JSON-LD**: Invalid JSON in the `<script type="application/ld+json">` blocks will cause Google's Rich Results Test to reject the schema. The unit test for the Person and WebSite schemas validates that the JSON parses correctly and contains all required fields.
- **Wrong favicon path**: Project pages using `/images/favicon.ico` instead of `../images/favicon.ico` will result in a broken favicon icon when served from the `/projects/` subdirectory. Property 12 catches this.
- **og:title / twitter:title mismatch**: Properties 4 and 5 enforce that social tags mirror the `<title>` element, preventing drift between the two.

---

## Testing Strategy

Tests live in `tests/seo-keyword-optimization.test.js`, using the same stack as the existing `tests/seo-google-verification.test.js`:

- **Test runner**: Node.js built-in `node:test`
- **Assertion library**: `node:assert/strict`
- **HTML parser**: `node-html-parser` (already installed)
- **Property-based testing**: `fast-check` v4 (already installed)
- **Execution**: `node --test tests/seo-keyword-optimization.test.js`

### Dual Testing Approach

**Unit tests** cover specific expected values for individual pages:
- Exact title string for index, about, and contact pages (Requirements 1.1, 1.2, 1.3)
- Index page meta description contains primary keyword and a secondary keyword (Requirement 2.2)
- Index page `og:type` is `"website"` (Requirement 3.2)
- Index page canonical URL is exactly `"https://avnish-portfolio-c14e6.web.app/"` (Requirement 5.3)
- Person schema on index page: all required fields present with correct values (Requirements 6.1–6.7)
- WebSite schema on index page: all required fields present with correct values (Requirements 7.1–7.5)
- Index page `<h1>` contains "Avnish Yadav" (Requirement 8.1)
- Index page `#about` section contains a secondary keyword (Requirement 8.2)
- Index page favicon href is `"/images/favicon.ico"` (Requirement 9.2)

**Property tests** cover universal rules across all 8 pages (or the 5 project pages subset):

Each property test uses `fc.constantFrom(...TARGET_FILES)` or `fc.constantFrom(...PROJECT_FILES)` as the generator, with `numRuns: 100`.

| Test | Generator | Property |
|---|---|---|
| Property 1: Title contains primary keyword | all 8 files | `<title>` includes "Avnish Yadav" |
| Property 2: Title length | all 8 files | title length in [50, 60] |
| Property 3: Description presence and length | all 8 files | description exists, length in [140, 160] |
| Property 4: OG tags completeness and consistency | all 8 files | all 5 OG tags present, values consistent |
| Property 5: Twitter Card tags completeness and consistency | all 8 files | all 4 Twitter tags present, values consistent |
| Property 6: Canonical URL presence and HTTPS format | all 8 files | canonical exists, href starts with base URL |
| Property 7: Semantic HTML signals | all 8 files | lang=en, author meta, robots meta |
| Property 8: Favicon present | all 8 files | favicon link exists |
| Property 9: Project title pattern | 5 project files | title ends with "— Avnish Yadav" |
| Property 10: Project canonical path | 5 project files | canonical href contains "/projects/" |
| Property 11: Project h1 keyword | 5 project files | h1 contains "Avnish Yadav" |
| Property 12: Project favicon path | 5 project files | favicon href = "../images/favicon.ico" |
| Property 13: Unique descriptions | all 8 files (single run) | all description values are distinct |

### Property Test Tag Format

Each property test is tagged with a comment in the format:
```
// Feature: seo-keyword-optimization, Property {N}: {property_text}
```

### JSON-LD Validation

The unit test for the Person and WebSite schemas:
1. Reads `index.html`
2. Finds all `<script type="application/ld+json">` elements
3. Parses each with `JSON.parse()` — a parse error fails the test
4. Asserts one schema has `@type: "Person"` with all required fields
5. Asserts one schema has `@type: "WebSite"` with all required fields
