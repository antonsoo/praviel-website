import { useEffect, useRef, useState } from "react";

interface IntersectionGateOptions {
  /**
   * Root margin passed to IntersectionObserver. Defaults to triggering slightly
   * before the element is visible to ensure seamless transitions.
   */
  rootMargin?: string;
  /**
   * Fallback timeout (ms) to render the gated component even if IntersectionObserver
   * never fires (e.g., tab hidden, user never scrolls). Set to 0 to disable.
   */
  idleTimeout?: number;
  /**
   * Whether the observer should disconnect after the first intersection event.
   */
  once?: boolean;
}

export function useIntersectionGate({
  rootMargin = "0px",
  idleTimeout = 1500,
  once = true,
}: IntersectionGateOptions = {}) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender && once) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const element = targetRef.current;
    if (!element) {
      return;
    }

    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      setShouldRender(true);
      if (once) {
        cancelled = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          activate();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    let timeoutId: number | null = null;
    if (idleTimeout > 0) {
      timeoutId = window.setTimeout(activate, idleTimeout);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [idleTimeout, once, rootMargin, shouldRender]);

  return { ref: targetRef, shouldRender };
}
