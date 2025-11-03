"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { perlin } from "@/lib/perlin";

interface Ember {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  velocityX: number;
  velocityY: number;
}

export default function TorchCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [embers, setEmbers] = useState<Ember[]>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const timeRef = useRef(0);
  const emberSpawnTimer = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  // Ember particle system
  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      timeRef.current += 0.016;
      emberSpawnTimer.current += 0.016;

      // Spawn new embers (REDUCED for performance)
      if (emberSpawnTimer.current > 0.15) {
        emberSpawnTimer.current = 0;
        setEmbers((prev) => {
          const newEmbers = [...prev];

          // Spawn only 1 ember per cycle (reduced from 1-2)
          newEmbers.push({
            x: (Math.random() - 0.5) * 15,
            y: -20 + Math.random() * 10,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            life: 1,
            velocityX: (Math.random() - 0.5) * 0.5,
            velocityY: -(Math.random() * 1.5 + 1),
          });

          // Update and filter embers (simplified Perlin noise)
          return newEmbers
            .map((ember) => ({
              ...ember,
              x: ember.x + ember.velocityX + perlin.noise(ember.x * 0.1, ember.y * 0.1, timeRef.current) * 0.3,
              y: ember.y + ember.velocityY,
              life: ember.life - 0.02,
              opacity: ember.opacity * 0.97,
            }))
            .filter((ember) => ember.life > 0 && newEmbers.length < 15);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Generate Perlin noise values for organic flame movement
  const time = timeRef.current;
  const flameWave1 = perlin.noise(time * 2, 0, 0) * 3;
  const flameWave2 = perlin.noise(time * 3, 10, 0) * 2;
  const flameWave3 = perlin.noise(time * 4, 20, 0) * 1.5;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Enhanced torch handle with wood texture */}
      <div
        className="absolute"
        style={{
          width: "12px",
          height: "50px",
          background: "linear-gradient(135deg, #5d3a1a 0%, #3e2515 50%, #2d1810 100%)",
          borderRadius: "6px",
          transform: "translate(-6px, 10px)",
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5), 2px 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        {/* Wood grain details */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* Cloth wrapping at top */}
      <div
        className="absolute"
        style={{
          width: "16px",
          height: "12px",
          background: "linear-gradient(to bottom, #4a4a3a, #2a2a1a)",
          borderRadius: "2px",
          transform: "translate(-8px, 8px)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      />

      {/* Main light aura - OPTIMIZED */}
      <motion.div
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          transform: "translate(-200px, -200px)",
          pointerEvents: "none",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,140,0,0.2) 20%, rgba(255,100,0,0.1) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>

      {/* Outer flame layer - red/orange (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "70px",
          height: "90px",
          transform: `translate(${-35 + flameWave1}px, ${-70 + Math.abs(flameWave1) * 0.5}px)`,
          filter: "blur(8px)",
        }}
        animate={{
          scale: [1, 1.15, 0.95, 1.05, 1],
          opacity: [0.7, 0.85, 0.65, 0.8, 0.7],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(200,50,10,0.9) 0%, rgba(255,80,0,0.7) 30%, rgba(255,140,0,0.4) 60%, transparent 85%)",
            borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
          }}
        />
      </motion.div>

      {/* Mid flame layer - orange (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "55px",
          height: "75px",
          transform: `translate(${-27.5 + flameWave2}px, ${-67 + Math.abs(flameWave2) * 0.5}px)`,
          filter: "blur(4px)",
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          y: [0, -4, 2, -3, 0],
          opacity: [0.85, 0.95, 0.75, 0.9, 0.85],
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(255,120,0,1) 0%, rgba(255,160,0,0.85) 35%, rgba(255,200,0,0.5) 65%, transparent 85%)",
            borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
          }}
        />
      </motion.div>

      {/* Inner flame layer - yellow/orange (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "35px",
          height: "55px",
          transform: `translate(${-17.5 + flameWave3}px, ${-62 + Math.abs(flameWave3) * 0.5}px)`,
          filter: "blur(2px)",
        }}
        animate={{
          scale: [1, 1.25, 0.85, 1.15, 1],
          y: [0, -6, 3, -4, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(255,220,100,1) 0%, rgba(255,200,80,0.9) 40%, rgba(255,180,60,0.6) 70%, transparent 90%)",
            borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
          }}
        />
      </motion.div>

      {/* Core flame - bright white/yellow (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "18px",
          height: "35px",
          transform: "translate(-9px, -57px)",
        }}
        animate={{
          scale: [1, 1.3, 0.8, 1.2, 1],
          y: [0, -5, 4, -3, 0],
          opacity: [0.95, 1, 0.85, 1, 0.95],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(255,255,240,1) 0%, rgba(255,240,200,1) 30%, rgba(255,220,150,0.8) 60%, transparent 85%)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            boxShadow: "0 0 20px rgba(255,230,180,0.9), 0 0 40px rgba(255,200,100,0.6)",
          }}
        />
      </motion.div>

      {/* Heat distortion effect (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "80px",
          height: "100px",
          transform: "translate(-40px, -70px)",
          background:
            "linear-gradient(to top, transparent, rgba(255,200,150,0.05) 50%, transparent)",
          filter: "blur(20px)",
        }}
        animate={{
          scaleY: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ember particles */}
      {embers.map((ember, i) => (
        <motion.div
          key={`${i}-${ember.life}`}
          className="absolute rounded-full"
          style={{
            left: ember.x,
            top: ember.y,
            width: ember.size,
            height: ember.size,
            background: `radial-gradient(circle, rgba(255,230,150,${ember.opacity}) 0%, rgba(255,150,50,${ember.opacity * 0.8}) 50%, rgba(200,80,20,${ember.opacity * 0.3}) 100%)`,
            boxShadow: `0 0 ${ember.size * 2}px rgba(255,180,80,${ember.opacity * 0.8})`,
            opacity: ember.life,
          }}
        />
      ))}

      {/* Additional glow pulses (FIXED positioning) */}
      <motion.div
        className="absolute"
        style={{
          width: "100px",
          height: "100px",
          transform: "translate(-50px, -75px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, rgba(255,180,0,0.4) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
