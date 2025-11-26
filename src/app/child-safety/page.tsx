import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";

const siteUrl = "https://budmeet.app";

export const metadata: Metadata = {
  title: "BudMeet Child Safety & CSAM Policy",
  description:
    "BudMeet is an adults-only community with a zero-tolerance approach to CSAM and the sexualization of minors.",
  alternates: { canonical: "/child-safety" },
  openGraph: {
    title: "BudMeet Child Safety & CSAM Policy",
    description:
      "We remove child sexual abuse material, ban violators, work with law enforcement, and give you clear reporting channels.",
    url: `${siteUrl}/child-safety`,
    type: "article",
  },
};

const keyPromises = [
  {
    title: "Adults only, zero tolerance",
    body: "BudMeet is intended for adults only, and we maintain a zero-tolerance stance on any CSAM or sexualization of minors.",
  },
  {
    title: "Report wherever you see it",
    body: "You can flag profiles, chats, photos, events, or messages through the in-app controls or by emailing ",
  },
  {
    title: "Immediate removal & bans",
    body: "When content appears to violate this policy, we remove it immediately and permanently ban the involved accounts.",
  },
  {
    title: "Law enforcement cooperation",
    body: "We notify the relevant hotlines or law-enforcement agencies in each country we operate in and fully cooperate with ongoing investigations.",
  },
  {
    title: "Detection & prevention",
    body: "A mix of manual moderation and automated signals helps us find, escalate, and block child-exploitative behavior before it spreads.",
  },
  {
    title: "Ongoing improvements",
    body: "We regularly review our child safety practices, aligning with applicable laws and app-store expectations.",
  },
];

export default function ChildSafetyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div id="top" />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F14] pb-16 pt-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          aria-hidden
          style={{
            background:
              "radial-gradient(50% 50% at 25% 20%, rgba(14, 165, 233, 0.14), transparent 60%), radial-gradient(65% 65% at 80% 40%, rgba(14, 165, 233, 0.1), transparent 55%)",
          }}
        />

        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">BudMeet policy</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Child Safety & CSAM Policy
          </h1>
          <p className="mt-6 text-lg text-white/70">
            BudMeet is for adults only. We enforce a zero-tolerance approach to child sexual abuse material and any
            sexualization of minors. Clear reporting and swift action keep this community safe for our adult members.
          </p>
        </div>
      </section>

      {/* policy highlights */}
      <section className="mx-auto max-w-5xl space-y-6 px-6 py-12 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {keyPromises.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_-30px_rgba(2,6,23,0.8)] backdrop-blur"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/70">
                {item.body}
                {item.title === "Report wherever you see it" && (
                  <>
                    <Link
                      href={`mailto:${LEGAL.contactEmail}`}
                      className="underline decoration-cyan-400/80 underline-offset-2"
                    >
                      {LEGAL.contactEmail}
                    </Link>
                    .
                  </>
                )}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-6 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.9)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-100/80">When you report</p>
          <p className="mt-2 text-lg font-semibold text-white">
            We triage all reports around the clock. If there is evidence of CSAM or child exploitation, we remove the
            material, ban the responsible accounts, and escalate to the proper authorities without delay.
          </p>
          <p className="mt-4 text-sm text-white/70">
            We log every report, preserve evidence for investigations, and share updates with the reporting user when
            feasible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold text-white">Reporting channels</h3>
          <p className="text-sm text-white/70">
            Report directly inside the BudMeet app wherever you see suspicious profiles, chats, photos, events, or
            messages. You can also email us any supporting context at{" "}
            <Link
              href={`mailto:${LEGAL.contactEmail}`}
              className="underline decoration-cyan-400/80 underline-offset-2"
            >
              {LEGAL.contactEmail}
            </Link>
            .
          </p>
          <p className="text-sm text-white/70">
            We investigate every report, keep you informed when possible, and maintain strict confidentiality for all
            parties involved.
          </p>
          <p className="text-sm text-white/70">
            This policy is reviewed regularly to stay aligned with applicable laws, app-store requirements, and our
            evolving safety capabilities.
          </p>
        </div>
      </section>
    </main>
  );
}
