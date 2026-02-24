# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
UnWrk is a static Pomodoro focus timer PWA. The entire application is a single `index.html` file with inline React 18 (via CDN), Tailwind CSS (via CDN), and Babel standalone (via CDN). There is no build system, no package manager, and no backend — the "backend" is simulated in-browser.

### Running the dev server
Serve the repo root with any static HTTP server. Service workers require HTTP (not `file://`).
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

### Lint / Test / Build
- **No linter, test runner, or build step is configured.** The project has no `package.json`, no CI, and no automated tests.
- Validation is manual: open the app in a browser and interact with the timer, settings, and sound controls.

### Key caveats
- All dependencies (React 18, Tailwind CSS, Babel standalone) are loaded from CDNs at runtime, so an internet connection is required on first load.
- The service worker caches assets for offline use after the first visit.
- PWA icon files are named `icon-192.png.png` and `icon-512.png.png` in the repo but referenced as `icon-192.png` / `icon-512.png` in `manifest.json` and `service-worker.js` — this mismatch means PWA install and icons may not work locally without renaming.
