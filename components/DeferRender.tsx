"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { useUserIntentGate, type UserIntentGateOptions } from "@/lib/hooks/useUserIntentGate";

interface DeferRenderProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  hiddenClassName?: string;
  visibleClassName?: string;
  rootMargin?: string;
  intentOptions?: UserIntentGateOptions;
}

function mergeClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function DeferRender({
  children,
  fallback: _fallback = null,
  className,
  hiddenClassName = "opacity-0 pointer-events-none",
  visibleClassName = "opacity-100 pointer-events-auto",
  rootMargin = "200px",
  intentOptions,
}: DeferRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intentReady = intentOptions ? useUserIntentGate(intentOptions) : true;

  // CRITICAL: Always render children (not fallback) to avoid hydration mismatch and layout shifts
  // Control visibility via opacity only, never swap DOM content after initial render
  const shouldReveal = !isMounted || (intentReady && isVisible);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isVisible || !intentReady) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isMounted, intentReady, isVisible, rootMargin]);

  const classNames = useMemo(
    () => mergeClassNames("transition-all duration-700", className, shouldReveal ? visibleClassName : hiddenClassName),
    [className, hiddenClassName, visibleClassName, shouldReveal],
  );

  return (
    <div ref={containerRef} className={classNames} style={{ willChange: shouldReveal ? "auto" : "opacity" }} aria-busy={!shouldReveal}>
      {children}
    </div>
  );
}
