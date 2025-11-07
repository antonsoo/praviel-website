import { Suspense } from "react";
import HeroPosterMobileClient from "./HeroPosterMobileClient";

const MOBILE_POSTER_ALT = "Hand-illuminated manuscripts layered with the PRAVIEL credo.";

const AVIF_SRCSET = [
  "/hero-poster-mobile-480.avif 480w",
  "/hero-poster-mobile-720.avif 720w",
  "/hero-poster-mobile.avif 960w",
].join(", ");

const SIZES = "(max-width: 768px) 94vw, 640px";

type HeroPosterMobileProps = {
  className?: string;
  priority?: boolean;
};

const PRIORITY_LANGUAGES = [
  { label: "Classical Latin", script: "LINGVA LATINA" },
  { label: "Koine Greek", script: "ΚΟΙΝΗ ΔΙΑΛΕΚΤΟΣ" },
  { label: "Classical Greek", script: "ἙΛΛΗΝΙΚΗ ΓΛΩΣΣΑ" },
  { label: "Biblical Hebrew", script: "לָשׁוֹן הַקֹּדֶשׁ", rtl: true },
];

function PosterFallback() {
  return (
    <div className="absolute inset-0 flex h-full w-full flex-col justify-between bg-[radial-gradient(circle_at_20%_20%,rgba(232,197,91,0.22),rgba(5,5,5,0.85)),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_55%),linear-gradient(180deg,rgba(2,2,2,0.92),rgba(15,15,15,0.65))] px-5 py-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60">Priority launch cohort</p>
        <ul className="mt-4 space-y-2 text-sm text-white/85">
          {PRIORITY_LANGUAGES.map(({ label, script, rtl }) => (
            <li key={label} className="flex flex-col rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.4em] text-white/45">{label}</span>
              <span className="text-base font-semibold text-white" dir={rtl ? "rtl" : "ltr"}>
                {script}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80">
        <p className="font-semibold">"Every translation is an interpretation."</p>
        <p className="mt-1 text-white/55">BIG_PICTURE_from_main_repo.md · Mission doctrine</p>
      </div>
    </div>
  );
}

// Server-rendered version for immediate LCP (priority images)
export default function HeroPosterMobile({ className = "", priority = false }: HeroPosterMobileProps) {
  const figureClasses = [
    "relative mx-auto mb-6 block w-full max-w-xl overflow-hidden rounded-[32px] border border-white/12 bg-zinc-900/40 shadow-2xl shadow-black/60 md:hidden",
    "min-h-[22rem] sm:min-h-[24rem]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // For priority images, render immediately on server for optimal LCP
  if (priority) {
    return (
      <figure className={figureClasses} data-lcp-target="hero-poster-mobile">
        <img
          src="/hero-poster-mobile-480.avif"
          srcSet={AVIF_SRCSET}
          sizes={SIZES}
          width={960}
          height={640}
          decoding="sync"
          loading="eager"
          fetchPriority="high"
          alt={MOBILE_POSTER_ALT}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" aria-hidden />
        <figcaption className="sr-only">
          "Every translation is an interpretation." PRAVIEL showcases Classical Latin, Koine Greek, Classical Greek, and
          Biblical Hebrew as the initial canonical launch set.
        </figcaption>
      </figure>
    );
  }

  // For non-priority images, use client-side lazy loading
  return (
    <Suspense fallback={
      <figure className={figureClasses}>
        <PosterFallback />
      </figure>
    }>
      <HeroPosterMobileClient className={className} />
    </Suspense>
  );
}
