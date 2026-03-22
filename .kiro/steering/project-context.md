---
inclusion: always
---

# Avnish Yadav — Portfolio Website: Full Project Context

## Project Overview
A personal portfolio website for **Avnish Yadav**, a Software Engineer with 4+ years of experience. Built as a static site deployed on Firebase Hosting. The entire project was built in under a day using AI-assisted development and prompt engineering with **Kiro**.

- **Live URL:** https://avnish-portfolio-c14e6.web.app/
- **Firebase Project:** avnish-portfolio-c14e6
- **Deployment:** Firebase Hosting (CDN + SSL)
- **Dev server:** `npm run dev` (http-server on port 3000)
- **Deploy command:** `firebase deploy`

---

## File Structure

```
/
├── index.html                        # Main single-page portfolio
├── css/
│   └── style.css                     # All styles — theming, layout, animations, detail pages
├── js/
│   └── app.js                        # Firebase init + all JS logic
├── images/
│   ├── avnish-transparent.png        # Profile photo (hero + about)
│   └── one-editor-logo.svg           # Logo for One Note project card
├── projects/                         # Individual project detail pages
│   ├── one-note.html
│   ├── team-chat-logs.html
│   ├── portfolio.html
│   └── ai-dress-tryon.html
├── .kiro/
│   └── steering/
│       └── project-context.md        # This file — auto-included in all AI sessions
├── firebase.json                     # Firebase hosting config (serves from root)
├── .firebaserc                       # Firebase project alias
├── package.json                      # npm scripts + firebase dependency
├── README.md                         # Full project documentation
├── about.html                        # Empty, not in use
└── contact.html                      # Empty, not in use
```

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

---

## Page Sections (`index.html`)

| Section | Content |
|---|---|
| `header` | Hero — profile photo, name, tagline, CTA button |
| `#about` | Bio — profile photo + 2-paragraph description |
| `#skills` | 4 skill categories: Languages, Frameworks & Tech, Database & Tools, AI & Automation |
| `#projects` | 4 project cards — each has Live Demo, GitHub, and Read More buttons |
| `#experience` | 3 cards: Aloha Technology (EleVia), Make the Dot, Education |
| `#contact` | Contact form (name, email, message) |
| `footer` | Social links (LinkedIn, GitHub, Instagram, Email) + copyright |

### Project Cards & Their Detail Pages

| Project | Card Emoji | Detail Page |
|---|---|---|
| One Note | `📝` (logo img) | `projects/one-note.html` |
| TeamChatLogs | `🗂️` | `projects/team-chat-logs.html` |
| Modern Portfolio Website | `🌐` | `projects/portfolio.html` |
| AI Dress Try-On App | `💃` | `projects/ai-dress-tryon.html` |

Each project card has three buttons: **Live Demo** (filled gradient), **GitHub** (outlined), **Read More** (outlined, links to detail page).

---

## CSS Architecture (`css/style.css`)

### Theming — CSS Custom Properties

| Variable | Light | Dark |
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

- Dark mode is the **default** — `<body class="dark">` in HTML
- Theme persists via `localStorage` key `theme`
- Primary gradient: `linear-gradient(45deg, #667eea, #764ba2)`
- Page background: `linear-gradient(156deg, #000000 0%, #7e00ff 100%)`

### Layout
- Max content width: `1200px` via `.container`
- Responsive breakpoints: `768px` (tablet), `480px` (mobile)
- `.skills-grid` — `auto-fit, minmax(220px, 1fr)`
- `.projects-grid` — `auto-fit, minmax(350px, 1fr)`

### Animations
- `fadeInUp` — hero text entrance, triggered via `.fade-in` class by Intersection Observer
- `blinkStars` — CSS starfield on `.starfield::before/::after`
- `fallStar` — mouse-trail particles (JS-generated `.falling-star` divs)

