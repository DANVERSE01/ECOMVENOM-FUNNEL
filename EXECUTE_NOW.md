# ECOMVENOM — Final Execution Plan
# Performance + Polish + YouTube Migration + Repo Cleanup
# v3.1 — Single-pass execution

---

## CONTEXT

```
Project root  : D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
Branch        : premium-transformation-may-2026
Last commit   : 78711df
Stack         : Next.js / React / TypeScript / Tailwind / GSAP / Framer Motion
Dev server    : http://localhost:3018
```

**Continue from commit 78711df. Do not re-run the redesign.**

---

## HARD RULES

```
[R1]  Hero source = /media/hero-vsl.mp4 — will be replaced with YouTube embed below
[R2]  No WACUS
[R3]  Zero new dependencies
[R4]  No redesign, no layout change, no copy change
[R5]  No force-push, no merge main, no reset
[R6]  Do NOT delete: public/testimonials, public/assets, public/generated, public/images
[R7]  Do NOT delete any screenshots, client results, or testimonial images anywhere
[R8]  Push only to: origin premium-transformation-may-2026
```

---

## SAFETY RECORD — BEFORE ANY EDIT

```bash
git log --oneline -5
git status
git diff --name-only
```

Record HEAD hash and branch. Stop if not on `premium-transformation-may-2026`.

---

## PHASE 1 — YOUTUBE EMBED MIGRATION

Replace these 3 local video files with YouTube embeds:

```
hero-vsl.mp4              → https://www.youtube.com/embed/xMU-aAw4UP8
confirmation-embed.mp4    → https://www.youtube.com/embed/A0cTmbQKA_A
confirmation-720x1280.mp4 → https://www.youtube.com/embed/OA-IGpWmv_I
```

### Rules
- Find every component using these files and replace with YouTube iframe embed
- YouTube embed format:
  ```html
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    allow="autoplay; encrypted-media"
    allowFullScreen
    style={{ border: 'none', width: '100%', height: '100%' }}
  />
  ```
- For Hero VSL: preserve the existing manual/open state behavior exactly — only replace the video source with the YouTube embed
- After confirmed embed works: delete only these 3 files:
  - `public/media/hero-vsl.mp4`
  - `public/media/confirmation-embed.mp4`
  - `public/media/confirmation-720x1280.mp4`
- Do NOT delete any other file in public/

### Validation
```bash
npm run typecheck && npm run build
```

```bash
git add -p
git commit -m "feat(media): YouTube embed migration — Phase 1"
```

---

## PHASE 2 — REPO CLEANUP

Delete only these categories of untracked junk files from the project root:

```
- *.log files (local-console*.log, local-*.log)
- local-*.png (local screenshots — NOT testimonials or client results)
- wacus-*.png
- wacus-*.json
- wacus-*.txt
- OPTIMIZED_PROMPT.md (old version)
```

**NEVER delete:**
- Any file inside public/testimonials/
- Any file inside public/assets/
- Any file inside public/generated/
- Any file inside public/images/
- Any .md planning files (ECOMVENOM_*.md, CODEX_HANDOFF.md)
- OPTIMIZED_PROMPT_v3.md
- EXECUTE_NOW.md

```bash
git add -A
git commit -m "chore(cleanup): remove local logs, screenshots, wacus junk — Phase 2"
```

---

## PHASE 3 — CSS PERFORMANCE OPTIMIZATION

Inspect and fix in this order:

```
[P3-1]  backdrop-filter / blur
        — Remove from scrolling containers
        — Keep max ONE nav blur
        — Replace with semi-transparent solid bg

[P3-2]  box-shadow / glow
        — Replace multi-layer with single-layer
        — Remove glow effects, use border instead

[P3-3]  Infinite animations
        — Add @media (prefers-reduced-motion: reduce) { animation: none }
        — Remove infinite pulse on layout elements

[P3-4]  will-change
        — Remove from static elements
        — Max 4 active will-change on page

[P3-5]  content-visibility
        — Add to sections below 2× viewport height
        — Add contain-intrinsic-size

[P3-6]  Scanlines / grain
        — Convert to static non-animated layer
```

```bash
npm run typecheck && npm run build
git add app/globals.css components/
git commit -m "perf(css): paint/composite reduction — Phase 3"
```

---

## PHASE 4 — JS / SCROLL / ANIMATION OPTIMIZATION

