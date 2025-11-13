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

  // Check preferences
  const shouldShow = useMemo(() => {
    if (typeof window === "undefined") return false;

    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return !isMobile && !prefersReducedMotion;
  }, []);

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

  // Generate particles - reduced from 20 to 10 for better performance
  const particles = useMemo<Particle[]>(() => {
    if (!shouldShow) return [];

    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      size: 1.5 + Math.random() * 2,
      animationDuration: `${30 + Math.random() * 30}s`,
      animationDelay: `${Math.random() * -25}s`,
      opacity: 0.025 + Math.random() * 0.05,
    }));
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
            background: "radial-gradient(circle, rgba(245, 245, 240, 0.8), rgba(245, 245, 240, 0.2))",
            opacity: particle.opacity,
            animation: `marbleDustFloat ${particle.animationDuration} linear ${particle.animationDelay} infinite`,
            willChange: "transform",
            boxShadow: `0 0 ${particle.size * 2}px rgba(245, 245, 240, ${particle.opacity})`,
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
