# Requirements Document

## Introduction

This feature adds a Google Site Verification meta tag to all HTML pages of Avnish Yadav's portfolio website. The meta tag enables Google Search Console to verify ownership of the site, which is a prerequisite for SEO monitoring, indexing insights, and search performance data. The site is a static multi-page website deployed on Firebase Hosting, consisting of a root-level index page, supporting pages (about.html, contact.html), and five project detail pages under the `projects/` directory.

## Glossary

- **Portfolio_Site**: The static HTML website for Avnish Yadav, deployed at https://avnish-portfolio-c14e6.web.app/
- **Verification_Tag**: The `<meta name="google-site-verification" content="g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4" />` element required by Google Search Console
- **Root_Pages**: HTML files at the root of the project — `index.html`, `about.html`, `contact.html`
- **Project_Detail_Pages**: HTML files under the `projects/` directory — `ai-dress-tryon.html`, `compufy.html`, `one-note.html`, `portfolio.html`, `team-chat-logs.html`
- **Head_Section**: The `<head>` element of an HTML document, where meta tags are placed

## Requirements

### Requirement 1: Add Verification Tag to Root Pages

**User Story:** As a site owner, I want the Google Site Verification meta tag present on all root-level HTML pages, so that Google Search Console can verify ownership of the site.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `index.html`
2. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `about.html`
3. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `contact.html`
4. WHEN the Verification_Tag is placed in a Head_Section, THE Portfolio_Site SHALL position it immediately after the `<meta charset>` tag
5. THE Verification_Tag SHALL use the exact `name` attribute value `google-site-verification`
6. THE Verification_Tag SHALL use the exact `content` attribute value `g9Wm09oArip0L0kcpdxdlOXMjnWOHNII-H-66Lp4HK4`

### Requirement 2: Add Verification Tag to Project Detail Pages

**User Story:** As a site owner, I want the Google Site Verification meta tag present on all project detail pages, so that Google Search Console verification succeeds regardless of which page Google crawls first.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `projects/ai-dress-tryon.html`
2. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `projects/compufy.html`
3. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `projects/one-note.html`
4. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `projects/portfolio.html`
5. THE Portfolio_Site SHALL include the Verification_Tag in the Head_Section of `projects/team-chat-logs.html`
6. WHEN the Verification_Tag is placed in a Head_Section, THE Portfolio_Site SHALL position it immediately after the `<meta charset>` tag

### Requirement 3: Tag Integrity

**User Story:** As a site owner, I want the Verification_Tag to be well-formed and non-disruptive, so that it does not break page rendering or existing meta tags.

#### Acceptance Criteria

1. THE Verification_Tag SHALL be a self-closing void element with no inner content
2. THE Portfolio_Site SHALL preserve all existing meta tags, link tags, and script tags in each Head_Section unchanged after the Verification_Tag is added
3. IF the Verification_Tag is already present in a Head_Section, THEN THE Portfolio_Site SHALL NOT add a duplicate Verification_Tag
