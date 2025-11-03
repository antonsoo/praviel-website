import type { Metadata } from "next";
import FundingHero from "@/components/FundingHero";
import FundingOptions from "@/components/FundingOptions";
import ImpactSection from "@/components/ImpactSection";

export const metadata: Metadata = {
  title: "Fund PRAVIEL — Preserve Ancient Languages",
  description:
    "Help preserve humanity's linguistic heritage. Support the development of AI-powered ancient language learning tools.",
  openGraph: {
    title: "Fund PRAVIEL — Preserve Ancient Languages",
    description:
      "Help preserve humanity's linguistic heritage. Support the development of AI-powered ancient language learning tools.",
  },
};

export default function FundPage() {
  return (
    <>
      <FundingHero />
      <FundingOptions />
      <ImpactSection />
    </>
  );
}
