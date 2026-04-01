# Requirements Document

## Introduction

This feature adds comprehensive on-page SEO optimization across all 8 pages of Avnish Yadav's static HTML portfolio to rank for personal brand keywords — primarily "Avnish Yadav" and related queries such as "Avnish Yadav Software Developer", "Avnish Yadav Portfolio", and "Avnish Yadav Software Engineer". The site is a static HTML portfolio hosted on Firebase at https://avnish-portfolio-c14e6.web.app/ with no build system. All changes are direct edits to HTML files.

The optimization covers: meta titles, meta descriptions, Open Graph tags, Twitter Card tags, JSON-LD structured data (Person + WebSite schemas), canonical URLs, semantic HTML signals, and keyword placement in visible body content.

---

## Glossary

- **Portfolio_Site**: The static HTML portfolio website for Avnish Yadav, consisting of 8 HTML pages hosted at https://avnish-portfolio-c14e6.web.app/
- **Primary_Keyword**: The exact-match personal brand keyword "Avnish Yadav"
- **Secondary_Keywords**: Keyword variants including "Avnish Yadav Software Developer", "Avnish Yadav Software Engineer", "Avnish Yadav Portfolio", and "Avnish Yadav Full Stack Developer"
- **Meta_Title**: The content of the `<title>` element in the `<head>` of each HTML page
- **Meta_Description**: The content of `<meta name="description">` in the `<head>` of each HTML page
- **OG_Tags**: Open Graph `<meta property="og:*">` tags used by social platforms and search engines for rich previews
- **Twitter_Card_Tags**: `<meta name="twitter:*">` tags used by Twitter/X for link previews
- **Canonical_URL**: The `<link rel="canonical" href="...">` tag that declares the authoritative URL for each page
- **JSON_LD**: JavaScript Object Notation for Linked Data — structured data embedded in a `<script type="application/ld+json">` block
- **Person_Schema**: A JSON-LD schema of type `Person` describing Avnish Yadav as the site owner
- **WebSite_Schema**: A JSON-LD schema of type `WebSite` describing the portfolio site
- **Index_Page**: `index.html` — the main portfolio page
- **About_Page**: `about.html` — the about page (currently empty body)
- **Contact_Page**: `contact.html` — the contact page (currently empty body)
- **Project_Detail_Pages**: The 5 pages under `projects/` — `compufy.html`, `one-note.html`, `team-chat-logs.html`, `portfolio.html`, `ai-dress-tryon.html`

---

## Requirements

### Requirement 1: Meta Titles

**User Story:** As Avnish Yadav, I want every page to have an optimized meta title containing the Primary_Keyword, so that Google associates my name with each page and displays it correctly in search results.

#### Acceptance Criteria

1. THE Index_Page SHALL have a Meta_Title of "Avnish Yadav — Software Engineer & Full-Stack Developer"
2. THE About_Page SHALL have a Meta_Title of "About Avnish Yadav — Software Engineer"
3. THE Contact_Page SHALL have a Meta_Title of "Contact Avnish Yadav — Software Engineer"
4. THE Project_Detail_Pages SHALL each have a Meta_Title following the pattern "[Project Name] — Avnish Yadav"
5. THE Portfolio_Site SHALL have Meta_Titles with a character length between 50 and 60 characters on every page
6. THE Portfolio_Site SHALL include the Primary_Keyword in the Meta_Title of every page

---

### Requirement 2: Meta Descriptions

**User Story:** As Avnish Yadav, I want every page to have a unique, keyword-rich meta description, so that Google displays a compelling snippet in search results that includes my name and relevant keywords.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a `<meta name="description">` tag in the `<head>` of every page
2. THE Index_Page SHALL have a Meta_Description that includes the Primary_Keyword and at least one Secondary_Keyword
3. THE About_Page SHALL have a Meta_Description that includes the Primary_Keyword and describes Avnish Yadav's professional background
4. THE Contact_Page SHALL have a Meta_Description that includes the Primary_Keyword and describes how to get in touch
5. THE Project_Detail_Pages SHALL each have a unique Meta_Description that includes the Primary_Keyword and the project name
6. THE Portfolio_Site SHALL have Meta_Descriptions with a character length between 140 and 160 characters on every page

---

### Requirement 3: Open Graph Tags

**User Story:** As Avnish Yadav, I want Open Graph tags on every page, so that when my portfolio links are shared on LinkedIn, Facebook, or other platforms, they display a rich preview with my name and a relevant description.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include `og:title`, `og:description`, `og:url`, `og:type`, and `og:image` tags in the `<head>` of every page
2. THE Index_Page SHALL have `og:type` set to "website"
3. THE Portfolio_Site SHALL set `og:url` to the canonical absolute URL of each respective page
4. THE Portfolio_Site SHALL set `og:title` to the same value as the Meta_Title on each page
5. THE Portfolio_Site SHALL set `og:description` to the same value as the Meta_Description on each page
6. THE Portfolio_Site SHALL set `og:image` to an absolute URL pointing to the profile photo (`images/avnish-transparent.png`) on every page

