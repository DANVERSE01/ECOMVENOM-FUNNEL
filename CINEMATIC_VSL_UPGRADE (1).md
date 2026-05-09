# ECOMVENOM — Cinematic Scroll VSL + Vimeo Migration
# Execution Brief v1.0
# ONE SESSION — NO APPROVAL STOPS

---

## CONTEXT

```
Project root : D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
Branch       : premium-transformation-may-2026
Dev server   : http://localhost:3018
```

---

## HARD RULES

```
[R1]  No redesign. No layout change. No copy change.
[R2]  No new npm dependencies unless absolutely impossible without them.
[R3]  No force-push. No merge main. No reset.
[R4]  Push only to: origin premium-transformation-may-2026
[R5]  npm run build && npm run typecheck must pass after every phase.
[R6]  Do NOT touch public/testimonials, public/assets, public/generated.
[R7]  Do NOT remove local short-loop videos (system-loop-01/02, chaos-system, final-lockup-loop).
```

---

## SAFETY RECORD

```bash
git log --oneline -3
git status
```

Stop if not on `premium-transformation-may-2026`.

---

## PHASE 1 — VIMEO MIGRATION (replace YouTube with Vimeo)

### Video ID map

```
Hero VSL (11 min)        → Vimeo ID: 1190366994
Confirmation site video  → Vimeo ID: 1190367488
Confirmation mobile      → Vimeo ID: 1190366436
```

### Vimeo embed base URL (zero branding)

```
https://player.vimeo.com/video/{ID}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1
```

For autoplay add: `&autoplay=1`
For muted add: `&muted=1`
For loop add: `&loop=1`

### Files to edit

**1. components/sections/scroll-film/Scene00ColdOpen.tsx**

Find the `HERO_MEDIA` object. Replace:
```ts
embedSrc: "https://www.youtube.com/embed/xMU-aAw4UP8"
```
With:
```ts
embedSrc: "https://player.vimeo.com/video/1190366994"
```

Update the heroEmbedSrc construction:
```ts
// Remove YouTube-specific params (?autoplay=1&playsinline=1&rel=0&modestbranding=1&mute=1)
// Replace with Vimeo params:
const heroEmbedSrc = overlayOpen
  ? `${HERO_MEDIA.embedSrc}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1${launchMode === "auto" ? "&muted=1" : ""}`
  : "";
```

Update iframe allow attribute:
```tsx
allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
referrerPolicy="strict-origin-when-cross-origin"
```

**2. components/confirmation/pre-call-video.tsx**

Replace:
```ts
const CONFIRMATION_EMBED_SRC = "https://www.youtube.com/embed/A0cTmbQKA_A?playsinline=1&rel=0&modestbranding=1"
```
With:
```ts
const CONFIRMATION_EMBED_SRC = "https://player.vimeo.com/video/1190367488?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1"
```

Update iframe allow attribute to match Vimeo format.

### Validation after Phase 1

```bash
npm run typecheck && npm run build
git add components/
git commit -m "feat(media): Vimeo migration — zero branding embeds — Phase 1"
```

---

## PHASE 2 — HERO VSL CINEMATIC SCROLL EXPANSION

### Exact behavior required

**State A — Compact (default)**
- The VSL card sits in the Hero section in its current position
- Shows thumbnail/poster image with "WATCH FOUNDER VSL" label
- No iframe loaded yet (performance — facade pattern)

**State B — Scroll-scrubbed expansion**
- Trigger: GSAP ScrollTrigger with `scrub: 1` on the Hero section
- As user scrolls DOWN through the Hero section pinned zone:
  - The card animates from its compact position
  - `transform: perspective(1000px) scale(1) translateY(0)` → `scale(1.6) translateY(-10vh)`
  - Border-radius shrinks: `12px` → `4px`
  - Background overlay fades in: `opacity 0` → `opacity 0.85`
  - At `progress > 0.6`: iframe src gets injected with `?autoplay=1`
  - Video plays with sound (user scroll = user gesture = autoplay allowed)
