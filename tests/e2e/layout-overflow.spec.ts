import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const FLUTTER_APP_URL = "https://8ead70d5.app-praviel.pages.dev";

const NAV_TARGETS = {
  home: { x: 94, y: 640 },
  lessons: { x: 187, y: 640 },
  profile: { x: 280, y: 640 },
  lessonCard: { x: 187, y: 250 },
};

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const SECTIONS: Array<"home" | "lessons" | "profile" | "reading"> = [
  "home",
  "lessons",
  "profile",
  "reading",
];

async function gotoFlutter(page: Page, viewport: { width: number; height: number }) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(FLUTTER_APP_URL, { waitUntil: "networkidle", timeout: 60000 });
  const flutterSurface = await page
    .waitForSelector("flt-glass-pane, flutter-view, canvas", { timeout: 60000 })
    .catch(() => null);
  return flutterSurface !== null;
}

async function navigateToSection(page: Page, section: "home" | "lessons" | "profile" | "reading") {
  switch (section) {
    case "home":
      await page.mouse.click(NAV_TARGETS.home.x, NAV_TARGETS.home.y);
      break;
    case "lessons":
      await page.mouse.click(NAV_TARGETS.lessons.x, NAV_TARGETS.lessons.y);
      break;
    case "profile":
      await page.mouse.click(NAV_TARGETS.profile.x, NAV_TARGETS.profile.y);
      break;
    case "reading":
      await page.mouse.click(NAV_TARGETS.home.x, NAV_TARGETS.home.y);
      await page.waitForTimeout(600);
      await page.mouse.click(NAV_TARGETS.lessonCard.x, NAV_TARGETS.lessonCard.y);
      break;
  }
  await page.waitForTimeout(section === "reading" ? 2000 : 1200);
}

async function assertNoOverflow(page: Page, label: string) {
  const overflow = await page.evaluate(() => {
    const docOverflow =
      document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const bodyOverflow = document.body.scrollWidth - document.body.clientWidth;
    return Math.max(docOverflow, bodyOverflow);
  });
  expect(
    overflow,
    `${label} should not introduce horizontal scrolling (overflow=${overflow}px)`,
  ).toBeLessThanOrEqual(1);
}

test.describe("Layout overflow guardrails", () => {
  for (const viewport of VIEWPORTS) {
    for (const section of SECTIONS) {
      test(`no horizontal overflow on ${section} (${viewport.name})`, async ({ page }) => {
        const ready = await gotoFlutter(page, viewport);
        if (!ready) {
          test.skip(true, "Flutter app not reachable");
          return;
        }
        await page.waitForTimeout(2500);
        await navigateToSection(page, section);
        await assertNoOverflow(page, `${section}-${viewport.name}`);
      });
    }
  }
});
