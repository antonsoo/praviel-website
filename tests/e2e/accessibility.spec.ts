import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test("home page has no critical axe violations", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Run axe once on desktop to keep runtime low");

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["document-title", "html-has-lang"])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      JSON.stringify(accessibilityScanResults.violations, null, 2)
    ).toHaveLength(0);
  });
});
