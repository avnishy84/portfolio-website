---
inclusion: always
---

# Avnish Yadav — Portfolio Website: Full Project Context

## Project Overview
A personal portfolio website for **Avnish Yadav**, a Software Engineer with 4+ years of experience. Built as a static site deployed on Firebase Hosting. The entire project was built in under a day using AI-assisted development and prompt engineering.

- **Live URL:** https://avnish-portfolio-c14e6.web.app/
- **Firebase Project:** avnish-portfolio-c14e6
- **Deployment:** Firebase Hosting (CDN + SSL)
- **Dev server:** `npm run dev` (http-server on port 3000)
- **Deploy command:** `firebase deploy`

---

## File Structure

```
/
├── index.html          # Main single-page portfolio (primary file)
├── about.html          # Empty (not in use)
├── contact.html        # Empty (not in use)
├── css/
│   └── style.css       # All styles — theming, animations, responsive layout
├── js/
│   └── app.js          # Firebase init + all JS logic
├── images/
│   ├── avnish-transparent.png   # Profile photo used in hero + about
│   └── one-editor-logo.svg      # Logo for One Note project card
├── public/
│   └── index.html      # Unused placeholder
├── firebase.json       # Firebase hosting config (serves from root)
├── .firebaserc         # Firebase project alias
└── package.json        # npm scripts + firebase dependency
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, keyframe animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Backend/Auth | Firebase (Analytics only) |
| Hosting | Firebase Hosting |
| Fonts | Google Fonts — Inter, Lato, Montserrat |
| Icons | Font Awesome 6.4.0 |

---

## CSS Architecture (`css/style.css`)

### Theming
- CSS custom properties defined on `:root` (light) and `.dark` (dark mode)
- Key variables: `--color-text`, `--color-surface`, `--color-soft`, `--color-accent`, `--color-accent-2`, `--hover-pop`, `--shadow`
- Dark mode is the default (`<body class="dark">`)
- Theme persists via `localStorage` key `theme`

### Key Design Tokens
- Primary gradient: `linear-gradient(45deg, #667eea, #764ba2)` (indigo → plum)
- Dark accent: `#E0BBE4` (lavender) / `#957DAD` (plum)
- Hover pop color: `#FFC72C` (yellow)
- Background: `linear-gradient(156deg, #000000 0%, #7e00ff 100%)`

### Animations
- `fadeInUp` — hero text entrance
- `blinkStars` — CSS starfield overlay (`.starfield` pseudo-elements)
- `fallStar` — mouse-trail falling star particles (JS-generated `.falling-star` divs)
- Intersection Observer triggers `.fade-in` on scroll

### Layout
- Max content width: `1200px` via `.container`
- Responsive breakpoints: `768px` (tablet), `480px` (mobile)
- Grids: `.skills-grid` (auto-fit, min 220px), `.projects-grid` (auto-fit, min 350px)

---

## JavaScript Logic (`js/app.js`)

### Firebase
- Initializes Firebase app + Analytics
- Config keys are present in the file (public-facing, Firebase security rules apply)

### Features
1. **Theme persistence** — reads `localStorage` on load, applies before first paint
2. **Smooth scroll** — intercepts `nav a[href^="#"]` clicks
3. **Active nav highlight** — scroll listener updates `.active` class on nav links
4. **Intersection Observer** — fade-in animations for sections, project cards, skill categories
5. **Contact form** — validation + simulated submit (2s delay, alert, reset)
6. **Project card hover** — `mouseenter/mouseleave` scale + translateY effect
7. **Typing effect** — `header h1` types out character by character on load
8. **Scroll-to-top button** — dynamically injected, appears after 300px scroll
9. **Mobile menu toggle** — `.menu-toggle` button toggles `.open` on `nav ul`
10. **Dark mode toggle** — `.theme-toggle` button (currently hidden in HTML via comment)
11. **Starfield** — 150 `.star` divs injected into `.starfield` on load
12. **Mouse trail** — `mousemove` creates `.falling-star` divs that animate and self-remove

---

## Page Sections (`index.html`)

| Section ID | Content |
|---|---|
| `header` | Hero — profile photo, name, tagline, CTA button |
| `#about` | Bio — profile photo + 2-paragraph description |
| `#skills` | 4 skill categories: Languages, Frameworks, Database & Tools, AI & Automation |
| `#projects` | 4 project cards: Portfolio Website, AI Dress Try-On, One Note, TeamChatLogs |
| `#experience` | 3 experience cards: Aloha Technology, Make the Dot, Education |
| `#contact` | Contact form (name, email, message) |
| `footer` | Social links (LinkedIn, GitHub, Instagram, Email) + copyright |

---

## Owner / Resume Context

**Avnish Yadav**
- Role: Software Engineer, 4+ years experience
- Location: Pune, India
- Email: avnishy84@gmail.com
- LinkedIn: linkedin.com/in/avnishy84
- GitHub: github.com/avnishy84

**Core Skills:** C#, .NET, SQL Server, JavaScript, React, Angular, Sencha Ext JS, REST APIs, Python
**AI Focus:** Prompt Engineering, LLM APIs, Generative AI, AI-assisted development
**Education:** MCA — AKTU Lucknow (77.80%), BCA — CSJMU Kanpur (63.00%)

**Current Role:** Software Engineer at Aloha Technology (EleVia Platform), Jan 2022 – Present
- 30% SQL performance improvement, 20% faster query response via DB normalization
- Full-stack work: Sencha Ext JS (legacy) + React (modernization) + C#/.NET backend

---

## Common Tasks & How To Do Them

### Add a new project card
Add inside `#projects .projects-grid`:
```html
<div class="project-card">
    <div class="project-image">🔧</div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Description here.</p>
        <div class="project-links">
            <a href="#" target="_blank">Live Demo</a>
            <a href="#" target="_blank">GitHub</a>
        </div>
    </div>
</div>
```

### Add a new skill tag
Find the relevant `.skill-category` block and add:
```html
<span class="skill-tag">New Skill</span>
```

### Deploy to Firebase
```bash
firebase deploy
```

### Run locally
```bash
npm run dev
```

### Change accent colors
Update `--color-accent` and `--color-accent-2` in both `:root` and `.dark` blocks in `style.css`.
