import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

test.describe("Script showcase", () => {
  test("renders canonical scripts without tofu", async ({ page }, testInfo) => {
    const allowProjects = ["chromium-desktop", "chromium-mobile"];
    test.skip(
      !allowProjects.some((name) => testInfo.project.name.includes(name)),
      "Typography harness validated on Chromium profiles only",
    );

    await page.goto("/test/scripts?enable-test-routes=1");
    const grid = page.getByTestId("script-showcase-grid");
    await expect(grid).toBeVisible();

    if (testInfo.project.name.includes("chromium-desktop")) {
      await expect(grid).toHaveScreenshot({
        animations: "disabled",
        caret: "hide",
        scale: "device",
      });
    }

    const outputDir = join(process.cwd(), "test-results", "typography");
    await mkdir(outputDir, { recursive: true });
    await page.screenshot({
      path: join(outputDir, `latest-${testInfo.project.name}.png`),
      fullPage: true,
      animations: "disabled",
    });
  });
});
