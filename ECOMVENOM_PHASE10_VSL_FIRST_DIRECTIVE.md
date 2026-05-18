# ECOMVENOM — Phase 10 Directive
## VSL-First Funnel Hero + Awwwards-Level Interaction Recomposition

**Execution mode:** single controlled implementation phase  
**Target project:** `ECOMVENOM-FUNNEL`  
**Context:** The original `ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md` is complete. Phase 0–9 passed. Do not continue generic cleanup.

---

## 0. Current Confirmed State

The original rebuild plan has already completed:

- Phase 0 PASS — baseline verification
- Phase 1 PASS — narrative beats mounted
- Phase 2 PASS — mobile gating + bundle slimming
- Phase 3 PASS — Hero WebGL Decision Convergence rewrite
- Phase 4 PASS — section atmosphere differentiation + mobile pill
- Phase 5 PASS — motion consolidation + reduced-motion fix
- Phase 6 PASS — Wistia VSL poster fallback resilience
- Phase 7 PASS — accessibility polish
- Phase 8 SKIP — blocked by no-delete / no-dependency-change rules
- Phase 9 PASS — final QA gate

The previous plan made the site technically safer, faster, more accessible, and better structured. However, the client-critical creative requirement below is not yet satisfied.

---

# PHASE 10 — VSL-FIRST FUNNEL HERO + AWWWARDS-LEVEL INTERACTION RECOMPOSITION

## 1. New Client-Critical Requirement

The homepage must become a **VSL-first funnel experience**.

The approximately 11-minute Wistia VSL must become the **dominant first-fold experience immediately when the site opens**.

The current result is technically improved, but the homepage still needs a visible premium transformation from a “premium landing page” into a **VSL-first ecommerce conversion funnel** with:

- Framer-level first-fold clarity
- Awwwards-level transition taste
- Premium dark editorial luxury
- Conversion funnel discipline
- Cinematic but usable scroll choreography
- High-end interaction quality
- No generic SaaS layout
- No cheap neon/gamer visuals
- No snake/venom clichés
- No fake proof or fake urgency
- No random decorative motion

This new phase must be executed as a **Senior Creative Technology Director + Principal Frontend Architect + Conversion UX Director** pass, not as a minor layout tweak.

---

## 2. Final Client-Approved Wistia Video IDs

Before any visual recomposition, replace the two Wistia videos with the final client-approved media IDs below.

### 2.1 Hero VSL / First Homepage Video

```txt
New Wistia mediaId: 0z2r9j4jnz
Duration: PT660S / 11:00
Aspect: 16:9 / 1.7777777777777777
Client-required behavior: attempt autoplay with sound
```

#### Hero Embed Reference

```html
<script src="https://fast.wistia.com/player.js" async></script>
<script src="https://fast.wistia.com/embed/0z2r9j4jnz.js" async type="module"></script>
<style>
  wistia-player[media-id='0z2r9j4jnz']:not(:defined) {
    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/0z2r9j4jnz/swatch');
    display: block;
    filter: blur(5px);
    padding-top:56.25%;
  }
</style>
<wistia-player media-id="0z2r9j4jnz" aspect="1.7777777777777777"></wistia-player>
```

#### Mandatory Hero VSL Behavior

- Attempt autoplay with sound because this is the client-required funnel behavior.
- Do **not** silently change autoplay to muted.
- If a browser blocks autoplay with sound, preserve the sound-first funnel intent by adding a premium click-to-start / click-for-sound overlay.
- Do not degrade the experience into silent autoplay without explicit evidence and documentation.

### 2.2 Confirmation Page Video

```txt
New Wistia mediaId: bg446wfhed
Duration: PT201S / 3:21
Aspect: 9:16 / 0.5625
```

#### Confirmation Embed Reference

