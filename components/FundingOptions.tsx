"use client";

export default function FundingOptions() {
  const platforms = [
    {
      name: "GitHub Sponsors",
      description:
        "Monthly support directly through GitHub. Ideal for developers who want to contribute to open-source infrastructure.",
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
        "Recurring monthly pledges with exclusive updates and early access to new features. Join the inner circle.",
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
      name: "Ko-fi",
      description:
        "Buy us a coffee (or several). One-time donations to fuel late-night coding sessions and linguistic research.",
      url: "https://ko-fi.com/antonsoloviev",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
        </svg>
      ),
      color: "from-sky-400 to-blue-500",
      ringColor: "ring-sky-500/40",
      hoverBg: "hover:bg-sky-500/5",
      hoverBorder: "hover:border-sky-400/30",
    },
    {
      name: "Open Collective",
      description:
        "Transparent funding for the community. See exactly how your contribution is used to build the future of ancient language education.",
      url: "https://opencollective.com/antonsoloviev",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.54 0 4.894-.79 6.834-2.135l-3.107-3.109a7.715 7.715 0 1 1 0-13.512l3.107-3.109A11.943 11.943 0 0 0 12 0zm9.865 5.166l-3.109 3.107A7.67 7.67 0 0 1 19.715 12a7.682 7.682 0 0 1-.959 3.727l3.109 3.107A11.943 11.943 0 0 0 24 12c0-2.54-.79-4.894-2.135-6.834z" />
        </svg>
      ),
      color: "from-blue-400 to-indigo-500",
      ringColor: "ring-blue-500/40",
      hoverBg: "hover:bg-blue-500/5",
      hoverBorder: "hover:border-blue-400/30",
    },
    {
      name: "Liberapay",
      description:
        "Recurrent donations with no platform fees. Your contribution goes directly toward development and linguistic research.",
      url: "https://liberapay.com/antonsoloviev",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M0 0v24h24V0H0zm5.256 17.475V6.525h3.743c3.963 0 5.794 1.738 5.794 4.368 0 2.367-1.52 3.827-4.108 4.203l-.365.05v.03c2.528.424 3.935 1.835 3.935 4.084 0 2.806-1.814 4.74-5.878 4.74H5.256v-6.525zm3.487-8.415h-.928v3.095h.928c1.245 0 1.926-.618 1.926-1.548 0-.93-.68-1.547-1.926-1.547zm.083 5.643h-1.011v3.51h1.011c1.378 0 2.125-.723 2.125-1.754 0-1.031-.747-1.756-2.125-1.756z" />
        </svg>
      ),
      color: "from-yellow-400 to-amber-500",
      ringColor: "ring-yellow-500/40",
      hoverBg: "hover:bg-yellow-500/5",
      hoverBorder: "hover:border-yellow-400/30",
    },
    {
      name: "Stripe",
      description:
        "Secure one-time or recurring payments via credit card. Quick checkout with full payment processing security.",
      url: "https://buy.stripe.com/6oU8wOfCe7ccbhefx0ew800",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
        </svg>
      ),
      color: "from-violet-400 to-purple-500",
      ringColor: "ring-violet-500/40",
      hoverBg: "hover:bg-violet-500/5",
      hoverBorder: "hover:border-violet-400/30",
    },
    {
      name: "PayPal",
      description:
        "Instant donations via PayPal. Worldwide payment processing for those who prefer this trusted platform.",
      url: "https://paypal.me/AntonS0",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      ringColor: "ring-blue-500/40",
      hoverBg: "hover:bg-blue-500/5",
      hoverBorder: "hover:border-blue-400/30",
    },
  ];

  return (
    <section className="relative z-10 px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Choose Your Platform
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Every contribution, no matter the size, helps preserve humanity's
            linguistic heritage
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
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

              <h3 className="text-base font-semibold text-zinc-100">
                {platform.name}
              </h3>

              <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-400">
                {platform.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-violet-300 group-hover:text-violet-200">
                <span>Support via {platform.name}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6 text-center ring-1 ring-violet-500/30 backdrop-blur">
          <h3 className="text-sm font-semibold text-violet-200">
            Enterprise or Institutional Support?
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            For universities, research institutions, or corporate partnerships,
            please reach out directly:
          </p>
          <a
            href="mailto:business@praviel.com"
            className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
          >
            business@praviel.com
          </a>
        </div>
      </div>
    </section>
  );
}
