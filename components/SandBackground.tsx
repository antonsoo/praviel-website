"use client";

import { useEffect, useRef, useState } from "react";
import { perlin } from "@/lib/perlin";

// Expanded ancient glyphs from various scripts
const glyphs = [
  // Cuneiform
  "𒀀", "𒀁", "𒀂", "𒀃", "𒀄", "𒀅", "𒀆", "𒀇", "𒀈", "𒀉",
  "𒁀", "𒁁", "𒁂", "𒁃", "𒁄", "𒁅", "𒁆", "𒁇", "𒁈", "𒁉",
  "𒂀", "𒂁", "𒂂", "𒂃", "𒂄", "𒂅", "𒂆", "𒂇", "𒂈", "𒂉",
  // Egyptian Hieroglyphs
  "𓀀", "𓀁", "𓀂", "𓀃", "𓀄", "𓀅", "𓀆", "𓀇", "𓀈", "𓀉",
  "𓁀", "𓁁", "𓁂", "𓁃", "𓁄", "𓁅", "𓁆", "𓁇", "𓁈", "𓁉",
  "𓂀", "𓂁", "𓂂", "𓂃", "𓂄", "𓂅", "𓂆", "𓂇", "𓂈", "𓂉",
  "𓃀", "𓃁", "𓃂", "𓃃", "𓃄", "𓃅", "𓃆", "𓃇", "𓃈", "𓃉",
  // Greek
  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ",
  "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ",
  "Φ", "Χ", "Ψ", "Ω",
  // Hebrew
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י",
  "כ", "ל", "מ", "ן", "נ", "ס", "ע", "פ", "צ", "ק",
  "ר", "ש", "ת",
];

interface Glyph {
  char: string;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
}

interface SandParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  layer: number; // For parallax effect
}

interface DustParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  noiseOffset: number;
}

