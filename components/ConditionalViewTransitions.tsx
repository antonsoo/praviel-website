"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

type ConditionalViewTransitionsProps = {
  children: ReactNode;
};

export default function ConditionalViewTransitions({ children }: ConditionalViewTransitionsProps) {
  // Initialize to false to match server-side rendering, preventing hydration mismatch
  const [supportsViewTransitions, setSupportsViewTransitions] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const doc = document as Document & { startViewTransition?: unknown };
    const supported = typeof doc.startViewTransition === "function";
    document.documentElement.dataset.viewTransitions = supported ? "supported" : "unsupported";
    setSupportsViewTransitions(supported);
  }, []);

  if (!supportsViewTransitions) {
    return <>{children}</>;
  }

  return <ViewTransitions>{children}</ViewTransitions>;
}
