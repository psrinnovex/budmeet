// src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BudMeet",
    short_name: "BudMeet",
    description:
      "BudMeet is a real-life vibe matching app that helps you meet people nearby for coffee runs, workouts, study sessions, and instant plans.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0F14",
    theme_color: "#0B0F14",
    icons: [
      { src: "/manifest-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/manifest-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
