import {
  Megaphone,
  CalendarDays,
  BookOpen,
  NotebookPen,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import announcements from "@/data/announcements.json";

export default function Home() {
  const latestAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-dark text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy-light rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Welcome to{" "}
            <span className="text-amber-light">Road To Freedom</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-white/80">
            RTF Group of Alcoholics Anonymous, Carrollton, GA
          </p>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            An open AA home group meeting every day at the Log Cabin in
            Carrollton. Newcomers are always welcome.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-6 py-3 rounded-lg hover:bg-amber-light transition-colors text-base"
            >
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
              Meeting Schedule
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-base"
            >
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: CalendarDays,
                title: "Meetings",
                description: "View the full weekly meeting schedule.",
                href: "/meetings",
              },
              {
                icon: Megaphone,
                title: "Announcements",
                description: "Group news, events, and schedule changes.",
                href: "/announcements",
              },
              {
                icon: BookOpen,
                title: "Resources",
                description: "Recovery resources, helplines, and links.",
                href: "/resources",
              },
              {
                icon: MapPin,
                title: "Contact",
                description: "Directions to the Log Cabin and who to call.",
                href: "/contact",
              },
              {
                icon: NotebookPen,
                title: "Tenth Step",
                description: "Nightly inventory, right on your phone.",
                href: "https://tenth-step-taupe.vercel.app",
                external: true,
              },
            ].map(({ icon: Icon, title, description, href, external }) => {
              const cardClass =
                "bg-white rounded-xl p-6 border border-warm-gray hover:shadow-md transition-shadow group";
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber-dark" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-navy-dark mb-2 group-hover:text-amber transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {description}
                  </p>
                </>
              );
              return external ? (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <Link key={title} href={href} className={cardClass}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-dark">
              Latest Announcements
            </h2>
            <Link
              href="/announcements"
              className="text-navy hover:text-amber transition-colors font-medium text-sm inline-flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-4">
            {latestAnnouncements.map((a) => (
              <div
                key={a.id}
                className="bg-warm-white rounded-xl p-6 border border-warm-gray"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-semibold text-navy-dark">{a.title}</h3>
                  {a.category && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber/10 text-amber-dark">
                      {a.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted mb-3">
                  {new Date(a.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
