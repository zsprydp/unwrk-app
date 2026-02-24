# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
UnWrk is a Pomodoro focus timer PWA built with React 18 + Vite + Tailwind CSS v4. The "backend" is simulated in-browser via `src/lib/Backend.js` (no real API server or database).

### Running the dev server
```
npm run dev
```
Opens on `http://localhost:5173` with HMR. See `package.json` scripts for all available commands (`lint`, `format`, `build`, `preview`).

### Lint / Test / Build
- **Lint**: `npm run lint` (ESLint with react-hooks and react-refresh plugins)
- **Format**: `npm run format:check` / `npm run format` (Prettier)
- **Build**: `npm run build` (Vite production build to `dist/`)
- **No automated test runner** is configured yet. Validation is manual via the browser.

### Key caveats
- Tailwind CSS v4 is used via the `@tailwindcss/vite` plugin — there is no `tailwind.config.js` or `postcss.config.js`. The import is `@import 'tailwindcss'` in `src/index.css`.
- PWA assets (manifest, service worker, icons) live in `public/` and are served as-is by Vite.
- ESLint shows 2 `react-hooks/exhaustive-deps` warnings in `App.jsx` — these are intentional to match the original app behavior (interval-based timer and sound effects).
