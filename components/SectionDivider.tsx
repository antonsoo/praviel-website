const SYMBOLS = ["Α", "Ω", "Ψ", "Δ", "Λ", "Σ", "Φ", "Π"];

export default function SectionDivider() {
  return (
    <div className="relative isolate flex h-12 sm:h-16 md:h-24 items-center justify-center overflow-hidden">
      <div
        className="animate-divider-gradient absolute inset-0 bg-gradient-to-r from-[#D4AF37]/12 via-[#3b82f6]/16 to-[#D4AF37]/12 opacity-70"
        aria-hidden
      />
      <div
        className="animate-divider-line absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-[#E8C55B] to-transparent blur-sm"
        aria-hidden
      />
      <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5 text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#E8C55B]/45">
        {SYMBOLS.slice(0, 5).map((symbol) => (
          <span key={symbol} className="animate-divider-symbol select-none hidden sm:inline">
            {symbol}
          </span>
        ))}
        {/* Show fewer symbols on mobile */}
        {SYMBOLS.slice(0, 3).map((symbol) => (
          <span key={`mobile-${symbol}`} className="animate-divider-symbol select-none sm:hidden">
            {symbol}
          </span>
        ))}
      </div>
    </div>
  );
}
