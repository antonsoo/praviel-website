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

// Marketing site stays static via cacheLife + cacheComponents; we keep the route
// config empty because cacheComponents handles fragment-level caching.

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
