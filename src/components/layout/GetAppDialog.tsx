"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/budmeet-meet-real-people/id6754511646";
const PLAY_STORE_URL = ""; 
// TODO: replace with your real Play Store URL (or keep #playstore for now)

type GetAppDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function GetAppDialog({ open, onClose }: GetAppDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl">
              {/* Close button */}
              <button
                className="absolute right-3 top-3 rounded-full p-1 text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-400/80">
                  Get BudMeet
                </p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-50">
                  Choose where to download
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Install BudMeet on your phone and start meeting real people nearby.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {/* App Store */}
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 transition hover:border-cyan-400/70 hover:bg-zinc-900"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/70">
                    <Image
                      src="/app-store.png"
                      alt="Download on the App Store"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      Download on the
                    </span>
                    <span className="text-sm font-medium text-zinc-50">
                      App Store
                    </span>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 transition hover:border-emerald-400/70 hover:bg-zinc-900"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/70">
                    <Image
                      src="/playstore.svg"
                      alt="Get it on Google Play"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      Get it on
                    </span>
                    <span className="text-sm font-medium text-zinc-50">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              <p className="mt-3 text-[11px] text-zinc-500">
                Tip: Open this page on your phone for the smoothest install.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
