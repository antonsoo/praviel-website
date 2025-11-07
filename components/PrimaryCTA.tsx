import Link from "next/link";

export default function PrimaryCTA() {
  return (
    <div className="relative mt-10 inline-flex items-center justify-center">
      <span className="pointer-events-none absolute -inset-5 rounded-3xl bg-gradient-to-r from-[#D4AF37]/15 via-[#E8C55B]/20 to-[#C5A572]/15 blur-2xl" aria-hidden />
      <Link
        href="https://app.praviel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E8C55B] to-[#D4AF37] px-8 py-4 text-lg font-semibold text-black shadow-[0_0_45px_rgba(212,175,55,0.45)] ring-1 ring-[#E8C55B]/50 transition-all duration-300 ease-out hover:shadow-[0_0_65px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-100"
      >
        <span className="tracking-tight">Read the Originals Now</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
        >
          <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-500 ease-out group-hover:opacity-100" aria-hidden />
      </Link>
    </div>
  );
}
