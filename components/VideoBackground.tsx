"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface VideoBackgroundProps {
  /**
   * WebM video source (primary, best compression)
   * Recommended: 720p, <30s loop, heavily compressed
   */
  webmSrc?: string;

  /**
   * MP4 video source (fallback for Safari/iOS)
   * Same specs as WebM
   */
  mp4Src?: string;

  /**
   * Static poster image for initial load and reduced-motion fallback
   * Should be optimized WebP/AVIF
   */
  posterSrc: string;

  /**
   * Overlay opacity (0-1)
   * Higher = more blur/darkness for better text readability
   */
  overlayOpacity?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Optimized video background component with 2025 best practices
 *
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Respects prefers-reduced-motion
 * - WebM + MP4 fallback for browser compatibility
 * - GPU-accelerated rendering
 * - Pause when off-screen for battery preservation
 * - Glass morphism overlay for text readability
 *
 * @see https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/
 * @see https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/
 */
export default function VideoBackground({
  webmSrc,
  mp4Src,
  posterSrc,
  overlayOpacity = 0.5,
  className = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Respect reduced motion - don't load video at all
    if (shouldReduceMotion || !videoRef.current) return;

    const video = videoRef.current;

    // Lazy load video with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport - load it
            if (!isLoaded) {
              video.load();
              setIsLoaded(true);
            }
            // Play video when in view
            video.play().catch(() => {
              // Autoplay might be blocked, that's okay
            });
            setIsPlaying(true);
          } else {
            // Video is off-screen - pause to save battery
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 } // Load when 25% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [isLoaded, shouldReduceMotion]);

  // Fallback to static image if reduced motion is preferred
  if (shouldReduceMotion) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <img
          src={posterSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Glass morphism overlay */}
        <div
          className="absolute inset-0 backdrop-blur-md bg-black/50"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-full object-cover"
        style={{
          // GPU acceleration
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: isPlaying ? "transform" : "auto",
        }}
        aria-hidden="true"
      >
        {/* WebM first (better compression, smaller file) */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback (Safari/iOS compatibility) */}
        {mp4Src && <source src={mp4Src} type="video/mp4" />}
        Your browser does not support video backgrounds.
      </video>

      {/* Glass morphism overlay for text readability */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
