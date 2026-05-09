# ECOMVENOM — Extreme Performance & Premium Polish
# Engineered Codex Prompt — v3.0
# For: OpenAI Codex (gpt-5.5 xhigh) — Claude Code / Codex agent

---

## CONTEXT — READ THIS FIRST

```
Project root  : D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
Active branch : premium-transformation-may-2026
Last known commit: 78711df (Performance polish and final smoothness pass)
Stack         : Next.js 14 / React / TypeScript / Tailwind / GSAP / Framer Motion
Dev server    : http://localhost:3018
```

**You are continuing from commit `78711df`. Do NOT re-run the redesign.
Do NOT re-run the Hero VSL fix. Those are already done.
Start from the current branch state as-is.**

---

## HARD RULES — ENFORCED, NO EXCEPTIONS

```
[R1]  Hero source = /media/hero-vsl.mp4 — never touch this.
[R2]  /media/confirmation-embed.mp4 must NOT appear in Hero.
[R3]  No WACUS.
[R4]  Zero new npm dependencies. If unavoidable, STOP and flag explicitly.
[R5]  No redesign. No layout change. No copy change. No brand direction change.
[R6]  No flattening. The cinematic/premium direction stays.
[R7]  No force-push. No merge main. No reset. No destructive git ops.
[R8]  Commit ONLY performance + polish changes.
      Never commit: CSV, screenshots, archive files, handoff docs, local cache.
[R9]  Push target: origin premium-transformation-may-2026 only.
```

---

## SAFETY RECORD — EXECUTE BEFORE ANY EDIT

Run and output these exact commands. Do not skip.

```bash
git log --oneline -5
git status
git diff --name-only
```

Record:
- Current HEAD hash
- Any pre-existing dirty files (user-owned — do not touch them)
- Current branch name

If HEAD is NOT on `premium-transformation-may-2026`, stop and report. Do not proceed.

---

## PHASE 1 — FULL STRUCTURED AUDIT (zero edits in this phase)

### Files to inspect in full

```
app/globals.css
app/page.tsx
app/layout.tsx
components/sections/scroll-film/     (every .tsx .ts .css file)
components/cinematic/                (every .tsx .ts .css file)
components/ui/                       (every .tsx .ts .css file)
public/media/     → list files + sizes in KB
public/generated/ → list files + sizes in KB
public/assets/    → list files + sizes in KB
public/testimonials/ → list files + sizes in KB
```

### Required: Playwright runtime profiling

Open http://localhost:3018 in Playwright. Run this JS and record results:

```js
// Long task profiling
const longTasks = [];
new PerformanceObserver(list =>
  longTasks.push(...list.getEntries())
).observe({ entryTypes: ['longtask'] });

// Scroll 8 times and sample
for (let i = 0; i < 8; i++) {
  window.scrollBy(0, window.innerHeight);
  await new Promise(r => setTimeout(r, 100));
}

return {
  longTaskCount: longTasks.length,
  longTaskMaxMs: Math.round(Math.max(...longTasks.map(t => t.duration), 0)),
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  consoleErrors: window.__consoleErrors?.length ?? 'not instrumented'
};
```

Take a baseline screenshot before any edits at 1440x900. Save as `output/playwright/baseline-1440.png`.

### Required audit output format

Output ONLY this JSON. No prose outside the JSON block.

```json
{
  "safety": {
    "head_hash": "...",
    "branch": "...",
    "pre_existing_dirty_files": []
  },
  "runtime_baseline": {
    "long_task_count": 0,
    "long_task_max_ms": 0,
    "horizontal_overflow": false,
    "scroll_width": 0,
    "client_width": 0
  },
  "media_assets": [
    { "file": "...", "size_kb": 0, "actively_used": true, "loading_strategy": "eager|lazy|metadata|unknown" }
  ],
  "bottlenecks": {
    "css_paint_cost": [
      { "file": "...", "line": 0, "property": "backdrop-filter|blur|box-shadow|...", "value": "...", "severity": "high|medium|low", "fix": "..." }
    ],
    "css_composite_cost": [
      { "file": "...", "line": 0, "property": "will-change|transform|...", "issue": "...", "severity": "high|medium|low" }
    ],
    "infinite_animations": [
      { "file": "...", "selector": "...", "animation": "...", "repaint_risk": "high|medium|low" }
    ],
    "scroll_layout_thrash": [
      { "file": "...", "line": 0, "read_op": "...", "write_op": "...", "severity": "high|medium|low" }
    ],
    "gsap_framer_issues": [
      { "file": "...", "issue": "...", "fix": "..." }
    ],
    "media_loading_issues": [
      { "file": "...", "asset": "...", "issue": "...", "fix": "..." }
    ],
    "mobile_issues": [
      { "viewport": "390x844|430x932|768x1024", "issue": "...", "element": "..." }
    ]
  },
  "top_5_bottlenecks": [
    { "rank": 1, "file": "...", "description": "...", "impact": "high|medium|low", "fix": "..." }
  ],
  "hero_vsl_status": "ok|broken|missing",
  "hero_vsl_source": "/media/hero-vsl.mp4 confirmed | WRONG: [actual source]"
}
```

