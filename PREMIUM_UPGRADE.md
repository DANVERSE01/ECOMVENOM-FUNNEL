# ECOMVENOM — Premium Upgrade Pass
# Advanced Interactions + Motion + Libraries + Finishing
# v1.0 — Execute ONLY after EXECUTE_NOW.md is complete and pushed

---

## CONTEXT

```
Project root  : D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
Branch        : premium-transformation-may-2026
Stack         : Next.js / React / TypeScript / Tailwind / GSAP / Framer Motion
Dev server    : http://localhost:3018
```

**This is a premium engineering upgrade pass — NOT a redesign.**
**Execute only after EXECUTE_NOW.md is fully complete and pushed.**

---

## HARD RULES

```
[R1]  Preserve layout, copy, section order, brand direction, color mood
[R2]  No redesign from scratch
[R3]  No new dependencies unless they replace an existing one with a better version
      or are absolutely required — flag before adding
[R4]  No force-push, no merge main, no reset
[R5]  Do NOT touch public/testimonials, public/assets, public/generated
[R6]  Do NOT remove any YouTube embeds added in EXECUTE_NOW.md
[R7]  Push only to: origin premium-transformation-may-2026
[R8]  Every upgrade must either improve perceived quality OR performance
      Never add visual weight that costs more than it gives
```

---

## SAFETY RECORD — BEFORE ANY EDIT

```bash
git log --oneline -5
git status
```

Record HEAD. Stop if not on `premium-transformation-may-2026`.

---

## PHASE 1 — LIBRARY AUDIT & UPDATES

### Audit current versions
```bash
npm outdated
```

### Update these libraries to latest stable:
```
gsap          → latest stable
framer-motion → latest stable
@lenis/react  → latest stable (if used)
tailwindcss   → latest stable v3.x (do NOT upgrade to v4 — breaking changes)
next          → latest stable 14.x (do NOT jump to 15 without testing)
```

### Rules
- Update one library at a time
- Run `npm run typecheck && npm run build` after each update
- If an update breaks build — revert that library and continue
- Fix any deprecation warnings introduced by updates

```bash
npm run typecheck && npm run build
git add package.json package-lock.json
git commit -m "chore(deps): update GSAP, Framer, Lenis to latest stable — Phase 1"
```

---

## PHASE 2 — ADVANCED SCROLL & REVEAL SYSTEM

### Goal: Every section entrance must feel cinematic and intentional

```
[P2-1]  Audit all scroll-triggered reveals
        — Replace any abrupt opacity snap with smooth staggered entrance
        — Entrance timing: 600–900ms ease-out
        — Stagger between child elements: 80–120ms

[P2-2]  Hero entrance
        — Headline: split by word, stagger reveal top→down
        — Subheadline: fade up after headline completes
        — CTA: scale from 0.95 + fade, 200ms after subheadline

[P2-3]  Scroll-film scene transitions
        — Each scene: crossfade 400ms + subtle y-translate (20px → 0)
        — No abrupt cuts between scenes
        — Pinned sections: smooth scrub, no jank

[P2-4]  Section eyebrow labels
        — Slide in from left with opacity, 300ms ease-out
        — Trigger: 20% into viewport

[P2-5]  Stats / numbers
        — Count-up animation on enter viewport
        — Duration: 1200ms ease-out
        — Only trigger once

[P2-6]  Testimonial cards
        — Staggered reveal: each card 100ms after previous
        — Subtle y-translate (30px → 0) + opacity

[P2-7]  All reveals must use IntersectionObserver — never scroll event
[P2-8]  All reveals must respect prefers-reduced-motion
```

```bash
npm run typecheck && npm run build
git add components/
git commit -m "feat(motion): advanced scroll reveals and cinematic entrances — Phase 2"
```

---

## PHASE 3 — PREMIUM MICRO-INTERACTIONS

```
[P3-1]  CTA buttons (primary)
        — Hover: subtle magnetic pull effect (transform translate toward cursor, max 6px)
        — Active: scale(0.97) + shadow reduce
        — After click: brief pulse ripple from center
        — Transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)

[P3-2]  Secondary buttons / links
        — Hover: underline draws from left, 300ms
        — Arrow icon: translate 4px right on hover

[P3-3]  Cards (testimonials, offer features)
        — Hover: translateY(-4px) + shadow deepen
        — Transition: 250ms ease-out
        — Border: subtle highlight on hover edge

[P3-4]  Nav links
        — Hover: character-by-character color shift OR underline draw
        — Active: clear visual indicator
        — Mobile nav: slide in from right, staggered link reveal

[P3-5]  Form inputs (apply page)
        — Focus: border color transition + subtle glow (no blur, just color)
        — Label: float up on focus
        — Error state: shake animation (transform only, 400ms)

[P3-6]  Sticky CTA
        — Entrance: slide up from bottom, 400ms ease-out, on first scroll
        — Pulse: very subtle scale(1.0)→scale(1.02) every 4s (not distracting)
        — prefers-reduced-motion: no pulse, no slide — just appear
```

```bash
npm run typecheck && npm run build
git add components/
git commit -m "feat(ux): premium micro-interactions — Phase 3"
```

---