```html
<script src="https://fast.wistia.com/player.js" async></script>
<script src="https://fast.wistia.com/embed/bg446wfhed.js" async type="module"></script>
<style>
  wistia-player[media-id='bg446wfhed']:not(:defined) {
    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/bg446wfhed/swatch');
    display: block;
    filter: blur(5px);
    padding-top:177.78%;
  }
</style>
<wistia-player media-id="bg446wfhed" aspect="0.5625"></wistia-player>
```

---

## 3. Step A — Video Replacement First

### First Inspect

Inspect all current Wistia and video usage before editing:

- `components/cinematic/WistiaPlayer.tsx`
- `components/venom/VslStage.tsx`
- `components/sections/HeroSection.tsx`
- `components/confirmation/pre-call-video.tsx`
- `app/page.tsx`
- `components/venom/opus47-premium.css`
- current Wistia poster fallback implementation from Phase 6
- all current mediaId usage across:
  - `app/`
  - `components/`
  - `hooks/`
  - `lib/`

### Required Video Replacement

- Replace the current hero VSL mediaId with `0z2r9j4jnz`.
- Replace the current confirmation video mediaId with `bg446wfhed`.
- Preserve the Phase 6 Wistia poster fallback behavior.
- Use Wistia swatch fallback URLs if needed:
  - `https://fast.wistia.com/embed/medias/0z2r9j4jnz/swatch`
  - `https://fast.wistia.com/embed/medias/bg446wfhed/swatch`
- Preserve the existing Wistia standard player architecture.
- Do not paste duplicate global scripts if `WistiaPlayer` already loads `player.js` and media-specific scripts.
- Do not change dependencies.

---

## 4. Reference URL

Use this public reference for **funnel-logic inspiration only**:

```txt
https://yousefmohammed.com/edit-magnet
```

### Reference Usage Rules

Do not copy:

- design 1:1
- text
- Arabic copy
- claims
- testimonials
- prices
- numbers
- countdown values
- colors
- layout literally

Extract only the funnel mechanics:

- dominant VSL first fold
- urgency/status rail
- CTA proximity
- watch-first logic
- secure/access microcopy
- proof rhythm
- value stack pressure
- objection handling

Rebuild the concept as a more advanced, more premium, more original **ECOM VENOM-specific** experience.

---

## 5. Pre-Edit Inspection Requirement

Before editing, inspect:

- `app/page.tsx`
- `components/sections/HeroSection.tsx`
- `components/venom/VslStage.tsx`
- `components/cinematic/WistiaPlayer.tsx`
- `components/three/HeroScene.tsx`
- `components/ui/StickyMobileCTA.tsx`
- `components/nav.tsx`
- `components/effects/ScrollMotionInit.tsx`
- `components/effects/ChapterRail.tsx`
- `lib/motion.ts`
- `lib/gsap.ts`
- `lib/lenis.ts`
- `components/venom/opus47-premium.css`
- current Phase 9 screenshots
- current Wistia media configuration
- current CTA flow to `/apply`
- the reference URL for funnel logic only

---

## 6. Decision Gate Before Implementation

Evaluate the current homepage visually at:

- `1440×900`
- `1280×900`
- `768×1024`
- `430×932`
- `390×844`

Answer internally:

1. Does the first fold clearly feel VSL-first?
2. Is the VSL the dominant conversion object?
3. Do the transitions feel premium and memorable?
4. Does the scroll feel directed, not stacked?
5. Does mobile communicate “watch first, then apply” immediately?

If any answer is **no**, implement this recomposition.

---

## 7. Implementation Requirements

### 7.1 VSL-First Hero Recomposition

Recompose the hero so the VSL/video frame is the main first-fold object.

Requirements:

- The VSL must be visible immediately without scrolling.
- The VSL must be visually dominant.
- Headline, proof bullets, and CTA must support the video, not overpower it.
- Preserve approved copy sources.
- Do not rewrite content files.
- Preserve Wistia playback and Phase 6 poster fallback.
- No black/blank video box.
- No layout shift when Wistia becomes ready.
- Hero must feel like a conversion event, not a decorative landing-page hero.

