# Design Document — linkedin-contact-layout

## Overview

This feature adds a LinkedIn profile panel to the existing `#contact` section of `index.html` and arranges it side-by-side with the contact form on desktop viewports (≥ 768 px). On mobile the two panels stack vertically, preserving the current single-column experience.

The implementation is **pure HTML + CSS** — no new JavaScript, no new external files, no third-party embeds. All styling uses the existing CSS custom properties and follows the card conventions already established in `css/style.css` (e.g., `.pcard`, `.tl-card`).

### Key design decisions

| Decision | Rationale |
|---|---|
| CSS Grid for the two-column wrapper | Already used throughout the page; collapses cleanly with a single media-query override |
| Static HTML card (no LinkedIn embed) | LinkedIn's public embed API is blocked in static-site contexts; a hand-crafted card is more reliable and fully theme-aware |
| Styles added to `css/style.css` | Keeps all styles in one file, consistent with the project's no-build-tool constraint |
| Profile photo reuses `images/avnish-transparent.png` | Already loaded on the page; no new network request |
| CSS-only avatar fallback via `::after` pseudo-element | Avoids JavaScript; layout stays stable if the image 404s |

---

## Architecture

The change touches two files only:

```
index.html      — restructure #contact section; add LinkedIn panel markup
css/style.css   — add .contact-columns, .linkedin-panel, and related rules
```

No changes to `js/app.js` are required. The existing EmailJS contact-form handler targets `#contact-form` by ID and is unaffected by the surrounding layout change.

### High-level layout structure

```
#contact
  └── .container
        ├── h2  "Get In Touch"          ← full-width, above both columns
        ├── p   intro paragraph         ← full-width, above both columns
        └── .contact-columns            ← CSS Grid: 1fr 1fr on desktop, 1fr on mobile
              ├── .contact-form-col     ← left column — wraps existing #contact-form
              └── .linkedin-panel       ← right column — new LinkedIn card
```

---

## Components and Interfaces

### 1. `.contact-columns` — layout wrapper

A CSS Grid container that switches between one and two columns via a media query.

```css
.contact-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
    margin-top: 2rem;
}

@media (max-width: 767px) {
    .contact-columns {
        grid-template-columns: 1fr;
    }
}
```

- `align-items: start` prevents the shorter column from stretching to match the taller one.
- The `gap` satisfies the ≥ 2 rem requirement from Requirement 1.1.
- The `@media (max-width: 767px)` override satisfies Requirements 2.1–2.4.

### 2. `.contact-form-col` — left column wrapper

A thin wrapper `<div>` around the existing `#contact-form` markup. Its only job is to participate in the grid. No visual styling is applied to this wrapper itself.

### 3. `.linkedin-panel` — right column card

A styled card that mirrors the `.pcard` / `.tl-card` visual language.

**HTML structure:**

```html
<div class="linkedin-panel" aria-label="LinkedIn profile summary">
  <!-- Avatar -->
  <div class="lp-avatar-wrap">
    <img
      src="images/avnish-transparent.png"
      alt="Avnish Yadav's LinkedIn profile photo"
      class="lp-avatar"
      width="80" height="80"
    />
    <div class="lp-avatar-fallback" aria-hidden="true">AY</div>
  </div>

  <!-- Identity -->
  <div class="lp-identity">
    <h3 class="lp-name">
      <i class="fab fa-linkedin" aria-hidden="true"></i>
      Avnish Yadav
    </h3>
    <p class="lp-role">Software Engineer · Full-Stack Developer</p>
    <a
      href="https://www.linkedin.com/in/avnishy84/"
      class="lp-profile-url"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Avnish Yadav's LinkedIn profile"
    >linkedin.com/in/avnishy84</a>
  </div>

  <!-- Divider -->
  <hr class="lp-divider" aria-hidden="true" />

  <!-- Tagline / summary -->
  <p class="lp-summary">
    Software Engineer with 4+ years building enterprise applications in C#, .NET, and JavaScript.
    Currently exploring Generative AI and agentic development workflows.
  </p>

  <!-- CTA -->
  <a
    href="https://www.linkedin.com/in/avnishy84/"
    class="lp-cta"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Connect with Avnish Yadav on LinkedIn"
  >
    <i class="fab fa-linkedin-in" aria-hidden="true"></i>
    Connect on LinkedIn
  </a>
</div>
```

### 4. Avatar fallback mechanism

The `.lp-avatar-fallback` element is always present in the DOM but hidden by default via `opacity: 0`. If the `<img>` fails to load, a CSS `onerror`-free approach is used: the `<img>` element gets `display: block` inside a relative-positioned wrapper, and the fallback `<div>` is absolutely positioned behind it. When the image loads successfully the `<img>` covers the fallback. When it fails the browser renders the `<img>` as a broken-image box — to handle this cleanly, a small inline `onerror` attribute hides the `<img>` and reveals the fallback:

```html
<img ... onerror="this.style.display='none';this.nextElementSibling.style.opacity='1'">
<div class="lp-avatar-fallback" aria-hidden="true">AY</div>
```

