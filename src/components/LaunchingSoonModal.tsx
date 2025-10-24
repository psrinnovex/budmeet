// src/components/LaunchingSoonModal.tsx
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Sparkles, X, Rocket, Zap } from "lucide-react";

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
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              transition: { type: "spring", stiffness: 260, damping: 22 },
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              rotateX: -4,
              transition: { duration: 0.2 },
            }}
            className="relative w-full max-w-xl md:max-w-2xl rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {/* Glow ring around card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-60 blur-2xl"
              style={{
                background: `conic-gradient(from 180deg at 50% 50%, ${BRAND.blue}22, ${BRAND.green}22, ${BRAND.blue}22)`,
              }}
            />

            {/* Sweeping light shimmer */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <motion.span
                className="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-transparent blur-md"
                animate={{ x: ["-120%", "140%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>

            {/* Header row */}
            <div className="flex items-start justify-between">
              {/* Status pill with subtle pulse */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                initial={{ opacity: 0, y: -6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: easeOutExpo },
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-white/80" />
                <span className="text-white/80">Early November Access</span>

                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
                  <motion.span
                    className="absolute inline-block h-2 w-2 rounded-full bg-emerald-400/40 blur-[2px]"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </span>
              </motion.div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/70 transition hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Floating icon burst */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -4 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: { delay: 0.05, duration: 0.5, ease: easeOutExpo },
              }}
              className="mt-6 flex items-center gap-3 text-white/70"
            >
              <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                {/* subtle glow behind the icon */}
                <span
                  className="absolute inset-0 rounded-xl blur-[18px] opacity-50"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${BRAND.blue}55 0%, transparent 70%)`,
                  }}
                />
                <Rocket className="relative h-5 w-5 text-white drop-shadow-[0_4px_8px_rgba(59,130,246,0.6)]" />
              </div>

              <div className="text-xs leading-relaxed text-white/60">
                <div className="flex items-center gap-1.5 font-medium text-white/80">
                  <Zap className="h-3.5 w-3.5 text-emerald-400" />
                  <span>BudMeet is almost live</span>
                </div>
                <div className="text-[11px] text-white/50">
                  Real connections. No endless swiping.
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="mt-6 text-center text-2xl font-semibold leading-[1.15] tracking-tight text-white md:text-3xl"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { delay: 0.08, duration: 0.5, ease: easeOutExpo },
              }}
            >
              <motion.span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue})`,
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Launching This November
              </motion.span>
            </motion.h3>

            {/* Body copy */}
            <motion.p
              className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-white/70 md:text-base md:leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.12, duration: 0.5, ease: easeOutExpo },
              }}
            >
              We’re rolling BudMeet out in November. You’ll be able to find people
              nearby who match your vibe, make plans fast, and actually meet —
              same day, not “someday.”
            </motion.p>

            {/* Bottom CTA */}
            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.18, duration: 0.5, ease: easeOutExpo },
              }}
            >
              {/* Dismiss button */}
              <button
                onClick={onClose}
                className="group inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Got it
              </button>

              {/* footnote */}
              <div className="text-center text-[11px] leading-relaxed text-white/50 sm:text-left">
                You’re early.
                <br />
                BudMeet is built for real life, not feeds.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
