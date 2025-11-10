type HeroCrestProps = {
  className?: string;
};

export default function HeroCrest({ className = "" }: HeroCrestProps) {
  const figureClassName = [
    "mx-auto w-full max-w-xl md:max-w-2xl lg:max-w-3xl",
    "rounded-[36px] border border-white/15 bg-black/80 p-3 text-left",
    "shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur",
    "min-h-[18rem] md:min-h-[22rem] lg:min-h-[24rem]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={figureClassName}
      aria-label="Mission crest summarizing PRAVIEL's launch focus"
      data-lcp-target="hero-crest"
    >
      <div
        className="flex h-full w-full flex-col justify-between rounded-[34px] bg-gradient-to-br from-[#D4AF37] via-[#E8C55B] to-[#3b82f6] p-6 text-[#050505] shadow-inner"
      >
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-black/60">
            PRAVIEL · 42 LANGUAGES
          </p>
          <div className="space-y-2 font-display">
            <p className="text-3xl font-semibold leading-tight">Every translation</p>
            <p className="text-3xl font-semibold leading-tight text-black/80">is an interpretation.</p>
          </div>
          <p className="text-base font-semibold">
            Read the originals. Build scholar-grade fluency with canonical witnesses.
          </p>
          <div className="space-y-1 text-sm">
            <p>Homer · Torah · Analects · Mahābhārata</p>
            <p>Classical Latin · Koine Greek · Classical Greek · Biblical Hebrew</p>
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-black/10 bg-white/70 p-4 text-xs font-semibold text-black/70">
          <p className="uppercase tracking-[0.35em] text-black/50">Upcoming cohorts</p>
          <p>Sanskrit · Classical Chinese · Pali · Old Church Slavonic · Classical Arabic</p>
          <p className="text-[11px] text-black/60">Mission credo · BIG_PICTURE_from_main_repo.md</p>
        </div>
      </div>
    </figure>
  );
}
