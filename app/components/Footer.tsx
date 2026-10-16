import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-semibold text-lg mb-3">
              <Clock className="w-5 h-5 text-amber" aria-hidden="true" />
              <span>RTF</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Road To Freedom Group, an open AA home group in Carrollton, Georgia.
            </p>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-semibold mb-3">Location</h3>
            <address className="not-italic text-sm leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <span>
                Log Cabin<br />
                901 South Park St, Suite C<br />
                Carrollton, GA 30117
              </span>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/meetings" className="hover:text-amber transition-colors">
                  Meetings
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-amber transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-amber transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://tenth-step-taupe.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber transition-colors"
                >
                  Tenth Step
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs text-white/40 space-y-2">
          <p>
            RTF is not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
          </p>
          <p>&copy; {new Date().getFullYear()} Road To Freedom Group.</p>
          <p>
            Made by{" "}
            <a
              href="https://colorpop.ink"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-amber transition-colors"
            >
              Color Pop
            </a>
          </p>
          <p>
            <Link href="/admin" className="hover:text-amber transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
