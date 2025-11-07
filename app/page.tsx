// app/page.tsx
import { cacheLife } from "next/cache";

import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import TractionBar from "@/components/TractionBar";
import WhyPRAVIEL from "@/components/WhyPRAVIEL";
import FeatureGrid from "@/components/FeatureGrid";
import { DemoSkeleton } from "@/components/Skeleton";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import ClientSectionGate from "@/components/ClientSectionGate";
import LanguageShowcase from "@/components/LanguageShowcase";
import PrivacyFirst from "@/components/PrivacyFirst";

// Marketing site stays static via cacheLife + cacheComponents
// Note: OpenNext Cloudflare has known TTFB issues (1.5s+) that require upstream fixes
// See: https://github.com/opennextjs/opennextjs-cloudflare/issues/653

export default async function HomePage() {
  "use cache";
  cacheLife("days");

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <WhyPRAVIEL />
      <SectionDivider />
      <TractionBar />
      <SectionDivider />
      <ClientSectionGate
        section="lessons"
        fallback={<DemoSkeleton />}
        idleTimeout={0}
        rootMargin="120px"
      />
      <SectionDivider />
      <ClientSectionGate
        section="interactive"
        fallback={<DemoSkeleton />}
        idleTimeout={0}
        rootMargin="120px"
      />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <PrivacyFirst />
      <SectionDivider />
      <LanguageShowcase />
      <SectionDivider />
      <ComparisonTable />
      <SectionDivider />
      <FeatureGrid />
      <SectionDivider />
      <FAQ />
    </>
  );
}
