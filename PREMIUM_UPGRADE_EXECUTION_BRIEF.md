# ECOMVENOM — PREMIUM UPGRADE EXECUTION BRIEF
# Deep Audit → Precise Implementation
# Version 2.0 — May 2026

---

## FORENSIC AUDIT FINDINGS

Before touching a single file, read this section completely.
The previous agent already implemented many items from PREMIUM_UPGRADE.md.
Re-implementing them will break things. This brief tells you exactly what to build.

### ✅ ALREADY DONE — DO NOT RE-IMPLEMENT

```
Hero headline:     GSAP filmDrop word reveal (yPercent 112→0, stagger 0.055) ✅
Scene01Problem:    GSAP SplitText line reveal (splitText lib, mask, stagger 0.1) ✅
Lenis:             duration 1.2, easing (t) => Math.min(1, 1.001 - Math.pow(2,-10*t)) ✅
Magnetic buttons:  useMagnetic hook, max ±6px, elastic.out return ✅
Ripple click:      triggerRipple() in button.tsx, Web Animations API ✅
Nav compress:      delta-based scroll detection, h-14 on compress ✅
Logo scale:        scale-90 on compress, origin-left ✅
ScrollProgress:    GSAP onUpdate, scaleX transform ✅
BackToTop:         translateY-3 → 0 on visible ✅
StickyMobileCTA:   translateY(100%)→0, 4s pulse animation ✅
ScrollFilmScene:   opacity+translateY(20px) CSS entrance 400ms ✅
Section eyebrow:   translateX(-16px)→0 on inViewOnce ✅
CountUp:           RAF easeOutCubic, IntersectionObserver ✅
btn-secondary:     ::after scaleX underline draw ✅
nav-link-draw:     ::after scaleX underline draw ✅
Form shake:        form-shake keyframe on form-field--error ✅
Form focus label:  :focus-within color venom + translateY(-3px) scale(0.96) ✅
Card hover:        .scene-panel, .learn-card hover translateY(-3px) in CSS ✅
DeviceFrame:       GSAP scroll expansion + transformPerspective: 1200 ✅
Vimeo migration:   All YouTube replaced ✅
VSL scroll:        useVslScrollExpansion hook ✅
Custom eases:      venom, filmDrop, venomIn via CustomEase ✅
Particle cursor:   ParticleTrailCursor component ✅
Design tokens:     Complete CSS variable system ✅
Typography clamp:  --text-display through --text-sub with clamp() ✅
```

---

### ❌ NOT DONE — BUILD THESE

The following are the real gaps. Nothing else.

---

## HARD RULES

```
[R1]  Branch: premium-transformation-may-2026
[R2]  No force-push. Push only to origin/premium-transformation-may-2026
[R3]  npm run build && npm run typecheck must pass after every phase
[R4]  Do NOT touch: public/testimonials, public/assets, public/generated
[R5]  Do NOT touch: the existing GSAP animations in Scene00ColdOpen or Scene01Problem
[R6]  Do NOT re-implement: Lenis, magnetic buttons, ripple, nav compress, ScrollFilmScene
[R7]  No new npm dependencies unless unavoidable — flag before adding
[R8]  Every change must visually improve the page — no neutral changes
```

---

## SAFETY CHECK — BEFORE ANY EDIT

```bash
git checkout premium-transformation-may-2026
git pull origin premium-transformation-may-2026
git log --oneline -3
git status
```

Stop if not on `premium-transformation-may-2026` or if working tree is dirty.

---

## PHASE A — GSAP CARD STAGGER SYSTEM

### Problem
All card grids (Learn, Beyond, FAQ, Offer) use `<Reveal>` which wraps all children in a single CSS transition group. Cards appear together — no stagger, no individual entrance. This looks cheap.

### What to build

Create `hooks/useStaggerReveal.ts`:

```ts
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const container = ref.current;
      if (!container || reduced) return;

      const items = gsap.utils.toArray<HTMLElement>(selector, container);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: options.y ?? 32 });

      ScrollTrigger.batch(items, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.75,
            stagger: options.stagger ?? 0.09,
            ease: options.ease ?? "filmDrop",
            overwrite: true,
          }),
        start: options.start ?? "top 88%",
        once: true,
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return ref;
}
```

### Apply to sections

**components/sections/learn.tsx** — add stagger to cards:
- Import `useStaggerReveal`
- Replace `<Reveal className="mt-12 grid ...">` wrapper with a plain `<div ref={staggerRef} className="mt-12 grid ...">`
- Add `data-stagger-item` attribute to each `<article>` card
- Call `useStaggerReveal<HTMLDivElement>("[data-stagger-item]")`
- Remove the outer `<Reveal>` on the cards — keep `<Reveal>` only on the heading block

