"use client";

import React, { useState } from "react";
import { motion, cubicBezier, type MotionProps } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            {/* From /public/BM_logo.png */}
            <Image
              src="/BM_logo.png"
              alt="BudMeet"
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            BudMeet
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
          <Link className="transition hover:text-white" href="#about">
            About
          </Link>
          <Link className="transition hover:text-white" href="#features">
            Features
          </Link>
          <Link className="transition hover:text-white" href="#working">
            Working
          </Link>
          <Link className="transition hover:text-white" href="#safety_privacy">
            Safety&Privacy
          </Link>
        </nav>

        {/* Right: CTA (desktop) */}
        <div className="hidden md:block">
          <Link
            href="#download"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
          >
            Get the App
            <ArrowRight className="h-4 w-4 -translate-x-0 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.35, ease: easeOutExpo },
          },
          closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.25, ease: easeOutExpo },
          },
        }}
        className="overflow-hidden border-t border-white/10 bg-[#0B0F14]/90 backdrop-blur md:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-white/90">
          <Link
            href="#features"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5"
          >
            Features
          </Link>
          <Link
            href="#tech"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5"
          >
            Tech
          </Link>
          <Link
            href="#community"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5"
          >
            Community
          </Link>
          <Link
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/10"
          >
            Get the App <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
