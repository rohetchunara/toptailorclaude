"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function RotatingPanel({ image, direction, speed }) {
  const texture = useLoader(THREE.TextureLoader, image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const group = useRef(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * speed * direction;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.15, 3.2, 0.14]} />
        <meshStandardMaterial attach="material-0" color="#171512" roughness={0.65} metalness={0.15} />
        <meshStandardMaterial attach="material-1" color="#171512" roughness={0.65} metalness={0.15} />
        <meshStandardMaterial attach="material-2" color="#171512" roughness={0.65} metalness={0.15} />
        <meshStandardMaterial attach="material-3" color="#171512" roughness={0.65} metalness={0.15} />
        <meshStandardMaterial attach="material-4" map={texture} roughness={0.4} metalness={0.05} />
        <meshStandardMaterial attach="material-5" color="#0b0a08" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Scene({ image, direction, speed, accent }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
      <pointLight position={[-4, -1, -3]} intensity={0.5} color={accent} />
      <Suspense fallback={null}>
        <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.55}>
          <RotatingPanel image={image} direction={direction} speed={speed} />
        </Float>
        <ContactShadows position={[0, -1.7, 0]} opacity={0.45} scale={8} blur={2.4} far={3} />
      </Suspense>
    </>
  );
}

export default function RotatingShowcase({ image, direction = 1, speed = 0.4, accent = "#c9a95f" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-[var(--hairline)] sm:aspect-[4/5]">
      {!mounted && (
        <img
          src={image}
          alt="Loading tailored garment preview"
          className="h-full w-full object-cover opacity-70"
        />
      )}
      {mounted && (
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 30 }}
          className="animate-fade-in"
        >
          <Scene image={image} direction={direction} speed={speed} accent={accent} />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
    </div>
  );
}
