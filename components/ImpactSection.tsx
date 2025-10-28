"use client";

export default function ImpactSection() {
  const impacts = [
    {
      title: "Linguistic Infrastructure",
      description:
        "Server costs, database hosting, and API infrastructure to deliver instant morphological analysis for 46 ancient languages.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-10 4h.01"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Expert Validation",
      description:
        "Contract PhD linguists to validate morphological data, curate authentic texts, and ensure research-grade accuracy.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Expanded Language Coverage",
      description:
        "Add support for more ancient languages and dialects. Sumerian, Hittite, Ugaritic, and beyond.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Mobile Development",
      description:
        "Accelerate iOS and Android app development to bring ancient languages to your pocket, not just your browser.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Educational Partnerships",
      description:
        "Work with universities and divinity schools to integrate PRAVIEL into academic curricula worldwide.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Open Source Forever",
      description:
        "Keep PRAVIEL free and open source. No paywalls, no data mining, no compromises on accessibility.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative px-6 pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Where Your Support Goes
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            100% transparent allocation toward building the future of ancient
            language education
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((impact) => (
            <div
              key={impact.title}
              className="group relative flex flex-col rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] p-6 ring-1 ring-white/5 backdrop-blur transition-colors hover:border-violet-400/30 hover:bg-violet-500/5 hover:ring-violet-500/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-accent-soft)] text-violet-300 ring-1 ring-[color:var(--color-accent)]/40">
                {impact.icon}
              </div>

              <h3 className="text-sm font-semibold text-zinc-100">
                {impact.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-6 text-center">
          <div className="rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] p-8 ring-1 ring-white/5 backdrop-blur">
            <blockquote className="text-sm italic leading-relaxed text-zinc-300">
              "Every ancient text is a conversation across millennia. When we
              lose access to these languages, we lose entire conceptual
              frameworks, rhetorical traditions, and direct connections to our
              ancestors. Supporting PRAVIEL means preserving the full depth of
              human wisdom for future generations."
            </blockquote>
            <div className="mt-4 text-xs text-zinc-500">
              — The PRAVIEL Mission
            </div>
          </div>

          <div className="rounded-2xl border border-green-400/20 bg-green-500/5 p-6 ring-1 ring-green-500/30 backdrop-blur">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-green-200">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Tax-Deductible (U.S. 501(c)(3) status pending)</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              We're working toward non-profit status. Check back for updates on
              tax-deductible contributions.
            </p>
          </div>

          <p className="text-xs text-zinc-600">
            Questions about funding or how your contribution is used?
            <br />
            Email{" "}
            <a
              href="mailto:business@praviel.com"
              className="text-violet-400 hover:text-violet-300"
            >
              business@praviel.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
