"use client";

import type { HTMLAttributes } from "react";

import { useHydrated } from "@/lib/hooks/useHydrated";

interface HeroCtaSubcopyVisualProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

export default function HeroCtaSubcopyVisual({ text, className = "", ...rest }: HeroCtaSubcopyVisualProps) {
  const hydrated = useHydrated();
  const classes = [
    className,
    "transition-opacity duration-500",
    hydrated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      {...rest}
      aria-hidden={!hydrated}
      className={classes}
    >
      {text}
    </p>
  );
}