**Do not proceed to Phase 2 until this JSON is fully populated.**

---

## PHASE 2 — CSS PERFORMANCE OPTIMIZATION

### Scope: app/globals.css + component CSS/Tailwind only

Execute in this exact priority order. For each fix, record: file + line changed + before → after.

```
[P2-1]  backdrop-filter / filter / blur
        — Remove from any element that scrolls or is inside a scroll container
        — Replace with: semi-transparent solid bg (rgba) or layered gradient
        — Exception: ONE nav blur is acceptable if it does not scroll

[P2-2]  box-shadow / glow / multi-layer shadows
        — Replace multi-layer shadows with single-layer
        — Replace glow effects with border or subtle gradient
        — Target: anything with 3+ box-shadow values

[P2-3]  Infinite CSS animations
        — Add animation-play-state: paused when not in viewport
        — Add @media (prefers-reduced-motion: reduce) { animation: none }
        — Remove infinite pulse/flicker on layout-level elements

[P2-4]  will-change audit
        — Remove will-change from any static or layout-container element
        — Keep only on elements with active JS-driven animation
        — Maximum 4 simultaneous will-change elements on page

[P2-5]  contain + content-visibility
        — Add contain: layout style paint to each scroll-film section wrapper
        — Add content-visibility: auto to sections below viewport height × 2
        — Add contain-intrinsic-size matching approximate rendered height

[P2-6]  Scanlines / grain overlays
        — If using fixed/absolute overlay with repeating-gradient or background-image on scroll
        — Convert to static non-animated layer or remove if imperceptible

[P2-7]  mask / clip-path animations
        — Replace any animated mask-size / clip-path with opacity + transform
```

### Validation checkpoint after P2

```bash
npm run typecheck && npm run build
```

Both must output 0 errors. If errors exist, fix them before continuing.

```bash
git add app/globals.css components/
git status   # verify only CSS/style changes staged
git commit -m "perf(css): paint/composite cost reduction — P2"
```

Output: commit hash for P2.

---

## PHASE 3 — JS / SCROLL / ANIMATION OPTIMIZATION

### Scope: all .tsx .ts files in components/ and app/

```
[P3-1]  GSAP ScrollTrigger audit
        — Find every ScrollTrigger callback that reads layout properties (getBoundingClientRect, offsetTop, scrollHeight)
        — Batch all layout reads before any writes
        — If reading layout inside rAF loop: extract to a separate read phase

[P3-2]  Framer Motion audit
        — Remove layout prop from any element that is not doing a shared layout animation
        — Remove layoutId from elements that are not paired with another layoutId
        — For scroll-driven elements: use type: "tween", ease: "linear", no springs

[P3-3]  GSAP timeline initialization
        — Any heavy timeline (10+ tweens) must initialize inside IntersectionObserver callback
        — Not on mount, not in useEffect without IO trigger

[P3-4]  Event listener audit
        — Add passive: true to every addEventListener for scroll, touchstart, touchmove, wheel
        — Throttle resize listeners to minimum 16ms (requestAnimationFrame debounce)

[P3-5]  useEffect audit
        — Any useEffect without dependency array → add correct deps or convert to useLayoutEffect
        — Any useEffect that subscribes to scroll/resize and doesn't clean up → fix cleanup

[P3-6]  Hero VSL audit and enforce
        — preload must be "metadata" (never "auto" or "none")
        — Must have: muted playsInline
        — Must have: poster attribute pointing to a real frame image
        — autoplay must be conditional on user interaction or explicit opt-in
        — Manual open state must be preserved exactly as currently implemented
        — Source must be /media/hero-vsl.mp4 — verify and confirm
```

