"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X, ExternalLink, LogOut } from "lucide-react";
import TagBadge from "@/app/components/TagBadge";
import type {
  Announcement,
  GroupEvent,
  Meeting,
  MeetingNotice,
} from "@/lib/data";

type TabKey = "meetings" | "notices" | "announcements" | "events";

const TABS: { key: TabKey; label: string; endpoint: string }[] = [
  { key: "meetings", label: "Meetings", endpoint: "meetings" },
  { key: "notices", label: "Meeting notes", endpoint: "meeting-notices" },
  { key: "announcements", label: "Announcements", endpoint: "announcements" },
  { key: "events", label: "Events", endpoint: "events" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const ALL_TAGS = [
  "Open",
  "Closed",
  "Discussion",
  "12 Step Study",
  "Big Book",
  "Grapevine",
  "Speaker",
  "Beginners",
  "Women",
  "Men",
];
const CATEGORIES = ["News", "Event", "Schedule", "General"];

const inputCls =
  "w-full rounded-lg border border-warm-gray bg-white px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-navy-dark text-white font-medium px-4 py-3 text-base hover:bg-navy transition-colors disabled:opacity-50";
const ghostBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-warm-gray bg-white text-navy-dark font-medium px-4 py-3 text-sm hover:bg-warm-gray transition-colors";

const today = () => new Date().toLocaleDateString("en-CA");

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy-dark mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-text-muted mt-1">{hint}</span>}
    </label>
  );
}

function Modal({
  title,
  onClose,
  onSubmit,
  busy,
  error,
  children,
}: {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  busy: boolean;
  error: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-3 -mr-2 text-text-muted hover:text-navy-dark"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className={`${ghostBtn} flex-1`}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={`${primaryBtn} flex-1`}>
            {busy ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function RowActions({
  armed,
  onEdit,
  onDelete,
}: {
  armed: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2 shrink-0">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit"
        className={`${ghostBtn} min-w-12`}
      >
        <Pencil className="w-4 h-4" />
        <span className="hidden sm:inline">Edit</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label={armed ? "Tap again to delete" : "Delete"}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-4 py-3 text-sm font-medium min-w-12 transition-colors ${
          armed
            ? "bg-red-600 border-red-600 text-white"
            : "border-warm-gray bg-white text-red-700 hover:bg-red-50"
        }`}
      >
        <Trash2 className="w-4 h-4" />
        <span className={armed ? "" : "hidden sm:inline"}>
          {armed ? "Tap again to delete" : "Delete"}
        </span>
      </button>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-text-muted text-sm py-10 bg-white rounded-xl border border-warm-gray">
      {children}
    </p>
  );
}

/* ---------- Forms ---------- */

type Payload = Record<string, unknown>;

function MeetingForm({ initial, onChange }: { initial?: Meeting; onChange: (p: Payload) => void }) {
  const [day, setDay] = useState(initial?.day_of_week ?? 1);
  const [time, setTime] = useState(initial?.time ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? ["Open"]);
  const [note, setNote] = useState(initial?.note ?? "");
  const [sort, setSort] = useState(initial?.sort_order ?? 0);
  useEffect(() => {
    onChange({ day_of_week: day, time, tags, note, sort_order: sort });
  }, [day, time, tags, note, sort, onChange]);
  return (
    <>
      <Field label="Day">
        <select value={day} onChange={(e) => setDay(Number(e.target.value))} className={inputCls}>
          {DAY_ORDER.map((d) => (
            <option key={d} value={d}>
              {DAYS[d]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Time" hint="Example: 5:45 PM">
        <input value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} required />
      </Field>
      <fieldset>
        <legend className="text-sm font-medium text-navy-dark mb-2">Tags</legend>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((t) => {
            const on = tags.includes(t);
            return (
              <label
                key={t}
                className={`cursor-pointer select-none rounded-full border px-3 py-2 text-sm ${
                  on ? "border-navy bg-navy text-white" : "border-warm-gray bg-white text-navy-dark"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])}
                />
                {t}
              </label>
            );
          })}
        </div>
      </fieldset>
      <Field label="Note (optional)">
        <input value={note} onChange={(e) => setNote(e.target.value)} className={inputCls} />
      </Field>
      <Field label="Sort order" hint="Lower numbers show first within a day.">
        <input
          type="number"
          inputMode="numeric"
          value={sort}
          onChange={(e) => setSort(Number(e.target.value))}
          className={inputCls}
        />
      </Field>
    </>
  );
}

