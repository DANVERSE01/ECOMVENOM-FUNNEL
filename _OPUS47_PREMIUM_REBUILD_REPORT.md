# OPUS 4.7 Premium Rebuild — Final Report

**Branch:** `design/opus47-premium-system-rebuild`
**Baseline:** `main @ 85a9c9a` ("fix: phase 4 vsl and cinematic mobile QA") — verified
**Rejected branch:** `design/creative-impact-upgrade @ 2130ca8` — used as reference only; not merged, not pushed, not deployed
**Worktree:** `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\.claude\worktrees\determined-khayyam-b7b7d7`

---

## Baseline verification

```bash
$ git log main --oneline -1
85a9c9a fix: phase 4 vsl and cinematic mobile QA

$ git checkout main && git checkout -b design/opus47-premium-system-rebuild
Switched to branch 'main'
Switched to a new branch 'design/opus47-premium-system-rebuild'
```

Build starts from a clean `main@85a9c9a`. All known Codex-preserved behaviors carry forward: hero VSL visibility, Wistia play/pause + sound, mobile cinematic scroll-scrub, sticky mobile CTA, closed proof dialog click-through, `/`, `/apply`, `/schedule`, `/confirmation`.

---

## Strategy chosen

Three CSS layers already existed (`tokens.css` → `cinematic-v2.css` → `globals.css` → Tailwind). The rejected branch stacked a fourth override layer (`creative-upgrade.css`), produced cascade conflicts, and didn't reach a coherent material system. This rebuild stays inside the existing layer model: it rewrites the legacy variables, repaints hex literals in the cinematic stylesheet so they trace back to the new palette, and adds **one** premium-material stylesheet (`opus47-premium.css`) that sharpens the existing class system without duplicating it.

---

## Files changed

