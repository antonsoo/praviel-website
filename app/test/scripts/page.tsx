import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";

import { languages } from "@/lib/languageData";

export const metadata: Metadata = {
  title: "Script Showcase Harness",
  robots: "noindex, nofollow",
};

const envAllow =
  process.env.ENABLE_TEST_ROUTES === "true" || process.env.NODE_ENV !== "production";

type HarnessParams = Record<string, string | string[] | undefined>;

type PageProps = {
  searchParams?: Promise<HarnessParams>;
};

export default async function ScriptShowcasePage({ searchParams }: PageProps) {
  noStore();
  const params: HarnessParams = await Promise.resolve(searchParams ?? {});
  const requestHeaders = await headers();
  const override =
    typeof params["enable-test-routes"] === "string"
      ? params["enable-test-routes"] === "1"
      : false;
  const headerOverride = requestHeaders.get("x-enable-test-routes") === "1";

  const isAllowed = envAllow || override || headerOverride;

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Typography Harness</p>
          <h1 className="text-3xl font-semibold">Script showcase disabled</h1>
          <p className="text-sm text-zinc-400">
            Pass <code>?enable-test-routes=1</code> or the <code>x-enable-test-routes</code> header to
            render the script grid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Typography Harness</p>
          <h1 className="text-3xl font-semibold">Ancient Script Showcase</h1>
          <p className="text-sm text-zinc-400">
            Snapshot of every language card rendered with its canonical font stack so automated
            tests can catch tofu regressions, flipped directionality, or missing ligatures.
          </p>
        </header>

        <div
          data-testid="script-showcase-grid"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {languages.map((language) => (
            <div
              key={language.name}
              className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-zinc-500">
                <span>{language.emoji}</span>
                <span>{language.tier === "top" ? "Top" : "Phase 1"}</span>
              </div>
              <div className="text-lg font-semibold text-white">{language.name}</div>
              <div
                className={`text-2xl text-zinc-200 ${language.fontClass || "font-serif"}`}
                dir={language.isRTL ? "rtl" : "ltr"}
              >
                {language.nativeName}
              </div>
              <p
                className={`text-xl text-zinc-300 ${language.fontClass || "font-serif"}`}
                dir={language.isRTL ? "rtl" : "ltr"}
              >
                {language.sample}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {language.writingInfo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