### 7.2 Premium VSL Command Frame

Create a high-end VSL container that feels like a premium conversion operating room.

Requirements:

- dominant 16:9 desktop frame
- smoked graphite/glass border
- acid-lime controlled signal glow
- subtle top status/control rail
- crisp inner hairlines
- no clutter
- no cheap video embed look
- no new palette colors
- style only through existing tokens and `components/venom/opus47-premium.css`

The frame must look intentionally designed for ECOM VENOM, not like a standard Wistia embed dropped into a page.

### 7.3 Funnel Status / Urgency Rail

Add a premium rail around or above the VSL.

Allowed truthful modules:

- `WATCH THE TRAINING FIRST`
- `APPLICATION FLOW`
- `SECURE APPLICATION`
- `VSL REQUIRED BEFORE APPLICATION`
- `START YOUR APPLICATION`
- neutral session/status indicators without fake numbers

Forbidden:

- fake viewers
- fake bookings
- fake discounts
- fake countdowns
- fake scarcity
- fake testimonials
- fake revenue claims
- fake proof
- fake prices

If no real source data exists, use neutral truthful labels only.

### 7.4 VSL-First Mobile Design

On `390×844` and `430×932`:

- VSL must remain first-class in the first screen.
- Do not bury the video under long copy.
- CTA must be visible or quickly reachable.
- The screen must clearly say: watch the VSL, then apply.
- Keep motion light.
- No mobile WebGL.
- No cramped stacked clutter.
- No horizontal overflow.

The first mobile screen must feel designed around the video, not like desktop content stacked down the page.

### 7.5 Premium Transition System

Upgrade section-to-section movement with restrained, high-end transitions:

- Hero → Problem
- Problem → ScrollFilm
- ScrollFilm → Mechanism
- Mechanism → Roadmap
- Proof → Founder
- Offer → FAQ
- FAQ → FinalCTA

Use only the existing GSAP / ScrollTrigger / Lenis stack.

Do not add dependencies.

#### Preferred Transition Language

Consider:

- cinematic hairline wipes
- signal-line continuation from VSL into Problem/Mechanism
- scroll-progress controlled surface shift
- glass depth parallax
- VSL frame micro-shift on scroll exit
- chapter rail compression/expansion
- proof wall elevation on approach
- offer signal lock-in
- final CTA convergence moment

#### Transition Rules

- Motion must improve comprehension.
- No decorative chaos.
- No scroll traps.
- No heavy pinned sections unless already stable.
- No content hidden if JS fails.
- Every new motion path must respect `prefers-reduced-motion`.

### 7.6 Interaction Quality Pass

Add only a small number of high-quality interactions:

- premium CTA hover/focus/press response
- VSL rail microinteraction
- mechanism active-step refinement if needed
- proof card approach/active state if beneficial
- final CTA convergence lock

Do not add:

- gimmicks
- custom cursor changes on mobile
- effects that hurt readability

---

## 8. Preserve All Successful Phase 1–9 Work

Preserve:

- current section order
- `ProblemSection` mounted
- Proof before Founder
- mobile Three.js gate
- Decision Convergence desktop scene if compatible
- section atmosphere pivots
- Roadmap 45-day labels
- mobile cinematic pill
- MutationObserver motion consolidation
- reduced-motion reveal fix
- Wistia poster fallback
- accessibility fixes
- preloader ceiling
- `/apply` CTA flow
- `/confirmation` behavior
- Lenis behavior
- EN/AR support

---

## 9. Hard Restrictions

Do not:

- add packages
- change dependencies
- push
- deploy
- merge
- delete files
- reset git
- clean git
- edit copy/content files
- fabricate claims
- fabricate proof
- fabricate urgency
- fabricate prices
- fabricate countdowns
- fabricate viewers
- fabricate bookings
- use forced browser hacks as QA proof
- introduce new palette colors
- create a new CSS file unless absolutely unavoidable

---

## 10. Required Verification Commands

After edits run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