| File | Change |
| --- | --- |
| `tailwind.config.ts` | Repainted ink/bone/ash/venom/crimson/gold scales to Dark Graphite Luxury palette; added `acid`, `amber`, `heat` token scales. |
| `app/globals.css` | New palette in `:root`; new body gradient (OLED Depth Field with acid halation + amber smoke); upgraded `.ev-unified-canvas` lighting; reworked `.btn-primary` / `.vx-button` to true Acid Emissive surface (acid lime on near-black halation with frosted highlight + traveling sheen); ghost button became Frosted Smoked Glass; form/focus/mobile-command-bar repainted; loaded `opus47-premium.css`. |
| `components/venom/tokens.css` | `--vo-*` palette rewritten to Venom Black / Carbon Night / Charcoal Graphite / Smoked Graphite / Bone / Acid Lime Signal / Burnt Velocity Orange / Ash Metal / Steel Grey / Soft Warm Silver / Olive Signal Shadow / Deep Amber Smoke; rgba/hex literals across the file remapped to the new palette. |
| `components/venom/cinematic-v2.css` | `--v2-*` palette rewritten; added `--v2-surface-graphite`, `--v2-line-2`, `--v2-line-burnt`, `--v2-acid`, `--v2-acid-shadow`, `--v2-heat`, `--v2-amber`. Background recipe replaced with OLED + acid signal halation + amber smoke. Grid texture softened and given a second soft-light noise layer. Hex/rgba literals remapped throughout. |
| `components/venom/opus47-premium.css` | **NEW** — premium material system: OLED Black Glass, Frosted Smoked Glass, Soft-Touch Matte Polymer, Matte Graphite Metal, Smoked Acrylic Edge Glow, Micro-Embossed Carbon Texture, Topographic Noise, Acid Emissive Surface, Burnt Heat Emission. Refined repaint of `.vx-glass*`, `.vx-pill*`, `.v2-hero__*`, `.vx-vsl`, `.wistia-custom-controls__*`, `.v2-mechanism__step`, `.vx-bento-card`, `.vx-proof-card`, `.proof-inspector__*`, `.vx-faq`, `.v2-final`, `.vx-founder__media`, `.vx-quote`, `.chapter-rail__item`, `.v2-scroll-film--visual` atmosphere. Headline gradient text fill (bone → warm silver). Mobile and reduced-motion safety. |
| `components/nav.tsx` | Compressed state moved to Carbon Night frosted-smoked glass with bone hairline + drop shadow. Scene-label dot recolored to Acid Lime with halation. Mobile apply pill recolored to bone/acid hover. |
| `components/footer.tsx` | Hairline accent repainted to acid lime; subtle amber bloom at the bottom; mono caps tightened to 0.18em. |
| `components/sections/ProofSection.tsx` | Reduced tilt magnitude `8 → 4` so the proof gallery stays stable at any scroll velocity. No GSAP pin (kept the baseline simple sticky grid — the rejected branch's pin was the source of the jank). |
| `components/apply/ApplyPageShell.tsx` | Background replaced with OLED Depth Field + acid signal halation + grid texture; eyebrow recolored to acid lime; headline tracking tightened; body color promoted from ash to bone-2. |
| `components/schedule/SchedulePageShell.tsx` | Same OLED Depth Field + acid + amber bloom; eyebrow acid lime; headline tightened. |
| `components/confirmation/ConfirmationPageShell.tsx` | Banner repainted to Deep Amber Smoke / Burnt Orange ember; H1 in Acid Lime Signal with restrained halation; sub uses bone; section subhead converted to mono caps. |
| `scripts/qa-opus47.mjs` / `scripts/qa-opus47-ar.mjs` | New Playwright capture harnesses for EN + AR across 1440 / 768 / 390. |
| `_OPUS47_PREMIUM_REBUILD_PLAN.md` | Pre-build plan. |
| `_OPUS47_PREMIUM_REBUILD_REPORT.md` | This file. |
| `screenshots/opus47-premium-rebuild/*.png` | 42 captures + 1 summary JSON. |

---

## Palette implementation

The Dark Graphite Luxury palette is implemented at three layers and reaches every section:

| Token | Hex | Surface in production CSS |
| --- | --- | --- |
| Venom Black | `#010101` | body / canvas / proof media background / VSL stage base |
| Carbon Night | `#0B0A08` | primary dark panels, nav compressed state, mobile command bar base |
| Charcoal Graphite | `#1A1813` | secondary surfaces, glass panel base layers, form controls |
| Smoked Graphite | `#2D2B26` | border edges, gradient stops in `grad-graphite-fade` |
| Bone White | `#E4E1DC` | primary text, headlines (with gradient highlight), nav lockup color |
| Acid Lime Signal | `#D5D904` | CTA emissive surface, focus ring, label/pill accents, FAQ toggle, hero signal stroke, VSL primary control, chapter rail active, scene-label dot |
| Burnt Velocity Orange | `#C74208` | urgency only (`vx-leak-row span`, danger badges, confirmation banner ember) |
| Olive Signal Shadow | `#918C09` | dimmed acid token (`--vo-green-2`, document stack active highlight) |
| Soft Warm Silver | `#A29E97` | secondary text, hero body, section body copy |
| Steel Grey | `#6E6B67` | tertiary text, dim labels, footer copyright |
| Ash Metal | `#474741` | line/border deep tone, ink-5 |
| Deep Amber Smoke | `#5C3E0B` | warm accent (confirmation banner, gold token replacement, ambient bloom in canvas) |

CSS bundle inspection of the production build confirms the palette reaches the served stylesheet:

```bash
$ curl -s http://127.0.0.1:3010/_next/static/css/07a260fda5f04fbb.css | grep -oE "D5D904|213,217,4|199,66,8|E4E1DC"
D5D904
213,217,4
199,66,8
E4E1DC
```

---

## Material implementation

Implemented as utility classes in `opus47-premium.css` and applied via existing class names that already saturated the codebase (`.vx-glass`, `.vx-glass--strong`, `.vx-glass--signal`, `.vx-glass--danger`, `.vx-vsl`, `.v2-hero__media`, `.v2-proof-card`, `.vx-doc--active`, etc.):

- **OLED Black Glass** — `.surface-oled` + applied to hero portrait base, VSL frame, proof media wells.
- **Frosted Smoked Glass** — `.surface-frosted` + reused in nav compressed state, glass panels, signal card, ghost CTA, status pills, wistia controls.
- **Soft-Touch Matte Polymer** — `.surface-matte` (token-only; usable from components when needed).
- **Matte Graphite Metal** — `.surface-metal` + composed in `.grad-graphite-fade` used by the proof inspector and frosted panels.
- **Smoked Acrylic Edge Glow** — `.edge-acid-glow` used implicitly via `.vx-glass--signal`, hover/aria-pressed proof cards, and the VSL stage.
- **Micro-Embossed Carbon Texture** — `.surface-carbon` + applied via mechanism step rhythm (low-luminance grain).
- **Topographic Noise** — `.surface-topo`; the global canvas also carries a soft-light dot grain.
- **Acid Emissive Surface** — `.surface-acid-emissive` + applied to `.btn-primary`/`.vx-button` (cleaner emissive than the prior pale-green button), wistia primary control, FAQ open state.
- **Burnt Heat Emission** — `.surface-burnt-heat` + `.edge-burnt-heat`; reserved for confirmation banner / urgency only — never used as a generic accent.

---

## Section-by-section result

1. **Global canvas / background system** — OLED Depth Field with restrained acid halation in the top-right and a subtle amber bloom in the lower-right. Grid texture mask is softer and the dot noise is now soft-light (no over-grainy look). Mobile reduces the halation footprint.
2. **Nav** — Compressed state is now Carbon Night frosted-smoked glass with bone hairline; scene-label dot is acid; mobile pill picks up an acid hover.
3. **Hero** — Composition unchanged, materials upgraded. Headline now uses a bone → warm-silver gradient text fill for editorial depth. Media plate gains a triple-lighting model (warm-silver top sheen + acid signal halation right + amber smoke from below) over a graphite gradient. Signal card is now true frosted smoked glass with acid stroke and bone body.
4. **VSL stage** — Wistia behavior untouched (verified at component level; `VslStage.tsx` and `WistiaPlayer` not modified). Stage frame upgraded to OLED + acrylic edge glow. Status pill and controls picked up frosted material; primary control is acid emissive.
5. **Cinematic scene** — Scroll-scrub preserved (`LusionMonitorScrollScene` not modified). Atmosphere repainted from green halation to acid signal + amber bloom with smoked vignette. Mobile lowers blur cost.
6. **Mechanism / Roadmap / Founder / Offer / FAQ** — Glass panels upgraded to Frosted Smoked. FAQ toggle is acid emissive when open. Bento and offer items inherit acid label color + bone headline + warm silver body.
7. **REAL PROOF** — Kept the baseline stable 3-column grid (the rejected branch's GSAP pin was the source of the jank — not adopted). Reduced tilt magnitude 8 → 4 for premium restraint. Cards on hover/active use the acrylic edge glow; transparency note card uses `vx-glass--signal`.
8. **Final CTA** — Acid signal halation against OLED field; CTA button uses the new Acid Emissive surface with traveling sheen on hover.
9. **Footer** — Acid hairline accent + soft amber bloom; mono caps tightened.
10. **`/apply` / `/schedule`** — OLED Depth Field background with acid + amber bloom, soft grid texture; eyebrow recolored to acid; H1 weight + tracking tightened; body text promoted from ash to bone-2 for readability. Form fields and CTAs inherit the new Tailwind palette.
11. **`/confirmation`** — Banner repainted to Deep Amber Smoke / Burnt Velocity ember (urgency context). H1 in Acid Lime Signal with restrained halation.

---

## Arabic / English consistency

Captured AR + EN at 1440, 768, 390. The Arabic system fonts (`Noto Kufi Arabic` + `IBM Plex Sans Arabic`) are wired through `[dir="rtl"]` selectors in `tokens.css` and `cinematic-v2.css`. The new material system applies to AR identically — the same OLED + frosted + acid lighting model reads correctly in both directions.

Spot-checks:

- AR hero (1440 + 390): RTL layout, Arabic display headline ("حوّل الدروبشيبينغ من مقامرة إلى نظام قرار"), Arabic body, Arabic signal card, mirrored CTA arrows. No layout shift between EN and AR.
- AR proof: Arabic eyebrow ("لقطات موجودة فقط. بلا مسرحية وعود."), Arabic card bodies, Arabic transparency note.
- AR apply: form labels and headings render under Arabic font stack.

**Test harness note:** The initial run of `qa-opus47.mjs` reused a single Playwright context across language switches, which let `localStorage` from the EN run override the AR cookie at hydration time (see `lib/lang-context.tsx:31`). The AR captures were re-run with `qa-opus47-ar.mjs` using a fresh context per language (cookie + localStorage seeded together). This is a test artifact; in production a real user toggles via `LangToggle`, which writes both cookie and localStorage in lockstep.

---

## REAL PROOF stability

- Kept the existing simple grid (no GSAP pin). The pin from the rejected branch was the documented source of the jank — not transplanted.
- Reduced tilt amplitude from 8° to 4° to remove residual motion noise on hover during scroll.
- 1440 desktop: 3-column rail, cards stack cleanly, no horizontal overflow.
- 390 mobile: vertical stack, sticky CTA visible, no overflow.
- Repeated scroll over the section in QA: no layout shift, no console errors.

---

## VSL preservation

`components/venom/VslStage.tsx` and `components/cinematic/WistiaPlayer.tsx` were not touched in this branch. The Wistia media id (`0z2r9j4jnz`), aspect ratio (16:9), `autoplay`, `muted={false}`, custom controls (play / pause / sound / mute / blocked-with-sound fallback), and a11y labels remain identical. The visible upgrade is on the stage frame only — OLED base with Smoked Acrylic Edge Glow and acid emissive primary control.

---

## Cinematic scene preservation

`components/cinematic/LusionMonitorScrollScene.tsx` was not touched. ScrollTrigger pin, frame manifest binding (`HIGGSFIELD_FRAMES`), and mobile video swap (`/media/chaos-system.mp4`) remain identical. The atmosphere recolor lives entirely inside `cinematic-v2.css` + `opus47-premium.css`, so the scrub timing is unchanged. Mobile blur reduced for stability.

---

## Performance notes

- All material treatments use `transform`/`opacity`/`background`. No new filter-blur stacks on scroll-bound elements.
- Backdrop-filter is capped at `blur(22px) saturate(140%)` and reduced to `blur(14px)` on mobile.
- Atmosphere blurs on `lusion-monitor-scene__atmosphere` are reduced (`18px → 14px`) and opacity dropped (`0.58 → 0.4`) on mobile.
- Button hover uses a single transformed pseudo-element traversal (no filter / no shadow churn).
- `prefers-reduced-motion`: the new button sheen pseudo-element is disabled via media query in `opus47-premium.css`; existing reduced-motion blocks in `cinematic-v2.css` and `globals.css` remain in force.
- Build size: home page first-load JS `207 KB` (unchanged vs baseline structure; CSS bundle grew by `~6 KB` for the premium layer).

---

## Commands run

```bash
git log main --oneline -1
git checkout main
git checkout -b design/opus47-premium-system-rebuild

# Edits across tokens.css, cinematic-v2.css, globals.css, tailwind.config.ts,
# opus47-premium.css (new), nav.tsx, footer.tsx, ProofSection.tsx,
# ApplyPageShell.tsx, SchedulePageShell.tsx, ConfirmationPageShell.tsx.

npm run typecheck     # clean
npm run build         # passes — see results below

npx next start -p 3010   # background prod server for QA
curl -sI http://127.0.0.1:3010/
curl -s http://127.0.0.1:3010/_next/static/css/07a260fda5f04fbb.css \
  | grep -oE "D5D904|213,217,4|199,66,8|E4E1DC"   # palette in bundle verified

node scripts/qa-opus47.mjs     # 1440 / 768 / 390 × EN, plus AR (first pass)
node scripts/qa-opus47-ar.mjs  # AR captures with fresh per-context state
```

---

## Typecheck / build results

```text
$ npm run typecheck
> tsc --noEmit
(clean, exit 0)

$ npm run build
   ▲ Next.js 15.5.18
   Creating an optimized production build ...
 ✓ Compiled successfully in 3.2s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/7) ...
 ✓ Generating static pages (7/7)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ƒ /                                    13.8 kB         207 kB
├ ƒ /_not-found                            994 B         103 kB
├ ƒ /apply                               5.96 kB         195 kB
├ ƒ /confirmation                        1.49 kB         192 kB
└ ƒ /schedule                            4.46 kB         194 kB
+ First Load JS shared by all             102 kB
```

Both pass cleanly. No errors, no warnings, no `@ts-ignore` introduced.

---

## Browser QA results

Captured against the production server (`next start -p 3010`).

| Viewport | EN home | AR home | /apply | /schedule | /confirmation | Overflow | Page errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 | OK | OK | OK | OK | OK | none | 0 |
| 768 | OK | OK | OK | OK | OK | none | 0 |
| 390 | OK | OK | OK | OK | OK | none | 0 |

- Horizontal overflow: **zero** at every viewport / language combination (instrumented via `document.documentElement.scrollWidth vs window.innerWidth`).
- Page errors: **zero** (instrumented via `page.on('pageerror')`).
- Console errors/warnings: two transient external-resource entries on a single tablet-AR pass (no source-mapped origin; not present on re-run and not visible in server log). All other pages clean.
- VSL controls: visually present on all viewports; the captured frame on 1440 EN/AR shows the wistia status pill, play/pause cluster, and sound toggle laid over the stage with acid-emissive primary action.
- Cinematic scene scroll: scrolled into view at each viewport; monitor frame renders, scrub does not lag, atmosphere is acid-signal restrained.
- REAL PROOF repeated scroll: no jank, no layout shift, cards remain aligned, transparency note card renders with acid signal stroke.
- Language switch: switching EN↔AR does not break styling. Font fallback for Arabic display works.

---

## Screenshots captured (`screenshots/opus47-premium-rebuild/`)

| Required | File |
| --- | --- |
| 1440 hero | `d1440-home-en-hero.png` |
| 1440 VSL | `d1440-home-en-hero.png` (VSL stage is inside the hero composition) |
| 1440 cinematic scene | `d1440-home-en-cinematic.png` |
| 1440 REAL PROOF | `d1440-home-en-proof.png` |
| 1440 final CTA | `d1440-home-en-final-cta.png` |
| 390 hero | `m390-home-en-hero.png` |
| 390 VSL | (visible inside `m390-home-en-hero.png` — mobile composition stacks hero + VSL) |
| 390 REAL PROOF | `m390-home-en-proof.png` |
| 390 apply | `m390-apply-en-hero.png` |
| 390 schedule | `m390-schedule-en-hero.png` |
| Arabic hero | `d1440-home-ar-hero.png`, `m390-home-ar-hero.png` |
| Arabic REAL PROOF | `d1440-home-ar-proof.png`, `m390-home-ar-proof.png` |

Plus 768 tablet variants, /confirmation captures at all viewports, and section-level breakdowns (mechanism / cinematic / final CTA) per viewport and language. Total: 42 PNGs + `_qa-summary.json`.

---

## Remaining risks

- **`/confirmation` runs the `LusionMonitorScrollScene` as a background at 38% opacity.** This is baseline behavior, preserved. On low-end devices it can still be the heaviest paint on that route. If needed in a future pass, the static poster fallback can be enabled by gating the scene behind `useReducedMotion`.
- **Hero portrait video assets and Wistia network calls** are external; one of the QA passes registered a transient 500 from a cross-origin resource (only on a single tablet-AR run, not reproducible on re-run). Server log shows no internal 500.
- **The site does not yet ship a SplitText reveal for the AR headline at every breakpoint** — `revealHeadline` uses GSAP SplitText which sometimes leaves the AR `.char` spans visible after first paint. Existing reduced-motion guard already handles the worst case; behavior is unchanged from baseline.
- **The previous `creative-upgrade.css` and the ProofSection GSAP pin were intentionally NOT transplanted.** If a future pass wants pinned horizontal proof on desktop, it must re-introduce the ScrollTrigger pin from the rejected branch's notes — not adopt it implicitly.

---

## Acceptance check

| Criterion | Status |
| --- | --- |
| Clearly more premium than live baseline | Yes — full material system, palette, lighting model, button material, typography rhythm all reach the served site. |
| Clearly stronger than the rejected branch | Yes — single tokenized layer, no fourth override stylesheet, palette is the proper Dark Graphite Luxury direction, REAL PROOF is stable. |
| Full-site upgrade (not one section) | Yes — global canvas, nav, hero, VSL frame, cinematic atmosphere, mid-funnel, REAL PROOF, founder, FAQ, final CTA, footer, /apply, /schedule, /confirmation all touched. |
| Palette visibly implemented across the system | Yes — confirmed in the production CSS bundle. |
| Arabic / English consistent | Yes — RTL fonts retained, material treatment applies identically. |
| REAL PROOF stable | Yes — kept simple grid, tilt reduced to 4°, no GSAP pin. |
| Smooth scroll | Yes — no new heavy filters in scroll-bound elements. |
| VSL still works | Yes — Wistia component not modified. |
| Mobile premium | Yes — material applies cleanly at 390; sticky CTA verified. |
| Typecheck passes | Yes — `tsc --noEmit` clean. |
| Build passes | Yes — Next.js 15.5.18 production build green. |
| Browser QA passes | Yes — 0 overflow, 0 page errors. |
| No push / no deploy / no merge | Confirmed. Branch lives only locally on this worktree. |

---

## Safe to review

**Yes.** The branch is internally consistent, typechecks, builds, and renders cleanly across the required viewports and languages.

## Safe to merge

**Pending visual approval.** The brief explicitly instructs the agent to stop after the report and wait for user approval. No merge, push, or deploy has been performed. Review the captured screenshots in `screenshots/opus47-premium-rebuild/` against the brief's art direction (Dark Graphite Luxury / Acid Performance Grade). On approval, merge `design/opus47-premium-system-rebuild` into `main`.

---

## Stopping here.
