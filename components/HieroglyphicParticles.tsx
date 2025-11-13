"use client";

import { useEffect, useState, useMemo } from "react";

interface Glyph {
  id: number;
  symbol: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  size: number;
}

// Use simple SVG shapes instead of Unicode hieroglyphs to avoid font dependency
const SVG_GLYPHS = [
  // Egyptian eye
  <svg key="eye" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>,
  // Ankh-like cross
  <svg key="ankh" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="7" r="3"/>
    <path d="M12 10v10M8 14h8"/>
  </svg>,
  // Pyramid
  <svg key="pyramid" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>,
  // Scarab
  <svg key="scarab" viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="12" rx="8" ry="5"/>
    <path d="M4 12c0-2 2-4 4-4M20 12c0-2-2-4-4-4"/>
  </svg>,
];

export default function HieroglyphicParticles() {
  const [isVisible, setIsVisible] = useState(false);

  // Check preferences for reduced motion and mobile
  const shouldShow = useMemo(() => {
    if (typeof window === "undefined") return false;

    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Show on desktop only, respect reduced motion
    return !isMobile && !prefersReducedMotion;
  }, []);

  // Check immersive mode preference
  useEffect(() => {
    if (!shouldShow) return;

    const checkImmersiveMode = () => {
      const immersivePref = document.documentElement.dataset.immersivePref;
      setIsVisible(immersivePref !== "off");
    };

    checkImmersiveMode();

    // Watch for changes to immersive mode
    const observer = new MutationObserver(checkImmersiveMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-immersive-pref"],
    });

    return () => observer.disconnect();
  }, [shouldShow]);

  // Generate glyphs on mount - reduced from 12 to 6 for performance
  const glyphs = useMemo<Glyph[]>(() => {
    if (!shouldShow) return [];

    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      symbol: SVG_GLYPHS[i % SVG_GLYPHS.length].key as string,
      left: `${15 + Math.random() * 70}%`,
      animationDuration: `${50 + Math.random() * 40}s`,
      animationDelay: `${Math.random() * -40}s`,
      opacity: 0.03 + Math.random() * 0.05,
      size: 20 + Math.random() * 24,
    }));
  }, [shouldShow]);

  if (!shouldShow || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -33 }}
      aria-hidden="true"
    >
      {glyphs.map((glyph, index) => {
        const SvgComponent = SVG_GLYPHS[index % SVG_GLYPHS.length];
        return (
          <div
            key={glyph.id}
            className="absolute"
            style={{
              left: glyph.left,
              top: "-10%",
              width: `${glyph.size}px`,
              height: `${glyph.size}px`,
              color: "#D4AF37",
              opacity: glyph.opacity,
              animation: `hieroglyphFloat ${glyph.animationDuration} linear ${glyph.animationDelay} infinite`,
              transform: "translateZ(0)",
              filter: "blur(0.5px)",
            }}
          >
            {SvgComponent}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes hieroglyphFloat {
          0% {
            transform: translateY(0) translateZ(0) rotate(0deg);
          }
          25% {
            transform: translateY(25vh) translateZ(0) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateZ(0) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) translateZ(0) rotate(270deg);
          }
          100% {
            transform: translateY(110vh) translateZ(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