### Project Detail Page Classes (added in projects/ pages)
- `.project-detail-hero` — full-width hero for detail pages
- `.detail-section` — alternating surface/soft background sections
- `.back-link` — "← Back to Projects" navigation
- `.highlight-box` — left-bordered callout quote block
- `.two-col` — 2-column grid (collapses to 1 on mobile)
- `.tech-tags` / `.tech-tag` — pill tags for tech stack display

### Button Styles
All `.project-links a` are uniform pill buttons (`border-radius: 25px`, `padding: 0.45rem 1.1rem`, `font-size: 0.9rem`):
- First child → filled gradient (Live Demo)
- Middle children → outlined accent (GitHub)
- `.read-more` → outlined accent (Read More → detail page)

---

## JavaScript Logic (`js/app.js`)

1. **Theme persistence** — reads `localStorage` on load, applies `.dark` before first paint
2. **Smooth scroll** — intercepts `nav a[href^="#"]` clicks
3. **Active nav highlight** — scroll listener updates `.active` on nav links
4. **Intersection Observer** — adds `.fade-in` to sections/cards when entering viewport
5. **Contact form** — validation + 2s simulated async submit
6. **Project card hover** — `translateY(-10px) scale(1.02)` on mouseenter
7. **Typing effect** — `header h1` types character by character on load (100ms/char)
8. **Scroll-to-top button** — dynamically injected, visible after 300px scroll
9. **Mobile menu toggle** — `.menu-toggle` toggles `.open` on `nav ul`
10. **Starfield** — 150 `.star` divs injected into `.starfield` on load
11. **Mouse trail** — `mousemove` creates `.falling-star` divs that self-remove after animation

### Project Detail Pages (projects/*.html)
Each detail page is self-contained with:
- Same nav (links back to `../index.html#section`)
- Same footer with social links
- Inline `<script>` for theme persistence + starfield + mouse trail
- No dependency on `app.js` (avoids Firebase import issues from subdirectory)

---

## Owner / Resume Context

**Avnish Yadav** — Software Engineer, Pune, India

| | |
|---|---|
| Email | avnishy84@gmail.com |
| LinkedIn | linkedin.com/in/avnishy84 |
| GitHub | github.com/avnishy84 |
| Instagram | instagram.com/avnish__yadav |

**Core Skills:** C#, .NET, SQL Server, JavaScript, React, Angular, Sencha Ext JS, REST APIs, Python
**AI Focus:** Prompt Engineering, LLM APIs, Generative AI, AI-assisted development
**Education:** MCA — AKTU Lucknow (77.80%) · BCA — CSJMU Kanpur (63.00%)

**Current Role:** Software Engineer at Aloha Technology (EleVia Platform), Jan 2022 – Present
- 30% SQL performance improvement via query and stored procedure optimization
- 20% faster query response via database normalization initiative
- Full-stack: Sencha Ext JS (legacy) + React (modernization) + C#/.NET backend
- Production issue resolution across UI, APIs, and database layers

---

## Common Tasks

### Add a new project card to index.html
```html
<div class="project-card">
    <div class="project-image">🔧</div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Short description.</p>
        <div class="project-links">
            <a href="#" target="_blank">Live Demo</a>
            <a href="#" target="_blank">GitHub</a>
            <a href="projects/my-project.html" class="read-more">Read More</a>
        </div>
    </div>
</div>
```

### Add a new project detail page
Copy any existing `projects/*.html` as a template. Update:
- `<title>`, `<h1>`, `.emoji`, hero `<p>`, hero links
- All `.detail-section` content blocks
- Keep the inline `<script>` at the bottom unchanged

### Add a skill tag
```html
<span class="skill-tag">New Skill</span>
```

### Deploy
```bash
firebase deploy
```

### Run locally
```bash
npm run dev
# Opens http://127.0.0.1:3000
# Ignore the 404 for /.well-known/appspecific/com.chrome.devtools.json — Chrome DevTools probe, harmless
```

### Change accent colors
Update `--color-accent` and `--color-accent-2` in both `:root` and `.dark` in `style.css`.
