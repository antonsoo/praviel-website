"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DESKTOP_MEDIA = "(min-width: 1024px)";
const ALT = "A philologist annotating a vellum manuscript beneath warm lantern light";
const CAPTION_ID = "hero-poster-desktop-description";

export default function HeroPosterDesktopGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(DESKTOP_MEDIA);
    const update = () => setVisible(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const figureClassName = "hidden lg:block w-full mb-6";

  if (!visible) {
    return (
      <figure className={`${figureClassName} rounded-[32px]`} aria-labelledby={CAPTION_ID}>
        <div
          aria-hidden
          className="h-[420px] w-full rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(232,197,91,0.35),_rgba(12,12,12,0.9))] shadow-2xl shadow-black/40"
        />
        <figcaption id={CAPTION_ID} className="sr-only">
          Illustration placeholder representing the PRAVIEL manuscript workbench.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={figureClassName} aria-labelledby={CAPTION_ID}>
      <Image
        src="/hero-poster-desktop.avif"
        alt={ALT}
        width={1400}
        height={980}
        priority
        fetchPriority="high"
        sizes="(min-width: 1536px) 34vw, (min-width: 1280px) 38vw, 44vw"
        className="w-full rounded-[32px] border border-white/5 object-cover shadow-2xl shadow-black/50"
      />
      <figcaption id={CAPTION_ID} className="sr-only">
        {ALT}
      </figcaption>
    </figure>
  );
}
