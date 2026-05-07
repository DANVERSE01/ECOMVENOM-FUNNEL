# ECOMVENOM FUNNEL — FINAL MASTER PHASE 2 IMPLEMENTATION PLAN

**Source:** Claude Opus 4.6 planning session — May 2026
**Status:** Authoritative master plan. Read together with `ECOMVENOM_PHASE2_PLAN_ADDENDUM.md`.
**Project root:** `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE`

> ⚠️ **READ THE ADDENDUM FIRST.** If addendum conflicts with this master plan, addendum wins.

---

## 1. Executive Final Verdict

**Technical Status:** Last-known-good PASS from prior Codex evidence (commit `1988116`). Current planning session: UNVERIFIED. Implementation agent must rerun preflight before editing.

**Creative Status:** NOT SHIPPABLE as-is. The funnel reads as a competent developer prototype, not an award-level premium conversion funnel. Typography is generic, the CTA system is functional but not visually commanding, scene labels read as debug UI, video architecture is patched rather than designed, and the color system lacks the material depth needed to sell "premium operating system."

**Phase 2 Decision:** PROCEED. Technical base is solid. Phase 2 is a premium visual-system replacement over working infrastructure, not a rebuild from scratch.

**Final Direction:** Premium cinematic ECOMVENOM conversion funnel. Dark commerce operating system. Founder-led high-trust application funnel. Controlled venom/steel/gold material palette. Conversion-first cinematic scroll.

**Forbidden:** No WACUS. No fabricated proof/testimonials/metrics. No heavy WebGL/Three.js. No paid services. No new dependencies unless justified. No content language changes (English only). No deployment.

---

## 2. Evidence and Source Control

**Files Inspected:**

- `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`
- `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/apply/page.tsx`, `app/schedule/page.tsx`, `app/confirmation/page.tsx`
- `lib/content.ts`, `lib/frameManifest.ts`, `lib/mediaOptimization.ts`, `lib/gsap.ts`, `lib/lenis.ts`, `lib/motionConfig.ts`, `lib/useReducedMotion.ts`, `lib/cn.ts`
- `components/nav.tsx`, `components/footer.tsx`
- `components/ui/button.tsx`, `Preloader.tsx`, `ScrollProgressIndicator.tsx`, `container.tsx`, `reveal.tsx`, `section-eyebrow.tsx`, `Hairline.tsx`
- All 9 scene files: `Scene00ColdOpen.tsx` through `Scene08FinalCTA.tsx`
- `components/cinematic/*` — `ScrollFilmScene.tsx`, `ShotLabel.tsx`, `CinematicLoopVideo.tsx`, `CinematicFramePlayer.tsx`, `FrameScrubCanvas.tsx`, `SceneProgress.tsx`, `SystemOverlay.tsx`, `SceneHairline.tsx`, `ReducedMotionFallback.tsx`
- `components/apply/application-form.tsx`
- `components/cursor/ParticleTrailCursor.tsx`
- `hooks/useMagnetic.ts`
- Asset directories: `public/frames/higgsfield-system/` (74 frames), `public/stills/` (8 files), `public/generated/` (6 files), `public/media/` (6 mp4s), `public/brand/` (3 files), `public/brand-visuals/` (20 PNGs), `public/posters/` (3 files), `public/founder/` (1 file)
- `.audit/lusion-tunnel-package/` (WebGL Astro bundle, ~40 assets)

**Shell Verification:** UNVERIFIED in this planning session. Implementation agent must rerun.

**Valid QA Source:** `http://localhost:3012`.

**WACUS Exclusion:** All `wacus-*.png` screenshots in project root are contaminated artifacts. Zero evidentiary weight.

**Previous Artifacts Reviewed:**
- `ECOMVENOM_CTO_AUDIT_INSTRUCTION.md` — Codex original audit instruction
- `ECOMVENOM_PHASE1_SANITIZE_AND_CORRECT_PLAN.md` — Sanitization correcting WACUS contamination
- `ECOMVENOM_CLAUDE_OPUS_PHASE2_PLANNING_INSTRUCTION.md` — Sonnet-era planning continuation

---

## 3. Codex Audit Review

**Useful Findings to Keep:**

- Build/typecheck pass confirmed in prior session (commit `1988116`)
- `localhost:3011` was stale, `localhost:3012` is valid
- LUSION package is Astro-exported WebGL with `.buf` models — NOT directly importable into React/Next.js
- Frame sequence (74 WebP frames, 1440x810, ~2.7MB total) is well-optimized
- Media inventory accurately cataloged
- Core visual weakness: funnel reads as "developer prototype, not premium product"

**Mistakes to Discard:**

- All WACUS benchmark comparisons, screenshots, "WACUS-grade" language
- Recommendation to match specific WACUS scroll behaviors

**Contaminated Artifacts:** `wacus-*.png` (28+ files), `wacus-home-text-map.json` — excluded.

**Still Needs Verification:**

- Actual file sizes of `brand-visuals/` PNGs (20 files, likely unoptimized)
- Whether `public/media/*.mp4` files are appropriately compressed
- Whether video poster frames match current video content
- **Hero VSL asset validity** (see addendum §2)

---

## 4. Claude Sonnet Plan Review

**Strong Recommendations to Keep:**

- Full typography system replacement is mandatory
- CTA system needs complete redesign
- Scene labels must move away from debug-UI aesthetic
- Video architecture needs proper reusable component system
- LUSION as visual reference only, no WebGL import
- Color system needs steel `#6EA6B8` and warm/gold `#E3B46F` as controlled secondary accents

**Weak Recommendations Revised:**

- Sonnet plan was too conservative on typography — exact type scales added below
- Lacked specificity on scene-by-scene redesign targets — added in §16
- Missing file-by-file change map — added in §18
- Suggested too many components without priority ordering — fixed in §14

**Missing Components Added:**

