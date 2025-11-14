"use client";

import { useEffect, useRef, useState } from "react";

interface RomanTessellationProps {
  className?: string;
  height?: number;
  pattern?: "cube" | "hexagon" | "diamond";
  animate?: boolean;
}

/**
 * Roman Tessellation Component
 * Creates animated mosaic tessellation patterns inspired by Roman mosaics
 * GPU-accelerated canvas rendering with multiple pattern options
 */
export default function RomanTessellation({
  className = "",
  height = 100,
  pattern = "hexagon",
  animate = true,
}: RomanTessellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [immersivePreference, setImmersivePreference] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pref = document.documentElement.dataset.immersivePref || "auto";
    setImmersivePreference(pref);
  }, []);

  // Check for reduced motion preference (client-only to prevent hydration mismatch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const allowAnimation = animate && immersivePreference !== "off";
  const shouldAnimate = allowAnimation && !prefersReducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrame: number | null = null;
    let time = 0;

    // Roman mosaic color palette (terracotta, gold, cream, dark brown)
    const colors = [
      "rgba(205, 92, 92, 0.4)",   // Terracotta
      "rgba(212, 175, 55, 0.5)",  // Gold
      "rgba(232, 220, 196, 0.35)", // Cream/Papyrus
      "rgba(140, 109, 61, 0.45)",  // Bronze/Brown
      "rgba(166, 138, 90, 0.4)",   // Light Bronze
    ];

    const drawHexagonPattern = (offsetX: number) => {
      const hexSize = 24;
      const hexWidth = hexSize * 2;
      const hexHeight = Math.sqrt(3) * hexSize;

      for (let row = -1; row < Math.ceil(canvas.offsetHeight / hexHeight) + 1; row++) {
        for (let col = -1; col < Math.ceil(canvas.offsetWidth / hexWidth) + 1; col++) {
          const x = col * hexWidth * 0.75 + offsetX;
          const y = row * hexHeight + (col % 2) * (hexHeight / 2);

          // Animate color selection based on time and position
          const colorIndex = Math.floor(
            (Math.sin(time * 0.0005 + row * 0.3 + col * 0.2) + 1) * 2.5
          ) % colors.length;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + hexSize * Math.cos(angle);
            const py = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          // Fill with color
          ctx.fillStyle = colors[colorIndex];
          ctx.fill();

          // Subtle border
          ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Highlight for depth
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }
    };

    const drawDiamondPattern = (offsetY: number) => {
      const size = 32;

      for (let row = -1; row < Math.ceil(canvas.offsetHeight / size) + 2; row++) {
        for (let col = -1; col < Math.ceil(canvas.offsetWidth / size) + 2; col++) {
          const x = col * size;
          const y = row * size + offsetY;

          const colorIndex = Math.floor(
            (Math.sin(time * 0.0004 + row * 0.4 + col * 0.3) + 1) * 2.5
          ) % colors.length;

          ctx.beginPath();
          ctx.moveTo(x + size / 2, y);
          ctx.lineTo(x + size, y + size / 2);
          ctx.lineTo(x + size / 2, y + size);
          ctx.lineTo(x, y + size / 2);
          ctx.closePath();

          ctx.fillStyle = colors[colorIndex];
          ctx.fill();

          ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const offset = shouldAnimate ? time * 0.02 : 0;

      switch (pattern) {
        case "hexagon":
          drawHexagonPattern(offset % 48);
          break;
        case "diamond":
          drawDiamondPattern(offset % 32);
          break;
        case "cube":
          // Already implemented in RomanMosaicBorder
          break;
      }

      if (shouldAnimate) {
        time += 1;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    draw();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      draw();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [height, pattern, shouldAnimate]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
}
