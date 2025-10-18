// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/header";
import AdvancedFooter from "@/components/footer";

const siteName = "BudMeet";
const siteUrl = "https://budmeet.app";
const ogImage = "/og-image.png"; // ensure this exists; 1200x630 recommended
const title = "BudMeet — The Real-Life Social / Vibe Matching App";
const description =
  "BudMeet is a social app for real local meetups. No swipes, no fluff — just real connections in your city.";

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: siteName,
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
    "social networking",
    "event planning",
  ],
  authors: [{ name: "BudMeet" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: ogImage, // served from /public
        width: 1200,
        height: 630,
        alt: "BudMeet — IRL Social App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // Optional icons (ensure files exist in /public)
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "social",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD for SoftwareApplication (structured data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BudMeet",
    url: siteUrl,
    description,
    operatingSystem: "iOS, Android",
    applicationCategory: "SocialNetworking",
    genre: "Social, Vibe Matching, Local Connections",
    offers: {
      "@type": "Offer",
      price: "0", // update if paid
      priceCurrency: "USD",
    },
    sameAs: [
      "https://www.instagram.com/budmeet.app/",
      // add other official profiles when live (Twitter, LinkedIn, etc.)
    ],
  };

  return (
    <html lang="en" className="h-full">
      {/* Structured Data */}
      <Script
        id="ld-software-app"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className="min-h-dvh min-h-screen flex flex-col bg-[#0B0F14] text-white antialiased">
        <div className="sticky top-0 z-[9999] border-b border-white/10 bg-[#0B0F14]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F14]/60">
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
