// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://budmeet.app";
  const lastmod = new Date().toISOString();

  // Add your key routes here:
  const routes = ["", "/#working", "/#safety_privacy", "/privacy", "/terms"];

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: lastmod,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.6,
  }));
}
