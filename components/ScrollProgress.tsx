"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      barRef.current.style.setProperty("--progress", String(progress));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#3b82f6] transition-transform duration-200"
      style={{ transform: "scaleX(var(--progress, 0))" }}
    />
  );
}
