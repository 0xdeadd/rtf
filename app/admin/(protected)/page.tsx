import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { supabaseAnon } from "@/lib/supabase";
import type {
  Announcement,
  GroupEvent,
  Meeting,
  MeetingNotice,
} from "@/lib/data";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | RTF",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function load<T>(
  table: string,
  columns: string,
  order: { col: string; asc: boolean }[]
): Promise<{ rows: T[]; error: string | null }> {
  const db = supabaseAnon();
  if (!db) return { rows: [], error: "Supabase is not configured." };
  let q = db.from(table).select(columns);
  for (const o of order) q = q.order(o.col, { ascending: o.asc });
  const { data, error } = await q;
  if (error) return { rows: [], error: `${table}: ${error.message}` };
  return { rows: (data ?? []) as T[], error: null };
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [meetings, notices, announcements, events] = await Promise.all([
    load<Meeting>("meetings", "id, day_of_week, time, tags, note, sort_order", [
      { col: "day_of_week", asc: true },
      { col: "sort_order", asc: true },
    ]),
    load<MeetingNotice>("meeting_notices", "id, text, sort_order", [
      { col: "sort_order", asc: true },
    ]),
    load<Announcement>("announcements", "id, title, body, category, date", [
      { col: "date", asc: false },
    ]),
    load<GroupEvent>(
      "events",
      "id, title, description, event_date, event_time, people_involved",
      [{ col: "event_date", asc: true }]
    ),
  ]);

  const errors = [meetings, notices, announcements, events]
    .map((r) => r.error)
    .filter((e): e is string => Boolean(e));

  return (
    <AdminDashboard
      meetings={meetings.rows}
      notices={notices.rows}
      announcements={announcements.rows}
      events={events.rows}
      errors={errors}
    />
  );
}
