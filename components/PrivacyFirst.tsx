export default function PrivacyFirst() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-32 content-visibility-auto"
      aria-labelledby="privacy-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
            Privacy & Control
          </span>
          <h2 id="privacy-title" className="text-4xl font-bold text-white sm:text-5xl">
            Your data.{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#E8C55B] bg-clip-text text-transparent">
              Your scholarship.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-zinc-300 sm:text-xl">
            No tracking. No telemetry. Your study habits and reading history stay on your device.
            Whether you use our AI features or study completely offline, your privacy comes first.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/10 text-[#3b82f6]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">Flexible AI Options</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Choose how you access AI features: use our simple membership plans for hassle-free learning,
              bring your own API keys for maximum control, or study entirely offline with embedded lexicons.
              You decide what works best for you.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#E8C55B]/20 to-[#D4AF37]/10 text-[#E8C55B]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">Zero Tracking</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              No telemetry. No user behavior monitoring. No data collection.
              Your study habits, reading history, and progress stay on your device.
              We don't see it. Nobody does.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">Offline Mode</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              All linguistic data embedded. The interactive reader works without any API—morphology,
              lexicon, grammar references load instantly from your device. Study anywhere, anytime.
            </p>
          </article>
        </div>

        <div className="rounded-3xl border border-[#3b82f6]/20 bg-gradient-to-br from-[#3b82f6]/10 to-[#3b82f6]/5 p-8 shadow-2xl shadow-black/40">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
                Open Source
              </div>
              <h3 className="text-3xl font-bold text-white">Audit the code yourself</h3>
              <p className="text-base leading-relaxed text-zinc-300">
                Released under <span className="font-semibold text-white">Elastic License 2.0 (ELv2)</span>.
                Free to use, copy, distribute, and modify. Commercial use permitted.
                Verify our privacy claims by reading the source code.
              </p>
              <p className="text-sm text-zinc-400">
                If the project ever fails, the code and data remain accessible—preserving humanity's linguistic
                heritage is too important to lock behind proprietary systems.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
                Self-Hostable
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Docker-ready deployment. Run the entire platform on your own infrastructure.
                Universities, seminaries, and institutions can host privately for complete control.
              </p>
              <div className="mt-6 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#3b82f6]" aria-hidden />
                  <span>PostgreSQL 14+ with pgvector</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#3b82f6]" aria-hidden />
                  <span>Python 3.13+ FastAPI backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#3b82f6]" aria-hidden />
                  <span>Flutter 3.35+ for native apps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
