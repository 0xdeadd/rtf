import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import eventsData from "@/data/events.json";

interface GroupEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

export default function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const events = (eventsData as GroupEvent[])
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

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
                <div
                  key={e.id}
                  className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8"
                >
                  <h2 className="text-lg font-semibold text-navy-dark mb-1">
                    {e.title}
                  </h2>
                  <p className="text-xs text-text-muted mb-3">
                    {new Date(e.date + "T00:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {e.time ? `, ${e.time}` : ""}
                  </p>
                  {e.location && (
                    <p className="text-sm text-text-muted flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-amber-dark" aria-hidden="true" />
                      {e.location}
                    </p>
                  )}
                  {e.description && (
                    <p className="text-text-muted leading-relaxed">
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
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
