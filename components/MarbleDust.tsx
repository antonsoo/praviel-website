"use client";

import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

export default function MarbleDust() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Check preferences
  const shouldShow = useMemo(() => {
    if (typeof window === "undefined") return false;

    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return !isMobile && !prefersReducedMotion;
  }, []);

  // Generate particles on mount (client-only) - FIXED hydration issue
  // Previously used Math.random() in useMemo which caused server/client mismatch
  // PERFORMANCE FIX: Reduced from 14 to 6 particles to reduce GPU load
  useEffect(() => {
    if (!shouldShow) return;

    setParticles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        size: 1.2 + Math.random() * 2,  // Reduced max size
        animationDuration: `${28 + Math.random() * 35}s`,
        animationDelay: `${Math.random() * -30}s`,
        opacity: 0.02 + Math.random() * 0.04,  // Reduced opacity
      })),
    );
  }, [shouldShow]);

  // Check immersive mode
  useEffect(() => {
    if (!shouldShow) return;

    const checkImmersiveMode = () => {
      const immersivePref = document.documentElement.dataset.immersivePref;
      setIsVisible(immersivePref !== "off");
    };

    checkImmersiveMode();

    const observer = new MutationObserver(checkImmersiveMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-immersive-pref"],
    });

    return () => observer.disconnect();
  }, [shouldShow]);

  if (!shouldShow || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -32 }}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full gpu-accelerated"
          style={{
            left: particle.left,
            top: "-5%",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "radial-gradient(circle, rgba(245, 245, 240, 0.9), rgba(147, 197, 253, 0.4) 50%, rgba(245, 245, 240, 0.15))",
            opacity: particle.opacity,
            animation: `marbleDustFloat ${particle.animationDuration} linear ${particle.animationDelay} infinite`,
            willChange: "transform",
            boxShadow: `0 0 ${particle.size * 3}px rgba(245, 245, 240, ${particle.opacity * 1.2}), 0 0 ${particle.size * 1.5}px rgba(147, 197, 253, ${particle.opacity * 0.6})`,
            filter: `blur(0.3px)`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes marbleDustFloat {
          0% {
            transform: translateY(0) translateX(0) translateZ(0);
          }
          25% {
            transform: translateY(25vh) translateX(-10px) translateZ(0);
          }
          50% {
            transform: translateY(50vh) translateX(10px) translateZ(0);
          }
          75% {
            transform: translateY(75vh) translateX(-5px) translateZ(0);
          }
          100% {
            transform: translateY(110vh) translateX(0) translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}
