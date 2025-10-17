"use client";

import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Float,
  Environment,
  Html,
  Trail,
  Stars,
  MeshDistortMaterial,
} from "@react-three/drei";
import Image from "next/image";

/* -------------------------------------------------------------
   BudMeet — Features (image-led, minimal copy)
   - Keep the Neon Aurora 3D background exactly as-is.
   - Replace the image src paths with your IG assets if needed:
       /public/marketing/feat-instant-nearby.jpg
       /public/marketing/feat-real-vibes.jpg
       /public/marketing/feat-memories.jpg
       /public/marketing/feat-groups.jpg
       /public/marketing/feat-categories.jpg
       /public/marketing/feat-verified.jpg
---------------------------------------------------------------- */

const BRAND = {
  bg: "#0B0F14",
  green: "#16DB65",
  blue: "#3B82F6",
  white: "#FFFFFF",
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: BRAND.bg }}
    >
      {/* 3D BACKGROUND (unchanged) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 14], fov: 52 }}>
          <Suspense fallback={null}>
            <SceneAurora />
          </Suspense>
        </Canvas>
      </div>

      {/* HEADER (tight) */}
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-20 md:pt-24">
        <div className="text-center">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-tight text-white">
            BudMeet Features
          </h2>
        </div>

        {/* IMAGE FEATURES GRID */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ImageFeature
            src="/feat-instant-nearby.png"
            title="Instant matches nearby"
            caption="See who’s free around you now."
          />
          <ImageFeature
            src="/feat-groups.png"
            title="Groups for your vibes"
            caption="Coffee, walks, workouts, raves."
          />
          <ImageFeature
            src="/feat-verified.png"
            title="Only verified users"
            caption="Private by default. Safety tools built-in."
          />
        </div>
      </div>

      {/* Motion-reduced fallback */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          canvas,
          [style*="animation"],
          [class*="animate"],
          [class*="transition"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===================== ImageFeature card ===================== */

function ImageFeature({
  src,
  title,
  caption,
}: {
  src: string;
  title: string;
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="relative aspect-[4/4] w-full">
        {/* Use next/image for LCP + bandwidth wins */}
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-xs text-white/70">{caption}</div>
      </div>
    </div>
  );
}

/* ===================== 3D SCENE (unchanged) ===================== */

function SceneAurora() {
  const energy = 1.0;

  return (
    <>
      <color attach="background" args={[BRAND.bg]} />
      <Stars
        radius={80}
        depth={30}
        count={3200}
        factor={2.2}
        saturation={0}
        fade
        speed={0.6}
      />
      <ambientLight intensity={0.45} />
      <pointLight position={[8, 10, 12]} intensity={0.75} color={BRAND.blue} />
      <pointLight
        position={[-10, -8, -12]}
        intensity={0.55}
        color={BRAND.green}
      />

      <AuroraRibbon
        position={[0, 1.4, -2]}
        rotation={[0.1, 0.2, 0]}
        size={[12, 3]}
        colorA={BRAND.green}
        colorB={BRAND.blue}
        distort={0.45}
        speed={0.9 * energy}
        opacity={0.6}
      />
      <AuroraRibbon
        position={[-1, -1.2, -1.5]}
        rotation={[0.05, -0.3, 0.1]}
        size={[11, 2.6]}
        colorA={BRAND.blue}
        colorB={BRAND.green}
        distort={0.38}
        speed={0.7 * energy}
        opacity={0.5}
      />
      <AuroraRibbon
        position={[1.2, 0.3, -3]}
        rotation={[0.12, 0.28, -0.06]}
        size={[13, 2.2]}
        colorA={BRAND.green}
        colorB={BRAND.blue}
        distort={0.32}
        speed={0.6 * energy}
        opacity={0.45}
      />

      <OrbitNode color={BRAND.green} radius={4.8} speed={0.8 * energy} />
      <OrbitNode
        color={BRAND.blue}
        radius={6.0}
        speed={-0.7 * energy}
        phase={Math.PI / 3}
      />
      <OrbitNode
        color={BRAND.green}
        radius={7.2}
        speed={0.6 * energy}
        phase={Math.PI / 1.6}
      />

      <Environment preset="city" />
      <Html position={[0, -6.5, 0]} center wrapperClass="sr-only">
        Neon aurora background
      </Html>
    </>
  );
}

function AuroraRibbon({
  position,
  rotation,
  size,
  colorA,
  colorB,
  distort = 0.4,
  speed = 0.8,
  opacity = 0.6,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  colorA: string;
  colorB: string;
  distort?: number;
  speed?: number;
  opacity?: number;
}) {
  const [w, h] = size;
  return (
    <Float speed={0.5 * speed} rotationIntensity={0.25} floatIntensity={0.3}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[w, h, 64, 64]} />
        <MeshDistortMaterial
          transparent
          opacity={opacity}
          color={colorB}
          distort={distort}
          speed={speed}
          metalness={0.2}
          roughness={0.2}
          envMapIntensity={0.6}
        />
        <meshBasicMaterial
          attach="material-1"
          color={colorA}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

function OrbitNode({
  color,
  radius,
  speed,
  phase = 0,
}: {
  color: string;
  radius: number;
  speed: number;
  phase?: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.25) * (radius * 0.16) + 0.3,
      Math.sin(t) * radius
    );
  });

  return (
    <Trail
      width={0.14}
      color={new THREE.Color(color)}
      length={26}
      decay={0.8}
      attenuation={(w) => w}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={1.2}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>
    </Trail>
  );
}