function NoticeForm({ initial, onChange }: { initial?: MeetingNotice; onChange: (p: Payload) => void }) {
  const [text, setText] = useState(initial?.text ?? "");
  const [sort, setSort] = useState(initial?.sort_order ?? 0);
  useEffect(() => {
    onChange({ text, sort_order: sort });
  }, [text, sort, onChange]);
  return (
    <>
      <Field label="Note">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className={inputCls}
          required
        />
      </Field>
      <Field label="Sort order" hint="Lower numbers show first.">
        <input
          type="number"
          inputMode="numeric"
          value={sort}
          onChange={(e) => setSort(Number(e.target.value))}
          className={inputCls}
        />
      </Field>
    </>
  );
}

function AnnouncementForm({ initial, onChange }: { initial?: Announcement; onChange: (p: Payload) => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [category, setCategory] = useState(initial?.category ?? "News");
  const [body, setBody] = useState(initial?.body ?? "");
  useEffect(() => {
    onChange({ title, date, category, body });
  }, [title, date, category, body, onChange]);
  return (
    <>
      <Field label="Title">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
      </Field>
      <Field label="Date">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} required />
      </Field>
      <Field label="Category">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Details">
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} className={inputCls} />
      </Field>
    </>
  );
}

function EventForm({ initial, onChange }: { initial?: GroupEvent; onChange: (p: Payload) => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.event_date ?? today());
  const [time, setTime] = useState(initial?.event_time ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [people, setPeople] = useState(initial?.people_involved ?? "");
  useEffect(() => {
    onChange({
      title,
      event_date: date,
      event_time: time,
      description,
      people_involved: people,
    });
  }, [title, date, time, description, people, onChange]);
  return (
    <>
      <Field label="Title">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
      </Field>
      <Field label="Date">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} required />
      </Field>
      <Field label="Time (optional)" hint="Example: 6:00 PM">
        <input value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
      </Field>
      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputCls}
        />
      </Field>
      <Field label="People involved (optional)">
        <input value={people} onChange={(e) => setPeople(e.target.value)} className={inputCls} />
      </Field>
    </>
  );
}

/* ---------- Dashboard ---------- */

interface Props {
  meetings: Meeting[];
  notices: MeetingNotice[];
  announcements: Announcement[];
  events: GroupEvent[];
  errors: string[];
}

type Editing = { tab: TabKey; item: Meeting | MeetingNotice | Announcement | GroupEvent | null };

