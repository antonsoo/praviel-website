import "./globals.css";
import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import ConditionalViewTransitions from "@/components/ConditionalViewTransitions";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import AncientBackground from "@/components/AncientBackground";
import SkipToContent from "@/components/SkipToContent";
import ClientEnhancements from "@/components/ClientEnhancements";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsConsentGate from "@/components/AnalyticsConsentGate";
import PlausibleAnalytics from "@/components/PlausibleAnalytics";
import TempleNav from "@/components/TempleNav";
import HieroglyphicParticles from "@/components/HieroglyphicParticles";
import MarbleDust from "@/components/MarbleDust";
import { fontVariables } from "@/lib/fonts";
import { publicEnv } from "@/lib/env";
import { LANGUAGE_COUNT } from "@/lib/languageStats";

const preferenceBootstrapScript = `(() => {
  try {
    const doc = document.documentElement;
    const comfortKey = "praviel:comfortPrefs";
    const immersiveKey = "praviel:immersivePref";
    const defaults = { typeScale: "base", contrast: "default", bodyFont: "sans" };

    const clamp = (value) => {
      if (!value || typeof value !== "object") return { ...defaults };
      return {
        typeScale: value.typeScale === "plus" ? "plus" : "base",
        contrast: value.contrast === "high" ? "high" : "default",
        bodyFont: value.bodyFont === "serif" ? "serif" : "sans",
      };
    };

    const applyComfort = (value) => {
      doc.dataset.typeScale = value.typeScale;
      doc.dataset.contrast = value.contrast;
      doc.dataset.bodyFont = value.bodyFont;
    };

    let comfort = { ...defaults };
    const storedComfort = localStorage.getItem(comfortKey);
    if (storedComfort) {
      comfort = clamp(JSON.parse(storedComfort));
    }
    applyComfort(comfort);

    const applyImmersive = (value) => {
      doc.dataset.immersivePref = value;
    };

    const storedImmersive = localStorage.getItem(immersiveKey);
    if (storedImmersive === "auto" || storedImmersive === "on" || storedImmersive === "off") {
      applyImmersive(storedImmersive);
    } else {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData = navigator.connection?.saveData;
      applyImmersive(reduceMotion || saveData ? "off" : "auto");
    }
  } catch (error) {
    // Swallow bootstrap errors to avoid breaking rendering
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://praviel.com"),
  title: "PRAVIEL — Read Ancient Texts in Their Original Languages",
  description:
    `Learn Latin, Classical Greek, Biblical Hebrew, Sanskrit, and Egyptian. Read the Iliad, Aeneid, and Torah as the authors wrote them. Research-grade accuracy. ${LANGUAGE_COUNT} ancient languages. Zero AI hallucinations.`,
  keywords: [
    "ancient languages",
    "Classical Latin",
    "Biblical Hebrew",
    "Classical Greek",
    "Sanskrit",
    "Egyptian hieroglyphics",
    "learn ancient languages",
    "Homer Iliad original",
    "Virgil Aeneid Latin",
    "Torah Hebrew",
    "primary texts",
    "scholarly accuracy",
    "ancient language learning"
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
  },
  openGraph: {
    title: "PRAVIEL — Read the Originals, Not the Translations",
    description:
      `When you read Homer in English, you're reading the translator—not Homer. Learn to read authentic ancient texts in Latin, Greek, Hebrew, Sanskrit, Egyptian, Akkadian, and the rest of our ${LANGUAGE_COUNT}-language catalog.`,
    url: "https://praviel.com",
    siteName: "PRAVIEL",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PRAVIEL - Learn Ancient Languages with Research-Grade Accuracy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read Ancient Texts in Their Original Languages | PRAVIEL",
    description:
      `Learn Latin, Greek, Hebrew, Sanskrit, Egyptian. Read the Iliad, Aeneid, Torah as the authors wrote them. ${LANGUAGE_COUNT} languages. Zero AI hallucinations.`,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover", // Ensures content extends into safe areas on notched devices
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  "use cache";
  cacheLife("hours"); // Match page cache to prevent hydration mismatches

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

  const analyticsProvider = (publicEnv.NEXT_PUBLIC_ANALYTICS_PROVIDER ??
    (publicEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ? "cloudflare" : null)) as
    | "cloudflare"
    | "vercel"
    | null;

  return (
    <ConditionalViewTransitions>
      <html
        lang="en"
        data-type-scale="base"
        data-contrast="default"
        data-body-font="sans"
        data-immersive-pref="auto"
        className={`bg-bg-page text-zinc-100 antialiased ${fontVariables}`}
      >
        <body
          className="min-h-dvh flex flex-col overflow-x-hidden font-sans"
          style={{ paddingTop: "var(--safe-area-top)" }}
        >
        <script
          id="preferences-bootstrap"
          dangerouslySetInnerHTML={{ __html: preferenceBootstrapScript }}
        />
        {/* Plausible Analytics - Privacy-focused, GDPR compliant, no cookies
            Using custom proxy through our domain to avoid ad blockers
            Must be a client component to work with Next.js Script strategy */}
        <PlausibleAnalytics />

        {/* Skip to content link for accessibility (WCAG 2.1 Level A) */}
        <SkipToContent />

        {/* Disabled heavy animations to fix performance lag on desktop */}
        {/* <AncientBackground /> */}
        {/* <HieroglyphicParticles /> */}
        {/* <MarbleDust /> */}
        <TempleNav />

        <SiteHeader />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <ClientEnhancements />
        <SmoothScroll />
        <AnalyticsConsentGate
          provider={analyticsProvider}
          cloudflareToken={publicEnv.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}
          sampleRate={publicEnv.NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE}
        />

        {/* Structured data for SEO - using regular script tag in server component */}
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }}
        />
        </body>
      </html>
    </ConditionalViewTransitions>
  );
}
