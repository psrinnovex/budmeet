import type { Metadata } from "next";

const supportEmail = "support@budmeet.app";
const mailSubject = "Delete my BudMeet account";
const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(mailSubject)}`;

export const metadata: Metadata = {
  title: "Delete BudMeet account",
  description:
    "Request deletion of your BudMeet account and associated data by contacting our support team from your registered email.",
  alternates: { canonical: "/delete-account" },
  openGraph: {
    title: "Delete BudMeet account",
    description:
      "Email BudMeet support from your registered address with the subject “Delete my BudMeet account” and we’ll remove your data within 30 days.",
    type: "website",
  },
};

const steps = [
  {
    title: "Send the email we need",
    detail:
      "Use the email address you used to sign up so we can locate your account in our systems without manual verification delays.",
  },
  {
    title: "Use the right subject line",
    detail:
      'Set the email subject to “Delete my BudMeet account” so our inbox routing and automation can flag your request for the compliance queue.',
  },
  {
    title: "We delete within 30 days",
    detail:
      "Once we confirm the request, we purge your personal data (subject to any regulatory record-keeping) and email you a confirmation.",
  },
];

export default function DeleteAccountPage() {
  return (
    <main className="min-h-[calc(100vh-7rem)] bg-gradient-to-b from-[#05070B] via-[#05060D] to-[#03040A] text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur-3xl sm:p-10">
          <p className="text-base uppercase tracking-[0.3em] text-white/60">Account Safety</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Delete your BudMeet account
          </h1>
          <p className="mt-4 text-lg text-white/80">
            To delete your BudMeet account and all associated personal data, email us at{" "}
            <span className="font-semibold text-white">{supportEmail}</span> from the same email you used to
            register. Include the subject line <span className="font-semibold text-white">“Delete my BudMeet account”</span>{" "}
            and we’ll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-gradient-to-r from-[#16DB65] to-[#3B82F6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-110"
            >
              Email support
            </a>
            <span className="text-sm text-white/70">
              You will receive a confirmation email within 30 days after we finish deleting your data.
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <h2 className="text-lg font-semibold text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{step.detail}</p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/75 backdrop-blur">
          <p className="font-semibold text-white">Need to confirm anything else?</p>
          <p className="mt-2">
            If the email you used is no longer accessible, please mention any alternate handles or phone numbers
            that were linked to your BudMeet account so we can verify your identity before processing the deletion.
          </p>
        </div>
      </section>
    </main>
  );
}
