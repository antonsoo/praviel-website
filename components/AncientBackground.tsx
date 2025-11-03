"use client";

import { useEffect, useRef, useState } from "react";

// Using standard Greek letters that render reliably across all devices
// Removed problematic Unicode hieroglyphics/cuneiform that require special fonts
const ANCIENT_SYMBOLS = [
  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", // Greek
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", // Hebrew
  "◊", "◈", "◇", "⬡", "⬢", "⬣", // Geometric symbols (ancient patterns)
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  opacity: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  // Pre-rendered canvas for performance (avoid repeated fillText calls)
  sprite?: HTMLCanvasElement;
}

export default function AncientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    // Pre-render sprites for performance (avoid expensive fillText on every frame)
    const createSprite = (symbol: string, size: number, opacity: number): HTMLCanvasElement => {
      const spriteCanvas = document.createElement("canvas");
      const spriteSize = size * 2; // Extra space for rotation
      spriteCanvas.width = spriteSize;
      spriteCanvas.height = spriteSize;
      const spriteCtx = spriteCanvas.getContext("2d");

      if (spriteCtx) {
        spriteCtx.font = `${size}px serif`;
        spriteCtx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        spriteCtx.textAlign = "center";
        spriteCtx.textBaseline = "middle";
        spriteCtx.fillText(symbol, spriteSize / 2, spriteSize / 2);
      }

      return spriteCanvas;
    };

    const initializeParticles = () => {
      // Reduced particle count for better mobile performance
      const particleCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 80000));

      particlesRef.current = Array.from({ length: particleCount }, () => {
        const symbol = ANCIENT_SYMBOLS[Math.floor(Math.random() * ANCIENT_SYMBOLS.length)];
        const size = Math.random() * 20 + 15;
        const opacity = Math.random() * 0.12 + 0.05;

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          symbol,
          opacity,
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          sprite: createSprite(symbol, size, opacity),
        };
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const drawPapyrusTexture = () => {
      // Very subtle papyrus fiber texture
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle vertical fibers (less frequently for performance)
      ctx.strokeStyle = "rgba(232, 220, 196, 0.012)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
    };

    const drawGreekKeyPattern = () => {
      // Subtle Greek key pattern at edges
      const keySize = 20;
      const pattern = ctx.createPattern(createGreekKeyPattern(keySize), "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.globalAlpha = 0.025;

        // Top border only (less visual noise)
        ctx.fillRect(0, 0, canvas.width, keySize);

        ctx.globalAlpha = 1;
      }
    };

    const createGreekKeyPattern = (size: number): HTMLCanvasElement => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = size;
      patternCanvas.height = size;
      const pctx = patternCanvas.getContext("2d");
      if (!pctx) return patternCanvas;

      pctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
      pctx.lineWidth = 1.5;

      // Simple meander pattern
      pctx.beginPath();
      pctx.moveTo(0, 0);
      pctx.lineTo(size * 0.7, 0);
      pctx.lineTo(size * 0.7, size * 0.7);
      pctx.lineTo(size, size * 0.7);
      pctx.stroke();

      return patternCanvas;
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        if (!particle.sprite) return;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        // Use pre-rendered sprite instead of fillText for performance
        const spriteSize = particle.sprite.width;
        ctx.drawImage(particle.sprite, -spriteSize / 2, -spriteSize / 2);
        ctx.restore();
      });
    };

    const animate = () => {
      if (prefersReducedMotion) {
        // Static render for reduced motion
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPapyrusTexture();
        drawGreekKeyPattern();
        drawParticles();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPapyrusTexture();
      drawGreekKeyPattern();

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
      });

      drawParticles();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "#000000" }}
        aria-hidden="true"
      />
      {/* Additional radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
