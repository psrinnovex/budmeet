"use client";

import React from "react";
import { motion, cubicBezier } from "framer-motion";
import { ArrowRight, Sparkles, Users } from "lucide-react";
// 3D
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles as DreiSparkles } from "@react-three/drei";
import Link from "next/link";
import Image from "next/image";

const BRAND = {
  bg: "#0B0F14",
  green: "#16DB65",
  blue: "#3B82F6",
  white: "#FFFFFF",
};

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo, staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

/** --------------------- 3D Background (subtle, performant) --------------------- */
function Background3D() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 8], fov: 55 }}
    >
      {/* Soft ambient */}
      <ambientLight intensity={0.35} />
      {/* Tone lights */}
      <pointLight position={[6, 8, 6]} intensity={0.6} />
      <pointLight position={[-8, -6, -4]} intensity={0.4} />

      {/* Floating sparkles cloud */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
        <DreiSparkles
          count={120}
          size={2}
          speed={0.35}
          color={BRAND.blue}
          opacity={0.3}
          scale={[15, 8, 5]}
        />
      </Float>
      {/* Second layer (green hue) */}
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.5}>
        <DreiSparkles
          count={90}
          size={1.8}
          speed={0.25}
          color={BRAND.green}
          opacity={0.25}
          scale={[12, 7, 5]}
        />
      </Float>
    </Canvas>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden" style={{ backgroundColor: BRAND.bg }}>
      {/* 3D background */}
      <div className="pointer-events-none absolute inset-0">
        <Background3D />
      </div>

      {/* Gradient glows + grid overlay (kept subtle so 3D stays primary) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-24 -top-24 h-[24rem] w-[24rem] blur-[90px] opacity-30 sm:h-[28rem] sm:w-[28rem] md:h-[32rem] md:w-[32rem]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.0) 70%)",
          }}
        />
        <div
          className="absolute -left-24 bottom-[-8rem] h-[26rem] w-[26rem] blur-[100px] opacity-30 sm:h-[30rem] sm:w-[30rem] md:h-[34rem] md:w-[34rem]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(22,219,101,0.5) 0%, rgba(22,219,101,0.0) 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_40%,#000_60%,transparent_100%)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B0F14] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0F14] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid min-h-[60vh] items-center gap-10 md:grid-cols-2 md:min-h-[68vh] lg:min-h-[72vh]"
        >
          {/* Copy */}
          <div className="space-y-6">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Find your vibe. Grow your tribe.
            </motion.div>

            <motion.h1
              variants={item}
              className="text-[clamp(1.9rem,3.6vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
            >
              Meet people who{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.green}, ${BRAND.blue})` }}
              >
                actually get you
              </span>
              .
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-[clamp(0.98rem,1.2vw,1.125rem)] leading-relaxed text-white/70"
            >
              BudMeet connects you to real-world hangouts powered by smart matching:
              interests, energy, and timing. Less scrolling, more living.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#download"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-white backdrop-blur transition hover:bg-white/20"
              >
                Get the App
                <ArrowRight className="h-4 w-4 -translate-x-0 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-white/80 transition hover:text-white"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6 pt-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Built for IRL connections</span>
              </div>
              <div className="hidden h-3 w-px bg-white/10 sm:block" />
              <div className="hidden sm:block">Community by default</div>
            </motion.div>
          </div>

          {/* Visual — SMALLER phone + animations */}
          <motion.div variants={item} className="relative">
            <motion.div
              // gentle float animation
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              // tilt on hover/tap
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
              whileTap={{ rotateX: -4, rotateY: 4, scale: 0.99 }}
              className="relative mx-auto w-full max-w-[280px] sm:max-w-[330px] md:max-w-[380px] lg:max-w-[420px] will-change-transform"
            >
              {/* Glow ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-5 rounded-[2rem] opacity-60 blur-2xl sm:-inset-6"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.28), rgba(22,219,101,0.28), rgba(59,130,246,0.28))",
                }}
              />
              {/* Device card */}
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                {/* Screen bezel */}
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/60 p-2">
                  {/* Fixed phone aspect */}
                  <div className="relative mx-auto aspect-[9/19.5] w-full overflow-hidden rounded-[1.2rem]">
                    {/* subtle shine sweep */}
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.2rem]">
                      <span className="absolute -left-1/3 top-0 h-full w-1/2 translate-x-[-120%] bg-gradient-to-r from-white/10 via-white/25 to-transparent blur-md will-change-transform [animation:shine_6s_linear_infinite]" />
                    </span>

                    {/* Screen image (optimized) */}
                    <Image
                      src="/budmeet-home.jpg" // ensure file exists in /public
                      alt="BudMeet app preview"
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 420px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS keyframes (shine) */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"], .will-change-transform {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
