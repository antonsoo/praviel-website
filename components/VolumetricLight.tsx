"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

export default function VolumetricLight() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current += 0.016;
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Create volumetric light beams
  const beamCount = 12;
  const beams = Array.from({ length: beamCount }, (_, i) => {
    const angle = (i / beamCount) * Math.PI * 2;
    const distance = 600 + Math.sin(timeRef.current + i) * 50;
    const opacity = 0.03 + Math.sin(timeRef.current * 2 + i) * 0.02;

    return {
      angle,
      distance,
      opacity,
      width: 120 + Math.sin(timeRef.current * 1.5 + i * 0.5) * 40,
    };
  });

  if (mousePos.x === -1000) return null;

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
      {Array.from({ length: 30 }).map((_, i) => {
        const dx = mousePos.x - window.innerWidth / 2;
        const dy = mousePos.y - window.innerHeight / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 500;

        if (distance > lightRadius) return null;

        const x = mousePos.x + (Math.random() - 0.5) * 400;
        const y = mousePos.y + (Math.random() - 0.5) * 400;
        const size = Math.random() * 4 + 1;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/60"
            style={{
              left: x,
              top: y,
              width: size,
              height: size,
              boxShadow: `0 0 ${size * 3}px rgba(255,200,100,0.8)`,
              filter: "blur(1px)",
              mixBlendMode: "screen",
            }}
            animate={{
              y: [0, -50, -100],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
