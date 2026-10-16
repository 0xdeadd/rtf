@AGENTS.md

## Static site (Supabase removed 2026-10-16)

Public static site for the Road To Freedom Group (RTF). No auth, no API routes, no Supabase. The old Supabase backup at `.supabase-backup/` is kept locally only (restore.sql), do not touch it.

Data files (imported at build time):
- `data/meetings.json`: day_of_week (0=Sun), time, tags, note
- `data/meeting-notices.json`: notices shown on the meetings page
- `data/events.json`: events (empty array shows the empty state)
- `data/announcements.json`: announcements, read by the home and announcements pages

Tenth Step link target: https://tenth-step-taupe.vercel.app (nav, footer, home card; opens in a new tab).

Deploy with `vercel --prod`. Git is not connected to Vercel.
