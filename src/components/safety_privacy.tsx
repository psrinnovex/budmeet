"use client";

import React, { Suspense } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  RoundedBox,
  Center,
  Bounds,
} from "@react-three/drei";
import { ShieldCheck, MapPin, Ban, FileCheck2 } from "lucide-react";
import Link from "next/link";

/**
 * BudMeet — Safety & Privacy, By Design
 * - Calm glass panels + rotating 3D lock vignette
 * - Plain-language policy highlights (on-device checks, location privacy, block/report, audits)
 * - CTA: "Read our Safety Playbook"
 * - Tailwind v4 friendly
 */

const ease = cubicBezier(0.22, 1, 0.36, 1);

export default function SafetyPrivacySection() {
  return (
    <section id="safety_privacy" className="relative isolate py-20 md:py-28">
      {/* soft gradient aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_20%,rgba(34,211,238,0.10),transparent_60%),radial-gradient(40%_40%_at_20%_80%,rgba(147,197,253,0.10),transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Copy + cards */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl/tight font-semibold text-zinc-100 md:text-4xl"
            >
              Safety & Privacy, <span className="text-cyan-300">By Design</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="mt-3 max-w-prose text-zinc-400"
            >
              Address the #1 adoption concern with transparent, on-device safety checks and
              location-first privacy. Clear controls, quick reporting, and third-party audits—built in.
            </motion.p>

            {/* Glass highlight cards */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <GlassItem
                icon={<ShieldCheck className="size-5" />}
                title="On-device checks"
                text="Profile photo & liveness checks run locally before anything leaves your phone."
              />
              <GlassItem
                icon={<MapPin className="size-5" />}
                title="Location privacy"
                text="We show vibes, not exact pins. Precise GPS stays on your device unless you opt in."
              />
              <GlassItem
                icon={<Ban className="size-5" />}
                title="Block & report"
                text="One-tap block/report with behind-the-scenes evidence capture to our safety team."
              />
              <GlassItem
                icon={<FileCheck2 className="size-5" />}
                title="Independent audits"
                text="Regular reviews by certified security partners with published summaries."
              />
            </ul>

            {/* Audit partner badges (placeholder tags that can be swapped with logos in /public) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-400"
            >
              <Badge>ISO 27001-aligned</Badge>
              <Badge>OWASP ASVS</Badge>
              <Badge>Pen-tested</Badge>
              <Badge>Privacy by Default</Badge>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="mt-8"
            >
              <Link
                href="/safety-playbook"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900/70 px-5 py-3 text-sm font-medium text-zinc-100 ring-1 ring-white/10 backdrop-blur-md transition hover:ring-cyan-400/40"
                aria-label="Read our Safety Playbook"
              >
                Read our Safety Playbook
                <svg aria-hidden className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* 3D lock vignette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative aspect-[4/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          >
            <Suspense fallback={<CanvasFallback />}>
              <LockScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
      {children}
    </span>
  );
}

function GlassItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm ring-1 ring-white/10 backdrop-blur-xl hover:border-cyan-400/30 hover:ring-cyan-400/20"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid size-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <span className="text-cyan-300">{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{text}</p>
        </div>
      </div>
    </motion.li>
  );
}

/* ------------------------------- 3D Scene ------------------------------- */
function LockScene() {
  return (
    <Canvas camera={{ position: [0.6, 0.9, 2.6], fov: 32 }} dpr={[1, 2]}>
      {/* Auto-fit the contents inside the canvas */}
      <Bounds fit clip observe margin={1.1}>
        <Center disableZ>
          <Float speed={0.5} rotationIntensity={0.45} floatIntensity={0.5}>
            <group rotation={[0.04, Math.PI * 0.1, 0]} scale={0.9}>
              {/* Shield backplate (glass) */}
              <RoundedBox args={[1.25, 1.6, 0.18]} radius={0.2} smoothness={10} position={[0, 0.05, -0.05]}>
                <meshPhysicalMaterial
                  color="#0b1220"
                  transmission={0.35}
                  roughness={0.2}
                  metalness={0.1}
                  thickness={0.85}
                  clearcoat={1}
                  ior={1.25}
                />
              </RoundedBox>

              {/* Trust ring */}
              <mesh position={[0, 0.1, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.95, 0.02, 24, 120]} />
                <meshStandardMaterial
                  color="#67e8f9"
                  emissive="#22d3ee"
                  emissiveIntensity={0.35}
                  roughness={0.4}
                  metalness={0.2}
                />
              </mesh>

              {/* Padlock */}
              {/* Shackle */}
              <mesh position={[0, 0.62, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <torusGeometry args={[0.38, 0.07, 32, 72, Math.PI]} />
                <meshPhysicalMaterial metalness={0.65} roughness={0.25} clearcoat={0.6} color="#b9f2ff" />
              </mesh>

              {/* Body */}
              <RoundedBox args={[0.82, 0.95, 0.36]} radius={0.08} smoothness={8} position={[0, 0.0, 0.02]}>
                <meshPhysicalMaterial
                  color="#0e1726"
                  metalness={0.22}
                  roughness={0.35}
                  transmission={0.18}
                  thickness={0.5}
                  clearcoat={1}
                />
              </RoundedBox>

              {/* Keyhole */}
              <mesh position={[0, -0.08, 0.21]}>
                <cylinderGeometry args={[0.06, 0.06, 0.06, 24]} />
                <meshStandardMaterial color="#e5e7eb" />
              </mesh>

              {/* Verified check */}
              <RoundedBox args={[0.26, 0.26, 0.08]} radius={0.06} smoothness={8} position={[0.35, 0.25, 0.22]}>
                <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={0.4} />
              </RoundedBox>
            </group>
          </Float>
        </Center>
      </Bounds>

      {/* Lighting & reflections */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={0.7} />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={6} blur={2.5} far={2.5} />
    </Canvas>
  );
}

function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center text-zinc-400">
      <span className="animate-pulse">Loading…</span>
    </div>
  );
}
