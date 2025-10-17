"use client";

import React, { Suspense, useMemo } from "react";
import { motion, cubicBezier, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * HowBudMeetWorks — Aurelia Premier+ (Bullets removed, higher polish)
 * - Executive glass panels, animated spec ridge, subtle parallax
 * - Split layout with numbered rail and semantic 3D minis
 * - Tailwind v4 friendly
 */

const ease = cubicBezier(0.22, 1, 0.36, 1);

// ---- Brand tokens ----
const TOKENS = {
  fg: "text-zinc-100",
  fgMuted: "text-zinc-400",
  cardBg: "bg-zinc-900/70",
  panelBg: "bg-zinc-950/60",
  ring: "ring-1 ring-white/10",
  cyan: "#22d3ee",
  violet: "#a855f7",
  blue: "#3b82f6",
  green: "#10b981",
};

// ---------------- Parallax ----------------
function useParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [5, -5]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-5, 5]), { stiffness: 120, damping: 16 });
  const tz = useSpring(0, { stiffness: 120, damping: 16 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
    tz.set(14);
  };
  const onLeave = () => { mx.set(0); my.set(0); tz.set(0); };
  return { rx, ry, tz, onMove, onLeave };
}

// ---------------- Tiny 3D canvas ----------------
function TinyCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 3]} intensity={1.0} />
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="city" />
      <ContactShadows opacity={0.35} scale={8} blur={2.6} far={3.5} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.75} />
    </Canvas>
  );
}

// ---------------- Semantic 3D minis ----------------
function ProfileGem3D() {
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    roughness: 0.16, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.05,
    color: new THREE.Color(TOKENS.violet), transmission: 0.82, thickness: 0.7, ior: 1.3,
  }), []);
  const ring = useMemo(() => new THREE.MeshStandardMaterial({
    color: TOKENS.cyan, metalness: 0.7, roughness: 0.28,
  }), []);
  return (
    <Float speed={1.05} rotationIntensity={0.9} floatIntensity={0.95}>
      <group>
        <mesh material={glass}><dodecahedronGeometry args={[0.72, 0]} /></mesh>
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]} material={ring}>
          <torusGeometry args={[1.0, 0.03, 16, 110]} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]} material={ring}>
          <torusGeometry args={[0.9, 0.03, 16, 110]} />
        </mesh>
      </group>
    </Float>
  );
}
function LinkRings3D() {
  const a = useMemo(() => new THREE.MeshStandardMaterial({ color: TOKENS.cyan, metalness: 0.72, roughness: 0.26 }), []);
  const b = useMemo(() => new THREE.MeshStandardMaterial({ color: TOKENS.violet, metalness: 0.72, roughness: 0.28 }), []);
  return (
    <Float speed={1.02} rotationIntensity={0.9} floatIntensity={0.95}>
      <group>
        <mesh material={a} rotation={[Math.PI / 3, 0, 0]} position={[-0.25, 0, 0]}>
          <torusGeometry args={[0.7, 0.12, 36, 140]} />
        </mesh>
        <mesh material={b} rotation={[Math.PI / 3, Math.PI / 2.2, 0]} position={[0.25, 0, 0]}>
          <torusGeometry args={[0.7, 0.12, 36, 140]} />
        </mesh>
      </group>
    </Float>
  );
}
function ChatBubbles3D() {
  const mA = useMemo(() => new THREE.MeshStandardMaterial({ color: TOKENS.blue, metalness: 0.32, roughness: 0.38 }), []);
  const mB = useMemo(() => new THREE.MeshStandardMaterial({ color: "#60a5fa", metalness: 0.26, roughness: 0.42 }), []);
  return (
    <Float speed={1.0} rotationIntensity={0.85} floatIntensity={0.92}>
      <group>
        <group position={[-0.25, 0.02, 0]}>
          <RoundedBox args={[0.95, 0.55, 0.35]} radius={0.18} smoothness={6}>
            <meshStandardMaterial attach="material" {...(mA as any)} />
          </RoundedBox>
          <mesh position={[0.55, -0.3, 0]} rotation={[0, 0, -0.6]}>
            <coneGeometry args={[0.12, 0.22, 20]} />
            <meshStandardMaterial {...(mA as any)} />
          </mesh>
        </group>
        <group position={[0.45, -0.1, 0.05]} scale={[0.82, 0.82, 0.82]}>
          <RoundedBox args={[0.8, 0.45, 0.3]} radius={0.16} smoothness={6}>
            <meshStandardMaterial attach="material" {...(mB as any)} />
          </RoundedBox>
          <mesh position={[-0.45, -0.27, 0]} rotation={[0, 0, 0.6]}>
            <coneGeometry args={[0.1, 0.2, 20]} />
            <meshStandardMaterial {...(mB as any)} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
function Padlock3D() {
  const body = useMemo(() => new THREE.MeshStandardMaterial({ color: TOKENS.green, metalness: 0.5, roughness: 0.35 }), []);
  const shackle = useMemo(() => new THREE.MeshStandardMaterial({ color: "#34d399", metalness: 0.74, roughness: 0.28 }), []);
  return (
    <Float speed={1.0} rotationIntensity={0.88} floatIntensity={0.92}>
      <group>
        <RoundedBox args={[0.9, 0.9, 0.4]} radius={0.2} smoothness={6} position={[0, -0.2, 0]}>
          <meshStandardMaterial attach="material" {...(body as any)} />
        </RoundedBox>
        <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]} material={shackle}>
          <torusGeometry args={[0.5, 0.09, 18, 100]} />
        </mesh>
        <mesh position={[0, -0.2, 0.22]}>
          <cylinderGeometry args={[0.06, 0.06, 0.06, 18]} />
          <meshStandardMaterial color="#0b0f19" metalness={0.2} roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// ---------------- Data ----------------
type Step = { k: string; title: string; desc: string; Three: React.ComponentType; };
const STEPS: Step[] = [
  { k: "01", title: "Create your vibe profile", desc: "Pick interests, set your vibe (introvert / ambivert / extrovert). Our AI tunes your discovery feed.", Three: ProfileGem3D },
  { k: "02", title: "Instant matches nearby", desc: "We prioritize people around you by vibe similarity and intent. Tap to connect or pass.", Three: LinkRings3D },
  { k: "03", title: "Vibe check & chat", desc: "Start with AI prompts, shared media, and mini-games for natural conversation.", Three: ChatBubbles3D },
  { k: "04", title: "Meet IRL, safely", desc: "Safety by default: trusted contact, live check-ins, and location handoff at session end.", Three: Padlock3D },
];

// ---------------- UI atoms ----------------
function Hairline() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />;
}
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80">
      {children}
    </span>
  );
}

