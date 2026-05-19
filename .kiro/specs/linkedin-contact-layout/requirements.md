# Requirements Document

## Introduction

This feature introduces a LinkedIn profile section to the portfolio's contact area. On desktop/wide screens (≥ 768 px), the existing contact form and the new LinkedIn section are displayed side by side in a two-column layout. On mobile and narrow viewports the two panels stack vertically, preserving the current single-column experience. The LinkedIn section surfaces Avnish Yadav's public profile information (name, headline, profile photo, connection CTA) using a styled card rather than a third-party embed, because LinkedIn's public embed API is restricted and unreliable in static-site contexts.

## Glossary

- **Contact_Section**: The `#contact` section in `index.html` that currently contains the contact form.
- **LinkedIn_Panel**: The new right-hand panel that displays Avnish Yadav's LinkedIn profile summary and a link to the full profile.
- **Contact_Form**: The existing HTML form (`#contact-form`) with name, email, and message fields.
- **Side_By_Side_Layout**: A two-column CSS Grid or Flexbox layout where the Contact_Form occupies the left column and the LinkedIn_Panel occupies the right column on desktop viewports.
- **Stacked_Layout**: A single-column layout where the Contact_Form appears above the LinkedIn_Panel on mobile viewports.
- **Desktop_Viewport**: Any screen width ≥ 768 px.
- **Mobile_Viewport**: Any screen width ≤ 767 px.
- **CSS_Custom_Properties**: The existing theming variables (`--color-surface`, `--color-accent`, `--color-text`, etc.) defined in `css/style.css`.
- **Dark_Mode**: The default theme applied via `<body class="dark">` and the `.dark` CSS class.

---

## Requirements

### Requirement 1: Side-by-Side Layout on Desktop

**User Story:** As a visitor viewing the portfolio on a desktop browser, I want to see the contact form and LinkedIn profile section displayed side by side, so that I can choose to reach out via the form or connect on LinkedIn without scrolling past one to find the other.

#### Acceptance Criteria

1. WHEN the viewport width is ≥ 768 px, THE Contact_Section SHALL render the Contact_Form and the LinkedIn_Panel in a two-column Side_By_Side_Layout where each column has equal width (1:1 ratio) and a minimum gap of 2rem between the two columns.
2. WHEN the viewport width is ≥ 768 px, THE Side_By_Side_Layout SHALL position the Contact_Form in the left column and the LinkedIn_Panel in the right column.
3. THE Side_By_Side_Layout SHALL be implemented using CSS Grid or Flexbox declared in a stylesheet.
4. THE Side_By_Side_Layout SHALL NOT use JavaScript to apply, toggle, or modify the two-column arrangement.
5. WHEN the viewport width is ≥ 768 px, EACH column in the Side_By_Side_Layout SHALL have a minimum width of 280 px.
6. WHEN the viewport width drops below 768 px, THE Side_By_Side_Layout SHALL collapse to a single-column Stacked_Layout automatically via CSS.

### Requirement 2: Stacked Layout on Mobile

**User Story:** As a visitor viewing the portfolio on a mobile device, I want the contact form and LinkedIn section to stack vertically, so that both panels remain fully readable without horizontal scrolling or cramped content.

#### Acceptance Criteria

1. WHEN the viewport width is ≤ 767 px, THE Contact_Section SHALL render the Contact_Form above the LinkedIn_Panel in a Stacked_Layout (single column).
2. WHEN the viewport width is ≤ 767 px, THE Contact_Form SHALL occupy 100% of the Contact_Section content width.
3. WHEN the viewport width is ≤ 767 px, THE LinkedIn_Panel SHALL occupy 100% of the Contact_Section content width.
4. THE Stacked_Layout SHALL be achieved exclusively through CSS media queries targeting a max-width of 767 px and SHALL NOT require any JavaScript to activate.

### Requirement 3: LinkedIn Panel Content

**User Story:** As a visitor, I want the LinkedIn panel to show Avnish Yadav's profile summary and a clear call-to-action link, so that I can quickly understand who I am connecting with and navigate to the full LinkedIn profile.

#### Acceptance Criteria