- Sticky mobile CTA specification
- Footer redesign
- Form validation UX upgrade
- Confirmation page video architecture
- Detailed motion timing constants

---

## 5. Final Creative Direction

**PREMIUM CINEMATIC ECOMVENOM CONVERSION FUNNEL**
**DARK COMMERCE OPERATING SYSTEM**
**FOUNDER-LED HIGH-TRUST APPLICATION FUNNEL**
**CONTROLLED VENOM / STEEL / GOLD MATERIAL PALETTE**
**CONVERSION-FIRST CINEMATIC SCROLL**

**Visual personality:** Restrained luxury meets operational precision. The funnel feels like a premium commerce control panel — dark, structured, purposeful — not a flashy landing page. Every element serves conversion or trust-building. The visual system communicates "this is a serious business system" through material restraint, not decoration.

---

## 6. Final Typography System

### Font Selection

| Role | Font | Weight | Why |
|---|---|---|---|
| Display | **Syne** | 700, 800 | Geometric display face with sharp personality. Free via `next/font/google`. Multiple weights enable hierarchy. Distinctive in dropshipping space. |
| Heading | **Space Grotesk** (keep) | 500, 700 | Already in project. Excellent geometric sans for secondary headings and UI. |
| Body | **Inter** | 400, 500 | Replaces Plus Jakarta Sans. Professionally neutral, superior at small sizes, industry standard for premium dark interfaces. |
| Mono | **JetBrains Mono** | 400, 500 | Replaces IBM Plex Mono. Tighter, more technical aesthetic. Better at 10–11px. |

### Import Strategy

```ts
// app/layout.tsx
import { Inter, Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
```

- Syne: `display: "swap"`, weights `[700, 800]`
- Inter: `display: "optional"`, weights `[400, 500]`
- Space Grotesk: keep existing
- JetBrains Mono: `display: "swap"`, weights `[400, 500]`

### Token Names

```css
--font-display: 'Syne', Impact, system-ui;
--font-heading: 'Space Grotesk', system-ui;
--font-sans: 'Inter', system-ui;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Type Scale (clamp-based)

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--text-display` | 3.4rem | 9.5rem | Scene hero headlines |
| `--text-hero` | 3rem | 7.8rem | Page-level h1 |
| `--text-section` | 2.6rem | 6rem | Section headings |
| `--text-sub` | 1.75rem | 3rem | Sub-headlines |
| `--text-lg` | 1.125rem | 1.25rem | Large body |
| `--text-base` | 1rem | 1rem | Body |
| `--text-sm` | 0.875rem | 0.875rem | Secondary text |
| `--text-xs` | 0.75rem | 0.75rem | Labels, UI |
| `--text-mono-ui` | 10px | 11px | System labels, HUD |

### Line-Height Scale

| Use | Value |
|---|---|
| Display | 0.88–0.94 |
| Heading | 1.0–1.1 |
| Body | 1.6–1.7 |
| Mono/UI | 1.4 |

### Letter-Spacing

| Use | Value |
|---|---|
| Display uppercase | -0.02em to 0em |
| Heading | -0.01em |
| Body | 0em |
| Caps labels | 0.14em–0.22em |
| Mono UI | 0.16em–0.22em |

### Files to Change

`app/layout.tsx` · `tailwind.config.ts` · `app/globals.css` · all scene components (inherit via class changes)

### QA Criteria

No FOUT on first load · display font ≥700 weight · no layout shift from font swap · mono readable at 10px · body max-width ~70ch.

---

## 7. Final Color and Material System

### Hex Palette

| Token | Hex | Use |
|---|---|---|
| `--c-ink` | `#050506` | Deepest background |
| `--c-ink-2` | `#0A0A0D` | Page-level background |
| `--c-ink-3` | `#111116` | Raised surface |
| `--c-ink-4` | `#1A1A22` | Card surface |
| `--c-ink-5` | `#242430` | Elevated surface |
| `--c-bone` | `#E6E7EA` | Primary text |
| `--c-ash` | `#A1A1A8` | Secondary text |
| `--c-ash-2` | `#6B6B75` | Tertiary text |
| `--c-ash-3` | `#3D3D47` | Disabled/ghost text |
| `--c-venom` | `#B8FF2E` | Primary accent, CTA |
| `--c-venom-2` | `#8FEA00` | Venom hover/active |
| `--c-venom-3` | `#CCFF66` | Venom highlight |
| `--c-steel` | `#6EA6B8` | Secondary accent — trust, info |
| `--c-steel-2` | `#4D8A9E` | Steel dark |
| `--c-gold` | `#E3B46F` | Tertiary accent — premium, value |
| `--c-gold-2` | `#C99A52` | Gold dark |
| `--c-alert` | `#FF3344` | Error, urgency |

### Semantic Tokens

```css
--c-venom-glow: rgba(184,255,46,0.08);
--c-venom-dim: rgba(184,255,46,0.15);
--c-steel-glow: rgba(110,166,184,0.08);
--c-steel-dim: rgba(110,166,184,0.12);
--c-gold-glow: rgba(227,180,111,0.06);
--c-gold-dim: rgba(227,180,111,0.10);
--c-border: rgba(230,231,234,0.08);
--c-border-hover: rgba(230,231,234,0.16);
--c-border-venom: rgba(184,255,46,0.2);
--c-border-steel: rgba(110,166,184,0.18);
```

### Material Rules

- **Venom (`#B8FF2E`)** — Primary action ONLY. CTAs, active states, primary progress. Never used as background fill on large areas. Glow radius ≤60px. Box-shadow max opacity 0.3.
- **Steel (`#6EA6B8`)** — Trust, information, secondary system elements. Info badges, secondary borders, testimonial frames, step indicators, schedule UI. Never competes with venom for CTA attention.
- **Gold (`#E3B46F`)** — Premium/value communication. Graduation gift accents, "exclusive" badges, founder section accent. Extremely restrained — max 2–3 elements per viewport.

