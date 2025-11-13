import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { FLAGSHIP_LANGUAGES, LANGUAGE_COUNT } from "@/lib/languageStats";
import { languages } from "@/lib/languageData";
import { missionPillars } from "@/lib/canonicalCopy";
import { languageEmoji, languageRoadmapPhases } from "@/lib/languageRoadmap";

function fail(message: string): never {
  console.error(`[language-data] ${message}`);
  process.exit(1);
}

const issues: string[] = [];
const languageNames = new Set(languages.map((language) => language.name));
const ancientLanguageClaimRegex = /(\d+)\s+ancient\s+languages/gi;

function verifyAncientLanguageClaims(text: string, context: string, { requireClaim = false }: { requireClaim?: boolean } = {}) {
  const matches = [...text.matchAll(ancientLanguageClaimRegex)];
  if (matches.length === 0) {
    if (requireClaim) {
      issues.push(`${context} is missing an explicit "X ancient languages" claim.`);
    }
    return;
  }

  for (const match of matches) {
    const mentionedCount = Number(match[1]);
    if (mentionedCount !== LANGUAGE_COUNT) {
      issues.push(`${context} references ${mentionedCount} ancient languages but LANGUAGE_COUNT=${LANGUAGE_COUNT}.`);
    }
  }
}

if (languages.length !== LANGUAGE_COUNT) {
  issues.push(
    `LANGUAGE_COUNT=${LANGUAGE_COUNT} but dataset contains ${languages.length} entries. Update lib/languageStats.ts.`,
  );
}

for (const flagship of FLAGSHIP_LANGUAGES) {
  if (!languageNames.has(flagship)) {
    issues.push(`Missing flagship language data for "${flagship}".`);
  }
}

const pillarWithCount = missionPillars.find((pillar) => pillar.body.includes("linguistic memory"));
if (pillarWithCount && !pillarWithCount.body.includes(`${LANGUAGE_COUNT}`)) {
  issues.push(
    `Mission pillar text must mention ${LANGUAGE_COUNT} languages (currently: "${pillarWithCount.body}").`,
  );
}

const unsupportedRoadmapLanguages = new Set<string>();
for (const phase of languageRoadmapPhases) {
  for (const name of phase.languages) {
    if (!languageEmoji[name] && !languageNames.has(name)) {
      unsupportedRoadmapLanguages.add(name);
    }
  }
}

if (unsupportedRoadmapLanguages.size > 0) {
  issues.push(
    `languageRoadmapPhases references languages without emoji/data: ${Array.from(unsupportedRoadmapLanguages).join(", ")}`,
  );
}

const readmePath = join(process.cwd(), "README.md");
try {
  const readme = readFileSync(readmePath, "utf8");
  verifyAncientLanguageClaims(readme, "README.md", { requireClaim: true });
} catch (error) {
  issues.push(`Unable to read README.md for editorial verification (${String(error)})`);
}

const fundingHeroPath = join(process.cwd(), "components", "FundingHero.tsx");
try {
  const fundingHeroSource = readFileSync(fundingHeroPath, "utf8");
  if (!/LANGUAGE_COUNT[\s\S]*ancient languages/i.test(fundingHeroSource)) {
    issues.push("components/FundingHero.tsx must interpolate LANGUAGE_COUNT wherever it claims an ancient language count.");
  }
} catch (error) {
  issues.push(`Unable to read components/FundingHero.tsx (${String(error)})`);
}

const fundingContentDir = join(process.cwd(), "content", "fund");
if (existsSync(fundingContentDir)) {
  const entries = readdirSync(fundingContentDir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

  for (const entry of entries) {
    try {
      const markdown = readFileSync(join(fundingContentDir, entry.name), "utf8");
      verifyAncientLanguageClaims(markdown, `content/fund/${entry.name}`);
    } catch (error) {
      issues.push(`Unable to read content/fund/${entry.name} (${String(error)})`);
    }
  }
}

if (issues.length > 0) {
  issues.forEach((issue) => console.error(`✗ ${issue}`));
  fail(`Language data verification failed (${issues.length} issue${issues.length === 1 ? "" : "s"}).`);
}

console.log(
  `[language-data] Verified ${languages.length} entries, ${FLAGSHIP_LANGUAGES.length} flagship languages, and ${languageRoadmapPhases.length} roadmap phases.`,
);
