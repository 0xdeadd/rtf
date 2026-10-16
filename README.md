# RTF (Road To Freedom Group)

Public static website for the Road To Freedom Group, an open AA home group meeting at the Log Cabin, 901 South Park St, Carrollton, GA.

Static Next.js site. All content lives in JSON files under `data/` (meetings, meeting notices, events, announcements) and is imported at build time. There is no backend, login, or database.

```bash
npm install
npm run dev      # local dev
npm run build    # production build
```

Deploy with `vercel --prod` from the CLI. Git is not connected to Vercel, so pushing to git does not deploy.
