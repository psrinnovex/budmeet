// app/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowBudMeetWorksSection from "@/components/working";
import BudMeetAdvancedAbout from "@/components/about";
import SafetyPrivacySection from "@/components/safety_privacy";

const siteUrl = "https://budmeet.app";

export const metadata: Metadata = {
  title: "Meet people who actually get you | BudMeet",
  description:
    "BudMeet is the real-life vibe matching app for quick hangs, study sessions, workouts, and chill plans nearby—no endless swiping.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "BudMeet — Real-life vibe matching for instant plans",
    description:
      "Find nearby people who match your energy. BudMeet focuses on real-world meetups, verified users, and privacy-first safety tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BudMeet — Real-life vibe matching for instant plans",
    description:
      "Skip the endless scroll. BudMeet helps you discover people and groups around you for real hangouts, safely.",
  },
  keywords: [
    "BudMeet app",
    "meet new people nearby",
    "vibe matching",
    "real life social app",
    "friend finder",
    "local hangouts",
    "study groups",
    "workout buddies",
    "privacy first social",
    "verified social app",
  ],
};

function Clip({ children }: { children: React.ReactNode }) {
  // Guards against any child (3D Canvas, absolute glows, wide images) exceeding 100vw
  return (
    <section className="relative w-full max-w-[100vw] overflow-x-clip">
      {children}
    </section>
  );
}

export default function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is BudMeet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BudMeet is a real-life vibe matching app that connects you with nearby people for instant plans—coffee runs, workouts, study sessions, or just hanging out—without endless swiping.",
        },
      },
      {
        "@type": "Question",
        name: "How does BudMeet match people?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BudMeet uses interest tags, energy levels, timing, and presence signals to suggest people and groups who closely match your vibe so you can meet faster.",
        },
      },
      {
        "@type": "Question",
        name: "Is BudMeet free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BudMeet is launching with free access to core features and a waitlist. Additional premium perks may be introduced later, but meeting people and joining groups starts free.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to share my location?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Location is optional. You control permissions at the OS level, and BudMeet focuses on proximity only when you enable it to show nearby people and plans.",
        },
      },
      {
        "@type": "Question",
        name: "How does BudMeet keep me safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BudMeet prioritizes safety with verified users, privacy-first defaults, and community tools like block and report to keep meetups respectful and secure.",
        },
      },
    ],
  };

  return (
    <main className="relative overflow-x-clip">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="[&>*:last-child]:mb-0 [&>*:last-child]:pb-0">
        <Clip>
          <Hero />
        </Clip>

        <Clip>
          <BudMeetAdvancedAbout />
        </Clip>

        <Clip>
          <Features />
        </Clip>

        <Clip>
          <HowBudMeetWorksSection />
        </Clip>

        <Clip>
          <SafetyPrivacySection />
        </Clip>
      </div>
    </main>
  );
}
