# ECOMVENOM — OPUS 4.7 Premium System Rebuild Brief

## Read First

You are Claude Code running with Opus 4.7.

This is a clean premium rebuild pass for the ECOMVENOM funnel website.

This is not a polish pass.
This is not a shallow CSS overlay task.
This is not a REAL PROOF-only task.
This is not a continuation of the rejected creative branch.

Do not push.
Do not deploy.
Do not merge.
Stop after final report and wait for user approval.

---

## Accepted Baseline

Start from:

```txt
main@85a9c9a
```

Production URL:

```txt
https://ecomvenom.netlify.app
```

Preserve the last successful Codex behavior:

- Hero VSL visible and functional.
- Wistia play/pause works.
- Wistia mute/unmute works.
- Browser-safe Wistia sound fallback stays preserved.
- Mobile cinematic scene stays scroll-scrubbed.
- Mobile cinematic video progresses with scroll, not independent autoplay.
- Sticky mobile CTA hides during cinematic scene and returns after it.
- Closed proof dialog does not intercept clicks.
- `/`, `/apply`, `/schedule`, `/confirmation` remain working.
- No horizontal overflow.
- Reduced-motion support remains valid.

---

## Rejected Branch

Rejected branch:

```txt
design/creative-impact-upgrade
```

This branch is visually rejected.

Do not merge it.
Do not push it.
Do not deploy it.
Do not continue it as the final design direction.

If available, inspect this file only as technical reference:

```txt
_OPUS47_REFERENCE_HANDOFF_FROM_REJECTED_BRANCH.md
```

Use it only to understand:
- useful technical findings
- what failed visually
- what must not be repeated
- GSAP proof learnings
- screenshot / QA evidence

Then start clean from `main@85a9c9a`.

---

## Required Branch

Create:

```txt
design/opus47-premium-system-rebuild
```

---

## Mission

Rebuild the full visual system into a genuinely premium 2026 dark luxury ecommerce conversion experience.

The previous result was rejected because it was visually basic, inconsistent, laggy, shallow, weak in Arabic/English parity, and not a true premium creative direction.

Do not repeat that approach.

The final site must be clearly stronger across the full funnel:
- global design system
- color system
- material system
- typography
- spacing
- scroll behavior
- transitions
- CTA system
- VSL stage
- cinematic scene
- REAL PROOF
- Arabic/English consistency
- mobile execution
- performance

---

## Art Direction Source of Truth

Use this exact system:

```txt
Dark Graphite Luxury / Acid Performance Grade
```

Look:
Deep black luxury-tech grade with controlled acid-lime highlights and burnt-orange heat accents. Crushed OLED blacks, graphite material depth, frosted smoked glass, matte industrial surfaces, restrained bloom, controlled halation, micro-textured shadows, high-contrast premium typography, cinematic low-key separation.

Palette:
- Venom Black: #010101 — dominant background
- Carbon Night: #0B0A08 — primary dark panels
- Charcoal Graphite: #1A1813 — secondary surfaces
- Smoked Graphite: #2D2B26 — borders, dividers, material edges
- Bone White: #E4E1DC — primary readable text
- Acid Lime Signal: #D5D904 — primary action/accent
- Burnt Velocity Orange: #C74208 — urgency/heat accent only
- Ash Metal: #474741
- Steel Grey: #6E6B67
- Soft Warm Silver: #A29E97
- Olive Signal Shadow: #918C09
- Deep Amber Smoke: #5C3E0B

Gradient recipes:

```css
/* OLED Depth Field */
linear-gradient(135deg, #010101 0%, #0B0A08 45%, #1A1813 100%)

/* Graphite Surface Fade */
linear-gradient(145deg, #1A1813 0%, #2D2B26 48%, #0B0A08 100%)

/* Acid Signal Glow */
radial-gradient(circle, rgba(213,217,4,0.88) 0%, rgba(213,217,4,0.28) 34%, rgba(1,1,1,0) 74%)

/* Burnt Velocity Glow */
radial-gradient(circle, rgba(199,66,8,0.78) 0%, rgba(199,66,8,0.28) 38%, rgba(1,1,1,0) 78%)

/* Frosted Glass Sheen */
linear-gradient(145deg, rgba(228,225,220,0.20) 0%, rgba(110,107,103,0.10) 38%, rgba(1,1,1,0.88) 100%)
```

Material language:
- OLED Black Glass
- Frosted Smoked Glass
- Soft-Touch Matte Polymer
- Matte Graphite Metal
- Smoked Acrylic Edge Glow
- Micro-Embossed Carbon Texture
- Topographic Noise Texture
- Acid Emissive Surface
- Burnt Heat Emission
- Brushed Shadow Metal

Do not use snakes, fangs, venom drops, reptile textures, slime, fake awards, fake badges, fake proof, fake screenshots, fake claims, or invented content.

---

## Workflow

1. Verify repo, branch, commit, and dirty state.
2. Preserve rejected branch as reference only.
3. Checkout `main`.
4. Verify `main` is at or aligned with `85a9c9a`.
5. Create `design/opus47-premium-system-rebuild`.
6. Inspect actual page/component order.
7. Create `_OPUS47_PREMIUM_REBUILD_PLAN.md`.
8. Execute the rebuild.
9. Run QA.
10. Create `_OPUS47_PREMIUM_REBUILD_REPORT.md`.
11. Stop.

Do not ask for approval unless blocked by a destructive action, missing baseline, unavailable scripts, or missing critical assets.