**Glow rules:** Glow radiates from small sources only. Never larger than 80px blur. Never applied to text directly. Always rgba() with max 0.3 opacity.

**Borders:** Default `rgba(255,255,255,0.08)`. Hover `rgba(255,255,255,0.16)`. Active/venom `rgba(184,255,46,0.35)`.

**Gradients:** Always dark-to-transparent or accent-to-transparent. Never two vivid colors adjacent. Scene backgrounds use radial gradients from center, opacity 0.06–0.12.

**Glass:** `backdrop-blur-xl` (24px) + `bg-black/55` + `border border-white/[0.06]`.

**Metal:** Subtle gradient on borders (brighter top-left to darker bottom-right), 1px inner highlight `inset 0 1px 0 rgba(255,255,255,0.04)`.

**Grain:** Keep existing `body::before` grain at 0.032 opacity. Do not increase.

### Files to Change

`app/globals.css` · `tailwind.config.ts`

---

## 8. Final CTA / Button System

### Primary CTA (`.btn-primary` / `CtaLink` / `CtaButton`)

- Background: `--c-venom`
- Text: `--c-ink`, font-heading weight 700
- Min-height: 52px (48px mobile)
- Padding: `1rem 1.75rem`
- Border-radius: 6px
- Box-shadow: `0 8px 32px rgba(184,255,46,0.22)`
- Hover: bg shifts to `--c-venom-2`, `translateY(-2px)`, shadow expands, shimmer sweep
- Active: `translateY(0)`, shadow reduces
- Focus-visible: 2px bone outline, 3px offset
- Disabled: opacity 0.5, no pointer-events
- Loading: text → "Submitting…" + venom border pulse

### Secondary CTA (new `.btn-secondary`)

- Background: transparent
- Border: `1px solid --c-venom/45`
- Text: `--c-venom`
- Hover: bg fills with venom, text becomes ink
- Use: "Back" buttons, secondary actions

### Ghost CTA (new `.btn-ghost`)

- Background: transparent
- Border: `1px solid white/10`
- Text: `--c-ash`
- Hover: border `white/25`, text bone
- Use: FAQ toggles, auxiliary links, video overlay "Open file"

### Sticky Mobile CTA (new component)

- `fixed bottom-0`, full-width on mobile (<768px)
- Background: `bg-ink/90 backdrop-blur-xl`
- Contains primary CTA + optional sub-text
- Appears after scrolling past Scene02 (via ScrollTrigger)
- Hides on `/apply`, `/schedule`, `/confirmation`
- z-index: 8000

### Form Submit Button

Uses `CtaButton` with `cinematic-command` class. Loading state: text changes, border pulses.

### Mobile Tap Targets

All interactive elements: min-height 44px, min-width 44px. Already implemented via `.tap-target`.

### Files

`components/ui/button.tsx` · `components/ui/StickyMobileCTA.tsx` (new) · `app/globals.css`

---

## 9. Final Scene Label / Progress System

### Remove Debug UI

Replace all numbered system labels:

| Current | Target |
|---|---|
| `00 SYSTEM BOOT` | `ECOMVENOM` |
| `01 CHAOS INPUT` | `THE PROBLEM` |
| `02 CHAOS TO SYSTEM` | `THE SYSTEM` |
| `03 45-DAY ROADMAP` | `ROADMAP` |
| `04 STORE BUILD` | `THE OFFER` |
| `05 OPERATOR` | `FOUNDER` |
| `06 PROOF GATE` | `RESULTS` |
| `07 APPLICATION FLOW` | `APPLY` |
| `08 BOOK THE CALL` | `START` |

### ShotLabel Redesign

Current: bordered pill with index + scramble label. Feels like debug element.
Target: Minimal eyebrow with venom accent line. Remove border/bg/backdrop-blur.

```html
<div class="flex items-center gap-3">
  <span class="h-px w-6 bg-venom" />
  <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">LABEL</span>
</div>
```

### Nav Scene Pill Labels

Replace numbered labels with human-readable short labels above. Keep scrambleText transition.

### Progress Indicator

- Desktop: vertical right rail (keep)
- Mobile: 2px horizontal bar below nav (add) — venom fill, fixed top below nav

### Reduced-Motion

No scrambleText. Labels appear immediately. Progress bars set to final state.

### Files

`components/cinematic/ShotLabel.tsx` (redesign or rename to `SceneEyebrow.tsx`) · `ScrollFilmScene.tsx` · `nav.tsx` · `ScrollProgressIndicator.tsx` · all 9 scene files

---

## 10. Final Iconography and Micro-UI

### Decision: Inline SVG Only

No icon library. All icons hand-crafted inline SVG or Tailwind pseudo-elements.

### Icon List

| Icon | Location | Current | Target |
|---|---|---|---|
| Play button | Hero VSL | Text "▶" | SVG triangle, 12px, stroke-venom |
| Close | Video overlay | Text "✕" | SVG × mark, 16px |
| Arrow right | CTA | None | Small chevron after label text |
| Check | Form checkbox | Browser default | Custom SVG checkbox with venom fill |
| Expand/collapse | FAQ | Text "+" | SVG plus → × rotation |
| Status dot | Nav | Div with bg | Keep |
| Corner marks | Cinematic frames | CSS borders | Keep |
| Cross marks | Preloader | CSS pseudo | Keep |

### Stroke/Sizing

- Stroke width: 1.5px at 16px size, 1px at 12px
- Always `currentColor` for stroke
- Standard sizes: 12px, 16px, 20px, 24px

### Files

`Scene00ColdOpen.tsx` · `Scene07Application.tsx` · Scene00 video overlay

---

## 11. Final Video Architecture

> ⚠️ **See addendum §2 — Hero VSL must be verified before use. Do NOT assume confirmation videos are correct hero assets.**

