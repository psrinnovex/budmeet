// src/app/terms/page.tsx
import type { Metadata } from "next";
import PolicyLayout from "@/components/legal/PolicyLayout";
import { LEGAL, governingLawFor } from "@/lib/legal";
import { detectRegion } from "@/lib/region";

// ---------- SEO ----------
export const metadata: Metadata = {
  title: `${LEGAL.appName} Terms & Conditions`,
  description: `The rules for using ${LEGAL.appName}. Please read carefully.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${LEGAL.appName} Terms & Conditions`,
    description: `The rules for using ${LEGAL.appName}. Please read carefully.`,
    type: "article",
  },
};

// ---------- Helpers ----------
type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
      {children}
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

export default function TermsPage() {
  const region = detectRegion();
  const governingLaw = governingLawFor(region);
  const showEUUK = region === "EU" || region === "UK";

  const effectiveDate = LEGAL?.effectiveDate  ?? undefined;

  const sections: Section[] = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: (
        <p>
          By accessing or using {LEGAL.appName} (the “Service”), you agree to be bound by these Terms
          and our Privacy Policy. If you do not agree, do not use the Service.
        </p>
      ),
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content: (
        <p>
          You must be at least 13 years old (or the minimum required in your jurisdiction). If you are
          under the age of majority, you represent that you have consent from a parent or guardian.
        </p>
      ),
    },
    {
      id: "accounts",
      title: "Accounts & Security",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>Provide accurate information and keep your credentials confidential.</li>
          <li>You are responsible for all activity under your account.</li>
          <li>Notify us immediately of unauthorized use or security incidents.</li>
        </ul>
      ),
    },
    {
      id: "user-content",
      title: "User Content & License",
      content: (
        <p>
          You retain ownership of content you submit. By posting content, you grant us a worldwide,
          non-exclusive, royalty-free license to host, store, reproduce, modify, and display your content
          for operating and improving the Service. You represent you have the necessary rights to grant this license.
        </p>
      ),
    },
    {
      id: "conduct",
      title: "Acceptable Use & Prohibited Conduct",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>No unlawful, harassing, hateful, pornographic, or infringing content.</li>
          <li>No spam, scams, or deceptive practices.</li>
          <li>No scraping, reverse engineering, or interfering with the Service.</li>
          <li>No posting private or personal information of others without consent.</li>
          <li>Respect community guidelines and applicable laws.</li>
        </ul>
      ),
    },
    {
      id: "safety",
      title: "Safety Features & Enforcement",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>We may offer verification, block/report, and moderation tools for user safety.</li>
          <li>We may remove content or suspend accounts for violations.</li>
          <li>We may cooperate with law enforcement where required by law.</li>
        </ul>
      ),
    },
    {
      id: "subscriptions",
      title: "Subscriptions & Payments (if applicable)",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>Some features may require paid subscriptions or in-app purchases handled by third-party processors.</li>
          <li>Prices and features may change with notice. Local taxes may apply.</li>
          <li>Refunds are governed by platform rules (App Store/Play Store) and applicable law.</li>
        </ul>
      ),
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      content: (
        <p>
          {LEGAL.appName}, its trademarks, logos, and the Service content (excluding user content) are the
          property of {LEGAL.companyName} or its licensors. All rights reserved.
        </p>
      ),
    },
    {
      id: "thirdparty",
      title: "Third-Party Services",
      content: (
        <p>
          The Service may contain links or integrations with third-party services. We are not responsible for
          their content, policies, or practices.
        </p>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      content: (
        <p>
          We may suspend or terminate your access at any time for any reason, including violations of these Terms.
          You may stop using the Service at any time.
        </p>
      ),
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      content: (
        <p>
          The Service is provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind, express or
          implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
        </p>
      ),
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: (
        <p>
          To the maximum extent permitted by law, {LEGAL.companyName} and its affiliates will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill.
        </p>
      ),
    },
    {
      id: "indemnity",
      title: "Indemnification",
      content: (
        <p>
          You agree to defend, indemnify, and hold harmless {LEGAL.companyName} and its affiliates from any claims,
          liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.
        </p>
      ),
    },
    {
      id: "law",
      title: "Governing Law & Dispute Resolution",
      content: (
        <p>
          These Terms are governed by the laws of {governingLaw}, without regard to conflict of laws principles.
          Disputes will be resolved exclusively in the courts located in {governingLaw}.
        </p>
      ),
    },
    ...(showEUUK
      ? [
          {
            id: "eu-uk-representatives",
            title: "EU/UK Representatives",
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
          } as Section,
        ]
      : []),
    {
      id: "changes",
      title: "Changes to Terms",
      content: (
        <p>
          We may update these Terms from time to time. We will post the new effective date above and, where appropriate,
          notify you in-app or by email. Continued use constitutes acceptance of the updated Terms.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      content: (
        <p>
          Questions about these Terms? Contact{" "}
          <a className="underline decoration-white/30 underline-offset-2" href={`mailto:${LEGAL.contactEmail}`}>
            {LEGAL.contactEmail}
          </a>.
        </p>
      ),
    },
    {
      id: "not-legal-advice",
      title: "Not Legal Advice",
      content: (
        <p>
          These templates are provided for convenience and do not constitute legal advice. Consult qualified counsel to
          adapt them for your specific business, data practices, and jurisdictions.
        </p>
      ),
    },
  ];

  return (
    <PolicyLayout
      title="Terms & Conditions"
      description={`Please read these Terms & Conditions (“Terms”) carefully before using ${LEGAL.appName}.`}
    >
      {/* Header strip */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-white/70">Company</p>
            <p className="text-base font-medium text-white">{LEGAL.companyName}</p>
          </div>
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <div className="space-y-1">
            <p className="text-sm text-white/70">Governing Law</p>
            <p className="text-base font-medium text-white">{governingLaw}</p>
          </div>
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <div className="space-y-1">
            <p className="text-sm text-white/70">Region Detected</p>
            <p className="text-base font-medium text-white">{region}</p>
          </div>
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <div className="space-y-1">
            <p className="text-sm text-white/70">Effective Date</p>
            <p className="text-base font-medium text-white">
              {effectiveDate ?? "—"}
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column layout */}
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
          </nav>
          <div className="mt-4 text-xs text-white/50">
            <p>
              Printing? <span className="font-medium text-white/70">File → Print</span> for a clean copy.
            </p>
          </div>
        </aside>

        {/* Content */}
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

      {/* Print tweaks */}
      <style
        // Tailwind v4-safe inline print styles
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            nav[aria-label="Table of contents"] { display: none; }
            a[href^="#"]::after { content: ""; }
            .shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_30px_rgba(0,0,0,0.25)] { box-shadow: none !important; }
            .backdrop-blur-md { -webkit-backdrop-filter: none; backdrop-filter: none; }
            .border-white\\/10 { border-color: rgba(255,255,255,0.2) !important; }
            .bg-white\\/5 { background: transparent !important; }
            .rounded-2xl { border-radius: 12px !important; }
          }
        `,
        }}
      />
    </PolicyLayout>
  );
}
