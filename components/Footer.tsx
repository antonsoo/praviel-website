import OpenSourceBadge from "./OpenSourceBadge";
import CurrentYear from "./CurrentYear";

const CONTACT_LINKS = [
  { href: "mailto:contact@praviel.com", label: "contact@praviel.com" },
  { href: "https://app.praviel.com", label: "App" },
  { href: "/blog", label: "Blog" },
  { href: "https://api.praviel.com/docs", label: "API" },
  { href: "/fund", label: "Fund" },
  { href: "/privacy", label: "Privacy" },
];

const SCRIPT_GLYPHS = ["𒀀", "𓀀", "Α", "א"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black/60 px-4 pb-[calc(2rem+var(--safe-area-bottom))] pt-8 text-xs text-zinc-600 ring-1 ring-white/10 backdrop-blur-xl sm:px-6 sm:pt-12">
      <div className="footer-border-sheen" aria-hidden />
      <div className="footer-bg-glow" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="space-y-3 sm:space-y-4">
          <span className="text-base font-bold text-white sm:text-lg">
            <span className="bg-gradient-to-r from-[#E8C55B] via-[#3b82f6] to-[#E8DCC4] bg-clip-text text-transparent">
              PRAVIEL
            </span>
          </span>
          <p className="max-w-xs text-xs leading-relaxed text-zinc-500 sm:text-sm">
            Through ancient tongues, wisdom echoes across millennia.
          </p>

          <div className="flex gap-2 text-base text-[#D4AF37]/30">
            {SCRIPT_GLYPHS.map((symbol, index) => (
              <span
                key={symbol}
                className="footer-symbol"
                style={{ animationDelay: `${index * 0.2}s` }}
                aria-hidden
              >
                {symbol}
              </span>
            ))}
          </div>

          <OpenSourceBadge />
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative flex min-h-[44px] w-fit items-center text-xs text-zinc-500 transition-colors duration-200 hover:text-[#E8C55B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60 sm:text-sm"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              <span className="pointer-events-none absolute -right-3 top-0 translate-x-1 text-[#E8C55B] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-6xl text-center text-[10px] text-zinc-700 sm:mt-12 sm:text-left sm:text-xs">
        <span className="footer-copyright">
          © <CurrentYear /> PRAVIEL. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
