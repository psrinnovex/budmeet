// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://budmeet.app";
  const lastmod = new Date().toISOString();

  const routes = ["/", "/privacy", "/terms"];

  return routes.map((p) => ({
    url: `${base}${p.replace(/\/+$/, "") || "/"}`,
    lastModified: lastmod,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1.0 : 0.55,
  }));
}
