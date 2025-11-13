"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface EgyptianHieroglyphsProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "scattered";
}

const HIEROGLYPHS = [
  "𓀀", "𓀁", "𓀂", "𓀃", "𓀄", "𓀅", "𓁹", "𓁺", "𓁻",
  "𓂀", "𓂁", "𓂂", "𓂃", "𓂄", "𓂅", "𓆣", "𓆤", "𓆥",
  "𓇋", "𓇌", "𓇍", "𓇎", "𓇏", "𓇐", "𓏏", "𓏐", "𓏑",
] as const;

/**
 * Egyptian Hieroglyphs Component
 * Displays animated Egyptian hieroglyphs with scroll-driven and GPU-accelerated animations
 * Fully accessible with reduced motion support
 */
export default function EgyptianHieroglyphs({
  className = "",
  variant = "horizontal",
}: EgyptianHieroglyphsProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerClasses = {
    horizontal: "flex flex-row gap-4 overflow-x-auto scrollbar-hide",
    vertical: "flex flex-col gap-4",
    scattered: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3",
  };

  return (
    <div
      className={`egyptian-hieroglyphs ${containerClasses[variant]} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {HIEROGLYPHS.map((glyph, index) => (
        <m.div
          key={`${glyph}-${index}`}
          className="egyptian-glyph-container flex items-center justify-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.3, rotateY: -180 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.6,
            delay: shouldReduceMotion ? 0 : index * 0.05,
            ease: [0.23, 1, 0.32, 1],
          }}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  scale: 1.2,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.4 },
                }
          }
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0)",
          }}
        >
          <span
            className="egyptian-glyph text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37] opacity-70 hover:opacity-100 transition-opacity duration-300"
            style={{
              textShadow: "0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)",
            }}
          >
            {glyph}
          </span>
        </m.div>
      ))}
    </div>
  );
}
