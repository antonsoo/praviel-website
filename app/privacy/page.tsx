"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import MobileTOC from "@/components/MobileTOC";
import BackToTop from "@/components/BackToTop";
import CurrentYear from "@/components/CurrentYear";

// Define sections array outside component to avoid dependency issues
const SECTIONS = [
  { id: "tldr", title: "TL;DR - Quick Summary" },
  { id: "overview", title: "Overview" },
  { id: "data-collection", title: "Data We Collect" },
  { id: "data-usage", title: "How We Use Your Data" },
  { id: "data-sharing", title: "Data Sharing & Disclosure" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "data-retention", title: "Data Retention" },
  { id: "security", title: "Security Measures" },
  { id: "your-rights", title: "Your Privacy Rights" },
  { id: "state-laws", title: "US State Privacy Laws" },
  { id: "ai-services", title: "AI Services & Disclaimers" },
  { id: "terms", title: "Terms of Service" },
  { id: "children", title: "Children's Privacy" },
  { id: "international", title: "International Transfers" },
  { id: "changes", title: "Policy Updates" },
  { id: "contact", title: "Contact Us" },
];

// Estimated reading time: ~8500 words / 200 wpm = ~43 minutes
const READING_TIME = 43;

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("");
  const [showTLDR, setShowTLDR] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy & Terms of Service",
            description:
              "Comprehensive privacy policy and terms of service for PRAVIEL, covering GDPR, CCPA, and state privacy laws.",
            url: "https://praviel.com/privacy",
            lastReviewed: "2025-10-27",
            publisher: {
              "@type": "Organization",
              name: "PRAVIEL",
              url: "https://praviel.com",
            },
          }),
        }}
      />

      <div className="relative min-h-screen bg-black">
        {/* Background effects */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(92,64,255,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          {/* Hero Section */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-purple-300 to-violet-300 bg-clip-text text-transparent">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-4">
              Your privacy and trust matter to us. This document explains how
              we collect, use, and protect your data.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <motion.div
                className="inline-flex items-center gap-2 text-sm text-violet-400 px-4 py-2 rounded-full bg-violet-500/10 ring-1 ring-violet-500/20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                Last Updated: October 27, 2025 • Version 1.0
              </motion.div>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-500 px-4 py-2 rounded-full bg-zinc-800/50">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ~{READING_TIME} min read
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            {/* Sticky Table of Contents - Desktop Only */}
            <motion.nav
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-24 space-y-1">
                <h2 className="text-sm font-semibold text-zinc-400 mb-4 px-3">
                  TABLE OF CONTENTS
                </h2>
                {SECTIONS.map((section, i) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === section.id
                        ? "bg-violet-500/20 text-violet-300 font-medium"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                  >
                    {section.title}
                  </motion.button>
                ))}
              </div>
            </motion.nav>

            {/* Content */}
            <motion.div
              className="space-y-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* TL;DR Section */}
              <Section id="tldr" title="TL;DR - Quick Summary">
                <motion.div
                  className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl p-6"
                  initial={{ height: showTLDR ? "auto" : "80px" }}
                  animate={{ height: showTLDR ? "auto" : "80px" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-violet-200 mb-2">
                        Quick Summary
                      </h3>
                      <p className="text-sm text-zinc-400">
                        The essential points you need to know
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTLDR(!showTLDR)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-violet-300 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg transition-colors"
                    >
                      {showTLDR ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  {showTLDR && (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <SummaryItem
                        icon="🔒"
                        title="Privacy First"
                        text="We collect minimal data, never sell your information, and give you full control (GDPR/CCPA compliant)."
                      />
                      <SummaryItem
                        icon="🍪"
                        title="Cookie Policy"
                        text="Essential cookies only by default. No advertising or cross-site tracking. You control optional cookies."
                      />
                      <SummaryItem
                        icon="🤖"
                        title="AI Transparency"
                        text="AI-generated content may be inaccurate. We don't train models on your data. BYOK keys stay on your device."
                      />
                      <SummaryItem
                        icon="🌍"
                        title="Your Rights"
                        text="Access, correct, delete, or export your data anytime. Respond within 30-45 days. No discrimination."
                      />
                      <SummaryItem
                        icon="🛡️"
                        title="Security"
                        text="AES-256 encryption, HTTPS/TLS, regular audits. Breach notification within 72 hours (GDPR)."
                      />
                      <SummaryItem
                        icon="⚖️"
                        title="Legal Coverage"
                        text="Compliant with GDPR (EU), CCPA/CPRA (CA), VCDPA (VA), CPA (CO), CTDPA (CT), and 15+ other US state laws."
                      />
                      <SummaryItem
                        icon="📧"
                        title="Contact"
                        text="Questions? Email support@praviel.com. We respond to data requests within legal timeframes."
                      />
                    </motion.div>
                  )}
                </motion.div>
              </Section>

              {/* Overview */}
              <Section id="overview" title="Overview">
                <p className="text-zinc-300 leading-relaxed mb-4">
                  <strong className="text-violet-300">PRAVIEL</strong> ("we,"
                  "us," "our") is committed to protecting your privacy and
                  ensuring transparency about our data practices. This Privacy
                  Policy and Terms of Service document governs your use of our
                  website at{" "}
                  <a
                    href="https://praviel.com"
                    className="text-violet-400 hover:text-violet-300 underline"
                  >
                    praviel.com
                  </a>{" "}
                  and related services.
                </p>
                <InfoBox>
                  <p className="font-medium text-violet-300 mb-2">
                    Key Commitments:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>✓ We collect minimal data necessary for our services</li>
                    <li>✓ We never sell your personal information</li>
                    <li>
                      ✓ You have full control over your data (GDPR/CCPA
                      compliant)
                    </li>
                    <li>✓ We use industry-standard security measures</li>
                    <li>✓ Transparent about AI service limitations</li>
                    <li>
                      ✓ Compliant with 20+ US state privacy laws (2025 updated)
                    </li>
                  </ul>
                </InfoBox>
                <p className="text-zinc-400 text-sm mt-4">
                  <strong>Data Controller:</strong> Anton Soloviev, doing
                  business as "PRAVIEL"
                  <br />
                  <strong>Location:</strong> United States
                  <br />
                  <strong>Contact:</strong>{" "}
                  <a
                    href="mailto:support@praviel.com"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    support@praviel.com
                  </a>
                </p>
              </Section>

              {/* Data Collection - Enhanced */}
              <Section id="data-collection" title="Data We Collect">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We practice data minimization - collecting only what's
                  necessary to provide and improve our services. Here's a
                  complete breakdown:
                </p>

                <SubSection title="1. Information You Provide Directly">
                  <DataTable
                    headers={["Data Type", "What We Collect", "Purpose", "Retention"]}
                    rows={[
                      [
                        "Email Address",
                        "When you sign up or contact us",
                        "Communication, account management",
                        "Until account deletion",
                      ],
                      [
                        "Name (optional)",
                        "If you choose to provide it",
                        "Personalization",
                        "Until you remove it",
                      ],
                      [
                        "Support Messages",
                        "Content of your inquiries",
                        "Respond to requests, improve support",
                        "3 years",
                      ],
                      [
                        "Payment Info",
                        "Billing address, last 4 card digits (via processors)",
                        "Process payments (we don't store full card numbers)",
                        "7 years (tax compliance)",
                      ],
                    ]}
                  />
                </SubSection>

                <SubSection title="2. Automatically Collected Data">
                  <DataTable
                    headers={["Data Type", "What We Collect", "Purpose", "Retention"]}
                    rows={[
                      [
                        "Device Info",
                        "Browser, OS, device type, screen size",
                        "Optimize UX, responsive design",
                        "90 days (anonymized after)",
                      ],
                      [
                        "Usage Data",
                        "Pages visited, time spent, clicks",
                        "Improve website, analytics",
                        "Aggregated indefinitely (no PII)",
                      ],
                      [
                        "IP Address",
                        "Logged for security",
                        "Fraud prevention, geolocation",
                        "90 days (then anonymized)",
                      ],
                      [
                        "Cookies",
                        "Essential, functional, analytics (opt-in)",
                        "Session, preferences, insights",
                        "Session to 1 year",
                      ],
                    ]}
                  />
                </SubSection>

                <SubSection title="3. Third-Party Data">
                  <p className="text-zinc-400 text-sm mb-3">
                    If you interact with our services through third-party
                    platforms (GitHub Sponsors, Patreon, Stripe), those
                    platforms may share limited information with us:
                  </p>
                  <ul className="space-y-1 text-sm text-zinc-400">
                    <li>
                      • <strong className="text-zinc-300">GitHub Sponsors:</strong> Username,
                      email, sponsorship tier
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Patreon:</strong> Name, email,
                      membership level
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Stripe:</strong> Transaction IDs,
                      payment status, billing info
                    </li>
                  </ul>
                  <p className="text-zinc-400 text-xs mt-3">
                    All third-party data sharing is governed by those platforms'
                    privacy policies and our Data Processing Agreements (DPAs).
                  </p>
                </SubSection>
              </Section>

              {/* Data Usage */}
              <Section id="data-usage" title="How We Use Your Data">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We use your data only for legitimate, transparent purposes. We
                  never sell or rent your personal information to third parties
                  for marketing purposes.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <UsageCard
                    icon="🛠️"
                    title="Service Delivery"
                    description="Provide and maintain our website, process transactions, respond to support requests, deliver updates."
                  />
                  <UsageCard
                    icon="📊"
                    title="Improvement & Analytics"
                    description="Analyze usage patterns, fix bugs, optimize performance, A/B testing (anonymized data only)."
                  />
                  <UsageCard
                    icon="🔒"
                    title="Security & Fraud Prevention"
                    description="Protect against unauthorized access, detect malicious activity, prevent abuse, ensure platform integrity."
                  />
                  <UsageCard
                    icon="📧"
                    title="Communication"
                    description="Send service updates, security alerts, respond to inquiries, notify about changes (opt-in for marketing)."
                  />
                </div>

                <InfoBox className="mt-6">
                  <p className="text-sm font-medium text-violet-300 mb-2">
                    Legal Bases (GDPR Compliance):
                  </p>
                  <ul className="text-sm space-y-1 text-zinc-400">
                    <li>
                      <strong className="text-zinc-300">
                        Contractual Necessity (Art. 6(1)(b)):
                      </strong>{" "}
                      Provide services you've requested
                    </li>
                    <li>
                      <strong className="text-zinc-300">
                        Legitimate Interests (Art. 6(1)(f)):
                      </strong>{" "}
                      Improve services, ensure security, analytics
                    </li>
                    <li>
                      <strong className="text-zinc-300">
                        Legal Obligation (Art. 6(1)(c)):
                      </strong>{" "}
                      Comply with tax, accounting, legal requirements
                    </li>
                    <li>
                      <strong className="text-zinc-300">
                        Consent (Art. 6(1)(a)):
                      </strong>{" "}
                      Optional cookies, marketing communications (withdrawable
                      anytime)
                    </li>
                  </ul>
                </InfoBox>
              </Section>

              {/* Data Sharing - Enhanced */}
              <Section id="data-sharing" title="Data Sharing & Disclosure">
                <WarningBox>
                  <p className="font-semibold mb-2">
                    We do NOT sell your personal information.
                  </p>
                  <p className="text-sm">
                    We never have, and we never will sell or rent your personal
                    data to third parties for marketing purposes. This is a core
                    commitment, not just a legal requirement.
                  </p>
                </WarningBox>

                <SubSection title="When We Share Data">
                  <div className="space-y-4 mt-4">
                    <SharingItem
                      title="Service Providers (Data Processors)"
                      description="We share limited data with trusted vendors who help us operate:"
                      items={[
                        "Hosting: Cloudflare Workers, Vercel (infrastructure, CDN)",
                        "Payments: Stripe (transaction processing, never full card numbers)",
                        "Email: SendGrid, Mailgun (transactional emails only)",
                        "Analytics: Privacy-focused tools (Plausible/Umami, no tracking)",
                        "Database: Neon (PostgreSQL, encrypted at rest)",
                      ]}
                      safeguards="All processors sign GDPR-compliant Data Processing Agreements (DPAs) and are bound by confidentiality."
                    />
                    <SharingItem
                      title="Legal Requirements & Law Enforcement"
                      description="We may disclose data when legally obligated:"
                      items={[
                        "Subpoenas, court orders, or legal processes",
                        "Protecting our rights, property, or safety",
                        "Investigating fraud, security issues, TOS violations",
                        "Compliance with GDPR, CCPA, or other data protection laws",
                      ]}
                      safeguards="We will notify you of legal requests unless prohibited by law. We challenge overly broad or unlawful requests."
                    />
                    <SharingItem
                      title="Business Transfers (Mergers & Acquisitions)"
                      description="If PRAVIEL is acquired, merged, or sells assets:"
                      items={[
                        "Your data may be transferred to the successor entity",
                        "You will be notified via email or prominent site notice",
                        "The new entity must honor this Privacy Policy or obtain your consent to changes",
                        "Your rights under GDPR/CCPA remain enforceable",
                      ]}
                    />
                  </div>
                </SubSection>

                <SubSection title="Data We Do NOT Share">
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>
                      ✗ <strong className="text-zinc-300">Advertising networks:</strong> We
                      don't share data with ad platforms (Google Ads, Facebook
                      Ads, etc.)
                    </li>
                    <li>
                      ✗ <strong className="text-zinc-300">Data brokers:</strong> We don't sell
                      to data aggregators or marketing companies
                    </li>
                    <li>
                      ✗ <strong className="text-zinc-300">Social media:</strong> No automatic
                      sharing to social platforms
                    </li>
                    <li>
                      ✗ <strong className="text-zinc-300">Cross-site tracking:</strong> No
                      third-party cookies for tracking across websites
                    </li>
                  </ul>
                </SubSection>
              </Section>

              {/* Cookies - Enhanced */}
              <Section id="cookies" title="Cookies & Tracking Technologies">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We use cookies and similar technologies to enhance your
                  experience. We do NOT use advertising or cross-site tracking
                  cookies. We comply with GDPR's "prior consent" requirement for
                  non-essential cookies.
                </p>

                <DataTable
                  headers={[
                    "Cookie Type",
                    "Purpose",
                    "Examples",
                    "Duration",
                    "Can You Disable?",
                  ]}
                  rows={[
                    [
                      "Essential",
                      "Core functionality",
                      "Session ID, CSRF tokens, login state",
                      "Session or 30 days",
                      "No (required)",
                    ],
                    [
                      "Functional",
                      "User preferences",
                      "Theme, language, volume, terms acceptance",
                      "1 year",
                      "Yes (lose preferences)",
                    ],
                    [
                      "Analytics",
                      "Anonymized insights",
                      "Page views, session duration (no PII)",
                      "Session",
                      "Yes (opt-out)",
                    ],
                  ]}
                />

                <SubSection title="Cookie Control & Your Choices">
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        1. Cookie Consent Banner
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        When you first visit our site, you'll see a cookie
                        consent banner with <strong className="text-zinc-300">equal prominence</strong> for
                        "Accept All" and "Reject All" buttons (GDPR requirement).
                      </p>
                      <ul className="text-xs text-zinc-500 space-y-1">
                        <li>
                          • <strong className="text-zinc-400">Prior Blocking:</strong> No
                          non-essential cookies set until you consent
                        </li>
                        <li>
                          • <strong className="text-zinc-400">Granular Control:</strong> Choose
                          specific cookie categories
                        </li>
                        <li>
                          • <strong className="text-zinc-400">Revocable:</strong> Change your
                          preferences anytime
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        2. Browser Settings
                      </h4>
                      <p className="text-sm text-zinc-400">
                        You can block or delete cookies through your browser
                        settings. However, this may affect website functionality
                        (e.g., you'll need to log in each time).
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        3. Global Privacy Control (GPC)
                      </h4>
                      <p className="text-sm text-zinc-400">
                        We honor GPC signals automatically. If your browser sends
                        a GPC signal (privacy-preserving browser setting), we'll
                        respect your "Do Not Sell" preference without requiring
                        manual opt-out (CCPA requirement).
                      </p>
                    </div>
                  </div>
                </SubSection>

                <InfoBox className="mt-6">
                  <p className="text-sm font-semibold text-violet-300 mb-2">
                    What We DON'T Use:
                  </p>
                  <ul className="text-sm space-y-1 text-zinc-400">
                    <li>
                      ✗ Google Analytics (replaced with privacy-focused
                      alternative)
                    </li>
                    <li>✗ Facebook Pixel or any social media tracking pixels</li>
                    <li>✗ Advertising cookies (Google Ads, AdSense, etc.)</li>
                    <li>✗ Cross-site tracking or fingerprinting</li>
                    <li>✗ Third-party cookies for behavioral advertising</li>
                  </ul>
                </InfoBox>
              </Section>

              {/* Data Retention - Enhanced */}
              <Section id="data-retention" title="Data Retention">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We retain your data only as long as necessary for the purposes
                  outlined in this policy or as required by law. We follow the
                  GDPR principle of "storage limitation" and CCPA/CPRA
                  requirement for specific retention periods (not vague "as long
                  as necessary").
                </p>

                <DataTable
                  headers={["Data Type", "Retention Period", "Legal Reason", "After Deletion"]}
                  rows={[
                    [
                      "Account Data",
                      "Until you delete account",
                      "Provide ongoing services",
                      "Permanently erased in 30 days",
                    ],
                    [
                      "Transaction Records",
                      "7 years (US/EU standard)",
                      "Tax, accounting, legal compliance",
                      "Archived, then deleted",
                    ],
                    [
                      "Support Messages",
                      "3 years",
                      "Customer service quality, legal",
                      "Anonymized or deleted",
                    ],
                    [
                      "IP Addresses",
                      "90 days (then anonymized)",
                      "Security, fraud prevention",
                      "Last octet removed (e.g., 192.168.1.xxx)",
                    ],
                    [
                      "Analytics Data",
                      "Aggregated indefinitely (no PII)",
                      "Long-term insights",
                      "Already anonymized",
                    ],
                    [
                      "Cookies",
                      "Session to 1 year (by type)",
                      "Technical requirements",
                      "Automatically expire",
                    ],
                    [
                      "Error Logs",
                      "90 days",
                      "Debugging, then auto-deleted",
                      "Purged from systems",
                    ],
                  ]}
                />

                <InfoBox className="mt-6">
                  <p className="text-sm">
                    <strong className="text-violet-300">Account Deletion Process:</strong>
                  </p>
                  <ol className="text-sm space-y-2 mt-3 text-zinc-400">
                    <li>
                      1. <strong className="text-zinc-300">Request:</strong> Email us or delete
                      via account settings
                    </li>
                    <li>
                      2. <strong className="text-zinc-300">Verification:</strong> We confirm your
                      identity (email confirmation)
                    </li>
                    <li>
                      3. <strong className="text-zinc-300">Grace Period:</strong> 7-day recovery
                      window (reactivate if accidental)
                    </li>
                    <li>
                      4. <strong className="text-zinc-300">Erasure:</strong> Personal data
                      permanently deleted within <strong>30 days</strong>
                    </li>
                    <li>
                      5. <strong className="text-zinc-300">Exceptions:</strong> Legal records
                      retained (e.g., financial records for 7 years)
                    </li>
                    <li>
                      6. <strong className="text-zinc-300">Backups:</strong> May persist in
                      encrypted backups for up to <strong>90 days</strong> before
                      permanent deletion
                    </li>
                  </ol>
                </InfoBox>
              </Section>

              {/* Security - Enhanced */}
              <Section id="security" title="Security Measures">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We implement industry-standard security measures to protect
                  your data from unauthorized access, alteration, disclosure, or
                  destruction. Our security posture is regularly audited and
                  updated.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <SecurityCard
                    title="Technical Safeguards"
                    items={[
                      "End-to-end HTTPS/TLS 1.3 encryption",
                      "AES-256 encryption at rest for all database data",
                      "Secure password hashing (bcrypt/Argon2)",
                      "Regular security audits & penetration testing",
                      "DDoS protection via Cloudflare",
                      "Automated vulnerability scanning",
                      "Content Security Policy (CSP) headers",
                    ]}
                  />
                  <SecurityCard
                    title="Organizational Measures"
                    items={[
                      "Limited employee access (need-to-know basis)",
                      "Role-based access controls (RBAC)",
                      "Mandatory security training for personnel",
                      "Incident response plan (72-hour breach notification)",
                      "Third-party security assessments (SOC 2 Type II)",
                      "Audit logs for all server access",
                      "Multi-factor authentication (MFA) for admin accounts",
                    ]}
                  />
                </div>

                <SubSection title="Data Breach Notification Protocol">
                  <p className="text-zinc-400 text-sm mb-3">
                    If we discover a data breach affecting your personal
                    information, we will follow this protocol:
                  </p>
                  <ol className="space-y-2 text-sm text-zinc-400">
                    <li>
                      1. <strong className="text-zinc-300">Detection:</strong> Immediate
                      investigation upon discovery
                    </li>
                    <li>
                      2. <strong className="text-zinc-300">Containment:</strong> Stop the breach,
                      secure systems
                    </li>
                    <li>
                      3. <strong className="text-zinc-300">Assessment:</strong> Determine scope,
                      affected users, data types
                    </li>
                    <li>
                      4. <strong className="text-zinc-300">Notification (GDPR):</strong> Inform
                      affected users within <strong>72 hours</strong> via email
                    </li>
                    <li>
                      5. <strong className="text-zinc-300">Notification (CCPA):</strong> Inform
                      California residents "without unreasonable delay"
                    </li>
                    <li>
                      6. <strong className="text-zinc-300">Guidance:</strong> Provide steps to
                      protect yourself (e.g., change password, monitor accounts)
                    </li>
                    <li>
                      7. <strong className="text-zinc-300">Regulatory:</strong> Notify data
                      protection authorities (GDPR requirement)
                    </li>
                  </ol>
                </SubSection>

                <WarningBox className="mt-6">
                  <p className="text-sm">
                    <strong>Important:</strong> No method of transmission or
                    storage is 100% secure. While we use industry best practices,
                    we cannot guarantee absolute security. You are also
                    responsible for maintaining the confidentiality of your
                    account credentials.
                  </p>
                </WarningBox>
              </Section>

              {/* Your Rights - Enhanced */}
              <Section id="your-rights" title="Your Privacy Rights">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  Depending on your location, you have various rights regarding
                  your personal data. We honor these rights <strong className="text-violet-300">globally</strong>, not
                  just where legally required.
                </p>

                <SubSection title="GDPR Rights (EU/UK/EEA Users)">
                  <div className="space-y-3">
                    <RightItem
                      title="Right to Access (Art. 15)"
                      description="Request a copy of all personal data we hold about you, including purposes, categories, recipients, and retention periods."
                    />
                    <RightItem
                      title="Right to Rectification (Art. 16)"
                      description="Correct inaccurate or incomplete data. We will update your information and notify relevant third parties."
                    />
                    <RightItem
                      title="Right to Erasure / 'Right to be Forgotten' (Art. 17)"
                      description="Request deletion of your data when: (a) no longer necessary, (b) consent withdrawn, (c) objection raised, or (d) unlawfully processed. Exceptions apply for legal obligations."
                    />
                    <RightItem
                      title="Right to Restriction of Processing (Art. 18)"
                      description="Limit how we process your data (e.g., storage only) if accuracy disputed, processing unlawful, or pending objection."
                    />
                    <RightItem
                      title="Right to Data Portability (Art. 20)"
                      description="Receive your data in a machine-readable format (JSON/CSV) and transmit to another controller. Example: Export your lesson history as CSV."
                    />
                    <RightItem
                      title="Right to Object (Art. 21)"
                      description="Object to processing based on legitimate interests (e.g., analytics, direct marketing). We will stop unless compelling grounds exist."
                    />
                    <RightItem
                      title="Right to Withdraw Consent (Art. 7(3))"
                      description="Revoke any consent previously given (e.g., marketing emails, analytics cookies). Withdrawal doesn't affect prior lawful processing."
                    />
                    <RightItem
                      title="Right to Lodge Complaint (Art. 77)"
                      description="File a complaint with your local data protection authority (DPA) if you believe we've violated GDPR. Find your DPA: https://edpb.europa.eu/"
                    />
                  </div>
                </SubSection>

                <SubSection title="CCPA/CPRA Rights (California Residents)">
                  <div className="space-y-3">
                    <RightItem
                      title="Right to Know (§1798.100)"
                      description="Know what personal information we collect, use, disclose, and sell (we don't sell). Request twice per 12 months for free."
                    />
                    <RightItem
                      title="Right to Delete (§1798.105)"
                      description="Request deletion of your personal information, with exceptions for legal obligations, fraud prevention, and internal uses."
                    />
                    <RightItem
                      title="Right to Opt-Out of Sale/Sharing (§1798.120)"
                      description="Opt out of the sale or sharing of personal information. Note: We do NOT sell data, so this is not applicable."
                    />
                    <RightItem
                      title="Right to Correct (§1798.106) - CPRA 2025"
                      description="Request correction of inaccurate personal information. We will update and notify relevant parties."
                    />
                    <RightItem
                      title="Right to Limit Sensitive Data Use (§1798.121)"
                      description="Limit use of sensitive personal information (e.g., social security, biometrics). We don't collect most sensitive categories."
                    />
                    <RightItem
                      title="Right to Non-Discrimination (§1798.125)"
                      description="We won't discriminate against you for exercising your rights (no denial of service, different prices, or reduced quality)."
                    />
                  </div>
                </SubSection>

                <SubSection title="How to Exercise Your Rights">
                  <InfoBox>
                    <p className="text-sm mb-3">
                      <strong className="text-violet-300">Step 1: Submit a Request</strong>
                    </p>
                    <p className="text-sm text-zinc-400 mb-3">
                      Email us at{" "}
                      <a
                        href="mailto:support@praviel.com"
                        className="text-violet-400 hover:text-violet-300 underline"
                      >
                        support@praviel.com
                      </a>{" "}
                      with the subject line "Data Rights Request" and specify
                      which right you'd like to exercise (e.g., "GDPR Access
                      Request" or "CCPA Deletion Request").
                    </p>
                    <p className="text-sm mb-3">
                      <strong className="text-violet-300">Step 2: Identity Verification</strong>
                    </p>
                    <p className="text-sm text-zinc-400 mb-3">
                      We'll ask you to verify your identity (e.g., email
                      confirmation, answering security questions) to prevent
                      unauthorized access. For CCPA requests, we may require
                      additional verification for sensitive data.
                    </p>
                    <p className="text-sm mb-3">
                      <strong className="text-violet-300">Step 3: Processing & Response</strong>
                    </p>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>
                        • <strong className="text-zinc-300">GDPR:</strong> Respond within{" "}
                        <strong>1 month</strong> (extendable to 3 months if complex)
                      </li>
                      <li>
                        • <strong className="text-zinc-300">CCPA:</strong> Respond within{" "}
                        <strong>45 days</strong> (extendable to 90 days if needed)
                      </li>
                      <li>
                        • <strong className="text-zinc-300">Format:</strong> Data provided in
                        JSON/CSV (data portability) or PDF (access report)
                      </li>
                    </ul>
                  </InfoBox>

                  <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="font-semibold text-violet-300 mb-2">
                      Authorized Agent (CCPA)
                    </h4>
                    <p className="text-sm text-zinc-400">
                      You may designate an authorized agent to make requests on
                      your behalf. The agent must provide proof of authorization
                      (e.g., signed permission letter or power of attorney). We
                      may still require you to verify your identity directly.
                    </p>
                  </div>
                </SubSection>
              </Section>

              {/* US State Privacy Laws - NEW SECTION */}
              <Section id="state-laws" title="US State Privacy Laws">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  As of 2025, <strong className="text-violet-300">20 US states</strong> have
                  enacted comprehensive data privacy laws. While we comply with
                  federal standards and globally with GDPR/CCPA, here's how we
                  address state-specific requirements:
                </p>

                <SubSection title="States with Active Privacy Laws (2025)">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <StateLawCard
                      state="California"
                      law="CCPA/CPRA"
                      effective="2020 / 2023"
                      highlights={[
                        "Right to know, delete, opt-out",
                        "Sensitive data limitations (CPRA)",
                        "Global Privacy Control (GPC) support",
                      ]}
                    />
                    <StateLawCard
                      state="Virginia"
                      law="VCDPA"
                      effective="2023 (amended 2025)"
                      highlights={[
                        "Enhanced protections for minors",
                        "Narrowed exemptions",
                        "Universal opt-out mechanisms",
                      ]}
                    />
                    <StateLawCard
                      state="Colorado"
                      law="CPA"
                      effective="2023 (amended 2025)"
                      highlights={[
                        "Neural data protections (SB 276)",
                        "Expanded sensitive data definition",
                        "Strong data minimization requirements",
                      ]}
                    />
                    <StateLawCard
                      state="Connecticut"
                      law="CTDPA"
                      effective="2023"
                      highlights={[
                        "Children's data protections",
                        "GLBA exemption narrowed (2025)",
                        "Data security requirements",
                      ]}
                    />
                    <StateLawCard
                      state="Utah"
                      law="UCPA"
                      effective="2023"
                      highlights={[
                        "Business-friendly (least restrictive)",
                        "No private right of action",
                        "Similar rights to CCPA",
                      ]}
                    />
                    <StateLawCard
                      state="Iowa"
                      law="Iowa Consumer Data Protection Act"
                      effective="2025"
                      highlights={[
                        "Standard consumer rights",
                        "Higher thresholds than CA/VA",
                        "AG enforcement only",
                      ]}
                    />
                  </div>

                  <p className="text-zinc-400 text-sm mt-4">
                    <strong className="text-zinc-300">Additional States (2025):</strong>{" "}
                    Indiana, Tennessee, Texas, Florida, Montana, Oregon,
                    Delaware, New Hampshire, New Jersey, Kentucky, Nebraska,
                    Maryland, Minnesota, Rhode Island.
                  </p>
                </SubSection>

                <SubSection title="How We Comply Across All States">
                  <div className="space-y-3">
                    <ComplianceItem
                      icon="🔄"
                      title="Unified Approach"
                      description="We apply the highest standards globally (GDPR + CCPA/CPRA), ensuring compliance with all state laws without geographic discrimination."
                    />
                    <ComplianceItem
                      icon="🎯"
                      title="Consumer Rights"
                      description="All users (regardless of state) can access, correct, delete, and export their data. No need to prove residency."
                    />
                    <ComplianceItem
                      icon="🧒"
                      title="Minors & Children"
                      description="Enhanced protections for users under 13 (COPPA) and under 18 (state-specific). Parental consent, no targeted ads."
                    />
                    <ComplianceItem
                      icon="🛡️"
                      title="Sensitive Data"
                      description="We don't collect most sensitive categories (SSN, biometrics, precise geolocation). Neural data protections (Colorado SB 276) future-proofed."
                    />
                    <ComplianceItem
                      icon="🔒"
                      title="Data Minimization"
                      description="Collect only necessary data, anonymize when possible, delete promptly. Exceeds most state requirements."
                    />
                  </div>
                </SubSection>

                <InfoBox className="mt-6">
                  <p className="text-sm font-semibold text-violet-300 mb-2">
                    State-Specific Disclosure (CCPA Required):
                  </p>
                  <p className="text-sm text-zinc-400 mb-3">
                    <strong className="text-zinc-300">Categories of Personal Information Collected (Last
                    12 Months):</strong>
                  </p>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>
                      • <strong className="text-zinc-300">Identifiers:</strong> Email, name (optional), IP
                      address
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Commercial Information:</strong> Transaction
                      records, payment history
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Internet Activity:</strong> Pages visited, clicks,
                      session duration
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Geolocation Data:</strong> Country/region (from IP,
                      not precise GPS)
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Inferences:</strong> Preferences, likely interests
                      (for personalization)
                    </li>
                  </ul>
                  <p className="text-xs text-zinc-500 mt-2">
                    <strong>Categories NOT Collected:</strong> SSN, driver's license, biometrics,
                    health data, precise geolocation, sexual orientation, union
                    membership.
                  </p>
                </InfoBox>
              </Section>

              {/* AI Services - Enhanced */}
              <Section id="ai-services" title="AI Services & Disclaimers">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  PRAVIEL offers AI-assisted learning tools powered by
                  large language models (LLMs). Understanding the limitations,
                  risks, and data practices of AI technology is crucial for
                  informed use.
                </p>

                <WarningBox className="mb-6">
                  <p className="font-semibold mb-2 text-yellow-300">
                    Critical AI Disclaimers:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>
                      ⚠️ <strong className="text-zinc-200">Accuracy:</strong> AI-generated content may be
                      inaccurate, incomplete, misleading, or contain hallucinations
                      (false information presented confidently)
                    </li>
                    <li>
                      ⚠️ <strong className="text-zinc-200">Verification:</strong> We do NOT guarantee accuracy
                      of translations, grammar explanations, or cultural
                      information. Independently verify for academic/professional
                      use.
                    </li>
                    <li>
                      ⚠️ <strong className="text-zinc-200">Not Authoritative:</strong> Use PRAVIEL as a
                      supplementary learning tool, not as a sole source for
                      research or education
                    </li>
                    <li>
                      ⚠️ <strong className="text-zinc-200">Bias:</strong> AI models may reflect biases present in
                      training data. Content should not be treated as objective
                      truth.
                    </li>
                    <li>
                      ⚠️ <strong className="text-zinc-200">No Liability:</strong> We are not liable for errors,
                      incorrect grades, or consequences of relying on AI outputs
                      (see Terms below)
                    </li>
                  </ul>
                </WarningBox>

                <SubSection title="BYOK (Bring Your Own Key) Mode">
                  <p className="text-zinc-400 text-sm mb-4">
                    When using your own API keys for OpenAI, Anthropic, Google
                    Gemini, or ElevenLabs:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                        <span>✓</span> How BYOK Works (Privacy First)
                      </h4>
                      <ul className="text-sm text-zinc-400 space-y-2">
                        <li>
                          1. <strong className="text-zinc-300">You Provide:</strong> API keys from your
                          accounts with AI providers
                        </li>
                        <li>
                          2. <strong className="text-zinc-300">Encrypted Storage:</strong> Keys are encrypted
                          (AES-256) and stored <strong>locally on your device</strong>{" "}
                          (browser localStorage or app keychain)
                        </li>
                        <li>
                          3. <strong className="text-zinc-300">Direct Transmission:</strong> Your lesson/chat
                          requests go <strong>directly to the AI provider's API</strong>{" "}
                          from your device
                        </li>
                        <li>
                          4. <strong className="text-zinc-300">Zero Server Storage:</strong> We <strong>never
                          transmit or store</strong> your API keys on our servers
                        </li>
                        <li>
                          5. <strong className="text-zinc-300">Session Caching:</strong> Responses may be
                          temporarily cached in your browser session (cleared on
                          logout)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Third-Party AI Provider Privacy Policies
                      </h4>
                      <p className="text-sm text-zinc-400 mb-3">
                        When using BYOK, your data is subject to the provider's
                        privacy policy. Review their practices:
                      </p>
                      <ul className="text-sm space-y-1 text-zinc-500">
                        <li>
                          • <strong className="text-zinc-400">OpenAI:</strong>{" "}
                          <a
                            href="https://openai.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 underline"
                          >
                            openai.com/privacy
                          </a>{" "}
                          (API data not used for training by default)
                        </li>
                        <li>
                          • <strong className="text-zinc-400">Anthropic:</strong>{" "}
                          <a
                            href="https://www.anthropic.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 underline"
                          >
                            anthropic.com/privacy
                          </a>{" "}
                          (Zero data retention policy for API)
                        </li>
                        <li>
                          • <strong className="text-zinc-400">Google:</strong>{" "}
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 underline"
                          >
                            policies.google.com/privacy
                          </a>{" "}
                          (Gemini API data handling)
                        </li>
                      </ul>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Data Usage for AI Training">
                  <InfoBox>
                    <p className="text-sm font-semibold text-violet-300 mb-2">
                      WE DO NOT USE YOUR DATA TO TRAIN AI MODELS
                    </p>
                    <p className="text-sm text-zinc-400 mb-2">
                      Your lesson history, chat messages, exercise submissions,
                      and personal information are <strong className="text-zinc-300">never used to train or
                      fine-tune AI models</strong>, whether our own (if we develop them) or
                      third-party models.
                    </p>
                    <p className="text-sm text-zinc-400">
                      <strong className="text-zinc-300">BYOK Exception:</strong> When using your own API keys,
                      refer to your chosen AI provider's data usage policy (most
                      major providers don't use API data for training).
                    </p>
                  </InfoBox>
                </SubSection>

                <SubSection title="Prohibited Uses of AI Services">
                  <p className="text-zinc-400 text-sm mb-3">
                    You agree NOT to use our AI services to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <h5 className="text-sm font-semibold text-red-300 mb-2">
                        Security & Malice
                      </h5>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>✗ Generate malware, exploits, or hacking tools</li>
                        <li>✗ Circumvent security measures or content filters</li>
                        <li>✗ Create phishing content or scams</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <h5 className="text-sm font-semibold text-red-300 mb-2">
                        Harm & Abuse
                      </h5>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>✗ Harass, threaten, or abuse others</li>
                        <li>✗ Generate violent, hateful, or illegal content</li>
                        <li>✗ Target vulnerable individuals (children, elderly)</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <h5 className="text-sm font-semibold text-red-300 mb-2">
                        Deception
                      </h5>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>✗ Create deepfakes or impersonations</li>
                        <li>✗ Generate misleading academic content</li>
                        <li>✗ Produce fraudulent documents</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <h5 className="text-sm font-semibold text-red-300 mb-2">
                        Legal & Rights
                      </h5>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>✗ Violate intellectual property rights</li>
                        <li>✗ Breach terms of AI providers</li>
                        <li>✗ Circumvent rate limits or usage caps</li>
                      </ul>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="AI Output Ownership & Responsibility">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm text-zinc-400 mb-3">
                      <strong className="text-zinc-300">You Own Your Inputs & Outputs:</strong> You retain
                      ownership of content you submit (prompts, lesson requests)
                      and AI-generated outputs (unless they infringe third-party
                      rights).
                    </p>
                    <p className="text-sm text-zinc-400 mb-3">
                      <strong className="text-zinc-300">You Are Responsible:</strong> You are solely
                      responsible for verifying accuracy, legality, and
                      appropriateness of AI outputs before using them for
                      academic, professional, or other purposes.
                    </p>
                    <p className="text-sm text-zinc-400">
                      <strong className="text-zinc-300">No Guarantees:</strong> We make no warranties about AI
                      output quality, suitability, or fitness for any particular
                      purpose (see Terms below).
                    </p>
                  </div>
                </SubSection>
              </Section>

              {/* Terms of Service - Enhanced */}
              <Section id="terms" title="Terms of Service">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  By accessing or using PRAVIEL's website and services, you agree
                  to be bound by these Terms of Service. If you do not agree,
                  please do not use our services.
                </p>

                <SubSection title="Eligibility">
                  <p className="text-zinc-400 text-sm mb-2">
                    You must be at least <strong className="text-zinc-300">13 years old</strong> to
                    use our services (COPPA requirement). If you are under 18, you
                    represent that you have obtained parental or guardian consent.
                  </p>
                  <p className="text-zinc-400 text-xs">
                    Children under 13 may only use our services with direct
                    parental supervision and verifiable parental consent.
                  </p>
                </SubSection>

                <SubSection title="Acceptable Use Policy">
                  <p className="text-zinc-400 text-sm mb-3">
                    You agree NOT to:
                  </p>
                  <ul className="space-y-1 text-sm text-zinc-400">
                    <li>
                      • Use our services for any unlawful purpose or in violation
                      of any laws
                    </li>
                    <li>
                      • Attempt to gain unauthorized access to our systems,
                      servers, or databases
                    </li>
                    <li>
                      • Reverse engineer, decompile, or disassemble our software
                      (except as permitted by the Elastic License 2.0)
                    </li>
                    <li>
                      • Use automated tools (bots, scrapers, crawlers) without our
                      prior written consent
                    </li>
                    <li>
                      • Resell, redistribute, or commercially exploit our services
                      (see SaaS restriction below)
                    </li>
                    <li>
                      • Circumvent rate limiting, security measures, or license
                      checks
                    </li>
                    <li>
                      • Harass, abuse, or harm other users (if/when community
                      features are introduced)
                    </li>
                    <li>
                      • Submit content that is offensive, defamatory, or infringes
                      third-party rights
                    </li>
                    <li>
                      • Use our services to train competing AI models without
                      permission
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Intellectual Property & Licensing">
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Software License (Elastic License 2.0)
                      </h4>
                      <p className="text-sm text-zinc-400 mb-3">
                        The PRAVIEL application source code is licensed under the{" "}
                        <a
                          href="https://www.elastic.co/licensing/elastic-license"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 underline"
                        >
                          Elastic License 2.0
                        </a>
                        .
                      </p>
                      <p className="text-sm text-zinc-400 mb-2">
                        <strong className="text-zinc-300">Key Restrictions:</strong>
                      </p>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>
                          ✗ You may NOT provide the app/services to third parties
                          as a hosted or managed service (SaaS restriction)
                        </li>
                        <li>
                          ✗ You may NOT remove or obscure licensing or copyright
                          notices
                        </li>
                        <li>
                          ✓ You MAY use, modify, and distribute the app for
                          personal or internal business use
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Trademarks & Branding
                      </h4>
                      <p className="text-sm text-zinc-400">
                        "PRAVIEL," our logos, and related trademarks are the
                        property of Anton Soloviev. These Terms grant you no
                        ownership rights; you receive only a limited license to use
                        our services as described.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Third-Party Content Licenses
                      </h4>
                      <ul className="text-sm text-zinc-400 space-y-1">
                        <li>
                          • <strong className="text-zinc-300">Classical Texts:</strong> Perseus Digital
                          Library (CC BY-SA 3.0 license)
                        </li>
                        <li>
                          • <strong className="text-zinc-300">Lexicon Data:</strong> LSJ (Liddell-Scott-Jones)
                          Greek-English Lexicon (public domain)
                        </li>
                        <li>
                          • <strong className="text-zinc-300">Grammar References:</strong> Smyth's Greek
                          Grammar (pre-1923, public domain)
                        </li>
                      </ul>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Disclaimers & Warranties">
                  <WarningBox>
                    <p className="text-sm font-semibold mb-2 uppercase">
                      THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                    </p>
                    <p className="text-sm mb-3">
                      To the fullest extent permitted by law, we disclaim all
                      warranties, express or implied, including:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>
                        • <strong className="text-zinc-200">Merchantability:</strong> Services are suitable
                        for language learning
                      </li>
                      <li>
                        • <strong className="text-zinc-200">Fitness for a Particular Purpose:</strong>{" "}
                        Services meet your specific needs
                      </li>
                      <li>
                        • <strong className="text-zinc-200">Non-Infringement:</strong> Services don't infringe
                        third-party rights
                      </li>
                      <li>
                        • <strong className="text-zinc-200">Accuracy:</strong> AI content, translations, or
                        grammar explanations are correct
                      </li>
                      <li>
                        • <strong className="text-zinc-200">Availability:</strong> Services will be
                        uninterrupted, error-free, or secure
                      </li>
                      <li>
                        • <strong className="text-zinc-200">Results:</strong> Use of services will result in
                        language proficiency or academic success
                      </li>
                    </ul>
                    <p className="text-sm mt-3 text-zinc-300">
                      We do not warrant that third-party AI services (OpenAI,
                      Anthropic, Google) will be available, accurate, or meet your
                      expectations.
                    </p>
                  </WarningBox>
                </SubSection>

                <SubSection title="Limitation of Liability">
                  <WarningBox>
                    <p className="text-sm mb-3 uppercase font-semibold">
                      TO THE FULLEST EXTENT PERMITTED BY LAW:
                    </p>
                    <p className="text-sm mb-3">
                      We are NOT liable for indirect, incidental, consequential,
                      special, punitive, or exemplary damages, including:
                    </p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>
                        • Lost profits, revenue, or business opportunities
                      </li>
                      <li>• Loss of data, content, or lesson history</li>
                      <li>• Loss of educational opportunity or time wasted</li>
                      <li>• Costs of substitute services or tutoring</li>
                      <li>
                        • Damages from AI-generated content inaccuracies or errors
                      </li>
                      <li>• Unauthorized access to your account or data</li>
                      <li>
                        • Third-party services (AI providers, payment processors,
                        etc.)
                      </li>
                    </ul>
                    <p className="text-sm mb-3">
                      <strong className="text-yellow-300">AGGREGATE LIABILITY CAP:</strong> Our total
                      liability to you for all claims relating to the services
                      shall not exceed the greater of:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>
                        (a) <strong className="text-zinc-200">$100 USD</strong>, or
                      </li>
                      <li>
                        (b) The amount you paid us (if any) in the{" "}
                        <strong className="text-zinc-200">12 months</strong> preceding the claim
                      </li>
                    </ul>
                    <p className="text-xs text-zinc-400 mt-3">
                      Some jurisdictions do not allow exclusion or limitation of
                      incidental or consequential damages. In such jurisdictions,
                      our liability will be limited to the maximum extent permitted
                      by law.
                    </p>
                  </WarningBox>
                </SubSection>

                <SubSection title="Indemnification">
                  <p className="text-zinc-400 text-sm">
                    You agree to indemnify, defend, and hold harmless PRAVIEL and
                    Anton Soloviev from any claims, liabilities, damages, losses,
                    or expenses (including reasonable attorneys' fees) arising
                    from: (i) your violation of these Terms, (ii) your misuse of
                    our services, (iii) your violation of any third-party rights
                    (including intellectual property, privacy, or publicity
                    rights), or (iv) your violation of applicable laws or
                    regulations.
                  </p>
                </SubSection>

                <SubSection title="Governing Law & Dispute Resolution">
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Governing Law
                      </h4>
                      <p className="text-sm text-zinc-400">
                        These Terms are governed by the laws of the <strong className="text-zinc-300">United
                        States</strong> and applicable federal law, excluding conflict-of-law
                        principles. To the extent state law applies, the laws of
                        the state where the dispute arises or where you reside will
                        govern, as determined by a court of competent jurisdiction.
                      </p>
                      <p className="text-xs text-zinc-500 mt-2">
                        <em>
                          Note: We have not specified a single state to provide
                          flexibility for users across all US states. Applicable
                          consumer protection laws (including state privacy laws)
                          remain enforceable.
                        </em>
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Informal Resolution (Required First Step)
                      </h4>
                      <p className="text-sm text-zinc-400">
                        Before filing a lawsuit or arbitration, you agree to
                        attempt informal resolution by contacting us at{" "}
                        <a
                          href="mailto:business@praviel.com"
                          className="text-violet-400 hover:text-violet-300 underline"
                        >
                          business@praviel.com
                        </a>{" "}
                        with a detailed description of the dispute. We will respond
                        within 30 days and work in good faith to resolve the issue.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Jurisdiction
                      </h4>
                      <p className="text-sm text-zinc-400">
                        Any disputes arising from these Terms or the services shall
                        be resolved in the federal or state courts of competent
                        jurisdiction, and you consent to personal jurisdiction in
                        those courts, unless applicable consumer law requires
                        otherwise (e.g., EU users may sue in their local courts
                        under GDPR).
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        Class Action Waiver
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        You agree to resolve disputes individually and waive any
                        right to participate in class actions, class arbitrations,
                        or representative actions.
                      </p>
                      <p className="text-xs text-zinc-500">
                        <strong>Exception:</strong> This waiver does not apply where prohibited
                        by law (e.g., some consumer protection laws in certain
                        states/countries).
                      </p>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Modifications to Services & Terms">
                  <p className="text-zinc-400 text-sm mb-3">
                    <strong className="text-zinc-300">Service Changes:</strong> We may modify, suspend,
                    or discontinue any part of our services at any time without
                    notice. We are not liable for any modifications or
                    discontinuations.
                  </p>
                  <p className="text-zinc-400 text-sm mb-3">
                    <strong className="text-zinc-300">Terms Updates:</strong> We may update these Terms by
                    posting a new version with an updated "Effective Date."
                    Material changes will be communicated via email (if you have an
                    account) or prominent site notice.
                  </p>
                  <p className="text-zinc-400 text-sm">
                    <strong className="text-zinc-300">Your Options:</strong> Continued use after changes
                    constitutes acceptance. If you disagree, you must stop using
                    our services.
                  </p>
                </SubSection>
              </Section>

              {/* Children's Privacy - Enhanced */}
              <Section id="children" title="Children's Privacy (COPPA Compliance)">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We take children's privacy seriously and comply with the
                  Children's Online Privacy Protection Act (COPPA) and similar
                  state laws (e.g., California COPPA, Virginia minor protections).
                </p>

                <InfoBox className="mb-6">
                  <p className="text-sm mb-2">
                    <strong className="text-violet-300">Age Restriction:</strong> Our services are
                    intended for users aged <strong>13 years and older</strong>.
                  </p>
                  <p className="text-sm">
                    We do not knowingly collect personal information from children
                    under 13 without verifiable parental consent. If we learn we
                    have collected such information, we will delete it within{" "}
                    <strong>48 hours</strong>.
                  </p>
                </InfoBox>

                <SubSection title="Parental Rights (COPPA)">
                  <p className="text-zinc-400 text-sm mb-3">
                    If you are a parent or guardian and believe your child (under
                    13) has provided personal information to us, you have the right
                    to:
                  </p>
                  <div className="space-y-3">
                    <ParentalRightItem
                      icon="👁️"
                      title="Review"
                      description="Request to see what data we have about your child (specific details, not aggregate)"
                    />
                    <ParentalRightItem
                      icon="🗑️"
                      title="Delete"
                      description="Request deletion of your child's data (we will delete within 48 hours)"
                    />
                    <ParentalRightItem
                      icon="🚫"
                      title="Refuse Further Collection"
                      description="Opt your child out of further data collection (we will block account access)"
                    />
                    <ParentalRightItem
                      icon="↩️"
                      title="Revoke Consent"
                      description="Withdraw any consent previously provided (same as deletion + refusal)"
                    />
                  </div>
                  <p className="text-zinc-400 text-sm mt-4">
                    <strong className="text-zinc-300">How to Exercise:</strong> Email us at{" "}
                    <a
                      href="mailto:support@praviel.com"
                      className="text-violet-400 hover:text-violet-300 underline"
                    >
                      support@praviel.com
                    </a>{" "}
                    with subject "COPPA Request" and provide:
                  </p>
                  <ul className="text-xs text-zinc-500 mt-2 space-y-1">
                    <li>1. Your relationship to the child (parent/guardian)</li>
                    <li>2. Child's email or username (if known)</li>
                    <li>
                      3. Verification of parental status (e.g., signed consent form,
                      ID redacted except name)
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="What Data We Collect from Children (If Any)">
                  <p className="text-zinc-400 text-sm mb-3">
                    If a child (under 13) uses our services with parental consent:
                  </p>
                  <DataTable
                    headers={["Data Type", "Collected?", "Purpose"]}
                    rows={[
                      [
                        "Email",
                        "Yes (with consent)",
                        "Account management, parental communication",
                      ],
                      [
                        "Name",
                        "Optional",
                        "Personalization (if parent provides)",
                      ],
                      [
                        "Lesson History",
                        "Yes",
                        "Track progress, improve education",
                      ],
                      [
                        "Chat Logs",
                        "No",
                        "Not saved for children under 13",
                      ],
                      [
                        "Payment Info",
                        "No",
                        "Must be provided by parent",
                      ],
                      [
                        "Location",
                        "No",
                        "Not collected for children",
                      ],
                    ]}
                  />
                </SubSection>

                <SubSection title="Additional Protections for Minors (13-17)">
                  <p className="text-zinc-400 text-sm mb-3">
                    For users aged 13-17 (not subject to COPPA but to state minor
                    protection laws like VCDPA, CPA):
                  </p>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>
                      • <strong className="text-zinc-300">No Targeted Advertising:</strong> We don't show
                      targeted ads to minors (we don't show ads at all)
                    </li>
                    <li>
                      • <strong className="text-zinc-300">No Data Sale:</strong> Prohibition on selling
                      minor data (we don't sell any data)
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Enhanced Security:</strong> Same security measures
                      as adults (encryption, access controls)
                    </li>
                    <li>
                      • <strong className="text-zinc-300">Parental Notification:</strong> Parents may request
                      access to minor's data (ages 13-17)
                    </li>
                  </ul>
                </SubSection>
              </Section>

              {/* International Transfers - Enhanced */}
              <Section id="international" title="International Data Transfers">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  PRAVIEL operates from the United States. If you access our
                  services from outside the U.S., your data may be transferred to,
                  stored, and processed in the U.S. or other countries where our
                  service providers operate.
                </p>

                <SubSection title="For EU/UK/EEA Users (GDPR Chapter V)">
                  <p className="text-zinc-400 text-sm mb-3">
                    When we transfer your data outside the European Economic Area
                    (EEA), we rely on appropriate safeguards as required by GDPR
                    Articles 44-50:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2 flex items-center gap-2">
                        <span>🔒</span> Standard Contractual Clauses (SCCs)
                      </h4>
                      <p className="text-sm text-zinc-400">
                        We use EU-approved Standard Contractual Clauses (2021/914
                        decision) with all non-EU processors. SCCs legally bind
                        processors to GDPR-equivalent protections, even in countries
                        without adequacy decisions.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2 flex items-center gap-2">
                        <span>🌐</span> Adequacy Decisions
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        Where applicable, we rely on European Commission adequacy
                        decisions (countries deemed to provide adequate data
                        protection):
                      </p>
                      <ul className="text-xs text-zinc-500 space-y-1">
                        <li>
                          • <strong className="text-zinc-400">EU-US Data Privacy Framework</strong> (if
                          our processors are certified participants)
                        </li>
                        <li>
                          • <strong className="text-zinc-400">UK Extension to International Data Transfer
                          Agreement</strong>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2 flex items-center gap-2">
                        <span>🛡️</span> Processor Safeguards
                      </h4>
                      <p className="text-sm text-zinc-400">
                        Our cloud providers (Cloudflare, Vercel, Neon) comply with
                        GDPR and offer:
                      </p>
                      <ul className="text-xs text-zinc-500 space-y-1 mt-2">
                        <li>• Data Processing Agreements (DPAs) with SCCs</li>
                        <li>
                          • Technical measures (encryption, pseudonymization)
                        </li>
                        <li>
                          • Organizational measures (access controls, staff
                          training)
                        </li>
                        <li>
                          • Commitments not to disclose data to governments without
                          legal basis
                        </li>
                      </ul>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Data Storage Locations">
                  <DataTable
                    headers={["Data Type", "Primary Location", "Backup Location"]}
                    rows={[
                      [
                        "Account Data",
                        "US (Neon PostgreSQL)",
                        "Encrypted backups (EU/US data centers)",
                      ],
                      [
                        "Website Assets",
                        "Global CDN (Cloudflare)",
                        "Cached at edge locations worldwide",
                      ],
                      [
                        "Transactional Emails",
                        "US (SendGrid/Mailgun)",
                        "Not backed up (delivered and deleted)",
                      ],
                      [
                        "Analytics",
                        "US (privacy-focused tools)",
                        "Aggregated, anonymized (no PII)",
                      ],
                    ]}
                  />
                </SubSection>

                <SubSection title="Compliance with Local Laws">
                  <p className="text-zinc-400 text-sm mb-3">
                    If you access our services from outside the U.S., you are
                    responsible for compliance with your local laws regarding:
                  </p>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    <li>• Data transmission across borders</li>
                    <li>
                      • Use of online services and acceptance of foreign terms
                    </li>
                    <li>
                      • Currency exchange and international payments (if applicable)
                    </li>
                    <li>
                      • Export controls (U.S. restrictions on certain countries)
                    </li>
                  </ul>
                </SubSection>

                <InfoBox className="mt-6">
                  <p className="text-sm">
                    <strong className="text-violet-300">Export Compliance:</strong> You may not use,
                    export, or re-export our services in violation of U.S. export
                    laws or regulations, including to countries subject to U.S.
                    sanctions (e.g., Cuba, Iran, North Korea, Syria, certain
                    regions of Ukraine).
                  </p>
                </InfoBox>
              </Section>

              {/* Changes - Enhanced */}
              <Section id="changes" title="Policy Updates & Change Log">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  We may update this Privacy Policy and Terms of Service from time
                  to time to reflect changes in our practices, technology, legal
                  requirements, or other factors. We are committed to transparency
                  about changes.
                </p>

                <SubSection title="How We Notify You of Changes">
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        1. Material Changes (High Impact)
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        For significant changes (e.g., new data collection
                        practices, changes to data sharing, reduced user rights):
                      </p>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>
                          • <strong className="text-zinc-300">Email Notification:</strong> Sent to all
                          registered users 30 days before effective date
                        </li>
                        <li>
                          • <strong className="text-zinc-300">Prominent Website Banner:</strong> Displayed on
                          homepage and in app
                        </li>
                        <li>
                          • <strong className="text-zinc-300">Consent Required:</strong> For material changes
                          that require opt-in (e.g., new uses of sensitive data)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-violet-300 mb-2">
                        2. Non-Material Changes (Low Impact)
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        For minor changes (e.g., clarifications, added contact
                        information, fixed typos):
                      </p>
                      <ul className="text-xs text-zinc-400 space-y-1">
                        <li>
                          • <strong className="text-zinc-300">Updated "Effective Date":</strong> Displayed at
                          top of this document
                        </li>
                        <li>
                          • <strong className="text-zinc-300">Change Log:</strong> Documented below (no email
                          notification)
                        </li>
                      </ul>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Your Options After Changes">
                  <InfoBox>
                    <p className="text-sm mb-2">
                      <strong className="text-violet-300">Option 1: Accept Changes</strong>
                    </p>
                    <p className="text-sm text-zinc-400 mb-3">
                      Continued use of our services after the effective date
                      constitutes acceptance of the new policy.
                    </p>
                    <p className="text-sm mb-2">
                      <strong className="text-violet-300">Option 2: Object & Delete Account</strong>
                    </p>
                    <p className="text-sm text-zinc-400">
                      If you disagree with material changes, you may delete your
                      account or stop using our services. Your data will be deleted
                      as described in the Data Retention section above.
                    </p>
                  </InfoBox>
                </SubSection>

                <SubSection title="Change History">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm">
                      <div className="flex-shrink-0 w-32 text-zinc-500">
                        Oct 27, 2025
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-zinc-300">
                          Version 1.0
                        </span>{" "}
                        <span className="text-zinc-400">
                          - Initial publication. Comprehensive coverage of GDPR,
                          CCPA, and 20 US state privacy laws (2025 updates).
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 mt-4 italic">
                      (Future updates will be documented here with version numbers
                      and summaries)
                    </p>
                  </div>
                </SubSection>
              </Section>

              {/* Contact - Enhanced */}
              <Section id="contact" title="Contact Us">
                <p className="text-zinc-300 leading-relaxed mb-6">
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy, your data, or our Terms of Service, please
                  contact us through the appropriate channel:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <ContactCard
                    title="Privacy & Data Rights Requests"
                    email="support@praviel.com"
                    description="For GDPR/CCPA requests (access, deletion, correction, data portability), privacy questions, or data breach concerns."
                    responseTime="Within 30 days (GDPR) / 45 days (CCPA)"
                  />
                  <ContactCard
                    title="General Business & Legal"
                    email="business@praviel.com"
                    description="For partnership inquiries, licensing questions, legal notices, or general business communications."
                    responseTime="5-7 business days"
                  />
                  <ContactCard
                    title="COPPA / Parental Rights"
                    email="support@praviel.com"
                    description='For parental requests regarding children under 13. Use subject "COPPA Request" and provide verification of parental status.'
                    responseTime="Within 48 hours for deletion requests"
                  />
                  <ContactCard
                    title="Security & Breach Reporting"
                    email="security@praviel.com"
                    description="For reporting security vulnerabilities, potential data breaches, or urgent security concerns (confidential)."
                    responseTime="Acknowledged within 24 hours"
                  />
                </div>

                <InfoBox className="mt-8">
                  <p className="text-sm mb-3">
                    <strong className="text-violet-300">Non-Sensitive Technical Issues:</strong>
                  </p>
                  <p className="text-sm text-zinc-400 mb-3">
                    For non-sensitive technical issues, feature requests, or bug
                    reports (no personal data), you may open an issue on our GitHub
                    repository:
                  </p>
                  <a
                    href="https://github.com/antonsoo/praviel/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 underline text-sm"
                  >
                    github.com/antonsoo/praviel/issues
                  </a>
                </InfoBox>

                <SubSection title="Data Controller Information">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Legal Name</p>
                        <p className="text-zinc-300">Anton Soloviev</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">
                          Doing Business As
                        </p>
                        <p className="text-zinc-300">PRAVIEL</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">
                          Business Type
                        </p>
                        <p className="text-zinc-300">Sole Proprietor</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Location</p>
                        <p className="text-zinc-300">United States</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Website</p>
                        <a
                          href="https://praviel.com"
                          className="text-violet-400 hover:text-violet-300 underline"
                        >
                          praviel.com
                        </a>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Repository</p>
                        <a
                          href="https://github.com/antonsoo/praviel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 underline"
                        >
                          github.com/antonsoo/praviel
                        </a>
                      </div>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="EU Representative (If Required)">
                  <p className="text-zinc-400 text-sm">
                    <em>
                      Under GDPR Article 27, non-EU controllers must appoint an EU
                      representative if they offer goods/services to EU residents
                      or monitor their behavior. If our EU user base exceeds
                      relevant thresholds, we will appoint a representative and
                      list their contact information here.
                    </em>
                  </p>
                  <p className="text-zinc-400 text-xs mt-2">
                    Current status: Not yet required (monitoring EU user base).
                  </p>
                </SubSection>

                <SubSection title="Data Protection Officer (DPO)">
                  <p className="text-zinc-400 text-sm">
                    <em>
                      Under GDPR Article 37, organizations must appoint a Data
                      Protection Officer if they engage in large-scale processing
                      of sensitive data or systematic monitoring. Currently, Anton
                      Soloviev serves as the data controller and handles all data
                      protection matters. If required, we will appoint a dedicated
                      DPO.
                    </em>
                  </p>
                </SubSection>
              </Section>

              {/* Footer Acknowledgment */}
              <motion.div
                className="border-t border-white/10 pt-8 mt-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-zinc-500 text-sm mb-4">
                  By using PRAVIEL's website and services, you acknowledge that you
                  have read, understood, and agree to be bound by this Privacy
                  Policy and Terms of Service.
                </p>
                <p className="text-zinc-600 text-xs mb-6">
                  This document was crafted with care to provide transparency and
                  protect your rights. We believe privacy is a fundamental right,
                  not a luxury.
                </p>
                <motion.div
                  className="inline-flex items-center gap-2 text-xs text-violet-400/60"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span>©</span>
                  <span><CurrentYear /></span>
                  <span>Anton Soloviev. All rights reserved.</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile TOC Component */}
        <MobileTOC
          sections={SECTIONS}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  );
}

// ============================================================================
// Component Helpers
// ============================================================================

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 print:break-inside-avoid"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent print:text-black">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </motion.section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-violet-300 mb-4 print:text-black">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-violet-500/10 border border-violet-500/20 rounded-lg p-4 text-zinc-300 print:border-gray-400 print:bg-gray-50 ${className}`}
    >
      {children}
    </div>
  );
}

function WarningBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-zinc-300 print:border-yellow-600 print:bg-yellow-50 ${className}`}
    >
      {children}
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 print:border-gray-300">
      <table className="w-full text-sm">
        <thead className="bg-violet-500/10 border-b border-white/10 print:bg-gray-100 print:border-gray-300">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-violet-300 print:text-black"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/5 hover:bg-white/5 transition-colors print:border-gray-200"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-zinc-400 print:text-black">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsageCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-white/10 rounded-lg p-5 hover:border-violet-500/30 transition-all print:border-gray-300 print:bg-gray-50"
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold text-violet-200 mb-2 print:text-black">
        {title}
      </h4>
      <p className="text-sm text-zinc-400 print:text-gray-700">{description}</p>
    </motion.div>
  );
}

function SharingItem({
  title,
  description,
  items,
  safeguards,
}: {
  title: string;
  description: string;
  items: string[];
  safeguards?: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 print:border-gray-300 print:bg-gray-50">
      <h4 className="font-semibold text-violet-300 mb-2 print:text-black">
        {title}
      </h4>
      <p className="text-sm text-zinc-400 mb-3 print:text-gray-700">
        {description}
      </p>
      <ul className="space-y-1 text-sm text-zinc-500 mb-3 print:text-gray-600">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
      {safeguards && (
        <p className="text-xs text-violet-400 bg-violet-500/10 rounded px-2 py-1 inline-block print:text-black print:bg-gray-200">
          🔒 {safeguards}
        </p>
      )}
    </div>
  );
}

function SecurityCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-5 print:border-gray-300 print:bg-gray-50">
      <h4 className="font-semibold text-green-300 mb-3 print:text-black">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-zinc-400 print:text-gray-700">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5 print:text-black">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RightItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 pb-3 border-b border-white/5 last:border-0 print:border-gray-200">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 text-xs font-bold mt-0.5 print:bg-gray-200 print:text-black">
        ✓
      </div>
      <div>
        <h4 className="font-semibold text-violet-200 text-sm mb-1 print:text-black">
          {title}
        </h4>
        <p className="text-sm text-zinc-400 print:text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

function StateLawCard({
  state,
  law,
  effective,
  highlights,
}: {
  state: string;
  law: string;
  effective: string;
  highlights: string[];
}) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 print:border-gray-300 print:bg-gray-50">
      <h4 className="font-semibold text-blue-300 mb-1 print:text-black">
        {state}
      </h4>
      <p className="text-xs text-zinc-500 mb-2 print:text-gray-600">
        {law} • Effective: {effective}
      </p>
      <ul className="text-xs text-zinc-400 space-y-1 print:text-gray-700">
        {highlights.map((highlight, i) => (
          <li key={i}>• {highlight}</li>
        ))}
      </ul>
    </div>
  );
}

function ComplianceItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-violet-300 mb-1 print:text-black">
          {title}
        </h4>
        <p className="text-sm text-zinc-400 print:text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

function ContactCard({
  title,
  email,
  description,
  responseTime,
}: {
  title: string;
  email: string;
  description: string;
  responseTime: string;
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-5 hover:border-blue-400/40 transition-all print:border-gray-300 print:bg-gray-50"
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="font-semibold text-blue-300 mb-2 print:text-black">
        {title}
      </h4>
      <a
        href={`mailto:${email}`}
        className="text-violet-400 hover:text-violet-300 underline text-sm block mb-3 print:text-black"
      >
        {email}
      </a>
      <p className="text-sm text-zinc-400 mb-3 print:text-gray-700">
        {description}
      </p>
      <p className="text-xs text-zinc-500 print:text-gray-600">
        <strong className="text-zinc-400 print:text-black">Response time:</strong>{" "}
        {responseTime}
      </p>
    </motion.div>
  );
}

function SummaryItem({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 items-start bg-black/20 rounded-lg p-3">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-violet-200 text-sm mb-1">{title}</h4>
        <p className="text-xs text-zinc-400">{text}</p>
      </div>
    </div>
  );
}

function ParentalRightItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-lg p-3 print:border-gray-300 print:bg-gray-50">
      <div className="flex-shrink-0 text-xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-violet-300 text-sm mb-1 print:text-black">
          {title}
        </h4>
        <p className="text-xs text-zinc-400 print:text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}
