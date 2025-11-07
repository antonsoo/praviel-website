"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { scheduleIdleTask } from "@/lib/utils/idle";

type SectionKey = "lessons" | "interactive";

const loaders: Record<SectionKey, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> = {
  lessons: () => import("@/components/LessonsDemo"),
  interactive: () => import("@/components/InteractiveDemo"),
};

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g"]);

type ExtendedNavigator = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  hardwareConcurrency?: number;
};

interface ClientSectionGateProps {
  section: SectionKey;
  fallback: ReactNode;
  rootMargin?: string;
  /** Optional idle prefetch timeout in milliseconds. Set to 0/null to disable. */
  idleTimeout?: number | null;
}

export default function ClientSectionGate({
  section,
  fallback,
  rootMargin = "160px",
  idleTimeout = null,
}: ClientSectionGateProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [Component, setComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const hasQueuedRef = useRef(false);

  useEffect(() => {
    if (Component || hasQueuedRef.current) {
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const load = loaders[section];
    let cancelled = false;
    let cancelIdle = () => {};

    const loadNow = () => {
      if (cancelled || hasQueuedRef.current) return;
      hasQueuedRef.current = true;

      load()
        .then((module) => {
          if (!cancelled) {
            setComponent(() => module.default);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== "production") {
            console.warn("[ClientSectionGate] failed to load", section, error);
          }
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadNow();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    const nav = window.navigator as ExtendedNavigator;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = nav.connection?.saveData ?? false;
    const slowConnection = SLOW_CONNECTION_TYPES.has(nav.connection?.effectiveType ?? "");
    const lowPowerDevice = (nav.hardwareConcurrency ?? 8) <= 4;

    const allowIdlePrefetch =
      typeof idleTimeout === "number" &&
      idleTimeout > 0 &&
      !prefersReducedMotion &&
      !saveData &&
      !slowConnection &&
      !lowPowerDevice;

    if (allowIdlePrefetch) {
      cancelIdle = scheduleIdleTask(loadNow, { timeout: idleTimeout });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelIdle();
    };
  }, [Component, idleTimeout, rootMargin, section]);

  if (Component) {
    return <Component />;
  }

  return <div ref={containerRef}>{fallback}</div>;
}
