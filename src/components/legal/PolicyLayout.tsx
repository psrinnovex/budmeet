// src/components/legal/PolicyLayout.tsx
"use client";

import * as React from "react";
import { LEGAL } from "@/lib/legal";

type PolicyLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  showTOC?: boolean;
};

type SectionElementProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  ["data-title"]?: string;
};

const BRAND = {
  bg: "#0B0F14",
  card: "rgba(17, 24, 39, 0.6)", // zinc-900/60
  border: "rgba(255,255,255,0.08)",
  fg: "#FFFFFF",
  fgMuted: "#A1A1AA", // zinc-400
  accent: "#16DB65",
};

export default function PolicyLayout({
  title,
  description,
  children,
  showTOC = true,
}: PolicyLayoutProps) {
  /**
   * Collect top-level <section> elements with ids to build the TOC.
   * We type-narrow with React.isValidElement and require props.id as string.
   */
  const sections = React.useMemo(() => {
    return React.Children.toArray(children)
      .filter(React.isValidElement)
      .map(
        (el) =>
          el as React.ReactElement<Partial<SectionElementProps>> // soft-cast to inspect props safely
      )
      .filter((el) => typeof el.props.id === "string") as Array<
      React.ReactElement<SectionElementProps>
    >;
  }, [children]);

  // Simple active section (scrollspy) using IntersectionObserver
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.props.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="min-h-screen" style={{ backgroundColor: BRAND.bg, color: BRAND.fg }}>
      {/* Hero header */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10 blur-3xl"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, rgba(22,219,101,0.15), transparent 60%), radial-gradient(50% 60% at 10% 30%, rgba(59,130,246,0.12), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 md:px-8 pt-16 pb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-3 text-sm md:text-base" style={{ color: BRAND.fgMuted }}>
              {description}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs md:text-sm" style={{ color: BRAND.fgMuted }}>
            <span>Effective: {LEGAL.effectiveDate}</span>
            <span className="hidden md:inline-block h-4 w-px bg-white/10" />
            <span className="rounded-full border px-2 py-1" style={{ borderColor: BRAND.border }}>
              {LEGAL.companyName}
            </span>
          </div>
        </div>
      </section>

      {/* Content card */}
      <section className="mx-auto max-w-6xl px-6 md:px-8 pb-16">
        <div
          className="rounded-2xl border backdrop-blur"
          style={{ borderColor: BRAND.border, background: BRAND.card }}
        >
          <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
            {/* TOC */}
            {showTOC ? (
              <aside className="border-b lg:border-b-0 lg:border-r" style={{ borderColor: BRAND.border }}>
                <nav className="sticky top-20 p-6 lg:p-8 space-y-4" aria-label="On this page">
                  <p className="text-xs uppercase tracking-wide" style={{ color: BRAND.fgMuted }}>
                    On this page
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    {sections.map((s) => {
                      const id = s.props.id;
                      const label = s.props["data-title"] || id;
                      const isActive = activeId === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className={[
                              "block rounded-md px-2 py-1 transition",
                              isActive ? "bg-white/5" : "hover:bg-white/5",
                            ].join(" ")}
                            style={{ color: isActive ? BRAND.fg : BRAND.fgMuted, borderColor: BRAND.border }}
                          >
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="pt-2 flex gap-3">
                    <a
                      href="#top"
                      className="rounded-lg border px-3 py-1.5 text-xs hover:bg-white/5"
                      style={{ borderColor: BRAND.border, color: BRAND.fgMuted }}
                    >
                      Back to top
                    </a>
                    <a
                      href="javascript:window.print()"
                      className="rounded-lg border px-3 py-1.5 text-xs hover:bg-white/5"
                      style={{ borderColor: BRAND.border, color: BRAND.fgMuted }}
                    >
                      Print
                    </a>
                  </div>
                </nav>
              </aside>
            ) : null}

            {/* Article */}
            <article className="p-6 lg:p-10">
              {/* Prose styling */}
              <div className="prose prose-invert max-w-none">
                <style jsx>{`
                  :global(.prose h2) {
                    margin-top: 1.8rem;
                    margin-bottom: 0.8rem;
                  }
                  :global(.prose ul) {
                    margin: 0.75rem 0 1rem;
                  }
                  :global(.prose li + li) {
                    margin-top: 0.35rem;
                  }
                  :global(.prose a) {
                    color: ${BRAND.accent};
                    text-decoration: underline;
                    text-decoration-style: dotted;
                    text-underline-offset: 4px;
                  }
                  :global(.prose strong) {
                    color: #fff;
                  }
                  :global(.prose p small) {
                    color: ${BRAND.fgMuted};
                  }
                `}</style>

                {/* Top anchor for back-to-top link */}
                <div id="top" />
                {children}
              </div>

              {/* Footer meta */}
              <div className="mt-10 rounded-xl border p-4 text-sm" style={{ borderColor: BRAND.border, color: BRAND.fgMuted }}>
                <p>
                  Questions? Contact{" "}
                  <a href={`mailto:${LEGAL.contactEmail}`} className="underline" style={{ color: BRAND.fg }}>
                    {LEGAL.contactEmail}
                  </a>
                  .
                </p>
                <p className="mt-1">
                  {LEGAL.companyName} — {LEGAL.address}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
