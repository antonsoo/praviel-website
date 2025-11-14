"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface DustMote {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  xOffset: number;
}

export default function VolumetricLight() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [dustMotes, setDustMotes] = useState<DustMote[]>([]);
  const timeRef = useRef(0);
  const beamsRef = useRef<Array<{ angle: number; distance: number; opacity: number; width: number }>>([]);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    // Use RAF to throttle state updates
    const updateMousePos = () => {
      setMousePos(mousePosRef.current);
      rafRef.current = requestAnimationFrame(updateMousePos);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateMousePos);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 0.016;
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Generate beams once on mount (client-only) - FIXED hydration issue
  // PERFORMANCE FIX: Reduced from 12 to 6 beams
  useEffect(() => {
    const beamCount = 6;
    const initialBeams = Array.from({ length: beamCount }, (_, i) => ({
      angle: (i / beamCount) * Math.PI * 2,
      distance: 600 + Math.sin(i) * 50,
      opacity: 0.02 + Math.sin(i) * 0.01,  // Reduced opacity
      width: 120 + Math.sin(i * 0.5) * 30,  // Reduced max width
    }));
    beamsRef.current = initialBeams;
  }, []);

  // Generate dust motes once on mount (client-only) - FIXED hydration issue
  // PERFORMANCE FIX: Reduced from 30 to 12 dust motes
  useEffect(() => {
    if (mousePos.x === -1000) return;

    const initialMotes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: mousePos.x + (Math.random() - 0.5) * 400,
      y: mousePos.y + (Math.random() - 0.5) * 400,
      size: Math.random() * 3 + 1,  // Reduced max size
      delay: Math.random() * 2,
      xOffset: (Math.random() - 0.5) * 30,
    }));
    setDustMotes(initialMotes);
  }, [mousePos.x, mousePos.y]);

  if (mousePos.x === -1000) return null;

  const beams = beamsRef.current;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Main volumetric cone from torch */}
      <motion.div
        className="absolute"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: "800px",
          height: "800px",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Multiple light beams for volumetric effect */}
        {beams.map((beam, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: `${beam.width}px`,
              height: `${beam.distance}px`,
              transformOrigin: "top center",
              transform: `translateX(-50%) rotate(${beam.angle}rad)`,
              background: `linear-gradient(to bottom, rgba(255,165,0,${beam.opacity * 2}) 0%, rgba(255,140,0,${beam.opacity}) 30%, transparent 100%)`,
              filter: "blur(30px)",
              mixBlendMode: "screen",
            }}
            animate={{
              opacity: [beam.opacity * 0.5, beam.opacity, beam.opacity * 0.5],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Central bright cone */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at center, rgba(255,200,100,0.15) 0%, rgba(255,150,50,0.08) 40%, transparent 70%)",
            filter: "blur(40px)",
            mixBlendMode: "screen",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Dust motes illuminated by torch */}
      {dustMotes.map((mote) => {
        const dx = mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
        const dy = mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 500;

        if (distance > lightRadius) return null;

        return (
          <motion.div
            key={mote.id}
            className="absolute rounded-full bg-amber-200/60"
            style={{
              left: mote.x,
              top: mote.y,
              width: mote.size,
              height: mote.size,
              boxShadow: `0 0 ${mote.size * 3}px rgba(255,200,100,0.8)`,
              filter: "blur(1px)",
              mixBlendMode: "screen",
            }}
            animate={{
              y: [0, -50, -100],
              x: [0, mote.xOffset],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: mote.delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
