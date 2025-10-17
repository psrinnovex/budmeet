"use client";

import React, { Suspense, useMemo } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  RoundedBox,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Cpu,
  HardDrive,
  WifiOff,
  Rocket,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const ease = cubicBezier(0.22, 1, 0.36, 1);

// ----------------------------- 3D Micro-scene -----------------------------
function PhoneStandScene() {
  // Material props (typed & memoized)
  const phoneMatProps = useMemo(
    () => ({
      metalness: 0.6,
      roughness: 0.25,
      clearcoat: 0.6,
      color: new THREE.Color("#0ea5e9"),
    }),
    []
  );

  const glassMatProps = useMemo(
    () => ({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.1,
      roughness: 0.15,
      metalness: 0.0,
      transmission: 0.85,
      thickness: 0.4,
    }),
    []
  );

  const baseMatProps = useMemo(
    () => ({
      color: new THREE.Color("#0b0b0c"),
      roughness: 0.35,
      metalness: 0.75,
    }),
    []
  );

  return (
    <>
      {/* Glass plinth */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.5}>
        <RoundedBox args={[3.6, 0.25, 2.2]} radius={0.15}>
          <meshPhysicalMaterial {...glassMatProps} />
        </RoundedBox>
      </Float>

      {/* Phone */}
      <Float speed={1.3} rotationIntensity={0.9} floatIntensity={0.9}>
        <group position={[0, 1.25, 0]}>
          {/* Body */}
          <RoundedBox args={[1.7, 3.4, 0.12]} radius={0.1}>
            <meshPhysicalMaterial {...phoneMatProps} />
          </RoundedBox>
          {/* Screen (subtle) */}
          <mesh position={[0, 0.02, 0.061]}>
            <planeGeometry args={[1.58, 3.2]} />
            <meshPhysicalMaterial color={"#0b1220"} roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Camera nub */}
          <RoundedBox args={[0.6, 0.12, 0.02]} radius={0.03} position={[0, 1.45, 0.07]}>
            <meshStandardMaterial color={"#1f2937"} />
          </RoundedBox>
        </group>
      </Float>

      {/* Stand */}
      <group position={[0, 0.3, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.18, 64]} />
          <meshPhysicalMaterial {...baseMatProps} />
        </mesh>
        <RoundedBox
          args={[0.12, 0.8, 0.4]}
          radius={0.06}
          position={[0, 0.3, -0.15]}
          rotation={[Math.PI / 8, 0, 0]}
        >
          <meshPhysicalMaterial {...baseMatProps} />
        </RoundedBox>
      </group>

      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        far={2}
        resolution={512}
      />
      <Environment preset="city" />
    </>
  );
}

// ----------------------------- Stat Chip -----------------------------
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 px-3 py-2">
      <Icon className="h-4 w-4 text-cyan-300/90" aria-hidden={true} />
      <div className="text-xs leading-tight">
        <div className="text-zinc-400">{label}</div>
        <div className="font-medium text-zinc-100">{value}</div>
      </div>
    </div>
  );
}

// ----------------------------- Main Section -----------------------------
export default function PlatformsPerformance() {
  return (
    <section
      id="platforms"
      className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10"
      aria-label="Platforms & Performance"
    >
      {/* subtle background glow */}
      <div
        aria-hidden={true}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_20%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(50%_40%_at_10%_80%,rgba(59,130,246,0.10),transparent_60%)]"
      />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-200/90">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden={true} />
            Platforms & Performance
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
            Get the app. Zero friction. Peak performance.
          </h2>
          <p className="max-w-prose text-zinc-400">
            Designed to install fast and run smoothly on modern iOS and Android devices.
            Compact footprint, battery-friendly animations, and resilient offline behaviors
            for flaky networks.
          </p>

          {/* Store badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Put your real badge svgs/pngs in /public */}
            <a
              href="#"
              aria-label="Download on the App Store"
              className="group inline-flex items-center"
            >
              <img
                src="/app-store.png"
                alt="Download on the App Store"
                className="h-12 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </a>
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="group inline-flex items-center"
            >
              <img
                src="/playstore.svg"
                alt="Get it on Google Play"
                className="h-12 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Compatibility / Footprint / Offline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-300/90" aria-hidden={true} />
                <span className="text-sm font-medium text-zinc-200">Compatibility</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>iOS 15+ (iPhone XR and newer)</li>
                <li>Android 9+ (API 28+)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-300/90" aria-hidden={true} />
                <span className="text-sm font-medium text-zinc-200">Performance</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Cold start optimized</li>
                <li>GPU-friendly animations</li>
                <li>Low idle CPU usage</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-cyan-300/90" aria-hidden={true} />
                <span className="text-sm font-medium text-zinc-200">Footprint</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Compact install size</li>
                <li>On-demand asset loading</li>
                <li>Adaptive image pipeline</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-cyan-300/90" aria-hidden={true} />
                <span className="text-sm font-medium text-zinc-200">Offline bits</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Read cached chats offline</li>
                <li>Retry queue for sends</li>
                <li>Graceful reconnection</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 3D Device Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative aspect-[4/4] w-full rounded-3xl border border-zinc-800/60 bg-zinc-900/40"
        >
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [2.6, 2.1, 3.2], fov: 38 }}
            className="rounded-3xl"
          >
            <Suspense
              fallback={
                <Html center>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-400">
                    Loading 3D…
                  </div>
                </Html>
              }
            >
              <PhoneStandScene />
            </Suspense>
          </Canvas>

          {/* subtle glass overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-zinc-900/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