- As user scrolls back UP: animation reverses exactly, iframe src cleared

**State C — Manual open (existing button)**
- "WATCH FOUNDER VSL" button still works
- Opens in the existing overlay system unchanged

**State D — After video ends / user continues scrolling**
- ScrollTrigger end: card snaps back to compact position smoothly
- Hero section unpins, user continues to next section

### Implementation

Create a new hook: `hooks/useVslScrollExpansion.ts`

```ts
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useVslScrollExpansion(
  sectionRef: React.RefObject<HTMLElement>,
  cardRef: React.RefObject<HTMLElement>,
  overlayRef: React.RefObject<HTMLElement>,
  onVideoActive: (active: boolean) => void,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!section || !card || !overlay || reduced) return;

    // Pin the hero section and scrub card expansion
    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      scale: 1.55,
      translateY: "-8vh",
      borderRadius: "4px",
      boxShadow: "0 0 0 100vmax rgba(0,0,0,0.88)",
      duration: 1,
      ease: "none",
    }, 0)
    .to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: "none",
    }, 0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        tl.progress(self.progress);
        // Inject video when expansion reaches 60%
        onVideoActive(self.progress > 0.58);
      },
      onLeave: () => {
        onVideoActive(false);
      },
      onLeaveBack: () => {
        onVideoActive(false);
      },
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [reduced, sectionRef, cardRef, overlayRef, onVideoActive]);
}
```

In `Scene00ColdOpen.tsx`:
- Add refs: `vslCardScrollRef`, `scrollOverlayRef`
- Use `useVslScrollExpansion` hook
- Add `scrollVideoActive` state — when true, render Vimeo iframe inside the card
- Keep existing manual open overlay system completely unchanged
- Add a scroll overlay div (fixed, full screen, z-index below card, above content, pointer-events: none)

Mobile behavior (`max-width: 768px`):
- Disable scroll expansion entirely
- Keep only manual open button

### CSS additions to globals.css

```css
.vsl-scroll-card {
  will-change: transform, border-radius, box-shadow;
  transform-origin: center center;
  transition: none; /* GSAP controls this */
}

.vsl-scroll-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  pointer-events: none;
  z-index: 45;
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .vsl-scroll-card { will-change: auto; }
}
```

### Validation after Phase 2

```bash
npm run typecheck && npm run build
git add hooks/ components/ app/globals.css
git commit -m "feat(hero): cinematic scroll-scrubbed VSL expansion — Phase 2"
```

---

## PHASE 3 — CHAOS-SYSTEM DEVICE FRAME + SCROLL EXPANSION

### Exact behavior required

The `chaos-system` video (currently playing as background) must be placed inside a **device/screen mockup frame** that expands on scroll.

**State A — Compact device frame**
- The video sits inside a laptop/monitor mockup frame
- Frame has: screen bezel, subtle border, slight perspective tilt (`rotateX(8deg)`)
- Video plays muted + loop inside it (ambient, not intrusive)

**State B — Scroll expansion**
- As user scrolls through the chaos-system section:
  - Frame perspective tilt reduces: `rotateX(8deg)` → `rotateX(0deg)`
  - Frame scales up: `scale(0.7)` → `scale(1.05)`
  - Bezel/border fades out: `opacity(1)` → `opacity(0)` — video fills the section
  - Video continues playing throughout

**State C — Scroll back**
- Reverses exactly — frame reforms, perspective tilt returns

### Implementation

In `components/sections/scroll-film/Scene00ColdOpen.tsx` or the relevant chaos section:

Create `components/cinematic/DeviceFrame.tsx`:

```tsx
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function DeviceFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("device-frame-shell", className)}
      aria-hidden
    >
      <div className="device-frame-bezel">
        <div className="device-frame-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
```

CSS for device frame in globals.css:

