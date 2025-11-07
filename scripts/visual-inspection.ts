import { chromium } from "playwright";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

async function visualInspection() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
  });

  const page = await context.newPage();

  console.log("📱 Loading Flutter app on mobile viewport...");
  await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 90000 });

  // Wait for Flutter to render
  await page.waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 });
  await page.waitForTimeout(5000); // Let animations settle

  console.log("📸 Taking screenshots...");

  // Screenshot 1: Initial load
  await page.screenshot({
    path: "visual-inspection/01-mobile-home.png",
    fullPage: true,
  });

  console.log("✅ Screenshot 1: Home page");

  // Try to find and tap elements to navigate
  // Since Flutter renders to canvas, we need to use coordinates or wait for semantics

  // Screenshot 2: After 2 seconds (might show different state)
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "visual-inspection/02-mobile-after-load.png",
    fullPage: true,
  });

  console.log("✅ Screenshot 2: After full load");

  // Test touch target by tapping at various locations
  // Top right (likely settings/profile)
  await page.mouse.click(350, 50);
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: "visual-inspection/03-mobile-top-right-tap.png",
    fullPage: true,
  });

  console.log("✅ Screenshot 3: After top-right tap");

  await browser.close();

  console.log("\n🎨 Visual inspection complete!");
  console.log("📂 Screenshots saved to visual-inspection/");
  console.log("\n🔍 Manual review needed:");
  console.log("  - Are text sizes readable on mobile?");
  console.log("  - Are buttons easy to tap?");
  console.log("  - Is spacing comfortable?");
  console.log("  - Are colors properly contrasted?");
}

visualInspection().catch(console.error);
