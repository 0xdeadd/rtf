"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Clock, ExternalLink } from "lucide-react";

const TENTH_STEP_URL = "https://tenth-step-taupe.vercel.app";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/announcements", label: "Announcements" },
    { href: "/meetings", label: "Meetings" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-navy font-semibold text-lg">
            <Clock className="w-6 h-6 text-amber" aria-hidden="true" />
            <span>RTF</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-navy-light">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-amber transition-colors ${
                  pathname === link.href ? "text-amber" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={TENTH_STEP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-amber transition-colors"
            >
              Tenth Step
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-warm-gray">
          <div className="px-4 py-4 flex flex-col gap-4 text-sm font-medium text-navy-light">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-amber transition-colors ${
                  pathname === link.href ? "text-amber" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={TENTH_STEP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-amber transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Tenth Step
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
