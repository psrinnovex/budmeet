// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/header";
// If your footer lives at components/layout/AdvancedFooter.tsx,
// make sure this path matches:
import AdvancedFooter from "@/components/footer";

export const metadata: Metadata = {
  title: "BudMeet — IRL social app",
  description: "Find your vibe. Grow your tribe. Real meetups, verified users, and safety by default.",
  metadataBase: new URL("https://budmeet.app"),
  openGraph: {
    title: "BudMeet — IRL social app",
    description: "Find your vibe. Grow your tribe.",
    url: "https://budmeet.app",
    siteName: "BudMeet",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BudMeet — IRL social app",
    description: "Find your vibe. Grow your tribe.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const title = "BudMeet — The Real-Life Social / Vibe Matching App";
  const description =
    "BudMeet is a social app for real local meetups. No swipes, no fluff — just real connections in your city.";

  return (
    <html lang="en" className="h-full">
               <head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://budmeet.app/BM_logo.png" />
        <meta property="og:url" content="https://budmeet.app/" />

        {/* Instagram */}
        <meta name="instagram:card" content="summary_large_image" />
        <meta name="instagram:title" content={title} />
        <meta name="instagram:description" content={description} />
        <meta name="instagram:image" content="https://budmeet.app/BM_logo.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://budmeet.app/" />

        {/* Structured data (example for “SoftwareApplication”) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BudMeet",
              url: "https://budmeet.app",
              description,
              operatingSystem: "iOS, Android",
              applicationCategory: "SocialNetworking",
              genre: "Social, Vibe Matching, Local Connections",
              keywords:
                "BudMeet, social app, meet people, make friends, hangouts, local connections, vibe matching, spontaneous plans, privacy-first, verified identities, real-life connections, community building, friendship app, social networking, event planning",
              sameAs: [
                "https://www.instagram.com/budmeet.app/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-dvh min-h-screen flex flex-col bg-[#0B0F14] text-white antialiased">
        <div className="sticky top-0 z-[9999] bg-[#0B0F14]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F14]/60 border-b border-white/10">
          <Header />
        </div>
        <main className="flex-1 flex flex-col [&>*:last-child]:mb-0 [&>*:last-child]:pb-0">
          {children}
        </main>
        <AdvancedFooter />
      </body>
    </html>
  );
}
