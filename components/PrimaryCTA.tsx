"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function PrimaryCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative mt-10 inline-block"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.3, type: "spring", stiffness: 100 }}
    >
      {/* Multi-layer animated glow effect - Egyptian gold theme */}
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#C5A572] opacity-50 blur-3xl"
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
        }}
      />

      {/* Pulsing outer ring - ancient gold */}
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl border-2 border-[#D4AF37]/30"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.6 : 0.4,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />

      <motion.a
        href="https://app.praviel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center gap-2 sm:gap-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#D4AF37] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-bold text-black shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all hover:shadow-[0_0_90px_rgba(212,175,55,0.9)] ring-2 ring-[#E8C55B]/60 cursor-pointer backdrop-blur-sm min-h-[48px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span
          animate={isHovered ? { x: [-1, 1, -1] } : {}}
          transition={{
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          Start Learning Free
        </motion.span>
        <motion.svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            d="M13 7l5 5m0 0l-5 5m5-5H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Shimmer effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={
            isHovered
              ? {
                  x: ["-100%", "100%"],
                  opacity: [0, 0.2, 0],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.a>

      {/* Floating particles - golden dust effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-[#E8C55B] shadow-lg shadow-[#E8C55B]/60"
          style={{
            left: `${(i % 3) * 33 + 16}%`,
            top: i < 3 ? "-12px" : "calc(100% + 12px)",
          }}
          animate={{
            y: i < 3 ? [-8, -28, -8] : [8, 28, 8],
            opacity: [0.4, 1, 0.4],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
}
