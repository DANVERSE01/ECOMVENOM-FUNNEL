# ECOMVENOM — Production Polish Audit (Phase 1)

**Branch:** `hotfix/final-production-polish-vsl-funnel`
**Base commit:** `8bc2ef5` (`origin/main`)
**Audit window:** desktop 1440×900, 1366×768, 1280×900, tablet 768×1024,
mobile 430×932 / 390×844 / 360×740, plus AR/RTL and reduced-motion.
**Routes audited:** `/`, `/apply`, `/schedule`, `/confirmation`.

Evidence captured in `audit-production-polish/baseline/` (one screenshot per
viewport / section, plus `d1440-fullpage.png`).

---

## P0 — Conversion-critical / first-impression

### P0-1 Desktop hero is not first-fold complete on 1366×768 / 1440×900

- **Route:** `/`
- **Viewport:** 1440×900 and 1366×768 (most common laptop / desktop sizes)
- **Evidence:** `baseline/d1440-hero.png`, `baseline/d1366-hero.png`,
  `baseline/d1280-hero.png`. DOM probe confirms hero `height: 1403px` on
  900px viewport. VSL frame ends at `y=838`. Headline starts at `y=895`,
  fully below the fold.
- **Affected files:**
  - `components/sections/HeroSection.tsx`
  - `components/venom/opus47-premium.css` (`.v2-hero--vsl-first` rules)
- **Root cause:** hero padding-top (`clamp(5.4rem, 9vw, 7.4rem)`),
  status-rail row (~70 px), VSL `max-width: 1080px` with 16:9 aspect
  forces the dominant frame to ~607 px tall. Stacked vertically, this
  pushes headline + body + CTAs below the fold, plus a large unused gap
  before the next section.
- **Why it hurts:** the funnel is VSL-first, but the conversion intent
  (headline + primary CTA) is invisible on first paint of the most common
  desktop sizes. The page reads as "VSL alone, scroll to find context".
- **Fix approach:**
  1. Cap `.v2-hero__vsl-dominant` width to `min(1040px, 64vw)` so the
     16:9 frame gets ~580 px tall on 1440 width and ~512 px on 1366,
     leaving room below.
  2. Reduce hero padding-top on `min-width: 1024px` to
     `clamp(4.4rem, 6.5vw, 6rem)` so the rail starts higher.
  3. Tighten the gap between rail / VSL / support cluster on desktop
     from `clamp(1.1rem, 2vw, 1.6rem)` to `clamp(0.7rem, 1.4vw, 1.1rem)`.
  4. Reduce hero `padding-bottom` to a tight value so the bottom signal
     hairline meets the next section without dead space.

### P0-2 Hero "support cluster" (headline + body + CTAs) lacks visual weight

- **Route:** `/`
- **Viewport:** all
- **Evidence:** `baseline/d1440-fullpage.png`. Below the dominant VSL,
  the headline (`clamp(1.6rem, 3.4vw, 2.6rem)` ≈ 36 px on 1440) sits
  with center alignment in mid-hero gray. There is no visual divider,
  no eyebrow label, the proof bullets are simple acid dots, and the
  primary CTA is on the same row as the secondary ghost.
- **Affected files:**
  - `components/sections/HeroSection.tsx`
  - `components/venom/opus47-premium.css` (`.v2-hero__support`,
    `.v2-hero__headline`, `.v2-hero--vsl-first .vx-actions`).
- **Root cause:** the layout assumes the VSL carries the eye and copy
  is supplementary, but with no eyebrow, no color/weight contrast, and
  identical button widths, the copy reads as muted boilerplate.
- **Fix approach:**
  - Add an Aeonik / acid eyebrow label above the headline (already
    available via `.v2-label` styles).
  - Lift headline to `clamp(2rem, 3.4vw, 2.9rem)` and tighten leading.
  - Differentiate primary CTA (`vx-button`, full width on small,
    auto on desktop) vs secondary ghost (smaller, less prominent).
  - Add a thin acid hairline between VSL and support cluster.

