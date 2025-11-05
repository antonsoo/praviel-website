"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface VideoBackgroundProps {
  /**
   * Desktop/landscape video source (MP4)
   * Used when viewport width > height (landscape orientation)
   * Recommended: 1920x1080 or 1280x720, <16MB, seamless loop
   */
  desktopVideoSrc?: string;

  /**
   * Mobile/portrait video source (MP4)
   * Used when viewport height > width (portrait orientation)
   * Recommended: 1080x1920 or 720x1280, <16MB, seamless loop
   */
  mobileVideoSrc?: string;

  /**
   * Static poster image for initial load and reduced-motion fallback
   * Should be optimized WebP/AVIF or JPEG
   */
  posterSrc: string;

  /**
   * Overlay opacity (0-1)
   * Higher = more blur/darkness for better text readability
   * @default 0.5
   */
  overlayOpacity?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Breakpoint width (in pixels) to switch between mobile and desktop
   * @default 768
   */
  mobileBreakpoint?: number;
}

/**
 * Optimized responsive video background component with 2025 best practices
 *
 * Features:
 * - Responsive: Serves landscape video to desktop, portrait to mobile
 * - Lazy loading with IntersectionObserver
 * - Respects prefers-reduced-motion
 * - GPU-accelerated rendering
 * - Pause when off-screen for battery preservation
 * - Adaptive to orientation changes
 * - Optimized for large video files (5-16MB+)
 * - Glass morphism overlay for text readability
 *
 * @see https://developers.cloudflare.com/r2/ - Recommended hosting
 * @see https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/
 */
export default function VideoBackground({
  desktopVideoSrc,
  mobileVideoSrc,
  posterSrc,
  overlayOpacity = 0.5,
  className = "",
  mobileBreakpoint = 768,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect device type and orientation
  useEffect(() => {
    const checkDevice = () => {
      // Check both width and orientation for better mobile detection
      const isMobileWidth = window.innerWidth < mobileBreakpoint;
      const isPortrait = window.innerHeight > window.innerWidth;

      // Consider it mobile if either width is small OR device is in portrait
      setIsMobile(isMobileWidth || isPortrait);
    };

    // Initial check
    checkDevice();

    // Listen for resize and orientation changes
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, [mobileBreakpoint]);

  // Get the appropriate video source based on device
  const currentVideoSrc = isMobile ? mobileVideoSrc : desktopVideoSrc;

  useEffect(() => {
    // Respect reduced motion - don't load video at all
    if (shouldReduceMotion || !videoRef.current || !currentVideoSrc) return;

    const video = videoRef.current;

    // When video source changes (device switch), reload the video
    if (isLoaded) {
      video.load();
    }

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
  }, [isLoaded, shouldReduceMotion, currentVideoSrc]);

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

  // Don't render video if no source is provided
  if (!currentVideoSrc) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <img
          src={posterSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        key={currentVideoSrc} // Force re-mount when video source changes
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
        <source src={currentVideoSrc} type="video/mp4" />
        Your browser does not support video backgrounds.
      </video>

      {/* Glass morphism overlay for text readability */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
