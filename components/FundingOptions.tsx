"use client";

import type { ReactNode } from "react";

type Platform = {
  name: string;
  description: string;
  url: string;
  icon: ReactNode;
  color: string;
  ringColor: string;
  hoverBg: string;
  hoverBorder: string;
};

const recurringPlatforms: Platform[] = [
  {
    name: "GitHub Sponsors",
    description:
      "For developers who want to keep the open-core infrastructure alive. Funds CI, hosting, and scholarship stipends.",
    url: "https://github.com/sponsors/antonsoo",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: "from-gray-500 to-gray-600",
    ringColor: "ring-gray-500/40",
    hoverBg: "hover:bg-gray-500/5",
    hoverBorder: "hover:border-gray-400/30",
  },
  {
    name: "Patreon",
    description:
      "patreon.com/AntonSoloviev — monthly pledges unlock roadmap briefings, AMAs, and quarterly philology workshops.",
    url: "https://www.patreon.com/AntonSoloviev",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
      </svg>
    ),
    color: "from-orange-500 to-red-500",
    ringColor: "ring-orange-500/40",
    hoverBg: "hover:bg-orange-500/5",
    hoverBorder: "hover:border-orange-400/30",
  },
  {
    name: "Open Collective",
    description:
      "Transparent ledger for labs, DAOs, and universities. Every manuscript acquisition and GPU hour is itemized.",
    url: "https://opencollective.com/antonsoloviev",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
        <circle cx="12" cy="12" r="5" fill="currentColor" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500",
    ringColor: "ring-blue-500/40",
    hoverBg: "hover:bg-blue-500/5",
    hoverBorder: "hover:border-blue-400/30",
  },
  {
    name: "Liberapay",
    description:
      "Privacy-friendly recurring tips routed straight into linguist retainers, OCR pipelines, and hosting.",
    url: "https://liberapay.com/antonsoloviev",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M5 3.5A2.5 2.5 0 0 1 7.5 1H9a2 2 0 0 1 2 2v18h-2V9.5L5 21H2.5L5 3.5Zm9.25 0c0-.966.784-1.75 1.75-1.75h.5c.966 0 1.75.784 1.75 1.75V9h1.25A2.5 2.5 0 0 1 22 11.5v2c0 1.38-1.12 2.5-2.5 2.5H19v5h-2.5V3.5h-2.25Z" />
      </svg>
    ),
    color: "from-amber-500 to-yellow-500",
    ringColor: "ring-amber-500/40",
    hoverBg: "hover:bg-amber-500/5",
    hoverBorder: "hover:border-amber-400/30",
  },
];

