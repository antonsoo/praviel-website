import localFont from "next/font/local";
import { Noto_Sans_Glagolitic } from "next/font/google";

// Only the fonts that are actually used on the marketing surface live here.
// The heavier script coverage (CJK, Brahmi, Phoenician, etc.) is scoped to the
// test harness via app/test/layout.tsx so we do not pay the CSS cost on the
// primary route.

const notoSans = localFont({
  src: [
    { path: "../app/fonts/noto-sans/noto-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/noto-sans/noto-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/noto-sans/noto-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-noto-sans",
  display: "swap", // Changed from optional to swap for better LCP
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial"],
  preload: true, // Critical for body text
  adjustFontFallback: "Arial",
});

const notoSerif = localFont({
  src: [
    { path: "../app/fonts/noto-serif/noto-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/noto-serif/noto-serif-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-noto-serif",
  display: "swap",
  fallback: ["Palatino", "Book Antiqua", "serif"],
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const notoSerifDisplay = localFont({
  src: [
    { path: "../app/fonts/noto-serif-display/noto-serif-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/noto-serif-display/noto-serif-display-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display-serif",
  display: "swap", // Changed to swap - hero text is critical
  fallback: ["Georgia", "Times New Roman", "serif"],
  preload: true, // Critical for hero headline (LCP element)
  adjustFontFallback: "Times New Roman",
});

const notoSerifGreek = localFont({
  src: [
    { path: "../app/fonts/noto-serif-display/noto-serif-display-greek-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/noto-serif-display/noto-serif-display-greek-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-greek-serif",
  display: "swap",
  preload: false,
});

const notoSansHebrew = localFont({
  src: [
    { path: "../app/fonts/noto-sans-hebrew/noto-sans-hebrew-hebrew-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/noto-sans-hebrew/noto-sans-hebrew-hebrew-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-hebrew",
  display: "swap",
  preload: false,
});

const notoSansGlagolitic = Noto_Sans_Glagolitic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-glagolitic",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  notoSans.variable,
  notoSerif.variable,
  notoSerifDisplay.variable,
  notoSerifGreek.variable,
  notoSansHebrew.variable,
  notoSansGlagolitic.variable,
]
  .filter(Boolean)
  .join(" ");
