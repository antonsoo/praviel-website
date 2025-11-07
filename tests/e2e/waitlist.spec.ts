import { expect, test } from "@playwright/test";

const createTestEmail = () => `qa-waitlist+${Date.now()}@praviel.com`;
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const waitlistEndpoint = new URL("/test/api/waitlist", baseURL).toString();

test.describe("Waitlist form", () => {
  test("accepts new registrations and handles duplicates gracefully", async ({ request: _request }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Run waitlist flow once on desktop Chromium to limit production writes");

    const email = createTestEmail();
    const submit = async () => {
      const response = await fetch(`${waitlistEndpoint}?enable-test-routes=1`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-enable-test-routes": "1",
        },
        body: JSON.stringify({ email, source: "e2e" }),
      });
      expect(response.ok).toBeTruthy();
      const json = await response.json();
      expect(json.ok).toBeTruthy();
    };

    await submit();
    await submit();
  });
});
