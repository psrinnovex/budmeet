// src/components/LaunchingSoonModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

const BRAND = {
  blue: "#3B82F6",
  green: "#16DB65",
};

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

export default function LaunchingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e?: React.FormEvent): Promise<void> => {
    e?.preventDefault();
    if (loading || !isValid) return;
    if (hp.trim()) return; // bot guard

    const key = `bm_waitlist_${email.toLowerCase()}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      setDone(true);
      setMsg("You’re already on the list — we’ll ping you soon!");
      return;
    }

    try {
      setLoading(true);
      setMsg(null);

      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      const payload = {
        email,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_term: params.get("utm_term"),
        utm_content: params.get("utm_content"),
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
      };

      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        type ErrJson = { error?: string };
        const errJson = (await res.json().catch(() => ({}))) as ErrJson;
        throw new Error(errJson.error || "Something went wrong");
      }

      if (typeof window !== "undefined") localStorage.setItem(key, "1");
      setDone(true);
      setMsg("You’re on the list! We’ll notify you the moment BudMeet drops.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not add you right now. Please try again.";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          aria-modal="true"
          role="dialog"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          />

          {/* Panel */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, rotateX: -8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, transition: { type: "spring", stiffness: 260, damping: 22 } }}
            exit={{ opacity: 0, scale: 0.94, rotateX: -4, transition: { duration: 0.2 } }}
            className="relative w-full max-w-xl md:max-w-2xl rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 text-white shadow-[0_15px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            {/* Glow ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-50 blur-2xl"
              style={{
                background: `conic-gradient(from 180deg at 50% 50%, ${BRAND.blue}22, ${BRAND.green}22, ${BRAND.blue}22)`,
              }}
            />

            {/* Shine sweep */}
            <motion.span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <motion.span
                className="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-transparent blur-md"
                animate={{ x: ["-120%", "140%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>

            <div className="flex items-start justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Early Access
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/70 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">Launching Soon</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              We’re polishing the final details. Join the early list and we’ll notify you the moment BudMeet hits the stores.
            </p>

            {/* Form */}
            {!done ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                {/* Honeypot (hidden) */}
                <label className="sr-only" htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex items-stretch gap-2">
                  <input
                    type="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none backdrop-blur focus:border-white/20"
                    aria-invalid={email.length > 0 && !isValid}
                    aria-describedby="notify-help"
                  />
                  <button
                    type="submit"
                    disabled={!isValid || loading}
                    className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <motion.span
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                    ) : (
                      <>
                        Notify Me
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                <p id="notify-help" className="text-xs text-white/60">
                  No spam. Unsubscribe anytime.
                </p>
                {msg && <p className="text-xs text-rose-300/90">{msg}</p>}
              </form>
            ) : (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p>✅ {msg || "You’re on the list!"}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
