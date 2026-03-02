# UnWrk - Focus Timer

Do less, achieve more.

**Live:** [unwrk.space](https://unwrk.space)

## Tech Stack

- **React 18** with JSX
- **Vite** build tool
- **Tailwind CSS v4**
- **Web Audio API** for binaural beats and ambient sounds
- **PWA** with service worker and manifest
- **Supabase** for auth + cloud sync (optional)
- **Stripe** for payments (optional)

## Getting Started

```bash
cp .env.example .env.local  # then fill in your keys
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/
│   ├── icons/          # SVG icon components
│   ├── AnalyticsView   # Progress & analytics panel
│   ├── AuthModal       # Magic link auth flow
│   ├── Celebration     # Session complete overlay
│   ├── NoteInputModal  # Quick note capture
│   ├── SettingsView    # Timer & sound settings
│   ├── SoundPanel      # Ambient sound picker
│   ├── TaskInputModal  # Task entry dialog
│   ├── TimerView       # Main timer with controls
│   └── UpgradeModal    # Stripe plan selection
├── context/
│   └── AuthContext      # Supabase auth provider
├── lib/
│   ├── AudioEngine.js  # Web Audio API sound engine
│   ├── Backend.js      # localStorage-backed data layer
│   ├── soundOptions.js # Sound configuration data
│   ├── storage.js      # localStorage abstraction
│   ├── stripe.js       # Stripe checkout integration
│   ├── supabase.js     # Supabase client
│   └── sync.js         # Cloud sync (push/pull)
├── App.jsx             # Root component
├── index.css           # Global styles + Tailwind
└── main.jsx            # Entry point
public/
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline caching
├── icon-192.png        # PWA icon
└── icon-512.png        # PWA icon
supabase/
└── schema.sql          # Database migration
```

## Features

- **Free Tier**: Timer, White/Brown/Pink Noise, Meditation sounds
- **Premium ($4.99/mo or $39/yr)**: Binaural beats, Analytics, Goal tracking

## Deployment

The project includes a `vercel.json` for one-click deployment to [Vercel](https://vercel.com). Set your custom domain to `unwrk.space` in the Vercel dashboard.

Set the following environment variables in your hosting dashboard (all optional):

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL for auth + cloud sync |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payments |
| `VITE_STRIPE_PRICE_MONTHLY` | Stripe Price ID for monthly plan |
| `VITE_STRIPE_PRICE_YEARLY` | Stripe Price ID for yearly plan |

See `.env.example` for details.

## CI

GitHub Actions runs lint + test + build on every push to `main` and on pull requests.

---

[unwrk.space](https://unwrk.space)