// ---------------- Card ----------------
function StepCard({ s, i }: { s: Step; i: number }) {
  const { rx, ry, tz, onMove, onLeave } = useParallax();

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease, delay: i * 0.04 }}
      className="relative"
      role="listitem"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, translateZ: tz, transformStyle: "preserve-3d" }}
        className="group grid items-center gap-6 rounded-3xl p-5 md:grid-cols-[168px_1fr]"
      >
        {/* Visual panel */}
        <div
          className={["rounded-3xl p-3 shadow-[0_14px_40px_rgba(0,0,0,0.28)]", TOKENS.ring, TOKENS.cardBg].join(" ")}
          style={{ transform: "translateZ(18px)" }}
        >
          <div className="h-[168px] w-[168px] overflow-hidden rounded-xl">
            <TinyCanvas>
              <s.Three />
            </TinyCanvas>
          </div>
        </div>

        {/* Content panel */}
        <article
          className={["relative rounded-3xl p-6 shadow-[0_14px_40px_rgba(0,0,0,0.28)]", TOKENS.ring, TOKENS.panelBg].join(" ")}
          style={{ transform: "translateZ(14px)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/90">
                {i + 1}
              </span>
              <span className="text-[11px] tracking-[0.18em] text-white/60">STEP {s.k}</span>
            </div>

            {/* spec ridge (animated hairline) */}
            <motion.div
              className="relative h-[2px] w-24 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.span
                className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/0 via-white/70 to-white/0"
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          <h3 className={`text-lg font-semibold tracking-tight ${TOKENS.fg}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-6 ${TOKENS.fgMuted}`}>{s.desc}</p>

          {/* focus trap for whole card */}
          <a
            href="#download"
            className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            aria-label={`Open: ${s.title}`}
          />
        </article>

        {/* Hover aura */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[36px] opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
          style={{ background: "radial-gradient(40% 40% at 30% 20%, rgba(255,255,255,.10), transparent 60%)" }}
        />
      </motion.div>
    </motion.li>
  );
}

// ---------------- Header ----------------
function SectionHeader() {
  return (
    <header className="mx-auto mb-14 max-w-4xl text-center">
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }} viewport={{ once: true }}>
        <Badge><span className="h-1.5 w-1.5 rounded-full bg-white/70" />Product Flow</Badge>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
        viewport={{ once: true }}
        className={`mt-4 text-3xl font-semibold tracking-tight md:text-5xl ${TOKENS.fg}`}
      >
        How BudMeet Works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.08 }}
        viewport={{ once: true }}
        className={`mx-auto mt-4 max-w-2xl ${TOKENS.fgMuted}`}
      >
        Four precise steps. Executive-level UX. Safety by default.
      </motion.p>

      <div className="mx-auto mt-8 w-60"><Hairline /></div>
    </header>
  );
}

// ---------------- Main ----------------
export default function HowBudMeetWorksSection() {
  return (
    <section id="working" className="relative mx-auto max-w-7xl px-4 py-24 text-white">
      <SectionHeader />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[120px_1fr]">
        {/* Index rail */}
        <div className="sticky top-24 hidden h-[560px] md:block">
          <div className="relative mx-auto h-full w-[2px] bg-white/10">
            <div className="absolute left-1/2 top-0 h-6 w-[2px] -translate-x-1/2 bg-white/40" />
            <div className="absolute left-1/2 bottom-0 h-6 w-[2px] -translate-x-1/2 bg-white/40" />
          </div>
        </div>

        {/* Steps (no bullets) */}
        <ol className="grid grid-cols-1 gap-7" role="list">
          {STEPS.map((s, i) => <StepCard key={s.k} s={s} i={i} />)}
        </ol>
      </div>
    </section>
  );
}