1. THE LinkedIn_Panel SHALL contain a heading element with the text "Avnish Yadav" that has a non-zero rendered width and height (i.e., is visible in the document).
2. THE LinkedIn_Panel SHALL display the exact text "Software Engineer · Full-Stack Developer" as a subtitle or role descriptor below the name heading.
3. THE LinkedIn_Panel SHALL contain an anchor element whose visible text includes `linkedin.com/in/avnishy84`, whose `href` resolves to `https://www.linkedin.com/in/avnishy84/`, and which has `target="_blank"`.
4. THE LinkedIn_Panel SHALL contain a call-to-action anchor element with the exact visible label "Connect on LinkedIn" that navigates to `https://www.linkedin.com/in/avnishy84/` and has `target="_blank"`.
5. THE LinkedIn_Panel SHALL include a Font Awesome LinkedIn brand icon (`<i class="fab fa-linkedin">` or `<i class="fab fa-linkedin-in">`) placed inside the same heading container as the name or inside the "Connect on LinkedIn" anchor element.
6. IF the profile avatar `<img>` element is present in the LinkedIn_Panel AND its `src` fails to load, THEN THE LinkedIn_Panel SHALL display a CSS-only fallback element showing the initials "AY" that has the same rendered dimensions as the avatar placeholder, and the overall panel layout SHALL NOT reflow or shift.

### Requirement 4: Visual Consistency with Existing Theme

**User Story:** As a visitor, I want the LinkedIn section to look like a natural part of the portfolio, so that the page feels cohesive and professionally designed.

#### Acceptance Criteria

1. THE LinkedIn_Panel SHALL use CSS_Custom_Properties exclusively for all `color`, `background`, `border-color`, and `box-shadow` property values, drawing only from the set: `--color-surface`, `--color-soft`, `--color-accent`, `--color-accent-2`, `--color-text`, `--color-text-muted`, `--shadow`.
2. WHEN the `<body>` element has the class `dark`, THE LinkedIn_Panel SHALL render using the dark-theme values of those CSS_Custom_Properties without requiring any additional JavaScript or CSS class toggling specific to the LinkedIn_Panel.
3. THE LinkedIn_Panel SHALL apply a `border-radius` value in the range 14 px–16 px to its outermost container element.
4. THE LinkedIn_Panel SHALL apply a `box-shadow` using the `--shadow` custom property to its outermost container element, matching the card shadow convention used elsewhere on the page.
5. THE LinkedIn_Panel SHALL use `font-family: 'Lato', 'Inter', sans-serif` for body text and `font-family: 'Montserrat', sans-serif` for heading text, consistent with the existing typographic conventions in `css/style.css`.
6. THE LinkedIn_Panel SHALL NOT introduce any new external CSS stylesheets or JavaScript files beyond those already loaded in `index.html`; inline `<style>` blocks within `index.html` are permitted if needed.

### Requirement 5: Accessibility

**User Story:** As a visitor using a screen reader or keyboard navigation, I want the LinkedIn section to be fully accessible, so that I can interact with it without relying on a mouse.

#### Acceptance Criteria

1. WHEN an interactive element (link or button) in the LinkedIn_Panel has no visible text that fully describes its purpose, THEN that element SHALL have an `aria-label` attribute whose value describes the action and destination (e.g., `aria-label="Visit Avnish Yadav's LinkedIn profile"`).
2. WHEN the "Connect on LinkedIn" anchor opens in a new tab (`target="_blank"`), THEN that anchor SHALL include `rel="noopener noreferrer"` as an attribute.
3. IF a profile avatar `<img>` element is present in the LinkedIn_Panel, THEN that element SHALL have a non-empty `alt` attribute that describes the image subject and context (e.g., "Avnish Yadav's LinkedIn profile photo").
4. WHEN a keyboard user moves focus to the "Connect on LinkedIn" anchor via the Tab key, THEN that anchor SHALL display a visible focus outline with a minimum contrast ratio of 3:1 against its background, implemented via CSS `:focus` or `:focus-visible` styles.

### Requirement 6: Contact Section Heading Preserved

**User Story:** As a visitor, I want the "Get In Touch" heading and introductory text to remain visible above both panels, so that the section's purpose is immediately clear.

#### Acceptance Criteria

1. THE Contact_Section SHALL contain an `<h2>` element with the exact text "Get In Touch" that is rendered above (i.e., has a smaller `top` offset than) both the Contact_Form and the LinkedIn_Panel in the document flow.
2. THE Contact_Section SHALL contain the existing introductory paragraph element positioned between the `<h2>Get In Touch</h2>` heading and the two-panel container in the document flow.
3. WHEN the viewport width is ≥ 768 px (Side_By_Side_Layout active), THE `<h2>Get In Touch</h2>` heading and introductory paragraph SHALL remain visible and SHALL span the full width of the Contact_Section above both columns.
4. WHEN the viewport width is ≤ 767 px (Stacked_Layout active), THE `<h2>Get In Touch</h2>` heading and introductory paragraph SHALL remain visible and SHALL appear above the Contact_Form in the document flow.