### Video Placement Map

| Video | Location | Behavior | Purpose |
|---|---|---|---|
| `confirmation-mobile-muted.mp4` | **REQUIRES VERIFICATION** | — | Possibly wrong asset for hero |
| `confirmation-720x1280.mp4` | **REQUIRES VERIFICATION** | — | Possibly wrong asset for hero |
| `system-loop-01.mp4` | Scene00 background | Autoplay muted loop, ScrollTrigger pause | Ambient atmosphere |
| `system-loop-02.mp4` | UNUSED | — | Available for Scene05 or Scene08 |
| `final-lockup-loop.mp4` | UNUSED | — | Available for Scene08 bg |
| `chaos-system.mp4` | UNUSED | — | Available for Scene02 alt |

### Hero VSL Strategy

**Per addendum §2:** Verify dimensions, aspect ratio, content, duration before referencing in Scene00. If verification fails, ship poster-only `VideoStage` with TODO marker. Never force confirmation videos into hero role.

### Confirmation Video

- Currently no video on `/confirmation`
- Add: autoplay muted loop of `system-loop-02.mp4` as ambient background (20% opacity)
- "Step 1: Watch This Video" should embed founder VSL inline (not overlay)

### Autoplay vs Click-to-Play

- Background ambient loops: autoplay, muted, no controls, `aria-hidden`
- VSL/founder: click-to-play, starts muted, shows controls, allows unmute
- All: `playsInline`, `preload="metadata"` (not "auto" for non-critical)

### Poster Strategy

Every `<video>` must have a poster frame. First meaningful frame, exported as JPEG q80.
Existing posters: `/posters/wistia-poster.jpg`, `confirmation-poster.jpg`, `chaos-system-poster.jpg`

### Mobile Fallback

- Background loops: hidden on mobile (<768px), show poster instead
- VSL preview: keep on mobile (engagement hook)
- Reduced motion: pause all, show poster

### Files

`components/cinematic/CinematicLoopVideo.tsx` (add `preload` prop, mobile hide) · `components/cinematic/VideoStage.tsx` (NEW reusable click-to-play) · `Scene00ColdOpen.tsx` (refactor to use VideoStage) · `components/confirmation/pre-call-steps.tsx` · `app/confirmation/page.tsx`

---

## 12. Final Media and Asset Optimization Plan

> ⚠️ **See addendum §3 — Media optimization is APPROVAL-GATED. Phase 2K splits into 2K-PLAN and 2K-EXEC.**

### Image Strategy

- All existing WebP stills are appropriately formatted
- `public/brand-visuals/` 20 PNGs — convert to WebP q85 (per 2K-PLAN/EXEC)
- `public/founder/youssef-adel.jpg` — convert to WebP, generate responsive sizes (400w, 800w)
- `public/brand/ecomvenom-logo-final.png` — keep as PNG (transparency), optimize with `pngquant`

### WebP/AVIF

- Next.js Image component already configured for AVIF/WebP (`next.config.mjs`)
- Static `/public` assets referenced directly should be manually converted to WebP
- Target: all static images ≤100KB individually

### Video Encoding

- Current MP4s use H.264 — keep
- Target: CRF 23–26 background loops, CRF 20–22 VSL
- Resolution: 1280x720 max for non-hero, 1920x1080 for hero VSL only
- Audio: strip from background loops, keep for VSL

### Frame Sequence

74 frames at 1440x810 WebP, ~37KB average — already well-optimized. No changes.

### Brand Visual Optimization

- 20 PNGs in `/brand-visuals/` referenced by `BRAND_VISUALS` in Scene04
- Appear at `8vw × aspect-video` at 7% opacity as decorative background grid
- Aggressive compression safe: WebP q60, resize to 400px wide
- **REQUIRES approval** — keep originals as `.original-backup`

### Backup Strategy

Before any media optimization: `.original-backup` copy. Never overwrite without backup. Manual approval per batch.

### Visual QA Rules

After compression: side-by-side at 100% zoom. No visible banding in gradients. No visible blocking on faces. No color shift > 2 ΔE.

### Auto-Optimizable

- Brand-visuals PNG→WebP (background decorative, low opacity) — STILL approval-gated per addendum
- Video poster frames (already JPEG, verify q80+)

### Manual-Approval Required

VSL re-encoding · founder portrait · logo · frame sequence (already optimized)

---

## 13. Final LUSION Decision

**Decision: Visual/architecture reference only. No direct implementation.**

**Why:**
1. LUSION is Astro-bundled WebGL with `.buf` model files, custom shaders, astronaut 3D scene — incompatible with current React/Next.js without Three.js integration
2. Three.js NOT in `package.json` — adding it = ~150KB gzipped bundle increase
3. Funnel's conversion goal better served by fast 2D scroll animations than heavy 3D
4. Existing GSAP frame-scrub canvas already delivers "operating system" feel at fraction of weight
5. Astronaut/tunnel aesthetic doesn't match commerce/business operating system direction

**Safe Usage:**
- Study depth-layered parallax → apply to CSS/GSAP layers
- Study screen/tunnel compositional framing → adapt for Scene02
- Study texture/material treatment → inspiration for `.cinematic-frame` styling

**Forbidden:**
- Copying `.buf` model files into production
- Installing Three.js or React Three Fiber
- Importing any LUSION JS runtime code
- Using LUSION textures as production assets

---

## 14. Final Reusable Component Architecture