### P0-3 Status rail looks decorative, not informative

- **Route:** `/`
- **Viewport:** all
- **Evidence:** `baseline/d1440-hero.png`, `baseline/m390-hero.png`.
  Three identical pills "WATCH THE TRAINING FIRST · APPLICATION FLOW ·
  SECURE APPLICATION" with one acid dot on the active pill. No step
  numbers, no progression indicator.
- **Affected files:**
  - `components/sections/HeroSection.tsx`
  - `components/venom/opus47-premium.css`
- **Root cause:** the rail was added as a "neutral, truthful" replacement
  for fake scarcity but reads as decorative because the three pills
  carry the same visual weight and no flow direction.
- **Fix approach:** introduce `01 / 02 / 03` step indices, clarify the
  active step with an acid background tint, add chevron separators that
  flip with `[dir="rtl"]`, and keep the labels neutral.

### P0-4 Hero VSL frame loading state has no premium identity

- **Route:** `/`
- **Viewport:** all
- **Evidence:** `baseline/d1440-hero.png` shows the Wistia poster
  `/media/hero-vsl-poster.webp` until api-ready. The frame is just an
  edge-glow on raw black. There is no eyebrow label inside the frame,
  no scene title, no presentation chrome.
- **Affected files:**
  - `components/venom/VslStage.tsx`
  - `components/venom/StatusPill.tsx`
  - `components/venom/opus47-premium.css`
- **Root cause:** the existing `StatusPill` ("Founder video") sits
  *outside* the frame and is visually weak. Inside the frame, only
  the poster image carries identity.
- **Fix approach:** move a discreet caption label inside the top-left
  of the VSL frame (like a film slate: `00:00 · FOUNDER VSL · ECOMVENOM`),
  pure CSS, no animation, single hairline divider. Hidden when reduced
  motion is set. Keep it tiny so it never competes with the play surface.

---

## P1 — Polish / rhythm / clarity

### P1-1 Section spacing rhythm too uniform

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-fullpage.png`, full page is 14603 px on
  1440. Sections (Problem ~860, Mechanism ~736, Roadmap ~1127, Proof
  ~1633, Founder ~1206, Offer ~1192, FAQ ~718) all use the same
  `.vx-section--compact` block padding. The page lacks a "breathing"
  sequence (tight beat → wide beat) between the cinematic ScrollFilm
  (4680 px) and Mechanism.
- **Affected files:**
  - `components/venom/tokens.css`
  - `components/venom/opus47-premium.css`
- **Fix approach:** introduce a tighter `--vo-section-y-tight` for
  Problem / Mechanism (which are dense data sections) and keep the
  current value for narrative beats (Founder / Offer). Pure CSS
  variable adjustment; no DOM changes.

### P1-2 ScrollFilm transition into Mechanism is abrupt

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-mechanism.png`. ScrollFilm ends at the
  pinned monitor, then Mechanism opens with a blue-grey atmosphere.
  No visual handoff, just a hairline.
- **Affected files:**
  - `components/venom/opus47-premium.css` (`#mechanism::before`)
  - `components/sections/MechanismSection.tsx`
- **Fix approach:** Mechanism already has a top hairline; add a
  short fade-down gradient from `#010101` to mechanism background
  (~120 px tall) so the sticky pin releases into a calmer light.

### P1-3 Mechanism step "active ring" is invisible at scroll speed

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-mechanism.png`. At ~736 px section
  height, the active-step rule (`v2-mechanism__step[data-active="true"]`)
  flips through five steps over a short scrub window so the ring
  barely catches the eye.
- **Affected files:**
  - `components/sections/MechanismSection.tsx`
  - `components/venom/opus47-premium.css`
- **Fix approach:** lengthen the scrub end (`bottom 40%` instead of
  `60%`), increase the active ring contrast (acid border + slight
  bg lift), add a 240 ms transition so the step reads as a deliberate
  highlight rather than a flicker.

### P1-4 Roadmap timeline has no visible thread / spine

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-roadmap.png`. Six TimelineSteps stacked
  vertically with sprint labels (D1–D7 etc.). Visual rhythm is
  acceptable, but there's no vertical spine connecting the steps —
  the eye reads them as independent cards.
