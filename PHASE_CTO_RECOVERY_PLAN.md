# PHASE CTO RECOVERY PLAN — ECOMVENOM FUNNEL
**Date:** 2026-05-10  
**Role:** CTO / Senior Product Design Director / Frontend Architecture Lead / Performance Engineer / QA Lead / Premium Motion-Interaction Director  
**Working branch:** `claude/flamboyant-volhard-161e2e` (base: `main` @ `4b9d69d`)  
**Previous agent branch (abandoned):** `claude/practical-matsumoto-631ff0`

---

## 1. EXECUTIVE DIAGNOSIS

### Strategic Failure of Previous Agents
The `practical-matsumoto-631ff0` branch represents a misdiagnosis. Opus 4.7 and Sonnet 4.6 correctly identified the architecture problems but applied the wrong correction. Their Phase 3a Hero rebuild stripped:

- The founder VSL scroll-expansion system
- The CinematicLoopVideo tunnel
- The SystemOverlay UI chrome
- The spotlight depth effect
- The per-word headline reveal
- The hero scroll cue

They reduced 10+ reading targets to 4 by *removing* the interaction layer, not by *refining* it. The result is a flat, generic landing page — exactly what the directive prohibits. Their Phase 3b–3c followed the same pattern. That branch is abandoned.

**The correct diagnosis:** the product has an architecture problem AND a content/hierarchy problem. The interaction system itself is competent and premium. It must be kept, refined, and made purposeful — not deleted.

**The correct correction:**
> Clean the structure. Do not flatten the experience.

### What Is Actually Broken

**Strategically:** Every one of the 9 scenes is at equal visual weight. There is no pacing valley, no editorial hierarchy, no narrative arc. The user experiences a sequence of 9 peaks with no rest. This is not an interaction problem — it is a composition and content-density problem.

**Architecturally:** The token system is split across two sources (Tailwind config + 1,863-line globals.css), 6 font families are loaded simultaneously, dead code from `components/sections/*.tsx` (~11 files, never imported) pollutes the repository, and there are no CI gates.

**Experientially:** The hero has 8+ simultaneous reading targets above the fold, the content narrative does not build cleanly through the 9 scenes, and mobile performance is not first-class. These are fixable without destroying the cinematic system.

**Technically:** Hero pin (60vh) creates iOS scroll jank. Particle cursor ships JS to touch devices where it is disabled. Vimeo player loads on initial paint regardless of user intent. No CI, no test runner, no axe, no lint-staged.

---

## 2. EVIDENCE LOG

### Files Inspected

| File | Finding |
|---|---|
| `app/globals.css` | 1,863 lines — dual token system, 4 overlapping clamp-based text size scales, bespoke utility classes that bypass Tailwind |
| `tailwind.config.ts` | Re-declares same palette (ink/bone/ash/venom/steel/gold/crimson/violet) — 9 color families with 2–5 shades each |
| `app/layout.tsx` | 6 font families: Syne, Space Grotesk, Inter, JetBrains Mono, Alexandria, Cairo — all `display: "swap"` |
| `app/page.tsx` | Imports 9 Scene*.tsx (scroll-film), all peer-weighted, separated by SceneHairline |
| `components/sections/hero.tsx` | Dead code — not imported in page.tsx |
| `components/sections/*.tsx` | 11 files (hero, chaos-to-system, curriculum, faq, final-cta, founder, graduation-gift, learn, promise, testimonials, beyond) — none imported anywhere |
| `components/sections/scroll-film/Scene00ColdOpen.tsx` | Live hero scene — inline Arabic/English copy dictionaries (diverges from lib/translations.ts); has VSL expansion, FloatingVslPlayer, tunnel, spotlight, SystemOverlay |
| `components/sections/scroll-film/Scene02ChaosToSystem.tsx` | CinematicFramePlayer scroll-scrubbed image sequence — PREMIUM signature interaction, must be preserved |
| `components/cinematic/FloatingVslPlayer.tsx` | Mini-player persisting on scroll — valuable narrative asset |
| `lib/translations.ts` | Centralized bilingual strings — not fully used by all scenes |
| `package.json` | No test runner, no axe, no prettier, no lint-staged, no husky. Scripts: dev, build, lint, typecheck only |