### Validation checkpoint after P3

```bash
npm run typecheck && npm run build
```

```bash
git add components/ app/
git status   # verify only JS/TSX changes staged
git commit -m "perf(js): GSAP, Framer, scroll, Hero VSL — P3"
```

Output: commit hash for P3.

---

## PHASE 4 — MOBILE FIXES

### Target viewports (test each one)

```
390x844  (iPhone 14)
430x932  (iPhone 14 Pro Max)
768x1024 (iPad)
```

### Fix checklist — apply all that are confirmed in the Phase 1 audit

```
[P4-1]  Horizontal overflow
        — Find every element causing scrollWidth > clientWidth
        — Fix with max-width: 100% or overflow-x: hidden on correct container
        — Do NOT use overflow-x: hidden on the html element globally (breaks sticky)

[P4-2]  Text clipping
        — Minimum font-size: 14px for body, 12px for labels/captions on mobile
        — Check for overflow: hidden on text containers that clips descenders

[P4-3]  Sticky CTA
        — Must not cover nav or overlap with interactive elements
        — Add padding-bottom: env(safe-area-inset-bottom) for notch devices
        — Ensure z-index is below nav if nav is sticky too

[P4-4]  Section spacing
        — Minimum 48px top/bottom padding on all sections at mobile breakpoint
        — Minimum 16px horizontal padding to prevent edge-to-edge text

[P4-5]  Touch targets
        — All buttons, nav items, hamburger icon: minimum 44×44px
        — Use min-height / min-width, not just padding

[P4-6]  prefers-reduced-motion global
        — Verify globals.css has a universal rule:
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }
```

### Validation checkpoint after P4

```bash
npm run typecheck && npm run build
```

```bash
git add .
git status   # verify only mobile/responsive changes staged
git commit -m "fix(mobile): overflow, CTA, spacing, touch targets — P4"
```

Output: commit hash for P4.

---

## PHASE 5 — PREMIUM POLISH

**Rule: Every change must either improve perceived premium quality OR improve clarity. Zero decorative weight added.**

```
[P5-1]  Typography rhythm
        — Display headings (>48px): line-height 1.05–1.10
        — Section headings (32–48px): line-height 1.1–1.2
        — Body text: line-height 1.6–1.7
        — Uppercase tracking labels: letter-spacing 0.08–0.12em
        — Verify heading size scale uses consistent ratio: 1.25× or 1.333×

[P5-2]  Spacing system
        — Desktop sections: 80–120px vertical padding
        — Mobile sections: 48–64px vertical padding
        — Remove arbitrary one-off values (e.g. mt-[37px]) — replace with system tokens

[P5-3]  Button polish
        — All primary CTAs: consistent border-radius (pick one value, apply everywhere)
        — Consistent padding: horizontal ≥28px, vertical ≥14px
        — Hover state: transform: translateY(-1px) + single shadow — no glow
        — Focus state: outline: 2px solid currentColor; outline-offset: 2px
        — Active state: transform: translateY(0) scale(0.99)

[P5-4]  Nav
        — Consistent height across scroll states
        — Logo and nav links vertically centered
        — Mobile hamburger: 44×44px, smooth open/close with CSS transition only

[P5-5]  Section transitions (scroll-film)
        — No visible gap or flash between scroll scenes
        — Transition timing: 300–400ms ease-out maximum
        — No abrupt color shifts between adjacent dark sections

[P5-6]  Media frames
        — All video/image frames: consistent border-radius
        — Aspect ratios locked with aspect-ratio CSS property
        — No broken ratio at any viewport

[P5-7]  Micro-interactions
        — Card hover: subtle lift (transform: translateY(-2px) + shadow) — no scale
        — Link hover: color or underline only — no layout shift
        — Icon hover: opacity change — not movement
```

### Validation checkpoint after P5

```bash
npm run typecheck && npm run build
```

```bash
git add .
git status
git commit -m "style(polish): typography, spacing, buttons, nav, micro-interactions — P5"
```

Output: commit hash for P5.

---

## PHASE 6 — FINAL QA + PERFORMANCE VERIFICATION