## PHASE 4 — TYPOGRAPHY SYSTEM UPGRADE

```
[P4-1]  Display headings (>60px)
        — line-height: 1.0–1.05
        — letter-spacing: -0.03em to -0.04em
        — font-feature-settings: "kern" 1, "liga" 1

[P4-2]  Section headings (40–60px)
        — line-height: 1.08–1.12
        — letter-spacing: -0.02em

[P4-3]  Body text
        — line-height: 1.65–1.75
        — max-width: 65ch on all paragraph containers

[P4-4]  Eyebrow / label text
        — letter-spacing: 0.10–0.14em
        — font-size: 11–12px
        — text-transform: uppercase

[P4-5]  Number / stat display
        — Tabular figures: font-variant-numeric: tabular-nums
        — Tight tracking: letter-spacing: -0.02em

[P4-6]  Verify consistent type scale ratio: 1.25× or 1.333× throughout
        — Fix any arbitrary font-size values that break the scale
```

```bash
npm run typecheck && npm run build
git add app/globals.css components/
git commit -m "style(type): premium typography system upgrade — Phase 4"
```

---

## PHASE 5 — VISUAL SYSTEM REFINEMENT

```
[P5-1]  Color system
        — Audit all hardcoded color values
        — Move to CSS custom properties if not already
        — Verify contrast ratios on all text/bg combinations (WCAG AA minimum)

[P5-2]  Spacing rhythm
        — Audit all section padding — must follow 8px base grid
        — Remove all arbitrary values (e.g. mt-[37px] → nearest grid value)
        — Desktop sections: 96–128px vertical
        — Mobile sections: 56–72px vertical

[P5-3]  Border & radius system
        — Consistent border-radius: pick ONE value per element type
            Buttons: 6px or 8px
            Cards: 12px or 16px
            Inputs: 8px
        — No mixing of different radii for same element type

[P5-4]  Shadow system
        — Define 3 shadow levels: sm, md, lg
        — Remove all one-off custom shadows
        — No colored glows — only neutral shadows

[P5-5]  Icon system
        — Consistent icon size per context:
            Nav: 20px
            Inline: 16px
            Feature icons: 24px
        — Consistent stroke weight throughout

[P5-6]  Gradient system
        — Max 2 gradient directions on entire page
        — No harsh gradient cuts — always feathered edges
        — Verify gradients look correct in both light and dark mode
```

```bash
npm run typecheck && npm run build
git add app/globals.css components/
git commit -m "style(visual): color, spacing, border, shadow system upgrade — Phase 5"
```

---

## PHASE 6 — SMOOTH SCROLL & NAVIGATION UPGRADE

```
[P6-1]  Lenis smooth scroll
        — Verify Lenis is initialized correctly
        — duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        — Disable on mobile if causing issues (use native scroll on mobile)

[P6-2]  Scroll progress indicator
        — Thin line at top: 1–2px, brand color, smooth fill
        — Only on desktop

[P6-3]  Anchor navigation
        — All internal anchor links scroll with Lenis
        — Offset for sticky nav height

[P6-4]  Nav scroll behavior
        — On scroll down: nav compresses height slightly (72px → 56px)
        — On scroll up: nav expands back
        — Transition: 300ms ease
        — Logo scales slightly: 1.0 → 0.9 on compress

[P6-5]  Back-to-top
        — Appears after 3 scroll heights
        — Smooth scroll to top via Lenis
        — Subtle entrance/exit animation
```

```bash
npm run typecheck && npm run build
git add components/
git commit -m "feat(nav): smooth scroll upgrade and nav behavior — Phase 6"
```

---

## PHASE 7 — FINAL QA + PERFORMANCE VERIFICATION

### Playwright screenshots
```
1920×1080 → output/playwright/premium-final-1920.png
1440×900  → output/playwright/premium-final-1440.png
768×1024  → output/playwright/premium-final-768.png
430×932   → output/playwright/premium-final-430.png
390×844   → output/playwright/premium-final-390.png
```

### Runtime performance check
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
  brokenImages: Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).length
};
```

**Acceptance criteria:**
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
## Libraries Updated
[library] [old version] → [new version] | PASS/SKIP

## Upgrades Applied Per Phase
Phase 1: [items done]
Phase 2: [items done]
Phase 3: [items done]
Phase 4: [items done]
Phase 5: [items done]
Phase 6: [items done]

## Files Changed
[file] — [description]

## Visual Direction
Layout: UNCHANGED
Copy: UNCHANGED
Brand: UNCHANGED
Cinematic identity: ENHANCED not replaced

## Performance
Long task max before: [N]ms → after: [N]ms
Horizontal overflow: false

## QA Results
1920x1080: PASS/FAIL
1440x900:  PASS/FAIL
768x1024:  PASS/FAIL
430x932:   PASS/FAIL
390x844:   PASS/FAIL

## Build: [result]
## Typecheck: [result]
## Audit: [result]

## Git Commits
Phase 1: [hash]
Phase 2: [hash]
Phase 3: [hash]
Phase 4: [hash]
Phase 5: [hash]
Phase 6: [hash]
Push: SUCCESS — origin premium-transformation-may-2026
Preview: http://localhost:3018
```