| # | Component | Path | Purpose |
|---|---|---|---|
| 1 | `SectionShell` | `components/ui/SectionShell.tsx` | Consistent section wrapper with bg, overlay, padding |
| 2 | `VideoStage` | `components/cinematic/VideoStage.tsx` | Click-to-play video with poster, modal, controls |
| 3 | `PremiumCTA` | `components/ui/PremiumCTA.tsx` | Unified CTA with primary/secondary/ghost variants |
| 4 | `StickyMobileCTA` | `components/ui/StickyMobileCTA.tsx` | Fixed bottom mobile CTA bar |
| 5 | `MotionReveal` | `components/ui/MotionReveal.tsx` | ScrollTrigger reveal wrapper |
| 6 | `SceneEyebrow` | `components/cinematic/SceneEyebrow.tsx` | Replaces ShotLabel with editorial design |
| 7 | `CinematicPanel` | `components/ui/CinematicPanel.tsx` | Glass panel with hover/border states |
| 8 | `HoverGrid` | `components/ui/HoverGrid.tsx` | Sibling-dim + active-lift hover grid |
| 9 | `ResponsiveMediaFrame` | `components/cinematic/ResponsiveMediaFrame.tsx` | Cinematic frame: corners, inner border, vignette |
| 10 | `ProgressRail` | `components/ui/ProgressRail.tsx` | Vertical/horizontal scroll progress |
| 11 | `SceneTransition` | `components/cinematic/SceneTransition.tsx` | Hairline + optional gradient between scenes |
| 12 | `MagneticWrapper` | `components/ui/MagneticWrapper.tsx` | Wrapper applying magnetic effect |
| 13 | `ProofCard` | `components/ui/ProofCard.tsx` | Testimonial image card with cinematic frame |
| 14 | `FormStepCard` | `components/apply/FormStepCard.tsx` | Step indicator with progress bar |
| 15 | `TunnelSystemStage` | `components/cinematic/TunnelSystemStage.tsx` | LUSION-inspired CSS/GSAP depth tunnel (optional) |

---

## 15. Final Motion and Scroll System

### GSAP Standards

- All animations use registered GSAP plugins
- Custom eases: `venom`, `filmDrop`, `venomIn` (from `lib/gsap.ts`)
- Scrub: 1.5 cinematic, 0.6 fast, 2.5 slow (from `motionConfig.ts`)
- Stagger: char 0.012, word 0.06, card 0.1, section 0.18

### Pinning

- Scene02 only (already implemented, 330vh, pinned)
- No other scene pinned — long pinned sections frustrate mobile
- Verify pin works on mobile touch via Lenis

### Scene Transitions

- Between scenes: `SceneHairline` (venom gradient line)
- Add: 40px overlap gradient (bottom of exiting fades into top of entering)

### Text Reveals

- Headlines: SplitText lines `yPercent: 110 → 0`, `mask: "lines"`, ease `filmDrop`
- Body: SplitText words `opacity 0→1`, stagger 0.04–0.05
- Labels: `scrambleText` on scroll entry, once
- All reveals: `once: true` — never re-animate on scroll back

### Hover-Grid

Keep existing CSS `.hover-grid` (sibling dims, active lifts). CSS transitions smoother than GSAP for this pattern.

### CTA Magnetic

Keep `useMagnetic` at strength 0.28 with `elastic.out` return.

### Scroll Progress

- Desktop: vertical right rail
- Mobile: 2px horizontal bar below nav
- Both driven by ScrollTrigger global progress

### Mobile

- Disable particle cursor (already done)
- Evaluate disabling Lenis below 768px
- Reduce stagger counts by 50% on mobile
- Replace SplitText line reveals with simple fade-up on mobile

### Reduced-Motion Fallbacks

- All elements immediately visible (no animation)
- Lenis disabled (already)
- Body grain hidden (already)
- Video paused, shows poster
- Custom cursor hidden (already)
- Progress indicators show static final state

### Performance Guardrails

- Max 8 concurrent ScrollTrigger instances active at any time
- `once: true` for entrance animations
- Canvas frame-scrub: only active while in viewport
- `will-change: transform` only on actively animating elements
- Remove `will-change` after animation completes

### Files

`lib/motionConfig.ts` (add mobile stagger multiplier) · `lib/gsap.ts` (no changes) · `hooks/useMagnetic.ts` (no changes) · all scene files (standardize patterns)

---

## 16. Scene-by-Scene Final Plan

### Scene00 — Hero / Cold Open

**Issue:** Hero works technically but lacks visual hierarchy. VSL preview competes with headline. Logo overscaled (`scale-[2.55]`). Play button uses text triangle character.

**Target:** Clear hierarchy: headline → VSL frame → CTA. Logo natural size. Play button redesigned. Background loop atmospheric, not competing.

**Changes:**
- Remove logo scaling hack
- Redesign play button with proper SVG icon
- Add subtle entrance stagger between left content and right video frame
- Reduce video frame prominence slightly
- Replace ShotLabel with `SceneEyebrow`
- Update `data-scene-title` to human-readable label
- **Hero VSL: per addendum §2, verify before use**

**Files:** `Scene00ColdOpen.tsx`, `ShotLabel.tsx`/`SceneEyebrow.tsx`

**QA:** Headline readable at all breakpoints, VSL plays on click, no layout shift on video load.

---

### Scene01 — Problem

**Issue:** Functional but visually flat. Chaos signals adequate but lack urgency. Badge-glitch nice but scene doesn't build enough tension.

**Target:** More visual tension. Signals feel chaotic/urgent before system resolves them in Scene02.

**Changes:**
- Replace ShotLabel with `SceneEyebrow`
- Slight staggered rotation on chaos-signal cards entrance (-1deg to 1deg)
- Improve badge-glitch timing (3 → 2 with sharper timing)
- Update title to "THE PROBLEM"

**Files:** `Scene01Problem.tsx`

---

### Scene02 — Chaos to System

**Issue:** Frame-scrub canvas is impressive but checkpoint panels at bottom compete. HUD readout (`FRAME: 001, SCROLL: 0%`) reads as developer debug UI.

**Target:** Frame scrub dominates. Checkpoint panels secondary. HUD subtle or removed.

