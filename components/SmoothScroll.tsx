"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

import { scheduleIdleTask } from "@/lib/utils/idle";

function shouldEnableLenis() {
  if (typeof window === "undefined") return false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrowViewport = window.innerWidth < 768;
  return !prefersReducedMotion && !isCoarsePointer && !isNarrowViewport;
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let frame = 0;
    let isMounted = true;
    let cancelIdle = () => {};

    async function init() {
      if (!shouldEnableLenis() || !isMounted) {
        return;
      }

      const { default: LenisModule } = (await import("lenis")) as {
        default: typeof Lenis;
      };
      if (!isMounted) return;

      const lenis = new LenisModule({
        duration: 0.5,  // Reduced from 1.2s for faster, more responsive scrolling
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.5,  // Increased for faster wheel scroll
        touchMultiplier: 1.5,  // Increased for faster touch scroll
        infinite: false,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    }

    const start = () => {
      void init();
    };
    cancelIdle = scheduleIdleTask(start, { timeout: 1500 });

    return () => {
      isMounted = false;
      cancelIdle();
      if (frame) cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
