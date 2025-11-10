import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pixelLanguages } from "./assets/pixel_languages";

const FLUTTER_E2E_URL =
  process.env.FLUTTER_E2E_URL ?? "https://008001b3.app-praviel.pages.dev";

const PIXEL5_VIEWPORT = { width: 393, height: 851 };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUN_STAMP =
  process.env.PIXEL5_SWEEP_STAMP ??
  new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "") + "Z";

const ARTIFACT_BASE_CANDIDATES = [
  process.env.PIXEL5_SWEEP_DIR,
  path.resolve(__dirname, "..", "..", "..", "praviel", "artifacts", "manual_pixel5_playwright"),
  path.resolve(__dirname, "..", "..", "artifacts", "manual_pixel5_playwright"),
].filter(Boolean) as string[];

async function ensureArtifactDir() {
  for (const candidate of ARTIFACT_BASE_CANDIDATES) {
    try {
      const base = path.resolve(candidate);
      await fs.mkdir(base, { recursive: true });
      const dir = path.join(base, RUN_STAMP);
      await fs.mkdir(dir, { recursive: true });
      return dir;
    } catch {
      // Try next candidate
      continue;
    }
  }
  throw new Error("Unable to prepare artifact directory for Pixel-5 sweep");
}

async function saveReport(artifactDir: string, body: unknown, filename: string) {
  const filePath = path.join(artifactDir, filename);
  await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf8");
  return filePath;
}

async function captureScreenshot(
  page: import("@playwright/test").Page,
  filePath: string,
) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath, fullPage: false });
  return filePath;
}

async function waitForFlutter(page: import("@playwright/test").Page) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await page.waitForSelector("canvas", {
        timeout: 60_000,
        state: "visible",
      });
      break;
    } catch (error) {
      const reloadButton = page.getByRole("button", { name: /reload app/i });
      if (attempt === 0 && (await reloadButton.count())) {
        await reloadButton.click();
        await page.waitForTimeout(1000);
        continue;
      }
      throw error;
    }
  }

  await page.waitForFunction(() => {
    const loading = document.getElementById("loading");
    return !loading || loading.classList.contains("hidden");
  }, { timeout: 15_000 }).catch(() => undefined);
}

async function tapLanguageChip(page: import("@playwright/test").Page) {
  const canvas = page.locator("canvas").first();
  await expect(canvas).toBeVisible({ timeout: 15_000 });
  const box = await canvas.boundingBox();
  if (!box) {
    throw new Error("Canvas bounding box unavailable for language chip tap");
  }
  const xPositions = [0.75, 0.8, 0.85, 0.9, 0.95];
  const yPositions = [0.075, 0.095, 0.115, 0.135];
  for (const y of yPositions) {
    for (const x of xPositions) {
      const tapX = box.x + box.width * x;
      const tapY = box.y + box.height * y;
      await page.mouse.click(tapX, tapY);
      await page.waitForTimeout(350);
      const dialog = page.getByRole("dialog", { name: /select a language/i });
      if (await dialog.isVisible().catch(() => false)) {
        return;
      }
    }
  }
}

async function openLanguageSheet(page: import("@playwright/test").Page) {
  const dialog = page.getByRole("dialog", { name: /select a language/i });
  if (await dialog.isVisible().catch(() => false)) {
    return;
  }
  const languageButton = page.getByRole("button", { name: /language/i });
  if (await languageButton.count()) {
    await languageButton.click();
  } else {
    await tapLanguageChip(page);
  }
  try {
    await dialog.waitFor({ state: "visible", timeout: 10_000 });
  } catch {
    await tapLanguageChip(page);
    await dialog.waitFor({ state: "visible", timeout: 10_000 });
  }
}

async function closeLanguageSheet(page: import("@playwright/test").Page) {
  const dialog = page.getByRole("dialog", { name: /select a language/i });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const visible = await dialog.isVisible().catch(() => false);
    if (!visible) {
      return;
    }
    await dialog.press("Escape").catch(async () => page.keyboard.press("Escape"));
    await dialog.waitFor({ state: "hidden", timeout: 2_000 }).catch(() => undefined);
    await page.waitForTimeout(200);
  }
  // final fallback click outside
  await page.mouse.click(10, 10).catch(() => undefined);
  await dialog.waitFor({ state: "hidden", timeout: 2_000 }).catch(() => undefined);
}

async function setLanguageViaStorage(
  page: import("@playwright/test").Page,
  languageCode: string,
) {
  await page.evaluate((code) => {
    window.localStorage.setItem("selected_language", code);
  }, languageCode);
  await page.reload({ waitUntil: "networkidle", timeout: 150_000 });
  await acceptAccessibilityPrompt(page);
  await dismissAccountGate(page);
  await waitForFlutter(page);
  await completeOnboarding(page);
  await waitForFlutter(page);
}

async function searchAndSelectLanguage(
  page: import("@playwright/test").Page,
  language: (typeof pixelLanguages)[number],
) {
  try {
    await openLanguageSheet(page);
    const search = page.getByPlaceholder(/search language/i);
    await expect(search).toBeVisible({ timeout: 15_000 });
    await search.click();
    await search.fill("");
    const query = language.search ?? language.name;
    await search.type(query, { delay: 40 });
    const option = page
      .getByRole("button", { name: new RegExp(language.name, "i") })
      .first();
    await option.waitFor({ state: "visible", timeout: 15_000 });
    await option.click();
    return "ui" as const;
  } catch {
    await setLanguageViaStorage(page, language.code);
    return "storage" as const;
  }
}

