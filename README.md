# Mwesh Portfolio — Mweshimiwa Enterprises

**Live:** [mega7306626007.github.io/portfolio](https://mega7306626007.github.io/portfolio/)

A world-class, zero-build static portfolio for Emmanuel (Mwesh). Warm editorial design — paper tones, Fraunces serif headlines, Inter body, JetBrains Mono for code. No frameworks, no bundler, no dependencies.

## What's on it

- **Hero + terminal** — live typewriter intro with command hints
- **Work** — 8 featured projects: Jarvis (mwesh), PesaFlow, SMS Engine, Calendar Rescheduler, Transcriber, PyChat, The Heart v2, Parlons — every row links its real repo + live demo
- **Systems** — honest SVG architecture diagrams of the three flagship systems
- **Lab** — interactive demos: M-PESA SMS classifier (top-3 ranking + test history), scheduler push simulator (week view), Jarvis intent router (EN × SW × Sheng × FR)
- **GitHub feed** — live repo feed pulled from the GitHub API
- **Contact** — copy-to-clipboard email + GitHub

## Preview locally

```powershell
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Already wired to **GitHub Pages**: push to `main` and it goes live (via `.github/workflows/pages.yml`), or set **Settings → Pages → Deploy from branch → `main` / root**.

## Files

- `index.html` — all content (sections, project rows, lab panels)
- `styles.css` — warm editorial design system (palette, type, components)
- `script.js` — terminal, classifier, push sim, Jarvis router, modal, command palette, GitHub feed
- `.nojekyll` — Pages helper
- `.github/workflows/pages.yml` — auto-deploy on push

## Customize

- `script.js` → `SITE` object (email, GitHub URL, API endpoint)
- `styles.css` → CSS variables at the top (paper, ink, accent, moss…)
- Each project is one `<article class="proj">` block in `index.html`
