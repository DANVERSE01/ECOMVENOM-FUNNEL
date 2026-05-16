# ECOMVENOM Phase 0 Discovery

Date: 2026-05-15 local project context
Worktree: `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\.claude\worktrees\determined-khayyam-b7b7d7`
Dev server: `http://127.0.0.1:3000/` was already running from this worktree.

## Repo State Before Code Edits

- Branch: `main...origin/main`
- Base commit: `2392fe9 feat: cinematic recovery redesign v3 - full session merge`
- Pre-existing uncommitted state: many deleted screenshot/media files, plus untracked `public/proof/proof-shopify-dashboard.png`, `public/proof/proof-easyorders-flood.png`, `public/proof/proof-whatsapp-stats.png`, `.claude/settings.local.json`, and the recovery brief.
- Missing sprint brief: `.Codex/visual-acceleration-brief.md` does not exist in this worktree.
- Local `ui` skill exists but is placeholder-only and adds no usable implementation guidance.

## Files Mapped

- Routes: `app/page.tsx`, `app/layout.tsx`, `app/apply/page.tsx`, `app/confirmation/page.tsx`, `app/schedule/page.tsx`
- Primary sections: `components/sections/*`
- Venom components and styles: `components/venom/*`
- Cinematic components: `components/cinematic/*`
- UI components: `components/ui/*`
- Providers: `components/providers/SmoothScroll.tsx`
- Content and motion libraries: `lib/cinematicRecoveryContent.ts`, `lib/lang-context.tsx`, `lib/lenis.ts`, `lib/gsap.ts`, `lib/motion.ts`, `lib/translations.ts`, `lib/useContent.ts`
- Styles: `components/venom/tokens.css`, `components/venom/cinematic-v2.css`, `app/globals.css`

## Browser Baseline

Commands/tools used:

- `git status --short --branch`
- `git log --oneline -10`
- Playwright MCP against `http://127.0.0.1:3000/`
- Desktop viewport: 1440x900
- Mobile viewport: 390x844

Captured baseline artifacts at worktree root:

- `phase0-desktop-01-hero.png`
- `phase0-desktop-02-mid.png`
- `phase0-desktop-03-proof.png`
- `phase0-desktop-04-footer.png`
- `phase0-mobile390-01-hero.png`
- `phase0-mobile390-02-mid.png`
- `phase0-mobile390-03-proof.png`
- `phase0-mobile390-04-footer.png`
- `phase0-desktop-click-report.json`
- `phase0-mobile-390-click-report.json`
- `phase0-console-desktop.log`
- `phase0-console-mobile.log`

Console:

- Desktop: 0 errors, 0 warnings returned at `warning` level.
- Mobile 390: 0 errors, 0 warnings returned at `warning` level.

## What Works

- `/`, `/apply`, `/schedule`, and `/confirmation` return HTTP 200 locally.
- Desktop and mobile hash targets exist for `#main-content` and `#founder-vsl`.
- Current baseline click test on `#founder-vsl` does scroll to the target, but the implementation still relies on a global document anchor listener and a Next `Link` in `GlowButton`.
- Horizontal overflow at 390px baseline: `0`.
- Language toggle is present and updates document language/dir via `lib/lang-context.tsx`.

## Broken Or Incomplete

1. Hero VSL is not an embedded in-place player.
   - Owner: `components/venom/VslStage.tsx`
   - Current behavior: renders `/media/hero-vsl-poster.webp`, then opens `FloatingVslPlayer` with a Vimeo iframe after click.
   - Required behavior: direct Wistia embed in the hero frame.

2. Confirmation video is still Vimeo iframe based.
   - Owner: `components/confirmation/pre-call-video.tsx`
   - Current behavior: embeds Vimeo `1190367488`.
   - Required behavior: centered vertical Wistia player using media ID `bg446wfhed`.

3. New proof captures are present but not wired into content.
   - Owner: `lib/cinematicRecoveryContent.ts`
   - Current behavior: `proofAssets.ar` and `proofAssets.en` each contain 3 entries.
   - Required behavior: append 3 new platform captures to both languages.

4. Mobile sticky CTA does not appear on home after first viewport scroll.
   - Owner: `components/ui/StickyMobileCTA.tsx`
   - Evidence: `phase0-mobile-390-click-report.json` shows `data-visible="false"` at `y=964` and `y=6983`.
   - Likely cause: dense-content observer suppresses the bar across most of the home narrative.

5. CTA/hash handling should be made explicit in `GlowButton`.
   - Owners: `components/venom/GlowButton.tsx`, `components/providers/SmoothScroll.tsx`, `lib/lenis.ts`
   - Current behavior: baseline hash scroll works through document-level interception, but the button component itself does not handle hash navigation.
   - Required behavior: render hash `href`s as buttons and call Lenis directly with fallback native scroll.

6. Motion elevation requested by brief is incomplete.
   - Owners: `lib/motion.ts`, `components/sections/HeroSection.tsx`, `components/sections/ProofSection.tsx`, `components/venom/cinematic-v2.css`
   - Existing helpers: local split text replacement, `hooks/useMagnetic.ts`, `hooks/useCardTilt.ts`.
   - Required behavior: lib-level headline reveal, hero primary CTA magnetic wrapper, proof card tilt, and optional count-up where it does not damage caption flow.

## Implementation Plan

1. Preserve the existing Next 15 App Router and Tailwind/CSS structure.
2. Add explicit Lenis exposure and hash-aware `GlowButton` while keeping non-hash `Link` behavior.
3. Simplify home mobile sticky CTA visibility to show after hero exit and hide near final CTA/routes only.
4. Add `components/cinematic/WistiaPlayer.tsx`; replace hero and confirmation video implementations.
5. Append the three proof captures to both languages and sharpen only the requested content strings.
6. Use the installed GSAP SplitText module if typecheck accepts it; otherwise preserve the local no-club split helper pattern.
7. Add proof card tilt via a small card subcomponent and CSS transform rules.
8. Run `npm run typecheck`, `npm run lint`, and `npm run build`; then produce `AUDIT_REPORT.md` and final screenshots.