### Step 1: Take Playwright screenshots at all viewports

For each viewport below, navigate to http://localhost:3018, wait for preloader to clear, then screenshot.

```
1920×1080 → output/playwright/final-1920.png
1440×900  → output/playwright/final-1440.png
768×1024  → output/playwright/final-768.png
430×932   → output/playwright/final-430.png
390×844   → output/playwright/final-390.png
```

### Step 2: Runtime performance check at 1440×900

Run this Playwright JS and record results:

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
  brokenImages: Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalWidth === 0).length,
  brokenVideos: Array.from(document.querySelectorAll('video')).filter(v => v.readyState === 0).length
};
```

### Acceptance criteria (required to pass QA)

```
long_task_max_ms     < 100ms     (ideal: <50ms)
horizontal_overflow  = false
broken_images        = 0
broken_videos        = 0
long_task_count      < 5 during full-page scroll
```

If any criterion fails → identify the cause, fix it, re-run.

### Step 3: Manual checklist per viewport

For each viewport, verify PASS or FAIL with a one-line note on any FAIL:

```
VIEWPORT: 1920x1080
[ ] First load: preloader clears within 3 seconds
[ ] Scroll: no jank, no stutter
[ ] Hero VSL: plays with /media/hero-vsl.mp4, manual state works
[ ] Section transitions: stable, no flash
[ ] Nav: correct, backdrop clean
[ ] Sticky CTA: visible, no collision, z-index correct
[ ] Hover states: all buttons, cards, links respond
[ ] No horizontal overflow
[ ] No broken images/videos
[ ] No console errors (0 errors, 0 warnings acceptable)
[ ] No visible layout shift
[ ] No clipped text

VIEWPORT: 1440x900  → same checklist
VIEWPORT: 768x1024  → same + touch targets ≥44px
VIEWPORT: 430x932   → same + CTA no collision + mobile nav works
VIEWPORT: 390x844   → same
```

---

## FINAL VALIDATION

```bash
npm run build
npm run typecheck
npm audit
```

Record EXACT output of each command (last 8 lines for build, full output for typecheck and audit).

---

## FINAL GIT

```bash
git log --oneline -8    # verify clean commit history
git push origin premium-transformation-may-2026
```

---

## FINAL REPORT — REQUIRED FORMAT

Output ONLY this structure. No prose outside it.

```
## Safety Record
Starting HEAD: [hash]
Branch: premium-transformation-may-2026
Pre-existing dirty files (untouched): [list or none]

## Baseline Performance (before edits)
Long task count: [N]
Long task max ms: [N]ms
Horizontal overflow: [true|false]

## Final Performance (after edits)
Long task count: [N]
Long task max ms: [N]ms
Horizontal overflow: [false]

## Top 5 Bottlenecks Found
1. [file:line] — [description] — [severity]
2. ...

## Files Changed
[file path] — [one-line description of what changed]
...

## P2 Optimizations Applied (CSS)
- [P2-N] [file:line] [before] → [after]
...

## P3 Optimizations Applied (JS)
- [P3-N] [file] [what changed]
...

## P4 Mobile Fixes Applied
- [P4-N] [viewport] [what fixed]
...

## P5 Polish Applied
- [P5-N] [what improved]
...

## Effects Replaced (cheaper equivalents)
- [expensive effect] → [cheaper replacement]
...

## Visual Direction Preserved
- Layout: unchanged
- Copy: unchanged
- Color mood: unchanged
- Typography system: unchanged
- Cinematic identity: unchanged

## Hero VSL Confirmation
Source: /media/hero-vsl.mp4 — CONFIRMED
preload: metadata — CONFIRMED
Manual/open state: INTACT

## QA Results
1920x1080: PASS — [note if any]
1440x900:  PASS — [note if any]
768x1024:  PASS — [note if any]
430x932:   PASS — [note if any]
390x844:   PASS — [note if any]

## Build Result
[last 6 lines of npm run build output]

## Typecheck Result
[full npm run typecheck output]

## Audit Result
[npm audit summary line]

## Git
P2 commit: [hash] — perf(css)
P3 commit: [hash] — perf(js)
P4 commit: [hash] — fix(mobile)
P5 commit: [hash] — style(polish)
Push: SUCCESS — origin premium-transformation-may-2026
Preview URL: http://localhost:3018
```
