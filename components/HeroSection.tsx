import PrimaryCTA from "@/components/PrimaryCTA";
import GreekKeyBorder from "@/components/GreekKeyBorder";
import HeroPosterMobile from "@/components/HeroPosterMobile";
import HeroCrest from "@/components/HeroCrest";
import HeroCtaSubcopyVisual from "@/components/HeroCtaSubcopyVisual";
import HeroLcpObserver from "@/components/HeroLcpObserver";
import { heroCopy } from "@/lib/canonicalCopy";
import { LANGUAGE_COUNT } from "@/lib/languageStats";

const HERO_TITLE_ID = "hero-title";
const HERO_SUBTITLE_ID = "hero-subtitle";
const HERO_VISUAL_DESCRIPTION_ID = "hero-visual-description";
const HERO_CTA_SUBCOPY_ID = "hero-cta-subcopy";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative isolate flex items-center overflow-hidden px-4 sm:px-6 py-16 sm:py-24 md:py-32 min-h-[100svh] sm:min-h-[88svh] lg:min-h-screen"
      aria-labelledby={HERO_TITLE_ID}
      aria-describedby={`${HERO_SUBTITLE_ID} ${HERO_VISUAL_DESCRIPTION_ID}`}
      role="region"
    >
      <HeroLcpObserver />
      {/* Gradient-based background (no large images) to keep LCP < 2.5s */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" aria-hidden />
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_20%_20%,rgba(232,197,91,0.12),transparent_45%)] sm:block" aria-hidden />
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_55%)] sm:block" aria-hidden />
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_65%_80%,rgba(147,51,234,0.15),transparent_60%)] sm:block" aria-hidden />
        <div className="absolute inset-0 hidden bg-gradient-to-br from-black/85 via-zinc-900/80 to-black/70 sm:block" aria-hidden />
        <div className="absolute inset-0 hidden opacity-40 mix-blend-screen motion-safe:animate-[pulse_16s_ease-in-out_infinite] sm:block" style={{ backgroundImage: "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.08) 100%)" }} aria-hidden />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center sm:gap-10">
        <p id={HERO_VISUAL_DESCRIPTION_ID} className="sr-only">
          Animated aurora gradients pulse softly behind the headline to mirror torchlight without impacting readability.
        </p>
        {/* Decorative Greek Key Border - ancient aesthetic */}
        <GreekKeyBorder className="hidden sm:block mx-auto max-w-md mb-8" />

        <div className="flex w-full flex-col items-center gap-3 sm:gap-5">
          {/* Eyebrow with credibility */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#E8C55B]/20 bg-[#E8C55B]/5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-[#E8C55B] shadow-lg shadow-[#E8C55B]/10">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {heroCopy.eyebrow}
          </div>
          {/* Mobile-first CTA to pull LCP toward the button */}
          <div className="w-full px-4 sm:hidden" data-lcp-priority="cta">
            <div className="mx-auto w-full max-w-md rounded-[36px] border border-[#E8C55B]/25 bg-gradient-to-b from-[#1d1b14] via-[#0a0a06] to-[#1d1b14] px-6 py-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.55)]" data-lcp-target="hero-mobile-cta-panel">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.5em] text-[#E8C55B]/70">
                Investor preview
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                Read the originals, not the summaries.
              </h2>
              <p className="mt-3 text-sm text-zinc-300/90 text-balance">
                Research-grade accuracy across {LANGUAGE_COUNT} ancient languages with real manuscripts, not demos.
              </p>
              <PrimaryCTA
                variant="mobile"
                ariaDescribedBy={HERO_CTA_SUBCOPY_ID}
                className="mt-6"
                lcpTarget="hero-mobile-cta"
              />
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.35em] text-zinc-500/90">
                Playwright + Lighthouse verified
              </p>
            </div>
          </div>
        </div>

        {/* Headline with visual hierarchy */}
        <h1
          id={HERO_TITLE_ID}
          className="sr-only sm:not-sr-only sm:text-6xl md:text-[4.75rem] font-bold leading-[1.03] tracking-tight text-white sm:max-w-[16ch] mx-auto text-balance"
          data-lcp-target="hero-headline"
        >
          <span className="block">Read the Originals</span>
          <span className="mt-3 hidden max-w-[12ch] text-[1.35rem] text-[#E8C55B] text-balance leading-tight sm:inline-block sm:mx-0 sm:max-w-none sm:text-inherit sm:bg-gradient-to-r sm:from-[#E8C55B] sm:via-[#D4AF37] sm:to-[#E8C55B] sm:bg-clip-text sm:text-transparent motion-safe:animate-gradient-x">
            Not the Translations
          </span>
        </h1>

        {/* Simplified subtitle - from canonical copy */}
        <div id={HERO_SUBTITLE_ID} className="space-y-2">
          <p className="hidden sm:block mx-auto max-w-[12rem] text-sm leading-snug text-zinc-300/95 text-balance px-1.5">
            {heroCopy.subtitleShort ?? heroCopy.subtitle}
          </p>
          <p className="hidden sm:block mx-auto max-w-2xl text-lg md:text-2xl text-zinc-300 leading-relaxed px-4 text-balance">
            {heroCopy.subtitle}
          </p>
        </div>

        {/* CTA - clean and simple */}
        <p className="sr-only" id={HERO_CTA_SUBCOPY_ID}>
          {heroCopy.ctaSubcopy}
        </p>

        <div className="pt-4 hidden flex-col items-center gap-3 sm:flex">
          <PrimaryCTA ariaDescribedBy={HERO_CTA_SUBCOPY_ID} lcpTarget="hero-desktop-cta" />
          <HeroCtaSubcopyVisual
            text={heroCopy.ctaSubcopy}
            className="text-xs sm:text-sm text-zinc-500 tracking-wide uppercase"
          />
        </div>

        {/* Condensed social proof - single line */}
        <div className="hidden flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 sm:flex">
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

        <HeroPosterMobile className="mt-12 hidden sm:block md:hidden" />
        <HeroCrest className="hidden sm:block mt-16" />
      </div>
    </section>
  );
}
