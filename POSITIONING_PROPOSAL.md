# CRITICAL: Website Positioning Proposal

## The Problem with Current Positioning

**Current Hero Headline:** "Read the originals, not the translations"
- ❌ Positions PRAVIEL as a **reading tool** (like a dictionary)
- ❌ Targets scholars who already know Greek
- ❌ Feature-first, not outcome-first
- ❌ Emphasizes what's WRONG (translations) not what's POSSIBLE (learning)

**Current Flow:**
1. HeroSection: Reading problem (translations suck)
2. WhyPRAVIEL: More about translation problems
3. InteractiveDemo: Shows the READER (not Lessons!)
4. HowItWorks: Lessons buried in step 4 of 4

**Result:** Website feels like "AI-powered Reader app" not "Comprehensive Learning Platform"

---

## Competitive Analysis (2025)

### Duolingo Positioning:
- **Headline:** "The world's #1 way to learn a language"
- **Value Prop:** Fun, gamified, habit-forming
- **CTA:** "Start learning" (action-oriented)
- **Demo:** Shows a lesson, not a reading tool

### Babbel Positioning:
- **Headline:** "Learn a language"
- **Value Prop:** Focused learning, true retention
- **CTA:** "Start learning" (learning outcome)
- **Demo:** Interactive lesson experience

### PRAVIEL Current Positioning:
- **Headline:** "Read the originals, not the translations"
- **Value Prop:** Better reading experience
- **CTA:** "Try the Full Reader Free"
- **Demo:** Shows the Reader

**Gap:** We're positioning like Kindle (reading) when we should position like Duolingo (learning)

---

## Proposed Restructure

### New Hero Headline Options:

**Option 1 (Outcome-focused):**
```
Master ancient languages
Learn Latin, Greek, Hebrew as the ancients wrote them
```

**Option 2 (Transformation-focused):**
```
Read Homer in the original Greek
AI-powered lessons from authentic ancient texts
```

**Option 3 (Benefit-focused):**
```
Learn ancient languages through real texts
From the Iliad to the Bhagavad-Gītā—no translations, no filters
```

**Recommendation:** Option 2 (combines learning outcome + unique value prop)

### New Page Hierarchy:

**BEFORE (Current):**
1. HeroSection → Reading focus
2. TractionBar
3. WhyPRAVIEL → Translation problems
4. InteractiveDemo → Shows Reader
5. HowItWorks → 4 steps, Lessons last
6. LanguageShowcase
7. FeatureGrid
8. FAQ

**AFTER (Proposed):**
1. HeroSection → **Learning outcome** ("Master ancient languages")
2. TractionBar
3. **LessonsDemo** → **Show AI-generated lesson** from Iliad
4. WhyPRAVIEL → Why learning originals matters (not just "translations bad")
5. InteractiveReaderDemo → Show Reader as supplementary tool
6. HowItWorks → Reorder: Lessons FIRST, Reader second
7. LanguageShowcase
8. FeatureGrid (emphasize lesson variety)
9. FAQ

### Key Changes:

1. **Add LessonsDemo component** (NEW)
   - Shows AI-generated vocabulary quiz from Iliad
   - Interactive: user selects an answer, gets feedback
   - Demonstrates the MAIN feature (Lessons) not secondary feature (Reader)

2. **Restructure HowItWorks steps:**
   - Step 1: Choose Your Language (same)
   - Step 2: **Start with AI Lessons** (NEW - was buried in step 4)
   - Step 3: Read Authentic Texts with Interactive Reader (was step 2)
   - Step 4: Practice with Coach & Personas (was step 4, but expanded)

3. **Update all headlines from "Read" → "Learn":**
   - WhyPRAVIEL: "Every Translation is an Interpretation" → "Why Learn the Original Language?"
   - LanguageShowcase: "Read the Originals, Not the Translations" → "46 Ancient Languages to Master"
   - InteractiveDemo: "The Interactive Reader" → "Interactive Reading with Scholarly Analysis"

---

## Investor Messaging Improvements

### Current Problems:
- ❌ No measurable outcomes ("You'll reach A2 in 6 months")
- ❌ Feature list (46 languages) feels overwhelming
- ❌ Unclear revenue model
- ❌ Positioned as niche (scholars) not mass market (learners)

### Proposed Improvements:
1. **Add outcome metrics:**
   - "Read your first ancient text in 30 days"
   - "Master Classical Greek grammar in 6 months"
   - "Join 10,000+ learners worldwide"

2. **Focus the pitch:**
   - Lead with TOP 4 languages (Latin, Greek, Hebrew, Sanskrit)
   - "46 languages available" as secondary stat
   - Emphasize market size (theology students, classicists, lifelong learners)

3. **Clarify B2B opportunity:**
   - "Used by 10+ universities and seminaries"
   - "Institutional licensing available"
   - Position as education infrastructure, not consumer app

---

## Implementation Priority

**CRITICAL (Do immediately):**
1. ✅ Fix Greek text to use capitals (DONE)
2. ✅ Add scriptio continua toggle (DONE)
3. ✅ Add educational note (DONE)
4. ⏳ Update Hero headline to emphasize LEARNING
5. ⏳ Create LessonsDemo component
6. ⏳ Reorder HowItWorks steps (Lessons first)

**HIGH (Do next):**
7. Update all section headlines (Read → Learn)
8. Add measurable outcome stats
9. Emphasize TOP 4 languages first, 46 as secondary

**MEDIUM (Do when time permits):**
10. Add user testimonials/success stories
11. Create comparison table (vs Duolingo/Babbel for modern languages)
12. Add institutional adoption stats

---

## Specific Hero Section Proposal

```tsx
{/* New headline */}
<h1>
  <span className="block">Read Homer in</span>
  <span className="block gradient-text">the original Greek</span>
</h1>

{/* New subheadline */}
<p className="lead">
  Learn ancient languages through AI-powered lessons from authentic texts—
  the Iliad, the Aeneid, the Torah, the Bhagavad-Gītā.
  <strong>No translations. No filters. Just you and the ancients.</strong>
</p>

{/* Updated feature list */}
<div className="features">
  <Feature icon="✨" text="AI lessons from real ancient texts" />
  <Feature icon="📖" text="Interactive reader with scholarly analysis" />
  <Feature icon="💬" text="Chat with historical personas in their language" />
  <Feature icon="🏆" text="Gamified progress tracking" />
</div>

{/* CTA */}
<Button>Start Learning Free</Button>
<small>No signup • Lessons + Reader + Coach in 10 seconds</small>
```

---

## Conclusion

The current website positions PRAVIEL as an "AI-powered Reader with some lesson features."

The website SHOULD position PRAVIEL as a "Comprehensive ancient language learning platform with an excellent Reader."

This is not just semantic—it changes:
- Who visits the site (learners vs. scholars)
- What they expect (learning outcomes vs. reading tools)
- How they perceive value (Duolingo-level engagement vs. dictionary-level utility)
- What investors see (mass market EdTech vs. niche academic tool)

**Next Step:** Implement the Hero Section changes and create LessonsDemo component.