**Changes:**
- Redesign HUD: remove `MODE: CHAOS > SYSTEM`, keep counters but reduce to single venom text line
- Checkpoint panels: reduce visual weight, make subtle timeline markers
- Add depth: vignette intensifies as scroll progresses
- Replace ShotLabel with `SceneEyebrow`
- Update title to "THE SYSTEM"

**Files:** `Scene02ChaosToSystem.tsx`

---

### Scene03 — Roadmap

**Issue:** Dense content with good hover-grid but visually monotonous. All cards identical. DrawSVG nice but invisible to most.

**Target:** Visual rhythm through module cards. Hierarchy between modules and "What You Learn" cards. DrawSVG more prominent.

**Changes:**
- Module numbers `01`–`06` larger, prominent (font-display, venom)
- Differentiate "What You Learn" cards from module cards
- DrawSVG connector thicker (strokeWidth 1.5), more visible (opacity 0.55)
- Replace ShotLabel with `SceneEyebrow`

**Files:** `Scene03Roadmap.tsx`

---

### Scene04 — Offer / Store Build

**Issue:** Long section, marquee strip thin/invisible. Option cards (US/Saudi flags with emoji) feel casual.

**Target:** Graduation gift feels exclusive. Beyond section has stronger pillar design.

**Changes:**
- Option cards: replace emoji flags with SVG flag icons or country code badges, gold accent border
- Marquee: visibility up (text-ash/70 instead of /50, slight size increase)
- Beyond cards: gold accent line at top
- Replace ShotLabel with `SceneEyebrow`

**Files:** `Scene04Offer.tsx`

---

### Scene05 — Founder

**Issue:** Good structure. Portrait works. Overlay text "Operator identity locked: real Youssef image" is debug copy that MUST be removed.

**Target:** Remove all debug copy. Founder feels like trust anchor — authoritative but warm.

**Changes:**
- **REMOVE** "Operator identity locked: real Youssef image" overlay text
- Steel accent on blockquote `border-left` (instead of venom)
- Trait cards: subtle gold dot or line before title
- Replace ShotLabel with `SceneEyebrow`

**Files:** `Scene05Founder.tsx`

---

### Scene06 — Proof Gate

**Issue:** "Verification state: local proof assets" label is debug copy. Honest-note approach correct but visual presentation looks like placeholder.

**Target:** Proof feels complete and deliberate. Screenshots shown with confidence.

**Changes:**
- **REMOVE** "Verification state: local proof assets" debug label
- Redesign honestNote as subtle footnote, not prominent disclaimer
- Proof cards: hover slightly enlarges image
- Replace ShotLabel with `SceneEyebrow`
- Update title to "RESULTS"

**Files:** `Scene06ProofGate.tsx`

---

### Scene07 — Application Flow

**Issue:** Step cards minimal. FAQ accordion works but `+` toggle is text character. Doesn't build urgency toward application.

**Target:** Application flow feels inevitable, clear next step. FAQ clean and professional.

**Changes:**
- Step cards: brief description below each title
- FAQ: replace `+` text with SVG icon rotating on open/close
- Brief urgency copy near CTA (without fabrication)
- Replace ShotLabel with `SceneEyebrow`

**Files:** `Scene07Application.tsx`

---

### Scene08 — Final CTA

**Issue:** Works well. Breathing glow on CTA is nice. Ghost `08` numeral at 30vw heavy but acceptable.

**Target:** Minimal changes. Ensure label readable, CTA maximally prominent.

**Changes:**
- Replace ShotLabel with `SceneEyebrow`
- Update title to "START"
- Reduce ghost numeral opacity 0.04 → 0.025
- Consider `final-lockup-loop.mp4` as ambient background

**Files:** `Scene08FinalCTA.tsx`

---

## 17. Route-by-Route Final Plan

### `/` (Home)

**Current:** 9 scenes render correctly.
**Improvements:** All scene-level changes from §16. Add `StickyMobileCTA`. Improve scene transitions.
**QA:** Full scroll without dead zones, animations fire once, mobile smooth.

### `/apply`

**Current:** 3-step form with step indicators. Functional.
**Improvements:**
- Form inputs: subtle focus ring animation (border → venom)
- Step indicators: numbers more prominent
- Field validation feedback (red border on invalid, not just browser native)
- Mobile: form fully visible without keyboard covering submit

**QA:** Form submits, step navigation works, validation visible, navigates to `/schedule`.

### `/schedule`

**Current:** Time slot grid with countdown. Functional.
**Improvements:**
- Time slot buttons: hover/active states with venom fill
- Selected state: clear venom background
- Subtle urgency element (slot count without fabrication — e.g., "20-min slots available today")
- Countdown: ensure it's meaningful

**QA:** Slot selection works, visual feedback clear, mobile slots tappable.

### `/confirmation`

**Current:** Red "DO NOT CLOSE" banner + steps. No video.
**Improvements:**
- Embed founder VSL inline at Step 1 (not just text)
- Add ambient background loop (low opacity)
- Steps: steel accent numbering
- Improve "DO NOT CLOSE" banner (less alarming, more purposeful)

**QA:** Video plays inline, all steps readable, banner visible but not jarring.

---

## 18. Final File-by-File Change Map

