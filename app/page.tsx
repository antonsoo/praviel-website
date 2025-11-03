// app/page.tsx
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import SectionDivider from "@/components/SectionDivider";
import LanguageShowcase from "@/components/LanguageShowcase";

// We intentionally do NOT export `dynamic = "force-static"`.
// With cacheComponents enabled in next.config.ts, Next.js 16
// decides static vs dynamic at the fragment level and we
// invalidate via revalidateTag() in Server Actions.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <LanguageShowcase />
      <SectionDivider />
      <FeatureGrid />
    </>
  );
}
