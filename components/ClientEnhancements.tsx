"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import { useCookiePreferences } from "@/lib/cookieConsent";
import { useUserIntentGate } from "@/lib/hooks/useUserIntentGate";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { useImmersivePreference } from "@/lib/hooks/useImmersivePreference";
import { scheduleIdleTask } from "@/lib/utils/idle";

type OverlayBundle = {
  StickyCTA: ComponentType;
  MusicToggle: ComponentType;
};

type ImmersiveBundle = {
  TorchCursor: ComponentType;
  CursorGlow: ComponentType;
  VolumetricLight: ComponentType;
  AtmosphericFog: ComponentType;
  FilmGrain: ComponentType;
};

export default function ClientEnhancements() {
  const hydrated = useHydrated();
  const [scrollProgressComponent, setScrollProgressComponent] = useState<ComponentType | null>(null);
  const [overlayBundle, setOverlayBundle] = useState<OverlayBundle | null>(null);
  const [immersiveBundle, setImmersiveBundle] = useState<ImmersiveBundle | null>(null);
  const [deviceConstrained, setDeviceConstrained] = useState(true);
  const cookiePreferences = useCookiePreferences();
  const hasFunctionalConsent = cookiePreferences.functional;
  const userIntentReady = useUserIntentGate({ scrollDistance: 120 });
  const [immersivePreference] = useImmersivePreference();
  const userForcesImmersive = immersivePreference === "on";
  const userDisablesImmersive = immersivePreference === "off";

  // Check device constraints (client-only to prevent hydration mismatch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isNarrowViewport = window.innerWidth < 768;
    const nav = window.navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      hardwareConcurrency?: number;
    };
    const connection = nav.connection;
    const saveData = connection?.saveData ?? false;
    const slowConnection = ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    const lowPowerDevice = (nav.hardwareConcurrency ?? 8) <= 4;

    if (prefersReducedMotion || saveData || slowConnection) {
      setDeviceConstrained(true);
      return;
    }
    if (coarsePointer || isNarrowViewport) {
      setDeviceConstrained(true);
      return;
    }
    if (lowPowerDevice) {
      setDeviceConstrained(true);
      return;
    }
    setDeviceConstrained(false);
  }, []);

  const shouldSkipEnhancements = deviceConstrained && !userForcesImmersive;
  const skipImmersiveBundle = shouldSkipEnhancements || userDisablesImmersive;

  const canLoadOverlays = hydrated && !shouldSkipEnhancements && hasFunctionalConsent && userIntentReady;
  const canLoadImmersive = hydrated && hasFunctionalConsent && userIntentReady && !skipImmersiveBundle;

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

  useEffect(() => {
    if (!canLoadImmersive || immersiveBundle) return;

    let cancelled = false;
    const cancel = scheduleIdleTask(() => {
      void Promise.all([
        import("./TorchCursor"),
        import("./CursorGlow"),
        import("./VolumetricLight"),
        import("./AtmosphericFog"),
        import("./FilmGrain"),
      ])
        .then(([torch, glow, volumetric, fog, grain]) => {
          if (!cancelled) {
            setImmersiveBundle({
              TorchCursor: torch.default,
              CursorGlow: glow.default,
              VolumetricLight: volumetric.default,
              AtmosphericFog: fog.default,
              FilmGrain: grain.default,
            });
          }
        })
        .catch(() => {
          /* swallow - non critical */
        });
    }, { timeout: 900 });

    return () => {
      cancelled = true;
      cancel();
    };
  }, [immersiveBundle, canLoadImmersive]);

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
      {canLoadImmersive && immersiveBundle ? (
        <>
          <immersiveBundle.AtmosphericFog />
          <immersiveBundle.VolumetricLight />
          <immersiveBundle.FilmGrain />
          <immersiveBundle.CursorGlow />
          <immersiveBundle.TorchCursor />
        </>
      ) : null}
    </>
  );
}
