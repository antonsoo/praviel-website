"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface MorphingTextProps {
  text: string;
  className?: string;
  delay?: number;
  charClassName?: string; // Optional className to apply to each character
}

/**
 * Optimized letter-by-letter reveal animation using Motion variants
 *
 * Performance improvements:
 * - Uses staggerChildren instead of setInterval (no re-renders during animation)
 * - Only animates GPU-accelerated properties (opacity, transform)
 * - Removed expensive blur filter (causes repaints)
 * - Proper Motion pattern with variants
 *
 * Based on Motion.dev best practices 2025:
 * - Stagger orchestration handled by Motion
 * - No manual state updates during animation
 * - Respects prefers-reduced-motion
 */
export default function MorphingText({ text, className = "", delay = 0, charClassName = "" }: MorphingTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // Variant for container - orchestrates staggered children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay / 1000, // Convert ms to seconds for Motion
        staggerChildren: shouldReduceMotion ? 0 : 0.03, // 30ms stagger per character
      },
    },
  };

  // Variant for each character - GPU-accelerated properties only
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: [0.23, 1, 0.32, 1] as const, // Custom easing curve (cubic bezier)
      },
    },
  };

  return (
    <m.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <m.span
          key={index}
          variants={charVariants}
          className={charClassName}
          style={{
            display: "inline-block",
            willChange: shouldReduceMotion ? "auto" : "transform, opacity",
            color: charClassName ? "transparent" : "inherit",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </m.span>
      ))}
    </m.span>
  );
}
