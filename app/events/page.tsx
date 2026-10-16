import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import { getEvents, type GroupEvent } from "@/lib/data";

export const revalidate = 3600;

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EventCard({ e, muted }: { e: GroupEvent; muted?: boolean }) {
  return (
    <div
      className={`bg-white rounded-xl border border-warm-gray p-6 sm:p-8 ${
        muted ? "opacity-75" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-navy-dark mb-1">{e.title}</h2>
      <p className="text-xs text-text-muted mb-3">
        {formatDate(e.event_date)}
        {e.event_time ? `, ${e.event_time}` : ""}
      </p>
      {e.description && (
        <p className="text-text-muted leading-relaxed">{e.description}</p>
      )}
      {e.people_involved && (
        <p className="text-sm text-text-muted mt-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-dark shrink-0" aria-hidden="true" />
          {e.people_involved}
        </p>
      )}
    </div>
  );
}

export default async function EventsPage() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
  }).format(new Date());
  const all = await getEvents();
  const events = all
    .filter((e) => e.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
  const past = all
    .filter((e) => e.event_date < today)
    .sort((a, b) => b.event_date.localeCompare(a.event_date));

  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            Special Events
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Events
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Celebrations, group gatherings, and other special events.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <CalendarDays
                className="w-12 h-12 text-warm-gray mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-text-muted">
                No upcoming events right now. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          )}

          {past.length > 0 && (
            <details className="mt-10 group">
              <summary className="cursor-pointer text-navy font-medium text-sm hover:text-amber transition-colors">
                Past events ({past.length})
              </summary>
              <div className="space-y-6 mt-4">
                {past.map((e) => (
                  <EventCard key={e.id} e={e} muted />
                ))}
              </div>
            </details>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-navy hover:text-amber transition-colors font-medium text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
