"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function PrimaryCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic effect: cursor attraction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-7, 7]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      x.set(distanceX);
      y.set(distanceY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, x, y]);

  return (
    <motion.div
      ref={ref}
      className="relative mt-8 inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-30 blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Rotating gradient border effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 opacity-0"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.a
        href="https://app.praviel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.8)] transition-shadow hover:shadow-[0_0_60px_rgba(139,92,246,1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={
            isHovered
              ? {
                  x: ["-100%", "100%"],
                  opacity: [0, 0.3, 0],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ripple effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </motion.a>

      {/* Floating particles */}
      <motion.div
        className="pointer-events-none absolute -right-2 -top-2 h-2 w-2 rounded-full bg-violet-400"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-2 -bottom-2 h-2 w-2 rounded-full bg-fuchsia-400"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Additional ambient particles */}
      <motion.div
        className="pointer-events-none absolute right-8 top-0 h-1 w-1 rounded-full bg-purple-300"
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}
