# Next Session: Final Website Polish & Blog Post Implementation

## Priority Tasks for Next Session

### 1. Code Blog Post (HIGHEST PRIORITY)
**File:** `docs/blog_posts/blog_post_1_Nov-8-2025.md`
**Location:** Create at `app/blog/2025-11-08-case-for-classics/page.tsx`

**Content Summary:**
- Title: "The Case for the Classics: Decline, Revival, and the Future of Learning Ancient Languages"
- Author: Anton Soloviev (Founder of PRAVIEL)
- Date: October 14, 2025 (written) / November 8, 2025 (uploaded)
- Length: ~3,500 words
- Sections:
  - Introduction: Why Ancient Languages Matter Now
  - Historical Implementation of Classical Education
  - Shift and Decline (1950-1970 saw 80% drop in US Latin students)
  - Intellectual Trends Contributing to Decline
  - Consequences of Removing Classical Education
  - State of Classics in Academia: Crisis and Critiques
  - Revival Efforts and Modern Movements
  - The Path Forward: A New Era for Ancient Languages (PRAVIEL pitch)

**Implementation:**
- Create MDX or markdown rendering for blog post
- Add proper typography and formatting
- Include table of contents
- Add reading time estimate
- Ensure mobile-friendly
- Add social sharing buttons (optional)
- Link from homepage blog section
- Generate RSS feed entry

### 2. Restore Background Video with Lazy Loading
**Current State:** Videos replaced with static images for LCP optimization
**Required:** Background video working WITH fast LCP

**Implementation:**
1. Create `components/LazyVideo.tsx` client component
2. Load static image with `priority` (fast LCP)
3. After `onLoad` event, dynamically inject `<video>` element
4. Fade video in when ready (`canplay` event)
5. Respect `prefers-reduced-motion` (no video)
6. Fallback to gradient if video fails to load

