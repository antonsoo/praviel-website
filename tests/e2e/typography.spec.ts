import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

test.describe("Script showcase", () => {
  test("renders canonical scripts without tofu", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Visual baseline maintained on desktop Chromium until WebKit deps land",
    );

    await page.goto("/test/scripts?enable-test-routes=1");
    const grid = page.getByTestId("script-showcase-grid");
    await expect(grid).toBeVisible();

    await expect(grid).toHaveScreenshot({
      animations: "disabled",
      caret: "hide",
      scale: "device",
    });

    const outputDir = join(process.cwd(), "test-results", "typography");
    await mkdir(outputDir, { recursive: true });
    await page.screenshot({
      path: join(outputDir, `latest-${testInfo.project.name}.png`),
      fullPage: true,
      animations: "disabled",
    });
  });
});
