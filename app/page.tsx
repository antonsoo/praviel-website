// app/page.tsx
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
      <ClientSectionGate
        section="languages"
        fallback={<SectionSkeleton label="Languages" rows={5} />}
        idleTimeout={15000}
      />
      <SectionDivider />
      <ComparisonTable />
      <SectionDivider />
      <FeatureGrid />
      <SectionDivider />
      <FAQ />
    </>
  );
}

function SectionSkeleton({ label, rows = 2 }: { label: string; rows?: number }) {
  return (
    <section
      aria-label={`${label} loading`}
      className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 px-6 py-10 text-sm text-white/60 shadow-lg shadow-black/40"
    >
      <div className="text-lg font-semibold text-white/80">{label}</div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-4 w-full animate-pulse rounded-full bg-white/10"
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
    </section>
  );
}
