type HeroPosterMobileProps = {
  className?: string;
};

export default function HeroPosterMobile({ className = "" }: HeroPosterMobileProps) {
  return (
    <>
      <div
        className={[
          "relative mx-auto mb-8 block w-full max-w-sm rounded-[28px] border border-white/10 bg-gradient-to-b from-[#15100a] via-[#060503] to-[#15100a] py-12 text-center sm:hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
      >
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(232,197,91,0.35), transparent 55%), radial-gradient(circle at 85% 80%, rgba(59,130,246,0.25), transparent 45%)" }} />
        <p className="relative text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-[#E8C55B]/65">
          Illuminated Fragment
        </p>
      </div>

      <figure
        className={[
          "relative mx-auto mb-6 hidden w-full max-w-xl overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-b from-[#090909] via-[#050505] to-[#010101] shadow-2xl shadow-black/60 sm:block lg:hidden",
          "min-h-[22rem]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -top-12 -left-10 h-48 w-48 rounded-full bg-[#E8C55B]/25 blur-3xl" />
          <div className="absolute -bottom-16 right-6 h-60 w-60 rounded-full bg-[#3b82f6]/20 blur-3xl" />
          <div className="absolute inset-6 rounded-[28px] border border-white/5" style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          }} />
          <div className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,rgba(232,197,91,0.2),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.18),transparent_50%)] opacity-80" />
          <div className="absolute inset-0 mix-blend-screen opacity-35" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(232,197,91,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.12), transparent 50%)",
          }} />
          <svg
            className="absolute inset-0 h-full w-full opacity-60"
            viewBox="0 0 640 440"
            role="presentation"
            focusable="false"
          >
            <defs>
              <linearGradient id="heroPosterStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C55B" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <rect x="32" y="32" width="576" height="376" rx="48" fill="none" stroke="url(#heroPosterStroke)" strokeWidth="2" />
            <circle cx="520" cy="80" r="38" fill="#E8C55B" fillOpacity="0.12" />
            <circle cx="140" cy="340" r="50" fill="#3b82f6" fillOpacity="0.08" />
            <path d="M96 220h448" stroke="url(#heroPosterStroke)" strokeOpacity="0.25" strokeWidth="1.5" />
            <path d="M96 260h448" stroke="url(#heroPosterStroke)" strokeOpacity="0.15" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-6 text-left">
          <div className="space-y-2">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-[#E8C55B]/80">
              Fragment CXLII / Alexandria
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Manuscript Room / 240 BCE
            </p>
          </div>

          <blockquote className="space-y-2 max-w-sm">
            <p className="text-2xl font-semibold leading-snug text-white text-balance">
              "Every translation is an interpretation. To meet the author, learn their tongue."
            </p>
            <p className="text-xs text-[#E8C55B]/80 uppercase tracking-[0.3em]">
              - Callimachus / Mouseion clerk
            </p>
          </blockquote>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-200">
            {[
              { label: "Languages", value: "46" },
              { label: "Source fidelity", value: "99.8%" },
              { label: "Flagship texts", value: "3,200" },
              { label: "Scholia", value: "18K" },
            ].map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-white/10 bg-white/5/20 p-3 backdrop-blur"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-zinc-500">{highlight.label}</p>
                <p className="text-lg font-semibold text-white">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>

        <figcaption className="sr-only">
          PRAVIEL’s manuscript vignette: Alexandria fragment 142 reminding visitors that scholarship demands original languages.
        </figcaption>
      </figure>
    </>
  );
}
