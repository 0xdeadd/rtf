import "server-only";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

type Payload = Record<string, unknown>;

export interface Resource {
  table: string;
  /** Validate the request body and return the row to write, or an error string. */
  build: (body: Payload) => { row: Payload } | { error: string };
  paths: string[];
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const strOrNull = (v: unknown) => str(v) || null;
const int = (v: unknown, fallback = 0) => {
  const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
};

export const meetingsResource: Resource = {
  table: "meetings",
  paths: ["/meetings", "/admin"],
  build: (b) => {
    const day = int(b.day_of_week, -1);
    const time = str(b.time);
    if (day < 0 || day > 6 || !time) {
      return { error: "Day of week and time are required" };
    }
    const tags = Array.isArray(b.tags)
      ? b.tags.filter((t): t is string => typeof t === "string" && t.trim() !== "")
      : [];
    return {
      row: { day_of_week: day, time, tags, note: strOrNull(b.note), sort_order: int(b.sort_order) },
    };
  },
};

export const noticesResource: Resource = {
  table: "meeting_notices",
  paths: ["/meetings", "/admin"],
  build: (b) => {
    const text = str(b.text);
    if (!text) return { error: "Text is required" };
    return { row: { text, sort_order: int(b.sort_order) } };
  },
};

export const announcementsResource: Resource = {
  table: "announcements",
  paths: ["/announcements", "/", "/admin"],
  build: (b) => {
    const title = str(b.title);
    const date = str(b.date);
    if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return { error: "Title and date are required" };
    }
    return { row: { title, date, body: strOrNull(b.body), category: strOrNull(b.category) } };
  },
};

export const eventsResource: Resource = {
  table: "events",
  paths: ["/events", "/admin"],
  build: (b) => {
    const title = str(b.title);
    const date = str(b.event_date);
    if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return { error: "Title and date are required" };
    }
    return {
      row: {
        title,
        event_date: date,
        event_time: strOrNull(b.event_time),
        description: strOrNull(b.description),
        people_involved: strOrNull(b.people_involved),
      },
    };
  },
};

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function done(r: Resource) {
  for (const p of r.paths) revalidatePath(p);
}

async function readBody(request: Request): Promise<Payload | null> {
  try {
    const b = await request.json();
    return b && typeof b === "object" ? (b as Payload) : null;
  } catch {
    return null;
  }
}

export async function handleCreate(r: Resource, request: Request) {
  if (!(await isAdmin())) return fail("Unauthorized", 401);
  const body = await readBody(request);
  if (!body) return fail("Invalid JSON", 400);
  const built = r.build(body);
  if ("error" in built) return fail(built.error, 400);
  try {
    const { data, error } = await supabaseAdmin().from(r.table).insert(built.row).select().single();
    if (error) return fail(error.message, 500);
    done(r);
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Server error", 500);
  }
}

export async function handleUpdate(r: Resource, request: Request, id: string) {
  if (!(await isAdmin())) return fail("Unauthorized", 401);
  const body = await readBody(request);
  if (!body) return fail("Invalid JSON", 400);
  const built = r.build(body);
  if ("error" in built) return fail(built.error, 400);
  try {
    const { data, error } = await supabaseAdmin()
      .from(r.table)
      .update(built.row)
      .eq("id", id)
      .select()
      .single();
    if (error) return fail(error.message, 500);
    done(r);
    return NextResponse.json(data);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Server error", 500);
  }
}

export async function handleDelete(r: Resource, id: string) {
  if (!(await isAdmin())) return fail("Unauthorized", 401);
  try {
    const { error } = await supabaseAdmin().from(r.table).delete().eq("id", id);
    if (error) return fail(error.message, 500);
    done(r);
    return NextResponse.json({ success: true });
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Server error", 500);
  }
}
