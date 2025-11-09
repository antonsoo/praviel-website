import Image from "next/image";
import PrimaryCTA from "@/components/PrimaryCTA";
import GreekKeyBorder from "@/components/GreekKeyBorder";
import { heroCopy } from "@/lib/canonicalCopy";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[85svh] overflow-hidden px-6 py-32 sm:py-40 md:min-h-[75svh]">
      {/* Background videos with image fallbacks */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Desktop video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/desktop/poster.jpg"
          className="hidden md:block h-full w-full object-cover opacity-40 motion-reduce:hidden"
          aria-hidden="true"
        >
          <source src="/videos/desktop/alexandria1_LANDSCAPE.webm" type="video/webm" />
          <source src="/videos/desktop/alexandria1_LANDSCAPE_compressed.mp4" type="video/mp4" />
        </video>

        {/* Mobile video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/mobile/poster.jpg"
          className="md:hidden h-full w-full object-cover opacity-40 motion-reduce:hidden"
          aria-hidden="true"
        >
          <source src="/videos/mobile/simple_papyrus_LANDSCAPE.webm" type="video/webm" />
          <source src="/videos/mobile/simple_papyrus_LANDSCAPE_compressed.mp4" type="video/mp4" />
        </video>

        {/* Fallback images for reduced motion or video load failure */}
        <Image
          src="/videos/desktop/poster.jpg"
          alt="Ancient library background"
          fill
          priority
          quality={90}
          className="hidden md:block object-cover opacity-40 motion-reduce:block"
        />

        <Image
          src="/videos/mobile/poster.jpg"
          alt="Papyrus background"
          fill
          priority
          quality={85}
          className="md:hidden object-cover opacity-40 motion-reduce:block"
        />

        {/* Static fallback background for reduced motion preference */}
        <div className="hidden motion-reduce:block absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" aria-hidden="true" />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-zinc-900/80 to-black/70" />

        {/* Animated gradient orbs for visual interest - also respects reduced motion */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,197,91,0.10),transparent_50%)] motion-reduce:animate-none animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.08),transparent_50%)] motion-reduce:animate-none animate-gradient-slower" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center space-y-10">
        {/* Decorative Greek Key Border - ancient aesthetic */}
        <GreekKeyBorder className="mx-auto max-w-md mb-8" />

        {/* Eyebrow with credibility */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E8C55B]/20 bg-[#E8C55B]/5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-[#E8C55B] shadow-lg shadow-[#E8C55B]/10">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          {heroCopy.eyebrow}
        </div>

        {/* Headline with visual hierarchy */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
          Read the Originals
          <span className="mt-3 block bg-gradient-to-r from-[#E8C55B] via-[#D4AF37] to-[#E8C55B] bg-clip-text text-transparent animate-gradient-x">
            Not the Translations
          </span>
        </h1>

        {/* Simplified subtitle - from canonical copy */}
        <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-zinc-300 leading-relaxed">
          {heroCopy.subtitle}
        </p>

        {/* Condensed social proof - single line */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C55B]" />
            46 Ancient Languages
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

        {/* CTA - clean and simple */}
        <div className="pt-4">
          <PrimaryCTA />
          <p className="mt-4 text-sm text-zinc-500">
            Web app available now • iOS & Android coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
