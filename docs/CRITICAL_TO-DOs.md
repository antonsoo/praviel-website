# Critical To-Dos

**Purpose**: Track essential work that must be completed. Keep this file concise and information-dense.

**Rules**:
- Only include actionable, critical tasks
- Remove completed items immediately
- No vanity metrics or progress reports
- Dense, scannable format only

---

## Active Tasks

- [ ] **[Testing/Mobile]** Verify hero headline text wrapping on mobile devices (320px-414px widths) - `whitespace-nowrap` applied, need visual confirmation on actual devices. Test: iPhone SE (375px), iPhone 12/13/14 (390px), Pixel 5 (393px). (2025-11-04)
- [ ] **[Testing/Browser]** Cross-browser verification of hero text on Safari 16.x/17.x - `whitespace-nowrap` has excellent support but need visual confirmation, especially Safari 16.4-17.3 before text-wrap support was added. (2025-11-04)
- [ ] **[Migration]** Migrate middleware.ts → proxy.ts - Next.js 16 deprecation warning. Not blocking but should migrate before Next.js 17. OpenNext Cloudflare doesn't support proxy.ts yet (tracked in opennextjs/cloudflare#962). Wait for upstream support. (2025-11-04)

---

## Notes

- This file is monitored by AI agents and should not exceed 100 lines to avoid context bloat
- For archived/completed work history, see git commit messages—not this file
