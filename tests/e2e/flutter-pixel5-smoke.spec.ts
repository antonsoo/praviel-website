import { expect, test } from "@playwright/test";

const FLUTTER_E2E_URL =
  process.env.FLUTTER_E2E_URL ?? "https://008001b3.app-praviel.pages.dev";

const PIXEL5_VIEWPORT = { width: 393, height: 851 };

async function waitForFlutter(page: import("@playwright/test").Page) {
  await page.waitForSelector("flt-glass-pane, flutter-view, canvas", {
    timeout: 45_000,
    state: "visible",
  });
  // Flutter sometimes keeps the loading overlay attached; wait for it to hide.
  await page.waitForFunction(() => {
    const loading = document.getElementById("loading");
    return !loading || loading.classList.contains("hidden");
  }, { timeout: 15_000 }).catch(() => undefined);
}

test.describe("Flutter Pixel-5 smoke", () => {
  test("home renders on Pixel-5 viewport", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Pixel sweep uses chromium only");

    await page.setViewportSize(PIXEL5_VIEWPORT);
    await page.goto(FLUTTER_E2E_URL, { waitUntil: "networkidle", timeout: 90_000 });
    await waitForFlutter(page);

    await expect(page.locator("canvas").first()).toBeVisible();

    const screenshotPath = testInfo.outputPath(`flutter-pixel5-home.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    testInfo.attachments.push({
      name: "pixel5-home",
      path: screenshotPath,
      contentType: "image/png",
    });
  });
});
