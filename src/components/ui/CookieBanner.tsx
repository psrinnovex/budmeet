// src/components/ui/CookieBanner.tsx
"use client";

import React from "react";
import { LEGAL } from "@/lib/legal";
// If you built detectRegion(), import it; otherwise this stub returns "OTHER"
import { detectRegion } from "@/lib/region"; // make sure this exists as shown earlier

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  timestamp: string; // ISO
  region: string;
  version: string;   // bump when you change policy
};

const STORAGE_KEY = "budmeet_cookie_consent_v1"; // bump suffix when you change structure

const BRAND = {
  bgPanel: "bg-zinc-900/80",
  text: "text-zinc-300",
  border: "border-white/10",
  btn: "rounded-xl px-4 py-2 text-sm font-medium",
  btnGhost: "border hover:bg-white/5",
  btnSolid: "bg-white/10 hover:bg-white/20",
};

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);
  const region = React.useMemo(() => detectRegion(), []);
  const isOptInRegion = region === "EU" || region === "UK"; // stricter consent

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      // If parsing fails or missing fields, show the banner again
      const parsed: ConsentState = JSON.parse(raw);
      if (!parsed?.timestamp || parsed?.version !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (consent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const handleAcceptAll = () =>
    saveConsent({
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      region,
      version: "1",
    });

  const handleDeclineAll = () =>
    saveConsent({
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      region,
      version: "1",
    });

  const handleRemindLater = () => {
    // Don’t persist; just hide for this session/tab
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className={`mx-auto max-w-5xl m-3 rounded-2xl border p-4 md:p-5 backdrop-blur ${BRAND.bgPanel} ${BRAND.border}`} role="dialog" aria-live="polite" aria-label="Cookie consent">
        <p className={`text-sm ${BRAND.text}`}>
          We use cookies to personalize content, measure analytics, and improve your experience.
          {isOptInRegion ? (
            <> In your region, non-essential cookies are **off** until you consent.</>
          ) : (
            <> You can manage preferences in your browser or learn more in our policy.</>
          )}{" "}
          See our <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {/* Primary action changes by region */}
          {isOptInRegion ? (
            <button onClick={handleAcceptAll} className={`${BRAND.btn} ${BRAND.btnSolid}`} aria-label="Accept all cookies">
              Accept
            </button>
          ) : (
            <button onClick={handleAcceptAll} className={`${BRAND.btn} ${BRAND.btnSolid}`} aria-label="Got it">
              Accept
            </button>
          )}

          {/* Decline / Only necessary */}
          <button onClick={handleDeclineAll} className={`${BRAND.btn} ${BRAND.border} ${BRAND.btnGhost}`} aria-label="Decline non-essential cookies">
            Decline
          </button>

          {/* Learn more */}
          <a href="/privacy" className={`${BRAND.btn} ${BRAND.border} ${BRAND.btnGhost}`} aria-label="Learn more about our privacy policy">
            Learn more
          </a>

          {/* Optional dismiss (session-only) */}
          <button onClick={handleRemindLater} className={`${BRAND.btn} ${BRAND.border} ${BRAND.btnGhost}`} aria-label="Remind me later">
            Remind me later
          </button>
        </div>

        {/* Small print */}
        <p className="mt-2 text-xs text-zinc-400">
          Controller: {LEGAL.companyName}, {LEGAL.address}. Questions?{" "}
          <a href={`mailto:${LEGAL.contactEmail}`} className="underline">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