```
[P4-1]  GSAP ScrollTrigger — batch DOM reads before writes
[P4-2]  Framer Motion — remove layout prop where not needed
[P4-3]  Heavy GSAP timelines — lazy-init with IntersectionObserver
[P4-4]  Scroll/touch listeners — add passive: true
[P4-5]  Resize handlers — throttle to 16ms
[P4-6]  useEffect — fix missing deps, fix missing cleanup
```

```bash
npm run typecheck && npm run build
git add components/ app/
git commit -m "perf(js): scroll, GSAP, Framer optimization — Phase 4"
```

---

## PHASE 5 — MOBILE FIXES

```
[P5-1]  Fix horizontal overflow
[P5-2]  Fix clipped text — min 14px body, 12px labels
[P5-3]  Fix sticky CTA — safe-area-inset-bottom, z-index
[P5-4]  Fix section spacing — min 48px vertical on mobile
[P5-5]  Fix touch targets — min 44×44px
[P5-6]  Add global prefers-reduced-motion rule to globals.css
```

```bash
npm run typecheck && npm run build
git add .
git commit -m "fix(mobile): overflow, spacing, CTA, touch targets — Phase 5"
```

---

## PHASE 6 — PREMIUM POLISH

```
[P6-1]  Typography — display headings line-height 1.05–1.10
[P6-2]  Spacing — standardize 80px desktop / 48px mobile
[P6-3]  Buttons — consistent radius, padding, hover, focus states
[P6-4]  Nav — consistent height, centered items, smooth mobile
[P6-5]  Section transitions — clean boundaries, 300–400ms max
[P6-6]  Media frames — consistent border-radius, locked aspect-ratio
```

```bash
npm run typecheck && npm run build
git add .
git commit -m "style(polish): typography, spacing, buttons, transitions — Phase 6"
```

---

## PHASE 7 — FINAL QA + VALIDATION

### Playwright screenshots
```
1920×1080 → output/playwright/final-1920.png
1440×900  → output/playwright/final-1440.png
768×1024  → output/playwright/final-768.png
430×932   → output/playwright/final-430.png
390×844   → output/playwright/final-390.png
```

### Runtime check at 1440×900
```js
const longTasks = [];
new PerformanceObserver(list =>
  longTasks.push(...list.getEntries())
).observe({ entryTypes: ['longtask'] });
for (let i = 0; i < 10; i++) {
  window.scrollBy(0, window.innerHeight * 0.8);
  await new Promise(r => setTimeout(r, 80));
}
await new Promise(r => setTimeout(r, 500));
return {
  longTaskCount: longTasks.length,
  longTaskMaxMs: Math.round(Math.max(...longTasks.map(t => t.duration), 0)),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  brokenImages: Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).length,
  brokenVideos: Array.from(document.querySelectorAll('video')).filter(v => v.readyState === 0).length
};
```

**Acceptance criteria:**
```
longTaskMaxMs    < 100ms
horizontalOverflow = false
brokenImages     = 0
brokenVideos     = 0
```

### Final validation
```bash
npm run build
npm run typecheck
npm audit
```

### Final push
```bash
git log --oneline -8
git push origin premium-transformation-may-2026
```

---

## FINAL REPORT FORMAT

```
## Safety Record
HEAD: [hash] | Branch: premium-transformation-may-2026

## YouTube Migration
hero-vsl.mp4: REPLACED → xMU-aAw4UP8
confirmation-embed.mp4: REPLACED → A0cTmbQKA_A
confirmation-720x1280.mp4: REPLACED → OA-IGpWmv_I
Files deleted: [list]
Files preserved: public/testimonials ✅ public/assets ✅ public/generated ✅

## Repo Cleanup
Files removed: [list]
Files preserved: [list]

## Performance Baseline → Final
Long task max: [N]ms → [N]ms
Horizontal overflow: [true/false] → false

## Files Changed
[file] — [description]

## Optimizations Applied
[phase] [item] — [what changed]

## Effects Replaced
[before] → [after]

## Visual Direction Preserved
Layout / Copy / Colors / Typography / Cinematic identity: UNCHANGED

## QA Results
1920x1080: PASS/FAIL
1440x900:  PASS/FAIL
768x1024:  PASS/FAIL
430x932:   PASS/FAIL
390x844:   PASS/FAIL

## Build: [result]
## Typecheck: [result]
## Audit: [result]

## Git
Phase 1: [hash]
Phase 2: [hash]
Phase 3: [hash]
Phase 4: [hash]
Phase 5: [hash]
Phase 6: [hash]
Push: SUCCESS — origin premium-transformation-may-2026
Preview: http://localhost:3018
```
