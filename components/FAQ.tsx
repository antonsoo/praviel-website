import { faqEntries } from "@/lib/canonicalCopy";

export default function FAQ() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 content-visibility-auto sm:py-32"
      aria-labelledby="faq-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#CD5C5C]/6 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 sm:mb-16 text-center px-4">
          <h2 id="faq-title" className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#E8C55B] to-[#CD5C5C] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-base text-zinc-300 sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about learning ancient languages with PRAVIEL
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqEntries.map((faq) => (
            <details key={faq.question} className="faq-item group rounded-xl border border-zinc-800/50 bg-zinc-900/70 backdrop-blur-sm">
              <summary className="faq-summary">
                <span className="text-base font-semibold text-white sm:text-lg">{faq.question}</span>
                <span className="faq-icon" aria-hidden>
                  <svg className="h-4 w-4 text-[#E8C55B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="faq-answer text-sm text-zinc-400 sm:text-base">{faq.answer}</div>
            </details>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/6 to-[#3b82f6]/8 p-8 text-center">
          <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
          <p className="mt-3 text-zinc-400">
            Join our Discord community, reach out directly, or support our mission.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://discord.gg/fMkF4Yza6B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#5865F2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4752C4]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
            <a
              href="/fund"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A572] px-6 py-3 text-sm font-semibold text-black transition hover:shadow-lg hover:shadow-[#D4AF37]/40"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
