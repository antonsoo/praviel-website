"use client";

import { useEffect, useState } from "react";

type Options = {
  /**
   * Optional fallback (in ms) to activate even if the user never interacts.
   * Useful for compliance banners that must eventually be shown.
   */
  fallbackDelay?: number;
  /**
   * Minimum scroll distance (in px) required before resolving intent.
   * Helps gate optional overlays until the visitor has meaningfully scrolled.
   */
  scrollDistance?: number;
};

export function useUserIntentGate(options?: Options) {
  const [hasIntent, setHasIntent] = useState(false);
  const fallbackDelay = options?.fallbackDelay;
  const scrollDistance = Math.max(0, options?.scrollDistance ?? 0);

  useEffect(() => {
    if (hasIntent || typeof window === "undefined") {
      return;
    }

    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      setHasIntent(true);
    };

    const pointerOptions: AddEventListenerOptions = { once: true, passive: true };
    const keyOptions: AddEventListenerOptions = { once: true };

    const pointerEvents: Array<[keyof WindowEventMap, AddEventListenerOptions]> = [
      ["pointerdown", pointerOptions],
      ["touchstart", pointerOptions],
    ];

    pointerEvents.forEach(([event, opts]) => window.addEventListener(event, activate, opts));
    const wheelOptions: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("wheel", activate, wheelOptions);
    window.addEventListener("keydown", activate, keyOptions);

    const scrollHandler = () => {
      if (window.scrollY >= scrollDistance) {
        activate();
      }
    };

    if (scrollDistance > 0) {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    let fallbackTimer: number | null = null;
    if (typeof fallbackDelay === "number") {
      fallbackTimer = window.setTimeout(activate, Math.max(0, fallbackDelay));
    }

    return () => {
      cancelled = true;
      pointerEvents.forEach(([event, opts]) => window.removeEventListener(event, activate, opts));
      window.removeEventListener("wheel", activate, wheelOptions);
      window.removeEventListener("keydown", activate, keyOptions);
      if (scrollDistance > 0) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [fallbackDelay, hasIntent, scrollDistance]);

  return hasIntent;
}
