// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/header";
import AdvancedFooter from "@/components/footer";

export const metadata: Metadata = {
  title: "BudMeet — Find Your Vibe",
  description: "BudMeet helps you connect with like-minded people nearby for meaningful hangouts and friendships. Discover your vibe today!",
  keywords: [
    "BudMeet",
    "social app",
    "meet people",
    "make friends",
    "hangouts",
    "local connections",
    "vibe matching",
    "spontaneous plans",
    "privacy-first",
    "verified identities",
    "real-life connections",
    "community building",
    "friendship app",
    "social networking",
    "event planning",
  ],
  authors: [{ name: "BudMeet", url: "https://budmeet.app" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      {/* Use dvh to avoid iOS address-bar gaps; fall back to min-h-screen */}
      <body className="min-h-dvh min-h-screen flex flex-col bg-[#0B0F14] text-white antialiased">
        {/* Sticky header wrapper (keeps your existing <Header/> untouched) */}
        <div className="sticky top-0 z-[9999] bg-[#0B0F14]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F14]/60 border-b border-white/10">
          <Header />
        </div>

        {/* Main grows to push footer down when content is short.
            Also ensures last section has no bottom margin/padding. */}
        <main className="flex-1 flex flex-col [&>*:last-child]:mb-0 [&>*:last-child]:pb-0">
          {children}
        </main>

        {/* Footer sits at the very bottom; make sure the component itself
            doesn’t add external margins. */}
        <AdvancedFooter />
      </body>
    </html>
  );
}
