import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PRAVIEL API — Ancient Language Analysis",
  description:
    "Access powerful morphological analysis, pronunciation feedback, and linguistic data for 21+ ancient languages via our RESTful API.",
  openGraph: {
    title: "PRAVIEL API — Ancient Language Analysis",
    description:
      "Access powerful morphological analysis, pronunciation feedback, and linguistic data for 21+ ancient languages via our RESTful API.",
  },
};

export default function APIPage() {
  const features = [
    {
      title: "Morphological Analysis",
      description:
        "Parse any word in Akkadian, Biblical Hebrew, Koine Greek, Latin, or Old Church Slavonic with detailed grammatical breakdowns.",
      icon: "📚",
    },
    {
      title: "Pronunciation Feedback",
      description:
        "Real-time phonetic analysis and pronunciation scoring for authentic ancient language speaking practice.",
      icon: "🗣️",
    },
    {
      title: "Text Processing",
      description:
        "Batch process entire texts with automatic word parsing, lemmatization, and contextual analysis.",
      icon: "⚡",
    },
    {
      title: "Multi-Language Support",
      description:
        "21+ ancient languages and dialects with growing coverage of cuneiform, hieroglyphics, and extinct scripts.",
      icon: "🌍",
    },
  ];

  const useCases = [
    "Build educational applications for classical studies",
    "Integrate ancient language tools into research platforms",
    "Create interactive biblical or classical text readers",
    "Develop pronunciation training apps for seminaries",
    "Power academic research with automated linguistic analysis",
  ];

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-200 via-purple-200 to-fuchsia-200 bg-clip-text text-transparent mb-6">
              PRAVIEL API
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
              Powerful linguistic analysis for ancient languages. RESTful API
              with morphological parsing, pronunciation feedback, and more.
            </p>
            <a
              href="https://api.praviel.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
            >
              View Full Documentation →
            </a>
          </div>

          {/* Features grid */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-8 text-center">
              Core Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-violet-400/30 hover:bg-violet-500/5 transition-all"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Use cases */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-8 text-center">
              Use Cases
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <ul className="space-y-4">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-violet-400 text-xl mt-0.5">→</span>
                    <span className="text-zinc-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick start */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-8 text-center">
              Quick Start
            </h2>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl overflow-x-auto">
              <pre className="text-sm text-zinc-300">
                <code>{`curl -X POST https://api.praviel.com/v1/parse \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "ἐν ἀρχῇ ἦν ὁ λόγος",
    "language": "greek"
  }'`}</code>
              </pre>
            </div>
            <p className="text-center text-sm text-zinc-500 mt-4">
              Get your API key by{" "}
              <a
                href="https://app.praviel.com"
                className="text-violet-400 hover:text-violet-300"
              >
                signing up for free
              </a>
            </p>
          </div>

          {/* CTA */}
          <div className="text-center rounded-2xl border border-violet-400/20 bg-violet-500/5 p-8 ring-1 ring-violet-500/30 backdrop-blur">
            <h2 className="text-2xl font-semibold text-violet-200 mb-4">
              Ready to Build?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              Access comprehensive API documentation, interactive examples, and
              language-specific guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.praviel.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-medium text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
              >
                Full Documentation
              </a>
              <Link
                href="/fund"
                className="inline-block rounded-lg border border-violet-400/30 px-6 py-3 font-medium text-violet-300 hover:bg-violet-500/10 transition-all"
              >
                Support Development
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
