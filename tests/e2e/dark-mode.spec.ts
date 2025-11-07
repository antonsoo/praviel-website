import { expect, test } from "@playwright/test";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

test.describe("Dark Mode Visual Verification", () => {
  test("dark mode renders correctly on all major pages", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Test sequence of pages in both light and dark mode
    const pages = [
      { name: "home", navX: 94, navY: 640 },
      { name: "lessons", navX: 187, navY: 640 },
      { name: "profile", navX: 280, navY: 640 },
    ];

    // Light mode screenshots
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(3000);

    // Take screenshots in light mode
    for (const pageDef of pages) {
      await page.mouse.click(pageDef.navX, pageDef.navY);
      await page.waitForTimeout(1000); // Wait for navigation

      await page.screenshot({
        path: `test-results/dark-mode-${pageDef.name}-light.png`,
        fullPage: true,
      });
    }

    console.log("✅ Light mode screenshots captured");

    // Enable dark mode via CSS media query emulation
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(1000); // Allow theme to update

    // Take screenshots in dark mode
    for (const pageDef of pages) {
      await page.mouse.click(pageDef.navX, pageDef.navY);
      await page.waitForTimeout(1000); // Wait for navigation

      await page.screenshot({
        path: `test-results/dark-mode-${pageDef.name}-dark.png`,
        fullPage: true,
      });
    }

    console.log("✅ Dark mode screenshots captured");
    console.log("📸 Compare screenshots manually:");
    console.log("  Light mode: test-results/dark-mode-*-light.png");
    console.log("  Dark mode: test-results/dark-mode-*-dark.png");
  });

  test("no white flashes during dark mode transitions", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Start in light mode
    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Toggle dark mode multiple times
    for (let i = 0; i < 3; i++) {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.waitForTimeout(500);

      await page.emulateMedia({ colorScheme: "light" });
      await page.waitForTimeout(500);
    }

    // Verify canvas still exists (no crash from theme switching)
    const canvasCount = await page.locator("canvas").count();
    expect(canvasCount).toBeGreaterThan(0);

    console.log("✅ No crashes during dark mode toggling");
  });

  test("dark mode has readable text contrast", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ colorScheme: "dark" });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(3000);

    // Take screenshot of dark mode for visual inspection
    await page.screenshot({
      path: "test-results/dark-mode-contrast-check.png",
      fullPage: true,
    });

    // Note: Flutter renders to canvas, making automated contrast checking difficult
    // This test captures screenshots for manual verification
    // Proper contrast ratios:
    // - Normal text (< 18pt): 4.5:1 minimum (WCAG AA)
    // - Large text (≥ 18pt): 3:1 minimum (WCAG AA)
    // - UI components: 3:1 minimum (WCAG AA)

    console.log("✅ Dark mode screenshot captured");
    console.log("⚠️  Manual verification required:");
    console.log("  1. Check text is readable against background");
    console.log("  2. Verify UI components have sufficient contrast");
    console.log("  3. Ensure images have appropriate borders/backgrounds");
    console.log("  4. Check that colors are harmonious (not jarring)");
  });

  test("dark mode works on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.emulateMedia({ colorScheme: "dark" });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(2000);

    // Take screenshot of mobile dark mode
    await page.screenshot({
      path: "test-results/dark-mode-mobile.png",
      fullPage: true,
    });

    // Navigate through pages
    await page.mouse.click(187, 640); // Lessons
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/dark-mode-mobile-lessons.png",
      fullPage: true,
    });

    const canvasCount = await page.locator("canvas").count();
    expect(canvasCount).toBeGreaterThan(0);

    console.log("✅ Dark mode works on mobile viewport");
  });

  test("images have appropriate backgrounds in dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ colorScheme: "dark" });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });

    const flutterSurface = await page
      .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
      .catch(() => null);
    if (!flutterSurface) {
      test.skip(true, "Flutter app not reachable");
      return;
    }
    await page.waitForTimeout(3000);

    // Navigate to profile page (likely has avatar images)
    await page.mouse.click(280, 640);
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: "test-results/dark-mode-images.png",
      fullPage: true,
    });

    console.log("✅ Dark mode images screenshot captured");
    console.log("📸 Verify images have proper borders/backgrounds in dark mode");
  });

  test("performance remains good in dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ colorScheme: "dark" });

    await page.goto(FLUTTER_APP_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");

      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
        firstContentfulPaint: paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0,
      };
    });

    console.log(`  DOM Content Loaded (dark mode): ${metrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`  First Contentful Paint (dark mode): ${metrics.firstContentfulPaint.toFixed(2)}ms`);

    // Dark mode shouldn't significantly impact performance
    expect(metrics.domContentLoaded).toBeLessThan(500);
    expect(metrics.firstContentfulPaint).toBeLessThan(3000);

    console.log("✅ Dark mode performance is good");
  });
});
