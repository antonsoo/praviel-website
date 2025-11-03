"use client";

/**
 * Skip to Content Link
 * Accessibility feature that allows keyboard users to skip navigation and jump to main content
 * WCAG 2.1 Level A requirement
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-[#D4AF37] focus:to-[#C5A572] focus:text-black focus:font-semibold focus:rounded-full focus:shadow-lg focus:shadow-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#E8C55B] focus:ring-offset-2 focus:ring-offset-black"
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
}
