"use client";

import React, { useState } from "react";
import {
  motion,
  cubicBezier,
  type MotionProps,
} from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

// Brand palette
const BRAND = {
  bg: "#0B0F14",
  green: "#16DB65",
  blue: "#3B82F6",
  white: "#FFFFFF",
};

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

const fadeInDown: MotionProps = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      {/* Thin gradient progress/brand bar */}
      <div
        className="h-0.5 w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue})`,
        }}
      />

      <motion.div
        {...fadeInDown}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4"
      >
        {/* Left: Logo + Name */}
        <a href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            {/* From /public/BM_logo.png */}
            <img
              src="/BM_logo.png"
              alt="BudMeet"
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="text-base tracking-tight font-bold text-white">
            BudMeet
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
        <a className="transition hover:text-white" href="#about">
            About
          </a>
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#working">
            Working
          </a>
          <a className="transition hover:text-white" href="#safety_privacy">
            Safety&Privacy
          </a>
        </nav>

        {/* Right: CTA (desktop) */}
        <div className="hidden md:block">
          <a
            href="#download"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
          >
            Get the App
            <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, transition: { duration: 0.35, ease: easeOutExpo } },
          closed: { height: 0, opacity: 0, transition: { duration: 0.25, ease: easeOutExpo } },
        }}
        className="overflow-hidden border-t border-white/10 bg-[#0B0F14]/90 backdrop-blur md:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-white/90">
          <a onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:bg-white/5" href="#features">
            Features
          </a>
          <a onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:bg-white/5" href="#tech">
            Tech
          </a>
          <a onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:bg-white/5" href="#community">
            Community
          </a>
          <a
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/10"
            href="#download"
          >
            Get the App <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </header>
  );
}
