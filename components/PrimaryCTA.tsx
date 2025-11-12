import Link from "next/link";

type PrimaryCTAProps = {
  ariaDescribedBy?: string;
  lcpTarget?: string;
  className?: string;
  variant?: "default" | "mobile";
};

const variantClasses: Record<NonNullable<PrimaryCTAProps["variant"]>, string> = {
  default: [
    "inline-flex items-center justify-center gap-2 rounded-[24px] bg-[#F5E7C4]",
    "min-h-[52px] px-8 py-3 text-base font-semibold text-black ring-1 ring-black/5",
    "shadow-[0_4px_16px_rgba(245,231,196,0.4)] transition-all duration-150 ease-out",
    "hover:bg-[#FFF4D9] active:bg-[#E8C55B]",
  ].join(" "),
  mobile: [
    "inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl border border-[#E8C55B]/30",
    "bg-gradient-to-r from-[#1b1b16] via-[#10100c] to-[#1b1b16] px-6 py-4 text-lg font-semibold uppercase",
    "tracking-[0.22em] text-[#E8C55B] ring-1 ring-[#E8C55B]/25 shadow-none transition-colors duration-150",
    "hover:text-white hover:ring-[#E8C55B]/40",
  ].join(" "),
};

export default function PrimaryCTA({
  ariaDescribedBy,
  lcpTarget = "hero-primary-cta",
  className = "",
  variant = "default",
}: PrimaryCTAProps = {}) {
  const href = "https://app.praviel.com";
  const classes = [variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-describedby={ariaDescribedBy}
      {...(lcpTarget ? { "data-lcp-target": lcpTarget } : {})}
    >
      <span className="truncate">Read the originals</span>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
