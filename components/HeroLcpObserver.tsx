"use client";

import { useEffect } from "react";

const shouldObserve = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_LCP_DEBUG === "1";

export default function HeroLcpObserver() {
  if (!shouldObserve) {
    return null;
  }

  useEffect(() => {
    if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") {
      return;
    }

    type LcpEntry = LargestContentfulPaint & { element?: Element | null };
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as LcpEntry[]) {
        const target = entry.element?.getAttribute("data-lcp-target") ?? entry.element?.id ?? entry.element?.tagName ?? "unknown";
        const size = typeof entry.size === "number" ? `${Math.round(entry.size)}px²` : "n/a";
        const when = `${Math.round(entry.startTime)}ms`;
        console.info(`[hero-lcp] candidate ${target} @ ${when} (${size})`);
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });

    const stopTracking = () => observer.disconnect();
    window.addEventListener("visibilitychange", stopTracking, { once: true });

    return () => {
      window.removeEventListener("visibilitychange", stopTracking);
      observer.disconnect();
    };
  }, []);

  return null;
}
