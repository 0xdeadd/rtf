import Link from "next/link";
import { Megaphone } from "lucide-react";
import announcementsData from "@/data/announcements.json";

export default function AnnouncementsPage() {
  const announcements = [...announcementsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Megaphone className="w-4 h-4" aria-hidden="true" />
            Group News
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Announcements
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Stay up to date with events, schedule changes, and group news.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {announcements.length === 0 ? (
            <div className="text-center py-16">
              <Megaphone
                className="w-12 h-12 text-warm-gray mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-text-muted">No announcements right now.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-navy-dark">
                      {a.title}
                    </h2>
                    {a.category && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber/10 text-amber-dark">
                        {a.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted mb-4">
                    {new Date(a.date + "T00:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {a.body && (
                    <p className="text-text-muted leading-relaxed">{a.body}</p>
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
