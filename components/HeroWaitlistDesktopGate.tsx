"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import { scheduleIdleTask } from "@/lib/utils/idle";

type WaitlistComponent = ComponentType<Record<string, unknown>>;

export default function HeroWaitlistDesktopGate() {
  const [Component, setComponent] = useState<WaitlistComponent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    if (!media.matches) {
      return;
    }

    let cancelled = false;
    const cancelIdle = scheduleIdleTask(() => {
      import("./HeroWaitlistClient")
        .then((module) => {
          if (!cancelled) {
            setComponent(() => module.default as WaitlistComponent);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== "production") {
            console.warn("[hero-waitlist] failed to load desktop panel", error);
          }
        });
    }, { timeout: 2200 });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  if (!Component) {
    return null;
  }

  return <Component />;
}