| File | Changes | Priority |
|---|---|---|
| `app/layout.tsx` | Replace font imports (Syne, Inter, JetBrains Mono) | P1 |
| `app/globals.css` | CSS variables, typography tokens, color tokens, button classes | P1 |
| `tailwind.config.ts` | fontFamily, color tokens, steel/gold | P1 |
| `lib/content.ts` | No changes | — |
| `lib/frameManifest.ts` | No changes | — |
| `lib/mediaOptimization.ts` | No changes | — |
| `lib/gsap.ts` | No changes | — |
| `lib/motionConfig.ts` | Add mobile stagger multiplier | P3 |
| `lib/lenis.ts` | No changes | — |
| `components/nav.tsx` | Update scene labels, remove debug text | P2 |
| `components/footer.tsx` | Subtle redesign, steel accent, spacing | P3 |
| `components/ui/button.tsx` | Add secondary/ghost variants, improve primary | P2 |
| `components/ui/StickyMobileCTA.tsx` | NEW | P2 |
| `components/ui/Preloader.tsx` | Update "SYSTEM BOOT" → "ECOMVENOM", font classes | P2 |
| `components/ui/ScrollProgressIndicator.tsx` | Add mobile horizontal variant | P3 |
| `components/cinematic/ShotLabel.tsx` → `SceneEyebrow.tsx` | Full redesign editorial eyebrow | P2 |
| `components/cinematic/ScrollFilmScene.tsx` | Update `data-scene-title` format | P2 |
| `components/cinematic/VideoStage.tsx` | NEW reusable click-to-play | P2 |
| `components/cinematic/CinematicLoopVideo.tsx` | Add preload prop, mobile hide | P3 |
| `components/cinematic/CinematicFramePlayer.tsx` | No changes | — |
| `Scene00ColdOpen.tsx` | Logo fix, play button SVG, remove debug, use new components | P2 |
| `Scene01Problem.tsx` | Label redesign, entrance refinement | P3 |
| `Scene02ChaosToSystem.tsx` | HUD cleanup, checkpoint panel redesign | P3 |
| `Scene03Roadmap.tsx` | Module number styling, DrawSVG visibility | P3 |
| `Scene04Offer.tsx` | Option card redesign, gold accent | P3 |
| `Scene05Founder.tsx` | **REMOVE debug text**, steel accent quote | P2 |
| `Scene06ProofGate.tsx` | **REMOVE debug labels**, redesign proof presentation | P2 |
| `Scene07Application.tsx` | FAQ icon SVG, step descriptions | P3 |
| `Scene08FinalCTA.tsx` | Label update, ghost opacity, optional bg video | P3 |
| `components/apply/application-form.tsx` | Focus states, validation feedback | P3 |
| `components/schedule/schedule-board.tsx` | Slot hover/active states | P3 |
| `components/confirmation/pre-call-steps.tsx` | Embed video at Step 1 | P3 |
| `app/confirmation/page.tsx` | Add ambient bg video, banner redesign | P3 |
| `components/cursor/ParticleTrailCursor.tsx` | No changes | — |
| `hooks/useMagnetic.ts` | No changes | — |

---

## 19. Final Dependency Policy

- **No new dependencies by default**
- Existing dependencies sufficient: GSAP 3.15 (all premium plugins), Lenis 1.3, Next.js 15, React 18, Tailwind 3
- **Conditions for adding a dep:** Must solve problem unsolvable with existing deps, <20KB gzipped, maintained (>1000 stars or verified publisher), free/MIT
- **Forbidden:** Three.js, React Three Fiber, any WebGL library, paid service, analytics/tracking, CSS-in-JS, animation library (GSAP covers all)
- **Font changes:** Via `next/font/google` only (zero-cost, self-hosted automatically)
- **No deployment, no push**

---

## 20. Final Phase 2 Execution Sequence

> ⚠️ **Phase 2A is REPLACED by addendum §4 mandatory preflight sequence.**

### Phase 2A — Preflight Verification

Per addendum §4. Tag `pre-phase-2`. Run typecheck, build, dev server. Visually inspect all routes. Confirm zero console errors.
**Acceptance:** Zero errors anywhere.
**Checkpoint:** None required if working tree clean.

### Phase 2B — Remove Visible Debug UI/Copy

**Files:** `Scene05Founder.tsx`, `Scene06ProofGate.tsx`, `Preloader.tsx`
**Acceptance:** Full scroll reveals zero debug labels.
**Commit:** `fix(phase-2b): remove debug labels and dev copy`

### Phase 2C — Typography/Token System

**Files:** `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`
**Acceptance:** All text in new font family, no FOUT, no layout shift, build passes.
**Commit:** `feat(phase-2c): typography system — Syne display, Inter body, JetBrains mono`

### Phase 2D — Color/Material System

**Files:** `app/globals.css`, `tailwind.config.ts`
**Acceptance:** Colors render correctly, contrast ratios ≥4.5:1 for text, build passes.
**Commit:** `feat(phase-2d): color and material system — steel/gold accents`

### Phase 2E — CTA/Button System

**Files:** `components/ui/button.tsx`, `app/globals.css`, `components/ui/StickyMobileCTA.tsx` (new)
**Acceptance:** All CTAs render with correct hover/focus/active states, mobile sticky appears after Scene02.
**Commit:** `feat(phase-2e): CTA system — variants, mobile sticky, magnetic`

### Phase 2F — Scene Label/Progress System

**Files:** `ShotLabel.tsx`/`SceneEyebrow.tsx`, `nav.tsx`, `ScrollFilmScene.tsx`, all scene files
**Acceptance:** No `00 SYSTEM BOOT` style labels, nav pill shows readable names, scrambleText still fires.
**Commit:** `feat(phase-2f): scene labels — editorial eyebrow, human-readable names`

### Phase 2G — Video Architecture

> ⚠️ **Per addendum §2:** Verify Hero VSL assets BEFORE use. Ship poster-only if verification fails.

**Files:** `VideoStage.tsx` (new), `Scene00ColdOpen.tsx`, `app/confirmation/page.tsx`, `pre-call-steps.tsx`
**Acceptance:** VSL plays on click (or poster-only if no valid asset), confirmation video embedded, mobile fallbacks work, reduced-motion shows poster.
**Commit:** `feat(phase-2g): video architecture — VideoStage component, confirmation embed`

### Phase 2H — Reusable Component System

