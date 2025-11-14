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
  const isInitializedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let isMounted = true;
    let cancelIdle = () => {};

    async function init() {
      if (!shouldEnableLenis() || !isMounted) {
        return;
      }

      // CRITICAL FIX: Ensure page is scrolled to top before Lenis initializes
      // This prevents the auto-scroll bug where Lenis picks up a non-zero scroll position during hydration
      if (!isInitializedRef.current) {
        window.scrollTo(0, 0);
        isInitializedRef.current = true;
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
        // Fix for Next.js auto-scroll issues with lazy-loaded content
        __experimental__naiveDimensions: true,
      } as ConstructorParameters<typeof LenisModule>[0] & {
        __experimental__naiveDimensions?: boolean;
      });

      lenisRef.current = lenis;

      // Reset scroll position after Lenis is initialized to prevent auto-scroll
      lenis.scrollTo(0, { immediate: true });

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    }

    const start = () => {
      void init();
    };
    // Increased timeout to ensure DOM is fully loaded before Lenis initializes
    cancelIdle = scheduleIdleTask(start, { timeout: 2000 });

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
