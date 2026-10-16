import type { Metadata } from "next";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | RTF",
  description:
    "Find the Road To Freedom Group at the Log Cabin, 901 South Park St, Suite C, Carrollton, GA 30117.",
};

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=901+South+Park+St+Suite+C+Carrollton+GA+30117";

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Find Us
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Find the Log Cabin and join us at a meeting.
          </p>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-warm-gray">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-navy" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-dark mb-1">Address</h3>
                  <address className="not-italic text-text-muted text-sm leading-relaxed">
                    Log Cabin, 901 South Park St, Suite C, Carrollton, GA 30117
                  </address>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 bg-amber text-navy-dark font-semibold px-4 py-2 rounded-lg hover:bg-amber-light transition-colors text-sm"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    Get directions
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-warm-gray">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-navy" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-dark mb-1">
                    Meeting Times
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Daily at 5:45 PM, plus Sunday 9:00 AM. All meetings are
                    open.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-warm-gray">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-dark" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-dark mb-1">
                    Need help now?
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Need help now? Call the Georgia AA state office at{" "}
                    <a
                      href="tel:4787452588"
                      className="font-medium text-navy hover:text-amber transition-colors"
                    >
                      478-745-2588
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-warm-gray shadow-sm">
              <iframe
                title="Log Cabin location on Google Maps"
                src="https://www.google.com/maps?q=901+South+Park+St+Suite+C+Carrollton+GA+30117&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