**Files:** Multiple new files in `components/ui/` and `components/cinematic/`
**Acceptance:** Shared components replace duplicated patterns, existing scene behavior preserved, build passes.
**Commit:** `feat(phase-2h): reusable component library`

### Phase 2I — Scene-by-Scene Rebuild

**Files:** All 9 scene files, apply/schedule/confirmation pages
**Acceptance:** Full scroll demonstrates premium visual quality, no regressions.
**Commit:** `feat(phase-2i): scene-by-scene premium rebuild`

### Phase 2J — Mobile/Responsive Pass

**Files:** Various — responsive utility classes, mobile-specific logic
**Acceptance:** Clean rendering at 390px, 834px, 1280px, 1440px. No horizontal overflow, no truncation, touch ≥44px, mobile CTA visible.
**Commit:** `feat(phase-2j): mobile responsive pass`

### Phase 2K — Media Optimization

> ⚠️ **Per addendum §3:** Split into 2K-PLAN (manifest only, no edits) and 2K-EXEC (only after human approval).

**Phase 2K-PLAN:**
- Generate optimization manifest (file list, target sizes, est. savings, reference map)
- No file edits
- **Commit:** `chore(phase-2k-plan): media optimization manifest`

**Phase 2K-EXEC (only after human approval):**
- Convert brand-visuals PNG→WebP (with `.original-backup`)
- Update references
- Visual comparison QA
- **Commit:** `feat(phase-2k-exec): media optimization — brand visuals WebP`

### Phase 2L — Accessibility

**Files:** Various — aria-labels, contrast fixes
**Acceptance:** Keyboard-navigable, screen-reader friendly, WCAG AA. Tab order logical, all interactive focusable, no contrast failures.
**Commit:** `feat(phase-2l): accessibility pass`

### Phase 2M — Performance QA

**Files:** Optimize if needed
**Acceptance:** Build passes, no console errors, first paint <2s on 4G. No unexpected chunk sizes, zero console errors.
**Commit:** `feat(phase-2m): performance QA pass`

### Phase 2N — Final Report

**Files:** None
**Acceptance:** Complete clean build, all routes functional. Final report generated per addendum §6.
**Commit:** Only if fixes needed.

---

## 21. Final QA Gates

| Gate | Command/Action | Pass Criteria |
|---|---|---|
| Git status | `git status --short` | Clean or expected changes |
| Typecheck | `npm run typecheck` | Zero errors |
| Build | `npm run build` | Zero errors, no unexpected warnings |
| Dev server | `npm run dev -- --port 3012` | Starts without error |
| Console | Browser DevTools | Zero errors, acceptable warnings only |
| Desktop (1440×900) | Visual inspection | Premium, no debug text, animations fire |
| Laptop (1280×800) | Visual inspection | No overflow, text readable |
| Tablet (834×1112) | Visual inspection | Layout adapts, touch adequate |
| Mobile (390×844) | Visual inspection | No horizontal scroll, sticky CTA visible |
| Route `/` | Full scroll test | All 9 scenes render, transitions smooth |
| Route `/apply` | Form flow | All 3 steps work, submit navigates |
| Route `/schedule` | Slot selection | Slots clickable, selection visible |
| Route `/confirmation` | Video + steps | Video plays, steps visible |
| Reduced motion | `prefers-reduced-motion` | No animation, all content visible |
| Accessibility | Tab through all routes | Focus visible, logical order |
| Performance | Build output + paint timing | No chunk >250KB, FCP <2s |
| Asset weight | Media folder sizes | No single asset >2MB |

---

## 22. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Design overreach — too many changes at once | Medium | High | Strict phase order with checkpoints; revert any phase that breaks build |
| Performance regression from new fonts | Low | Medium | `display: "swap"` / `"optional"`, verify no layout shift |
| Video mismatch on mobile | Medium | Medium | Poster fallback, mobile hides background loops |
| Mobile scroll problems with Lenis | Medium | High | Test thoroughly; disable below 768px if issues |
| Frame sequence bloat | Low | Low | Already optimized at 37KB/frame avg |
| Font loading FOUT/FOIT | Low | Medium | `next/font` handles self-hosting/preloading automatically |
| CTA conversion risk from redesign | Low | Medium | Keep primary CTA style (venom bg, high contrast) — improve only |
| Fake proof/content risk | Zero | Critical | All content from verified `lib/content.ts`, no fabrication |
| LUSION misuse risk | Low | Medium | Final decision: reference only, no WebGL, no asset copying |
| **Hero VSL aspect ratio mismatch** | **Medium** | **High** | **Per addendum §2: verify before use, ship poster-only if invalid** |
| **Media optimization breaking references** | **Medium** | **High** | **Per addendum §3: approval-gated, backups, grep before/after** |

---

## 23. Rollback Plan

### Strategy: Per-Phase Git Commits

Each phase (2A → 2N) creates its own commit. Rolling back any phase = `git revert <commit>`.

### Critical Checkpoints

1. **Before Phase 2 starts:** Tag current HEAD as `pre-phase-2`
   ```
   git tag pre-phase-2
   ```
2. **After typography (2C):** Most disruptive change. If fonts wrong, revert 2C only.
3. **After scene rebuild (2I):** Full visual checkpoint. If regressions, revert to post-2H.

### Emergency Rollback

```
git reset --hard pre-phase-2
```
Restores exact pre-Phase-2 state. Only use if multiple compounding failures.

### Safe Rollback Rule

Never force-push. Never rewrite history on shared branches. All rollbacks via `git revert` (new commits that undo changes).

---

## 24. Final Authorization

This master plan is authoritative when read together with `ECOMVENOM_PHASE2_PLAN_ADDENDUM.md`.

**Implementation begins only after:**
1. Both files read in full
2. Acknowledgement block returned (addendum §7)
3. Preflight sequence GREEN (addendum §4)

**Plan complete.** No files edited. No dependencies installed. No commits made. No deployment. Awaiting authorized execution.
