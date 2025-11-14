"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Egyptian Torch Cursor Effect
 * Creates a torch-like glow that follows the cursor in Egyptian-themed sections
 * GPU-accelerated with performance optimizations for all devices
 */
export default function EgyptianTorchCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Mount detection
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Check if should show (only after mount to prevent hydration mismatch)
  useEffect(() => {
    if (!hasMounted || typeof window === "undefined") return;

    const checkShouldShow = () => {
      const immersivePref = document.documentElement.dataset.immersivePref || "auto";
      const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShouldShow(!isMobile && !prefersReducedMotion && immersivePref !== "off");
    };

    checkShouldShow();

    const observer = new MutationObserver(checkShouldShow);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-immersive-pref"],
    });

    return () => observer.disconnect();
  }, [hasMounted]);

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

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-screen transition-opacity duration-500"
      style={{
        opacity: isActive ? 1 : 0,
        willChange: "transform, opacity",
        display: shouldShow ? 'block' : 'none',
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
    </div>
  );
}
