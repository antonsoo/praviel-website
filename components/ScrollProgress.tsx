"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Use spring physics for smooth, natural-feeling animations
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#3b82f6] origin-left z-50 shadow-lg shadow-[#D4AF37]/50"
      style={{ scaleX }}
    />
  );
}
