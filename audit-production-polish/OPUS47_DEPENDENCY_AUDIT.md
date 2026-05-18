# OPUS47 Dependency Audit

## Summary

- **Total unique selectors in opus47-premium.css:** 105
- **Category A (Critical, must migrate):** 11 rule groups
- **Category B (Used but already covered by tokens/cinematic-v2/final-production-polish):** 72 selectors
- **Category C (Orphan/dead — zero component references):** 19 selectors
- **Category D (Toxic legacy — Phase 10/11/12 override conflicts):** 3 rule groups

---

## Category A — Critical & In-Use (MIGRATED)

| # | Selector / Rule Group | Referenced By | Reason |
|---|---|---|---|
| 1 | `:root` — `--opus-bone`, `--opus-acid`, `--opus-warm-silver`, `--opus-olive`, `--opus-burnt` | `final-production-polish.css` uses `var(--opus-bone)`, `var(--opus-acid)`, `var(--opus-warm-silver)` | Custom property definitions required by the active polish layer |
| 2 | `.wistia-poster` + `[data-status]` | `components/cinematic/WistiaPlayer.tsx` | Poster fallback styling — no equivalent elsewhere |
| 3 | `.mobile-cinematic-pill` + `[data-visible]` + media queries | `components/ui/StickyMobileCTA.tsx` | Mobile scroll-film CTA pill — no equivalent elsewhere |
| 4 | `.vx-faq-cta` | `components/sections/FaqSection.tsx` | FAQ inline CTA layout — no equivalent elsewhere |
| 5 | `[data-sticky-mobile-cta]`, `.mobile-command-bar` padding-bottom | `components/ui/StickyMobileCTA.tsx` | iOS safe-area inset — no equivalent elsewhere |
| 6 | `.vx-timeline__sprint` + `::before` | `components/sections/RoadmapSection.tsx` | Roadmap day-range label — no equivalent elsewhere |
| 7 | `.vx-timeline__title` | `components/sections/RoadmapSection.tsx` | Roadmap title display block — no equivalent elsewhere |
| 8 | `.vx-roadmap-sweep` + `@keyframes vxRoadmapSweep` + `.vx-section--sweep-in` | `components/sections/RoadmapSection.tsx` | Roadmap section sweep hairline — no equivalent elsewhere |
| 9 | `#final-cta .vx-final-door` + `@keyframes vxFinalDoor` + `[data-door]` | `components/sections/FinalCtaSection.tsx` | Final CTA door hairline animation — no equivalent elsewhere |
| 10 | Section atmosphere pseudo-elements: `#problem::after`, `#mechanism::after`, `#founder::after`, `#offer::after` + isolation + z-index | Multiple section components | Section differentiation — `final-production-polish.css` references opacity on these but doesn't define the base `content`/`background` |
| 11 | `.v2-mechanism__step` enhanced styling (border-radius, padding, active ring, `[data-active]`) | `components/sections/MechanismSection.tsx` | Active step visual feedback — no equivalent elsewhere |

---

## Category B — Used but Already Covered (NO MIGRATION)

These selectors are referenced by components but have equivalent base definitions in `tokens.css` or `cinematic-v2.css`. The opus47 layer only refined colors/shadows/backgrounds. After removal, the base definitions provide adequate styling.

Key selectors: `.vx-glass`, `.vx-glass--strong`, `.vx-glass--signal`, `.vx-glass--danger`, `.vx-pill`, `.vx-pill--signal`, `.vx-pill--danger`, `.v2-label`, `.v2-hero__headline`, `.v2-hero__body`, `.v2-hero__media`, `.v2-hero__signal`, `.v2-hero__proof`, `.v2-proof-card`, `.v2-proof-card__media`, `.v2-proof-card__body`, `.v2-mechanism__step` (base grid layout), `.vx-vsl`, `.vx-doc`, `.vx-doc--active`, `.vx-bento-card`, `.vx-bento-card__top`, `.vx-timeline`, `.vx-timeline__index`, `.vx-leak-row`, `.vx-offer-item`, `.vx-meta-grid`, `.vx-quote`, `.vx-founder__media`, `.vx-final-panel`, `.chapter-rail__item`, `.wistia-custom-controls`, `.wistia-custom-controls__button`, `.wistia-custom-controls__button--primary`, `.wistia-custom-controls__status`, `.wistia-sound-overlay` (already in final-production-polish), `.v2-scroll-film--visual`, `.v2-scroll-film__stage`, `.lusion-monitor-scene__atmosphere`, `.proof-inspector__panel`, `.proof-inspector__close`, `.proof-inspector__copy`, `.vx-section--compact::before`, `.ev-unified-canvas`, `.btn-primary`, `.vx-button`, `.scene-panel`, `.v2-final`, `.v2-section-copy`, `.v2-hero__vsl-dominant`, `.v2-hero__vsl-first-grid`, `.v2-hero__support`, `.v2-hero__copy`, `.v2-hero__vsl`, `.vx-actions`, `.vx-stage`, `.scroll-progress-bar`

---

## Category C — Orphan / Dead (DROPPED)

Zero component references — safe to drop entirely:

`.opus-route-bg`, `.opus-label`, `.grad-oled-field`, `.grad-graphite-fade`, `.grad-frosted-sheen`, `.grad-burnt-heat`, `.grad-acid-signal`, `.edge-burnt-heat`, `.edge-acid-glow`, `.cinematic-panel`, `.scroll-progress-rail`, `.surface-acid-emissive`, `.surface-carbon`, `.surface-frosted`, `.surface-matte`, `.surface-metal`, `.surface-oled`, `.surface-topo`, `.surface-burnt-heat`, `.vx-button--ghost-compact`, `.v2-hero__status-divider`, `.v2-hero__status-pill`, `.v2-hero__status-pill--active`, `.v2-hero__status-pill-dot`, `.v2-hero__status-pill-index`, `.v2-hero__status-pill-label`, `.v2-hero__vsl-slate-mark`

---

## Category D — Toxic Legacy (DROPPED UNCONDITIONALLY)

1. **Phase 10 `.v2-hero--vsl-first` recomposition block** (lines ~1130-1290) — conflicts directly with `final-production-polish.css` hero rules which are the authoritative source. The opus47 version sets different padding, gap, and max-width values that caused the cinematic regression.

2. **Phase 10 signal-line `::after` / `::before` rules** (lines ~1430-1456) — vertical 1px lines that conflict with the horizontal hairline approach in `final-production-polish.css`.

3. **Phase 10 `.v2-hero__status-rail` full block** — the status rail is intentionally hidden by `final-production-polish.css` (`display: none !important`). Migrating its styling would be contradictory.

---

## Verification Notes

- `final-production-polish.css` uses `var(--opus-bone)`, `var(--opus-acid)`, `var(--opus-warm-silver)` — these MUST be migrated or the polish layer breaks.
- No TSX component directly references any `--opus-*` variable (they're CSS-only).
- The `--ease-luxe`, `--ease-precision`, `--ease-cinema` variables are only used internally within opus47 rules — not needed after migration.
- The `--opus-shadow-*` and `--opus-glow-*` variables are only used internally — not needed.
