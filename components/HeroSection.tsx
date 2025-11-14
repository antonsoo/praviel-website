import PrimaryCTA from "@/components/PrimaryCTA";
import GreekKeyBorder from "@/components/GreekKeyBorder";
import HeroPosterMobile from "@/components/HeroPosterMobile";
import HeroPosterDesktopGate from "@/components/HeroPosterDesktopGate";
import HeroCrest from "@/components/HeroCrest";
import HeroCtaSubcopyVisual from "@/components/HeroCtaSubcopyVisual";
import HeroLcpObserver from "@/components/HeroLcpObserver";
import DecorativeColumns from "@/components/DecorativeColumns";
import HeroCivilizationCarousel from "@/components/HeroCivilizationCarousel";
import PapyrusScroll from "@/components/PapyrusScroll";
import RomanMosaicBorder from "@/components/RomanMosaicBorder";
import ImmersiveModeToggle from "@/components/ImmersiveModeToggle";
import ComfortControls from "@/components/ComfortControls";
import GlyphTicker from "@/components/GlyphTicker";
import DeferRender from "@/components/DeferRender";
import { heroCopy } from "@/lib/canonicalCopy";
import { LANGUAGE_COUNT } from "@/lib/languageStats";

const HERO_TITLE_ID = "hero-title";
const HERO_SUBTITLE_ID = "hero-subtitle";
const HERO_VISUAL_DESCRIPTION_ID = "hero-visual-description";
const HERO_CTA_SUBCOPY_ID = "hero-cta-subcopy";

const carouselFallback = (
  <div
    aria-hidden="true"
    className="rounded-[28px] border border-white/10 bg-white/5/50 p-6 min-h-[220px] animate-pulse"
  />
);

const tickerFallback = (
  <div
    aria-hidden="true"
    className="h-10 w-full rounded-full border border-white/10 bg-white/5 animate-pulse"
  />
);

const controlFallback = (
  <div
    aria-hidden="true"
    className="h-[144px] rounded-[24px] border border-white/10 bg-white/5 animate-pulse"
  />
);

const posterFallback = (
  <div
    aria-hidden="true"
    className="relative mx-auto mb-6 w-full max-w-xl overflow-hidden rounded-[32px] border border-white/12 bg-white/5 min-h-[22rem] animate-pulse"
  />
);

const papyrusFallback = (
  <div className="pt-4 hidden w-full flex-col items-center gap-4 sm:flex lg:items-start lg:text-left">
    <div className="h-[180px] w-full rounded-[28px] border border-white/10 bg-white/5 animate-pulse" aria-hidden="true" />
  </div>
);

