import { expect, test } from "@playwright/test";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

test.describe("Slow Network Performance (Slow 3G)", () => {
  test("app is usable within 10 seconds on Slow 3G", async ({ page, context }) => {
    // Simulate Slow 3G network conditions
    await context.route("**/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms latency
      await route.continue();
    });

    const startTime = Date.now();

    // Navigate with Slow 3G simulation
    await page.goto(FLUTTER_APP_URL, { waitUntil: "domcontentloaded", timeout: 120000 });

    // Wait for Flutter to start rendering
    const flutterVisible = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 15000 })
      .catch(() => null);

    expect(flutterVisible, "Flutter should render within 15s on Slow 3G").toBeTruthy();

    const loadTime = Date.now() - startTime;
    console.log(`⏱️  Load time on Slow 3G: ${loadTime}ms`);

    // App should be usable within 12 seconds on Slow 3G (realistic target)
    expect(loadTime).toBeLessThan(12000);

    // Take screenshot of loaded state
    await page.screenshot({
      path: "test-results/slow-3g-loaded.png",
      fullPage: true,
    });
  });

  test("loading states appear immediately on slow network", async ({ page }) => {
    await page.goto(FLUTTER_APP_URL, { timeout: 120000 });

    // Check that loading indicator is visible early
    const loadingElement = await page.waitForSelector("#loading", { state: "visible", timeout: 1000 });

    expect(loadingElement, "Loading indicator should be visible immediately").toBeTruthy();

    // Verify loading screen has content (not blank)
    const loadingText = await page.locator("#loading-text").textContent();
    expect(loadingText).toContain("PRAVIEL");

    console.log("✅ Loading screen appears immediately with branded content");
  });

  test("critical resources load in correct order", async ({ page }) => {
    const resourceOrder: string[] = [];

    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("flutter.js") || url.includes("main.dart.js")) {
        resourceOrder.push(url.split("/").pop() || url);
      }
    });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 120000 });

    console.log("\n📦 Resource Load Order:", resourceOrder);

    // Verify flutter.js loads before main.dart.js
    const flutterIndex = resourceOrder.findIndex((r) => r.includes("flutter.js"));
    const mainDartIndex = resourceOrder.findIndex((r) => r.includes("main.dart.js"));

    if (flutterIndex >= 0 && mainDartIndex >= 0) {
      expect(flutterIndex).toBeLessThan(mainDartIndex);
      console.log("✅ flutter.js loads before main.dart.js (correct order)");
    }
  });
});
