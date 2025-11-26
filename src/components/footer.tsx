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
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      { label: "About", href: "https://pshrinnovex.com/about", external: true },
      { label: "Services", href: "https://pshrinnovex.com/services", external: true },
      { label: "Contact", href: "https://pshrinnovex.com/contact", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Delete account", href: "/delete-account" },
      { label: "Terms & Conditions", href: "/terms" },
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
    <footer
      className="
        relative w-full max-w-[100vw]
        overflow-x-clip bg-transparent
      "
      style={{ contain: "layout paint" }}
    >
      {/* FX BACKDROP — CLIPPED */}
      <div className="pointer-events-none absolute inset-0 overflow-x-clip">
        {/* gradient beams (kept inside clipping region) */}
        <div
          className="absolute -top-24 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(45,212,191,0.25) 0%, rgba(59,130,246,0.08) 60%, transparent 80%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-1/4 h-72 w-72 translate-x-1/2 rounded-full opacity-30 blur-3xl"
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

      {/* CONTENT WRAPPER — full width, CLIPPED */}
      <div className="relative w-full overflow-x-clip">
        {/* FULL-BLEED GLASS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
          viewport={{ once: true }}
          className="mt-20 mb-0 overflow-hidden rounded-none border-y border-zinc-800/40 bg-zinc-900/60 shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          {/* TOP ROW: Brand + badges + socials */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-8 lg:py-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <Link href={brand.href ?? "/"} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10">
                      <Image
                        src={brand.logoSrc}
                        alt={`${brand.name} logo`}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                        priority={false}
                      />
                    </span>
                    <span className="truncate text-xl font-semibold text-zinc-100">
                      {brand.name}
                    </span>
                  </Link>
                  <span className="hidden h-5 w-px bg-zinc-700/50 md:inline-block" />
                  <p className="max-w-xl shrink text-sm text-zinc-400">{brand.tagline}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {appBadges.map((b) => {
                    const isInternal = b.href.startsWith("/") || b.href.startsWith("#");
                    const badgeInner = (
                      <>
                        <Image src={b.iconSrc} alt="" width={16} height={16} />
                        {b.label}
                      </>
                    );
                    return isInternal ? (
                      <Link
                        key={b.label}
                        href={b.href}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-900/60"
                      >
                        {badgeInner}
                      </Link>
                    ) : (
                      <a
                        key={b.label}
                        href={b.href}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-900/60"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {badgeInner}
                      </a>
                    );
                  })}
                  <div className="mx-1 hidden h-6 w-px bg-zinc-700/50 md:block" />
                  <div className="flex items-center gap-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        aria-label={s.label}
                        href={s.href}
                        className="rounded-md p-2 text-zinc-300 hover:bg-zinc-800/60"
                        target="_blank"
                        rel="noreferrer"
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-2 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
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
                    className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 lg:px-8">
            {/* Desktop */}
            <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
              {columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-sm font-medium text-zinc-200">{col.heading}</h4> 
                  <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                    {col.links.map((lnk) => {
                      const isInternal = lnk.href.startsWith("/") || lnk.href.startsWith("#");
                      return (
                        <li key={lnk.label}>
                          {isInternal ? (
                            <Link href={lnk.href} className="hover:text-zinc-100">
                              {lnk.label}
                            </Link>
                          ) : (
                            <a
                              href={lnk.href}
                              target={lnk.external ? "_blank" : undefined}
                              rel={lnk.external ? "noreferrer" : undefined}
                              className="hover:text-zinc-100"
                            >
                              {lnk.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="divide-y divide-zinc-800/60 md:hidden">
              {columns.map((col) => (
                <MobileColumn key={col.heading} heading={col.heading} links={col.links} />
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: locale + legal */}
          <div className="mx-auto mt-8 flex flex-col gap-4 border-t border-zinc-800/40 px-4 sm:px-6 py-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200"
                onClick={() => {
                  const next = locales[(locales.indexOf(locale) + 1) % locales.length] ?? locale;
                  setLocale(next);
                }}
                aria-label="Change language / region"
              >
                <Globe size={16} />
                <span>{locale}</span>
                <ChevronDown size={14} className="opacity-60" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="text-sm text-zinc-500">
                © {new Date().getFullYear()} {copyrightName}
              </span>
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
        className="flex w-full items-center justify-between py-3"
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
        <ul className="space-y-2 pb-3 text-sm text-zinc-400">
          {links.map((lnk) => {
            const isInternal = lnk.href.startsWith("/") || lnk.href.startsWith("#");
            return (
              <li key={lnk.label}>
                {isInternal ? (
                  <Link href={lnk.href} className="block py-1 hover:text-zinc-100">
                    {lnk.label}
                  </Link>
                ) : (
                  <a
                    href={lnk.href}
                    target={lnk.external ? "_blank" : undefined}
                    rel={lnk.external ? "noreferrer" : undefined}
                    className="block py-1 hover:text-zinc-100"
                  >
                    {lnk.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
