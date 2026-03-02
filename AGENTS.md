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
`vercel.json` is pre-configured. Set env vars in the hosting dashboard per `.env.example`.

### Supabase setup
The database schema is in `supabase/schema.sql`. To enable cloud sync:
1. Create a Supabase project and set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env.local`.
2. Run `supabase/schema.sql` in the Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run). This creates `profiles` and `sessions` tables, RLS policies, and an auto-profile trigger.
3. Add both `http://localhost:5173` and `https://unwrk.space` to Authentication → URL Configuration → Redirect URLs.

Without the schema, auth still initializes but sync operations log warnings and fall back to localStorage.

### Key caveats
- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js`. Import is `@import 'tailwindcss'` in `src/index.css`.
- ESLint shows 2-3 warnings (exhaustive-deps, react-refresh) — intentional, not errors.
- Service worker uses network-first for Vite hashed `/assets/` and cache-first for static PWA files.
- `.env.local` is gitignored; create it from `.env.example` when setting up a new environment.
