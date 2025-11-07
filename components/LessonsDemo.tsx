import LessonMatcherIsland from "@/components/LessonMatcherIsland";

export default function LessonsDemo() {
  return (
    <section
      className="relative px-6 py-24 sm:py-32 overflow-hidden content-visibility-auto"
      aria-labelledby="lessons-demo-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#E8C55B]/6 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl space-y-10 text-center">
        <header className="space-y-4">
          <h2
            id="lessons-demo-title"
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Lessons From <span className="bg-gradient-to-r from-[#E8C55B] to-[#D4AF37] bg-clip-text text-transparent">Primary Sources</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto">
            Match manuscript-grade vocabulary across languages. Launch the draggable exercise when you want to explore it—until then we keep the bundle off the critical path.
          </p>
        </header>

        <LessonMatcherIsland />
      </div>
    </section>
  );
}
