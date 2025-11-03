import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service | PRAVIEL",
  description:
    "Comprehensive privacy policy and terms of service for PRAVIEL. GDPR, CCPA, and 20+ US state privacy laws compliant. Transparent data practices, AI disclaimers, and your rights.",
  openGraph: {
    title: "Privacy Policy & Terms of Service | PRAVIEL",
    description:
      "Your privacy matters. Learn about our data practices, your rights under GDPR/CCPA, and our commitment to transparency.",
    type: "website",
    url: "https://praviel.com/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy & Terms of Service | PRAVIEL",
    description:
      "GDPR & CCPA compliant privacy policy. Transparent data practices and user rights.",
  },
  alternates: {
    canonical: "https://praviel.com/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