### Commands Run

```
npm run typecheck  →  ✓ clean (zero errors)
npm run lint       →  ✓ clean (zero errors/warnings on main branch)
npm run build      →  (not run on this branch yet — will run in Phase 0)
git status --short →  Only untracked: .ai-cto-recovery/, .claude/worktrees/, CTO_RECOVERY_DIRECTIVE.md, ECOMVENOM_CTO_RECOVERY_PACKAGE/
git log --oneline  →  4b9d69d is HEAD — "Refine bilingual premium copy and mobile Scene02 cinematic interaction"
git branch -a      →  main, practical-matsumoto-631ff0 (abandoned), amazing-feistel-907311, flamboyant-volhard-161e2e (current)
```

### Key Measurements

| Metric | Value |
|---|---|
| `globals.css` lines | 1,863 |
| Font families loaded | 6 (4 EN + 2 AR) |
| Scenes in page.tsx | 9 |
| Dead component files | 11 (components/sections/*.tsx, not imported) |
| CI gates | 0 |
| TypeScript errors | 0 |
| ESLint errors | 0 |

---

## 3. INTERACTION RESCUE STRATEGY

### Guiding Principle
> "Clean the interaction. Do not kill the interaction."

The cinematic system in this codebase is technically sound. GSAP 3.15 (all plugins), Lenis 1.3, SceneObserver, ScrollFilmScene, FloatingVslPlayer, CinematicFramePlayer, SplitText, ScrambleText — these are premium tools used with genuine intent. Previous agents were wrong to remove them. This recovery refines their application.

### Per-Scene Interaction Assessment

| Scene | Current Interaction | Assessment | Recovery Action |
|---|---|---|---|
| **Scene00 — Hero** | VSL scroll-expansion + FloatingVslPlayer + tunnel/spotlight + SystemOverlay + per-word SplitText reveal | **Keep architecture, fix density.** Too many simultaneous reveals. The scroll-expansion VSL is the SIGNATURE moment — keep it. | Reduce ABOVE-THE-FOLD reading targets from 8+ to 4 (eyebrow → headline → CTA → VSL) by collapsing the copy, NOT by removing the interaction system. Remove hero pin — replace with IntersectionObserver entry. Keep tunnel, FloatingVslPlayer, scroll-expansion. |
| **Scene01 — Problem** | SplitText line reveal on scroll | **Keep + strengthen.** Functional but thin. | Add one ambient depth element (CSS variable shift on scroll). Keep SplitText reveal. |
| **Scene02 — ChaosToSystem** | CinematicFramePlayer scroll-scrubbed image sequence + SceneProgress + MaterialField | **KEEP EXACTLY.** This is the highest-fidelity cinematic moment in the product. It directly visualizes the transformation promise. | Verify reduced-motion fallback. Verify mobile performance of frame scrub. No structural change. |
| **Scene03 — Roadmap** | SceneProgress checkpoint timeline | **Keep + refine.** Currently feels like a list. | Add scroll-activated venom fill to the timeline connector (same principle as practical-matsumoto 03-Mechanism but applied to existing Scene03Roadmap). Keep SceneProgress. |
| **Scene04 — Offer** | ScrambleText + card reveals | **Keep + tighten.** ScrambleText on the headline is purposeful (activates the "operating system" metaphor). | Reduce card count if redundant. Keep scramble. |
| **Scene05 — Founder** | SplitText heading + image | **Keep + add one moment.** Founder is a high-trust section — needs one purposeful interaction. | Add subtle parallax on founder image (pure CSS or lightweight GSAP). Keep SplitText. |
| **Scene06 — ProofGate** | SplitText reveal + proof cards | **Keep + strengthen.** Proof is a conversion-critical section. | Add animated count-up on key metrics (store revenue / student count). Keep card reveals. |
| **Scene07 — Application** | Basic reveals | **Keep + add gate moment.** Application section needs friction-reducing interaction. | Add a "gate opens" visual metaphor on scroll entry. |
| **Scene08 — FinalCTA** | Basic CTA | **Keep + tighten.** | Ensure final CTA has maximum visual weight — largest typographic moment + strong venom pulse. |

### What Is Replaced (Not Removed)

| Interaction | Status | Replacement |
|---|---|---|
| Hero pin (60vh ScrollTrigger pin) | **Replaced** | IntersectionObserver entry animation — eliminates iOS scroll jank while preserving the entrance moment |
| Particle cursor JS on touch devices | **Conditionally gated** | Dynamic import behind `(pointer: fine)` check — keeps cursor on desktop, tree-shakes from mobile |
| Vimeo player on initial paint | **Lazy-mounted** | Click-to-play intent gate — poster + play button on first paint, player mounted only on click |
| Inline copy dictionaries in scenes | **Migrated** | All copy centralized in `lib/translations.ts` + `lib/useContent.ts` — not removed, just properly sourced |

---

## 4. DESIGN SYSTEM STRATEGY

### Typography
**Target:** 5 sizes, single scale, no ad-hoc clamps per section.

| Token | Value | Use |
|---|---|---|
| `--text-display` | `clamp(3.4rem, 9vw, 11rem)` | Scene headlines, one per section max |
| `--text-hero` | `clamp(3rem, 7vw, 7.8rem)` | Hero H1 |
| `--text-section` | `clamp(2.2rem, 4.5vw, 5rem)` | H2 section headings |
| `--text-sub` | `clamp(1.5rem, 2.5vw, 2.5rem)` | Subheadings |
| `--text-body` | `1rem` | Body, capped at 1.125rem on wide |
| `--text-caption` | `0.8125rem` | Labels, eyebrows, metadata |

Remove: `--text-hero-xl`, miscellaneous per-section clamp variables scattered through globals.css.

**Fonts (4 families, not 6):**
- EN Display: Syne (keep — distinctive for headlines)
- EN Body: Inter (keep — only `weight: ["400", "500"]`)
- AR Display: Alexandria (keep — `display: "swap"`)
- AR Body: Cairo (keep — `display: "swap"`)
- **Remove:** Space Grotesk (replace all `font-heading` usage with Syne at lighter weight), JetBrains Mono (use system mono stack)

### Color
**Single source of truth:** CSS variables in `globals.css`, consumed by Tailwind via `rgb(var(--c-X-rgb) / <alpha>)` channels.

**Semantic layer (components reference only these):**

```
--bg         → --c-ink        (page background)
--bg-raised  → --c-ink-3      (cards, panels)
--bg-overlay → --c-ink-2      (scrims)
--fg         → --c-bone        (primary text)
--fg-muted   → --c-ash        (secondary text)
--fg-subtle  → --c-ash-2      (captions, metadata)
--border     → rgba(bone, 0.06)
--border+    → rgba(bone, 0.14)
--accent     → --c-venom      (single accent, no -2 -3 -dim -glow sprawl)
--danger     → --c-crimson
```

**Primitive palette (referenced only by semantic tokens, never by components directly):** Retain ink, bone, ash, venom. Retain steel and gold for sections that genuinely use them (ProofGate uses steel for data visualization). Retain crimson for alert states only. Remove violet (zero usage confirmed).

### Spacing & Rhythm
8px-base scale. Section padding standardized:
- `--section-y-sm: clamp(3rem, 6vw, 5rem)` — tight sections
- `--section-y: clamp(4rem, 8vw, 8rem)` — standard sections  
- `--section-y-lg: clamp(6rem, 12vw, 12rem)` — hero/landmark sections

Remove ad-hoc `--base-py: clamp(24px, 4vw, 56px)` scattered through globals.css.

### Surface Language
- Dark glass cards: `bg-ink-3/80 backdrop-blur-sm border border-white/[0.06]`
- Proof cards: `bg-ink-2 border border-venom/14` — venom border to mark validation
- CTA surfaces: full-bleed venom fill or ghost border with venom hover

### CTA Hierarchy
One verb: **APPLY**. One action per section. Secondary link if needed, never competing primary CTAs in the same viewport. This is a content rule, not a component rule.

### Motion Grammar
Four categories, applied consistently:

| Category | Purpose | GSAP Pattern |
|---|---|---|
| **Entry reveal** | First visual contact with a section | SplitText yPercent 120→0, stagger 0.08, dur 0.85, once |
| **Scroll progress** | Narrative progression as user scrolls | ScrollTrigger scrub on semantic elements only (not every paragraph) |
| **Signature** | One purposeful cinematic moment per section | Scene-specific — tunnel, frame scrub, pulse, gate-open |
| **Response** | Pointer/touch feedback on interactive surfaces | GSAP quick-to on hover (dur 0.25), elastic spring on leave |

No animation should fire without serving one of these four purposes.

---

## 5. PERFORMANCE STRATEGY

### Bundle Risks

| Risk | Current | Fix |
|---|---|---|
| Font families | 6 loaded, all swap | Reduce to 4, change JetBrains → system-mono |
| Particle cursor | Ships to all devices including touch | Dynamic import behind `(pointer: fine)` media query check |
| Vimeo player | Loaded on initial paint | Lazy-mount on click intent. poster + play button first |
| globals.css | 1,863 lines | Target ≤600 lines after removing dead utilities and dead token duplication |
| ScrollTrigger instances | One per paragraph in multiple scenes | Max one per scene (section-level trigger), content elements compose from it |

### Image/Video Strategy
- All `<Image>` components: add `placeholder="blur"` for above-fold assets, `loading="lazy"` for below-fold
- Hero VSL poster: pre-fetched, not lazy
- Higgsfield generated assets: confirm all saved to `public/generated/*.webp`
- Frame scrub sequence (Scene02): already canvas-based — verify chunk sizing
- Vimeo: lazy-mount via `useState(mounted)` on click, poster pre-loaded

### Hydration Risks
- `Scene00ColdOpen` uses `createPortal` — verify SSR safety (portal target must exist on client only)
- `FloatingVslPlayer` — confirm no SSR mismatch on initial render
- `cookies()` in layout.tsx — this is fine, it's an async server component reading lang

### Animation Cost Control
- Hero pin removal eliminates a main-thread stall on every iOS scroll event
- Lenis disabled on `(pointer: coarse)` — prevents double-scroll on touch
- `ScrollTrigger.create` per-scene max, not per-element
- `useGSAP` cleanup returns confirmed in all scenes

### Mobile Performance Constraints
- Target: smooth 60fps on iPhone 13 + Chrome Android on real device
- Scene02 frame scrub: test with requestAnimationFrame budget check
- ParticleTrailCursor: no JS parsed on touch (dynamic import gate)
- Reduced-motion: `useReducedMotion()` gates GSAP entry in all scenes (already present — verify consistency)

---

## 6. ACCESSIBILITY & RTL STRATEGY

### Keyboard Behavior
- All interactive surfaces (CTAs, VSL play button, nav links, form fields): keyboard-accessible
- Modal/overlay (VSL overlay): focus trap, Escape closes, focus returns to trigger on close
- Scene00 has known `jsx-a11y` warnings on click handlers — fix to `role="button"` + `onKeyDown` pattern

### Reduced Motion
- `useReducedMotion()` hook present in all scenes — verify it is actually applied (some scenes only check it in the GSAP branch but still run CSS animations)
- Add `@media (prefers-reduced-motion: reduce)` to CSS animation keyframes as well

### Focus State
- All interactive elements: visible `:focus-visible` ring using venom at 50% opacity
- Contrast on ring must meet 3:1 minimum against adjacent background

### Contrast
- `--c-ash` (#8A8A94) on `--c-ink` (#060608): 5.6:1 — AA pass for body text ✓
- `--c-ash-2` (#6B6B75) on `--c-ink` (#060608): 3.7:1 — **fails AA on body text** — avoid for body copy, use for metadata/captions only
- `--c-venom` (#B8FF2E) on `--c-ink` (#060608): 14.6:1 — AAA ✓

### Arabic/English Layout Safety
- SSR-driven `dir` attribute already set in `layout.tsx` from cookie — keep this architecture
- All flexbox/grid in scenes: verify `gap` and `padding-*` use logical properties where needed for RTL
- `FloatingVslPlayer`: verify RTL positioning (uses `right-*` — must flip to `left-*` in RTL)
- Scene copy: migrate remaining inline dictionaries to `lib/translations.ts`

---

## 7. EXECUTION PHASES

### Phase 0 — Safety + Audit Baseline
**Scope:** Establish clean baseline. No visual change.

Tasks:
1. Run `npm run build` on this worktree — capture bundle baseline
2. Remove dead code: `components/sections/hero.tsx`, `components/sections/chaos-to-system.tsx`, and all 9 other unused sections (verified non-imported)
3. Fix `.gitignore`: add `tsconfig.tsbuildinfo`, `.next-dev*.log`, `output/` (Chrome profile), `*.jpe`, `*.jpe2.jpe`
4. Remove root-level junk files: `file.jpe`, `file.jpe2.jpe`, root PNG screenshots
5. Document: baseline build size, typecheck state, lint state

Gate:
```
git status --short
npm run typecheck  →  must be ✓
npm run lint       →  must be ✓
npm run build      →  must be ✓, capture bundle sizes
```
Commit: `phase(0): safety baseline — dead code removal, gitignore, root cleanup`

---

### Phase 1 — Token & Font Architecture
**Scope:** Single source of truth for design tokens. Reduce font loading.

Tasks:
1. Add RGB channel variables to `globals.css` `:root` for Tailwind opacity support:
   ```css
   --c-ink-rgb: 6 6 8;
   --c-bone-rgb: 240 237 230;
   --c-venom-rgb: 184 255 46;
   /* etc. */
   ```
2. Update `tailwind.config.ts` to consume channels:
   ```ts
   colors: {
     bg: 'rgb(var(--c-ink-rgb) / <alpha-value>)',
     fg: 'rgb(var(--c-bone-rgb) / <alpha-value>)',
     accent: 'rgb(var(--c-venom-rgb) / <alpha-value>)',
     /* semantic layer */
   }
   ```
3. Remove Space Grotesk from layout.tsx — replace `font-heading` usages with `font-display` (Syne) at a lower weight, or `font-sans` (Inter)
4. Remove JetBrains Mono from layout.tsx — replace mono stack with `ui-monospace, SFMono-Regular, Menlo, monospace`
5. Remove violet from Tailwind config (zero usage confirmed)
6. Add semantic token aliases to globals.css (`--bg`, `--fg`, `--accent`, `--border`)
7. Reduce `globals.css` dead utilities — target ≤900 lines in this phase (full reduction in Phase 3)

Gate:
```
npm run typecheck  →  ✓
npm run lint       →  ✓  
npm run build      →  ✓, bundle must not increase
browser preview    →  visual parity (colors, text rendering)
EN + AR parity     →  both render correctly
```
Commit: `phase(1): token architecture — single source of truth, font reduction`

---

### Phase 2 — Interaction Rescue & Refinement
**Scope:** Preserve and refine the cinematic interaction layer. Fix hero density. Do NOT remove any interaction system.

#### Phase 2a — Hero (Scene00) Interaction Refinement
Tasks:
1. **Keep:** VSL scroll-expansion, FloatingVslPlayer, tunnel, spotlight, SystemOverlay, per-word SplitText reveal
2. **Fix hero pin:** Remove `ScrollTrigger` pin. Replace with `IntersectionObserver`-backed entry animation. The hero enters once on scroll, cleanly — no sticky pinning.
3. **Reduce above-fold reading targets:** 8 → 4 by collapsing copy to: eyebrow → headline → primary CTA → VSL card with play button. Sub-copy, secondary CTA, and scroll cue move below the fold or are compressed into the VSL card.
4. **Fix VSL `jsx-a11y` warnings:** Add `role="button"` + `onKeyDown` handler to click targets in Scene00 and VideoStage.
5. **Migrate inline copy dict:** Scene00's hardcoded `vslCopy` object → `lib/translations.ts`

Gate: `typecheck ✓`, `lint ✓` (zero new warnings), `build ✓`, browser EN+AR preview ✓

#### Phase 2b — Scene01 Problem Enhancement
Tasks:
1. **Keep:** SplitText line reveal
2. **Add:** One ambient scroll-driven CSS variable (`--ambient-opacity`) shift as section enters — creates depth without GPU cost. Already in `:root` — just needs a ScrollTrigger tick.
3. **Migrate inline copy** to `lib/translations.ts` if any remain

Gate: same as above

#### Phase 2c — Scene02 ChaosToSystem — Verify & Protect
Tasks:
1. **DO NOT CHANGE the interaction.** CinematicFramePlayer + MaterialField + SceneProgress is the signature premium moment.
2. Run frame scrub performance test — verify no jank at 60fps
3. Verify reduced-motion fallback shows the final frame static
4. Verify RTL — frame player layout and text direction
5. Fix any `jsx-a11y` warnings if present

Gate: same as above + manual 60fps scroll test

#### Phase 2d — Scene03 Roadmap Timeline Activation
Tasks:
1. **Keep:** Existing checkpoint layout
2. **Add:** Scroll-scrubbed venom fill on the vertical connector spine — nodes activate via CSS custom property tween (`--cp-progress`) as each checkpoint enters viewport. This makes the OS roadmap metaphor *visible* as the user scrolls.
3. Reduced-motion fallback: show all nodes active immediately

Gate: same as above

#### Phase 2e — Scene04 Offer Tightening
Tasks:
1. **Keep:** ScrambleText headline, card reveal animations
2. **Reduce clutter:** Audit option cards — remove any that are visually duplicated or editorially weak without removing the section's offer clarity
3. Verify RTL card layout

Gate: same as above

#### Phase 2f — Scene05 Founder Trust Moment
Tasks:
1. **Keep:** Founder image, SplitText heading
2. **Add:** Subtle parallax drift on founder image (`y: -12px` over a 200px scroll range, pure GSAP, reduced-motion safe)
3. Ensure founder name + credential are prominent (trust anchor)

Gate: same as above

#### Phase 2g — Scene06 ProofGate Metrics
Tasks:
1. **Keep:** SplitText heading, proof card reveals
2. **Add:** Animated `count-up` on the headline metric (store revenue / student count) — `CountUp` component already exists at `components/ui/count-up.tsx`
3. Verify proof images use `placeholder="blur"` for CLS

Gate: same as above

#### Phase 2h — Scene07 Application Gate Visual
Tasks:
1. **Keep:** Existing layout
2. **Add:** "Gate opens" visual moment — a line draw animation on the application card border (SVG stroke-dashoffset scroll-triggered) that makes the action feel earned
3. Ensure apply CTA is the only CTA in viewport at this point

Gate: same as above

#### Phase 2i — Scene08 FinalCTA Maximum Weight
Tasks:
1. **Refine:** Ensure largest typographic moment (`--text-display`) is here
2. **Add:** Venom glow pulse on the CTA button (`animation: venom-pulse`) that activates on scroll into view
3. **Remove:** Any competing secondary CTAs

Gate: same as above

Commit per sub-phase, or batch 2b–2i into one commit if all green.

---

### Phase 3 — Visual & Content Hierarchy
**Scope:** Editorial pacing, content density reduction, CTA discipline.

Tasks:
1. **Heading hierarchy audit:** Only one `<h1>` per page (Scene00 hero headline). All section headings are `<h2>`. Sub-section items are `<h3>`. Fix any violations.
2. **CTA audit:** One primary CTA verb: "APPLY". Secondary CTAs (Watch Intro, Schedule) moved to lower sections. No two competing primary CTAs in the same viewport.
3. **Content density reduction per scene:** Each scene audited for copy that does not directly answer a conversion question. Remove or compress without removing the section structure.
4. **Eyebrow discipline:** One eyebrow per section max. Remove double-eyebrow stacks.
5. **globals.css reduction:** Target ≤600 lines. Remove: duplicate token declarations now handled by semantic layer, dead utility classes not referenced anywhere, ad-hoc one-off component styles that should be Tailwind.
6. **RTL content parity:** Ensure every scene's content reads cleanly in Arabic — no truncation, no overflow

Gate:
```
npm run typecheck  →  ✓
npm run lint       →  ✓
npm run build      →  ✓
browser EN + AR    →  ✓ visual parity
heading audit      →  one h1 per page confirmed
```
Commit: `phase(3): content hierarchy — heading audit, CTA discipline, globals.css reduction`

---

### Phase 4 — Performance Pass
**Scope:** Bundle weight, animation cost, image/video optimization.

Tasks:
1. **Vimeo lazy-mount:** Scene00 hero embed: mount iframe only on click (useState gate). Poster pre-loaded. FloatingVslPlayer: same pattern.
2. **Particle cursor:** Wrap dynamic import with `typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches` — zero JS shipped to touch devices
3. **Font display:** Syne `display: "swap"` → `display: "optional"` for non-critical weights. Inter already `display: "optional"`.
4. **Image audit:** Every `<Image>` above-fold: `priority={true}`, `placeholder="blur"`. Every below-fold: `loading="lazy"`, `placeholder="blur"`.
5. **ScrollTrigger audit:** Each scene: max one ScrollTrigger.create for section entry. Element-level stagger uses the parent trigger's `onEnter` callback, not independent triggers.
6. **Lenis gate:** Disable Lenis on `(pointer: coarse)` and `(prefers-reduced-motion: reduce)` — native scroll only on touch.

Gate:
```
npm run build      →  ✓, First Load JS for / must be ≤ baseline or lower
Lighthouse mobile  →  run, record score (target ≥80 performance)
CLS check          →  < 0.05 with no layout shifts on hero
```
Commit: `phase(4): performance — lazy VSL, cursor gate, image optimization, scroll discipline`

---

### Phase 5 — Accessibility + Mobile QA
**Scope:** Keyboard, reduced-motion, RTL, mobile viewport.

Tasks:
1. **All a11y warnings → errors and fix:** VideoStage, Scene00, and any remaining click-handler elements → `role="button"` + `onKeyDown`
2. **Focus states:** Verify every interactive element has visible `:focus-visible` ring — add where missing (ring using venom at 50% opacity)
3. **Reduced-motion verification:** Each scene: useReducedMotion triggers immediate `opacity: 1` state, no GSAP, no CSS keyframe animation. Test with macOS Reduce Motion enabled.
4. **Mobile hero layout:** Verify hero above-fold content is fully readable at 390px width. One-thumb reachable CTA (bottom third of viewport, 44×44 min tap target).
5. **RTL final audit:** All 9 scenes verified in Arabic — text direction, icon flip, button alignment, FloatingVslPlayer position.
6. **Heading semantic audit:** axe-core (if available) or manual landmark check.

Gate:
```
npm run typecheck  →  ✓
npm run lint       →  ✓ (zero a11y warnings remaining, all elevated to fixed)
npm run build      →  ✓
manual 390px mobile test  →  hero readable, CTA reachable
manual RTL test    →  Arabic renders correctly in all 9 scenes
reduced-motion test →  all animations skip, content visible
```
Commit: `phase(5): accessibility — a11y fixes, focus states, reduced-motion, mobile QA`

---

### Phase 6 — Final Production Readiness
**Scope:** CI gates, final QA, launch readiness documentation.

Tasks:
1. **Add dev tooling (dev deps only, no runtime deps):**
   - `prettier` + `.prettierrc`
   - `lint-staged` + `.lintstagedrc`
   - `husky` with `pre-commit: lint-staged`
   - `eslint-plugin-jsx-a11y` in `.eslintrc.json` (elevate to error)
2. **Add `npm run typecheck:watch`** for development convenience
3. **Final build verification:** clean `.next`, full `npm run build`, capture final bundle sizes
4. **Create `PHASE_CTO_FINAL_REPORT.md`**
5. **Launch readiness checklist** (see below)

Gate: all checklist items green before committing

Commit: `phase(6): production readiness — CI gates, final QA, launch checklist`

---

## 8. GATE CHECKLIST (per phase)

Run after every phase commit. All must be green before next phase begins.

```bash
git status --short
npm run typecheck
npm run lint
npm run build
```

Additionally, before Phase 5 commit:
- Browser: EN and AR visual verification
- Browser: 390px mobile viewport
- Browser: reduced-motion (OS setting)

---

## 9. LAUNCH READINESS CHECKLIST

All items must be checked before any production deployment.

| Item | Status |
|---|---|
| `npm run build` green on this branch | ☐ |
| `npm run typecheck` zero errors | ☐ |
| `npm run lint` zero errors (a11y included) | ☐ |
| Zero duplicate token definitions (Tailwind config vs globals.css) | ☐ |
| Dead code (`components/sections/*.tsx`) removed | ☐ |
| Font count ≤ 4 families | ☐ |
| Hero above-fold ≤ 4 reading targets | ☐ |
| Hero pin removed | ☐ |
| Vimeo lazy-mount active | ☐ |
| Particle cursor dynamic-import gated on `(pointer: fine)` | ☐ |
| All inline scene copy dicts migrated to `lib/translations.ts` | ☐ |
| One `<h1>` per page | ☐ |
| All `jsx-a11y` warnings → fixed | ☐ |
| Focus visible on all interactive elements | ☐ |
| Reduced-motion: all animations skip | ☐ |
| EN + AR parity: all 9 scenes verified | ☐ |
| RTL layout correct in all scenes | ☐ |
| Mobile 390px: hero readable, CTA reachable | ☐ |
| globals.css ≤ 600 lines | ☐ |
| Lighthouse mobile Performance ≥ 80 | ☐ |
| CLS < 0.05 | ☐ |
| No console errors in production build | ☐ |

---

## 10. RISK REGISTER

| Risk | Level | Mitigation |
|---|---|---|
| Scene00 hero pin removal causes visual regression | Medium | Test immediately after Phase 2a. Rollback point: Phase 0 commit. |
| Font reduction breaks Arabic display rendering | Medium | Preview in AR mode before committing Phase 1. Alexandria/Cairo kept — only EN families reduced. |
| globals.css reduction breaks a scene's custom class | Medium | Grep every custom class before removing. Only remove classes with zero references. |
| FloatingVslPlayer RTL positioning broken | Low | Explicitly tested in Phase 5 RTL audit. |
| Frame scrub (Scene02) performance on low-end Android | Medium | Test during Phase 4. If jank confirmed, add `will-change: transform` to canvas element and reduce frame count on `(prefers-reduced-data)`. |
| Practical-matsumoto branch accidentally merged | Low | Branch is named and documented as abandoned. Do not merge. |

---

## 11. DECISION RECORD

**Decision:** Work from `main` (`4b9d69d`) in this worktree, NOT cherry-picking from `practical-matsumoto-631ff0`.  
**Reason:** The practical-matsumoto branch represents the wrong product direction (stripped cinematic system). Starting fresh from the correct baseline ensures the recovery plan is applied cleanly without inheriting their architectural decisions.

**Decision:** 9 scenes stay as 9 scenes.  
**Reason:** The directive explicitly prohibits flattening the experience. Each scene serves a conversion role. The problem is content density and visual weight parity — not scene count. Reducing to 6 was the previous agents' mistake.

**Decision:** Zero new runtime dependencies.  
**Reason:** The animation stack (GSAP, Lenis) is already best-in-class. No new runtime dep is justified. Only dev tooling additions (prettier, husky, lint-staged, eslint-plugin-jsx-a11y).

---

## 12. WHAT THE PREVIOUS AGENTS GOT RIGHT (KEEP)

1. **Phase 0 analysis** — their audit of dead code, dual tokens, font bloat, and hero pin is accurate. The analysis is correct; only the execution direction was wrong.
2. **The primitives concept** — `components/primitives/` is a good architectural direction. Will be built as Phase 2 progresses if sections need shared primitive elements. NOT used to replace the cinematic scene architecture.
3. **Token RGB channels** — their Phase 1 approach (Tailwind consuming CSS variable RGB channels) is the correct fix for the dual token system. Will be replicated here.
4. **Phase 3c Mechanism checkpoint rail** — the scroll-scrubbed venom fill on the checkpoint spine is a good interaction pattern. Will apply same principle to Scene03Roadmap in Phase 2d.

---

**Plan complete. Ready for Phase 0 execution on explicit approval.**
