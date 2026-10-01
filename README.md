# Emmanuel — Obsidian Onyx Portfolio

World-class, zero-build static site. Ready for **GitHub Pages**.

## Preview locally
```powershell
cd portfolio-site
python -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages (2 min)

**Option A — User site (recommended, gives `USERNAME.github.io`):**
1. Create a new public repo named exactly `USERNAME.github.io` (replace USERNAME).
2. Copy the contents of `portfolio-site/` into the repo root (index.html, styles.css, script.js, 404.html, .nojekyll).
3. Push. Go to repo **Settings → Pages → Deploy from branch → `main` / root**.
4. Live at `https://USERNAME.github.io` in ~1 min.

**Option B — Project site:**
1. Create repo `portfolio`, copy `portfolio-site/` contents to root, push.
2. Settings → Pages → branch `main`. Live at `https://USERNAME.github.io/portfolio/`.

The included workflow (`.github/workflows/pages.yml`) also auto-deploys on push — just push and it goes live.

## Customize (1 min)
- Open `script.js` → edit `SITE` object (email, github, linkedin).
- Open `index.html` → replace all `USERNAME` links + `hello@emmanuel.systems`.
- Swap stats, timeline, projects — each project is one `<article class="card">`.

## Files
- `index.html` — all content
- `styles.css` — Obsidian Onyx theme
- `script.js` — particles, typer, filters, modal, palette, Nairobi clock
- `404.html`, `.nojekyll` — Pages helpers
