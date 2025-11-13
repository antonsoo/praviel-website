// app/page.tsx
import { cacheLife } from "next/cache";

import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import FeatureGrid from "@/components/FeatureGrid";
import MissionSection from "@/components/MissionSection";
import WhyPRAVIEL from "@/components/WhyPRAVIEL";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import LanguageShowcase from "@/components/LanguageShowcase";
import PrivacyFirst from "@/components/PrivacyFirst";
import CivilizationTriad from "@/components/CivilizationTriad";
import MaterialStudy from "@/components/MaterialStudy";
import BlogSpotlight from "@/components/BlogSpotlight";
import LivingManuscript from "@/components/LivingManuscript";
import JourneyTimeline from "@/components/JourneyTimeline";
import VoiceTour from "@/components/VoiceTour";
import CivilizationPortals from "@/components/CivilizationPortals";

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
