"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

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
    <div
      className={`fixed left-1/2 z-40 -translate-x-1/2 md:hidden transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
      style={{ bottom: "calc(1.25rem + var(--safe-area-bottom))" }}
      aria-hidden={!isVisible}
    >
      <a
        href="https://app.praviel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border-2 border-[#E8C55B]/40 bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#D4AF37] px-6 py-3 text-sm font-bold text-black shadow-[0_8px_30px_rgba(212,175,55,0.6)] transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.03]"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="text-sm sm:text-base">Start Learning Free</span>
      </a>
    </div>
  );
}