---

## Implementation Standard

This must be a proper tokenized design-system rebuild, not one decorative override file.

Create or refactor:
- palette variables
- surface variables
- border variables
- shadow variables
- glow variables
- typography rhythm
- motion timing
- spacing scale
- focus states
- reduced-motion behavior

Use the existing stack first:
- Next.js
- Tailwind
- existing CSS/global CSS
- GSAP/ScrollTrigger if already installed and stable
- existing shadcn/ui patterns if present
- existing motion/framer setup if present

Do not add heavy dependencies unless there is a documented visible payoff and build passes.

---

## Full-Site Scope

Upgrade, in visual order:

1. Global background and material system.
2. Navigation.
3. Hero.
4. Hero credibility/proof elements.
5. CTA system.
6. Hero VSL frame.
7. Cinematic scroll scene.
8. Mechanism/value sections.
9. Offer sections.
10. REAL PROOF.
11. Testimonials/proof areas if present.
12. Founder/authority sections if present.
13. FAQ.
14. Final CTA.
15. Footer.
16. `/apply`.
17. `/schedule`.
18. `/confirmation` if present.
19. Mobile layouts.
20. Arabic and English states.

Do not skip sections.

---

## Section Requirements

### Hero
Make the hero a premium first impression. Improve composition, hierarchy, contrast, lighting, CTA clarity, VSL relationship, material depth, mobile first screen, and Arabic/English parity.

### VSL
Preserve working Wistia behavior. Upgrade only the stage, surfaces, lighting, layout, and frame unless a real bug is found.

### Cinematic Scene
Preserve Codex scroll-scrub behavior. Improve atmosphere, material depth, lighting consistency, transition quality, mobile stability, and reduced-motion safety. Do not increase lag.

### REAL PROOF
Stability first. Readability second. Premium interaction third.

Desktop:
Use a stable evidence-wall interaction. Vertical-scroll-driven horizontal movement is allowed only if smooth and stable. If GSAP pin causes glitches, replace it with a safer sticky scroll-linked composition.

Mobile:
No pin, no scroll trap, readable proof, premium stacked/grid layout, no horizontal overflow.

Arabic/English:
No broken bidi, reversed labels, layout shift, or visual inconsistency.

### CTA System
Use acid-lime primary action, graphite-black material base, smoked acrylic glow, and burnt orange only for urgency/heat accents. No cheap glow. No excessive animation.

### Cards / Panels
Use OLED Black Glass, Frosted Smoked Glass, Matte Graphite Metal, Micro-Embossed Carbon Texture, Smoked Acrylic Edge Glow, Acid Emissive Surface, and Burnt Heat Emission. Avoid flat bordered boxes.

### Typography
Improve scale, rhythm, line-height, editorial hierarchy, contrast, Arabic/English parity, number treatment, labels, section headers, and CTA emphasis.

### Motion
Use subtle reveal timing, stable scroll-linked emphasis, CTA feedback, card depth, VSL stage glow, proof progression, and final CTA emphasis. Avoid random fade spam, layout animation, scroll hijacking, laggy blur, overdone glow, and mobile jank.

---

## Performance Requirements

The previous pass caused lag and unstable behavior. This pass must reduce fragility.

Rules:
- use transform/opacity where possible
- avoid excessive filter blur
- avoid too many fixed pseudo-elements
- avoid too many large radial gradients on mobile
- simplify motion on mobile
- respect `prefers-reduced-motion`
- test actual scroll performance
- confirm CSS is actually loaded in browser
- remove or replace any effect that visibly lags

---

## Mandatory QA

Run:

```bash
npm run typecheck
npm run build
```

Do not claim build passed if it timed out.

Browser QA:
- CSS confirmed loaded
- 1440 desktop
- 768 tablet
- 390 mobile
- Arabic and English
- hero
- VSL controls
- cinematic scene
- REAL PROOF repeated scroll test
- all CTAs
- `/apply`
- `/schedule`
- `/confirmation` if present
- no horizontal overflow
- no console errors/warnings
- no obvious lag
- no broken styling after language switch

---

## Screenshots

Save screenshots to:

```txt
screenshots/opus47-premium-rebuild/
```

Required:
- 1440 hero
- 1440 VSL
- 1440 cinematic scene
- 1440 REAL PROOF
- 1440 final CTA
- 390 hero
- 390 VSL
- 390 REAL PROOF
- 390 apply
- 390 schedule
- Arabic hero
- Arabic REAL PROOF

---

## Final Report

Create:

```txt
_OPUS47_PREMIUM_REBUILD_REPORT.md
```

Include:
- branch name
- baseline verified
- rejected branch used only as reference
- files changed
- palette implementation
- material implementation
- section-by-section changes
- Arabic/English consistency result
- REAL PROOF stability result
- VSL preservation result
- cinematic scene preservation result
- performance notes
- commands run
- typecheck/build results
- browser QA results
- screenshots captured
- remaining risks
- whether safe to review
- whether safe to merge

---

## Acceptance Standard

Do not claim completion unless:
- the site is clearly more premium than the live baseline
- the site is clearly stronger than the rejected branch
- the full site is upgraded, not only one section
- the palette is visibly implemented across the system
- Arabic and English are consistent
- REAL PROOF is stable
- scroll is smooth
- VSL still works
- mobile is premium
- typecheck passes
- build passes
- browser QA passes
- no push/deploy/merge was performed

Stop after report and wait for user approval.
