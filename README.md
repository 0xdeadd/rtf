# RTF (Road To Freedom Group)

Public static website for the Road To Freedom Group, an open AA home group meeting at the Log Cabin, 901 South Park St, Carrollton, GA.

Next.js site backed by Supabase. Public pages (meetings, announcements, events, home) are statically prerendered and read from Supabase, falling back to the JSON files in `data/` if Supabase is unavailable or not configured. Group leaders edit content at `/admin` with a single shared password.

Copy `.env.example` to `.env.local` and fill in the Supabase keys, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`. The site builds and runs without them (JSON fallback, admin disabled).

```bash
npm install
npm run dev      # local dev
npm run build    # production build
```

Deploy with `vercel --prod` from the CLI. Git is not connected to Vercel, so pushing to git does not deploy.
