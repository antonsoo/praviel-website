"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion provider with LazyMotion for bundle size optimization
 * Reduces Motion library from ~34kb to ~6kb by loading only necessary features
 *
 * @see https://motion.dev/docs/react-lazy-motion
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
