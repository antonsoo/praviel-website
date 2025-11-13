import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Language roadmap accessibility", () => {
  test("roadmap cards remain focusable and pass axe", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Single desktop run keeps runtime manageable");

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const roadmapSection = page.locator("#language-roadmap");
    await expect(roadmapSection).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("#language-roadmap")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      JSON.stringify(accessibilityScanResults.violations, null, 2),
    ).toHaveLength(0);

    const firstCard = roadmapSection.locator("[role='group']").first();
    await firstCard.focus();
    await expect(firstCard).toBeFocused();

    const ringShadow = await firstCard.evaluate((node) => window.getComputedStyle(node).boxShadow);
    expect(ringShadow).not.toBe("none");
  });
});