- **Affected files:**
  - `components/venom/TimelineStep.tsx`
  - `components/venom/opus47-premium.css`
- **Fix approach:** add a thin acid spine on the index column that
  connects through the stack with a 1-px gradient line, no JS.

### P1-5 Proof grid card hover lacks signal

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-proof.png`. The cards already have an
  acid border on hover/active, but no caption micro-shift, no clear
  affordance the card opens an inspector.
- **Affected files:**
  - `components/sections/ProofSection.tsx`
  - `components/venom/opus47-premium.css`
- **Fix approach:** add a "Inspect" hint chip in the bottom-right corner
  on hover (CSS only, opacity 0 → 1 + small slide), unlocked under
  reduced motion as a static visible chip.

### P1-6 Final CTA panel does not stand out enough as a decision moment

- **Route:** `/`
- **Viewport:** desktop / mobile
- **Evidence:** `baseline/d1440-final-cta.png`,
  `baseline/m390-final-cta.png`. The panel uses
  `.surface-acid-emissive`, but on the long page the eye reads it as
  another bento card rather than the conversion finale. There's no
  ambient energy difference.
- **Affected files:**
  - `components/sections/FinalCtaSection.tsx`
  - `components/venom/opus47-premium.css` (`#final-cta`,
    `.vx-final-panel`)
- **Fix approach:** add a section-scoped halo (`#final-cta::before`),
  a tighter inner border with acid emissive glow at the panel edges,
  and lift the headline to a single line on desktop.

### P1-7 Click-for-sound overlay reads as a flat gray modal

- **Route:** `/` (when autoplay-with-sound is blocked)
- **Viewport:** all
- **Evidence:** the existing `.wistia-sound-overlay` has a yellow-tinted
  backdrop and an acid icon. It works but is generic.
- **Affected files:**
  - `components/venom/opus47-premium.css`
  - `components/cinematic/WistiaPlayer.tsx`
- **Fix approach:** add a thin pulsing ring around the play icon (CSS
  keyframes, reduced-motion-safe), tighten the backdrop blur, and
  print a smaller secondary line ("Founder VSL · 1080p"), so the
  overlay feels like a deliberate "tap to enter" panel.

### P1-8 Sticky mobile CTA bar is functional but looks flat

- **Route:** `/`
- **Viewport:** mobile
- **Evidence:** `baseline/m390-mid-scroll.png`. The bar uses a CtaLink
  with white-on-dark, but the visual surface is a basic dark band with
  no top hairline and no surface depth.
- **Affected files:**
  - `components/ui/StickyMobileCTA.tsx`
  - `components/venom/opus47-premium.css`
- **Fix approach:** add a 1-px acid hairline on top of the bar, soften
  the inner padding, and apply `surface-frosted` material so it reads
  as a glass shelf rather than a solid block.

### P1-9 ChapterRail has weak active indicator

- **Route:** `/`
- **Viewport:** desktop only (>= 1024 px)
- **Evidence:** the rail appears post-hero on the right, with `01 / 02`
  numbers and section labels. Active state changes border + color but
  is easy to miss while scrolling.
- **Affected files:**
  - `components/effects/ChapterRail.tsx`
  - `components/venom/opus47-premium.css`
- **Fix approach:** add a tiny acid dot prefix on the active item and a
  subtle 6 px bar that grows on the active row. Pure CSS.

### P1-10 Inline ARIA attribute lint warnings (minor a11y)

- **Route:** all
- **Viewport:** all
- **Evidence:** ESLint passes (Exit 0), but the in-editor diagnostics
  flag `aria-pressed="{expression}"` in `WistiaPlayer.tsx` and
  `ProofSection.tsx`, plus inline-style warnings.
