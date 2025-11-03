import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import SmoothScroll from "@/components/SmoothScroll";
import AncientBackground from "@/components/AncientBackground";
import CookieConsent from "@/components/CookieConsent";
import MotionProvider from "@/components/MotionProvider";
import SkipToContent from "@/components/SkipToContent";

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
  // Structured data for SEO (safe - using static data)
  // Note: This is safe to use with dangerouslySetInnerHTML because:
  // 1. Data is static (defined at compile time)
  // 2. Using JSON.stringify (no user input)
  // 3. Standard practice for JSON-LD structured data
  const _structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "PRAVIEL",
    "description": "AI-powered platform for learning ancient languages including Akkadian, Biblical Hebrew, Koine Greek, Latin, and Old Church Slavonic",
    "url": "https://praviel.com",
    "logo": "https://praviel.com/og.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@praviel.com",
      "contactType": "Customer Service"
    },
    "offers": {
      "@type": "Offer",
      "category": "Educational Software",
      "availability": "https://schema.org/InStock",
      "description": "AI-powered ancient language learning platform with pronunciation feedback, adaptive drills, and authentic texts"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "teachingLanguage": [
      {"@type": "Language", "name": "Akkadian"},
      {"@type": "Language", "name": "Biblical Hebrew"},
      {"@type": "Language", "name": "Koine Greek"},
      {"@type": "Language", "name": "Latin"},
      {"@type": "Language", "name": "Old Church Slavonic"}
    ]
  };

  return (
    <html lang="en" className="bg-bg-page text-zinc-100 antialiased">
      <body className="min-h-dvh flex flex-col overflow-x-hidden">
        {/* Skip to content link for accessibility (WCAG 2.1 Level A) */}
        <SkipToContent />

        {/* Ancient-themed background with ancient scripts, papyrus, and Greek patterns */}
        <AncientBackground />

        {/* LazyMotion provider for bundle size optimization (34kb -> 6kb) */}
        <MotionProvider>
          {/* Content */}
          <SmoothScroll>
            <SiteHeader />
            <main id="main-content" className="flex-1 pt-16">{children}</main>
            <Footer />
            <MusicToggle />
            <CookieConsent />
          </SmoothScroll>
        </MotionProvider>

        {/* Structured data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }}
        />
      </body>
    </html>
  );
}
