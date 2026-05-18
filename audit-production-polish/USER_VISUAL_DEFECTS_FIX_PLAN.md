# User Visual Defects — Final Production Polish Plan & Execution

**Branch:** `hotfix/final-production-polish-vsl-funnel`
**Base main commit:** `8bc2ef5`
**Polish layer:** `components/venom/final-production-polish.css`
**Import order in `app/globals.css`:**
1. `tokens.css`
2. `cinematic-v2.css`
3. `opus47-premium.css` (legacy; left build-safe, not used as polish workspace)
4. `final-production-polish.css` (new — final user-defect override layer)

---

## Why opus47-premium.css is not the polish workspace

`opus47-premium.css` is a 1958-line accumulated visual layer that mixes
many legacy phases (Phase 4, 6, 10, 11). Continuing to patch it caused
brittle marker-based edits and regression risk. The decision is to:

- Stabilize `opus47-premium.css` (no syntax errors, build-safe).
- Stop adding overrides to it.
- Place every final user-defect fix inside the new isolated layer
  `final-production-polish.css`.

This keeps the legacy layer auditable while giving us a single, scoped
file to read and reason about for the production polish.

---

## Defects, severity, and fix mapping

### P0-1 — Custom cursor

- **Severity:** P0
- **Route:** all
- **Viewport:** desktop only (component already self-disabled on touch)
- **Root cause:** `<ParticleTrailCursor />` mounted in `app/layout.tsx`,
  rendering a canvas + dot + ring layer at z-index 9999 with mix-blend
  screen.
- **Fix:**
  - `app/layout.tsx`: removed the import and the JSX mount.
  - Deleted `components/cursor/ParticleTrailCursor.tsx`.
  - `final-production-polish.css`:
    - Restores default `cursor: auto` / `cursor: pointer` /
      `cursor: text` semantics across the page.
    - Defensive guard hiding any `canvas[style*="9999"]` if a stale
      cursor layer is ever re-injected.
- **Expected outcome:** normal system cursor, no glow, no trail.
- **Performance:** improved (one canvas + rAF loop removed).
- **Mobile:** unchanged (component was already off on coarse pointer).
- **Reduced-motion:** unchanged.

### P0-2 — Hero VSL clutter

- **Severity:** P0
- **Route:** `/`
- **Viewport:** all
- **Root cause:** decorative status rail (`01 / 02 / 03`), VSL slate
  caption, eyebrow label, "Founder video" StatusPill, custom Wistia
  controls (Play/Pause/Mute pills), proof bullet row — all competed
  with the actual VSL.
- **Fix in components:**
  - `components/sections/HeroSection.tsx`: removed status rail JSX,
    VSL slate JSX, eyebrow JSX. Hero now renders only VSL frame +
    headline + body + two CTAs (primary + ghost "Watch founder video"
    that anchors back to the same VSL).
  - `components/venom/VslStage.tsx`: removed `StatusPill` "Founder
    video" label. Removed the `controls` prop pass-through. Wistia
    component now uses native controls only.
  - `components/cinematic/WistiaPlayer.tsx`: defaults stay; the hero
    no longer asks for `controls`, so the custom control bar (the
    Play/Pause/Mute pill row) is no longer rendered. The
    click-for-sound overlay is the only remaining custom layer and
    only appears when the browser blocks autoplay-with-sound.
- **Fix in CSS:** `final-production-polish.css`:
  - `display: none !important` on `.v2-hero__status-rail*`,
    `.v2-hero__vsl-slate`, `.v2-hero__support-eyebrow`,
    `.v2-hero__proof`, and any leftover `.vx-stage > .vx-pill` inside
    the hero VSL frame.
  - Restrained click-for-sound overlay (no animated pulse ring).
- **Expected outcome:** clean, dominant VSL frame; logo, language
  switcher, primary CTA remain; native Wistia chrome only.