```css
.device-frame-shell {
  position: relative;
  transform: perspective(1200px) rotateX(8deg) scale(0.7);
  transform-origin: center bottom;
  transition: none;
  will-change: transform;
}

.device-frame-bezel {
  border: 2px solid rgba(184, 255, 46, 0.2);
  border-radius: 12px;
  background: rgba(6, 6, 8, 0.95);
  padding: 12px 12px 32px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 32px 80px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  position: relative;
}

.device-frame-bezel::after {
  content: "";
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.12);
}

.device-frame-screen {
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16/9;
  background: #000;
  position: relative;
}

@media (prefers-reduced-motion: reduce) {
  .device-frame-shell { will-change: auto; transform: none; }
}
```

Use a GSAP ScrollTrigger scrub on the chaos section to animate `device-frame-shell` transform from compact → expanded.

### Validation after Phase 3

```bash
npm run typecheck && npm run build
git add components/ app/globals.css
git commit -m "feat(chaos): device frame scroll expansion — Phase 3"
```

---

## PHASE 4 — FINAL QA

### Browser QA at these viewports

```
1920x1080 — Hero VSL scroll expansion works, video plays, reverses on scroll up
1440x900  — same
768x1024  — scroll expansion disabled, manual button works
390x844   — same as tablet
430x932   — same as tablet
```

### Check list per viewport

```
[ ] Hero VSL card expands with scroll
[ ] Video plays with sound when expansion > 60%
[ ] Scroll reversal collapses card cleanly
[ ] Manual "WATCH FOUNDER VSL" button still works
[ ] No YouTube branding anywhere
[ ] Vimeo player loads without Vimeo logo (badge=0&dnt=1)
[ ] Chaos section device frame visible and expands on scroll
[ ] No horizontal overflow
[ ] No console errors
[ ] No layout shift
[ ] Sticky CTA visible and not colliding
[ ] Nav works
[ ] Mobile: no scroll expansion, manual button works
```

### Runtime perf check

```js
const longTasks = [];
new PerformanceObserver(list =>
  longTasks.push(...list.getEntries())
).observe({ entryTypes: ['longtask'] });
for (let i = 0; i < 10; i++) {
  window.scrollBy(0, window.innerHeight * 0.8);
  await new Promise(r => setTimeout(r, 100));
}
await new Promise(r => setTimeout(r, 500));
return {
  longTaskCount: longTasks.length,
  longTaskMaxMs: Math.round(Math.max(...longTasks.map(t => t.duration), 0)),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
};
```

Acceptance: `longTaskMaxMs < 100ms`, `horizontalOverflow: false`

### Final validation

```bash
npm run build
npm run typecheck
npm audit
```

### Final push

```bash
git log --oneline -6
git push origin premium-transformation-may-2026
```

---

## FINAL REPORT FORMAT

```
## Vimeo Migration
Hero VSL: YouTube removed → Vimeo 1190366994 CONFIRMED
Confirmation: YouTube removed → Vimeo 1190367488 CONFIRMED
No YouTube branding: CONFIRMED

## Scroll Expansion — Hero VSL
Scroll-scrubbed expansion: IMPLEMENTED
Video autoplay on scroll: WORKING
Scroll reversal: WORKING
Mobile fallback (manual only): WORKING

## Chaos Section Device Frame
Device frame: IMPLEMENTED
Scroll expansion: WORKING

## Performance
longTaskMaxMs: [N]ms
horizontalOverflow: false

## QA Results
1920x1080: PASS/FAIL
1440x900:  PASS/FAIL
768x1024:  PASS/FAIL
430x932:   PASS/FAIL
390x844:   PASS/FAIL

## Build: PASS
## Typecheck: PASS
## Audit: PASS

## Git
Phase 1: [hash]
Phase 2: [hash]
Phase 3: [hash]
Push: SUCCESS → origin premium-transformation-may-2026
Preview: http://localhost:3018
```
