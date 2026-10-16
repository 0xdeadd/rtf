@AGENTS.md

## Architecture (Supabase + admin, 2026-10-16)

Public site for the Road To Freedom Group (RTF). Content lives in Supabase and is edited at `/admin`. The public pages stay statically prerendered (ISR, `revalidate = 3600`) and admin writes call `revalidatePath` so changes show up right away.

- Supabase project ref `vjguxzlqnmuaxmlgveuv` is SHARED with other apps. Only touch the tables `meetings`, `meeting_notices`, `announcements`, `events`. Public SELECT is allowed by RLS; writes need the service role key.
- Reads: `lib/data.ts` (getMeetings, getMeetingNotices, getAnnouncements, getEvents) use the anon client and fall back to `data/*.json` if env is missing or a query errors. Keep the JSON files as the fallback source.
- Clients: `lib/supabase.ts` (`supabaseAnon()`, `supabaseAdmin()`), created lazily so builds work without env vars. Server-only.
- Admin: `/admin` (UI in `app/admin/(protected)`, sign-in at `/admin/login`). One shared password in the Vercel env var `ADMIN_PASSWORD`. No middleware: the protected layout and page check the cookie, and every write route handler under `app/api/admin/**` calls `isAdmin()` first (401 otherwise). Shared handler logic is in `lib/admin-api.ts`.
- Session: cookie `rtf_admin`, token `${expiresAtMs}.${HMAC-SHA256 hex}` signed with `ADMIN_SESSION_SECRET`, httpOnly, 30 days (`lib/auth.ts`).
- Env vars (see `.env.example`): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, ADMIN_SESSION_SECRET. Set in Vercel for production.
- The old Supabase backup at `.supabase-backup/` is kept locally only (restore.sql), do not touch it.

Tenth Step link target: https://tenth-step-taupe.vercel.app (nav, footer, home card; opens in a new tab).

Deploy with `vercel --prod`. Git is not connected to Vercel.

## Deploy

- Vercel project: rtf-carrollton (git disconnected). Live: https://rtf-carrollton.vercel.app (verified 2026-10-16).
- Deploy: `vercel --prod`, then `git push` separately. GitHub: 0xdeadd/rtf.
- Research on the group and schedule sources: docs/rtf-findings.md (schedule unverified with the group).
