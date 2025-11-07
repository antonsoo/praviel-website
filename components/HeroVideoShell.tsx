"use client";

import { useEffect, useState } from "react";

import HeroVideoClient from "@/components/HeroVideoClient";
import type { VideoBackgroundProps } from "@/components/VideoBackground";

export default function HeroVideoShell(props: VideoBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") {
      return;
    }
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!mounted || !isDesktop) {
    return null;
  }

  return <HeroVideoClient {...props} />;
}
