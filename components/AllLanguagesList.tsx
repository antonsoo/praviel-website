"use client";

import { useState } from "react";
import type { Language } from "@/lib/languageData";

function LanguageDetailsItem({ language }: { language: Language }) {
  return (
    <details className="language-details group rounded-2xl border border-white/10 bg-zinc-950/40 overflow-hidden">
      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            {language.emoji}
          </span>
          <div>
            <span className="text-base font-semibold text-white">{language.name}</span>
            <p
              className={`text-sm text-zinc-400 ${language.fontClass ?? "font-serif"}`}
              dir={language.isRTL ? "rtl" : "ltr"}
            >
              {language.nativeName}
            </p>
          </div>
        </div>
        <svg
          className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="language-details-content border-t border-white/5">
        <div className="p-4">
          <p className="text-sm text-zinc-300 mb-4">{language.description}</p>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 mb-2">
              Top 10 Works
            </p>
            <ul className="space-y-2 text-sm text-zinc-200">
              {language.topTenWorks.map((work, idx) => (
                <li key={work} className="flex items-start gap-3">
                  <span className="text-xs text-zinc-500 font-semibold min-w-[1.5rem]">
                    {idx + 1}.
                  </span>
                  <span>{work}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </details>
  );
}

export default function AllLanguagesList({ languages }: { languages: Language[] }) {
  const INITIAL_DISPLAY = 8;
  const [showAll, setShowAll] = useState(false);
  const displayedLanguages = showAll ? languages : languages.slice(0, INITIAL_DISPLAY);
  const remainingCount = languages.length - INITIAL_DISPLAY;

  return (
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-black/30 p-8 shadow-2xl shadow-black/30">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          All Languages ({languages.length})
        </p>
        <p className="mt-2 text-sm text-zinc-300">
          Click any language to see its top 10 canonical works
        </p>
      </div>

      <div className="space-y-3">
        {displayedLanguages.map((language) => (
          <LanguageDetailsItem key={language.name} language={language} />
        ))}
      </div>

      {!showAll && remainingCount > 0 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#E8C55B]/30 bg-[#E8C55B]/10 hover:bg-[#E8C55B]/20 text-[#E8C55B] font-semibold text-sm transition-all hover:scale-105"
            aria-label={`Show ${remainingCount} more languages`}
          >
            <span>Show {remainingCount} More Languages</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
