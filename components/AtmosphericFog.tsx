"use client";

import { motion } from "motion/react";

export default function AtmosphericFog() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {/* Multiple fog layers for depth */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${20 + i * 15}% ${30 + i * 10}%, rgba(20,15,10,0.${8 - i}) 0%, transparent 60%)`,
            filter: `blur(${60 + i * 20}px)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Horizontal fog bands */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Deep vignette for cinematic feel */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
