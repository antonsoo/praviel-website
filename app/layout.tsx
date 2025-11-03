import "./globals.css";
import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import SmoothScroll from "@/components/SmoothScroll";
// Removed TorchCursor for clean, professional design
import SandBackground from "@/components/SandBackground";
import CookieConsent from "@/components/CookieConsent";
// Removed expensive effects: FilmGrain, VolumetricLight, AtmosphericFog

export const metadata: Metadata = {
  metadataBase: new URL("https://praviel.com"),
  title: "PRAVIEL — Master Ancient Languages with AI",
  description:
    "PRAVIEL is the AI tutor for ancient languages. Immersive drills, instant feedback, authentic texts.",
  openGraph: {
    title: "PRAVIEL — Master Ancient Languages with AI",
    description:
      "Immersive drills, instant feedback, authentic texts. Akkadian, Biblical Hebrew, Koine Greek, Latin, more.",
    url: "https://praviel.com",
    siteName: "PRAVIEL",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PRAVIEL preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRAVIEL — Master Ancient Languages with AI",
    description:
      "Immersive drills, instant feedback, authentic texts. Akkadian, Biblical Hebrew, Koine Greek, Latin, more.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-bg-page text-zinc-100 antialiased"
    >
      <body className="min-h-dvh flex flex-col overflow-x-hidden">
        {/* Optimized background */}
        <SandBackground />

        {/* Content */}
        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <MusicToggle />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
