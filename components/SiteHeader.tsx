import Link from "next/link";

import SiteHeaderMobileMenu from "@/components/SiteHeaderMobileMenu";

const NAV_LINKS = [
  { href: "https://app.praviel.com", label: "Launch app" },
  { href: "#features", label: "Features" },
  { href: "/blog", label: "Blog" },
  { href: "/fund", label: "Support us" },
  { href: "https://api.praviel.com/docs", label: "API" },
];

export default function SiteHeader() {
  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/90 px-6 py-4 text-sm text-zinc-300 shadow-[0_2px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 md:bg-black/60 md:shadow-[0_2px_20px_rgba(0,0,0,0.35)] md:backdrop-blur-2xl">
      <div className="header-border-sheen" aria-hidden />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="group relative flex items-center gap-2 text-lg font-bold">
          <span className="text-white sm:text-transparent sm:bg-gradient-to-r sm:from-[#E8C55B] sm:via-[#3b82f6] sm:to-[#E8DCC4] sm:bg-clip-text transition-transform duration-200 ease-out motion-safe:hover:scale-105">
            PRAVIEL
          </span>
          <span className="sr-only">PRAVIEL home</span>
          <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#D4AF37] to-[#3b82f6] transition-transform duration-300 ease-out motion-safe:group-hover:scale-x-100 motion-reduce:transition-none" />
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="group relative inline-flex items-center px-2 py-1 font-medium text-zinc-300 transition-colors duration-200 ease-out hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
            >
              <span className="relative z-10">{link.label}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-[#D4AF37]/12 opacity-0 transition duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/12 via-[#D4AF37]/5 to-[#3b82f6]/12 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C55B] transition-all duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] hover:border-[#E8C55B]/50 hover:text-[#F5E4B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
          >
            Join the waitlist
          </a>
        </div>

        <SiteHeaderMobileMenu links={NAV_LINKS} />
      </div>
    </header>
  );
}