const crestFallback = (
  <div className="hidden h-[160px] w-full rounded-[32px] border border-white/10 bg-white/5 animate-pulse sm:block" aria-hidden="true" />
);

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative isolate flex flex-col items-center overflow-hidden px-4 sm:px-6 py-16 sm:py-24 md:py-32 min-h-[100svh] sm:min-h-[88svh] lg:min-h-screen"
      aria-labelledby={HERO_TITLE_ID}
      aria-describedby={`${HERO_SUBTITLE_ID} ${HERO_VISUAL_DESCRIPTION_ID}`}
      role="region"
    >
      <HeroLcpObserver />
      {/* Simplified background for mobile LCP performance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" aria-hidden />
        {/* Desktop-only decorative gradients (not rendered on mobile) */}
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_20%_20%,rgba(232,197,91,0.08),transparent_50%)] sm:block" aria-hidden />
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.08),transparent_60%)] sm:block" aria-hidden />
        <div className="absolute inset-0 hidden bg-gradient-to-br from-black/90 via-zinc-900/85 to-black/80 sm:block" aria-hidden />
      </div>
      <DecorativeColumns />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <p id={HERO_VISUAL_DESCRIPTION_ID} className="sr-only">
          Animated aurora gradients pulse softly behind the headline to mirror torchlight without impacting readability.
        </p>

        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <GreekKeyBorder className="hidden w-full max-w-md sm:block lg:mx-0" />
          <div className="flex w-full flex-col items-center gap-3 lg:items-start">
            <div className="hidden items-center gap-2 rounded-full border border-[#E8C55B]/20 bg-[#E8C55B]/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.45em] text-[#E8C55B] shadow-lg shadow-[#E8C55B]/10 sm:inline-flex">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {heroCopy.eyebrow}
            </div>
          </div>

          <h1
            id={HERO_TITLE_ID}
            className="text-4xl sm:text-6xl md:text-[4.75rem] font-bold leading-[1.05] tracking-tight text-white text-balance max-w-[18ch] sm:max-w-[16ch] lg:mx-0"
            data-lcp-target="hero-headline"
          >
            <span className="block">Read the originals.</span>
            <span className="mt-2 block text-3xl sm:text-[3.5rem] md:text-[4rem] text-white sm:bg-gradient-to-r sm:from-[#E8C55B] sm:via-[#D4AF37] sm:to-[#3b82f6] sm:bg-clip-text sm:text-transparent leading-tight">
              Not the translations.
            </span>
          </h1>

          <div id={HERO_SUBTITLE_ID} className="space-y-2">
            <p className="text-base leading-snug text-zinc-300/95 text-balance px-1.5 sm:hidden">
              {heroCopy.subtitleShort ?? heroCopy.subtitle}
            </p>
            <p className="hidden sm:block text-sm leading-snug text-zinc-300/95 text-balance px-1.5 lg:px-0">
              {heroCopy.subtitleShort ?? heroCopy.subtitle}
            </p>
            <p className="hidden sm:block text-lg md:text-2xl text-zinc-300 leading-relaxed text-balance px-4 lg:px-0">
              {heroCopy.subtitle}
            </p>
          </div>

            <div className="w-full px-4 sm:hidden" data-lcp-priority="cta">
              <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-3" data-lcp-target="hero-mobile-cta">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-[#E8C55B]/70 text-center">
                  Investor preview
                </p>
                <PrimaryCTA
                  variant="mobile"
                  ariaDescribedBy={HERO_CTA_SUBCOPY_ID}
                  className="w-full"
                  lcpTarget="hero-mobile-cta-button"
                />
                <p className="text-sm text-zinc-300 text-center text-balance">
                  {LANGUAGE_COUNT} languages, manuscript scans, scholia, and citation trails you can audit.
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.45em] text-zinc-300 text-center">
                  Playwright • Lighthouse • Plausible verified
                </p>
              </div>
            </div>

          <p className="sr-only" id={HERO_CTA_SUBCOPY_ID}>
            {heroCopy.ctaSubcopy}
          </p>

          <DeferRender
            fallback={papyrusFallback}
            intentOptions={{ scrollDistance: 0, fallbackDelay: 100 }}
            rootMargin="200px"
          >
            <div className="pt-4 hidden w-full flex-col items-center gap-4 sm:flex lg:items-start lg:text-left">
              <PrimaryCTA ariaDescribedBy={HERO_CTA_SUBCOPY_ID} lcpTarget="hero-desktop-cta" />
              <PapyrusScroll className="w-full max-w-xl lg:max-w-lg">
                <HeroCtaSubcopyVisual
                  text={heroCopy.ctaSubcopy}
                  className="text-xs sm:text-sm text-zinc-700"
                />
              </PapyrusScroll>
            </div>
          </DeferRender>
        </div>

        <div className="flex w-full flex-col gap-6">
          <DeferRender
            fallback={posterFallback}
            intentOptions={{ scrollDistance: 0, fallbackDelay: 50 }}
            rootMargin="100px"
          >
            <HeroPosterMobile />
          </DeferRender>
          <DeferRender
            fallback={carouselFallback}
            intentOptions={{ scrollDistance: 0, fallbackDelay: 200 }}
            rootMargin="150px"
          >
            <HeroCivilizationCarousel />
          </DeferRender>
          <DeferRender
            fallback={posterFallback}
            intentOptions={{ scrollDistance: 0, fallbackDelay: 300 }}
            rootMargin="200px"
          >
            <HeroPosterDesktopGate />
          </DeferRender>
          <DeferRender
            fallback={crestFallback}
            intentOptions={{ scrollDistance: 0, fallbackDelay: 400 }}
            rootMargin="250px"
          >
            <HeroCrest className="hidden sm:block" />
          </DeferRender>
        </div>
      </div>

      <div className="mx-auto mt-8 hidden w-full max-w-5xl flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 sm:flex">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
          {LANGUAGE_COUNT} Ancient Languages
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
          Research-Grade Accuracy
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
          AI-Powered
        </span>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-5xl gap-4 lg:grid-cols-2">
        <DeferRender
          fallback={controlFallback}
          intentOptions={{ scrollDistance: 0, fallbackDelay: 500 }}
          rootMargin="100px"
        >
          <ImmersiveModeToggle />
        </DeferRender>
        <DeferRender
          fallback={controlFallback}
          intentOptions={{ scrollDistance: 0, fallbackDelay: 600 }}
          rootMargin="100px"
        >
          <ComfortControls />
        </DeferRender>
      </div>

      <DeferRender
        fallback={tickerFallback}
        intentOptions={{ scrollDistance: 0, fallbackDelay: 700 }}
        rootMargin="150px"
      >
        <GlyphTicker className="mx-auto mt-8 w-full max-w-5xl" />
      </DeferRender>

      <div className="mx-auto mt-10 hidden w-full max-w-5xl sm:block">
        <RomanMosaicBorder height={50} animate={false} />
      </div>
    </section>
  );
}
