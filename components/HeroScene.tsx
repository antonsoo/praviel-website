"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SpinningTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref}>
        <torusGeometry args={[1.2, 0.4, 64, 128]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.5}
          emissive="#8b5cf6"
          emissiveIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={2} color="#ffffff" />
        <SpinningTorus />
      </Canvas>
    </div>
  );
}