- **Performance:** improved (one custom controls subtree, one
  decorative rail, and one slate removed from DOM/CSS path).
- **Mobile:** lighter (proof bullet row was already a wrap-fest on
  small widths).
- **Reduced-motion:** improved (no pulse ring animation).

### P0-3 — Hero fold composition (1440 / 1366 / 1280 / mobile)

- **Severity:** P0
- **Route:** `/`
- **Viewports:** 1440×900, 1366×768, 1280×900, 768×1024, 430×932,
  390×844, 360×740
- **Root cause:** `cinematic-v2.css` set `.v2-hero__headline` to
  `max-width: 10.6ch`, forcing the headline to ~262 px wide on
  desktop, wrapping to 5 lines and pushing CTA below the fold. VSL
  frame max-width was also too wide on common laptops.
- **Fix in CSS:** `final-production-polish.css`:
  - Per-viewport `max-width` for `.v2-hero__vsl-dominant`:
    - `<= 1023` desktop range / `1024-1279`: 60vw cap up to 760 px
    - `1280-1599`: 56vw cap up to 820 px
    - `1600+`: fixed 940 px
    - `<= 768 mobile`: 100%
    - `max-height: 820px` on desktop: cap at 660 px so support
      cluster lands inside the fold.
  - Override `.v2-hero__support .v2-hero__headline` to
    `max-width: 30ch` (mobile) / `36ch` (>= 1024). This is the key
    fix that breaks the cinematic-v2 narrow-wrap.
  - Reduced hero padding-top / padding-bottom.
- **Verified DOM probes:**
  - 1440×900: hero=900h, VSL=463h, headline at y=561, CTA at y=724–786 fully visible.
  - 1366×768: VSL=363h, CTA at y=606–668 fully visible.
  - 1280×900: VSL=412h, CTA bottom at 726, fully visible.
  - 390×844: VSL stays first-class, no clipping, CTA reachable.
- **Expected outcome:** intentional, balanced fold across all devices.
- **Performance:** unchanged.
- **Mobile:** preserved VSL dominance, full-width frame.
- **Reduced-motion:** unchanged (CSS only).

### P0-4 — Founder section rework

- **Severity:** P0
- **Route:** `/`
- **Viewport:** all
- **Root cause:** `EditorialHeading` + `BentoGrid` inside the founder
  section produced an over-large headline and two random "01/02"
  cards floating below the body. Cards weakened the section.
- **Fix in components:**
  - `components/sections/FounderSection.tsx`: replaced the cards
    layout with a clean editorial 2-column composition. Image left,
    eyebrow + heading + body + quote pull-out right. RTL flips order.
  - Quote becomes the visual close of the section.
- **Fix in CSS:** `final-production-polish.css`:
  - `.vx-founder--editorial` 2-col grid (single col on mobile),
    image min-height clamps reasonable on all viewports.
  - `.vx-founder__title`, `.vx-founder__body`, `.vx-founder__quote`
    rules with controlled scale and a left acid hairline on the
    quote for editorial weight.
- **Copy:** preserved exactly (`recoveryCopy.{en,ar}.founder`); no
  fabricated claims.
- **Expected outcome:** premium editorial founder section that
  reads like an art-directed magazine spread.
- **Performance:** unchanged.
- **Mobile:** stacks gracefully, image first.
- **Reduced-motion:** unchanged.

### P0-5 — FAQ expand/collapse

- **Severity:** P0
- **Route:** `/`
- **Viewport:** all
- **Root cause:** the previous FAQ used per-item `useState` so every
  card's open state was local; in practice the visual treatment with
  inline styles + framer-motion height animation looked broken
  ("answers do not reveal properly"). aria-expanded attribute was
  also flagged as a static-validator warning.
