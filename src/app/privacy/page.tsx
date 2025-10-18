// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { LEGAL, ageMinimumFor } from "@/lib/legal";
import { detectRegion } from "@/lib/region";

// ---------- SEO ----------
export const metadata: Metadata = {
  title: `${LEGAL.appName} Privacy Policy`,
  description: `How ${LEGAL.appName} collects, uses, and protects your data.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${LEGAL.appName} Privacy Policy`,
    description: `How ${LEGAL.appName} collects, uses, and protects your data.`,
    type: "article",
  },
};

// ---------- Local UI helpers (no layout dependency) ----------
type Section = { id: string; title: string; content: React.ReactNode };

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
      {children}
    </div>
  );
}
function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{children}</h1>;
}
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  const region = detectRegion();
  const minAge = ageMinimumFor(region);
  const showEUUK = region === "EU" || region === "UK";
  const effectiveDate = LEGAL?.effectiveDate ?? "—";

  const sections: Section[] = [
    {
      id: "at-a-glance",
      title: "At a glance",
      content: (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
          <dl className="grid grid-cols-1 gap-4 text-sm text-white/80 md:grid-cols-4">
            <div>
              <dt className="text-white/60">Controller</dt>
              <dd className="mt-0.5 font-medium">{LEGAL.companyName}</dd>
            </div>
            <div>
              <dt className="text-white/60">Effective date</dt>
              <dd className="mt-0.5 font-medium">{effectiveDate}</dd>
            </div>
            <div>
              <dt className="text-white/60">Region detected</dt>
              <dd className="mt-0.5 font-medium">{region}</dd>
            </div>
            <div>
              <dt className="text-white/60">Minimum age</dt>
              <dd className="mt-0.5 font-medium">{minAge}+ years</dd>
            </div>
          </dl>
        </div>
      ),
    },
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <p>
          This Privacy Policy describes how {LEGAL.companyName} (“we”, “us”, or “our”) collects, uses, and shares
          information about you when you use {LEGAL.appName} (the “App”) and our website (the “Site”). By using
          the App or Site, you agree to the collection and use of information in accordance with this Policy.
        </p>
      ),
    },
    {
      id: "scope",
      title: "Scope",
      content: (
        <p>
          This Policy applies to the {LEGAL.appName} mobile application (iOS/Android), our website, and related services.
          It does not apply to third-party websites, services, or applications that we do not control.
        </p>
      ),
    },
    {
      id: "data-we-collect",
      title: "Data we collect",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Account &amp; Profile:</strong> name, handle, email/phone, password, age, interests, photos, bio.
          </li>
          <li>
            <strong>Content you create:</strong> posts, messages, media uploads, group membership, in-app reports.
          </li>
          <li>
            <strong>Contacts (optional):</strong> if you choose, we may access your contacts to help you find friends.
          </li>
          <li>
            <strong>Location (optional):</strong> approximate and/or precise location to power nearby discovery and safety features.
            You can disable at the OS level.
          </li>
          <li>
            <strong>Device &amp; Usage:</strong> device identifiers, OS, app version, IP address, crash logs, diagnostic and analytics data.
          </li>
          <li>
            <strong>Cookies &amp; Similar (Site):</strong> cookies, local storage, pixels for authentication and analytics.
          </li>
          <li>
            <strong>Payments (if any):</strong> subscription details via our payment processor. We do not store full card numbers.
          </li>
        </ul>
      ),
    },
    {
      id: "how-we-use",
      title: "How we use information",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>Operate, maintain, and improve the App and Site.</li>
          <li>Match you with relevant people, groups, and events based on your preferences and location (if enabled).</li>
          <li>Provide safety features (verification, block/report, fraud/spam prevention).</li>
          <li>Communicate with you about updates, security alerts, and support.</li>
          <li>Personalize content and measure performance/analytics.</li>
          <li>Comply with legal obligations and enforce our Terms.</li>
        </ul>
      ),
    },
    {
      id: "legal-bases",
      title: "Legal bases (where applicable)",
      content: (
        <>
          <p>Depending on your region, we process personal data under one or more of the following legal bases:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>Contract:</strong> to provide the Service you request.</li>
            <li><strong>Consent:</strong> where you opt-in (e.g., contacts, precise location, marketing).</li>
            <li><strong>Legitimate interests:</strong> e.g., safety, security, analytics, product improvement.</li>
            <li><strong>Legal obligation:</strong> to satisfy record-keeping and compliance requirements.</li>
          </ul>
        </>
      ),
    },
    {
      id: "sharing",
      title: "How we share information",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li><strong>With other users:</strong> your profile information and content you choose to share.</li>
          <li><strong>Service providers:</strong> hosting, analytics, content moderation, payment processing (under contract/confidentiality).</li>
          <li><strong>Legal &amp; safety:</strong> to comply with law, enforce policies, protect rights and safety, and prevent harm.</li>
          <li><strong>Business transfers:</strong> in connection with a merger, sale, or acquisition, per this Policy.</li>
        </ul>
      ),
    },
    {
      id: "data-controls",
      title: "Your choices & controls",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>Access, correct, or delete your account data in-app or by contacting us.</li>
          <li>Control permissions (camera, photos, contacts, location) at the OS settings level.</li>
          <li>Opt-out of emails/notifications via in-app settings or email footer links.</li>
          <li>Manage cookies via your browser (Site only).</li>
        </ul>
      ),
    },
    {
      id: "retention",
      title: "Data retention",
      content: (
        <p>
          We retain personal data only as long as necessary to provide the Service, comply with legal obligations,
          resolve disputes, and enforce our agreements. We may retain de-identified or aggregated data for analytics.
        </p>
      ),
    },
    {
      id: "security",
      title: "Security",
      content: (
        <p>
          We implement administrative, technical, and physical safeguards to protect personal data. However, no method
          of transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      ),
    },
    {
      id: "children",
      title: "Children’s privacy",
      content: (
        <p>
          {LEGAL.appName} is not directed to children under the age of {minAge}. We do not knowingly collect personal data
          from children. If you believe a child has provided us data, contact us to request deletion.
        </p>
      ),
    },
    {
      id: "intl",
      title: "International transfers",
      content: (
        <p>
          Your information may be transferred to and processed in countries other than your own. Where required, we use
          appropriate safeguards (e.g., Standard Contractual Clauses) for such transfers.
          {showEUUK ? " You may contact our EU/UK representatives listed below for transfer inquiries." : ""}
        </p>
      ),
    },
    {
      id: "rights",
      title: "Region-specific rights (GDPR/CCPA etc.)",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li><strong>EU/UK:</strong> rights of access, rectification, erasure, restriction, portability, and objection. Contact us to exercise these rights.</li>
          <li><strong>California:</strong> rights to know, delete, correct, and opt-out of certain sharing.</li>
          <li>We will not discriminate against you for exercising your rights.</li>
        </ul>
      ),
    },
    ...(showEUUK
      ? [{
          id: "eu-uk-representatives",
          title: "EU/UK representatives",
          content: (
            <>
              <p>
                EU Representative: {LEGAL.euRepresentative.name}, {LEGAL.euRepresentative.address} —{" "}
                <a className="underline decoration-white/30 underline-offset-2" href={`mailto:${LEGAL.euRepresentative.email}`}>
                  {LEGAL.euRepresentative.email}
                </a>.
              </p>
              <p className="mt-2">
                UK Representative: {LEGAL.ukRepresentative.name}, {LEGAL.ukRepresentative.address} —{" "}
                <a className="underline decoration-white/30 underline-offset-2" href={`mailto:${LEGAL.ukRepresentative.email}`}>
                  {LEGAL.ukRepresentative.email}
                </a>.
              </p>
            </>
          ),
        } as Section] : []),
    {
      id: "data-requests",
      title: "Data requests & complaints",
      content: (
        <p>
          To submit a privacy request, contact{" "}
          <a className="underline decoration-white/30 underline-offset-2" href={`mailto:${LEGAL.contactEmail}`}>
            {LEGAL.contactEmail}
          </a>. If you are in the EU/UK, you may also lodge a complaint with your local supervisory authority.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      content: (
        <p>
          We may update this Policy from time to time. We will post the new effective date above and, where appropriate,
          notify you in-app or by email. Continued use constitutes acceptance.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact us",
      content: (
        <p>
          Questions about this Policy? Email{" "}
          <a className="underline decoration-white/30 underline-offset-2" href={`mailto:${LEGAL.contactEmail}`}>
            {LEGAL.contactEmail}
          </a>.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* anchor for "Back to top" */}
      <div id="top" />

      {/* Hero / heading */}
      <section className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, rgba(22,219,101,0.15), transparent 60%), radial-gradient(50% 60% at 10% 30%, rgba(59,130,246,0.12), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 md:px-8 pt-16 pb-10">
          <H1>Privacy Policy</H1>
          <p className="mt-3 text-sm md:text-base text-white/70">
            {LEGAL.appName} respects your privacy. This policy explains what data we collect, how we use it, and the choices you have.
          </p>

          {/* Header strip */}
          <div className="mt-4 grid w-full grid-cols-1 gap-3 text-xs md:text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-white/60">Company</p>
              <p className="font-medium text-white">{LEGAL.companyName}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-white/60">Effective Date</p>
              <p className="font-medium text-white">{effectiveDate}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-white/60">Region Detected</p>
              <p className="font-medium text-white">{region}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-white/60">Minimum Age</p>
              <p className="font-medium text-white">{minAge}+ years</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-column content */}
      <section className="mx-auto max-w-6xl px-6 md:px-8 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
          {/* TOC */}
          <aside className="md:sticky md:top-24 md:self-start">
            <nav aria-label="Table of contents" className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="mb-3 text-sm font-medium text-white/80">On this page</p>
              <ul className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-lg px-2 py-1 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <a
                  href="#top"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                >
                  Back to top
                </a>
                <a
                  href="javascript:window.print()"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                >
                  Print
                </a>
              </div>
            </nav>
          </aside>

          {/* Article */}
          <article className="space-y-6">
            {sections.map((s) => (
              <Card key={s.id}>
                <H2 id={s.id}>{s.title}</H2>
                <div className="mt-3 prose prose-invert max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
                  {s.content}
                </div>
              </Card>
            ))}
          </article>
        </div>
      </section>

      {/* Print tweaks */}
      <style
        // Tailwind v4-safe inline print styles
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            nav[aria-label="Table of contents"] { display: none; }
            a[href^="#"]::after { content: ""; }
            .shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_30px_rgba(0,0,0,0.25)] { box-shadow: none !important; }
            .backdrop-blur-md, .backdrop-blur { -webkit-backdrop-filter: none; backdrop-filter: none; }
            .border-white\\/10 { border-color: rgba(255,255,255,0.2) !important; }
            .bg-white\\/5 { background: transparent !important; }
            .rounded-2xl { border-radius: 12px !important; }
          }
        `,
        }}
      />
    </main>
  );
}
