// app/page.tsx
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import SectionDivider from "@/components/SectionDivider";
import LanguageShowcase from "@/components/LanguageShowcase";
import TractionBar from "@/components/TractionBar";
import WhyPRAVIEL from "@/components/WhyPRAVIEL";
import HowItWorks from "@/components/HowItWorks";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import InteractiveDemo from "@/components/InteractiveDemo";
import LessonsDemo from "@/components/LessonsDemo";
import { DemoSkeleton } from "@/components/Skeleton";

// We intentionally do NOT export `dynamic = "force-static"`.
// With cacheComponents enabled in next.config.ts, Next.js 16
// decides static vs dynamic at the fragment level and we
// invalidate via revalidateTag() in Server Actions.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TractionBar />
      <SectionDivider />
      <WhyPRAVIEL />
      <SectionDivider />
      <Suspense fallback={<DemoSkeleton />}>
        <LessonsDemo />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<DemoSkeleton />}>
        <InteractiveDemo />
      </Suspense>
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
