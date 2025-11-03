"use client";

import { useEffect, useRef, useState } from "react";

// Diverse ancient civilization symbols that render reliably across all devices
// Includes Greek, Hebrew, Latin, Roman numerals, and geometric patterns
const ANCIENT_SYMBOLS = [
  // Greek alphabet
  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω",
  // Hebrew alphabet
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת",
  // Roman numerals
  "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ",
  // Geometric symbols (ancient mosaic patterns)
  "◊", "◈", "◇", "⬡", "⬢", "⬣", "◆", "◉", "⬟", "⬠", "⬢", "⬣",
  // Ancient decorative elements
  "✦", "✧", "✶", "✷", "✸", "✹", "❂", "❃", "❉", "❊", "❋",
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

  // Performance optimization: Cache static pattern canvas
  const staticPatternCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const needsStaticRedrawRef = useRef(true);

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
      needsStaticRedrawRef.current = true; // Mark static layer for redraw
      initializeParticles();
    };

    // Create static pattern canvas (drawn once, reused every frame)
    const createStaticPatternCanvas = (): HTMLCanvasElement => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = canvas.width;
      patternCanvas.height = canvas.height;
      const pctx = patternCanvas.getContext("2d", { alpha: true });

      if (pctx) {
        // Draw all static patterns once
        drawPapyrusTexture(pctx, patternCanvas.width, patternCanvas.height);
        drawEgyptianLotusPattern(pctx, patternCanvas.width, patternCanvas.height);
        drawGreekKeyPattern(pctx, patternCanvas.width, patternCanvas.height);
        drawRomanMosaicPattern(pctx, patternCanvas.width, patternCanvas.height);
      }

      return patternCanvas;
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

    const drawPapyrusTexture = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Very subtle papyrus fiber texture
      context.fillStyle = "#0a0a0a";
      context.fillRect(0, 0, width, height);

      // Add subtle vertical fibers (less frequently for performance)
      context.strokeStyle = "rgba(232, 220, 196, 0.012)";
      context.lineWidth = 1;
      for (let i = 0; i < width; i += 60) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
      }
    };

    const drawGreekKeyPattern = (context: CanvasRenderingContext2D, width: number, _height: number) => {
      // Subtle Greek key pattern at edges
      const keySize = 20;
      const pattern = context.createPattern(createGreekKeyPattern(keySize), "repeat");
      if (pattern) {
        context.fillStyle = pattern;
        context.globalAlpha = 0.025;

        // Top border only (less visual noise)
        context.fillRect(0, 0, width, keySize);

        context.globalAlpha = 1;
      }
    };

    const drawRomanMosaicPattern = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Subtle Roman mosaic 3D cube pattern in corners
      const mosaicSize = 40;
      const pattern = context.createPattern(createRomanMosaicPattern(mosaicSize), "repeat");
      if (pattern) {
        context.fillStyle = pattern;
        context.globalAlpha = 0.015;

        // Bottom corners for subtle ancient mosaic feel
        const cornerSize = 200;
        context.fillRect(0, height - cornerSize, cornerSize, cornerSize);
        context.fillRect(width - cornerSize, height - cornerSize, cornerSize, cornerSize);

        context.globalAlpha = 1;
      }
    };

    const drawEgyptianLotusPattern = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Subtle Egyptian lotus/papyrus motifs scattered
      context.globalAlpha = 0.02;
      context.fillStyle = "rgba(212, 175, 55, 0.6)";

      // Draw simplified lotus shapes at strategic points
      const drawLotus = (x: number, y: number, size: number) => {
        context.save();
        context.translate(x, y);

        // Simplified lotus petal pattern
        for (let i = 0; i < 5; i++) {
          context.rotate((Math.PI * 2) / 5);
          context.beginPath();
          context.ellipse(0, -size / 2, size / 4, size / 2, 0, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      };

      // Pre-determined positions instead of random (for consistency when cached)
      const spacing = 300;
      const positions: Array<{ x: number; y: number }> = [];

      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          // Use deterministic pattern instead of random
          if (((x / spacing) + (y / spacing)) % 3 === 0) {
            positions.push({ x, y });
          }
        }
      }

      positions.forEach(pos => drawLotus(pos.x, pos.y, 20));

      context.globalAlpha = 1;
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

    const createRomanMosaicPattern = (size: number): HTMLCanvasElement => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = size;
      patternCanvas.height = size;
      const pctx = patternCanvas.getContext("2d");
      if (!pctx) return patternCanvas;

      // Roman 3D cube mosaic pattern
      const halfSize = size / 2;

      // Top face (lighter)
      pctx.fillStyle = "rgba(212, 175, 55, 0.4)";
      pctx.beginPath();
      pctx.moveTo(halfSize, 0);
      pctx.lineTo(size, halfSize / 2);
      pctx.lineTo(halfSize, halfSize);
      pctx.lineTo(0, halfSize / 2);
      pctx.closePath();
      pctx.fill();

      // Left face (medium)
      pctx.fillStyle = "rgba(212, 175, 55, 0.25)";
      pctx.beginPath();
      pctx.moveTo(0, halfSize / 2);
      pctx.lineTo(halfSize, halfSize);
      pctx.lineTo(halfSize, size);
      pctx.lineTo(0, size * 0.75);
      pctx.closePath();
      pctx.fill();

      // Right face (darker)
      pctx.fillStyle = "rgba(212, 175, 55, 0.15)";
      pctx.beginPath();
      pctx.moveTo(halfSize, halfSize);
      pctx.lineTo(size, halfSize / 2);
      pctx.lineTo(size, size * 0.75);
      pctx.lineTo(halfSize, size);
      pctx.closePath();
      pctx.fill();

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
      // Regenerate static pattern canvas if needed (on resize or first render)
      if (needsStaticRedrawRef.current) {
        staticPatternCanvasRef.current = createStaticPatternCanvas();
        needsStaticRedrawRef.current = false;
      }

      if (prefersReducedMotion) {
        // Static render for reduced motion
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw cached static patterns (single drawImage call instead of redrawing)
        if (staticPatternCanvasRef.current) {
          ctx.drawImage(staticPatternCanvasRef.current, 0, 0);
        }

        drawParticles();
        return;
      }

      // Performance: Only clear and redraw the canvas, use cached static layer
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cached static background (massive performance improvement)
      if (staticPatternCanvasRef.current) {
        ctx.drawImage(staticPatternCanvasRef.current, 0, 0);
      }

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
