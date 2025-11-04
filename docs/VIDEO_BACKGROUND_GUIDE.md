# Video Background Implementation Guide

## Overview

Your PRAVIEL website now supports immersive video backgrounds with full accessibility, performance optimization, and mobile support. This guide will help you create and implement the perfect background video.

---

## 🎬 What to Create with Your AI Video Generator

### **Theme & Content Recommendations**

Create a video that matches the ancient civilization aesthetic of PRAVIEL:

**Ancient Texts & Scrolls:**
- Slowly unfurling papyrus scrolls with ancient text
- Pages turning in old manuscripts
- Greek, Latin, or Hebrew characters fading in/out
- Ancient stone tablets with inscriptions

**Ancient Civilizations:**
- Warm golden sand particles floating gently
- Egyptian hieroglyphics with subtle glow
- Classical Greek columns with soft lighting
- Ancient library ambiance with dust motes

**Abstract Ancient Patterns:**
- Flowing golden ink creating calligraphy
- Geometric patterns inspired by ancient art
- Subtle texture of aged papyrus or parchment
- Warm candlelight ambiance

### **Motion Guidelines**

- **SLOW and SUBTLE** - Users shouldn't be distracted from reading content
- **CALMING** - Think meditative, not energetic
- **LOOPABLE** - 15-30 seconds that seamlessly repeats
- **NO QUICK CUTS** - Smooth, continuous motion only

### **Color Palette**

