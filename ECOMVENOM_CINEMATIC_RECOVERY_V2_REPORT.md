# ECOMVENOM Cinematic Recovery v2 Report

Date: 2026-05-14
Branch: `recovery/ecomvenom-premium-launch-2026-05-13`

## Executive Summary

The homepage was rebuilt as an Arabic-first cinematic conversion story instead of another polish layer. The new flow is:

1. Hero with one operating-system promise, VSL, and primary application CTA.
2. Higgsfield `Chaos -> System` pinned scroll film.
3. Mechanism, roadmap, founder, real proof, offer, FAQ, and final CTA.

No fake proof assets were added. The proof rail uses existing local assets only. The schedule page remains launch-gated until `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL` is configured.

## What Changed

- Added a central v2 copy and proof metadata source in `lib/cinematicRecoveryContent.ts`.
- Replaced the homepage route with reusable v2 sections.
- Added `ScrollFilmSection` with desktop frame scrubbing from `public/frames/higgsfield-system`.
- Added mobile fallback using `public/media/chaos-system.mp4`; mobile does not load the desktop canvas frame sequence.
- Fixed the scroll-film sticky container by replacing `overflow-x: hidden` with `overflow-x: clip` on `html, body`.
- Replaced the canvas scrub logic with direct scroll progress calculation so frames advance reliably.
- Refined hero composition, typography scale, proof rail layout, nav scene labels, and mobile logo sizing.
- Hardened `/apply` so non-final steps use `type="button"` and cannot native-submit query data before hydration.
- Confirmed `/schedule` blocks fake confirmation when the provider URL is missing.

## QA Evidence

Commands run:

```bash
npm run typecheck
npm run lint
npm run build
npm audit --audit-level=moderate
npm run qa
```

Result: all passed.

Production build output:

- `/`: 12 kB route size, 198 kB First Load JS.
- `/apply`: 5.6 kB route size, 192 kB First Load JS.
- `/schedule`: 4.25 kB route size, 191 kB First Load JS.
- `/confirmation`: 2.6 kB route size, 186 kB First Load JS.
- `npm audit --audit-level=moderate`: `found 0 vulnerabilities`.

Rendered QA:

- Desktop `1440x1000`: hero, pinned Higgsfield scroll film, proof rail interaction.
- Mobile `390x844`: hero, mobile film fallback, apply flow, schedule gate.
- Interaction proof:
  - Proof card click updates `aria-pressed`.
  - Apply step 1 advances to market step without URL query submission.
  - Schedule confirm button is disabled without `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL`.

Browser note:

- The in-app Browser plugin loaded the page and DOM checks passed.
- Browser screenshot capture timed out through CDP, so rendered screenshot evidence used Playwright fallback.

## Acceptance Criteria Status

- No fake booking confirmation from `/schedule`: pass.
- Homepage no longer repeats one card pattern in every section: pass.
- Higgsfield section exists in section 2 and scrubs desktop frames: pass.
- Mobile uses lightweight fallback instead of full frame sequence: pass.
- Final CTA remains readable: pass in command/render smoke, included in page flow.
- Typecheck, lint, build, audit, and aggregate QA pass: pass.
- No new runtime dependency added: pass.
- Real assets only: pass.

## Remaining Launch Risks

- Public launch still requires a real `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL`.
- New client-requested screenshots/results should be added later through proof metadata, not placeholders.
- The repository still has a dirty worktree from prior recovery/rejected-attempt artifacts; rollback should stay file-scoped.
- Tailwind remains on the actual installed `3.4.19`; no Tailwind v4 migration was attempted.

## CTO Recommendation

This v2 recovery is ready for stakeholder review. Do not launch publicly until the real calendar provider is configured and one final production-environment QA pass confirms the schedule flow end to end.