- **Fix in components:**
  - `components/sections/FaqSection.tsx`: rewrote as a controlled
    accordion with `openIndex` state. One-at-a-time behavior. Each
    item exposes a button trigger with `aria-expanded`,
    `aria-controls`, `id`. Panel uses
    `framer-motion AnimatePresence` for smooth height + opacity
    reveal. Plus icon rotates 45deg to a cross when open.
  - Replaced inline `style={{ ... }}` with proper class names
    `vx-faq-item`, `vx-faq-item__trigger`, `vx-faq-item__icon`,
    `vx-faq-item__panel`, `vx-faq-item__answer`.
- **Fix in CSS:** `final-production-polish.css`:
  - Full styling for the new classes (panel, button, icon, answer).
  - `:has(button[aria-expanded="true"])` highlights the open card.
  - Reduced-motion disables the icon rotation transition.
- **Expected outcome:** clean, accessible accordion with visible
  answers, premium styling.
- **Verified:** clicking item 2 closes item 0 (one-at-a-time);
  panel becomes visible (height: 41 px on desktop with answer text).
- **Performance:** unchanged.
- **Mobile:** controls are full-width, easy to tap.
- **Reduced-motion:** icon transition disabled; panel still expands
  via AnimatePresence (height-only, accessible).

### P0-6 — Final CTA rework

- **Severity:** P0
- **Route:** `/`
- **Viewport:** all
- **Root cause:** the previous final CTA used `surface-acid-emissive`
  on a `GlassPanel` with `min-height: clamp(30rem, 50vw, 40rem)`,
  producing a giant rectangle with the headline plus a small button —
  the bottom half of the panel was dead space.
- **Fix in components:**
  - `components/sections/FinalCtaSection.tsx`: replaced the
    `GlassPanel` + `EditorialHeading` + `min-height` block with a
    `vx-final-cta__content` panel sized by content only. Adds the
    label + headline + body + single primary CTA. Removed the
    `surface-acid-emissive` over-saturated treatment.
- **Fix in CSS:** `final-production-polish.css`:
  - `.vx-final-cta` centers a content-sized card inside the section.
  - `.vx-final-cta__content` uses smoked-glass material (matches the
    rest of the funnel), inner acid hairline at top, restrained halo
    behind, premium shadow stack.
  - Section wraps the panel in a soft acid + amber halo; the door
    hairline above is preserved by the existing `data-door` JSX path
    in `FinalCtaSection`.
- **Expected outcome:** premium, intentional close panel — content-
  sized, no dead rectangle.
- **Performance:** unchanged.
- **Mobile:** padding tightens on `<= 480 px`; CTA is full-width.
- **Reduced-motion:** unchanged (no new animation introduced).

### P0-7 — Heavy background

- **Severity:** P0
- **Route:** all
- **Viewport:** all
- **Root cause:** three background layers stacked:
  1. `app/globals.css` `.ev-unified-canvas::before` 96 px grid
     overlay.
  2. `app/globals.css` `.ev-unified-canvas::after` 3 px dot pattern.
  3. `cinematic-v2.css` `.venom-home::before` (96 px grid) and
     `.venom-home::after` (3 px dot).
  Combined, these read as cheap noise.
- **Fix in CSS:** `final-production-polish.css`:
  - `display: none !important` on
    `.ev-unified-canvas::before / ::after` and
    `.venom-home::before / ::after`.
  - Replaced `.ev-unified-canvas` background with a single restrained
    OLED graphite gradient: one acid pivot at top, one warm amber
    pivot mid-right, on `#050505`.
  - Mobile background uses an even lighter version (one pivot only).
  - Toned down per-section atmospheric pseudo-glows
    (`#problem::after` etc.) to `opacity: 0.55`.
  - Disabled the animated `vxSectionSheen` on `.vx-section--compact`
    (set static line at very low opacity). This was a continuously
    animating background-position bar; runtime cost removed.
- **Expected outcome:** premium OLED graphite plate, no grid, no
  dots, no animation. Mobile lighter than desktop.
- **Performance:** improved (4 large repeating background images
  removed; 1 infinite background-position animation killed).