Match PRAVIEL's branding:
- **Primary**: Warm golds (#D4AF37, #E8C55B)
- **Secondary**: Deep blues (#1e40af, #3b82f6)
- **Accent**: Terracotta red (#CD5C5C)
- **Background**: Dark blacks, warm sepia tones
- **Overall tone**: Warm, ancient, scholarly

---

## 📐 Technical Specifications

### **Resolution & Format**

**Export TWO versions of your video:**

1. **WebM (Primary)**
   - Codec: VP9 or AV1
   - Resolution: 1920x1080 (1080p)
   - Bitrate: 2-4 Mbps
   - Target size: < 3-5 MB
   - Best for Chrome, Firefox, Edge

2. **MP4 (Fallback)**
   - Codec: H.264
   - Resolution: 1920x1080 (1080p)
   - Bitrate: 3-5 Mbps
   - Target size: < 5-7 MB
   - Required for Safari, iOS

### **Duration**

- **Optimal**: 20 seconds
- **Minimum**: 10 seconds
- **Maximum**: 30 seconds
- Must loop seamlessly (end frame = start frame)

### **Optimization is CRITICAL**

**Your video MUST be heavily compressed:**
- ❌ 50MB video = Site unusable on mobile
- ✅ 5MB video = Fast, smooth experience

**Compression tools:**
- [HandBrake](https://handbrake.fr/) - Free, powerful
- [FFmpeg](https://ffmpeg.org/) - Command-line
- [CloudConvert](https://cloudconvert.com/) - Online
- AI video generators often have export quality settings - USE THEM

---

## 💾 File Placement

Once you have your optimized videos:

1. Create a `videos` folder in `/public/`:
   ```
   /public/videos/
   ```

2. Name your files descriptively:
   ```
   ancient-scrolls.webm
   ancient-scrolls.mp4
   ```

3. Also export a **poster image** (first frame):
   ```
   /public/images/ancient-scrolls-poster.jpg
   ```
   - Format: JPEG or WebP
   - Optimized (< 200 KB)
   - Same 1920x1080 resolution

---

## 🔧 Implementation

### **Step 1: Place Your Files**

```
/public
  /videos
    ancient-scrolls.webm (< 5 MB)
    ancient-scrolls.mp4 (< 7 MB)
  /images
    ancient-scrolls-poster.jpg (< 200 KB)
```

### **Step 2: Edit HeroSection.tsx**

Open `/components/HeroSection.tsx` and find this block (around line 42):

```tsx
{/*
  VIDEO BACKGROUND (Optional - uncomment and add your video files)
  ...
*/}
```

**Uncomment and replace with:**

```tsx
<VideoBackground
  webmSrc="/videos/ancient-scrolls.webm"
  mp4Src="/videos/ancient-scrolls.mp4"
  posterSrc="/images/ancient-scrolls-poster.jpg"
  overlayOpacity={0.7}
/>
```

**Important:** Place this **BEFORE** the current gradient backgrounds so it renders underneath.

### **Step 3: Adjust Overlay Opacity**

The `overlayOpacity` prop controls the glass morphism effect:

- `0.5` = Light overlay, video very visible (more immersive)
- `0.7` = **RECOMMENDED** - Balanced visibility and text readability
- `0.9` = Heavy overlay, video barely visible (more text focus)

Test different values to find what works best with your video.

### **Step 4: Test**

```bash
pnpm dev
```

Visit http://localhost:3001 and check:
- ✅ Video loads smoothly
- ✅ Text is readable over video
- ✅ Video loops seamlessly
- ✅ No performance issues

---

## ♿ Accessibility Features (Already Built-In)

Your `VideoBackground` component automatically handles:

✅ **Respects `prefers-reduced-motion`**
   - Users who prefer reduced motion see a static poster image instead
   - No video loads for them = faster, more accessible

✅ **Lazy loading**
   - Video only loads when hero section is visible
   - Saves bandwidth on slow connections

✅ **Auto-pause when off-screen**
   - Saves battery on mobile devices
   - Resumes when scrolled back into view

✅ **GPU acceleration**
   - Smooth playback even on older devices
   - No janky scrolling

✅ **Fallback support**
   - WebM for modern browsers (smaller files)
   - MP4 for Safari/iOS (universal compatibility)
   - Poster image if video fails to load

---

## 📱 Mobile Considerations

**The video background will work on mobile**, but:

1. **File size is MORE critical**
   - 5MB on desktop = 5MB on 4G connection
   - Aim for < 3MB if possible

2. **iOS Limitations**
   - iOS **requires** MP4 format (WebM not supported)
   - iOS may not autoplay video without user interaction
   - Poster image will show until user scrolls/interacts

3. **Battery impact**
   - Auto-pause when off-screen helps
   - Consider a simpler video for mobile (less detail = smaller file)

---

## 🎨 Example Video Ideas

### **Option 1: Floating Papyrus Particles**
- Golden papyrus fragments gently floating
- Soft focus, dark background
- 20-second seamless loop
- Very subtle motion

### **Option 2: Ancient Text Reveal**
- Slowly panning across ancient Greek text
- Soft golden glow highlighting words
- Candle-like lighting effects
- 25-second continuous pan

### **Option 3: Ink Calligraphy**
- Golden ink slowly forming ancient characters
- Fades in/out gracefully
- Abstract, mesmerizing
- 15-second loop

### **Option 4: Library Atmosphere**
- Close-up of old book pages
- Dust motes in warm sunlight
- Very slow zoom
- 30-second atmospheric loop

---

## 🧪 Testing Checklist

Before going live, test:

- [ ] Desktop Chrome (WebM should load)
- [ ] Desktop Safari (MP4 should load)
- [ ] iPhone Safari (poster image, then MP4)
- [ ] Android Chrome (WebM should load)
- [ ] Slow 3G simulation (does it load reasonably?)
- [ ] With `prefers-reduced-motion` enabled (should show static image)
- [ ] Video loops seamlessly (no visible jump)
- [ ] Text is readable over video (adjust overlayOpacity if not)
- [ ] No stuttering during scroll
- [ ] File sizes are optimized (< 5 MB WebM, < 7 MB MP4)

---

## 🚀 Performance Tips

**If video is causing performance issues:**

1. **Reduce resolution** to 1280x720 (720p)
2. **Increase compression** (lower bitrate)
3. **Shorten duration** to 15 seconds
4. **Simplify motion** (less detail = better compression)
5. **Increase overlayOpacity** to 0.8-0.9 (less visible = less distracting)

**If mobile performance is poor:**

1. Consider **NOT loading video on mobile** (edit VideoBackground component)
2. Use a **simpler, smaller video** for mobile only
3. Increase overlay to 0.9 (makes any stuttering less noticeable)

---

## 📊 Expected File Sizes

**Good:**
- WebM: 2-4 MB ✅
- MP4: 4-6 MB ✅
- Poster: < 200 KB ✅
- Total: < 7 MB

**Too large:**
- WebM: > 8 MB ❌
- MP4: > 12 MB ❌
- Will cause slow loading, poor mobile experience

---

## 🎯 Final Recommendations

**Best approach:**
1. Generate a beautiful, subtle video matching the specifications above
2. Export in **both WebM and MP4** formats
3. **Compress heavily** (aim for 3-5 MB total)
4. Test on real devices before deploying
5. **Start with overlayOpacity at 0.7** and adjust as needed

**Alternative approach (if unsure):**
- Generate a **single high-quality poster image** instead
- Use that as a static background
- Much simpler, zero performance impact
- Still looks premium

---

## ❓ Questions?

If you run into issues:
1. Check browser console for errors
2. Verify file paths are correct (`/public/videos/...`)
3. Test video files play in VLC or browser directly
4. Ensure files are properly compressed
5. Try reducing overlayOpacity to see if video is actually loading

---

**You now have a production-ready video background system!**

Generate your video, optimize it, and drop it in. The component handles everything else automatically. 🎬
