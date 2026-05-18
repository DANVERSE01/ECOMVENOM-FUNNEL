# ECOMVENOM — Fix & Elevation Plan

Concrete plan to execute on `hotfix/final-production-polish-vsl-funnel`.
All changes prefer editing existing components / CSS over new
abstractions.

---

## Prioritized issue list

1. **P0-1** Hero first-fold: tighten VSL width + hero padding so VSL
   + headline + CTAs fit on 1366×768 and 1440×900.
2. **P0-3** Status rail with numbered indices (`01 / 02 / 03`).
3. **P0-2** Hero support cluster: add eyebrow, tighten typography,
   differentiate primary/secondary CTAs.
4. **P0-4** In-frame VSL slate caption.
5. **P1-7** Click-for-sound overlay: pulse ring + secondary line.
6. **P1-2** ScrollFilm → Mechanism gradient handoff.
7. **P1-3** Mechanism active step ring tuning.
8. **P1-4** Roadmap timeline spine.
9. **P1-5** Proof card hover "Inspect" chip.
10. **P1-6** Final CTA halo + tighter inner edge.
11. **P1-8** Sticky mobile CTA hairline + frosted surface.
12. **P1-9** ChapterRail active dot + bar.
13. **P1-1** Section padding tier (tight vs wide).
14. **P2-1**, **P2-2** small consistency fixes only if they fall in
    the path of the above.

---

## What MUST NOT be touched

- Wistia media IDs `0z2r9j4jnz` (hero) and `bg446wfhed` (confirmation).
- Hero VSL aspect ratio (16:9) and autoplay/sound semantics.
- Stack: Next 15.5.18, React 18, Tailwind 3.x, GSAP 3.15, Lenis.
- Backend / form logic / routing / metadata.
- Brand palette: only existing tokens in
  `tokens.css` / `opus47-premium.css`.
- Copy strings (no rewrites; if a fix requires a tweak it is
  reported in this document).
- The cinematic ScrollFilm pin behaviour, monitor frame, and frame
  manifest.
- ChapterRail visibility logic (only its visual treatment changes).
- StickyMobileCTA visibility logic.
- Proof inspector dialog logic and bg446wfhed.
- The VSL-first hero structure (status rail → VSL → support cluster).

---

## Implementation steps (ordered)

### Step 1 — Hero geometry fix (P0-1, P0-2, P0-3, P0-4)

**Files:**
- `components/sections/HeroSection.tsx`
- `components/venom/VslStage.tsx`
- `components/venom/opus47-premium.css`

**Changes:**
1. In `opus47-premium.css`, under `.v2-hero--vsl-first` rules:
   - Reduce `padding-top` for `min-width: 1024px` to
     `clamp(4rem, 6.5vw, 5.6rem)`.
   - Reduce `padding-bottom` for desktop to `clamp(1.6rem, 3.5vw, 2.6rem)`.
   - Tighten grid `gap` for desktop to `clamp(0.7rem, 1.4vw, 1.1rem)`.
2. In `.v2-hero__vsl-dominant`, reduce `max-width` from 1080 to
   `min(1040px, 64vw)` so 16:9 height drops from 607 → ~580 px on 1440
   and ~512 px on 1366.
3. Add a numbered, chevron-separated rail variant
   `.v2-hero__status-rail--numbered` with index spans `01 / 02 / 03`
   per pill. Pure CSS, no JS structural change beyond labels.
4. Add `.v2-hero__support-eyebrow` style; render an eyebrow label
   above the headline ("OPERATING BRIEF · 04:11" in EN, equivalent
   in AR). The "04:11" is **not** copy content; it is a visual slate
   marker generic enough not to imply anything specific. If we are
   uncomfortable with that we will use a generic
   "OPERATING BRIEF" only — see fallback below.
5. Differentiate primary vs ghost CTA by giving the ghost a smaller
   variant (`vx-button--small-ghost` class) on desktop only.
6. Add `.v2-hero__vsl-slate` overlay inside the VSL frame — top-left,
   IBM Plex Mono, single line "FOUNDER VSL · ECOMVENOM",
   pointer-events: none, hidden < 480 px width. Sits inside
   `.v2-hero__vsl-dominant > .vx-stage` as a positioned span.

**Fallback for slate text:** if "OPERATING BRIEF · 04:11" feels
fabricated, drop the timestamp and use only "OPERATING BRIEF" /
"ملف التشغيل".

### Step 2 — VSL slate caption (P0-4)

**Files:**
- `components/venom/VslStage.tsx`
- `components/venom/opus47-premium.css`

**Changes:** add a small caption span "FOUNDER VSL · ECOMVENOM"
positioned absolute top-left inside `.vx-vsl`, behind the player at
z-index 1, visible only above the poster fade. Inert (aria-hidden).

### Step 3 — Click-for-sound overlay polish (P1-7)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** add a `wistia-sound-overlay__icon::after` keyframe pulse
ring (`@keyframes vxSoundPulse`), 1.6 s ease-in-out infinite, 60%
opacity. Disabled under `prefers-reduced-motion`. Add a smaller
secondary line "1080p · Founder presentation" inside the overlay
button using a child class. **Note:** because the overlay text comes
from React props (`blockedLabel`), the secondary line is added via
CSS pseudo-element with hard-coded multilingual fallback... actually
better: keep CSS-only and not introduce copy; make the secondary line
a static "FOUNDER VSL · 1080p" caption rendered via CSS
`::before`/`::after` hooked to a data attribute we already control.

Actually simplest path: do **not** add new copy. Just polish the
existing icon ring + tighter blur + crisper label. The premium
upgrade is purely visual, no new strings.

