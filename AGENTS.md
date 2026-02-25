# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
UnWrk is a Pomodoro focus timer PWA built with React 18 + Vite + Tailwind CSS v4. Data persists to localStorage via `src/lib/storage.js`. Optional integrations:
- **Supabase**: Auth (magic link) + cloud sync when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are set.
- **Stripe**: Payment checkout when `VITE_STRIPE_PUBLISHABLE_KEY` is set.

Without these env vars, the app falls back to demo mode (localStorage only, no real payments).

### Running the dev server
```
npm run dev
```
Opens on `http://localhost:5173` with HMR. See `package.json` scripts for all commands.

### Lint / Test / Build
- **Lint**: `npm run lint`
- **Test**: `npm test` (Vitest, 21 tests across storage, Backend, soundOptions)
- **Format**: `npm run format:check`
- **Build**: `npm run build`

### Deployment
`vercel.json` is pre-configured. Set env vars in the hosting dashboard per `.env.example`. Database schema for Supabase is in `supabase/schema.sql`.

### Key caveats
- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js`. Import is `@import 'tailwindcss'` in `src/index.css`.
- ESLint shows 2-3 warnings (exhaustive-deps, react-refresh) — intentional, not errors.
- Service worker uses network-first for Vite hashed `/assets/` and cache-first for static PWA files.
