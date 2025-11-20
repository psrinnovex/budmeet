// src/app/twitter-image.tsx
import { ImageResponse } from "next/og";

export const alt = "BudMeet — Real-life social app for vibe matching";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          background:
            "linear-gradient(135deg, #0B0F14 0%, #0C1828 35%, #0B183A 65%, #0B0F14 100%)",
          color: "#F8FAFC",
          fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>
            BudMeet · Real-life vibe matching
          </div>
          <div style={{ fontSize: 24, color: "#E5E7EB", maxWidth: 820 }}>
            Discover people near you for instant plans—coffee runs, study sessions, workouts, or
            chill hangouts. Verified members, privacy-first defaults.
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Instant plans", "Groups you vibe with", "Safety built-in"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 17,
                  color: "#E0F2FE",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background:
                  "linear-gradient(150deg, rgba(22,219,101,0.2), rgba(59,130,246,0.4))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0B0F14",
                fontWeight: 800,
                fontSize: 24,
                boxShadow: "0 14px 48px rgba(0,0,0,0.35)",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 18, color: "#C7D2FE", letterSpacing: 1.8 }}>BUDMEET</span>
              <span style={{ fontSize: 16, color: "#9CA3AF" }}>Launching soon</span>
            </div>
          </div>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.05)",
              fontWeight: 700,
              color: "#C7D2FE",
              fontSize: 20,
            }}
          >
            budmeet.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
