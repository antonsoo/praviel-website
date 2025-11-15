// app/page.tsx
// All components imported normally to avoid Next.js 16 Turbopack dynamic import bug
// See: https://github.com/vercel/next.js/discussions/84264
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import CivilizationPortals from "@/components/CivilizationPortals";
import CivilizationTriad from "@/components/CivilizationTriad";
import MaterialStudy from "@/components/MaterialStudy";
import BlogSpotlight from "@/components/BlogSpotlight";
import FeatureGrid from "@/components/FeatureGrid";
import MissionSection from "@/components/MissionSection";
import WhyPRAVIEL from "@/components/WhyPRAVIEL";
import LivingManuscript from "@/components/LivingManuscript";
import ComparisonTable from "@/components/ComparisonTable";
import LanguageShowcase from "@/components/LanguageShowcase";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import PrivacyFirst from "@/components/PrivacyFirst";

// Marketing site pages are statically optimized by Next.js
// Note: Removed dynamic() imports due to Next.js 16 Turbopack HMR bug causing components to not hydrate
// All components use DeferRender for below-fold lazy loading instead
// OpenNext Cloudflare has known TTFB issues (1.5s+) that require upstream fixes
// See: https://github.com/opennextjs/opennextjs-cloudflare/issues/653

export default function HomePage() {
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
