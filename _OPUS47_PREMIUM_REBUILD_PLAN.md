# OPUS 4.7 Premium Rebuild — Plan

**Branch:** `design/opus47-premium-system-rebuild`
**Baseline:** `main@85a9c9a` ("fix: phase 4 vsl and cinematic mobile QA")
**Rejected branch (reference only):** `design/creative-impact-upgrade @ 2130ca8`
**Working directory:** `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\.claude\worktrees\determined-khayyam-b7b7d7`

---

## Strategy

The baseline carries three layered CSS files: Tailwind, `tokens.css` (`--vo-*` vars + utility classes used in the original Codex pass), and `cinematic-v2.css` (`--v2-*` vars + scene-specific styling on the homepage). The rejected branch added a fourth override layer on top — `creative-upgrade.css` — and produced cascade conflicts and uneven results. This rebuild stays inside the existing layer model: rewrite the token values, repaint hex literals in the cinematic stylesheet so they trace back to the new palette, and introduce one premium-material stylesheet (`opus47-premium.css`) that defines the new material system as utility classes the existing components can opt into via class names that already exist (no new component layer required).

## Palette mapping (legacy → opus 4.7)

| Legacy | New | Role |
| --- | --- | --- |
| `#68ff7e` / `#63ff77` / `#b8ff2e` venom green | `#D5D904` Acid Lime Signal | primary action/accent |
| `#36f76b` venom-2 | `#918C09` Olive Signal Shadow | dimmed signal |
| `#ff2a2a` / `#ff3838` / `#ff3344` red | `#C74208` Burnt Velocity Orange | urgency only |
| `#050706` ink | `#010101` Venom Black | dominant background |
| `#0a0d0a` ink-2 | `#0B0A08` Carbon Night | primary panels |
| `#10140f` ink-3 | `#1A1813` Charcoal Graphite | secondary surfaces |
| `#161c15` / `#20271e` ink-4/5 | `#2D2B26` Smoked Graphite | borders / dividers |
| `#f3f5ef` / `#f4f6ee` bone | `#E4E1DC` Bone White | primary text |
| `#dfe4dc` bone-2 | `#A29E97` Soft Warm Silver | secondary text |
| `#a6aea2` ash | `#A29E97` Soft Warm Silver | muted text |
| `#788274` ash-2 | `#6E6B67` Steel Grey | dim text |
| `#4b5449` ash-3 | `#474741` Ash Metal | line/border |
| `#d4a45a` / `#d4b36a` gold | `#5C3E0B` Deep Amber Smoke | heat accent secondary |
| `#ff1744` crimson | `#C74208` Burnt Velocity Orange | urgency |

## Material system (`opus47-premium.css`)

- `.surface-oled` — OLED Black Glass: pure `#010101` with inset 1px highlight, micro-noise
- `.surface-frosted` — Frosted Smoked Glass: dark glass with backdrop-blur+saturate, top-edge sheen
- `.surface-matte` — Soft-Touch Matte Polymer: low-reflectance graphite with grain
- `.surface-metal` — Matte Graphite Metal: brushed metal feel, low specular
- `.edge-acid-glow` — Smoked Acrylic Edge Glow: 1px acid-lime inner ring + outer halation
- `.edge-burnt-heat` — Burnt Heat Emission: orange edge ember (urgency only)
- `.surface-carbon` — Micro-Embossed Carbon Texture: dense diagonal grain
- `.surface-topo` — Topographic Noise overlay
- `.surface-acid-emissive` — primary CTA emissive surface
- Gradient utilities: `.grad-oled-field`, `.grad-graphite-fade`, `.grad-acid-signal`, `.grad-burnt-heat`, `.grad-frosted-sheen`
- Typography rhythm utilities for editorial hero / section heads / labels / mono caps
- Motion timing tokens: `--motion-fast`, `--motion-med`, `--motion-slow`, `--ease-luxe`, `--ease-precision`

## Section plan

1. **Global canvas:** repaint `ev-unified-canvas`, body gradient, `.venom-home` backdrop in OLED Depth Field; tighten grid texture mask; reduce halation on mobile.
2. **Nav:** frosted-smoked compressed state, acid hairline above scene label, refine LangToggle inside nav surface.
3. **Hero:** preserve structural composition, repaint headline accent, swap inline portrait halation to acid signal glow, refine signal card to frosted smoked material with acid stroke.
4. **VSL stage:** keep Wistia logic untouched, redress the stage with acrylic edge glow + matte graphite frame.
5. **Cinematic scene:** preserve scroll-scrub; recolor atmosphere from green halation to acid signal restraint with smoked-graphite vignette; reduce blur/saturate cost on mobile.
6. **Mechanism / Roadmap / Founder / Offer / FAQ:** apply new glass material to existing panels; recolor copy hierarchy; refine FAQ toggle to acid lime; recolor BentoCards to OLED black glass with acid signal stroke when active.
7. **REAL PROOF:** keep the baseline stable 3-column grid (no GSAP pin); strengthen card material to frosted smoked with acid-lime edge on active; remove tilt-induced jank by trimming tilt magnitude; ensure transparency note card uses acid emissive variant.
8. **Final CTA:** acid signal halation against OLED field; CTA button uses acid emissive surface.
9. **Footer:** repaint hairline to soft warm silver; OLED background.
10. **`/apply` and `/schedule`:** repaint background gradients, dye copy hierarchy, replace lingering venom/green with acid lime; ensure forms inherit new tokens.
11. **`/confirmation`:** banner repainted to deep amber smoke; preserve scene background opacity.
12. **Mobile parity:** rely on existing media queries; tune signal card max-width to keep the hero readable; ensure REAL PROOF stacks cleanly without overflow.
13. **Arabic parity:** retain existing RTL font stack; verify line-height/headline max-width.

## QA

- `npm run typecheck`
- `npm run build`
- production server at port 3010
- 1440 / 768 / 390 viewports, EN + AR
- routes: `/`, `/apply`, `/schedule`, `/confirmation`
- VSL controls, scroll-scrub, REAL PROOF stability, no horizontal overflow

## Outputs

- `_OPUS47_PREMIUM_REBUILD_PLAN.md` (this file)
- `_OPUS47_PREMIUM_REBUILD_REPORT.md` (final report)
- `screenshots/opus47-premium-rebuild/` (QA captures)
