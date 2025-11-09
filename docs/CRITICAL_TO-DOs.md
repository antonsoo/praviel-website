# Critical To-Dos

Concise, actionable items only. Remove completed items immediately.

---

## Recently Completed ✅ (Nov 8, 2025 Session)

### ✅ Blog Feature Implementation + Enhancements - COMPLETED
**Goal**: Add full-featured blog to marketing website for thought leadership and SEO

**Initial Implementation**:
- Static markdown-based blog with gray-matter frontmatter parsing
- Server-side rendering with remark + remark-gfm + remark-html
- Next.js 16 App Router with generateStaticParams for optimal performance
- Custom prose styling matching site aesthetic (gold/blue theme)
- Full SEO optimization (metadata, structured data, OpenGraph)

**Enhancements Added (Second deployment)**:
- Reading time calculation and display using reading-time package
- OpenGraph image (og:image) for social media previews
- Twitter Card image support
- RSS 2.0, Atom 1.0, and JSON Feed endpoints (/feed.xml, /atom.xml, /feed.json)
- Blog-specific loading state to fix skeleton loader issue

**Files Created**:
- lib/blog.ts: Markdown processing utilities + reading time calculation
- app/blog/page.tsx: Blog listing page with cards, tags, and reading time
- app/blog/[slug]/page.tsx: Dynamic blog post page with og:image and reading time
- app/blog/loading.tsx: Blog-specific loading state (fixes skeleton issue)
- app/feed.xml/route.ts, app/atom.xml/route.ts, app/feed.json/route.ts: RSS feeds
- content/blog/2025-11-08-case-for-classics.md: First blog post (8,500+ words)
- Comprehensive prose styling in globals.css

**First Post**: "The Case for the Classics" - historical analysis of classical education decline and revival

**Quality**: ✓ TypeScript ✓ ESLint ✓ Build ✓ Tested ✓ Deployed
**Initial Deploy**: Version 87bebc0f-bac8-41fd-a6bc-e82b62a6ec57
**Enhanced Deploy**: Version 179e8728-a373-4a83-bd44-d3063c41060f
**Commits**: 92f62f4 (initial), 27a9bc3 (enhancements) - Nov 8, 2025

**Known Issue**: RSS feeds currently empty - requires static generation for Cloudflare Workers (no runtime filesystem access)

---

### ✅ Video Compression (BLOCKING MOBILE PERFORMANCE) - COMPLETED
**Problem**: Video files were MASSIVE (6.1MB + 5.9MB = 12MB total)
**Impact**: Was destroying mobile performance, terrible Core Web Vitals, burning data plans, 10+ second load on 3G

**Solution Implemented**:
- Compressed MP4 videos:
  - Desktop: 6.1MB → 1.7MB (72% reduction)
  - Mobile: 5.9MB → 1.5MB (75% reduction)
- Created WebM versions:
  - Desktop: 1.3MB (79% reduction) ✓ Meets < 1.5MB target
  - Mobile: 1.7MB (71% reduction)
- Added poster images (45KB desktop, 52KB mobile) for faster LCP
- Updated HeroSection.tsx with multi-source video (WebM + MP4 fallback)
- Total video payload reduced from 12MB → ~3MB (75% reduction)

**Result**: Massively improved mobile performance, better Core Web Vitals, faster load times
**Deployed**: Version 8228f69c-65ae-4bc6-913b-c9d730b1a344
**Commit**: d0b9238 (Nov 8, 2025)

---

## High Priority

### Mobile Performance Testing
- [ ] Test Core Web Vitals on actual mobile devices (iOS Safari, Android Chrome)
- [ ] Measure LCP impact of background videos on mobile
- [ ] Test on low-end devices (< 4GB RAM) and slow connections (3G)
- [ ] Verify no layout shift from videos

### Video Optimizations
- [x] Change preload from "metadata" to "none" for better LCP (DONE - already "none")
- [ ] Add error handling for video load failures
- [ ] Consider lazy-loading videos with Intersection Observer

---

## Future Enhancements

### Blog
- [ ] Fix RSS feeds to work with Cloudflare Workers (generate feeds statically at build time)
- [ ] Add blog post search functionality
- [ ] Add tag filtering on blog listing page
- [ ] Consider adding table of contents for long posts
- [ ] Add "Share on Twitter/LinkedIn" buttons

### Interactive Demos
- [ ] Add Intersection Observer for lazy-loading (only load when scrolled into view)
- [ ] Add E2E tests for InteractiveDemo and LessonsDemo
- [ ] Consider adding more language examples (Egyptian, Latin, etc.)
- [ ] Add completion celebration animation when all matches found
- [ ] Track demo engagement in analytics

### General
- [ ] Add automated tests for cookie consent functionality
- [ ] Consider adding error boundary around CookieConsent component
- [ ] Monitor Sentry for any errors in production

---

*Last updated: 2025-11-08 (post-blog enhancements: reading time, og:image, RSS feeds)*