export default function SandBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const glyphsRef = useRef<Glyph[]>([]);
  const sandParticlesRef = useRef<SandParticle[]>([]);
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  // Initialize glyphs and sand particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Generate more dense glyphs with varied sizes
    const glyphCount = 150;
    glyphsRef.current = Array.from({ length: glyphCount }, () => ({
      char: glyphs[Math.floor(Math.random() * glyphs.length)],
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 15,
      baseOpacity: Math.random() * 0.12 + 0.03,
    }));

    // Generate sand particles with parallax layers
    const sandCount = 200;
    sandParticlesRef.current = Array.from({ length: sandCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.4,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
      layer: Math.random() > 0.5 ? 1 : 0.6, // Parallax layers
    }));

    // Generate dust particles (illuminated by torch)
    const dustCount = 80;
    dustParticlesRef.current = Array.from({ length: dustCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      opacity: 0,
      baseOpacity: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.2),
      noiseOffset: Math.random() * 1000,
    }));

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Enhanced animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw enhanced dark background gradient (deeper pyramid feeling)
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      bgGradient.addColorStop(0, "#0d0806");
      bgGradient.addColorStop(0.4, "#080503");
      bgGradient.addColorStop(0.7, "#040201");
      bgGradient.addColorStop(1, "#000000");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle vignette for depth
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );
      vignetteGradient.addColorStop(0, "rgba(0,0,0,0)");
      vignetteGradient.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw sand particles with Perlin noise
      sandParticlesRef.current.forEach((particle) => {
        // Add Perlin noise for organic movement
        const noiseX = perlin.noise(
          particle.noiseOffsetX + timeRef.current * 0.5,
          0,
          0
        );
        const noiseY = perlin.noise(
          0,
          particle.noiseOffsetY + timeRef.current * 0.5,
          0
        );

        // Update position with noise and base speed
        particle.x += particle.speedX + noiseX * 0.3 * particle.layer;
        particle.y += particle.speedY + noiseY * 0.2 * particle.layer;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate distance from torch for lighting
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 400;

        let particleOpacity = particle.opacity;
        let particleColor = "194, 178, 128"; // Base sand color

        if (distance < lightRadius) {
          const lightIntensity = 1 - distance / lightRadius;
          particleOpacity = particle.opacity + lightIntensity * 0.3;
          // Add warm glow when illuminated
          const warmth = Math.floor(lightIntensity * 40);
          particleColor = `${194 + warmth}, ${178 + warmth * 0.5}, ${128}`;
        }

        // Draw sand particle with glow
        ctx.fillStyle = `rgba(${particleColor}, ${particleOpacity * particle.layer})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.layer, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw dust particles (illuminated by torch)
      dustParticlesRef.current.forEach((particle) => {
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 350;

        // Dust only visible near torch
        if (distance < lightRadius) {
          const lightIntensity = Math.pow(1 - distance / lightRadius, 1.5);
          particle.opacity = particle.baseOpacity * lightIntensity;

          // Add Perlin noise for organic floating
          const noise = perlin.noise(
            particle.x * 0.01,
            particle.y * 0.01,
            timeRef.current + particle.noiseOffset
          );

          particle.x += particle.speedX + noise * 0.4;
          particle.y += particle.speedY;

          // Reset particle if it goes off screen or too far from torch
          if (particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10) {
            particle.x = mousePos.x + (Math.random() - 0.5) * 200;
            particle.y = mousePos.y + (Math.random() - 0.5) * 200;
          }

          // Draw dust particle with warm glow
          const glowSize = particle.size * (1 + lightIntensity * 2);
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, glowSize
          );
          gradient.addColorStop(0, `rgba(255, 220, 180, ${particle.opacity * 0.8})`);
          gradient.addColorStop(0.4, `rgba(255, 180, 120, ${particle.opacity * 0.4})`);
          gradient.addColorStop(1, "rgba(255, 140, 80, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          particle.opacity = 0;
        }
      });

      // Draw glyphs with enhanced torch lighting
      glyphsRef.current.forEach((glyph) => {
        const dx = mousePos.x - glyph.x;
        const dy = mousePos.y - glyph.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Enhanced lighting with dramatic falloff
        const lightRadius = 450;
        const innerRadius = lightRadius * 0.4;
        let opacity = glyph.baseOpacity;
        let glowOpacity = 0;

        if (distance < lightRadius) {
          const lightIntensity = Math.pow(1 - distance / lightRadius, 1.8);
          opacity = glyph.baseOpacity + lightIntensity * 0.8;

          // Dramatic glow for close glyphs
          if (distance < innerRadius) {
            glowOpacity = Math.pow(1 - distance / innerRadius, 2) * 0.6;
          }
        }

        // Draw base glyph with carved shadow effect
        ctx.font = `${glyph.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Shadow for carved effect
        if (opacity > 0.1) {
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.5})`;
          ctx.fillText(glyph.char, glyph.x + 2, glyph.y + 2);
        }

        // Main glyph
        ctx.fillStyle = `rgba(194, 178, 128, ${opacity})`;
        ctx.fillText(glyph.char, glyph.x, glyph.y);

        // Add warm torch glow for close glyphs
        if (glowOpacity > 0) {
          ctx.shadowColor = `rgba(255, 165, 0, ${glowOpacity})`;
          ctx.shadowBlur = 20;
          ctx.fillStyle = `rgba(255, 200, 100, ${glowOpacity})`;
          ctx.fillText(glyph.char, glyph.x, glyph.y);
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;

          // Extra bright core glow
          if (distance < innerRadius * 0.5) {
            const coreGlow = Math.pow(1 - distance / (innerRadius * 0.5), 2) * 0.4;
            ctx.fillStyle = `rgba(255, 240, 200, ${coreGlow})`;
            ctx.fillText(glyph.char, glyph.x, glyph.y);
          }
        }
      });

      // Add dynamic torch light beam effect
      if (mousePos.x > 0 && mousePos.y > 0) {
        const beamGradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 400
        );
        beamGradient.addColorStop(0, "rgba(255, 165, 0, 0.08)");
        beamGradient.addColorStop(0.3, "rgba(255, 140, 0, 0.04)");
        beamGradient.addColorStop(0.6, "rgba(255, 100, 0, 0.01)");
        beamGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = beamGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#000000" }}
    />
  );
}