export default function AdminDashboard({ meetings, notices, announcements, events, errors }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("meetings");
  const [editing, setEditing] = useState<Editing | null>(null);
  const [payload, setPayload] = useState<Payload>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [armed, setArmed] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(null), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  const endpoint = (k: TabKey) => TABS.find((t) => t.key === k)!.endpoint;

  async function call(method: string, url: string, body?: Payload): Promise<string | null> {
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return "Session expired. Sign in again.";
      }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return d.error || "Something went wrong";
      }
      return null;
    } catch {
      return "Network error. Try again.";
    }
  }

  async function save() {
    if (!editing) return;
    setBusy(true);
    setFormError("");
    const base = `/api/admin/${endpoint(editing.tab)}`;
    const err = editing.item
      ? await call("PUT", `${base}/${editing.item.id}`, payload)
      : await call("POST", base, payload);
    setBusy(false);
    if (err) {
      setFormError(err);
      return;
    }
    setEditing(null);
    setNotice("Saved. The public page will update shortly.");
    router.refresh();
  }

  async function remove(t: TabKey, id: string) {
    const key = `${t}:${id}`;
    if (armed !== key) {
      setArmed(key);
      return;
    }
    setArmed(null);
    const err = await call("DELETE", `/api/admin/${endpoint(t)}/${id}`);
    setNotice(err ?? "Deleted.");
    if (!err) router.refresh();
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const open = (t: TabKey, item: Editing["item"] = null) => {
    setPayload({});
    setFormError("");
    setEditing({ tab: t, item });
  };

  const rowCls = "bg-white rounded-xl border border-warm-gray p-4 flex flex-col sm:flex-row sm:items-center gap-3";
  const fmtDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const groupedMeetings = DAY_ORDER.map((d) => ({
    d,
    items: meetings.filter((m) => m.day_of_week === d),
  })).filter((g) => g.items.length > 0);

  const addLabel: Record<TabKey, string> = {
    meetings: "Add meeting",
    notices: "Add note",
    announcements: "Add announcement",
    events: "Add event",
  };

  const formTitle = editing
    ? `${editing.item ? "Edit" : "Add"} ${
        { meetings: "meeting", notices: "note", announcements: "announcement", events: "event" }[editing.tab]
      }`
    : "";

  return (
    <section className="bg-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold text-navy-dark">RTF Admin</h1>
          <div className="flex gap-2">
            <Link href="/" target="_blank" className={ghostBtn}>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              View site
            </Link>
            <button type="button" onClick={signOut} className={ghostBtn}>
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm p-3">
            Could not load data: {errors.join("; ")}
          </div>
        )}
        {notice && (
          <div
            role="status"
            className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-3 flex justify-between gap-2"
          >
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice("")} aria-label="Dismiss" className="font-medium">
              OK
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-3 py-3 text-sm font-medium border transition-colors ${
                tab === t.key
                  ? "bg-navy-dark text-white border-navy-dark"
                  : "bg-white text-navy-dark border-warm-gray hover:bg-warm-gray"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => open(tab)} className={`${primaryBtn} w-full sm:w-auto mb-5`}>
          <Plus className="w-5 h-5" aria-hidden="true" />
          {addLabel[tab]}
        </button>

        {tab === "meetings" &&
          (groupedMeetings.length === 0 ? (
            <Empty>No meetings yet.</Empty>
          ) : (
            <div className="space-y-6">
              {groupedMeetings.map(({ d, items }) => (
                <div key={d}>
                  <h2 className="font-semibold text-navy-dark mb-2">{DAYS[d]}</h2>
                  <div className="space-y-2">
                    {items.map((m) => (
                      <div key={m.id} className={rowCls}>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-navy-dark">{m.time}</p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {m.tags.map((t) => (
                              <TagBadge key={t} label={t} />
                            ))}
                            {m.note && <span className="text-xs text-text-muted italic">{m.note}</span>}
                          </div>
                        </div>
                        <RowActions
                          armed={armed === `meetings:${m.id}`}
                          onEdit={() => open("meetings", m)}
                          onDelete={() => remove("meetings", m.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tab === "notices" &&
          (notices.length === 0 ? (
            <Empty>No meeting notes yet.</Empty>
          ) : (
            <div className="space-y-2">
              {notices.map((n) => (
                <div key={n.id} className={rowCls}>
                  <p className="flex-1 text-sm text-navy-dark">{n.text}</p>
                  <RowActions
                    armed={armed === `notices:${n.id}`}
                    onEdit={() => open("notices", n)}
                    onDelete={() => remove("notices", n.id)}
                  />
                </div>
              ))}
            </div>
          ))}

        {tab === "announcements" &&
          (announcements.length === 0 ? (
            <Empty>No announcements yet.</Empty>
          ) : (
            <div className="space-y-2">
              {announcements.map((a) => (
                <div key={a.id} className={rowCls}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-dark">{a.title}</p>
                    <p className="text-xs text-text-muted">
                      {fmtDate(a.date)}
                      {a.category ? `, ${a.category}` : ""}
                    </p>
                  </div>
                  <RowActions
                    armed={armed === `announcements:${a.id}`}
                    onEdit={() => open("announcements", a)}
                    onDelete={() => remove("announcements", a.id)}
                  />
                </div>
              ))}
            </div>
          ))}

        {tab === "events" &&
          (events.length === 0 ? (
            <Empty>No events yet.</Empty>
          ) : (
            <div className="space-y-2">
              {events.map((e) => (
                <div key={e.id} className={rowCls}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy-dark">{e.title}</p>
                    <p className="text-xs text-text-muted">
                      {fmtDate(e.event_date)}
                      {e.event_time ? `, ${e.event_time}` : ""}
                    </p>
                  </div>
                  <RowActions
                    armed={armed === `events:${e.id}`}
                    onEdit={() => open("events", e)}
                    onDelete={() => remove("events", e.id)}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>

      {editing && (
        <Modal
          title={formTitle}
          onClose={() => setEditing(null)}
          onSubmit={save}
          busy={busy}
          error={formError}
        >
          {editing.tab === "meetings" && (
            <MeetingForm initial={editing.item as Meeting | undefined} onChange={setPayload} />
          )}
          {editing.tab === "notices" && (
            <NoticeForm initial={editing.item as MeetingNotice | undefined} onChange={setPayload} />
          )}
          {editing.tab === "announcements" && (
            <AnnouncementForm initial={editing.item as Announcement | undefined} onChange={setPayload} />
          )}
          {editing.tab === "events" && (
            <EventForm initial={editing.item as GroupEvent | undefined} onChange={setPayload} />
          )}
        </Modal>
      )}
    </section>
  );
}