- **Mobile:** lighter than desktop by design.
- **Reduced-motion:** unchanged (the animation kill applies for all
  modes; it was the same wherever).

### P0-8 — Section transitions / handoffs

- **Severity:** P1 (was P0 in user list, executed as polish)
- **Route:** `/`
- **Viewport:** all
- **Root cause:** sections stacked with no perceived bridge between
  them; the eye reads as a list, not a sequence.
- **Fix in CSS:** `final-production-polish.css`:
  - `#problem::before`, `#mechanism::before`, `#proof::before`,
    `#offer::before`, `#final-cta::before`: 28–56 px tall fade from
    near-black to transparent at the top of each section. Provides a
    soft visual bridge.
  - Hero closing hairline becomes a 220 px-wide centred acid line
    (replaces the previous 1-px vertical), reading as a directed cue.
  - All bridges are static gradients — no animation, no JS, no
    pinning. Reduced-motion sees identical output.
- **Expected outcome:** intentional handoffs hero → problem,
  problem → mechanism (after the cinematic ScrollFilm), founder →
  offer, FAQ → final CTA.
- **Performance:** trivial (5 static gradients).
- **Mobile:** same gradients, same behavior.
- **Reduced-motion:** identical (no motion).

### P0-9 — Full-funnel polish

- **Severity:** P1
- **Route:** `/`
- **Viewport:** all
- **Items addressed:**
  - ChapterRail hidden under `< 1200 px` (was already display logic
    flickered, now CSS-guaranteed).
  - Reduced-motion now also forces every `[data-vx-reveal]` to be
    visible immediately, guarding any future motion path.
  - Section padding and rhythm preserved by the existing
    `.vx-section--compact` rules; the polish layer doesn't override
    them further.

---

## What was intentionally not touched

- Wistia media IDs (`0z2r9j4jnz`, `bg446wfhed`).
- Any backend / route / form / data logic.
- The cinematic ScrollFilm pin and frame manifest.
- The proof inspector dialog logic.
- Curriculum / FAQ / proof / founder copy strings (`recoveryCopy`).
- The brand palette (only existing `--opus-*`, `--vo-*`, `--c-*`
  tokens).
- The cinematic-v2.css and tokens.css legacy rules
  (overridden where needed in the new layer).
- The opus47-premium.css legacy rules (kept for compatibility,
  superseded only where the new layer specifically needs to).

---

## References used

- **Superdesign:** principles only — clean command-frame composition,
  premium editorial section rhythm, restrained chrome around media.
  Nothing copied 1:1.
- **shadcn/ui:** accessibility patterns confirmed (aria-expanded,
  aria-controls, focus-visible). No components imported.
- **Magic UI:** controlled accordion icon rotation idea applied to
  the FAQ plus icon.
- **Motion Primitives:** the section-bridge gradient pattern is
  inspired by their cross-section transition idea, but rendered as
  static CSS — no Motion runtime added.
- **React Bits:** rejected — no wow-effect added; runtime cost is
  the priority here.
- **Uiverse:** rejected for this iteration — no microinteractions
  copied.

---

## Files changed

### Components
- `app/layout.tsx` (cursor removal)
- `app/globals.css` (added final-production-polish.css import)
- `components/cursor/ParticleTrailCursor.tsx` (deleted)
- `components/sections/HeroSection.tsx` (cleaned)
- `components/venom/VslStage.tsx` (cleaned)
- `components/sections/FaqSection.tsx` (rewritten accordion)
- `components/sections/FounderSection.tsx` (editorial layout)
- `components/sections/FinalCtaSection.tsx` (premium close panel)
- `components/sections/MechanismSection.tsx` (scrub end tightened
  during the prior pass — preserved)

### CSS layers
- `components/venom/opus47-premium.css` (preserved as legacy; not
  used as final polish workspace; build-safe)
- `components/venom/final-production-polish.css` (new — single
  source of truth for the user-defect fixes)