### Step 4 — ScrollFilm → Mechanism handoff (P1-2)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** add a fade-down gradient on `#mechanism::before`'s
container or a new `.v2-scroll-film + #mechanism` adjacent rule. A
120 px tall background gradient from `#010101` to the current
mechanism background.

### Step 5 — Mechanism active step ring (P1-3)

**Files:**
- `components/sections/MechanismSection.tsx` (only ScrollTrigger
  start/end, not structure)
- `components/venom/opus47-premium.css`

**Changes:**
- Increase scrub end from `bottom 60%` to `bottom 30%` so each step
  occupies more scroll length.
- Lift active ring contrast: border `rgba(213, 217, 4, 0.46)`,
  inset `rgba(213, 217, 4, 0.16)`, glow `0 0 36px rgba(213, 217, 4, 0.18)`.

### Step 6 — Roadmap timeline spine (P1-4)

**Files:**
- `components/venom/TimelineStep.tsx` (DOM addition: a single span
  `vx-timeline__spine` if not present)
- `components/venom/opus47-premium.css`

Wait — we should avoid changing TimelineStep DOM. Better: place the
spine as a `::before` on `.vx-timeline-list` (the parent container in
`RoadmapSection.tsx`), positioned absolutely at the index column. Pure
CSS, no DOM change.

### Step 7 — Proof "Inspect" chip (P1-5)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** add `.v2-proof-card::after` chip that shows on hover
(opacity 0 → 1, translate 4px), using existing tokens. On
`(hover: none)` show statically. On `prefers-reduced-motion: reduce`
show statically without transition.

### Step 8 — Final CTA halo (P1-6)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** strengthen `#final-cta::before` halo, tighten the
`.vx-final-panel` inner edge, raise the panel's box-shadow.

### Step 9 — Sticky mobile CTA polish (P1-8)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** add a 1-px acid hairline on top of `.mobile-command-bar`,
apply frosted glass via existing `surface-frosted` material variables
(do not import the class; replicate properties scoped to
`.mobile-command-bar`).

### Step 10 — ChapterRail active indicator (P1-9)

**Files:**
- `components/venom/opus47-premium.css`

**Changes:** add a small acid dot before the active item's strong
label, with a bar that grows from 0 → 6 px on active.

### Step 11 — Section padding tier (P1-1)

**Files:**
- `components/venom/tokens.css`

**Changes:** add `--vo-section-y-tight: clamp(3.6rem, 7vw, 6rem)` and
update `.vx-section--compact` to use it; keep `.vx-section` (default)
and `.vx-section--final` at the wider value.

---

## Performance safeguards

- All additions are pure CSS or single-class JS (no new effects).
- No new GPU-heavy filters or 3D layers.
- No new dependencies.
- Existing `backdrop-filter` blurs are not increased.
- Mobile already strips `backdrop-filter` strength via media queries;
  this remains untouched.
- All new gradients use existing token values, no new image loads.

## Mobile safeguards

- Hero VSL stays first-class, full width on mobile.
- New numbered rail collapses cleanly: `01 02 03` chips wrap if the
  device is < 360 px (already handled by flex-wrap on rail).
- VSL slate caption is hidden under `(max-width: 480px)`.
- Inspect chip is shown statically (no hover) on `(hover: none)`.
- Sticky bar polish is mobile-only.

## Reduced-motion safeguards

- Pulse ring on overlay disabled under `prefers-reduced-motion: reduce`.
- All transitions degrade to opacity-only or none.
- No new scroll-triggered animations introduced.
- All `data-vx-reveal` consumers use the existing reduced-motion path
  in `lib/motion.ts:initScrollReveals()`.

## Wistia safeguards

- `mediaId` literals are not changed.
- No new attributes added to `<wistia-player>`.
- Poster status logic untouched.
- Click-for-sound overlay flow untouched.
- Custom controls untouched.

## Acceptance criteria

- 1440×900: hero VSL + headline + body + primary CTA all visible
  before scroll.
- 1366×768: hero VSL + headline + primary CTA visible before scroll
  (body may sit just below the fold; that is acceptable).
- 1280×900: hero VSL + headline + primary CTA visible before scroll.
- 768×1024 tablet: VSL fits within first ~75% of viewport.
- 430×932 / 390×844 / 360×740: VSL within first 50%, CTA reachable
  on first or second screen.
- AR/RTL: status rail flips, all text legible.
- `prefers-reduced-motion: reduce`: every section visible without
  animation.
- `npx tsc --noEmit` exits 0.
- `npm run lint` exits 0.
- `npm run build` exits 0 with no new warnings beyond the existing
  inline-style soft warnings already accepted.
- No new console errors on `/`, `/apply`, `/schedule`, `/confirmation`.

## QA screenshot checklist

After execution, capture into `audit-production-polish/final-evidence/`:
- Desktop: `d1440-hero.png`, `d1440-problem.png`,
  `d1440-scrollfilm.png`, `d1440-mechanism.png`, `d1440-roadmap.png`,
  `d1440-proof.png`, `d1440-founder.png`, `d1440-offer.png`,
  `d1440-faq.png`, `d1440-final-cta.png`.
- Other desktops: `d1366-hero.png`, `d1280-hero.png`.
- Tablet: `t768-hero.png`.
- Mobile: `m430-hero.png`, `m430-mid-scroll.png`, `m430-final-cta.png`,
  `m390-hero.png`, `m390-mid-scroll.png`, `m390-final-cta.png`,
  `s360-hero.png`.
- Routes: `apply-desktop.png`, `apply-mobile.png`,
  `schedule-desktop.png`, `schedule-mobile.png`,
  `confirmation-desktop.png`, `confirmation-mobile.png`.
- A11y / motion: `ar-rtl-hero.png`, `reduced-motion-hero.png`.
