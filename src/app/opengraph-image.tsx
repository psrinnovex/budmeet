// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const alt = "BudMeet — Real-life vibe matching app for instant plans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "linear-gradient(135deg, #0B0F14 0%, #0C1828 35%, #0A1A2F 68%, #0B0F14 100%)",
          color: "#F8FAFC",
          fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background:
                "linear-gradient(145deg, rgba(22,219,101,0.24), rgba(59,130,246,0.42))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0F14",
              fontWeight: 800,
              fontSize: 26,
              boxShadow: "0 14px 48px rgba(0,0,0,0.35)",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 18, color: "#C7D2FE", letterSpacing: 2 }}>BUDMEET</span>
            <span style={{ fontSize: 16, color: "#9CA3AF" }}>Real-life social / vibe matching</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: 10,
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: 780,
              letterSpacing: -1,
            }}
          >
            <span>Meet people nearby who</span>
            <span style={{ color: "#16DB65" }}>actually get you</span>
            <span>.</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 26, color: "#E5E7EB", maxWidth: 720 }}>
            Verified members, privacy-first defaults, and instant plans so you spend less time
            scrolling and more time meeting.
          </div>
          <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Instant plans", "Groups for every vibe", "Verified & safe"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 18,
                  color: "#E0F2FE",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#E5E7EB",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #16DB65 0%, #3B82F6 80%, #2563EB 100%)",
                boxShadow: "0 0 0 10px rgba(59,130,246,0.14)",
              }}
            />
            <span style={{ fontWeight: 700 }}>Launching soon by PSHR INNOVEX PVT LTD</span>
          </div>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.04)",
              fontWeight: 700,
              color: "#C7D2FE",
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
