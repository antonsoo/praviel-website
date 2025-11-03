"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, N8AO } from "@react-three/postprocessing";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// GPU-Accelerated Ancient Script Particle System with Performance Scaling
function AncientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const velocities = useRef<Float32Array | null>(null);

  // Performance-based particle count (responsive to device capability)
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 5000;

    // Check device performance tier
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (isMobile) return 3000;  // Mobile: 3k particles
    if (isLowEnd) return 5000;   // Low-end desktop: 5k
    return 8000;                 // High-end desktop: 8k (not 20k!)
  }, []);

  const { positions, sizes, colors, velocities: vels } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // More spread out particles in 3D space
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Varied sizes for depth perception
      s[i] = Math.random() * 6 + 1;

      // Color variations - purples, violets, and blues
      const colorVariation = Math.random();
      if (colorVariation < 0.33) {
        col[i * 3] = 0.6 + Math.random() * 0.3;     // R
        col[i * 3 + 1] = 0.3 + Math.random() * 0.2; // G
        col[i * 3 + 2] = 0.95;                      // B
      } else if (colorVariation < 0.66) {
        col[i * 3] = 0.85;
        col[i * 3 + 1] = 0.4 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.95;
      } else {
        col[i * 3] = 0.75;
        col[i * 3 + 1] = 0.5;
        col[i * 3 + 2] = 1.0;
      }

      // Random velocities for organic motion
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, sizes: s, colors: col, velocities: vel };
  }, []);

  velocities.current = vels;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !velocities.current) return;
    const time = state.clock.elapsedTime;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const vels = velocities.current;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Complex orbital motion with multiple wave functions
      positions[i3] += vels[i3] + Math.sin(time * 0.3 + y * 0.1) * 0.001;
      positions[i3 + 1] += vels[i3 + 1] + Math.cos(time * 0.2 + x * 0.1) * 0.001;
      positions[i3 + 2] += vels[i3 + 2] + Math.sin(time * 0.15 + z * 0.1) * 0.0005;

      // Mouse interaction with falloff
      const distX = mousePosition.x * 3 - x;
      const distY = mousePosition.y * 3 - y;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < 5) {
        const force = (5 - dist) / 5;
        positions[i3] += distX * 0.003 * force;
        positions[i3 + 1] += distY * 0.003 * force;
      }

      // Boundary wrapping for infinite effect
      if (Math.abs(positions[i3]) > 12.5) positions[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > 12.5) positions[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] *= -1;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.03;
    particlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  // Advanced shader with HDR support for bloom
  const particleShader = {
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;

      void main() {
        vColor = color;

        // Pulsing effect based on position
        float pulse = sin(time * 2.0 + position.x * 0.5 + position.y * 0.5) * 0.5 + 0.5;
        vAlpha = pulse * 0.8 + 0.2;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float distanceScale = 400.0 / -mvPosition.z;
        gl_PointSize = size * distanceScale * (0.8 + pulse * 0.4);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;

      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float distanceToCenter = length(center);

        // Soft circular particle with smooth edges
        float alpha = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
        alpha *= vAlpha;

        // Shimmer effect
        float shimmer = sin(gl_FragCoord.x * 0.05 + gl_FragCoord.y * 0.05 + time * 2.0) * 0.2 + 0.8;

        // HDR color output for bloom effect
        vec3 finalColor = vColor * shimmer * (1.0 + alpha * 2.0);

        gl_FragColor = vec4(finalColor, alpha * 0.7);
      }
    `,
  };

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleShader.vertexShader}
        fragmentShader={particleShader.fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          time: { value: 0 },
        }}
        onBeforeCompile={(shader) => {
          shader.uniforms.time.value = performance.now() * 0.001;
        }}
      />
    </points>
  );
}

// Liquid Glass Torus with Transmission Material (Premium!)
function SpinningTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  const torusKnotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current || !torusKnotRef.current) return;
    const time = state.clock.elapsedTime;

    // Counter-rotating for hypnotic effect
    torusRef.current.rotation.y = time * 0.25;
    torusRef.current.rotation.x = Math.sin(time * 0.3) * 0.3;
    torusRef.current.rotation.z = Math.cos(time * 0.2) * 0.2;

    torusKnotRef.current.rotation.y = -time * 0.35;
    torusKnotRef.current.rotation.x = time * 0.2;

    // Breathing effect
    const scale = 1 + Math.sin(time * 1.5) * 0.08;
    torusRef.current.scale.set(scale, scale, scale);

    const knotScale = 0.5 + Math.sin(time * 2 + Math.PI) * 0.05;
    torusKnotRef.current.scale.set(knotScale, knotScale, knotScale);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        {/* Glass torus with transmission */}
        <mesh ref={torusRef}>
          <torusGeometry args={[1.5, 0.35, 128, 200]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={3}
            thickness={0.5}
            chromaticAberration={0.5}
            anisotropy={1}
            distortion={0.3}
            distortionScale={0.5}
            temporalDistortion={0.2}
            transmission={1}
            roughness={0.1}
            metalness={0.1}
            color="#a855f7"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Inner torus knot for complexity */}
        <mesh ref={torusKnotRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.2, 128, 32, 3, 4]} />
          <meshPhysicalMaterial
            color="#c084fc"
            metalness={0.95}
            roughness={0.05}
            emissive="#a855f7"
            emissiveIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Multi-layered Ancient Symbol Rings (3 concentric orbits!)
function AncientSymbols() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !ring1Ref.current || !ring2Ref.current || !ring3Ref.current) return;
    const time = state.clock.elapsedTime;

    // Different rotation speeds for each ring
    ring1Ref.current.rotation.y = time * 0.08;
    ring1Ref.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    ring2Ref.current.rotation.y = -time * 0.12;
    ring2Ref.current.rotation.z = Math.cos(time * 0.2) * 0.15;

    ring3Ref.current.rotation.y = time * 0.06;
    ring3Ref.current.rotation.x = -Math.sin(time * 0.25) * 0.12;

    groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
  });

  const createRing = (count: number, radius: number, refKey: React.RefObject<THREE.Group | null>, colorHue: string, emissiveIntensity: number) => (
    <group ref={refKey as React.RefObject<THREE.Group>}>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 0.3;

        return (
          <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0.6} floatIntensity={0.8}>
            <mesh position={[x, y, z]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}>
              <icosahedronGeometry args={[0.12, 1]} />
              <meshPhysicalMaterial
                color={colorHue}
                metalness={0.9}
                roughness={0.1}
                emissive={colorHue}
                emissiveIntensity={emissiveIntensity}
                transparent
                opacity={0.7}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );

  return (
    <group ref={groupRef}>
      {createRing(12, 5, ring1Ref, "#c084fc", 3)}
      {createRing(16, 7, ring2Ref, "#a855f7", 2.5)}
      {createRing(20, 9, ring3Ref, "#8b5cf6", 2)}
    </group>
  );
}

// Cinematic Multi-Source Lighting System
function DynamicLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);
  const rimLight = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (light1.current) {
      // Main key light orbital motion
      light1.current.position.x = Math.sin(time * 0.4) * 6;
      light1.current.position.z = Math.cos(time * 0.4) * 6;
      light1.current.position.y = 4 + Math.sin(time * 0.3) * 1;
      light1.current.intensity = 3 + Math.sin(time * 2) * 0.8;
    }

    if (light2.current) {
      // Fill light counter-rotation
      light2.current.position.x = Math.sin(time * 0.6 + Math.PI) * 5;
      light2.current.position.z = Math.cos(time * 0.6 + Math.PI) * 5;
      light2.current.position.y = 2 + Math.cos(time * 0.4) * 0.8;
      light2.current.intensity = 2.5 + Math.cos(time * 1.8) * 0.6;
    }

    if (light3.current) {
      // Accent light with different pattern
      light3.current.position.x = Math.cos(time * 0.35) * 4;
      light3.current.position.z = Math.sin(time * 0.35) * 4;
      light3.current.intensity = 2 + Math.sin(time * 3) * 0.5;
    }

    if (rimLight.current) {
      // Animated rim light intensity for drama
      rimLight.current.intensity = 2 + Math.sin(time * 1.5) * 0.8;
    }
  });

  return (
    <>
      {/* Base ambient for scene legibility */}
      <ambientLight intensity={0.4} color="#1a0a2e" />

      {/* Key light - purple */}
      <pointLight ref={light1} position={[5, 4, 5]} color="#a855f7" intensity={3} distance={20} decay={2} />

      {/* Fill light - violet */}
      <pointLight ref={light2} position={[-5, 2, -5]} color="#8b5cf6" intensity={2.5} distance={18} decay={2} />

      {/* Accent light - fuchsia */}
      <pointLight ref={light3} position={[0, -3, 8]} color="#c084fc" intensity={2} distance={15} decay={2} />

      {/* Top rim light for depth */}
      <spotLight
        ref={rimLight}
        position={[0, 12, 0]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#d8b4fe"
        castShadow={false}
      />

      {/* Side accents for atmosphere */}
      <pointLight position={[-8, 0, 0]} color="#6366f1" intensity={1.5} distance={12} decay={2} />
      <pointLight position={[8, 0, 0]} color="#ec4899" intensity={1.5} distance={12} decay={2} />
    </>
  );
}

// Performance-Optimized Post-Processing Effects
function Effects() {
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Reduced motion: minimal effects
  if (prefersReducedMotion) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.5}
        />
      </EffectComposer>
    );
  }

  // Mobile: lighter effects
  if (isMobile) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation
          modulationOffset={0.3}
        />
        <Vignette offset={0.3} darkness={0.4} eskil={false} />
      </EffectComposer>
    );
  }

  // Desktop: full effects
  return (
    <EffectComposer multisampling={4}>
      <N8AO
        aoRadius={0.5}
        intensity={1.5}
        distanceFalloff={1}
        color="#000000"
        quality="performance"
      />
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0015, 0.0015)}
        radialModulation
        modulationOffset={0.3}
      />
      <Vignette offset={0.3} darkness={0.4} eskil={false} />
    </EffectComposer>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-95">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 65 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        {/* HDR Environment for reflections */}
        <Environment preset="city" />

        <DynamicLights />
        <fog attach="fog" args={["#000000", 8, 25]} />

        {/* Main 3D Elements */}
        <AncientParticles />
        <SpinningTorus />
        <AncientSymbols />

        {/* Premium Post-Processing */}
        <Effects />
      </Canvas>

      {/* Layered gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
