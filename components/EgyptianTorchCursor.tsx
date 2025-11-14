"use client";

import { useEffect, useRef, useState, useMemo } from "react";

/**
 * Egyptian Torch Cursor Effect
 * Creates a torch-like glow that follows the cursor in Egyptian-themed sections
 * GPU-accelerated with performance optimizations for all devices
 */
export default function EgyptianTorchCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [immersivePreference, setImmersivePreference] = useState<string | null>(null);

  // Check immersive preference from document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPreference = () => {
      const pref = document.documentElement.dataset.immersivePref;
      setImmersivePreference(pref || "auto");
    };

    checkPreference();

    const observer = new MutationObserver(checkPreference);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-immersive-pref"],
    });

    return () => observer.disconnect();
  }, []);

  // Only show on desktop with immersive mode enabled
  const shouldShow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !isMobile && !prefersReducedMotion && immersivePreference !== "off";
  }, [immersivePreference]);

  useEffect(() => {
    if (!shouldShow) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    // Smooth cursor following with easing
    const animate = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.15; // Easing factor for smooth follow
      currentY += dy * 0.15;

      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translateZ(0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-screen transition-opacity duration-500"
      style={{
        opacity: isActive ? 1 : 0,
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    >
      {/* Torch flame core */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "120px",
          height: "120px",
          background: `
            radial-gradient(circle at 50% 50%,
              rgba(232, 197, 91, 0.25) 0%,
              rgba(232, 197, 91, 0.12) 30%,
              transparent 70%)
          `,
          filter: "blur(20px)",
          animation: "torch-flicker 2.5s ease-in-out infinite",
        }}
      />

      {/* Torch hot spot */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60px",
          height: "60px",
          background: `
            radial-gradient(circle at 50% 50%,
              rgba(255, 234, 167, 0.4) 0%,
              rgba(232, 197, 91, 0.2) 40%,
              transparent 70%)
          `,
          filter: "blur(10px)",
          animation: "torch-flicker 1.8s ease-in-out infinite 0.3s",
        }}
      />

      {/* Torch spark particles */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "24px",
          height: "24px",
          background: `
            radial-gradient(circle at 50% 50%,
              rgba(255, 240, 200, 0.6) 0%,
              rgba(232, 197, 91, 0.3) 50%,
              transparent 100%)
          `,
          filter: "blur(4px)",
          animation: "torch-pulse 1.2s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes torch-flicker {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          25% {
            opacity: 0.85;
            transform: scale(1.05);
          }
          50% {
            opacity: 0.95;
            transform: scale(0.98);
          }
          75% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        @keyframes torch-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.15) translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}
