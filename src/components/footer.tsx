// components/layout/AdvancedFooter.tsx
"use client";

import React, { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Globe,
  Mail,
  Smartphone,
  ChevronDown,
} from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

type LinkItem = { label: string; href: string; external?: boolean };
type LinkColumn = { heading: string; links: LinkItem[] };
type SocialItem = { icon: React.ReactNode; label: string; href: string };

export type AdvancedFooterProps = {
  brand?: { name: string; logoSrc: string; href?: string; tagline?: string };
  columns?: LinkColumn[];
  socials?: SocialItem[];
  appBadges?: { label: string; href: string; iconSrc: string }[];
  locales?: string[]; // e.g., ["English (US)", "English (IN)"]
  copyrightName?: string;
};

const DEFAULT_COLUMNS: LinkColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#working" },
      { label: "Features", href: "#features" },
      { label: "Privacy & Safety", href: "#privacy_safety" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "https://pshrinnovex.com/about" },
      { label: "Services", href: "https://pshrinnovex.com/services" },
      { label: "Contact", href: "https://pshrinnovex.com/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Community Guidelines", href: "/guidelines" },
    ],
  },
];

const DEFAULT_SOCIALS: SocialItem[] = [
  { icon: <Twitter size={18} />, label: "Twitter", href: "https://twitter.com" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/budmeet.app" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com" },
];

const DEFAULT_BADGES = [
  { label: "App Store", href: "#appstore", iconSrc: "/app-store.png" },
  { label: "Google Play", href: "#playstore", iconSrc: "/playstore.svg" },
];

export default function AdvancedFooter({
  brand = {
    name: "BudMeet",
    logoSrc: "/BM_logo.png",
    href: "/",
    tagline:
      "Meetup. Match. Vibe — instant verified matches & interest-based groups near you.",
  },
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  appBadges = DEFAULT_BADGES,
  locales = ["English (US)", "English (IN)"],
  copyrightName = "BudMeet",
}: AdvancedFooterProps) {
  const [locale, setLocale] = useState(locales[0] ?? "English (US)");

  return (
    <footer className="w-full relative bg-transparent">
      {/* FULL-WIDTH FX BACKDROP (subtle grid + beams) */}
      <div className="pointer-events-none absolute inset-0">
        {/* gradient beams */}
        <div
          className="absolute -top-24 left-1/3 h-72 w-72 translate-x-[-50%] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(45,212,191,0.25) 0%, rgba(59,130,246,0.08) 60%, transparent 80%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-1/4 h-72 w-72 translate-x-[50%] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,0.25) 0%, rgba(16,185,129,0.08) 60%, transparent 80%)",
          }}
        />
        {/* faint grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* CONTENT WRAPPER — full width */}
      <div className="relative w-full">
        {/* FULL-BLEED GLASS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
          viewport={{ once: true }}
          className="mt-20 mb-0 overflow-hidden rounded-none border-y border-zinc-800/40 bg-zinc-900/60 backdrop-blur-xl shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* TOP ROW: Brand + badges + socials */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="py-8 lg:py-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <a href={brand.href ?? "/"} className="flex items-center gap-3">
                    <img
                      src={brand.logoSrc}
                      alt={`${brand.name} logo`}
                      className="h-10 w-10 object-contain"
                    />
                    <span className="text-xl font-semibold text-zinc-100">
                      {brand.name}
                    </span>
                  </a>
                  <span className="hidden md:inline-block h-5 w-px bg-zinc-700/50" />
                  <p className="text-sm text-zinc-400 max-w-xl">{brand.tagline}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {appBadges.map((b) => (
                    <a
                      key={b.label}
                      href={b.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/60 transition"
                    >
                      <img src={b.iconSrc} alt="" className="h-4 w-4" />
                      {b.label}
                    </a>
                  ))}
                  <div className="hidden md:block h-6 w-px bg-zinc-700/50 mx-1" />
                  <div className="flex items-center gap-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        aria-label={s.label}
                        href={s.href}
                        className="p-2 rounded-md hover:bg-zinc-800/60 text-zinc-300"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE: Newsletter */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <h4 className="text-sm font-medium text-zinc-200">Stay in the loop</h4>
                <p className="mt-1 text-sm text-zinc-400">
                  Launches, local events, and safety tips — once a week, no spam.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget as HTMLFormElement);
                    alert(`Subscribed: ${fd.get("email")}`);
                    (e.currentTarget as HTMLFormElement).reset();
                  }}
                  className="mt-4 flex gap-2"
                >
                  <label htmlFor="nl-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="nl-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="min-w-0 flex-1 rounded-lg bg-zinc-900/40 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                  />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 px-4 py-2 text-sm text-zinc-100"
                  >
                    <Mail size={16} />
                    Subscribe
                  </motion.button>
                </form>
              </div>
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6">
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
              {columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-sm font-medium text-zinc-200">{col.heading}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                    {col.links.map((lnk) => (
                      <li key={lnk.label}>
                        <a
                          href={lnk.href}
                          target={lnk.external ? "_blank" : undefined}
                          rel={lnk.external ? "noreferrer" : undefined}
                          className="hover:text-zinc-100"
                        >
                          {lnk.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-zinc-800/60">
              {columns.map((col) => (
                <MobileColumn
                  key={col.heading}
                  heading={col.heading}
                  links={col.links}
                />
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: locale + legal */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 border-t border-zinc-800/40 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200"
                onClick={() => {
                  const next =
                    locales[(locales.indexOf(locale) + 1) % locales.length] ??
                    locale;
                  setLocale(next);
                }}
                aria-label="Change language / region"
              >
                <Globe size={16} />
                <span>{locale}</span>
                <ChevronDown size={14} className="opacity-60" />
              </button>
              <span className="text-sm text-zinc-500">
                © {new Date().getFullYear()} {copyrightName}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <a href="/privacy" className="hover:text-zinc-200">
                Privacy
              </a>
              <a href="/terms" className="hover:text-zinc-200">
                Terms
              </a>
              <a href="/contact" className="hover:text-zinc-200">
                Contact
              </a>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500">Uptime 99.9% · Backed up daily</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ------------------------------- Mobile Column ------------------------------- */
function MobileColumn({ heading, links }: { heading: string; links: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-3"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-zinc-200">{heading}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""} text-zinc-400`}
        />
      </button>
      {open && (
        <ul className="pb-3 space-y-2 text-sm text-zinc-400">
          {links.map((lnk) => (
            <li key={lnk.label}>
              <a
                href={lnk.href}
                target={lnk.external ? "_blank" : undefined}
                rel={lnk.external ? "noreferrer" : undefined}
                className="block py-1 hover:text-zinc-100"
              >
                {lnk.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
