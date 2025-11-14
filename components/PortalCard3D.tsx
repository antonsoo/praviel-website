"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface PortalCard3DProps {
  children: ReactNode;
  className?: string;
}

export default function PortalCard3D({ children, className = "" }: PortalCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [shouldEnable3D, setShouldEnable3D] = useState(false);

  // Check if reduced motion is preferred or if on mobile (client-only to prevent hydration mismatch)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isTouchDevice = "ontouchstart" in window;

    // Disable on mobile/touch devices or if reduced motion preferred
    setShouldEnable3D(!isMobile && !isTouchDevice && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldEnable3D || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    if (!shouldEnable3D) return;
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    if (!shouldEnable3D) return;
    setIsHovering(true);
  };

  // If 3D is disabled, just render children without wrapper
  if (!shouldEnable3D) {
    return <>{children}</>;
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
