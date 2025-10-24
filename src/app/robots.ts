// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://budmeet.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Disallow private endpoints if any:
      // disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap-0.xml`,
    host: base,
  };
}