All three must exit `0`.

---

## 11. Browser QA Requirements

Run browser QA for:

- `/` at `1440×900` first fold
- `/` at `1280×900` first fold
- `/` at `768×1024` first fold
- `/` at `430×932` first fold
- `/` at `390×844` first fold
- full homepage scroll at `1440`
- full homepage scroll at `390`
- `/apply` route
- `/confirmation` route
- EN quick check
- AR/RTL quick check
- reduced-motion quick check

---

## 12. Required Verification Outcomes

Verify:

- Hero uses Wistia mediaId `0z2r9j4jnz`.
- Confirmation uses Wistia mediaId `bg446wfhed`.
- Hero VSL attempts autoplay with sound as the client requested.
- If sound autoplay is blocked, a premium click-to-start / click-for-sound overlay preserves the intent.
- VSL is visible immediately above the fold.
- VSL is visually dominant.
- The first screen now reads as a VSL-first funnel, not a generic landing-page hero.
- Transitions are visibly more premium and intentional.
- Scroll experience feels directed and non-traditional without scroll traps.
- CTA to `/apply` works.
- No black/blank video box.
- No horizontal overflow.
- No pageerror events.
- Home First Load JS stays close to current `252 kB`; any increase must be justified.
- Reduced-motion remains safe.
- The result is inspired by the reference funnel logic but visually original for ECOM VENOM.

---

## 13. Screenshot Evidence Requirements

Save screenshots to:

```txt
audit-2026-supreme/phase10-vsl-first-interaction-recomposition/
```

Required captures:

- `d1440-hero-vsl-first.png`
- `d1280-hero-vsl-first.png`
- `t768-hero-vsl-first.png`
- `m430-hero-vsl-first.png`
- `m390-hero-vsl-first.png`
- `d1440-hero-to-problem-transition.png`
- `d1440-scrollfilm-handoff.png`
- `d1440-mechanism-transition.png`
- `d1440-proof-founder-transition.png`
- `d1440-offer-final-flow.png`
- `confirmation-d1440-new-video.png`
- `confirmation-m390-new-video.png`
- `m390-hero-to-problem.png`
- `m390-scrollfilm.png`
- `m390-final-cta.png`
- `ar-d1440-hero-vsl-first.png`
- `reduced-motion-hero.png`

---

## 14. Required Final Report

Stop after Phase 10 and report:

- decision made
- video IDs replaced
- reference insights used
- files inspected
- files changed
- commands run
- desktop/mobile browser observations
- VSL first-fold proof
- confirmation video proof
- transition and scroll choreography changes
- screenshots created
- bundle size delta
- risks avoided
- remaining blockers
- pass/fail verdict
- whether this is ready for manual visual review

---

## 15. Final Acceptance Criteria

This phase is only a PASS if all conditions are true:

1. The hero video is replaced with `0z2r9j4jnz`.
2. The confirmation video is replaced with `bg446wfhed`.
3. The homepage first fold is visibly VSL-first on desktop.
4. The homepage first fold is visibly VSL-first on mobile.
5. The VSL is the dominant conversion object.
6. Sound-first client intent is preserved.
7. If autoplay with sound is blocked, the fallback overlay is premium and explicit.
8. The page no longer reads as a generic landing-page hero.
9. Transitions feel more premium, intentional, and directed.
10. No fake urgency, fake proof, fake prices, fake viewers, fake bookings, or fake countdowns are introduced.
11. No dependencies are changed.
12. No content/copy files are rewritten.
13. No deployment, push, merge, delete, reset, or clean operation occurs.
14. `npx tsc --noEmit` exits `0`.
15. `npm run lint` exits `0`.
16. `npm run build` exits `0`.
17. No horizontal overflow exists on tested viewports.
18. No pageerror events are introduced.
19. Reduced-motion remains safe.
20. Screenshot evidence is saved in the required folder.

If any acceptance criterion fails, mark the phase as FAIL and report the blocker precisely.
