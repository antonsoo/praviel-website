import type { Metadata } from "next";
import FundingHero from "@/components/FundingHero";
import FundingOptions from "@/components/FundingOptions";
import ImpactSection from "@/components/ImpactSection";

export const metadata: Metadata = {
  title: "Support PRAVIEL — Preserve Ancient Languages",
  description:
    "Help preserve humanity's linguistic heritage. Support the development of AI-powered ancient language learning tools.",
  openGraph: {
    title: "Support PRAVIEL — Preserve Ancient Languages",
    description:
      "Help preserve humanity's linguistic heritage. Support the development of AI-powered ancient language learning tools.",
  },
};

export default function SupportPage() {
  return (
    <>
      <FundingHero />
      <FundingOptions />
      <ImpactSection />
    </>
  );
}
