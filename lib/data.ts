import "server-only";
import { supabaseAnon } from "@/lib/supabase";
import meetingsJson from "@/data/meetings.json";
import noticesJson from "@/data/meeting-notices.json";
import announcementsJson from "@/data/announcements.json";
import eventsJson from "@/data/events.json";

export interface Meeting {
  id: string;
  day_of_week: number;
  time: string;
  tags: string[];
  note: string | null;
  sort_order: number;
}

export interface MeetingNotice {
  id: string;
  text: string;
  sort_order: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string | null;
  category: string | null;
  date: string;
}

export interface GroupEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  people_involved: string | null;
}

/** Run a Supabase query; return null on missing env or any error so callers fall back to JSON. */
async function query<T>(
  run: (db: NonNullable<ReturnType<typeof supabaseAnon>>) => PromiseLike<{
    data: T[] | null;
    error: unknown;
  }>
): Promise<T[] | null> {
  try {
    const db = supabaseAnon();
    if (!db) return null;
    const { data, error } = await run(db);
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getMeetings(): Promise<Meeting[]> {
  const rows = await query<Meeting>((db) =>
    db
      .from("meetings")
      .select("id, day_of_week, time, tags, note, sort_order")
      .order("day_of_week", { ascending: true })
      .order("sort_order", { ascending: true })
  );
  if (rows) return rows.map((m) => ({ ...m, tags: m.tags ?? [] }));
  return meetingsJson.map((m, i) => ({
    id: `json-${i}`,
    day_of_week: m.day_of_week,
    time: m.time,
    tags: m.tags,
    note: m.note || null,
    sort_order: i,
  }));
}

export async function getMeetingNotices(): Promise<MeetingNotice[]> {
  const rows = await query<MeetingNotice>((db) =>
    db
      .from("meeting_notices")
      .select("id, text, sort_order")
      .order("sort_order", { ascending: true })
  );
  if (rows) return rows;
  return noticesJson.map((n, i) => ({ id: n.id, text: n.text, sort_order: i }));
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await query<Announcement>((db) =>
    db
      .from("announcements")
      .select("id, title, body, category, date")
      .order("date", { ascending: false })
  );
  if (rows) return rows;
  return [...announcementsJson]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => ({
      id: a.id,
      title: a.title,
      body: a.body || null,
      category: a.category || null,
      date: a.date,
    }));
}

export async function getEvents(): Promise<GroupEvent[]> {
  const rows = await query<GroupEvent>((db) =>
    db
      .from("events")
      .select("id, title, description, event_date, event_time, people_involved")
      .order("event_date", { ascending: true })
  );
  if (rows) return rows;
  type JsonEvent = {
    id: string;
    title: string;
    date: string;
    time?: string;
    description?: string;
    people_involved?: string;
  };
  return (eventsJson as JsonEvent[]).map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description || null,
    event_date: e.date,
    event_time: e.time || null,
    people_involved: e.people_involved || null,
  }));
}
