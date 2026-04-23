# Focus Streak

A Pomodoro-style focus timer with visual streak tracking. Built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## Features

- **30-minute focus timer** (configurable) with start/pause/reset
- **5-minute break timer** between sessions
- **Browser notifications** and audio alerts when timers complete
- **Visual streak strip** showing last 14 days of activity
- **Weekly bar chart** for trend visualization
- **Session history** with timestamps
- **Dual storage**: Server-side JSON API + localStorage fallback for offline/static hosting

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui design system (CSS variables)
- Lucide React icons
- Recharts for data visualization

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The JSON API persists sessions to `data/sessions.json`.

## Deployment Options

### Option 1: Netlify (Recommended for serverless API)

1. Push this repo to GitHub
2. Connect the repo at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the Next.js runtime plugin if prompted

API routes will work as serverless functions. Note: JSON file storage is ephemeral on serverless — data resets on cold starts. For production, migrate to a database.

### Option 2: Vercel

1. Push this repo to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Framework preset: Next.js

### Option 3: Static Hosting (GitHub Pages, etc.)

If deploying as a static site without a server:

1. Change `next.config.js` to add `output: 'export'` and `distDir: 'dist'`
2. Remove the API route folder `src/app/api/`
3. Build with `npm run build`
4. Deploy the `dist` folder

The app will use **localStorage** for persistence and work fully offline.

## Data Storage

The app attempts to use the server-side JSON API first. If the API is unavailable (e.g., static hosting), it seamlessly falls back to `localStorage` in the browser. Sessions are never lost.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/sessions/     # JSON API (GET / POST)
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Main dashboard
│   │   └── globals.css
│   ├── components/
│   │   ├── Timer.tsx         # Focus/break timer with SVG progress ring
│   │   ├── StreakView.tsx    # 14-day streak strip + stats
│   │   └── WeeklyChart.tsx   # Recharts bar chart
│   └── lib/
│       └── utils.ts          # Tailwind cn() utility
├── data/
│   └── sessions.json         # Server-side JSON store
└── netlify.toml              # Netlify build config
```

## Next Steps

- Replace JSON file storage with PostgreSQL / SQLite / Redis
- Add session labeling and categorization
- Add daily/weekly goals
- Export session data to CSV
