import type { Metadata } from "next";
import { BookOpen, Phone, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | RTF",
  description:
    "Recovery resources, helplines, and links for AA, NA, Al-Anon, and more.",
};

const sections = [
  {
    title: "Alcoholics Anonymous (AA)",
    links: [
      { label: "AA.org, Official Website", url: "https://www.aa.org" },
      {
        label: "Big Book Online",
        url: "https://www.aa.org/the-big-book",
      },
      {
        label: "Find a Meeting (AA)",
        url: "https://www.aa.org/find-aa",
      },
    ],
  },
  {
    title: "Narcotics Anonymous (NA)",
    links: [
      { label: "NA.org, Official Website", url: "https://www.na.org" },
      {
        label: "Find a Meeting (NA)",
        url: "https://www.na.org/meetingsearch/",
      },
    ],
  },
  {
    title: "Al-Anon Family Groups",
    links: [
      {
        label: "Al-Anon.org, Official Website",
        url: "https://al-anon.org",
      },
      {
        label: "Find a Meeting (Al-Anon)",
        url: "https://al-anon.org/al-anon-meetings/find-an-al-anon-meeting/",
      },
    ],
  },
  {
    title: "Local Intergroup",
    links: [
      {
        label: "West Georgia Intergroup",
        url: "https://www.westgaaa.org",
      },
    ],
  },
];

const helplines = [
  {
    label: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    note: "Free, confidential, 24/7 treatment referral and information",
  },
  {
    label: "AA Helpline",
    number: "1-800-839-1686",
    note: "Georgia AA helpline",
  },
  {
    label: "Suicide & Crisis Lifeline",
    number: "988",
    note: "Call or text 988 for immediate support",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Recovery Resources
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Resources
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Helpful links, recovery resources, and crisis helplines.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Resource sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-xl border border-warm-gray p-6 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-navy-dark mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-navy hover:text-amber transition-colors font-medium text-sm"
                      >
                        <ExternalLink
                          className="w-4 h-4 shrink-0"
                          aria-hidden="true"
                        />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Crisis helplines */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy-dark mb-6">
              Crisis &amp; Helplines
            </h2>
            <div className="space-y-4">
              {helplines.map((line) => (
                <div
                  key={line.number}
                  className="bg-white rounded-xl border border-warm-gray p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                    <Phone
                      className="w-5 h-5 text-amber-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-dark">
                      {line.label}
                    </h3>
                    <p className="text-sm text-text-muted">{line.note}</p>
                  </div>
                  <a
                    href={`tel:${line.number.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors text-sm whitespace-nowrap"
                  >
                    {line.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
