import Link from "next/link";
import { CalendarDays, Clock, Info } from "lucide-react";
import TagBadge from "@/app/components/TagBadge";
import { getMeetings, getMeetingNotices } from "@/lib/data";

export const revalidate = 3600;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first, Sunday last

export default async function MeetingsPage() {
  const [meetingsData, notices] = await Promise.all([
    getMeetings(),
    getMeetingNotices(),
  ]);
  const grouped = DAY_ORDER.map((day) => ({
    day,
    items: meetingsData.filter((m) => m.day_of_week === day),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <CalendarDays className="w-4 h-4" aria-hidden="true" />
            Weekly Schedule
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Meeting Schedule
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Every meeting is open and runs one hour. All meetings are held at
            the Log Cabin, 901 South Park St, Carrollton.
          </p>
        </div>
      </section>

      <section className="bg-warm-white border-b border-warm-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="flex items-center gap-2 text-text-muted"
              >
                <Info className="w-4 h-4 text-navy shrink-0" aria-hidden="true" />
                <span>{notice.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-6">
            {grouped.map(({ day, items }) => (
              <div
                key={day}
                className="bg-white rounded-xl border border-warm-gray overflow-hidden"
              >
                <div className="bg-navy-dark text-white px-6 py-3">
                  <h2 className="font-semibold text-lg">{DAYS[day]}</h2>
                </div>
                <div className="divide-y divide-warm-gray">
                  {items.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex items-center gap-2 sm:w-28 shrink-0">
                        <Clock
                          className="w-4 h-4 text-amber-dark shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-navy-dark whitespace-nowrap">
                          {meeting.time}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                        {meeting.tags.map((tag) => (
                          <TagBadge key={tag} label={tag} />
                        ))}
                        {meeting.note && (
                          <span className="text-xs text-text-muted italic ml-1">
                            {meeting.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl border border-warm-gray p-6">
            <h3 className="font-semibold text-navy-dark mb-3">Meeting Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-muted">
              <div>
                <strong className="text-navy-dark">Open</strong>: Anyone is
                welcome to attend, whether you have a desire to stop or are
                there to learn about AA.
              </div>
              <div>
                <strong className="text-navy-dark">Discussion</strong>: Members
                share their experience, strength, and hope on a topic.
              </div>
              <div>
                <strong className="text-navy-dark">12 Step Study</strong>:
                Focused study and discussion of the 12 Steps.
              </div>
              <div>
                <strong className="text-navy-dark">Big Book</strong>: Reading
                and study of the Big Book, focused on the first 164 pages.
              </div>
              <div>
                <strong className="text-navy-dark">11th Step</strong>: Prayer
                and meditation, guided by the Eleventh Step.
              </div>
              <div>
                <strong className="text-navy-dark">Grapevine</strong>: Reading
                and discussion of articles from the AA Grapevine magazine.
              </div>
            </div>
          </div>

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
