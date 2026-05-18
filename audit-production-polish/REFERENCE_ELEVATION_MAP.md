# ECOMVENOM — Reference Elevation Map

How each external reference informs the polish pass. Nothing is copied
1:1; only ideas are extracted.

---

## 1. Superdesign (`https://app.superdesign.dev/`)

### Selected
- **Section pacing principle:** dense data sections feel calmer when
  the eyebrow + headline + body + CTA cluster is tightened to one
  vertical rhythm with a single divider line above. Applies to
  Hero support cluster (P0-2).
- **First-fold "command frame" idea:** dominant media + tight 3-line
  status rail above + small eyebrow caption. Already mostly present
  in our hero; refine into a more deliberate slate.

### Rejected
- Their gradient mesh / blur backgrounds — off-brand for our
  toxic-graphite OLED look.
- Floating sticker badges and bright CTA gradients — not premium.
- Their typography colour stops — we keep bone/acid only.

---

## 2. shadcn/ui

### Selected
- Accessibility patterns: `aria-pressed`, `aria-expanded`, focus rings
  via `:focus-visible`, dialog open-close semantics. Already present;
  audit confirms they are used correctly.
- Tooltip / chip primitive structure for the Mechanism active step
  ring — no new dep, just CSS proportions.

### Rejected
- shadcn default neutral palette and component visual language —
  generic SaaS aesthetic.
- shadcn-style command bars / sheets — not appropriate for this funnel.
- Don't import any shadcn components; we keep our `components/venom/*`
  primitives.

---

## 3. Magic UI

### Selected
- **Number + label "stat slate" idea** for the funnel status rail
  (P0-3) — apply numbered indices `01 / 02 / 03` with a chevron
  separator and an active acid background tint. Pure CSS adaptation,
  no animation primitives copied.
- **Reveal-on-scroll choreography:** their staggered word reveal lines
  up with our `splitText` pattern; no change needed but confirms the
  approach is correct.

### Rejected
- Animated borders, shimmer cards, shiny gradient text — we already
  have a measured acid sheen; layering more noise weakens it.
- Their "marquee" component — does not serve any narrative beat.
- Sparkle / particle backgrounds — already too much going on with
  HeroScene; do not stack more particles.

---

## 4. Motion Primitives

### Selected
- **Section-to-section transition primitive:** a short fade-down
  gradient (~120 px) between two sections eases the visual handoff
  without adding motion. Applied to ScrollFilm → Mechanism (P1-2).
- **Cross-fade reveal timing:** confirms our 0.6 s ease-out for
  staggered reveals is appropriate; no change.

### Rejected
- Their parallax-image-tilt component — risks layout jank on mobile.
- Their masked headline reveal that depends on Framer's MotionValue;
  we already have the equivalent via GSAP SplitText.
- Page-flip transitions — incompatible with Lenis smooth scroll.

---

## 5. React Bits

### Selected
- **Glow ring around primary action**: an idle pulse ring around the
  click-for-sound icon (P1-7). Applied as CSS-only `@keyframes`
  with reduced-motion override. Desktop-only on hover; on mobile
  show as static.
- **Icon-button micro-bounce (≤ 80 ms, ≤ 4 px)** on hover for the
  Wistia controls. Already implemented via Framer Motion `whileHover`
  on `GlowButton`; confirm it is not amplified.

### Rejected
- WebGL / Three.js shader effects — already heavy with HeroScene; no
  more 3D additions allowed by directive.
- Mouse-trail confetti — explicitly off-brand.
- Lottie hero animations — would compete with the VSL.

---

## 6. Uiverse

### Selected
- **Subtle inspector hint chip** in proof card hover (P1-5) — a
  small bottom-right chip ("Inspect") that fades in on hover. Built
  from scratch in CSS using existing tokens.
- **Vertical timeline spine pattern** — a 1-px gradient line through
  index column for Roadmap (P1-4). Inspired by their timeline
  microinteractions but built without their CSS.

### Rejected
- Anything with neon outline pulses, gamer aesthetics, or bouncy
  spring buttons — explicitly off-brand.
- Snake-themed motifs — reject by directive.
- Glassmorphism toy buttons — already have a controlled glass system.

---

## Per-idea selection summary

| Idea | Source pattern | Applies to | Files | Performance | Mobile | Reduced-motion |
|---|---|---|---|---|---|---|
| Numbered status rail | Magic UI stat slate | Hero rail (P0-3) | `HeroSection.tsx`, `opus47-premium.css` | Pure CSS | Stays compact, single line on small | Static, no anim |
| Tighter VSL frame width | Superdesign command frame | Hero VSL (P0-1) | `opus47-premium.css` | None (CSS clamp) | No change (already capped) | N/A |
| Eyebrow + tighter support | Superdesign rhythm | Hero copy (P0-2) | `HeroSection.tsx`, `opus47-premium.css` | None | Reflow handled | N/A |
| In-frame VSL slate caption | Superdesign | VslStage (P0-4) | `VslStage.tsx`, `opus47-premium.css` | Pure CSS | Hidden < 480 px | Static |
| Section gradient handoff | Motion Primitives | ScrollFilm → Mechanism (P1-2) | `opus47-premium.css` | Single gradient layer | No mobile change | Visible (no anim) |
| Mechanism active ring | shadcn focus pattern + Magic UI | Mechanism (P1-3) | `MechanismSection.tsx`, `opus47-premium.css` | One transition | Same | Static visible |
| Roadmap spine | Uiverse timeline | Roadmap (P1-4) | `TimelineStep.tsx`, `opus47-premium.css` | Pure CSS | Auto-shorter on mobile | Static |
| Proof inspect chip | Uiverse hover hint | Proof (P1-5) | `opus47-premium.css` | Pure CSS hover | Visible static on touch | Static visible |
| Final CTA halo | Magic UI emphasis | Final (P1-6) | `opus47-premium.css` | Single ::before | Lighter on mobile | Static |
| Pulsing play ring | React Bits glow ring | Wistia overlay (P1-7) | `opus47-premium.css` | One @keyframes | Hidden on overlay-already-tap | Disabled |
| Mobile CTA hairline + glass | Superdesign | StickyMobileCTA (P1-8) | `opus47-premium.css` | None | Mobile only | N/A |
| Chapter rail acid dot | Magic UI | ChapterRail (P1-9) | `opus47-premium.css` | None | Hidden on mobile already | N/A |
| Section padding tier | Motion Primitives | Section rhythm (P1-1) | `tokens.css` | None | Same proportion | N/A |

All ideas selected:
- introduce no new dependencies
- introduce no new colours (only existing `--opus-*` tokens)
- introduce no new heavy runtime effects
- degrade safely under `prefers-reduced-motion: reduce`
- preserve VSL-first dominance and the brand DNA

