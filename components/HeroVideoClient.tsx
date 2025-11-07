"use client";

import { lazy, Suspense } from "react";

import type { VideoBackgroundProps } from "./VideoBackground";
import { VideoPoster } from "./VideoBackground";
import { useIntersectionGate } from "@/lib/hooks/useIntersectionGate";

const LazyVideoBackground = lazy(() => import("./VideoBackground"));

type HeroVideoClientProps = VideoBackgroundProps;

export default function HeroVideoClient(props: HeroVideoClientProps) {
  const { ref, shouldRender } = useIntersectionGate({
    rootMargin: "25% 0px",
    idleTimeout: 1800,
  });
  const renderFallbackPoster = () => (
    <VideoPoster
      posterSrc={props.posterSrc}
      mobilePosterSrc={props.mobilePosterSrc}
      posterAlt={props.posterAlt}
      posterPriority
      overlayOpacity={props.overlayOpacity}
      className={props.className}
      mobileBreakpoint={props.mobileBreakpoint}
    />
  );

  return (
    <div ref={ref} className="absolute inset-0 z-[-10]">
      <Suspense fallback={renderFallbackPoster()}>
        {shouldRender ? <LazyVideoBackground {...props} posterPriority /> : renderFallbackPoster()}
      </Suspense>
    </div>
  );
}
