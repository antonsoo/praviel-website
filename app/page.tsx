// app/page.tsx
import { cacheLife } from "next/cache";

import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import WhyPRAVIEL from "@/components/WhyPRAVIEL";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import LanguageShowcase from "@/components/LanguageShowcase";
import PrivacyFirst from "@/components/PrivacyFirst";

// Marketing site stays static via cacheLife + cacheComponents
// Note: OpenNext Cloudflare has known TTFB issues (1.5s+) that require upstream fixes
// See: https://github.com/opennextjs/opennextjs-cloudflare/issues/653

export default async function HomePage() {
  "use cache";
  cacheLife("hours");

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <WhyPRAVIEL />
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
