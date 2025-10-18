// app/about.tsx (or components/about.tsx)
// "use client";
"use client";

import React, {
  Suspense,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import { motion, cubicBezier } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Float,
  Environment,
  Points as DreiPoints,
  PointMaterial,
  MeshDistortMaterial,
} from "@react-three/drei";

const ease = cubicBezier(0.22, 1, 0.36, 1);

/* --------------------------- Utils / Hooks --------------------------- */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, size } as const;
}

function particlesForArea(w: number, h: number): number {
  if (!w || !h) return 1200;
  const area = (w * h) / 1000;
  return Math.max(800, Math.min(2200, Math.round(area * 0.6)));
}

/* --------------------------- 3D Scene Pieces --------------------------- */
type GalaxyParticlesProps = { count?: number; radius?: number; heightSpread?: number };

function GalaxyParticles({ count = 1600, radius = 9, heightSpread = 2.8 }: GalaxyParticlesProps) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(radius * 0.28, radius);
      const a = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const y = THREE.MathUtils.randFloatSpread(heightSpread);
      arr[i * 3 + 0] = Math.cos(a) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count, radius, heightSpread]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <DreiPoints ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial size={0.01} sizeAttenuation depthWrite={false} transparent />
    </DreiPoints>
  );
}

type GlassBlobProps = { scale?: number };

function GlassBlob({ scale = 1 }: GlassBlobProps) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.3;
    ref.current.rotation.x = Math.cos(clock.elapsedTime * 0.18) * 0.15;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={ref} castShadow position={[0, 0.12 * scale, 0]} scale={scale}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshDistortMaterial
          transparent
          opacity={0.2}
          distort={0.38}
          speed={0.9}
          roughness={0.1}
          metalness={0.85}
          color="#67e8f9"
        />
      </mesh>
    </Float>
  );
}

type MetalKnotProps = { scale?: number };

function MetalKnot({ scale = 1 }: MetalKnotProps) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0035;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.18 * scale;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.9} floatIntensity={0.9}>
      <mesh ref={ref} position={[2.1 * scale, -0.3 * scale, -0.8]} castShadow scale={scale}>
        <torusKnotGeometry args={[0.6, 0.22, 160, 20]} />
        <meshStandardMaterial metalness={1} roughness={0.2} color="#22d3ee" />
      </mesh>
    </Float>
  );
}

type SceneProps = { sectionWidth: number; sectionHeight: number };

function Scene({ sectionWidth, sectionHeight }: SceneProps) {
  const count = particlesForArea(sectionWidth, sectionHeight);
  const minDim = Math.max(320, Math.min(sectionWidth, sectionHeight));
  const scale = THREE.MathUtils.clamp(minDim / 900, 0.7, 1.1);
  const radius = 7 * scale;
  const spread = 2.2 * scale;

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 4, 5]} intensity={0.7} />
      <GalaxyParticles count={count} radius={radius} heightSpread={spread} />
      <GlassBlob scale={scale} />
      <MetalKnot scale={scale} />
      <Environment preset="city" />
    </Suspense>
  );
}

/* --------------------------- Compact About Section --------------------------- */
export default function AboutBudMeet() {
  const { ref: sectionRef, size } = useElementSize<HTMLElement>();
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-budmeet"
      id="about"
      className="
        relative z-0 w-full max-w-[100vw]
        overflow-x-clip overflow-y-visible /* <- guard against horizontal gutter */
        bg-[#04070B] text-white
      "
      style={{ contain: "layout paint" }} /* helps keep effects contained */
    >
      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 py-24">
        <div className="mb-12 text-center">
          <h2 id="about-budmeet" className="text-3xl font-bold tracking-tight">
            About <span className="text-white/80">BudMeet</span>
          </h2>
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="
            group relative mx-auto w-full max-w-3xl
            rounded-3xl p-[1px]
            before:absolute before:inset-0 before:-z-10 before:rounded-3xl
            before:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.22),rgba(168,85,247,0.16),rgba(14,165,233,0.18),rgba(34,211,238,0.22))]
            before:opacity-70 before:blur-[2px]
          "
          style={{
            background:
              "radial-gradient(180px 110px at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.16), transparent 60%)",
          }}
        >
          <div
            className="
              relative rounded-[20px] border border-white/10
              bg-white/[0.06] backdrop-blur-xl
              shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
              p-8
              overflow-hidden /* ensure inner glows don't expand layout */
            "
          >
            <span className="pointer-events-none absolute -top-7 -left-7 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
            <span className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-2xl" />
            <span
              className="
                pointer-events-none absolute inset-x-0 -top-1 h-px
                bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]
                animate-[pulse_4s_ease-in-out_infinite]
              "
            />
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease }}
              className="text-pretty text-[16px]/8 tracking-[0.01em] text-white/90"
            >
              BudMeet is a next-gen social app that helps you meet the right people nearby—fast, safe, and real.
              Built with a privacy-first philosophy and verified identities, it uses an intelligent vibe engine to
              align interests and availability, turning spontaneous plans into meaningful, in-person connections—
              while keeping you in control at every step.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* 3D background sized & CLIPPED to the section */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip">
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 8], fov: 55 }}
          className="!block w-full h-full"
        >
          <Scene sectionWidth={size.width} sectionHeight={size.height} />
        </Canvas>

        {/* These overlays are inside the clipped layer, so they can’t widen the page */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0)_0%,rgba(2,6,12,0.32)_30%,rgba(2,6,12,0.85)_100%)]" />
      </div>
    </section>
  );
}
