# Avnish Yadav — Personal Portfolio Website

A modern, responsive personal portfolio website built as a single-page application and deployed on Firebase Hosting. The entire project — design, development, and deployment — was completed in under a day using AI-assisted development and prompt engineering with **Kiro**, an agentic AI IDE.

**Live:** https://avnish-portfolio-c14e6.web.app/

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Page Sections](#page-sections)
- [CSS Architecture](#css-architecture)
- [JavaScript Features](#javascript-features)
- [Theming System](#theming-system)
- [Animations & Visual Effects](#animations--visual-effects)
- [Responsive Design](#responsive-design)
- [Firebase Setup](#firebase-setup)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [AI-Assisted Development](#ai-assisted-development)
- [About the Developer](#about-the-developer)

---

## Overview

This portfolio showcases Avnish Yadav's professional background, technical skills, projects, and work experience. It is a fully static site — no backend, no build step required — served directly from the project root via Firebase Hosting with global CDN and automatic SSL.

The site defaults to dark mode with a deep space aesthetic: animated starfield background, mouse-trail particle effects, smooth scroll navigation, and fade-in animations on scroll.

---

## Features

- One-page layout with smooth scroll navigation
- Dark mode by default, theme persists via `localStorage`
- Animated starfield background (CSS + JS)
- Mouse-trail falling star particle effect
- Typing animation on hero heading
- Scroll-triggered fade-in for all sections and cards
- Active nav link highlight based on scroll position
- Responsive layout for desktop, tablet, and mobile
- Mobile hamburger menu
- Scroll-to-top button (appears after 300px scroll)
- Contact form with validation and simulated submission
- Firebase Analytics integration
- Deployed on Firebase Hosting with CDN + SSL

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, keyframe animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Analytics | Firebase Analytics |
| Hosting | Firebase Hosting |
| Fonts | Google Fonts — Inter, Lato, Montserrat |
| Icons | Font Awesome 6.4.0 |
| Package Manager | npm |
| Dev Server | http-server |

---

## Project Structure

```
/
├── index.html                  # Main single-page portfolio
├── about.html                  # Placeholder (not in use)
├── contact.html                # Placeholder (not in use)
├── css/
│   └── style.css               # All styles — theming, layout, animations
├── js/
│   └── app.js                  # Firebase init + all JS functionality
├── images/
│   ├── avnish-transparent.png  # Profile photo (hero + about sections)
│   └── one-editor-logo.svg     # Logo for One Note project card
├── public/
│   └── index.html              # Unused Firebase placeholder
├── .kiro/
│   └── steering/
│       └── project-context.md  # AI agent context file (auto-included in all AI sessions)
├── firebase.json               # Firebase hosting configuration
├── .firebaserc                 # Firebase project alias
├── package.json                # npm scripts and dependencies
├── package-lock.json           # Lockfile
└── README.md                   # This file
```

---

## Page Sections

### Header / Hero
- Full-width hero with profile photo, name, tagline, and CTA button
- Typing animation on the `h1` heading (character by character, 100ms delay)
- Radial glow effect behind the profile avatar
- CTA button links to the Projects section

### About
- Two-column layout (photo + bio text) on desktop, stacked on mobile
- Describes professional background: 4+ years in enterprise software, C#/.NET/SQL Server
- Mentions current focus on Generative AI and LLM integration

### Skills & Technologies
Four skill category cards:
- **Languages:** C#, JavaScript, SQL, Python
- **Frameworks & Technologies:** .NET, React, Angular, Sencha Ext JS, REST APIs, WinForms
- **Database & Tools:** SQL Server, Query Optimization, Visual Studio, Git, SSMS, Jira
- **AI & Automation:** Prompt Engineering, LLM APIs, Generative AI, AI-Assisted Dev

### Projects
Four project cards:

1. **Modern Portfolio Website** — this site, built in under a day with AI-assisted development
2. **AI Dress Try-On App** — virtual fitting powered by Google Gemini Nano and Banana AI
3. **One Note** — note-taking app with Firebase, rich text, keyboard shortcuts, dark mode
4. **TeamChatLogs** — Chrome Extension (MV3) that exports full Microsoft Teams chat history to plain text; solves Teams' virtualized DOM rendering with auto-scroll, deduplication, and noise removal; built entirely through agentic AI with 87 tests

### Experience
Three experience cards:

1. **Software Engineer — Aloha Technology (EleVia Platform)** | Jan 2022 – Present, Pune
   - Full-stack work across legacy (Sencha Ext JS) and modernization (React) tracks
   - C#/.NET backend, SQL Server optimization (30% performance improvement)
   - 20% faster query response via database normalization initiative
   - Production issue resolution across UI, APIs, and database layers

2. **Full-Stack Developer — Make the Dot**
   - Angular frontend + JavaScript backend
   - Chrome extension development in Python
   - RESTful API implementation

3. **Education**
   - MCA — AKTU, Lucknow (2020–2022) — 77.80%
   - BCA — CSJMU, Kanpur (2017–2020) — 63.00%

### Contact
- Centered form with name, email, and message fields
- Client-side validation (all fields required)
- Simulated async submission with loading state and reset

### Footer
- Social links: LinkedIn, GitHub, Instagram, Email
- Copyright notice

---

## CSS Architecture

### File: `css/style.css`

The stylesheet is organized in layers:

1. **Reset & base** — box-sizing, scroll-behavior, font stack
2. **Layout primitives** — `.container` (max 1200px, centered)
3. **Component styles** — nav, header, sections, cards, form, footer
4. **Theme variables** — CSS custom properties on `:root` and `.dark`
5. **Responsive overrides** — breakpoints at 768px and 480px
6. **Animation definitions** — `fadeInUp`, `blinkStars`, `fallStar`
7. **Visual effects** — starfield, falling stars, hero avatar glow

### Design Tokens

| Token | Light | Dark |
|---|---|---|
| `--color-text` | `#333` | `#F0F0F0` |
| `--color-text-muted` | `#666` | `#c7c9d1` |
| `--color-surface` | `#ffffff` | `#151821` |
| `--color-soft` | `#f8f9fa` | `#0f121a` |
| `--color-surface-veil` | `rgba(255,255,255,0.95)` | `rgba(20,24,32,0.75)` |
| `--color-accent` | `#667eea` | `#E0BBE4` (lavender) |
| `--color-accent-2` | `#764ba2` | `#957DAD` (plum) |
| `--hover-pop` | `#FFC72C` | `#FFC72C` |
| `--shadow` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.5)` |

Primary gradient: `linear-gradient(45deg, #667eea, #764ba2)`
Page background: `linear-gradient(156deg, #000000 0%, #7e00ff 100%)`

---

## JavaScript Features

### File: `js/app.js`

#### Firebase Initialization
Initializes Firebase app and Analytics using the project config. Keys are public-facing (standard for Firebase web apps; security is enforced via Firebase security rules).

#### Theme Persistence
Reads `localStorage` key `theme` on `DOMContentLoaded` and applies `.dark` class to `<html>` before first paint, preventing flash of wrong theme. Falls back to `prefers-color-scheme` media query if no saved preference.

#### Smooth Scroll
Intercepts clicks on all `nav a[href^="#"]` links and uses `scrollIntoView({ behavior: 'smooth' })` instead of native anchor jump.

#### Active Nav Highlight
`scroll` event listener tracks `window.scrollY` against each section's `offsetTop`. Updates `.active` class on the matching nav link in real time.

#### Intersection Observer
Observes all `section`, `.project-card`, and `.skill-category` elements. Adds `.fade-in` class (triggers `fadeInUp` animation) when they enter the viewport with a 50px bottom margin.

#### Typing Effect
On load, clears `header h1` text content and re-types it character by character at 100ms intervals with a 500ms initial delay.

#### Scroll-to-Top Button
Dynamically creates and appends a `<button>` to `<body>`. Becomes visible (opacity 1) after 300px scroll. Smooth-scrolls to top on click.

#### Contact Form
Validates all three fields are non-empty. Disables submit button and shows "Sending..." during the simulated 2-second async delay. Resets form and re-enables button on completion.

#### Project Card Hover
`mouseenter` / `mouseleave` handlers apply `translateY(-10px) scale(1.02)` / reset on each `.project-card`.

#### Mobile Menu Toggle
`.menu-toggle` button toggles `.open` class on `nav ul`. All nav links close the menu on click. `aria-expanded` attribute is kept in sync.

#### Starfield
Generates 150 `.star` `<div>` elements with random `top`, `left`, `width`, and `height` values and appends them to `.starfield`.

#### Mouse Trail
`mousemove` listener creates `.falling-star` `<div>` elements at cursor position with random `--offsetX` and `--offsetY` CSS variables. Each element removes itself after its animation ends.

---

## Theming System

Dark mode is the default. The `<body>` element has class `dark` in the HTML. The theme toggle button exists in the JS but is currently commented out in the HTML markup.

To re-enable the toggle button, uncomment this line in `index.html`:
```html
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>
```

Theme switching logic in `app.js` handles the button click, updates `localStorage`, and syncs the button icon between ☀️ and 🌙.

---

## Animations & Visual Effects

### `fadeInUp`
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Applied via `.fade-in` class, triggered by Intersection Observer.

### `blinkStars`
CSS-only starfield using `::before` and `::after` pseudo-elements on `.starfield`. Uses `radial-gradient` dots at fixed positions. Animates opacity and scale on a 4s loop.

### `fallStar`
Mouse-trail particles. Each `.falling-star` div translates to `--offsetX` / `--offsetY` CSS variables (randomized per particle) and fades out over 1 second.

### Hero Avatar Glow
`::before` pseudo-element on `.hero-avatar .profile-image` with a radial gradient and `blur(8px)` filter creates a soft lavender glow ring.

---

## Responsive Design

| Breakpoint | Changes |
|---|---|
| `> 768px` | Two-column about layout, horizontal nav, multi-column grids |
| `≤ 768px` | Stacked about layout, hamburger menu, single-column project grid |
| `≤ 480px` | Smaller heading sizes, reduced profile image, tighter padding |

Skill tags use `overflow-x: auto` with `flex-wrap: nowrap` on small screens for horizontal scrolling.

---

## Firebase Setup

### `firebase.json`
```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```
Serves from the project root. All routes rewrite to `index.html` (SPA behavior).

### `.firebaserc`
```json
{
  "projects": {
    "default": "avnish-portfolio-c14e6"
  }
}
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (opens browser at http://localhost:3000)
npm run dev
```

The dev server is `http-server` — a simple static file server. No build step is required.

---

## Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy
```

Requires Firebase CLI installed and authenticated:
```bash
npm install -g firebase-tools
firebase login
```

After deploy, the site is live at:
- https://avnish-portfolio-c14e6.web.app/
- https://avnish-portfolio-c14e6.firebaseapp.com/

---

## AI-Assisted Development

This project was built using **Kiro**, an agentic AI IDE. The entire workflow — UI design decisions, component structure, CSS theming, JavaScript features, content writing, and deployment configuration — was driven through natural language conversation with the AI agent.

### What the AI handled
- Translating design intent ("dark space theme with starfield") into production CSS
- Implementing all JavaScript features from plain English descriptions
- Updating content from resume data without manual copy-paste
- Debugging layout issues from described symptoms
- Writing and maintaining the steering context file

### Steering File
`.kiro/steering/project-context.md` is automatically included in every AI session in this workspace. It gives any agent instant full context about the project structure, design tokens, JS features, and common tasks — so no re-explanation is needed across sessions.

### The result
From blank page to deployed, polished portfolio in under a day. The developer's role was to describe intent, review output, and provide feedback. The agent handled implementation.

---

## About the Developer

**Avnish Yadav** — Software Engineer, Pune, India

4+ years of experience building and maintaining enterprise applications with C#, .NET, SQL Server, and JavaScript frameworks. Currently exploring Generative AI, LLM integration, and AI-assisted automation.

| | |
|---|---|
| Email | avnishy84@gmail.com |
| LinkedIn | linkedin.com/in/avnishy84 |
| GitHub | github.com/avnishy84 |
| Instagram | instagram.com/avnish__yadav |

**Core stack:** C#, .NET, SQL Server, JavaScript, React, Angular, Sencha Ext JS, REST APIs, Python  
**AI focus:** Prompt Engineering, LLM APIs, Generative AI, AI-assisted development  
**Education:** MCA — AKTU Lucknow (77.80%) · BCA — CSJMU Kanpur (63.00%)