const oneTimePlatforms: Platform[] = [
  {
    name: "Stripe Checkout",
    description:
      "One-time contribution (Stripe) for philanthropies and angel funds that need PDF receipts instantly.",
    url: "https://buy.stripe.com/6oU8wOfCe7ccbhefx0ew800",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M21 7c0-3.313-2.687-6-6-6H9C5.687 1 3 3.687 3 7v10c0 3.313 2.687 6 6 6h6c3.313 0 6-2.687 6-6V7Zm-9 11c-2.206 0-4-1.343-4-3h2c0 .551.897 1 2 1s2-.449 2-1-1.056-.897-2.356-1.238C9.668 13.256 8 12.709 8 11c0-1.657 1.794-3 4-3s4 1.343 4 3h-2c0-.551-.897-1-2-1s-2 .449-2 1c0 .406 1.056.897 2.356 1.238C14.332 12.744 16 13.291 16 15c0 1.657-1.794 3-4 3Z" />
      </svg>
    ),
    color: "from-purple-500 to-violet-500",
    ringColor: "ring-purple-500/40",
    hoverBg: "hover:bg-purple-500/5",
    hoverBorder: "hover:border-purple-400/30",
  },
  {
    name: "Ko-fi",
    description: "ko-fi.com/antonsoloviev — fund the next OCR sprint or digitization trip.",
    url: "https://ko-fi.com/antonsoloviev",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
      </svg>
    ),
    color: "from-cyan-500 to-sky-500",
    ringColor: "ring-cyan-500/40",
    hoverBg: "hover:bg-cyan-500/5",
    hoverBorder: "hover:border-cyan-400/30",
  },
  {
    name: "PayPal · Anton",
    description: "Direct PayPal.me/AntonS0 link for individuals covering manuscripts or travel.",
    url: "https://paypal.me/AntonS0",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M6.5 3A3.5 3.5 0 0 0 3 6.5v11A3.5 3.5 0 0 0 6.5 21h11a3.5 3.5 0 0 0 3.5-3.5v-11A3.5 3.5 0 0 0 17.5 3h-11Zm3.25 4.5h4.5a2.25 2.25 0 0 1 0 4.5h-2.5V16H9.75V7.5Zm2 2v1.5h2a.75.75 0 0 0 0-1.5h-2Z" />
      </svg>
    ),
    color: "from-sky-500 to-blue-500",
    ringColor: "ring-sky-500/40",
    hoverBg: "hover:bg-sky-500/5",
    hoverBorder: "hover:border-sky-400/30",
  },
  {
    name: "PayPal · Ancient Languages App",
    description:
      "Departmental PayPal channel for institutions that need receipts under the project name.",
    url: "https://paypal.me/ancientlanguagesapp",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 2c-5.523 0-10 3.806-10 8.5S6.477 19 12 19c1.343 0 2.63-.205 3.807-.586l4.033 3.272c.676.549 1.66-.144 1.33-.94l-1.777-4.224C20.53 15.024 22 12.888 22 10.5 22 5.806 17.523 2 12 2Zm-2 5.5h4.5a2.5 2.5 0 0 1 0 5h-2V16H10V7.5Zm2 1.5v1.5h2a.75.75 0 0 0 0-1.5h-2Z" />
      </svg>
    ),
    color: "from-indigo-500 to-blue-600",
    ringColor: "ring-indigo-500/40",
    hoverBg: "hover:bg-indigo-500/5",
    hoverBorder: "hover:border-indigo-400/30",
  },
];

const supportSections = [
  {
    title: "Recurring support",
    subtitle: "Sustain the research agenda with predictable monthly funding.",
    platforms: recurringPlatforms,
  },
  {
    title: "One-time contributions",
    subtitle: "Fund manuscript digitization, compute, or field work in a single gesture.",
    platforms: oneTimePlatforms,
  },
];

export default function FundingOptions() {
  return (
    <section className="relative px-6 pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#E8C55B]/5 to-transparent" />

      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E8C55B]">
            Choose your rail
          </p>
          <h2 className="text-3xl font-bold text-zinc-50 sm:text-4xl">
            The easiest way to keep 5,000 years of memory online
          </h2>
          <p className="text-sm text-zinc-400">
            All links mirror the canonical list in docs/archive/imported-docs-from-main-repo/FUNDING.yml so
            every contribution maps one-to-one with the open ledger.
          </p>
        </div>

        {supportSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                <p className="text-sm text-zinc-400">{section.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] p-6 ring-1 ${platform.ringColor} backdrop-blur transition-all ${platform.hoverBg} ${platform.hoverBorder} hover:scale-[1.02] hover:shadow-lg`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${platform.color} p-2 text-white shadow-lg`}
                  >
                    {platform.icon}
                  </div>

                  <h4 className="text-base font-semibold text-zinc-100">{platform.name}</h4>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-400">{platform.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-violet-300 group-hover:text-violet-200">
                    <span>Support via {platform.name}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6 text-center ring-1 ring-violet-500/30 backdrop-blur">
          <h3 className="text-sm font-semibold text-violet-200">Enterprise or institutional support?</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            Universities, cultural ministries, and research consortia can request invoices or bespoke scopes of work.
          </p>
          <a
            href="mailto:business@praviel.com"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
          >
            business@praviel.com
          </a>
        </div>
      </div>
    </section>
  );
}