**Code Structure:**
```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function LazyVideo({
  posterSrc,
  videoSources,
  className,
  alt
}: {
  posterSrc: string;
  videoSources: { src: string; type: string }[];
  className?: string;
  alt: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // After image loads, start loading video
    if (imageLoaded && videoRef.current) {
      videoRef.current.load();
    }
  }, [imageLoaded]);

  return (
    <>
      {/* Priority image for fast LCP */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        priority
        quality={90}
        className={`${className} ${videoReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Lazy-loaded video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`${className} ${videoReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 motion-reduce:hidden`}
        onCanPlay={() => setVideoReady(true)}
      >
        {videoSources.map(source => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </>
  );
}
```

### 3. Make FAQ Collapsible
**Current:** Shows all 9 FAQs
**Target:** Show 5 initially, "Show 4 more questions" button

**Files to Modify:**
- `components/FAQ.tsx` → Convert to client component with useState
- Show first 5 FAQs by default
- Add "Show X more questions" button
- Animate expansion with smooth transition

### 4. Add Subtle Scroll Animations
**Libraries to Consider:**
- Framer Motion (add if not present)
- Or CSS-only with `IntersectionObserver`

**Elements to Animate:**
- Fade-in sections on scroll
- Parallax effect on hero background
- Stagger animation for language cards
- Hover effects on interactive elements

### 5. Optimize Mobile Performance
**Key Actions:**
- Lazy load images below fold
- Reduce video quality on mobile (or skip video entirely)
- Simplify animations on mobile
- Test scroll performance
- Reduce bundle size
- Code-split heavy components

**Check:**
- Touch targets ≥ 44px
- Text readable on small screens
- No horizontal scroll
- Fast scroll performance (no jank)

### 6. Test Everything
**Before Deploy:**
- ✅ Background video works on desktop
- ✅ Static image shows on mobile (or low-quality video)
- ✅ FAQ collapse/expand works
- ✅ All CTAs clickable
- ✅ Links work
- ✅ Mobile responsive
- ✅ Fast on mobile (no lag)
- ✅ Smooth scrolling
- ✅ Animations don't interfere with reading
- ✅ Blog post renders correctly
- ✅ RSS feed validates

### 7. Build and Deploy
**Steps:**
1. `pnpm typecheck` (must pass)
2. `pnpm lint` (must pass)
3. `rm -rf .next .open-next`
4. `SKIP_OBSERVABILITY_CHECK=true pnpm with-release npx opennextjs-cloudflare build`
5. `npx opennextjs-cloudflare deploy`
6. Verify deployment at https://praviel-site.antonnsoloviev.workers.dev
7. Test on real mobile device
8. `git add -A`
9. `git commit -m "feat: Final website polish + blog post"`
10. `git push origin main`

## Files Created/Modified (Expected)

### New Files:
1. `components/LazyVideo.tsx` (lazy-loading video component)
2. `app/blog/2025-11-08-case-for-classics/page.tsx` (blog post)
3. `app/blog/2025-11-08-case-for-classics/opengraph-image.png` (optional OG image)

### Modified Files:
1. `components/HeroSection.tsx` (use LazyVideo component)
2. `components/FAQ.tsx` (add collapse/expand functionality)
3. `app/blog/page.tsx` (list new blog post)
4. `app/feed.xml/route.ts` (add blog post to RSS)
5. Possibly: `package.json` (if adding framer-motion for animations)

## Success Criteria

### Visual/UX:
- ✅ Background video plays smoothly on desktop
- ✅ Fast initial load (LCP < 2.5s)
- ✅ Site feels fun and engaging (not dry/academic)
- ✅ Reduced information overload (no overwhelming text walls)
- ✅ Smooth animations and transitions
- ✅ No jank or lag on mobile

### Technical:
- ✅ All tests pass (typecheck, lint)
- ✅ Build succeeds
- ✅ Deploy succeeds
- ✅ No console errors
- ✅ No broken links
- ✅ Accessible (keyboard nav, screen readers)

### Content:
- ✅ Blog post displays correctly
- ✅ RSS feed includes new post
- ✅ Reading time estimate accurate
- ✅ Mobile-friendly formatting
- ✅ Proper metadata (title, description, OG tags)

## Notes for Next Session

1. **Blog Post is Top Priority** - User explicitly requested this be ready for next session
2. **Background Video Must Work** - User emphasized this multiple times
3. **Performance is Critical** - "NO LAG" on mobile was stressed
4. **Keep It Fun** - Not nerdy/annoying, make it feel like an adventure
5. **Don't Add New Sections** - Improve what exists
6. **No Testimonials/Social Proof Yet** - Build those first
7. **No Flutter App Features** - The web app is one click away

## Current State (End of This Session)

**Completed:**
- ✅ Comprehensive website critique (67 pages)
- ✅ Reviewed core documentation from main repo
- ✅ Reviewed blog post content
- ✅ Created improvement plan
- ✅ Fixed platform availability messaging
- ✅ Clarified waitlist purpose
- ✅ Added competitive positioning FAQs
- ✅ Attempted LCP optimization (replaced videos with images)
- ✅ Deployed version 92ef9e03 (with changes)

**Pending:**
- ❌ Restore background video (properly, with lazy loading)
- ❌ Reduce information overload (FAQ collapse)
- ❌ Add scroll animations
- ❌ Mobile performance optimization
- ❌ Spacing/sizing standardization
- ❌ Code blog post
- ❌ Final testing and polish
- ❌ Build and deploy final version

## Estimated Time for Next Session
- Blog post implementation: 1-2 hours
- Background video restoration: 30-60 minutes
- FAQ collapse functionality: 20-30 minutes
- Scroll animations: 30-60 minutes
- Mobile optimization: 30-60 minutes
- Testing: 30-60 minutes
- Build/deploy: 15-30 minutes
- **Total: 4-6 hours**

## Quick Reference

**Core Message:**
- "The Conversation Across Millennia"
- Every translation is an interpretation (nuance lost)
- Learn the originals (direct access to Homer, Plato, Vedas)
- 46 languages, 5,000 years
- Research-grade accuracy (zero hallucinations)
- Privacy-first (BYOK, no tracking)
- AI-powered (GPT-5, Claude 4.5, Gemini 2.5)
- Gamified (XP, streaks, achievements)

**Target Feeling:**
- Curious ("I want to know more")
- Excited ("This looks fun!")
- Capable ("I can do this")
- Connected ("I'm joining something meaningful")

**Ancient languages = unlocking secret knowledge, NOT studying for a test**
