"use client";

import { useRef, useEffect } from "react";

interface RomanMosaicBorderProps {
  className?: string;
  height?: number;
  animate?: boolean;
}

/**
 * Roman Mosaic Border Component
 * Displays a decorative border with Roman 3D cube mosaic pattern
 * GPU-accelerated and performance-optimized
 */
export default function RomanMosaicBorder({
  className = "",
  height = 60,
  animate = true,
}: RomanMosaicBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cubeSize = 20;
    const numCubes = Math.ceil(canvas.offsetWidth / cubeSize);

    let animationFrame: number;
    let offset = 0;

    const drawMosaicCube = (x: number, y: number, brightness: number) => {
      const half = cubeSize / 2;
      const baseAlpha = 0.3 + brightness * 0.4;

      // Top face (lightest)
      ctx.fillStyle = `rgba(212, 175, 55, ${baseAlpha * 1.2})`;
      ctx.beginPath();
      ctx.moveTo(x + half, y);
      ctx.lineTo(x + cubeSize, y + half / 2);
      ctx.lineTo(x + half, y + half);
      ctx.lineTo(x, y + half / 2);
      ctx.closePath();
      ctx.fill();

      // Left face (medium)
      ctx.fillStyle = `rgba(212, 175, 55, ${baseAlpha * 0.8})`;
      ctx.beginPath();
      ctx.moveTo(x, y + half / 2);
      ctx.lineTo(x + half, y + half);
      ctx.lineTo(x + half, y + cubeSize);
      ctx.lineTo(x, y + cubeSize - half / 2);
      ctx.closePath();
      ctx.fill();

      // Right face (darkest)
      ctx.fillStyle = `rgba(212, 175, 55, ${baseAlpha * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(x + half, y + half);
      ctx.lineTo(x + cubeSize, y + half / 2);
      ctx.lineTo(x + cubeSize, y + cubeSize - half / 2);
      ctx.lineTo(x + half, y + cubeSize);
      ctx.closePath();
      ctx.fill();

      // Subtle edge highlights
      ctx.strokeStyle = `rgba(232, 197, 91, ${baseAlpha * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw mosaic cubes
      for (let i = 0; i < numCubes + 2; i++) {
        const x = (i * cubeSize - offset) % (canvas.offsetWidth + cubeSize * 2);
        const y = height / 2 - cubeSize / 2;
        const brightness = Math.sin((i + offset / cubeSize) * 0.5) * 0.5 + 0.5;
        drawMosaicCube(x, y, brightness);
      }

      if (animate) {
        offset += 0.2; // Slow animation for subtle effect
        if (offset > cubeSize) offset = 0;
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
  }, [height, animate]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
      />
    </div>
  );
}
