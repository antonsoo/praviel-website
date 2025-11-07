import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const FLUTTER_APP_URL = "https://b2cdffdf.app-praviel.pages.dev";

test.describe("Flutter Web App Deployment", () => {
  test("loads without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      } else if (msg.type() === "warning") {
        consoleWarnings.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      consoleErrors.push(`Page error: ${err.message}`);
    });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    // Wait for Flutter to render (loading screen hidden or canvas appears)
    await page.waitForFunction(
      () => {
        const loading = document.getElementById("loading");
        return loading && loading.classList.contains("hidden");
      },
      { timeout: 30000 }
    ).catch(() => {
      // Fallback: wait for canvas if loading screen doesn't hide
      return page.waitForSelector("canvas", { timeout: 10000 });
    });

    // Take screenshot for visual verification
    await page.screenshot({ path: "test-results/flutter-app-loaded.png", fullPage: true });

    // Check for critical errors (ignoring known benign warnings)
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes("favicon") &&
      !err.includes("DevTools") &&
      !err.toLowerCase().includes("download the react devtools") &&
      !err.includes("X-Frame-Options may only be set via an HTTP header") &&
      !err.includes("Failed to load module script") // Service worker edge cases
    );

    expect(criticalErrors, `Critical console errors found:\n${criticalErrors.join("\n")}`).toHaveLength(0);
  });

  test("main.dart.js bundle loads successfully", async ({ page }) => {
    const resourceErrors: string[] = [];
    let mainDartJsResponse: any = null;

    page.on("requestfailed", (request) => {
      if (request.url().includes("main.dart.js")) {
        resourceErrors.push(`Failed to load: ${request.url()} - ${request.failure()?.errorText}`);
      }
    });

    page.on("response", (response) => {
      if (response.url().includes("main.dart.js") && response.status() === 200) {
        mainDartJsResponse = response;
      }
    });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    // Wait a bit for main.dart.js to load
    await page.waitForTimeout(5000);

    expect(mainDartJsResponse, "main.dart.js did not load").toBeTruthy();
    const mainDartJsRequest = mainDartJsResponse;

    expect(mainDartJsRequest.status()).toBe(200);
    expect(resourceErrors).toHaveLength(0);

    // Check bundle size is reasonable (should be ~4MB based on our analysis)
    const contentLength = mainDartJsRequest.headers()["content-length"];
    if (contentLength) {
      const sizeInMB = parseInt(contentLength) / (1024 * 1024);
      expect(sizeInMB).toBeGreaterThan(2); // At least 2MB
      expect(sizeInMB).toBeLessThan(10); // Less than 10MB
    }
  });

  test("Flutter renders UI elements", async ({ page }) => {
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    // Wait for Flutter canvas to render
    await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 30000 });

    // Take screenshot of rendered app
    await page.screenshot({ path: "test-results/flutter-ui-rendered.png", fullPage: true });

    // Verify Flutter UI is visible (canvas should exist)
    const canvasElements = await page.locator("canvas").count();
    expect(canvasElements).toBeGreaterThan(0);
  });

  test("has no critical accessibility violations", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Run axe once on desktop");

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    // Wait for Flutter to fully render
    await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 30000 });
    await page.waitForTimeout(2000); // Allow animations to settle

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    // Flutter web apps may have some structural accessibility issues
    // We're primarily checking for color contrast and critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(
      criticalViolations,
      `Critical accessibility violations found:\n${JSON.stringify(criticalViolations, null, 2)}`
    ).toHaveLength(0);
  });

  test("responds to viewport changes (mobile responsive)", async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 30000 });
    await page.screenshot({ path: "test-results/flutter-desktop.png", fullPage: false });

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // Allow Flutter to reflow
    await page.screenshot({ path: "test-results/flutter-mobile.png", fullPage: false });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "test-results/flutter-tablet.png", fullPage: false });

    // Verify canvas still exists after viewport changes
    const canvasCount = await page.locator("canvas").count();
    expect(canvasCount).toBeGreaterThan(0);
  });

  test("service worker registered (if applicable)", async ({ page }) => {
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    // Check if service worker is registered
    const hasServiceWorker = await page.evaluate(async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        return registration !== undefined;
      }
      return false;
    });

    // Service worker is optional but good to know if it's there
    console.log(`Service worker registered: ${hasServiceWorker}`);
  });

  test("performance: first contentful paint under 3s", async ({ page }) => {
    const performanceMetrics: { name: string; value: number }[] = [];

    await page.goto(FLUTTER_APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Wait for Flutter to render
    await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 30000 });

    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");

      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        loadComplete: perfData.loadEventEnd - perfData.fetchStart,
        firstPaint: paintEntries.find((e) => e.name === "first-paint")?.startTime || 0,
        firstContentfulPaint: paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0,
      };
    });

    performanceMetrics.push(
      { name: "DOM Content Loaded", value: metrics.domContentLoaded },
      { name: "Load Complete", value: metrics.loadComplete },
      { name: "First Paint", value: metrics.firstPaint },
      { name: "First Contentful Paint", value: metrics.firstContentfulPaint }
    );

    console.log("Performance Metrics:", performanceMetrics);

    // First Contentful Paint should be under 3 seconds
    expect(metrics.firstContentfulPaint).toBeLessThan(3000);
  });
});
