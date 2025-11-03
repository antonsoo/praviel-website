import { Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Hebrew, Noto_Serif } from "next/font/google";

// Main body font with Latin characters
export const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "greek", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
});

// Devanagari script for Sanskrit
export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false, // Lazy load since not on initial view
});

// Hebrew script
export const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  variable: "--font-hebrew",
  display: "swap",
  preload: false,
});

// Serif font for special emphasis
export const notoSerif = Noto_Serif({
  subsets: ["latin", "greek", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: true,
});

// CSS variable names for use in components
export const fontVariables = `${notoSans.variable} ${notoSansDevanagari.variable} ${notoSansHebrew.variable} ${notoSerif.variable}`;
