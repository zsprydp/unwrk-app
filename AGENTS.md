# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
UnWrk is a Pomodoro focus timer PWA built with React 18 + Vite + Tailwind CSS v4. Data persists to localStorage via `src/lib/storage.js`. An optional Supabase integration provides auth (magic link) and cloud sync when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars are set.

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
- ESLint shows 2-3 warnings (exhaustive-deps, react-refresh) — these are intentional and not errors.
- The app works fully offline without Supabase credentials. When `VITE_SUPABASE_URL` is not set, auth falls back to a demo mode that persists to localStorage only.
- Database schema for Supabase is in `supabase/schema.sql` — run it in the Supabase SQL Editor when setting up a new project.