---

### Requirement 4: Twitter Card Tags

**User Story:** As Avnish Yadav, I want Twitter Card tags on every page, so that links shared on Twitter/X display a rich card with my name and description instead of a plain URL.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags in the `<head>` of every page
2. THE Portfolio_Site SHALL set `twitter:card` to "summary_large_image" on every page
3. THE Portfolio_Site SHALL set `twitter:title` to the same value as the Meta_Title on each page
4. THE Portfolio_Site SHALL set `twitter:description` to the same value as the Meta_Description on each page
5. THE Portfolio_Site SHALL set `twitter:image` to the same absolute URL used for `og:image` on each page

---

### Requirement 5: Canonical URLs

**User Story:** As Avnish Yadav, I want a canonical URL tag on every page, so that Google knows the authoritative URL for each page and avoids duplicate content penalties.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a `<link rel="canonical" href="...">` tag in the `<head>` of every page
2. THE Portfolio_Site SHALL set the Canonical_URL to the full absolute HTTPS URL of each respective page
3. THE Index_Page SHALL have a Canonical_URL of "https://avnish-portfolio-c14e6.web.app/"
4. THE Project_Detail_Pages SHALL each have a Canonical_URL matching their respective path under "https://avnish-portfolio-c14e6.web.app/projects/"

---

### Requirement 6: JSON-LD Structured Data — Person Schema

**User Story:** As Avnish Yadav, I want a JSON-LD Person schema on the index page, so that Google can extract structured information about me and potentially display a knowledge panel or rich result for my name.

#### Acceptance Criteria

1. THE Index_Page SHALL include a `<script type="application/ld+json">` block containing a Person_Schema
2. THE Person_Schema SHALL include the `@type` field set to "Person"
3. THE Person_Schema SHALL include the `name` field set to "Avnish Yadav"
4. THE Person_Schema SHALL include the `url` field set to "https://avnish-portfolio-c14e6.web.app/"
5. THE Person_Schema SHALL include the `jobTitle` field set to "Software Engineer"
6. THE Person_Schema SHALL include the `sameAs` array containing the LinkedIn profile URL and GitHub profile URL
7. THE Person_Schema SHALL include the `knowsAbout` array listing at least 5 of Avnish Yadav's core skills

---

### Requirement 7: JSON-LD Structured Data — WebSite Schema

**User Story:** As Avnish Yadav, I want a JSON-LD WebSite schema on the index page, so that Google understands the site's identity and can associate it with my personal brand.

#### Acceptance Criteria

1. THE Index_Page SHALL include a `<script type="application/ld+json">` block containing a WebSite_Schema
2. THE WebSite_Schema SHALL include the `@type` field set to "WebSite"
3. THE WebSite_Schema SHALL include the `name` field set to "Avnish Yadav — Portfolio"
4. THE WebSite_Schema SHALL include the `url` field set to "https://avnish-portfolio-c14e6.web.app/"
5. THE WebSite_Schema SHALL include the `author` field referencing the Person_Schema by name

---

### Requirement 8: Semantic HTML and Keyword Placement

**User Story:** As Avnish Yadav, I want the Primary_Keyword and Secondary_Keywords to appear naturally in key on-page positions, so that Google's content analysis reinforces the keyword relevance of each page.

#### Acceptance Criteria

1. THE Index_Page SHALL include the Primary_Keyword in the `<h1>` element
2. THE Index_Page SHALL include at least one Secondary_Keyword in the visible body text within the `#about` section
3. THE Portfolio_Site SHALL set the `<html lang="en">` attribute on every page
4. THE Portfolio_Site SHALL include a `<meta name="author" content="Avnish Yadav">` tag in the `<head>` of every page
5. THE Portfolio_Site SHALL include a `<meta name="robots" content="index, follow">` tag in the `<head>` of every page
6. THE Project_Detail_Pages SHALL each include the Primary_Keyword in the visible `<h1>` element (e.g., "Compufy Technology — Avnish Yadav")

---

### Requirement 9: Favicon

**User Story:** As Avnish Yadav, I want a favicon declared on every page, so that browsers and search engines can identify the site with a visual icon, which also contributes to brand recognition in search results.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a `<link rel="icon" href="/images/favicon.ico">` tag in the `<head>` of every page
2. THE Index_Page SHALL include the favicon link using a root-relative path (`/images/favicon.ico`)
3. THE Project_Detail_Pages SHALL include the favicon link using a path relative to the projects directory (`../images/favicon.ico`)
