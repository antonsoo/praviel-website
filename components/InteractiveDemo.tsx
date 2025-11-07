import InteractiveReaderIsland from "@/components/InteractiveReaderIsland";

export default function InteractiveDemo() {
  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden content-visibility-auto" aria-labelledby="demo-title">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 text-center">
        <header className="space-y-4">
          <h2
            id="demo-title"
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Interactive <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Reader</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto">
            Tap into real manuscripts—Homer, Psalm 23, Bhagavad-Gītā—once the demo loads. We defer the heavy philology engine until you scroll here to keep first paint fast.
          </p>
        </header>
        <InteractiveReaderIsland />
      </div>
    </section>
  );
}
