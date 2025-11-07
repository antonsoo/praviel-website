import DecorativeColumns from "@/components/DecorativeColumns";
import GreekKeyBorder from "@/components/GreekKeyBorder";
import HeroPosterDesktopGate from "@/components/HeroPosterDesktopGate";
import HeroCrest from "@/components/HeroCrest";
import HeroWaitlistDesktopGate from "@/components/HeroWaitlistDesktopGate";
import PrimaryCTA from "@/components/PrimaryCTA";
import { heroCopy } from "@/lib/canonicalCopy";
import HeroVideoShell from "@/components/HeroVideoShell";
import HeroPosterMobile from "@/components/HeroPosterMobile";

export default function HeroSection() {
  const [primaryTitle, secondaryTitle] = heroCopy.title
    .split("—")
    .map((part) => part.trim());
  const heroTitlePrimary = primaryTitle || heroCopy.title;
  const heroTitleSecondary = secondaryTitle || "";

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden px-6 pb-28 pt-28 sm:min-h-[calc(100svh-2rem)] sm:pb-32 sm:pt-32 md:pt-40 lg:min-h-0 lg:pb-28 lg:pt-44">
      <HeroVideoShell
        desktopVideoSrc="/videos/desktop/background.mp4"
        mobileVideoSrc="/videos/mobile/background.mp4"
        posterSrc="/hero-poster-desktop.avif"
        mobilePosterSrc="/hero-poster-mobile.avif"
        posterAlt="Illuminated manuscripts and scholars' desks"
        overlayOpacity={0.55}
        className="hidden opacity-80 md:block"
        preferStaticOnMobile
      />
      <div className="hero-backdrop" aria-hidden />
      <DecorativeColumns />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-black via-transparent to-transparent" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70">
              {heroCopy.eyebrow}
            </div>
          </div>
          <HeroPosterMobile className="md:hidden" priority />
          <HeroCrest className="hidden md:block lg:mx-0" />
          <div className="hidden space-y-5 text-balance md:block">
            <h1 className="mx-auto max-w-[9ch] text-[clamp(1.55rem,5vw,2.2rem)] font-semibold leading-[1.05] tracking-tight text-white text-pretty font-sans sm:max-w-[10ch] md:mx-0 md:max-w-[12ch] md:text-[clamp(2rem,3vw,3rem)] md:font-display lg:text-[clamp(2.6rem,2.3vw,3.4rem)]">
              <span className="block">{heroTitlePrimary}</span>
              {heroTitleSecondary ? (
                <span className="mt-1 block text-[#F4E2B5]">{heroTitleSecondary}</span>
              ) : null}
            </h1>
            <p className="mx-auto hidden max-w-[32ch] text-[0.95rem] text-white/80 sm:text-base md:block">
              {heroCopy.subtitle}
            </p>
            <div className="space-y-3 text-sm text-white/70 md:hidden">
              <p>Every translation is an interpretation. Study with the canonical witnesses cited in our mission crest.</p>
              <p className="text-white/55">Homer · Torah · Analects · Mahābhārata</p>
            </div>
            <p className="mx-auto hidden max-w-[48ch] text-base text-white/70 md:block lg:mx-0">
              {heroCopy.mission}
            </p>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.35em] text-white/45 md:block">
              46 languages · 5,000 years of canon · Zero hallucinations
            </p>
            {heroCopy.valueProps ? (
              <div className="hidden md:block">
                <ul className="grid gap-3 text-left text-sm text-white/80 sm:grid-cols-2">
                  {heroCopy.valueProps.map((value) => (
                    <li key={value} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                      <span className="text-pretty">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-center gap-6 lg:items-start lg:gap-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:items-center">
              <PrimaryCTA />
              <div className="hidden text-xs uppercase tracking-[0.3em] text-white/50 md:block">
                Built by philologists · Powered by GPT-5, Claude 4.5, Gemini 2.5
              </div>
            </div>
          </div>
        </div>
        <aside className="relative hidden lg:block">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <HeroPosterDesktopGate />
            <h2 className="text-lg font-semibold text-white">Authentic-text workflow</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Select a canonical witness, ground it in Perseus, LSJ, TLA, ORACC, and CDLI data, then rehearse with historically accurate mentors. Citations and morphology are embedded at every step.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Latin, Koine, Classical Greek, Biblical Hebrew prioritized for full reader + coach stack.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Sanskrit, Classical Chinese, Pali, Old Church Slavonic, Ancient Aramaic, and Classical Arabic unlock next.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E8C55B]" aria-hidden />
                Privacy-first BYOK architecture with offline Echo provider for schools.
              </li>
            </ul>
            <GreekKeyBorder className="mt-6" />
            <HeroWaitlistDesktopGate />
          </div>
        </aside>
      </div>
    </section>
  );
}
