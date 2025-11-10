# Playwright test configuration reference

Taken from https://playwright.dev/docs/test-configuration (Playwright 1.49, Nov 2025).

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    actionTimeout: 0,
    navigationTimeout: 30 * 1000,
  },
  globalTimeout: 60 * 60 * 1000,
});
```
