import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const skipWebkit = process.env.SKIP_WEBKIT === "1";
const enableTestRoutesHeader = process.env.ENABLE_TEST_ROUTES === "true";

const projects = [
  {
    name: "chromium-desktop",
    use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
  },
  {
    name: "firefox-desktop",
    use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 800 } },
  },
  {
    name: "chromium-mobile",
    use: { ...devices["Pixel 5"] },
  },
];

if (!skipWebkit) {
  projects.push({
    name: "webkit-mobile",
    use: { ...devices["iPhone 14 Pro"] },
  });
  projects.push({
    name: "webkit-ipad",
    use: { ...devices["iPad Pro 11"] },
  });
}

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [["line"], ["html", { open: "never" }]],
  use: {
    baseURL,
    extraHTTPHeaders: enableTestRoutesHeader
      ? {
          "x-enable-test-routes": "1",
        }
      : undefined,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects,
});
