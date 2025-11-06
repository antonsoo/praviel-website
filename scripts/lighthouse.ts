import { mkdirSync, writeFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  Browser,
  BrowserPlatform,
  computeExecutablePath,
  install,
} from "@puppeteer/browsers";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const AUDIT_URL =
  process.env.AUDIT_URL || "https://praviel-site.antonnsoloviev.workers.dev";
const CACHE_DIR = join(process.cwd(), ".cache", "chromium");
const REPORT_DIR = join(process.cwd(), "test-results");
mkdirSync(REPORT_DIR, { recursive: true });
let buildIdCache: string | undefined;
const OUTPUT_FORMATS = ["json", "html"] as const;
type OutputFormat = (typeof OUTPUT_FORMATS)[number];

function getPlatform(): BrowserPlatform {
  if (process.platform === "linux") {
    return process.arch === "arm64"
      ? BrowserPlatform.LINUX_ARM
      : BrowserPlatform.LINUX;
  }
  if (process.platform === "darwin") {
    return process.arch === "arm64" ? BrowserPlatform.MAC_ARM : BrowserPlatform.MAC;
  }
  return process.arch === "x64" ? BrowserPlatform.WIN64 : BrowserPlatform.WIN32;
}

async function resolveChromeBuildId(): Promise<string> {
  if (process.env.LIGHTHOUSE_CHROME_BUILD) {
    return process.env.LIGHTHOUSE_CHROME_BUILD;
  }

  if (buildIdCache) return buildIdCache;

  const response = await fetch(
    "https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json"
  );

  if (!response.ok) {
    throw new Error(`Unable to fetch Chrome build id (${response.status})`);
  }

  const data = (await response.json()) as {
    channels: Record<string, { version: string }>;
  };

  const stableVersion = data.channels?.Stable?.version;
  if (!stableVersion) {
    throw new Error("Missing Stable channel data from Chrome for Testing feed");
  }

  buildIdCache = stableVersion;
  return stableVersion;
}

async function ensureChrome(): Promise<string> {
  const buildId = await resolveChromeBuildId();
  const platform = getPlatform();
  mkdirSync(CACHE_DIR, { recursive: true });
  const executablePath = computeExecutablePath({
    browser: Browser.CHROME,
    buildId,
    cacheDir: CACHE_DIR,
    platform,
  });

  if (!existsSync(executablePath)) {
    await install({
      browser: Browser.CHROME,
      cacheDir: CACHE_DIR,
      buildId,
      buildIdAlias: "stable",
      platform,
    });
  }

  return executablePath;
}

function formatMs(value?: number) {
  if (!value && value !== 0) return "n/a";
  return `${(value / 1000).toFixed(2)}s`;
}

function formatScore(value?: number | null) {
  if ((value ?? null) === null) return "0";
  return `${Math.round((value ?? 0) * 100)}`;
}

async function runAudit(formFactor: "mobile" | "desktop") {
  const chromePath = await ensureChrome();
  const chrome = await launch({
    chromePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  try {
    const runnerResult = await lighthouse(
      AUDIT_URL,
      {
        port: chrome.port,
        output: [...OUTPUT_FORMATS],
        logLevel: "error",
      },
      {
        extends: "lighthouse:default",
        settings: {
          formFactor,
          screenEmulation:
            formFactor === "mobile"
              ? undefined
              : {
                  mobile: false,
                  width: 1350,
                  height: 940,
                  deviceScaleFactor: 1,
                  disabled: false,
                },
        },
      }
    );

    if (!runnerResult) {
      throw new Error("Lighthouse returned no results");
    }

    const { lhr } = runnerResult;
    const lcpValue =
      lhr.audits["largest-contentful-paint"]?.numericValue ?? Infinity;
    const inpValue =
      lhr.audits["interaction-to-next-paint"]?.numericValue ?? Infinity;
    const clsValue =
      lhr.audits["cumulative-layout-shift"]?.numericValue ?? Infinity;

    const scores = {
      performance: formatScore(lhr.categories.performance.score),
      lcp: formatMs(lcpValue),
      inp: Number.isFinite(inpValue) ? `${Math.round(inpValue)}ms` : "n/a",
      cls: Number.isFinite(clsValue) ? clsValue.toFixed(3) : "n/a",
    };

    const lcpElementAudit = lhr.audits["largest-contentful-paint-element"];
    type NodeDetails = {
      items?: Array<{ node?: { nodeLabel?: string; snippet?: string } }>;
    };
    const nodeDetails = (lcpElementAudit?.details as NodeDetails | undefined)?.items;
    const lcpNode = nodeDetails?.[0]?.node;
    const lcpLabel = lcpNode?.nodeLabel ?? lcpNode?.snippet ?? "unknown";

    console.log(`\n${formFactor.toUpperCase()} performance for ${AUDIT_URL}`);
    console.table(scores);
    if (lcpLabel) {
      console.log(`LCP element: ${lcpLabel}`);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const baseFilename = `lighthouse-${formFactor}-${timestamp}`;
    const reportPaths: Partial<Record<OutputFormat, string>> = {};

    const reports = Array.isArray(runnerResult.report)
      ? runnerResult.report
      : [runnerResult.report];

    const jsonReportPath = join(REPORT_DIR, `${baseFilename}.json`);
    writeFileSync(jsonReportPath, JSON.stringify(lhr, null, 2));
    reportPaths.json = jsonReportPath;

    const htmlIndex = OUTPUT_FORMATS.indexOf("html");
    const htmlReport = htmlIndex >= 0 ? reports[htmlIndex] : undefined;
    if (typeof htmlReport === "string") {
      const htmlReportPath = join(REPORT_DIR, `${baseFilename}.html`);
      writeFileSync(htmlReportPath, htmlReport);
      reportPaths.html = htmlReportPath;
    }

    const thresholds = {
      lcp: 2500,
      inp: 200,
      cls: 0.1,
    };

    const lcp = lcpValue;
    const inp = inpValue;
    const cls = clsValue;

    if (lcp > thresholds.lcp || inp > thresholds.inp || cls > thresholds.cls) {
      throw new Error(
        `${formFactor} thresholds failed (LCP ${lcp}ms, INP ${inp}ms, CLS ${cls})`
      );
    }

    return {
      formFactor,
      scores,
      raw: { lcp, inp, cls },
      reportPaths,
    };
  } finally {
    await chrome.kill();
  }
}

(async () => {
  try {
    await ensureChrome();
    const results = [];
    for (const formFactor of ["mobile", "desktop"] as const) {
      results.push(await runAudit(formFactor));
    }
    console.log("\nLighthouse audits succeeded", results.map((r) => r.formFactor));
  } catch (error) {
    console.error("Lighthouse audit failed", error);
    process.exitCode = 1;
  }
})();
