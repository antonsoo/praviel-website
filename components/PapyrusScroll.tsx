"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { type ReactNode } from "react";

interface PapyrusScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Egyptian Papyrus Scroll Component
 * Wraps content in an ancient Egyptian papyrus scroll aesthetic
 * GPU-accelerated animations with accessibility support
 */
export default function PapyrusScroll({
  children,
  className = "",
  delay = 0,
}: PapyrusScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Papyrus background with texture */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {/* Base papyrus color */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8DCC4]/5 via-[#D4C4A8]/3 to-[#E8DCC4]/5" />

        {/* Papyrus fiber texture */}
        <div className="absolute inset-0 papyrus-texture opacity-40" />

        {/* Aged paper effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(140, 109, 61, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(140, 109, 61, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 40% 80%, rgba(140, 109, 61, 0.1) 0%, transparent 40%)
            `,
          }}
        />

        {/* Top and bottom scroll edges with Egyptian gold */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />

        {/* Side scroll rods */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-r from-[#8C6D3D] to-[#A68A5A]" />
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-l from-[#8C6D3D] to-[#A68A5A]" />
      </div>

      {/* Egyptian lotus corner decorations */}
      <m.div
        className="absolute top-2 left-2 text-[#D4AF37]/40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L8 8 L4 10 L8 12 L12 18 L16 12 L20 10 L16 8 Z" opacity="0.6" />
          <circle cx="12" cy="10" r="3" opacity="0.8" />
        </svg>
      </m.div>

      <m.div
        className="absolute top-2 right-2 text-[#D4AF37]/40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L8 8 L4 10 L8 12 L12 18 L16 12 L20 10 L16 8 Z" opacity="0.6" />
          <circle cx="12" cy="10" r="3" opacity="0.8" />
        </svg>
      </m.div>

      <m.div
        className="absolute bottom-2 left-2 text-[#D4AF37]/40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22 L8 16 L4 14 L8 12 L12 6 L16 12 L20 14 L16 16 Z" opacity="0.6" />
          <circle cx="12" cy="14" r="3" opacity="0.8" />
        </svg>
      </m.div>

      <m.div
        className="absolute bottom-2 right-2 text-[#D4AF37]/40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22 L8 16 L4 14 L8 12 L12 6 L16 12 L20 14 L16 16 Z" opacity="0.6" />
          <circle cx="12" cy="14" r="3" opacity="0.8" />
        </svg>
      </m.div>

      {/* Content with proper padding to avoid overlap with decorations */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-lg ring-1 ring-[#D4AF37]/20 pointer-events-none" />
    </m.div>
  );
}
