function PulseLine({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

export default function Loading() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8 shadow-2xl shadow-black/40">
          <PulseLine className="h-4 w-48 bg-white/20" />
          <PulseLine className="h-12 w-full" />
          <PulseLine className="h-12 w-5/6" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                <PulseLine className="h-4 w-24" />
                <PulseLine className="h-6 w-3/4" />
                <PulseLine className="h-4 w-full" />
              </div>
            ))}
          </div>
        </section>

        {["Traction", "Why PRAVIEL"].map((label) => (
          <section
            key={label}
            className="mx-auto w-full max-w-5xl space-y-4 rounded-3xl border border-white/5 bg-white/5 px-6 py-10 shadow-lg shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <PulseLine className="h-5 w-32" />
              <PulseLine className="h-4 w-20" />
            </div>
            {[0, 1, 2].map((row) => (
              <PulseLine key={row} className="h-4 w-full" />
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
