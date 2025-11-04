"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after user scrolls past hero section (>100vh)
      // This ensures users see the hero CTA first before sticky appears
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Only show after scrolling more than 1 viewport down
      // This aligns with UX best practices: sticky CTAs should appear
      // after primary above-the-fold CTA is no longer visible
      setIsVisible(scrollPosition > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 -translate-x-1/2 z-40 md:hidden"
          style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <motion.a
            href="https://app.praviel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#D4AF37] text-black font-bold rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.6)] border-2 border-[#E8C55B]/40"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-sm sm:text-base">Start Learning Free</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