- **Affected files:**
  - `components/cinematic/WistiaPlayer.tsx`
  - `components/sections/ProofSection.tsx`
  - `components/sections/FaqSection.tsx`
  - `components/effects/HeroCursorSpotlight.tsx`
- **Fix approach:** the ARIA attribute warnings are a known false
  positive from the in-editor accessibility validator (the runtime
  values are valid booleans). No runtime change needed; ignore. The
  inline-style warnings are out of scope for visual polish (existing
  patterns, working code, low priority); skip unless they conflict
  with a polish change we are already making.

---

## P2 — Smaller / single-viewport refinements

### P2-1 EditorialHeading eyebrow vertical alignment varies between sections

- **Route:** `/`
- **Viewport:** desktop
- **Evidence:** `baseline/d1440-mechanism.png` vs
  `baseline/d1440-roadmap.png`. The `.v2-label` eyebrow has slightly
  different distance from the heading depending on whether the section
  uses `EditorialHeading` directly or inline copy. A 4-6 px inconsistency.
- **Fix approach:** standardize via a single `.v2-section-copy > .v2-label`
  margin rule.

### P2-2 Founder portrait corners feel sharp at small widths

- **Route:** `/`
- **Viewport:** mobile
- **Evidence:** `baseline/m390-mid-scroll.png` (when scrolled to founder).
  The portrait `border-radius` is already set, but the bottom gradient
  vignette reads slightly heavy on small screens, eating into the chin.
- **Fix approach:** soften the gradient stop on `(max-width: 480px)`
  from 44% → 56% so the face area stays bright.

### P2-3 FAQ uses inline-style spring expand; visually OK, lint noise

- **Route:** `/`
- **Viewport:** all
- **Evidence:** the framer-motion AnimatePresence panel uses inline
  `style={{ overflow: "hidden" }}` etc. Functionally fine; reads as
  smooth, but the inline styles create lint warnings. Out of scope for
  visual polish unless we are already touching that file.
- **Fix approach:** leave for now.

### P2-4 No top hairline between hero and Problem section

- **Route:** `/`
- **Viewport:** all
- **Evidence:** `baseline/d1440-fullpage.png`. The hero ends with the
  signal hairline (`.v2-hero--vsl-first::after`), and Problem opens
  with the section sheen. There is no hard divider — but the spacing
  between them (~250 px on 1440) feels like dead space.
- **Fix approach:** addressed by P0-1 (tighten hero padding-bottom).

### P2-5 Apply / Schedule / Confirmation routes are visually clean

- **Route:** `/apply`, `/schedule`, `/confirmation`
- **Viewport:** all
- **Evidence:** `baseline/apply-desktop.png`,
  `baseline/schedule-desktop.png`, `baseline/confirmation-desktop.png`.
  Form pages are dense but readable; confirmation has the
  bg446wfhed Wistia video plus next-step copy. No visible regressions.
- **Fix approach:** No changes planned in this hotfix beyond what
  bleeds in from global tokens.

---

## Build / Health checks (already green)

- `npx tsc --noEmit` → exit 0
- `npm run lint` → exit 0
- `npm run dev` → ready in 1752 ms; no runtime errors in console
- Wistia player loads without `<console.error>`; poster fallback works
- No horizontal page scroll (`overflow-x: clip` on html/body); the
  4 elements that overflow are intentional decorative atmosphere
  (HeroScene canvas, lusion atmosphere) clipped by ancestors

---

## What MUST NOT be touched

- Wistia media IDs (`0z2r9j4jnz`, `bg446wfhed`)
- VSL-first funnel direction (no removing the dominant frame)
- Stack: Next 15.5.18 + React 18 + Tailwind 3.x + GSAP 3.15 + Lenis
- Backend / routing / API / form logic
- Copy content (no rewrites; only fix layout-breaking content if any)
- Brand palette (no new colors; only existing tokens
  `--opus-acid`, `--opus-bone`, `--opus-warm-silver`, etc.)
- The proof Wistia / Higgsfield frame manifests
- Curriculum / FAQ / proof copy
