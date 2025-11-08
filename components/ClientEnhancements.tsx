"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

import { useCookiePreferences } from "@/lib/cookieConsent";
import { useUserIntentGate } from "@/lib/hooks/useUserIntentGate";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { scheduleIdleTask } from "@/lib/utils/idle";

type OverlayBundle = {
  StickyCTA: ComponentType;
  MusicToggle: ComponentType;
};

export default function ClientEnhancements() {
  const hydrated = useHydrated();
  const [scrollProgressComponent, setScrollProgressComponent] = useState<ComponentType | null>(null);
  const [overlayBundle, setOverlayBundle] = useState<OverlayBundle | null>(null);
  const cookiePreferences = useCookiePreferences();
  const hasFunctionalConsent = cookiePreferences.functional;
  const userIntentReady = useUserIntentGate({ scrollDistance: 120 });

  const shouldSkipEnhancements = useMemo(() => {
    if (typeof window === "undefined") return true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const nav = window.navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      hardwareConcurrency?: number;
    };
    const connection = nav.connection;
    const saveData = connection?.saveData ?? false;
    const slowConnection = ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    const lowPowerDevice = (nav.hardwareConcurrency ?? 8) <= 4;

    return prefersReducedMotion || saveData || slowConnection || (coarsePointer && lowPowerDevice);
  }, []);

  const canLoadOverlays = hydrated && !shouldSkipEnhancements && hasFunctionalConsent && userIntentReady;

  // Lazily load the scroll progress bar after first paint.
  useEffect(() => {
    if (shouldSkipEnhancements || scrollProgressComponent) return;

    let cancelled = false;
    const cancelIdle = scheduleIdleTask(() => {
      void import("./ScrollProgress")
        .then((module) => {
          if (!cancelled) {
            setScrollProgressComponent(() => module.default);
          }
        })
        .catch(() => {
          /* swallow - non critical */
        });
    }, { timeout: 1600 });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [shouldSkipEnhancements, scrollProgressComponent]);

  // Load overlay components only after overlays are activated.
  useEffect(() => {
    if (!canLoadOverlays || overlayBundle) return;

    let cancelled = false;
    const cancel = scheduleIdleTask(() => {
      void Promise.all([
        import("./StickyCTA"),
        import("./MusicToggle"),
      ])
        .then(([sticky, music]) => {
          if (!cancelled) {
            setOverlayBundle({
              StickyCTA: sticky.default,
              MusicToggle: music.default,
            });
          }
        })
        .catch(() => {
          /* swallow - non critical */
        });
    }, { timeout: 600 });

    return () => {
      cancelled = true;
      cancel();
    };
  }, [overlayBundle, canLoadOverlays]);

  const ScrollProgress = scrollProgressComponent;
  const overlays = overlayBundle;

  if (!ScrollProgress && !canLoadOverlays) {
    return null;
  }

  return (
    <>
      {ScrollProgress ? <ScrollProgress /> : null}
      {canLoadOverlays && overlays ? (
        <>
          <overlays.StickyCTA />
          <overlays.MusicToggle />
        </>
      ) : null}
    </>
  );
}
