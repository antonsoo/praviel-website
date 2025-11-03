"use client";

import * as m from "motion/react-m";

interface GreekKeyBorderProps {
  className?: string;
  animate?: boolean;
}

export default function GreekKeyBorder({ className = "", animate = true }: GreekKeyBorderProps) {
  return (
    <m.div
      className={`w-full h-px overflow-hidden ${className}`}
      initial={animate ? { scaleX: 0 } : undefined}
      whileInView={animate ? { scaleX: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <svg
        width="100%"
        height="20"
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        className="w-full"
        aria-hidden="true"
      >
        <pattern id="greekKey" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          {/* Greek meander/key pattern */}
          <path
            d="M0 0 L10 0 L10 15 L30 15 L30 5 L20 5 L20 10 L15 10 L15 20 L40 20"
            fill="none"
            stroke="url(#greekKeyGradient)"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </pattern>

        <defs>
          <linearGradient id="greekKeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#E8C55B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect width="1000" height="20" fill="url(#greekKey)" />
      </svg>
    </m.div>
  );
}
