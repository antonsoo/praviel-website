// app/page.tsx
import { cacheLife } from "next/cache";
import dynamic from "next/dynamic";

// Critical above-the-fold components (load immediately)
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import CivilizationPortals from "@/components/CivilizationPortals";

// Below-the-fold components (lazy load for better LCP/TBT)
const CivilizationTriad = dynamic(() => import("@/components/CivilizationTriad"));
const MaterialStudy = dynamic(() => import("@/components/MaterialStudy"));
const BlogSpotlight = dynamic(() => import("@/components/BlogSpotlight"));
const VoiceTour = dynamic(() => import("@/components/VoiceTour"));
const FeatureGrid = dynamic(() => import("@/components/FeatureGrid"));
const MissionSection = dynamic(() => import("@/components/MissionSection"));
const WhyPRAVIEL = dynamic(() => import("@/components/WhyPRAVIEL"));
const LivingManuscript = dynamic(() => import("@/components/LivingManuscript"));
const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"));
const JourneyTimeline = dynamic(() => import("@/components/JourneyTimeline"));
const LanguageShowcase = dynamic(() => import("@/components/LanguageShowcase"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const PrivacyFirst = dynamic(() => import("@/components/PrivacyFirst"));

// Marketing site stays static via cacheLife + cacheComponents
// Note: OpenNext Cloudflare has known TTFB issues (1.5s+) that require upstream fixes
// See: https://github.com/opennextjs/opennextjs-cloudflare/issues/653

export default async function HomePage() {
  "use cache";
  cacheLife("days");

  return (
    <>
      <HeroSection />
      <CivilizationPortals />
      <SectionDivider />
      <CivilizationTriad />
      <SectionDivider />
      <MaterialStudy />
      <SectionDivider />
      <BlogSpotlight />
      <SectionDivider />
      <VoiceTour />
      <SectionDivider />
      <FeatureGrid />
      <SectionDivider />
      <MissionSection />
      <SectionDivider />
      <WhyPRAVIEL />
      <SectionDivider />
      <LivingManuscript />
      <SectionDivider />
      <ComparisonTable />
      <SectionDivider />
      <JourneyTimeline />
      <SectionDivider />
      <LanguageShowcase />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <PrivacyFirst />
    </>
  );
}