This keeps the fallback purely declarative (no separate JS file) and satisfies Requirement 3.6.

---

## Data Models

This feature has no data model — all content is static HTML. The "data" is:

| Field | Value |
|---|---|
| Name | Avnish Yadav |
| Role | Software Engineer · Full-Stack Developer |
| Profile URL | https://www.linkedin.com/in/avnishy84/ |
| Profile photo | images/avnish-transparent.png |
| Initials fallback | AY |

---

## Correctness Properties

### Property 1: LinkedIn panel required content is always present

*For any* rendering of the `#contact` section, the `.linkedin-panel` element SHALL contain a heading with the text "Avnish Yadav", a subtitle with the text "Software Engineer · Full-Stack Developer", an anchor whose `href` is `https://www.linkedin.com/in/avnishy84/` and whose visible text includes `linkedin.com/in/avnishy84`, and a CTA anchor with the exact visible label "Connect on LinkedIn".

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

> Note: Property-based testing is not applicable to the remaining acceptance criteria in this feature. All other criteria are specific structural assertions about fixed DOM content, layout assertions at fixed breakpoints, implementation constraints verified by code review, or single edge-case checks. There is no transformation logic, parser, serializer, algorithm, or business logic — the inputs are viewport widths and DOM states, and the outputs are rendered geometry and DOM structure. The testing strategy section below specifies the appropriate alternatives.

---

## Error Handling

### Image load failure
The profile photo at `images/avnish-transparent.png` is a local asset already used in the hero and about sections, so a 404 is unlikely. However, the inline `onerror` handler on the `<img>` element hides the broken image and reveals the CSS-styled "AY" initials fallback. The fallback occupies the same fixed dimensions (`80 × 80 px`, `border-radius: 50%`) so the panel layout does not reflow.

### External link safety
Both LinkedIn anchors carry `rel="noopener noreferrer"` to prevent tab-napping and avoid leaking the `Referer` header to LinkedIn's servers.

### No JavaScript dependency
The layout is entirely CSS-driven. If JavaScript is disabled or fails to load, the two-column layout, the LinkedIn panel content, and the contact form all remain fully functional and visible.

---

## Testing Strategy

This feature is a **static HTML/CSS layout change** with no transformation logic, no data processing, and no algorithmic behavior. Property-based testing (generating random inputs and asserting universal properties) is not the right tool here — the "inputs" are viewport widths and DOM states, and the assertions are about rendered geometry and DOM structure.

The appropriate testing approach is:

### Unit / DOM tests (Jest + jsdom or Playwright component tests)

These verify specific structural and behavioral requirements:

| Test | Requirement |
|---|---|
| `#contact` contains exactly one `<h2>` with text "Get In Touch" | 6.1 |
| `<h2>` and intro `<p>` appear before `.contact-columns` in DOM order | 6.2 |
| `.linkedin-panel` contains `<h3>` with text "Avnish Yadav" | 3.1 |
| `.linkedin-panel` contains element with text "Software Engineer · Full-Stack Developer" | 3.2 |
| CTA anchor has `href="https://www.linkedin.com/in/avnishy84/"`, `target="_blank"`, `rel="noopener noreferrer"` | 3.3, 3.4, 5.2 |
| CTA anchor has visible label "Connect on LinkedIn" | 3.4 |
| Font Awesome LinkedIn icon is present inside the name heading or CTA anchor | 3.5 |
| `<img>` in panel has non-empty `alt` attribute | 5.3 |
| Interactive elements without visible text have `aria-label` | 5.1 |
| `.linkedin-panel` has `border-radius` in range 14–16 px | 4.3 |

### Visual / layout tests (Playwright or browser-based)

These verify responsive layout at specific viewport widths:

| Test | Viewport | Assertion | Requirement |
|---|---|---|---|
| Two-column layout | 1024 px wide | `.contact-columns` has `grid-template-columns: 1fr 1fr`; each column ≥ 280 px wide | 1.1, 1.5 |
| Column order | 1024 px wide | Contact form is left of LinkedIn panel | 1.2 |
| Gap between columns | 1024 px wide | Computed gap ≥ 32 px | 1.1 |
| Single-column layout | 375 px wide | `.contact-columns` has one column; both panels are 100% width | 2.1–2.3 |
| Heading spans full width | 1024 px wide | `<h2>` `offsetWidth` equals `.container` `offsetWidth` | 6.3 |

### Accessibility checks

| Test | Tool | Requirement |
|---|---|---|
| Focus outline on CTA anchor | Playwright keyboard navigation | 5.4 |
| `aria-label` on icon-only links | axe-core or manual | 5.1 |
| `alt` text on avatar image | axe-core | 5.3 |

### Manual smoke tests

- Toggle dark/light mode: LinkedIn panel colors update correctly without JS intervention (Requirement 4.2)
- Resize browser from 1200 px → 375 px: layout transitions smoothly from two-column to stacked (Requirements 1.6, 2.4)
- Disable image loading: "AY" fallback appears, panel dimensions unchanged (Requirement 3.6)
- Tab through contact section: focus reaches "Connect on LinkedIn" with visible outline (Requirement 5.4)
