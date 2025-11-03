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
      {/* Multi-layer animated glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-40 blur-3xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.4,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
        }}
      />

      {/* Pulsing outer ring */}
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl border border-violet-400/20"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.5 : 0.3,
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
        className="relative z-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-10 py-5 text-lg font-bold text-white shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_70px_rgba(139,92,246,0.8)] ring-2 ring-violet-400/50 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
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
          Launch Alpha App
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

      {/* Simplified floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50"
          style={{
            left: `${(i % 2) * 50 + 25}%`,
            top: i < 2 ? "-8px" : "calc(100% + 8px)",
          }}
          animate={{
            y: i < 2 ? [-5, -20, -5] : [5, 20, 5],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
