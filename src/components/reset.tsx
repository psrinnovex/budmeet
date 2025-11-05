// pages/reset.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const ResetShimPage: NextPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState("Opening the BudMeet app…");
  const tried = useRef(false);

  const code = typeof router.query.code === "string" ? router.query.code : "";
  const type = typeof router.query.type === "string" ? router.query.type : "recovery";

  const { deeplink, fallback } = useMemo(() => {
    const enc = encodeURIComponent;
    return {
      deeplink: `budmeet://auth/reset-password?type=${enc(type)}&code=${enc(code)}&token_hash=${enc(code)}`,
      fallback: `https://budmeet.app/help/reset?code=${enc(code)}&type=${enc(type)}`,
    };
  }, [code, type]);

  useEffect(() => {
    if (!router.isReady || tried.current) return;
    tried.current = true;

    setStatus("Opening the BudMeet app…");
    window.location.href = deeplink;

    const t = setTimeout(() => {
      setStatus("Couldn’t open the app. Continuing in browser…");
      window.location.href = fallback;
    }, 1000);

    return () => clearTimeout(t);
  }, [router.isReady, deeplink, fallback]);

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Opening BudMeet…</h1>
      <p style={styles.p}>{status}</p>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <a href={deeplink} style={styles.btn}>Open in app</a>
        <a href={fallback} style={styles.btnAlt}>Continue in browser</a>
      </div>

      <noscript>
        <p>
          JavaScript is required to open the app automatically. You can{" "}
          <a href={deeplink}>open in the app</a> or{" "}
          <a href={fallback}>continue in the browser</a>.
        </p>
      </noscript>
    </main>
  );
};

export default ResetShimPage;

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    textAlign: "center",
    background: "#0b0d12",
    color: "#e5e7eb",
  },
  h1: { fontSize: 24, fontWeight: 800, marginBottom: 8 },
  p: { opacity: 0.85 },
  btn: {
    background: "#7C3AED",
    color: "#000",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
  },
  btnAlt: {
    background: "#23262F",
    color: "#e5e7eb",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
  },
};