async function acceptAccessibilityPrompt(page: import("@playwright/test").Page) {
  const semanticsButton = page.locator('flt-semantics-placeholder[aria-label="Enable accessibility"]');
  if (await semanticsButton.count()) {
    await semanticsButton.scrollIntoViewIfNeeded();
    const handle = await semanticsButton.elementHandle();
    if (handle) {
      await handle.evaluate((el) => (el as HTMLElement).click());
    } else {
      await semanticsButton.click({ force: true });
    }
    await page.waitForTimeout(500);
  }
}

async function dismissAccountGate(page: import("@playwright/test").Page) {
  const guestButton = page.getByRole("button", { name: /continue as guest/i });
  if (await guestButton.count()) {
    await guestButton.click();
    await page.waitForTimeout(500);
  }
}

async function completeOnboarding(page: import("@playwright/test").Page) {
  const skipButton = page.getByRole("button", { name: /^skip$/i });
  if (await skipButton.count()) {
    await skipButton.click();
    await page.waitForTimeout(500);
  }

  const demoButton = page.getByRole("button", { name: /use praviel demo key/i });
  if (await demoButton.count()) {
    await demoButton.click();
    await page.waitForTimeout(500);
  }

  const startButton = page.getByRole("button", { name: /start learning/i });
  if (await startButton.count()) {
    await startButton.click();
    await page.waitForTimeout(500);
  }
}

test.describe("Flutter Pixel-5 sweep", () => {
  test("smoke top 10 languages", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Pixel sweep uses chromium only");
    test.setTimeout(360_000);

    await page.setViewportSize(PIXEL5_VIEWPORT);
    const artifactDir = await ensureArtifactDir();
    const consoleEvents: Array<{ ts: string; level: string; text: string; language: string }> = [];
    const failedRequests: Array<{ ts: string; url: string; error: string; language: string }> = [];
    let activeLanguage = "bootstrap";

    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleEvents.push({
          ts: new Date().toISOString(),
          level: message.type(),
          text: message.text(),
          language: activeLanguage,
        });
      }
    });

    page.on("requestfailed", (request) => {
      failedRequests.push({
        ts: new Date().toISOString(),
        url: request.url(),
        error: request.failure()?.errorText ?? "unknown",
        language: activeLanguage,
      });
    });

    await page.goto(FLUTTER_E2E_URL, { waitUntil: "networkidle", timeout: 120_000 });
    await acceptAccessibilityPrompt(page);
    await dismissAccountGate(page);
    await waitForFlutter(page);
    await completeOnboarding(page);
    await waitForFlutter(page);

    const report: Array<{ language: string; status: string; screenshot?: string; strategy?: string }> = [];
    const semanticsCount = await page.locator('flt-semantics').count().catch(() => 0);
    const semanticsSnapshot = semanticsCount
      ? await page
          .evaluate(() =>
            Array.from(document.querySelectorAll('flt-semantics'))
              .map((node) => node.getAttribute('aria-label'))
              .filter((label): label is string => Boolean(label))
              .slice(0, 100),
          )
          .catch(() => [])
      : [];

    for (const language of pixelLanguages) {
      const screenshotName = `pixel5-${language.code}-${Date.now()}.png`;
      try {
        activeLanguage = language.code;
        const strategy = await searchAndSelectLanguage(page, language);
        await expect(page.getByRole("button", { name: /start lesson/i })).toBeVisible({ timeout: 20_000 });
        await page.waitForTimeout(1000);
        await expect(page.locator("canvas").first()).toBeVisible({ timeout: 25_000 });
        if (strategy === "ui") {
          await closeLanguageSheet(page);
        }
        const screenshotPath = path.join(artifactDir, screenshotName);
        await captureScreenshot(page, screenshotPath);
        testInfo.attachments.push({
          name: `${language.code}-pixel5`,
          path: screenshotPath,
          contentType: "image/png",
        });
        report.push({ language: language.code, status: "ok", screenshot: screenshotPath, strategy });
      } catch (error) {
        const failureShot = path.join(
          artifactDir,
          `pixel5-${language.code}-error-${Date.now()}.png`,
        );
        await captureScreenshot(page, failureShot).catch(() => undefined);
        report.push({ language: language.code, status: `error: ${error}`, screenshot: failureShot });
        await closeLanguageSheet(page);
      }
    }

    const summary = {
      stamp: RUN_STAMP,
      url: FLUTTER_E2E_URL,
      semanticsNodesDetected: semanticsCount,
      semanticsSnapshot,
      languages: report,
      consoleEvents,
      failedRequests,
    };
    const reportPath = await saveReport(artifactDir, summary, `pixel5-sweep-${RUN_STAMP}.json`);
    testInfo.attachments.push({
      name: "pixel5-sweep-report",
      path: reportPath,
      contentType: "application/json",
    });
  });
});
