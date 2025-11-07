"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface VideoBackgroundProps {
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
  posterSrc?: string;
  /**
   * Mobile-specific poster image. Falls back to posterSrc when missing.
   */
  mobilePosterSrc?: string;
  posterAlt?: string;
  posterPriority?: boolean;

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

  /**
   * Prefer rendering a static poster instead of video on mobile to keep LCP low.
   * @default true
   */
  preferStaticOnMobile?: boolean;
}

/**
 * Optimized responsive video background component with 2025 best practices
 *
 * Features:
 * - Responsive: Serves landscape video to desktop, portrait to mobile
 * - Lazy loading with IntersectionObserver
 * - Respects prefers-reduced-motion and Save-Data
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
  mobilePosterSrc,
  posterAlt = "",
  posterPriority = true,
  overlayOpacity = 0.5,
  className = "",
  mobileBreakpoint = 768,
  preferStaticOnMobile = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileLike, setIsMobileLike] = useState(() => {
    if (typeof window === "undefined") return true;
    return detectMobileLikeViewport(window, mobileBreakpoint);
  });
  const shouldReduceMotion = useReducedMotion();
  const [connectionMeta, setConnectionMeta] = useState(() => {
    if (typeof navigator === "undefined") {
      return { saveData: true, effectiveType: "slow-2g" } as ConnectionMeta;
    }
    return readConnectionMeta(navigator);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () =>
      setIsMobileLike(detectMobileLikeViewport(window, mobileBreakpoint));
    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    const pointerQuery = window.matchMedia("(any-pointer: coarse)");
    const pointerListener = () => updateViewport();
    pointerQuery.addEventListener("change", pointerListener);

    const nav = window.navigator as NavigatorWithConnection;
    const connection = nav.connection;
    const handleConnectionChange = () => setConnectionMeta(readConnectionMeta(window.navigator));
    connection?.addEventListener?.("change", handleConnectionChange);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
      pointerQuery.removeEventListener("change", pointerListener);
      connection?.removeEventListener?.("change", handleConnectionChange);
    };
  }, [mobileBreakpoint]);

  const currentVideoSrc = isMobileLike ? mobileVideoSrc ?? desktopVideoSrc : desktopVideoSrc;

  const shouldForceStatic = useMemo(() => {
    if (!preferStaticOnMobile) return false;
    const slowConnection = ["slow-2g", "2g", "3g"].includes(
      connectionMeta.effectiveType ?? ""
    );
    return isMobileLike || connectionMeta.saveData || slowConnection;
  }, [connectionMeta, isMobileLike, preferStaticOnMobile]);

  const shouldRenderVideo =
    Boolean(currentVideoSrc) && !shouldReduceMotion && !shouldForceStatic;

  const resolvedPosterSrc = isMobileLike
    ? mobilePosterSrc ?? posterSrc
    : posterSrc;

  const shouldPrioritizePoster = Boolean(posterPriority || shouldForceStatic);

  const renderPoster = () => (
    <VideoPoster
      posterSrc={resolvedPosterSrc}
      mobilePosterSrc={mobilePosterSrc}
      posterAlt={posterAlt}
      posterPriority={shouldPrioritizePoster}
      overlayOpacity={overlayOpacity}
      className={className}
      mobileBreakpoint={mobileBreakpoint}
    />
  );

  useEffect(() => {
    if (!shouldRenderVideo || !videoRef.current || !currentVideoSrc) return;

    const video = videoRef.current;

    if (isLoaded) {
      video.load();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isLoaded) {
              video.load();
              setIsLoaded(true);
            }
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                /* ignored */
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [currentVideoSrc, isLoaded, shouldRenderVideo]);

  if (!shouldRenderVideo) {
    return renderPoster();
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        key={currentVideoSrc}
        poster={resolvedPosterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: isPlaying ? "transform" : "auto",
        }}
        aria-hidden="true"
      >
        <source src={currentVideoSrc} type="video/mp4" />
        Your browser does not support video backgrounds.
      </video>

      <div
        className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

export type VideoPosterProps = Pick<
  VideoBackgroundProps,
  | "posterSrc"
  | "mobilePosterSrc"
  | "posterAlt"
  | "posterPriority"
  | "overlayOpacity"
  | "className"
  | "mobileBreakpoint"
>;

export function VideoPoster({
  posterSrc,
  mobilePosterSrc,
  posterAlt = "",
  posterPriority = true,
  overlayOpacity = 0.5,
  className = "",
  mobileBreakpoint = 768,
}: VideoPosterProps) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {posterSrc ? (
        <picture>
          {mobilePosterSrc ? (
            <source
              srcSet={mobilePosterSrc}
              media={`(max-width: ${mobileBreakpoint}px)`}
            />
          ) : null}
          <img
            src={posterSrc}
            alt={posterAlt}
            className="h-full w-full object-cover"
            decoding="async"
            loading={posterPriority ? "eager" : "lazy"}
            fetchPriority={posterPriority ? "high" : "auto"}
            sizes="100vw"
          />
        </picture>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-[#050505] via-[#111] to-[#1f1b10]" />
      )}
      <div
        className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

const MOBILE_UA_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

type ConnectionMeta = { saveData?: boolean; effectiveType?: string };
type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    addEventListener?: (_event: string, _listener: () => void) => void;
    removeEventListener?: (_event: string, _listener: () => void) => void;
  };
  userAgentData?: { mobile?: boolean };
  maxTouchPoints?: number;
};

function detectMobileLikeViewport(win: Window, breakpoint: number) {
  const isPortrait = win.innerHeight >= win.innerWidth;
  const narrowWidth = win.innerWidth <= breakpoint;
  const coarsePointer = win.matchMedia?.("(any-pointer: coarse)").matches ?? false;
  const nav = win.navigator as NavigatorWithConnection;
  const hasTouch = (nav.maxTouchPoints ?? 0) > 0;
  const uaMobile = isMobileUserAgent(nav);
  return narrowWidth || isPortrait || coarsePointer || hasTouch || uaMobile;
}

function readConnectionMeta(nav: Navigator): ConnectionMeta {
  const enriched = nav as NavigatorWithConnection;
  const connection = enriched.connection;
  return {
    saveData: Boolean(connection?.saveData),
    effectiveType: connection?.effectiveType ?? "4g",
  };
}

function isMobileUserAgent(nav: Navigator) {
  const uaData = (nav as NavigatorWithConnection).userAgentData;
  if (typeof uaData?.mobile === "boolean") {
    return uaData.mobile;
  }
  return MOBILE_UA_REGEX.test(nav.userAgent);
}