**components/sections/beyond.tsx** — same pattern:
- Same stagger on the `.pillar` cards
- Also add `hover:border-venom/30 transition-colors duration-200` to the beyond card `<article>` elements (they're currently missing hover that learn-cards have)

**components/sections/faq.tsx** — if FAQ has individual items, apply stagger to them

**components/sections/curriculum.tsx** — if has individual module cards, apply stagger

```bash
npm run typecheck && npm run build
git add hooks/ components/
git commit -m "feat(motion): GSAP ScrollTrigger.batch stagger on card grids — Phase A"
```

---

## PHASE B — SECTION HEADING REVEALS (SPLITTEXT MASK)

### Problem
Only Scene00ColdOpen (hero) and Scene01Problem have GSAP text reveals. All other sections (Learn, Beyond, Curriculum, FAQ, Testimonials, Founder) have static headings that just appear — no cinematic entrance.

### What to build

Create `hooks/useSplitHeading.ts`:

```ts
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useSplitHeading<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const { elements } = splitText(el, "lines", { mask: true });
      gsap.set(elements, { yPercent: 108 });
      gsap.to(elements, {
        yPercent: 0,
        duration: 0.82,
        stagger: 0.09,
        ease: "filmDrop",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return ref;
}
```

### Apply to section headings

Apply `useSplitHeading` to the primary `<h2>` in these sections:
- `components/sections/learn.tsx`
- `components/sections/beyond.tsx`
- `components/sections/founder.tsx`
- `components/sections/curriculum.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/faq.tsx`
- `components/sections/final-cta.tsx`

Pattern:
```tsx
const headingRef = useSplitHeading();
// ...
<h2 ref={headingRef} className="font-display ...">
```

**Important:** This makes each section heading do a cinematic masked line reveal on scroll — exactly like Scene01Problem but on every non-hero section.

```bash
npm run typecheck && npm run build
git add hooks/ components/
git commit -m "feat(motion): cinematic SplitText heading reveal on all sections — Phase B"
```

---

## PHASE C — SCENES 02–08 GSAP CONTENT REVEALS

### Problem
Scenes 02–08 in scroll-film folder have their scene wrapper fade in (ScrollFilmScene CSS) but their internal content (headlines, body text, signal items) may not have GSAP reveals.

### What to do

Audit each scene file:
- `Scene02ChaosToSystem.tsx`
- `Scene03Roadmap.tsx`
- `Scene04Offer.tsx`
- `Scene05Founder.tsx`
- `Scene06ProofGate.tsx`
- `Scene07Application.tsx`
- `Scene08FinalCTA.tsx`

For each scene that does NOT have a `useGSAP` block with ScrollTrigger reveals:
- Add a `useGSAP` block that uses `splitText` on the scene headline
- Add GSAP ScrollTrigger.batch stagger on any list items / feature cards inside that scene
- Use `filmDrop` ease, consistent with existing scenes

For each scene that ALREADY HAS a `useGSAP` block — do NOT touch it.

**Pattern to add to scenes without GSAP:**
```ts
useGSAP(
  () => {
    if (reduced) return;
    const headline = headlineRef.current;
    if (headline) {
      const { elements } = splitText(headline, "lines", { mask: true });
      gsap.set(elements, { yPercent: 108 });
      gsap.to(elements, {
        yPercent: 0, duration: 0.82, stagger: 0.09, ease: "filmDrop",
        scrollTrigger: { trigger: headline, start: "top 82%", once: true },
      });
    }
    const items = gsap.utils.toArray<HTMLElement>(".scene-reveal-item", sectionRef.current);
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, {
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "venom", overwrite: true,
        }),
        start: "top 88%",
        once: true,
      });
    }
  },
  { scope: sectionRef, dependencies: [reduced] }
);
```

Add `className="scene-reveal-item"` to feature items, list rows, or proof cards inside scenes that need stagger.

```bash
npm run typecheck && npm run build
git add components/
git commit -m "feat(motion): GSAP content reveals on scroll-film scenes 02–08 — Phase C"
```

---

## PHASE D — FORM FIELD PREMIUM STATES

### Problem
The `Field` component label does `translateY(-3px) scale(0.96)` on focus — subtle, barely visible. The form needs a more premium focus treatment.

### What to build

In `app/globals.css`, find the `.form-field` section (around line 361) and replace the focus-within styles with:

```css
.form-field {
  transform: translateZ(0);
  position: relative;
}

.form-field__label {
  display: inline-block;
  transform-origin: left center;
  transition: transform 220ms var(--ease-out-expo), color 220ms var(--ease-out-expo), letter-spacing 220ms var(--ease-out-expo);
}

.form-field:focus-within .form-field__label {
  color: var(--c-venom);
  transform: translateY(-2px) scale(0.94);
  letter-spacing: 0.14em;
}

.form-control {
  border-radius: var(--radius-input);
  transition:
    border-color 220ms var(--ease-out-expo),
    box-shadow 220ms var(--ease-out-expo),
    background-color 220ms var(--ease-out-expo);
}

.form-control:focus {
  border-color: var(--c-venom) !important;
  box-shadow:
    0 0 0 1px rgba(184, 255, 46, 0.15),
    0 0 16px rgba(184, 255, 46, 0.06);
  background-color: rgba(16, 16, 22, 0.85);
}

.form-field--error .form-control {
  animation: form-shake 420ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
  border-color: var(--c-alert) !important;
  box-shadow: 0 0 0 1px rgba(255, 51, 68, 0.2);
}

@keyframes form-shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-5px); }
  30%       { transform: translateX(4px); }
  45%       { transform: translateX(-4px); }
  60%       { transform: translateX(3px); }
  75%       { transform: translateX(-2px); }
  90%       { transform: translateX(1px); }
}
```

Also upgrade the `<select>` and `<textarea>` inside the form to inherit the same focus styles — add `form-control` class to any `<select>` and `<textarea>` that don't already have it in `application-form.tsx`.

```bash
npm run typecheck && npm run build
git add app/globals.css components/apply/
git commit -m "feat(form): premium focus states, venom glow, enhanced shake — Phase D"
```

---

## PHASE E — OFFER + PROOF SECTION CARD HOVER SYSTEM

### Problem
The `.scene-panel` and `.learn-card` have basic hover. The proof evidence cards and any offer feature cards may be missing the premium hover depth treatment.

### What to build

In `app/globals.css`, find and enhance the offer/proof card hover states.
Add these rules if not already present:

```css
/* Premium card hover — shared system */
.premium-card-hover {
  transition:
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 260ms ease,
    border-color 260ms ease;
}

.premium-card-hover:hover {
  transform: translateY(-5px) scale(1.005);
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(184, 255, 46, 0.12);
  border-color: rgba(184, 255, 46, 0.2);
}

.premium-card-hover:active {
  transform: translateY(-2px) scale(1.002);
  transition-duration: 80ms;
}
```

Then add `premium-card-hover` class to:
- Offer feature cards in `Scene04Offer.tsx` (if they're `<article>` or `<div>` elements)
- Proof/evidence cards in `Scene06ProofGate.tsx`
- Any card-like elements in `Scene03Roadmap.tsx`

Also audit `beyond.tsx` cards — they use `learn-card` class but are missing the hover border highlight. Add `hover:border-venom/30` inline or via `premium-card-hover`.

```bash
npm run typecheck && npm run build
git add app/globals.css components/
git commit -m "feat(ux): premium card hover system on offer, proof, roadmap cards — Phase E"
```

---

## PHASE F — TYPOGRAPHY PRECISION PASS

### Problem
The typography tokens exist but some sections use arbitrary Tailwind values that break the scale.

### What to do

**In `app/globals.css`**, add to the `:root` block these missing tokens if not present:

```css
/* Line-height system */
--lh-display: 1.02;
--lh-heading: 1.08;
--lh-subheading: 1.2;
--lh-body: 1.68;
--lh-label: 1.3;

/* Letter-spacing system */
--ls-display: -0.035em;
--ls-heading: -0.025em;
--ls-subheading: -0.015em;
--ls-body: 0;
--ls-label: 0.12em;
--ls-caps: 0.10em;
```

**In `app/globals.css`**, find `h1, h2, h3` rule and expand it:
```css
h1 {
  font-feature-settings: "kern" 1, "liga" 1;
  line-height: var(--lh-display);
  letter-spacing: var(--ls-display);
}
h2 {
  font-feature-settings: "kern" 1, "liga" 1;
  line-height: var(--lh-heading);
  letter-spacing: var(--ls-heading);
}
h3 {
  font-feature-settings: "kern" 1, "liga" 1;
  line-height: var(--lh-subheading);
  letter-spacing: var(--ls-subheading);
}
```

Audit all section components. Replace:
- `leading-[1.1]` → `leading-none` or keep if intentional for display heads
- Any `tracking-tightest` on h2 that's already getting letter-spacing from h2 rule → verify no double negative spacing
- Body `<p>` text: verify `max-width: 65ch` is set globally (it is in globals.css already)
- Stat numbers: verify `font-variant-numeric: tabular-nums` on CountUpNumber (it is already set)

```bash
npm run typecheck && npm run build
git add app/globals.css
git commit -m "style(type): line-height and letter-spacing precision system — Phase F"
```

---

## PHASE G — PERFORMANCE + CONTENT-VISIBILITY

### Problem
Off-screen sections render and paint on page load, consuming GPU unnecessarily.

### What to build

In `components/cinematic/ScrollFilmScene.tsx`, add `content-visibility` to sections that are far below the fold:

```tsx
<section
  ref={ref}
  id={id}
  data-scene-title={title}
  className={cn("relative isolate overflow-hidden bg-black text-bone", className)}
  style={{
    opacity: visible || reduced ? 1 : 0,
    transform: visible || reduced ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
    transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
    contentVisibility: "auto",
    containIntrinsicSize: "0 800px",
  }}
>
```

Note: Only apply to ScrollFilmScene (the scroll-film sections), NOT to the Hero scene.

```bash
npm run typecheck && npm run build
git add components/cinematic/ScrollFilmScene.tsx
git commit -m "perf: content-visibility auto on scroll-film sections — Phase G"
```

---

## PHASE H — LIBRARY AUDIT

```bash
npm outdated
```

If any of these are behind latest stable — update one at a time and build-test:
- `gsap` (current: 3.15.0 — likely current, skip if latest)
- `lenis` (current: 1.3.23 — check for 1.x updates only)
- `tailwindcss` (current: ^3.4.19 — stay on 3.x, do NOT upgrade to 4.x)
- `next` (current: 15.5.15 — update only if patch available)

For each update:
```bash
npm install [package]@latest
npm run typecheck && npm run build
# if broken: npm install [package]@[current-version]
```

```bash
git add package.json package-lock.json
git commit -m "chore(deps): safe dependency updates — Phase H"
```

---

## PHASE I — FINAL QA + PERFORMANCE AUDIT

### Playwright screenshots

Capture at these viewports and save to `output/playwright/`:
```
1920×1080 → premium-final-1920.png
1440×900  → premium-final-1440.png  
768×1024  → premium-final-768.png
430×932   → premium-final-430.png
390×844   → premium-final-390.png
```

### Runtime performance check

Run in Playwright browser context on `http://localhost:3018`:

```js
const longTasks = [];
new PerformanceObserver(list => longTasks.push(...list.getEntries())).observe({ entryTypes: ['longtask'] });

for (let i = 0; i < 12; i++) {
  window.scrollBy(0, window.innerHeight * 0.85);
  await new Promise(r => setTimeout(r, 90));
}
await new Promise(r => setTimeout(r, 600));

return {
  longTaskCount: longTasks.length,
  longTaskMaxMs: Math.round(Math.max(...longTasks.map(t => t.duration), 0)),
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  brokenImages: Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).length,
  gsapTweenCount: window.gsap?.globalTimeline?.getChildren?.()?.length ?? 'n/a',
};
```

**Acceptance:**
```
longTaskMaxMs      < 100ms
horizontalOverflow = false
brokenImages       = 0
```

### Final validation

```bash
npm run build
npm run typecheck
npm audit
```

### Final push

```bash
git log --oneline -10
git push origin premium-transformation-may-2026
```

---

## FINAL REPORT FORMAT

```
## Forensic Confirmation
Pre-existing implementations preserved: YES/NO

## Phases Executed
Phase A (Card Stagger):    DONE / PARTIAL / SKIP-REASON
Phase B (Heading Reveals): DONE / PARTIAL / SKIP-REASON
Phase C (Scene Reveals):   DONE / PARTIAL / SKIP-REASON
Phase D (Form States):     DONE / PARTIAL / SKIP-REASON
Phase E (Card Hover):      DONE / PARTIAL / SKIP-REASON
Phase F (Typography):      DONE / PARTIAL / SKIP-REASON
Phase G (Perf):            DONE / PARTIAL / SKIP-REASON
Phase H (Libraries):       DONE / PARTIAL / SKIP-REASON

## New Hooks Created
[filename] — [purpose]

## Files Modified
[file] — [what changed]

## Performance
longTaskMaxMs: [N]ms
horizontalOverflow: false
brokenImages: 0

## QA Viewports
1920×1080: PASS/FAIL
1440×900:  PASS/FAIL
768×1024:  PASS/FAIL
430×932:   PASS/FAIL
390×844:   PASS/FAIL

## Build:     PASS
## Typecheck: PASS
## Audit:     0 vulnerabilities

## Git Commits
Phase A: [hash]
Phase B: [hash]
Phase C: [hash]
Phase D: [hash]
Phase E: [hash]
Phase F: [hash]
Phase G: [hash]
Phase H: [hash]
Push: SUCCESS → origin/premium-transformation-may-2026
```
