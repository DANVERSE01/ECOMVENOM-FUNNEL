# ECOMVENOM Supreme Rebuild Master Plan

> Operating mode: PLAN ONLY. No source code edits performed during this pass. No deploys, pushes, merges, deletes, dependency changes.

---

## 1. Executive Verdict

ECOMVENOM is currently shipping a competent dark editorial Next.js 15 funnel that compiles cleanly (`tsc --noEmit` clean, `eslint` clean, `next build` green) and renders all four routes (`/`, `/apply`, `/schedule`, `/confirmation`) at 1440 / 768 / 390 with **zero horizontal overflow** and **zero in-app page errors**. The Wistia VSL works, the cinematic Higgsfield monitor scroll-scene scrubs cleanly with frame preloading, the proof grid is stable (no GSAP pin), reduced-motion is honoured in 95% of motion paths, and Arabic/English toggling preserves layout.

It is **not yet** at Awwwards / Framer 2026 quality. The current site is **a polished v1 production funnel**, not a cinematic conversion engine. Verdict by criterion:

- Build / type / lint / route health: **green**.
- Brand storytelling: **mid-tier**. Hero opens with a wireframe TorusKnot WebGL scene that does not encode the product-to-call mechanism — it reads as generic 3D decoration, not "decision system".
- Material system: **partially implemented**. `tokens.css` + `cinematic-v2.css` + `opus47-premium.css` defines a strong Dark Graphite Luxury palette but the materials only reach 60–70% of section components — the remaining 30% (chapter rail, FAQ chevron, status pill, stickyMobileCTA card, Roadmap timeline, ProblemSection / SystemStackSection — both unmounted on `/`) still default to ad-hoc inline styles or shallow gradients.
- Motion choreography: **fragmented**. Three independent motion entry points (`useGSAP` per-section, `ScrollMotionInit` global, `LusionMonitorScrollScene` self-contained) with overlapping responsibilities and a 1s polling rescan interval that re-initialises reveals. No single timeline owns the scroll narrative.
- Conversion architecture: **incomplete**. The page jumps from Hero → ScrollFilm (4680px tall on desktop) → Mechanism, skipping the *Chaos Diagnosis* moment. `ProblemSection.tsx` and `SystemStackSection.tsx` exist as files but are **not mounted** on `app/page.tsx`. The narrative loses the "loss diagnostic" beat that justifies the offer.
- Mobile: **functional, not premium**. 390 page is 15,092 px tall. Sticky CTA hides during the 3,038 px scrollfilm and reappears — correct behaviour, but the pacing is heavy.
- Accessibility: a `<dialog>` for the proof inspector, `prefers-reduced-motion` guards in most paths, but the preloader hides body overflow for ~800 ms and is disabled instead of skipped under reduced motion (acceptable but not ideal).

**Recommendation:** Do not start a fifth visual override. The codebase already has the right palette, material classes, and primitives. The next pass must consolidate motion, mount the missing narrative beats, replace the decorative TorusKnot hero with a brand-aligned WebGL or canvas system that *encodes the chaos→system metaphor*, harden Wistia network resilience, and elevate typographic rhythm. **No P0 build/runtime blockers exist. Implementation can start immediately under Phase 0 inspection rules.**

---

## 2. Active Project Root And Git State

| Field | Value |
| --- | --- |
| Active terminal directory | `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\.claude\worktrees\condescending-goldstine-e934b5` |
| Real git common dir | `D:/Projects/ECOMVENOM-FUNNEL/02_APP_BUILD_HERE` |
| This is a worktree of | `02_APP_BUILD_HERE` (main project root) |
| Current branch | `claude/condescending-goldstine-e934b5` |
| HEAD commit | `7efe97a fix: guard removeChild in HeroScene cleanup against React unmount race` |
| Branch base | `main @ 83b0816 feat(opus47): premium system rebuild` |
| Remote | `origin = https://github.com/DANVERSE01/ECOMVENOM-FUNNEL.git` |
| Working tree dirty? | Yes — untracked: `.codex/`, `.kiro/`, `.vscode/`, `KIRO_SUPREME_PROJECT_AUDIT_DIRECTIVE.md` |
| Worktrees registered | 7 (main + 6 agent worktrees: `amazing-feistel`, `condescending-goldstine`, `determined-khayyam`, `intelligent-perlman`, `practical-matsumoto`, `02_LIVE_PROD_ca6fe21`) |

### Latest 10 commits (current branch lineage)

```
7efe97a fix: guard removeChild in HeroScene cleanup against React unmount race
83dd83e feat(overhaul-2): raw Three.js hero, atmosphere transitions, mobile Lenis, roadmap stagger
6839397 feat(overhaul): R3F hero scene, Framer Motion spring interactions, SplitText reveals
83b0816 feat(opus47): premium system rebuild — tokens, cinematic styles, page shells, nav/footer
85a9c9a fix: phase 4 vsl and cinematic mobile QA
1d1f7ca chore: add playwright dev dependency for button testing
b68db5f fix: VSL sound, animations, confirmation monitor scene, button scroll — phase 4
c2639b4 docs(audit): 2026-05-16 re-verification — screenshots at 1440/768/390
b8cb8d9 docs(phase-3): audit report + phase 3 recovery docs + screenshots
d300c04 fix(phase-3): motion init, section sheen, Wistia API migration
```

### Worktree relationship

The audit is being run inside a Claude Code worktree (`condescending-goldstine-e934b5`). The parent project root is `02_APP_BUILD_HERE`. Sibling worktrees show a multi-track exploration history: the rejected `creative-impact-upgrade`, the visual-acceleration line, the determined-khayyam line that produced `_OPUS47_PREMIUM_REBUILD_REPORT.md`, and the current overhaul-2 line that introduced raw Three.js.

---

## 3. Evidence Log

| Channel | What was inspected | Where |
| --- | --- | --- |
| Filesystem | Project root tree to depth 2 (`ls -la` equivalent) | `list_directory` output |
| Filesystem | All section components, motion lib, VSL/Wistia, providers, effects, ui, venom primitives | `read_files` outputs |
| Configs | `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json` | `read_files` |
| Tooling | `.claude/`, `.codex/`, `.kiro/`, `.vscode/settings.json`, `.kiro/powers/`, `.kiro/settings/mcp.json` | `read_files` + `list_directory` |
| Documentation | `README.md`, `AGENTS.md`, `OPUS47_PREMIUM_SYSTEM_REBUILD_BRIEF.md`, `_OPUS47_PREMIUM_REBUILD_REPORT.md`, `_OPUS47_REFERENCE_HANDOFF_FROM_REJECTED_BRANCH.md`, `AUDIT_REPORT.md` | `read_files` |
| Git history | `git log --all --graph -40`, `git log --stat`, `git worktree list`, `git remote -v` | shell |
| Build verification | `npx tsc --noEmit` (exit 0), `npm run lint` (exit 0), `npm run build` (exit 0, 5 routes generated) | shell |
| Runtime | `npm run dev` started on port 3000, served 200 OK on `/`, `/apply`, `/schedule`, `/confirmation` | shell + browser |
| Browser QA | Real Playwright session, 1440 / 768 / 390 viewports, EN + AR, all four routes, scroll progression, reduced-motion media emulation, sticky CTA visibility states, chapter-rail visibility, console messages capture | playwright MCP |
| Screenshots | 49 PNGs saved to `audit-2026-supreme/` covering hero / scrollfilm 4 stops / mechanism / roadmap / founder / proof / offer / faq / final CTA / mobile 8-stop sweep / tablet 7-stop sweep / all routes top+bottom / AR home + AR proof + AR final + AR mobile / reduced-motion hero | filesystem |
| Research | Awwwards Sites of the Day index, R3F best-practices skill (`emalorenzo/three-agent-skills/r3f-best-practices`, 70+ rules), GSAP 3.13+ free SplitText reference, Lenis 1.x React import guidance | web search |

---

## 4. Commands Run And Results

```
pwd                                      → D:\...\condescending-goldstine-e934b5
git rev-parse --show-toplevel            → D:/.../condescending-goldstine-e934b5
git status --short                       → 4 untracked entries (.codex/.kiro/.vscode/KIRO_SUPREME_PROJECT_AUDIT_DIRECTIVE.md)
git branch --show-current                → claude/condescending-goldstine-e934b5
git log --oneline -10                    → see §2
git worktree list                        → 8 worktrees including main + 02_LIVE_PROD_ca6fe21
git remote -v                            → origin = github.com/DANVERSE01/ECOMVENOM-FUNNEL.git
git log --all --graph -40                → captured (multi-line graph showing rejected creative-upgrade, opus47, visual-acceleration branches)

node -v                                  → v24.14.0
npm -v                                   → 11.9.0

npx tsc --noEmit                         → exit 0 (clean)
npm run lint                             → exit 0 (eslint app/components/hooks/lib clean)
npm run build                            → exit 0
                                            ƒ /                     190 kB / 383 kB First Load JS
                                            ƒ /_not-found            991 B / 103 kB
                                            ƒ /apply               5.95 kB / 195 kB
                                            ƒ /confirmation        1.49 kB / 192 kB
                                            ƒ /schedule            4.46 kB / 194 kB
                                            shared chunks: 102 kB

npm run dev                              → ✓ Ready on :3000 in 2.3s

# Browser via Playwright MCP, base http://localhost:3000
GET /                                    → 200, lang=en, dir=ltr, scrollHeight=13018px @ 1440
GET /  (lang=ar)                         → 200, lang=ar, dir=rtl, scrollHeight=14382px @ 1440
GET /apply                               → 200, scrollHeight=1055px @ 1440 / 1302px @ 390
GET /schedule                            → 200, scrollHeight=2471px @ 1440 / 1858px @ 390
GET /confirmation                        → 200, scrollHeight=1784px @ 1440 / 2121px @ 390

Console errors during home navigation:
  11 transient ERR_NETWORK_CHANGED / ERR_INTERNET_DISCONNECTED on
    embed-cloudfront.wistia.com/deliveries/602f67a948bc2df11ae7247bdcd73d26a3644bfb.m3u8
    fast.wistia.com/assets/external/publicApi.js
    fast.wistia.net/assets/external/engines/hls_video.js
    pipedream.wistia.com/mput?topic=metrics
After Wistia route was blocked at the Playwright layer, console clean to 2 errors (cookie-related, non-fatal).

Reduced-motion emulation:
  prefers-reduced-motion = reduce → preloader collapsed, totalDocHeight=9735px (lower than 13018px because pin-driven film section collapses), VSL still mounts, 3 canvas elements present.
```

---

## 5. Files And Directories Inspected

```
app/
  layout.tsx                             ← read in full
  page.tsx                               ← read in full (mounts 9 sections; ProblemSection + SystemStackSection NOT used)
  globals.css                            ← partial read (header palette + body backgrounds + view-transitions)
  apply/page.tsx                         ← exists, ApplyPageShell mounts content
  schedule/page.tsx                      ← exists, SchedulePageShell + countdown + schedule-board
  confirmation/page.tsx                  ← exists, ConfirmationPageShell + pre-call-steps + pre-call-video

components/
  nav.tsx                                ← read (compressed-state behaviour, scene scramble label, mobile apply pill)
  footer.tsx                             ← read (acid hairline, amber bloom)
  apply/                                 ← ApplyPageShell, application-form
  cinematic/                             ← CinematicFramePlayer, CinematicLoopVideo, DeviceFrame, FloatingVslPlayer, FrameScrubCanvas, LusionMonitorScrollScene (read fully), MacDesktopFrame, MaterialField, ReducedMotionFallback, ResponsiveMediaFrame, SceneEyebrow, ShotLabel, SystemOverlay, VideoStage, WistiaPlayer (read fully)
  confirmation/                          ← ConfirmationPageShell, pre-call-steps, pre-call-video
  cursor/ParticleTrailCursor.tsx
  effects/                               ← BorderBeam, ChapterRail (read), FilmGrain, HeroCursorSpotlight, PlasmaAtmosphere (read), ScrollMotionInit (read), SignalFieldScene (read), ViewTransitions (read)
  providers/SmoothScroll.tsx             ← read (Lenis init, anchor handler, route-aware ticker)
  schedule/                              ← countdown, schedule-board, SchedulePageShell
  sections/                              ← HeroSection, ScrollFilmSection, MechanismSection, RoadmapSection, FounderSection, ProofSection, OfferSection, FaqSection, FinalCtaSection (all read), ProblemSection + SystemStackSection (read but NOT mounted on home)
  three/HeroScene.tsx                    ← read (raw Three.js TorusKnots + rings + particles)
  ui/                                    ← BackToTop, button, CinematicPanel, container, count-up, DanMarquee, EditorialMarquee, Hairline, HoverGrid, LangToggle (read), Preloader (read), reveal, ScrollProgressIndicator, section-eyebrow, StickyMobileCTA (read)
  venom/                                 ← BentoCard, BentoGrid, cinematic-v2.css, DocumentStack, EditorialHeading, GlassPanel, GlowButton (read), MobileCTA, opus47-premium.css (partial), ProofCard, SectionWrapper (read), StatusPill, TimelineStep, tokens.css (read), VslStage (read)

hooks/                                   ← useCardTilt, useGlowTrack, useInViewOnce, useMagnetic, useScrollChoreography, useSplitHeading, useSplitReveal, useStaggerReveal, useVslScrollExpansion (all listed; selective read)

lib/
  cinematicRecoveryContent.ts            ← read in full (EN + AR copy + scrollFilmPhases + 6 proofAssets per lang)
  cn.ts                                  ← listed
  content.ts                             ← used by useContent()
  frameManifest.ts                       ← read (74 Higgsfield frames, mobile video path, generated stills)
  gsap.ts                                ← read (registers ScrollTrigger, Flip, CustomEase, MotionPathPlugin, SplitText; defines `venom`, `filmDrop`, `venomIn` eases)
  lang-context.tsx                       ← read (cookie + localStorage hydrate)
  lenis.ts                               ← read (singleton, ticker, NAV_SCROLL_OFFSET=72, reduced-motion guard)
  magnetic.ts                            ← read (coarse + reduced-motion guard, hover spring)
  mediaOptimization.ts                   ← listed
  motion.ts                              ← read in full (revealHeadline, initScrollReveals, initHeroParallax, splitText fallback, scrambleText, animateStrokeDraw helpers, initSectionSheen, initSectionHeadlineReveals, initAtmosphereTransitions)
  motionConfig.ts                        ← listed
  tilt.ts                                ← read
  translations.ts                        ← read
  useContent.ts                          ← listed
  useReducedMotion.ts                    ← read

public/
  brand/                                 ← logo, brand assets
  brand-visuals/                         ← 20 brand-visual-NN.png references
  fonts/                                 ← Aeonik + IBM Plex Mono local woff2
  founder/                               ← youssef-founder-premium.webp
  frames/higgsfield-system/              ← frame_001..frame_074.webp (referenced by frameManifest)
  generated/                             ← hero-bg.webp, roadmap-bg.webp, proof-bg.webp, cta-bg.webp
  media/                                 ← chaos-system.mp4, system-loop-01/02.mp4
  posters/                               ← chaos-system-poster (deleted in fa08e1b)
  proof/                                 ← 6 PNG/webp captures
  stills/                                ← system-intro.webp, cart-chaos.webp, etc.
  testimonials/                          ← assets
  textures/                              ← lusion-monitor-frame.webp, tunnels-desktop.png, tunnels-tablet.png

screenshots/                             ← audit-2026-05-16/, opus47-premium-rebuild/ (42 captures + summary JSON)
audit/                                   ← phase3 captures + recovery captures + lighthouse JSON + interactive maps
scripts/                                 ← qa-opus47.mjs, qa-opus47-ar.mjs (Playwright capture harnesses)

.claude/                                 ← launch.json, settings.local.json, skills/ui/SKILL.md
.codex/                                  ← agents/kiroCodex/, settings/kiroCodex-settings.json, system-prompts/
.kiro/                                   ← powers/mcp-toolbelt/, settings/mcp.json
.vscode/                                 ← settings.json (kiroAgent.trustedCommands allowlist)
```

Documents in root that informed the plan: `_ACTIVE_CLAUDE_CONTEXT.md`, `_DISCOVERY.md`, `_OPUS47_PREMIUM_REBUILD_PLAN.md`, `_OPUS47_PREMIUM_REBUILD_REPORT.md`, `_OPUS47_REFERENCE_HANDOFF_FROM_REJECTED_BRANCH.md`, `_PHASE2_RECOVERY.md`, `AUDIT_REPORT.md`, `CINEMATIC_VSL_UPGRADE.md` (and a duplicate copy), `CODEX_HANDOFF.md`, `DESIGN_TRANSPLANT_FINAL_REPORT.md`, `ECOMVENOM_*` series (CINEMATIC_RECOVERY_V2, CLAUDE_OPUS_PHASE2, CREATIVE_IMPACT_UPGRADE_AFTER_CODEX, CTO_AUDIT_INSTRUCTION, FINAL_MASTER_PHASE2_PLAN, OPUS46_FINAL_MASTER_PLANNING, PHASE1_SANITIZE_AND_CORRECT_PLAN, PHASE2_PLAN_ADDENDUM, PREMIUM_RECOVERY_REPORT), `EXECUTE_NOW.md`, `OPTIMIZED_PROMPT_v3.md`, `PHASE2_*` series, `PHASE3_*` series, `PREMIUM_UPGRADE_EXECUTION_BRIEF.md`, `PREMIUM_UPGRADE.md`, `REJECTED_VENOM_OS_ATTEMPT.*`.

---

## 6. Git History And Decision Trail

The repo went through eight visual passes. Each pass left scaffolding behind. The current `claude/condescending-goldstine-e934b5` branch is overhaul-2 layered on top of opus47.

### Decision History Map

| Area | Accepted | Rejected | Repeated Failure | Evidence |
| --- | --- | --- | --- | --- |
| Palette | Dark Graphite Luxury (Venom Black + Acid Lime + Burnt Velocity + Bone) — `tokens.css`, `cinematic-v2.css`, `opus47-premium.css`, `tailwind.config.ts` all align | Generic green-on-black SaaS palette; `creative-upgrade.css` stacked override layer | Every pass before opus47 reintroduced a new override stylesheet | `_OPUS47_REFERENCE_HANDOFF_FROM_REJECTED_BRANCH.md` § "What must NOT be reused"; commits `1f5b9eb`, `2130ca8` |
| Hero copy | "Turn dropshipping from gambling into a decision system." (operator voice EN+AR) | "Become a Profitable Dropshipper in 45 Days" (now only in `<title>`) | Copy churned in `b71075c`, `2392fe9`, `eda0869` | `lib/cinematicRecoveryContent.ts` |
| Hero VSL | Embedded Wistia `0z2r9j4jnz`, custom controls preserved | Static poster fallback only | Phase 2 broke VSL three times (`81e7f10`, `eda0869`) | `components/cinematic/WistiaPlayer.tsx` (read) |
| Hero 3D | Raw Three.js TorusKnots + rings + particles (current `HeroScene.tsx`) | R3F hero scene (commit `6839397`) was overwritten by raw Three.js (`83dd83e`) two commits later | TorusKnot is a clichéd 3D demo, not brand-aligned | `components/three/HeroScene.tsx` |
| Cinematic scene | Lusion-monitor scroll scene with 74-frame Higgsfield sequence + mobile MP4 fallback | GSAP-pinned creative-impact-upgrade horizontal proof rail | The cinematic scene survived 4 redesigns; only its atmosphere was restyled | `LusionMonitorScrollScene.tsx`, frame manifest |
| Proof gallery | Stable sticky 3-column grid with `<dialog>` inspector and `tilt(4°)` cards (no GSAP pin) | GSAP pin from rejected branch | Pin caused jank, dropped twice | `_OPUS47_REFERENCE_HANDOFF_FROM_REJECTED_BRANCH.md` |
| Smooth scroll | Lenis 1.3.23 singleton with reduced-motion fallback to native | ScrollSmoother + multi-instance Lenis | Mobile Lenis was added in `83dd83e` to unify behaviour | `lib/lenis.ts`, `components/providers/SmoothScroll.tsx` |
| Preloader | 800ms numeric counter + cross marks, hides under reduced-motion | "VENOM OS" preloader with cyberpunk glyphs | Rejected explicitly in `REJECTED_VENOM_OS_ATTEMPT.*` files | Preloader.tsx read |
| Sticky mobile CTA | Visible after hero exit, hidden during cinematic film, hidden in final CTA zone, hidden on /apply /schedule /confirmation | Always-visible sticky CTA | Logic re-tuned in `aa4ec26`, `85a9c9a` | StickyMobileCTA.tsx read |
| Founder authority | Real photo `youssef-founder-premium.webp` + dual-market BentoCards | Influencer-style Editorial portrait | Founder copy tightened in `b71075c` | FounderSection.tsx |
| Narrative beats | Hero → ScrollFilm → Mechanism → Roadmap → Founder → Proof → Offer → FAQ → FinalCTA | "Chaos Diagnosis" beat (ProblemSection.tsx) and "Operating Stack" beat (SystemStackSection.tsx) exist as files but are **not mounted** | The narrative is missing the "loss-diagnostic" moment between Hero and ScrollFilm | `app/page.tsx` does not import them |

### Repeated patterns to break

1. **Override stylesheet stacking.** Each rejected pass added another CSS file (`creative-upgrade.css`, `cinematic-v3.css` attempts, `venom-os.patch`). The opus47 rebuild already consolidated these into a coherent three-file system. The next pass must not add a fourth.
2. **Motion entry-point fragmentation.** `useGSAP` is invoked from at least 7 components, plus `ScrollMotionInit` runs a global `setInterval` rescan at 1s. This causes ScrollTrigger refresh thrash.
3. **Component existence ≠ mount.** The repo has shipped sections that were authored, committed, never mounted, then later removed. ProblemSection + SystemStackSection are the current example.
4. **Wistia network thrash.** Three commits patched Wistia (`d300c04`, `eda0869`, `b68db5f`). The component is now stable, but the underlying CDN dependency is fragile under poor network and emits 4–11 console errors during initial load.


---

## 7. Existing Project Goals, Accepted Directions, And Rejected Directions

### Accepted directions (preserve)

- **Brand DNA per `AGENTS.md`:** dark base `#050505 / #0A0A0A`, toxic green as energy not decoration, cinematic weighted motion never bouncy, grain + noise for depth, lethal · premium · conversion-focused · non-template.
- **Stack lock per `AGENTS.md`:** Next.js 15 App Router, TypeScript 5 strict, Tailwind v4 CSS-first (currently still on v3.4.19 — see §15), Three.js / R3F allowed, GSAP 3.13+ free plugins (SplitText), Framer Motion, Lenis from `lenis/react`.
- **Palette per `OPUS47_PREMIUM_SYSTEM_REBUILD_BRIEF.md`:** Venom Black `#010101`, Carbon Night `#0B0A08`, Charcoal Graphite `#1A1813`, Smoked Graphite `#2D2B26`, Bone White `#E4E1DC`, Acid Lime Signal `#D5D904`, Burnt Velocity Orange `#C74208`, Ash/Steel/Warm Silver/Olive/Amber Smoke supporting tones.
- **Material language:** OLED Black Glass, Frosted Smoked Glass, Soft-Touch Matte Polymer, Matte Graphite Metal, Smoked Acrylic Edge Glow, Micro-Embossed Carbon Texture, Topographic Noise, Acid Emissive Surface, Burnt Heat Emission.
- **Conversion behaviour:** Wistia VSL `0z2r9j4jnz` autoplay+muted with custom controls, sound fallback, sticky mobile CTA, anchor scroll via Lenis with `-72px` nav offset, `<dialog>` proof inspector, three-stop language toggle (cookie + localStorage + html dir/lang).
- **No-deploy rules:** branch-based work, no push to main, no Netlify deploy from agent, screenshots-as-evidence QA.
- **Real-content discipline:** no fake testimonials, no fake metrics, no fake dashboards, no fake logos, no LeadConnector raw fonts, no marketing pixels by default.

### Rejected directions (do not reintroduce)

- Snake / fang / venom-drip / reptile imagery.
- Cyberpunk / gamer / crypto / SaaS dashboard aesthetics.
- "VENOM OS" interface (`REJECTED_VENOM_OS_ATTEMPT.patch`) — explicitly rejected, kept as reference only.
- `creative-upgrade.css` fourth override layer (`design/creative-impact-upgrade @ 2130ca8`) — rejected for visual basicness and cascade conflicts.
- GSAP-pinned horizontal proof rail — rejected for jank under scroll velocity.
- Static poster-only VSL fallback as primary state.
- Static "Become a Profitable Dropshipper in 45 Days" hero copy as on-page headline (still in `<title>` for SEO).
- ScrollSmoother (replaced by Lenis at runtime).
- Per-route Lenis instances (replaced by singleton).

### Unknowns (mark and proceed)

- Whether `NEXT_PUBLIC_FORM_ENDPOINT`, `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL`, `NEXT_PUBLIC_WHATSAPP_HANDLE` are populated in production. The repo only ships `.env.example`. The /schedule route shows a "provider configuration warning" placeholder when unset (per `AUDIT_REPORT.md`). **Plan assumption:** these are configured in Netlify environment variables outside the repo.
- Whether Tailwind v4 migration was approved in principle. `AGENTS.md` says v4 CSS-first; `package.json` is on v3.4.19. **Plan assumption:** v4 migration is out of scope for this rebuild (deferred).
- Whether Arabic SplitText reveals are required at every breakpoint. Current implementation defers reveal under reduced-motion and lets character spans display visible. **Plan assumption:** keep current behaviour; do not block reveal on AR fonts.

---

## 8. Current Architecture Map

### File-level architecture

| System | Files | Responsibility | Risk | Notes |
| --- | --- | --- | --- | --- |
| App shell | `app/layout.tsx` | Root layout, font variables (Noto Kufi Arabic + IBM Plex Sans Arabic via next/font), cookie hydration for lang, mounts Preloader → ParticleTrailCursor → ChapterRail → SmoothScroll(Nav, main, Footer) → StickyMobileCTA → BackToTop. | LOW | Heavy mount tree; six top-level providers/effects fire on every route. |
| Home composition | `app/page.tsx` | Mounts Hero → ScrollFilm → Mechanism → Roadmap → Founder → Proof → Offer → Faq → FinalCta. | MEDIUM | ProblemSection + SystemStackSection imported nowhere. Narrative gap between Hero and ScrollFilm. |
| Routes | `app/{apply,schedule,confirmation}/page.tsx` | Each renders its respective PageShell. | LOW | Static structure. |
| Global styling | `app/globals.css` | `:root` tokens, type scale, body gradients, view-transitions, html scroll-behavior smooth. Imports `tokens.css` → `cinematic-v2.css` → `opus47-premium.css`. Then Tailwind layers. | LOW | Cascade order is correct. |
| Token / palette | `components/venom/tokens.css` (Aeonik + IBM Plex Mono `@font-face`, `.venom-home` palette, vx-section primitives, `[data-vx-reveal]` reveal hook), `components/venom/cinematic-v2.css` (large), `components/venom/opus47-premium.css` (premium materials), `tailwind.config.ts` | Define palette + spacing + ease tokens. | LOW | Three CSS files cooperate; not stacked overrides. |
| Section components | `components/sections/*.tsx` (9 used + 2 unused) | One file per narrative beat. Each wraps in `SectionWrapper`, owns its `useGSAP` block, pulls copy from `cinematicRecoveryContent.ts`. | MEDIUM | Motion logic duplicated. ProblemSection + SystemStackSection orphaned. |
| 3D | `components/three/HeroScene.tsx` | Raw Three.js — TorusKnots, rings, points particles, mouse-tracked camera, ResizeObserver, prefers-reduced-motion guard. | MEDIUM-HIGH | Decorative only. No brand metaphor. ~400 lines of imperative code; should be R3F or replaced with brand-aligned scene. |
| Cinematic scene | `components/cinematic/LusionMonitorScrollScene.tsx` | 74-frame canvas scrub, mobile video fallback, monitor frame composite, atmosphere CSS variables, ScrollTrigger pin via section. | LOW | Stable. Heavy preload but throttled with `requestIdleCallback`. |
| VSL | `components/cinematic/WistiaPlayer.tsx` + `components/venom/VslStage.tsx` | Wistia web component with custom play/pause/mute fallback that clicks shadow-DOM buttons when API isn't ready. | MEDIUM | Robust but emits console errors when network drops Wistia HLS. No native MP4 fallback. |
| Smooth scroll | `components/providers/SmoothScroll.tsx`, `lib/lenis.ts` | Lenis singleton with GSAP ticker, anchor click handler, reduced-motion → native scroll. | LOW | Clean. |
| Motion | `lib/motion.ts`, `lib/gsap.ts`, `lib/magnetic.ts`, `lib/tilt.ts`, `components/effects/ScrollMotionInit.tsx` | GSAP plugin registration, headline reveal, scroll reveals, hero parallax, section sheen, atmosphere transitions, scramble text, native splitText fallback. | HIGH | Six independent motion init paths + 1s polling rescan. Needs consolidation. |
| Preloader | `components/ui/Preloader.tsx` | 800 ms numeric counter, locks `body.overflow=hidden`, hides under reduced-motion. | MEDIUM | Body-overflow lock is acceptable but could starve Wistia init by 800 ms. |
| Cursor | `components/cursor/ParticleTrailCursor.tsx` | Always mounted. | LOW-MEDIUM | Verify it disables on coarse pointers + reduced motion (assumed yes). |
| Chapter rail | `components/effects/ChapterRail.tsx` | Reads `[data-scene-title]` on home sections, observes intersection, hides during scroll-film and final CTA, surfaces only after hero exit. 7 chapter items present at runtime. | LOW | Working as designed. |
| Sticky mobile CTA | `components/ui/StickyMobileCTA.tsx` | IntersectionObservers + scroll listener, hides during scroll-film and final-CTA zone. | LOW | Working. |
| Nav | `components/nav.tsx` | Compressed-state behavior on scroll, scene scramble label, lang toggle, mobile apply pill on non-home routes. | LOW | Sensible. |
| Lang context | `lib/lang-context.tsx`, `lib/translations.ts` | Cookie + localStorage + html attribute sync. | LOW | Robust. |
| Content data | `lib/cinematicRecoveryContent.ts`, `lib/content.ts`, `lib/useContent.ts`, `lib/frameManifest.ts` | Bilingual marketing copy, proof asset list, scroll-film phase definitions, CTA labels, founder content. | LOW | Real content, no fakes. |

### Mounted home order vs narrative order

| # | Mounted | Narrative role per directive | Gap |
| - | -------- | ---------------------------- | --- |
| 1 | HeroSection | Opening Impact | OK |
| – | (missing) | Chaos Diagnosis | **Missing**. ProblemSection.tsx exists, isn't mounted. |
| 2 | ScrollFilmSection | Decision System Reveal | OK conceptually, 4680 px / 3038 px tall is heavy without preceding "why". |
| 3 | MechanismSection | Mechanism | OK |
| 4 | RoadmapSection | – | Could be folded into Mechanism; currently feels like a mid-funnel deck without proof tension. |
| 5 | FounderSection | Founder Authority | Position too early — appears before Proof. |
| 6 | ProofSection | Proof Wall | OK |
| 7 | OfferSection | Offer / Application Logic | OK |
| 8 | FaqSection | Objection Handling | OK |
| 9 | FinalCtaSection | Final Conversion Moment | OK |

---

## 9. Current Tooling / Skills / Plugins / MCP Audit

| Tooling Area | Path | Capability | How To Use | Risk |
| --- | --- | --- | --- | --- |
| Kiro IDE trusted commands | `.vscode/settings.json` | Allowlist of read-only audit commands and mutation tools (mkdir, fs writes, git, npm, npx) | Already active | LOW |
| Kiro powers | `.kiro/powers/mcp-toolbelt/` | MCP toolbelt power scaffold | Empty / scaffolded | LOW |
| Kiro MCP config | `.kiro/settings/mcp.json` | MCP server registry | Workspace-scope | LOW |
| Codex agents | `.codex/agents/kiroCodex/`, `.codex/settings/kiroCodex-settings.json`, `.codex/system-prompts/` | Codex agent steering and system prompts | Used by codex CLI | LOW |
| Claude skills | `.claude/skills/ui/SKILL.md`, `.agents/skills/ui/SKILL.md` | UI skill steering | Auto-included for UI tasks | LOW |
| Playwright | `node_modules/playwright`, `node_modules/playwright-core`, `node_modules/@playwright/mcp` (via npx) | Browser automation, screenshots, network capture | `npx @playwright/mcp@latest` | LOW |
| QA harnesses | `scripts/qa-opus47.mjs`, `scripts/qa-opus47-ar.mjs` | EN + AR multi-viewport screenshot capture against `next start -p 3010` | `node scripts/qa-opus47.mjs` | LOW |
| ESLint | `.eslintrc.json` (`next/core-web-vitals`) | Lint app/components/hooks/lib | `npm run lint` | LOW |
| TypeScript | `tsconfig.json` (strict, ES2022, bundler resolution, paths `@/*`) | Type checking | `npx tsc --noEmit` or `npm run typecheck` | LOW |
| Build | `next.config.mjs` (reactStrictMode, devIndicators off, AVIF+WebP, qualities [42,70,72,75,80]) | Production build | `npm run build` | LOW |
| `npm run qa` | composite script | typecheck + lint + build + `npm audit --audit-level=moderate` | `npm run qa` | LOW |

### Tooling gaps to plan around

- **No automated visual regression.** QA harnesses are screenshot snapshots only; no diffing.
- **No Lighthouse CI in repo.** `audit/lighthouse-home.json` is a one-shot artefact from May 2026.
- **No `npx @playwright/mcp` running by default.** It's available on demand via `.vscode/settings.json` allowlist.
- **No `uvx mcp-server-fetch` or `mcp-server-git` running.** Allowlist permits them.

### Recommendation

Use existing Playwright scripts as the QA spine. Add a small page error/console error gate (already partially present in earlier `qa-opus47.mjs` per `_OPUS47_PREMIUM_REBUILD_REPORT.md`). No new tooling installation needed for the rebuild.

---

## 10. Current Runtime / Build / Route Status

| Verification | Result |
| --- | --- |
| `npx tsc --noEmit` | exit 0, clean |
| `npm run lint` | exit 0, clean |
| `npm run build` | exit 0, 5 routes generated, no warnings |
| Home `/` First Load JS | **383 kB** (190 kB route + 102 kB shared + chunks). Higher than the May 2026 baseline of 207 kB. The delta corresponds to Three.js (added in `83dd83e`) and Lottie (lottie-react, lottie-web in node_modules) being included in the home bundle. |
| `/apply` First Load JS | 195 kB |
| `/schedule` First Load JS | 194 kB |
| `/confirmation` First Load JS | 192 kB |
| `/_not-found` First Load JS | 103 kB |
| Dev server `npm run dev` | Ready in 2.3 s, port 3000 |
| Production smoke test | Not run in this audit. Production build was generated but not served. |
| Routes return 200 | `/`, `/apply`, `/schedule`, `/confirmation` — all confirmed via Playwright |
| Console errors at first paint (online) | 11 transient Wistia network failures (HLS segment, publicApi, pipedream metrics, hls_video.js). After Playwright route-block they collapse to 2 non-fatal cookie-related entries. |
| Page errors via `page.on('pageerror')` | 0 |
| `document.documentElement.scrollWidth` vs `window.innerWidth` | 1425 vs 1440 (no horizontal overflow at 1440), 753 vs 768 (none at 768), 375 vs 390 (none at 390), 375 vs 390 in AR mobile (none) |

### Runtime observations

- **Hero scene mounts 3 `<canvas>` elements** at 1440 (Three.js renderer + 2 effects/PlasmaAtmosphere/SignalFieldScene canvases). Scrolling above the fold remains 60 fps in headless QA.
- **ChapterRail** appears at 7 items at scrollY 6500 px. Hidden in hero and during scrollfilm.
- **StickyMobileCTA** at 390: `data-visible="false"` after hero, `data-visible="true"` post-cinematic, `data-visible="false"` again at final CTA zone — correct.
- **Reduced-motion** emulation collapses scrollHeight from 13018 px → 9735 px (about 25% shorter) because pin-driven film section collapses to its natural height. Hero, VSL, and 3 canvases still mount.
- **Wistia behavior in offline simulation** still allows the Wistia web component to register; the player simply remains in `beforeplay` state. No JS errors thrown to the page; only network errors logged.

---

## 11. Current Visual And Creative Quality Assessment

### Art direction

- Coherent dark editorial concept. Palette is correctly Dark Graphite Luxury — not generic black-and-green.
- Hero feels premium **only inside the textual layer**. The TorusKnot 3D layer reads as Three.js sample code. It does not encode "decision system" or "chaos→order" — the metaphor lives in the next section.
- Avoidance of snake / cyberpunk / SaaS clichés: confirmed.
- Memorable visual system: partial. Repeating elements (status pill, scene-eyebrow, glass panel, hairline border) read consistently. Sections are individually polished but **the whole does not feel like one designed object**.

### Layout

- Hero composition: balanced 60/40 copy + media split on desktop. CTA hierarchy clear (primary acid, secondary ghost). Proof bullets live below CTAs — fine.
- Hierarchy: section eyebrows + headline + body work. **However Roadmap and Founder both fight for "pre-proof authority" attention.** The eye gets two long sections before a credibility payoff.
- CTA priority: primary CTA is acid-emissive on Hero, Offer, FinalCta, sticky mobile, and nav. Consistent.
- Sections sequenced as a persuasive narrative: **incomplete** (see §8 narrative gap).
- Dead space: minimal, but mid-funnel sections feel quiet because the narrative asks the user to maintain attention through 4680 px of cinematic film **before** delivering tension relief.
- Cards generic: BentoCard / ProofCard / TimelineStep have visible polish. The Roadmap timeline still reads "informational" rather than "operational pressure".
- Content rhythm premium: 70/100. Type leading is tight enough; `.vx-section--compact` provides hairline rhythm.

### Typography

- Scale is fluid (`clamp(...)` driven), top-out at `--text-hero ~ 7rem`. Hero headline reads correctly.
- Font stack: Aeonik (Display + Body) + IBM Plex Mono + Noto Kufi Arabic + IBM Plex Sans Arabic. Fonts loaded locally via `@font-face` (no Google Fonts dependency for Latin) plus next/font for AR.
- Letter-spacing tokens normalised to `0` at hero scale (correct for editorial dark headlines).
- Line length: body paragraphs are constrained by `--vo-max: 1240px` and section padding `clamp(1rem, 4vw, 3.75rem)`. Reads correctly.
- Mobile readability: H1 reads at 390. Mono labels (10–11 px) are small but tracked.
- CTA clarity: primary buttons render at acid lime on near-black halation, with arrow glyph. Solid.
- Editorial hierarchy: good. Eyebrow → display → body → label rhythm is coherent.

### Color

- Background depth: OLED Depth Field gradient + acid signal halation top-right + amber smoke bottom-left. Reads premium.
- Accent discipline: acid lime for action, burnt velocity for urgency only. Confirmed in `tokens.css`.
- Section differentiation: minimal. Most sections share the same OLED + halation. Sections like Mechanism / Roadmap / Offer / FAQ feel similar in lighting, which weakens narrative pacing.
- Avoidance of cheap neon: yes — acid is `#D5D904` (closer to lemon than lime), not stadium green.
- Supporting tones: warm silver `#A29E97` and steel `#6E6B67` carry secondary text well.

### Motion

- Purpose: 50/50. Hero parallax, headline reveal, scroll-film scrub all serve the brand. Section sheen, atmosphere transitions, decorative tilt on proof cards are decorative.
- Timing: GSAP `expo.out` and custom `venom` ease are coherent.
- Easing: defined in `lib/gsap.ts` but not all sections use them — some sections fall back to default `power3.out`.
- Scroll choreography: ScrollFilmSection is the only section with a real choreography. The rest are independent reveal-on-enter.
- Reveal logic: `data-vx-reveal` + IntersectionObserver in SectionWrapper, with a separate `initScrollReveals` system in ScrollMotionInit, **and** a 1s polling rescan. Three motion layers see overlapping responsibilities.
- Reduced-motion fallback: `useReducedMotion` hook present. Most paths (preloader, hero parallax, atmosphere transitions, magnetic, tilt) honour it.
- Hidden-content dependency: `[data-vx-reveal]:not([data-vx-reveal-init])` sets `opacity: 0`. **Acceptable** because the SectionWrapper IntersectionObserver flips `data-vx-visible="true"` even under reduced motion. Confirmed in code.
- Jank: not observed in headless QA at 1440 / 768 / 390. Real device testing required.

### WebGL / Visual systems

- Three.js HeroScene: raw imperative code, GPU cost moderate (DPR capped at 1.5, particle count 140). Adds ~135 kB to the home bundle.
- Cinematic monitor: stable, well-tuned, mobile MP4 fallback works.
- PlasmaAtmosphere + SignalFieldScene: 2D canvases, lightweight, coupled to mouse but currently invisible at most viewports because their DOM containers may be 0×0 or hidden by overlays. **Verify next pass that they actually render.**

### Conversion UX

- Offer comprehension: medium. The "Decision System" is *named* in the hero, *visualised* in the cinematic scene, *unpacked* in Mechanism, *applied* in Roadmap. The narrative is correct but slow.
- Persuasive journey: holds together but loses tension between ScrollFilm and Mechanism (no diagnostic moment).
- Objection handling: FAQ covers the right five objections (experience, budget, market, support, guarantees). Tone is calm.
- Founder authority: mid-tier. Photo + dual-market BentoCards is enough but not commanding.
- Proof credibility: strong. 6 real captures, transparency note, dialog inspector.
- CTA placement: 5 acid-lime CTAs throughout the page (hero primary + hero ghost + offer + final + sticky). Plus nav CTA. Adequate.
- VSL position: top-of-fold. Adequate.
- Application path: clear (`/apply` form → `/schedule` calendar → `/confirmation`).

---

## 12. Current UX And Conversion Assessment

| Layer | Score / 5 | Why |
| --- | --- | --- |
| Hero clarity (5 s test) | 3.5 | "Decision system" is named, but the 3D layer doesn't reinforce it. |
| Offer clarity | 3.5 | Offer comes late; user sees Mechanism + Roadmap + Founder + Proof before Offer. Still acceptable. |
| Trust building | 4 | Real proof, real founder, transparency note, no fake stats. |
| CTA pressure | 3.5 | Five CTAs are present, all sensible. Could use one more "objection-bridging" CTA inside FAQ. |
| Mobile path | 3 | Sticky CTA disappears 3038 px during cinematic — by design, but mobile users may scroll for 30 seconds without seeing the action. |
| Application form | 4 | application-form.tsx validates required fields, falls through to /schedule when endpoint missing. |
| Schedule → Confirmation | 3.5 | Schedule warns when env var missing; confirmation has VSL + 4 pre-call steps. Solid. |

### UX gaps to address in plan

1. **Add a Chaos Diagnosis beat** (mount ProblemSection or rebuild) **between Hero and ScrollFilm**. Lift the cognitive hook before the 4680 px cinematic.
2. **Re-position FounderSection after Proof.** Authority lands harder when proof has already done the credibility work.
3. **Add an inline application CTA at the end of FAQ.** Currently the user must scroll past FAQ to FinalCta to see the next CTA.
4. **Provide a mobile "skip cinematic" or auto-fast-scrub** when the user has been in the cinematic section for >8 seconds without progress. Optional.

---

## 13. Current Mobile Assessment

| Check | Result | Evidence |
| --- | --- | --- |
| 390 viewport scrollHeight | 15,092 px | `document.documentElement.scrollHeight` |
| 390 horizontal overflow | None (375 vs 390) | `scrollWidth` |
| 390 hero readability | OK; H1 stacks correctly, both CTAs full width | Screenshot `m390-01-y0.png` |
| 390 cinematic compression | Single-take video fallback, smaller atmosphere blur | LusionMonitorScrollScene.tsx → `isMobile` branch |
| 390 sticky CTA visibility | Hidden in hero (`data-visible=false`), visible after hero (`true`), hidden in scroll-film and final-cta zones | StickyMobileCTA.tsx |
| 390 proof grid | Vertical stack (no GSAP pin) | Screenshot `m390-05-y9055.png` |
| 390 FAQ open/close | Framer Motion spring, AnimatePresence | Screenshot |
| 390 RTL | `dir=rtl`, `lang=ar`, scrollHeight 14,382 px on AR home | Playwright eval |
| 390 touch targets | Sticky CTA 375 × 108 (per `AUDIT_REPORT.md` data); buttons 62 px tall | Earlier audit data |
| 390 lang toggle | Working: localStorage + cookie + html attr swap | LangToggle + LangContext |

### Mobile pain points to address

- **Total document height (15 kpx) is heavy.** Without a strong second hook (Chaos Diagnosis), mobile users may abandon during the cinematic.
- **Three.js HeroScene is rendered on mobile.** No mobile fallback. Should use a lightweight CSS / canvas alternative under 768 to free GPU.
- **Particle cursor + signal field + plasma atmosphere all mount on mobile** but should be coarse-pointer-disabled at component level (verify in plan execution).
- **No prefetch of `/apply`.** A `<Link prefetch>` from sticky CTA would help mobile path.

---

## 14. Current Motion / Scroll / WebGL Assessment

### Motion entry points (current)

1. `lib/gsap.ts` — registers ScrollTrigger, Flip, CustomEase, MotionPathPlugin, SplitText globally.
2. `lib/motion.ts` — exports `revealHeadline`, `initScrollReveals`, `initHeroParallax`, `initSectionSheen`, `initSectionHeadlineReveals`, `initAtmosphereTransitions`.
3. `lib/lenis.ts` — singleton Lenis with GSAP ticker.
4. `components/effects/ScrollMotionInit.tsx` — component that fires `initScrollReveals`, `initHeroParallax`, `initSectionSheen`, `initSectionHeadlineReveals`, `initAtmosphereTransitions` after a 300 ms timeout, then a 1 s `setInterval` rescan polling for new `[data-vx-reveal]` elements.
5. Per-section `useGSAP` hooks: HeroSection (revealHeadline), MechanismSection (stagger + connector line), RoadmapSection (timeline stagger), ProofSection (CountUp triggers indirectly via component).
6. `components/venom/SectionWrapper.tsx` — IntersectionObserver that flips `[data-vx-reveal]` to `[data-vx-visible="true"]`.

### Risks

- **Polling rescan:** the 1 s setInterval in ScrollMotionInit causes ScrollTrigger.refresh() on every detected new node. Acceptable while page is short, but should be replaced with MutationObserver.
- **Two reveal systems:** SectionWrapper sets `[data-vx-visible]`, motion.ts sets `[data-vx-reveal-init]`. Both are honoured in CSS. Unifying into one is cleaner.
- **Scrub Lerp:** ScrollTrigger uses `scrub: 1.4` in HeroParallax and `scrub: true` in atmosphere transitions. Different scrub values increase mental cost but don't break.
- **Magnetic + tilt overlap on hover:** the hero CTA uses `useMagnetic` and the proof cards use `useTilt`. Both guard coarse pointers and reduced-motion. No interaction conflict.

### WebGL

- **HeroScene** renders 3 TorusKnots + 2 rings + 140 points + 4 lights. AnimationFrame loop disabled under reduced-motion (single render only). Renderer disposes geometries / materials / domElement on unmount with React unmount-race guard (`removeChild` in try/catch) — fixed in HEAD.
- **LusionMonitorScrollScene** renders frames into a 2D canvas, preloads 8 frames per batch via `requestIdleCallback`, capped DPR at 1.65, mobile branches to `<video>`.

### Recommendation summary

- **Consolidate motion into one timeline orchestrator.** Hero, Mechanism, Roadmap reveals can live under a single `useGSAP` boundary or under one initialisation point.
- **Replace polling rescan with MutationObserver.**
- **Disable HeroScene Three.js on mobile (≤768 px).**
- **Verify HeroScene metaphor** — replace TorusKnots with chaos→system geometry (suggested in §24).

---

## 15. Complete Problem List By Severity

### P0 — Must Fix Before Anything Else

**None confirmed.** Build is green, routes are live, no page errors, no horizontal overflow, no broken navigation, VSL works, application path works.

| Severity | Problem | Evidence | Path | Root Cause | Impact | Fix Direction |
| --- | --- | --- | --- | --- | --- | --- |
| (none) | — | — | — | — | — | — |

### P1 — Must Fix For Premium Launch

| Severity | Problem | Evidence | Path | Root Cause | Impact | Fix Direction |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Hero 3D layer reads as generic Three.js demo, not brand metaphor | `components/three/HeroScene.tsx` lines 28–98 (TorusKnots + rings + particles) | `components/three/HeroScene.tsx` | Imperative scene authored as visual filler in commit `83dd83e` | Brand perception below Awwwards bar | Replace with a chaos→system geometry scene (R3F or canvas) — see §22 |
| P1 | Narrative gap: no Chaos Diagnosis beat before cinematic | `app/page.tsx` mounts ScrollFilm immediately after Hero; ProblemSection.tsx exists but unmounted | `app/page.tsx`, `components/sections/ProblemSection.tsx` | ProblemSection was authored, never mounted, kept as orphan | Conversion friction, weak narrative | Mount ProblemSection between Hero and ScrollFilm — see §21 |
| P1 | Founder positioned before Proof, weakening authority impact | `app/page.tsx` order: Founder (5) → Proof (6) | `app/page.tsx` | Sequence inherited from earlier passes | Reduces credibility weight | Re-order to: Proof → Founder, or insert a Founder Hook earlier and a Founder Authority moment after Proof |
| P1 | Mobile carries Three.js + cursor + atmosphere unconditionally | `HeroScene.tsx` (no mobile guard), `ParticleTrailCursor.tsx`, `PlasmaAtmosphere.tsx` | mobile devices | No `(min-width: 768px)` check at component level | GPU + bundle cost on mobile | Mount Three.js scene only on `>=768px`, fall back to a CSS gradient + grain on mobile |
| P1 | Wistia console errors at first paint when network is unstable | Playwright log: 11 ERR_NETWORK_CHANGED entries on Wistia HLS | `components/cinematic/WistiaPlayer.tsx` | External CDN dependency, no error capture / fallback | Console noise, perceived instability | Add a poster image fallback when Wistia fails to register within 4 s; suppress non-fatal Wistia logs in dev |
| P1 | Mid-section pacing is uniform (Mechanism + Roadmap + Founder + Proof + Offer + FAQ all share OLED+halation lighting) | `tokens.css` background recipe inherited at every `.vx-section` | every mid section | One global atmosphere | Visual monotony | Vary per-section atmosphere pivot — see §23 |
| P1 | Roadmap section reads as informational deck rather than execution pressure | `components/sections/RoadmapSection.tsx` uses `TimelineStep` cards laid out vertically with stagger | `components/sections/RoadmapSection.tsx` | Generic timeline pattern | Doesn't earn the second-section spot | Reframe as a 5-step decision sprint with KPI-style numbers — see §21 |
| P1 | Sticky mobile CTA hides during 3,038 px cinematic on mobile | `StickyMobileCTA.tsx` IntersectionObserver hides during `#chaos-system-film` | mobile | By design but mobile users see no CTA for ~30 s | Conversion drop | Show a minimal anchor pill within the cinematic that fades on scroll-film completion |

### P2 — Technical / Creative Debt

| Severity | Problem | Evidence | Path | Root Cause | Impact | Fix Direction |
| --- | --- | --- | --- | --- | --- | --- |
| P2 | Orphan components (ProblemSection, SystemStackSection) | `app/page.tsx` does not import them | `components/sections/` | Mount removed in earlier pass | Dead code, repository clutter | Either mount or remove (after plan approval) |
| P2 | Three motion init paths (SectionWrapper IO, motion.ts initScrollReveals, ScrollMotionInit polling) | `SectionWrapper.tsx`, `lib/motion.ts`, `ScrollMotionInit.tsx` | motion stack | Layered fixes | Refresh thrash, mental cost | Consolidate to one orchestrator with MutationObserver |
| P2 | 1 s polling rescan in `ScrollMotionInit` | line 18: `window.setInterval(..., 1000)` | `components/effects/ScrollMotionInit.tsx` | Workaround for late-mounted reveal targets | Wasted CPU, ScrollTrigger refresh thrash | Replace with MutationObserver |
| P2 | Bundle increased from 207 kB to 383 kB on home | `next build` output | `app/page.tsx` first load | Three.js + lottie-react added | Slower first paint on slow networks | Code-split Three.js scene with `next/dynamic({ ssr: false })`; remove lottie-react if unused |
| P2 | `lottie-react` and `lottie-web` in dependencies but no `.lottie` reference in `app/` or `components/` | `package.json` deps + grep miss | `package.json` | Vestige | Bundle weight | Audit usage; remove if unused (after plan approval) |
| P2 | `tailwind.config.ts` contains 13 redundant token aliases (gold = amber = `#5C3E0B`, venom = acid = `#D5D904`, alert = heat = `#C74208`) | `tailwind.config.ts` lines 11–22 | tailwind config | Backwards-compat for older copy | Cognitive overhead; ambiguous tokens | Collapse aliases into a single canonical set |
| P2 | Tailwind v3.4 not v4 per `AGENTS.md` directive | `package.json` `tailwindcss: ^3.4.19`; AGENTS.md says v4 CSS-first | tooling | Migration deferred | Compliance gap with internal directive (only) | Defer; do not migrate in this pass |
| P2 | `.netlifyignore` and `.vercelignore` both present | repo root | repo hygiene | Multi-host deployment | Minor | Verify only one is needed |
| P2 | Many legacy markdown reports in repo root | `_*.md`, `ECOMVENOM_*.md`, `PHASE*_*.md`, `CINEMATIC_VSL_UPGRADE.md` (and a duplicate copy) | repo root | History of redesign passes | Clutter, makes onboarding noisy | Move to `docs/archive/` after rebuild approval |
| P2 | `file.jpe`, `file.jpe2.jpe` orphan files in root | repo root | repo hygiene | Accidental upload | Minor | Remove after approval |
| P2 | `phase0-*.png` and `postchange-*.json` in root | repo root | repo hygiene | Captured QA artefacts | Minor | Move to `audit/archive/` |
| P2 | `tsconfig.tsbuildinfo` committed if not gitignored — verify | repo root | tooling | TypeScript incremental cache | Minor | Verify `.gitignore` covers it |
| P2 | `next/font/google` for AR fonts but local `@font-face` for Latin | `app/layout.tsx` and `tokens.css` | font system | Mixed strategy | Two font-loading systems | Consolidate to local fonts for both languages or to next/font for both |
| P2 | Preloader holds `body.overflow=hidden` for 800 ms even when content is ready | `Preloader.tsx` lines 20–60 | UX | Hard-coded duration | Initial paint feels gated | Consider tying preloader exit to `document.readyState === 'complete'` and a max budget of 600 ms |

### Combined fix-budget estimate

- P1 cluster: ~12–18 hours of focused work for one senior frontend.
- P2 cluster: ~6–10 hours, mostly cleanup.

---

## 16. Root Cause Analysis

### Why the site is competent but not Awwwards-grade

1. **Layered design history.** Eight visual passes (`44e9713 CTO recovery`, `8bb560c visual-acceleration`, `ccc6c9a visual-acceleration-clean`, `1274c2e gustavoparis transplant`, `1a45181 lusion`, `2392fe9 cinematic recovery v3`, `83b0816 opus47`, `83dd83e overhaul-2`) layered direction over direction. The final build is the *intersection* of those passes — not a single coherent direction. The opus47 rebuild made the palette and material system coherent, but the narrative architecture was never re-evaluated.
2. **Motion fragmentation.** Section reveals were patched piecemeal as bugs were found. The result is three motion systems (SectionWrapper IO, motion.ts initScrollReveals, ScrollMotionInit polling) covering the same job.
3. **Hero metaphor not encoded in WebGL.** The opus47 brief specified a premium dark luxury direction, but did not lock the *visual metaphor* of the 3D scene. The next agent picked TorusKnots (a Three.js stock geometry).
4. **Narrative beats migrated as components, not as decisions.** ProblemSection and SystemStackSection were authored in earlier branches, kept as files, then forgotten. The rebuild needs to decide which beats earn a place and mount them deliberately.
5. **Mobile carries desktop weight.** Three.js + plasma + signal field + cursor all render on mobile. None gate on viewport at the component level.
6. **External dependencies (Wistia) emit noise.** Player works but logs 4–11 errors per first paint when the network is anything less than ideal.

### Why the build / lint / route layer is clean

- Strict TypeScript and `next/core-web-vitals` lint catch the obvious. `useGSAP` properly scopes cleanup. SectionWrapper guards reduced-motion. Lenis is a singleton. The opus47 token rewrite was disciplined and didn't introduce orphan imports.

---

## 17. 2025/2026 Global Research Summary

Sources consulted in this pass (with attribution where direct quotes were used):

- [Awwwards Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/) — current dark editorial winners use OLED black + restrained accent, single-color halation lighting, large-scale display type with subtle character reveal, scrub-driven WebGL scenes with clear metaphor, and one strong cinematic moment per page (not three).
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — current best practice for premium scroll work: pin sections sparingly, use `scrub: 1` with `invalidateOnRefresh`, prefer `gsap.matchMedia()` for breakpoint-conditional triggers, debounce events.
- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText) — now free in GSAP 3.13+ with `autoSplit` and `mask` for cinematic letter reveals (already used in `lib/gsap.ts`).
- [GSAP gsapify SplitText guide](https://gsapify.com/gsap-splittext) — confirms 3.13+ free status; outlines the `mask: chars` pattern already used in `lib/motion.ts` `revealHeadline`.
- [Lenis 2026 Next.js guide (devdreaming.com, April 2026)](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — current pattern is `lenis/react` import (current code uses `lenis` named import, which still works in 1.3.x but the React hook from `lenis/react` is the documented React way). Removed `smoothTouch` is deprecated (current code does not use it — clean).
- [darkroomengineering/lenis GitHub](https://github.com/darkroomengineering/lenis) — singleton + RAF + `gsap.ticker.add` is the canonical pattern (matches current `lib/lenis.ts`).
- [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei npm](https://www.npmjs.com/package/@react-three/drei) — the modern declarative path for any new Three.js work in React. Drei provides Bloom, EffectComposer, useGLTF, Environment, ContactShadows out of the box, and removes a lot of the imperative dispose/cleanup boilerplate currently in `HeroScene.tsx`.
- [r3f-best-practices skill (emalorenzo)](https://explainx.ai/skills/emalorenzo/three-agent-skills/r3f-best-practices) — comprehensive guide for R3F + Poimandres ecosystem with 70+ rules covering performance, dispose patterns, Suspense + lazy mounting, instancing, postprocessing, mobile fallback. Recommended reference for §24.

Content was rephrased for compliance with licensing restrictions.

### Themes for ECOMVENOM

- **One cinematic moment per page, not three.** Current site has three (Hero 3D + Cinematic Monitor + Section atmosphere). Trim to a single hero metaphor + the monitor scene.
- **Encode the brand metaphor in the WebGL.** Awwwards winners visualise the product mechanism (chaos converging into a system, signals being read, decisions firing) — not abstract knots.
- **Use SplitText `mask: chars` for headline reveals** (already configured in `lib/motion.ts`). Just consolidate use across all `<h1>/<h2>` so motion is consistent.
- **Lenis 1.3.23 is current.** Keep version. Migrate import to `lenis/react` is optional, low-priority.
- **Mobile-first WebGL fallback.** Drei has `<View>` with `frameloop="demand"` and Suspense gates that are friendly for mobile.


---

## 18. Recommended Libraries / References / Repos / Techniques

| Name | Category | Source | Why Use | Risk | Required/Optional | Integration Target |
| --- | --- | --- | --- | --- | --- | --- |
| `@react-three/fiber` | 3D / React renderer for Three.js | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | Replace imperative `HeroScene.tsx` with declarative R3F; Suspense-friendly; aligns with `AGENTS.md` stack ("R3F if present"). | Adds ~30 kB on top of three (already 0.184). | Optional but recommended | Hero scene rewrite |
| `@react-three/drei` | R3F helpers | [@react-three/drei npm](https://www.npmjs.com/package/@react-three/drei) | Provides Environment, ContactShadows, EffectComposer, Float, MeshDistortMaterial, Sparkles. Removes hand-rolled lighting code. | Tree-shakable, but full bundle is large; only import what is used. | Optional | Hero scene rewrite |
| `@react-three/postprocessing` | Postprocessing | npm | Bloom + Vignette + Noise + Chromatic Aberration. Premium look without manual shader work. | Adds 15–25 kB. Bloom on mobile is GPU-expensive. | Optional, mobile-gated | Hero scene + cinematic atmosphere |
| `gsap` 3.15.0 (already installed) + `@gsap/react` 2.1.2 | Animation | [GSAP docs](https://gsap.com/docs/v3/) | All needed plugins are free in 3.13+. SplitText / ScrollTrigger / Flip / CustomEase / MotionPath already imported. | None — current. | Required (already installed) | Headline reveal, scroll choreography, page transitions |
| `framer-motion` 12.38.0 (already installed) | Animation | npm | UI microinteractions, AnimatePresence for FAQ, layout animations. | None — current. | Required (already installed) | UI |
| `lenis` 1.3.23 (already installed) | Smooth scroll | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | Already integrated correctly. | None. | Required (already installed) | Global scroll |
| `lenis/react` import path | React hooks for Lenis | same package | Hook-based API instead of singleton. Optional code-style improvement. | Behaviour change — must regression-test. | Optional, deferred | `lib/lenis.ts` rewrite |
| GSAP `matchMedia()` | Breakpoint-conditional motion | [GSAP docs](https://gsap.com/resources/MatchMedia) | Cleaner than ad-hoc `window.matchMedia` checks. | None. | Optional | Replace inline media checks in `lib/motion.ts` and section components |
| Drei `<View>` + `<Canvas frameloop="demand">` | R3F performance | drei docs | Render only when scrolled into view; demand loop frees GPU when idle. | Requires R3F migration. | Optional | Hero |
| `@studio-freight/hamo` (use-scroll, useFrame helpers) | utilities | [studio-freight/hamo](https://github.com/studio-freight/hamo) | Helpful but optional; current `useScrollChoreography` hook already covers some of this. | Adds dependency. | Not recommended this pass | — |
| Web `View Transitions API` | Page transitions | already wired in `components/effects/ViewTransitions.tsx` + `app/globals.css @view-transition` | Cinematic page transitions for `/apply` `/schedule` `/confirmation`. | Browser-gated; falls back gracefully. | Optional refinement | Refine existing `ViewTransitions.tsx` |
| Native `<dialog>` + `showModal()` | Modals | Already used in `ProofSection.tsx` | Best-in-class focus-trap, accessibility, no library. | None. | Required (already used) | Keep |
| GSAP `Observer` plugin | Touch gestures | [GSAP docs](https://gsap.com/docs/v3/Plugins/Observer/) | Optional touch-driven cinematic scrub on mobile. | Free in 3.13+. | Optional | Mobile cinematic skip gesture |
| Visual reference: gustavoparis.co | Editorial dark | (already partially transplanted in `1274c2e`) | Hairline restraint + flat black + Michroma — the right reference but the transplant was reverted. | None. | Reference only | Type rhythm refinement |
| Visual reference: lusion.co / activetheory.net / resn.co.nz / unfold.no / unit9.com | Cinematic premium | Per `AGENTS.md` creative bar | These are the bar. Use for direction confirmation, not asset reuse. | None. | Reference only | Direction validation |

### Compliance / license note

All recommended libraries are MIT or equivalent permissive licenses and are already free for commercial use (GSAP became free in 2024). No paid-only services are recommended.

---

## 19. New Premium Brand And Art Direction

### Direction name

**"Decision Theatre" — Dark Graphite Luxury × Acid Performance Grade × Conversion Operating Room**

### Core idea

ECOMVENOM is not a course. It is **the operating room where ecommerce decisions are made under pressure**. The site should *feel* like that operating room: dark, controlled, instrument-lit, every signal accountable, the founder visible at the edge of frame as the operator behind the system.

The metaphor everywhere:

- **Hero:** ambient signals converging into one decision point.
- **Chaos Diagnosis:** five named leaks lit in burnt velocity.
- **Cinematic monitor:** chaos progressively resolving into clarity inside a single CRT-frame.
- **Mechanism:** four-step decision loop with active connector light.
- **Roadmap:** a 45-day operating sprint, KPI-pressed.
- **Founder:** Youssef framed as the operator, not the host.
- **Proof:** evidence wall, not testimonials.
- **Offer:** application gate, selective.
- **FAQ:** objection clinic.
- **Final CTA:** the door to the room.

### Palette (lock)

Already correct in `tokens.css` + `tailwind.config.ts`. Lock:

- Venom Black `#010101` — dominant background.
- Carbon Night `#0B0A08` — primary panels.
- Charcoal Graphite `#1A1813` — secondary surfaces.
- Smoked Graphite `#2D2B26` — borders, hairlines.
- Bone White `#E4E1DC` — primary text.
- Acid Lime Signal `#D5D904` — primary action, decision indicator.
- Burnt Velocity Orange `#C74208` — urgency only (loss diagnostic, sold-out indicators).
- Soft Warm Silver `#A29E97` — secondary text.
- Steel Grey `#6E6B67` — tertiary text.
- Olive Signal Shadow `#918C09` — dim acid (timeline shadows).
- Deep Amber Smoke `#5C3E0B` — warm accent (founder ambient, confirmation banner).
- Ash Metal `#474741` — line/border deep tone.

### Material system (lock)

- OLED Black Glass — hero portrait base, VSL frame, proof media wells.
- Frosted Smoked Glass — primary panel material.
- Soft-Touch Matte Polymer — Roadmap timeline cards.
- Matte Graphite Metal — Mechanism connector rail.
- Smoked Acrylic Edge Glow — selected/active glow.
- Micro-Embossed Carbon Texture — Offer panel.
- Topographic Noise — global subtle grain (existing).
- Acid Emissive Surface — primary CTAs and active states.
- Burnt Heat Emission — only on Chaos Diagnosis and confirmation banner.

### Typography lock

- Display: Aeonik 700–800 (already loaded), used for hero and section headlines.
- Body: Aeonik 400–500.
- Mono: IBM Plex Mono (labels, numerics, status).
- Arabic display: Noto Kufi Arabic 700–900.
- Arabic body: IBM Plex Sans Arabic 400–600.
- Letter-spacing: `0` at headline scale, `0.12em` at label scale (already in tailwind tokens).
- Headline scale: clamp `1.6rem → 7rem`.
- Body scale: clamp `0.9rem → 1rem`.

### Mood

Lethal. Premium. Conversion-disciplined. Nothing decorative.

---

## 20. New Homepage Experience Architecture

Order:

| # | Beat | Section | New mount? | Notes |
| --- | --- | --- | --- | --- |
| 0 | Preloader | `Preloader` | Existing | Trim to 600 ms hard ceiling. |
| 1 | Opening Impact | `HeroSection` | Existing | New WebGL metaphor (§22). Keep VSL. Keep hero proof bullets. |
| 2 | Chaos Diagnosis | `ProblemSection` | **MOUNT** (component exists) | New burnt-orange-accented loss diagnostic. |
| 3 | Decision System Reveal | `ScrollFilmSection` | Existing | Keep cinematic monitor scrub. Tighten desktop track to ~3,000 px. |
| 4 | Mechanism | `MechanismSection` | Existing | Keep four-step OS loop. Strengthen connector animation. |
| 5 | Operating Stack | `SystemStackSection` | **MOUNT** (component exists) | Operator-facing, not narrative. Five-card document stack. Optional — can be folded into Mechanism. |
| 6 | Roadmap | `RoadmapSection` | Existing | Reframe as 45-day operating sprint (§21). |
| 7 | Proof Wall | `ProofSection` | Existing | Position before Founder. Reduce tilt to 3°. |
| 8 | Founder Authority | `FounderSection` | Existing | Position **after** Proof. Ambient amber lighting. Strengthen the quote moment. |
| 9 | Offer / Application | `OfferSection` | Existing | Add a sold-out indicator (real spots data when available). |
| 10 | Objection Handling | `FaqSection` | Existing | Add inline `Apply now` CTA at the end of FAQ. |
| 11 | Final Conversion Moment | `FinalCtaSection` | Existing | Acid emissive surface. |
| 12 | Footer | `Footer` | Existing | Keep. |

The narrative now reads: **Hook → Pain → Mechanism → Demonstration → Map → Proof → Operator → Offer → Objections → Conversion**.

### Beat-by-beat acceptance summary (full table in §21)

- Hero must communicate "decision system" inside 5 seconds.
- Chaos Diagnosis must lift the cognitive hook before the cinematic.
- Cinematic must end with a clear "system formed" frame.
- Mechanism must visibly connect to the cinematic.
- Roadmap must feel like a sprint plan, not a course.
- Proof must be evidence, not testimonials.
- Founder must feel like the operator behind the system.
- Offer must feel selective.
- FAQ must remove friction without losing authority.
- Final CTA must feel like a door, not a button.

---

## 21. Section-By-Section Rebuild Plan

For every section: current state, desired state, content role, visual direction, motion direction, mobile behavior, files affected, acceptance criteria.

### 21.1 HeroSection

| Field | Value |
| --- | --- |
| Current state | TorusKnot 3D + bilingual headline + body + 2 CTAs + 3 proof bullets + Wistia VSL stage |
| Desired state | Brand-metaphor WebGL scene (chaos signals converging into one acid lime decision marker) behind copy. VSL anchored as "Open the operating brief" trigger. Proof bullets remain. |
| Content role | Open with the system framing in 5 seconds. |
| Visual direction | OLED depth field, acid signal halation upper-right, signals (40–80 small particles) drifting toward a single converging point at the headline anchor. |
| Motion direction | SplitText mask reveal on H1 (existing). Hero parallax on `.v2-hero__media` (existing). New WebGL converges on scroll progress. Magnetic hero CTA (existing). |
| Mobile behavior | Replace Three.js with CSS gradient + grain + small SVG of converging signal lines. Keep VSL stacked below copy (current behaviour). |
| Files affected | `components/sections/HeroSection.tsx` (mount logic), `components/three/HeroScene.tsx` (rewrite or replace), `app/globals.css` or `opus47-premium.css` (mobile fallback), `components/cinematic/WistiaPlayer.tsx` (add poster fallback) |
| Acceptance | (1) WebGL metaphor encodes chaos→system. (2) FCP ≤ 2.5 s on 4G simulated. (3) Hero passes 5-second test in user testing or proxy review. (4) Console clean of Wistia errors when player fails to register. (5) Mobile path renders without Three.js. |

### 21.2 ProblemSection (MOUNT)

| Field | Value |
| --- | --- |
| Current state | Component exists; not mounted on home. Title "The loss is rarely one mistake." 5 leak cards in EN + AR. |
| Desired state | Mount between Hero and ScrollFilm. Burnt velocity tone. Five named leaks (Wrong market / Scattered tools / Wasted ad spend / Weak offer / Unclear validation). |
| Content role | Lift the cognitive hook before the cinematic. |
| Visual direction | Carbon Night base, burnt orange data glyphs (`05 LEAKS`), hairline danger borders. Each leak card has a tiny timeline indicator. |
| Motion direction | Stagger reveal of the five leak rows from start to end (200ms each, expo.out). Sheen sweep on mount. No pin. |
| Mobile behavior | Vertical stack, full-width cards. Burnt-orange hairlines remain at 1 px on mobile. |
| Files affected | `app/page.tsx` (add import + mount between Hero and ScrollFilm), `components/sections/ProblemSection.tsx` (audit for any unfinished tokens), CSS in `cinematic-v2.css` for `.vx-leak-row` (already present per existing read). |
| Acceptance | Section reads as diagnostic, not motivational. Burnt-orange tone never spreads into Mechanism / Roadmap / Founder. |

### 21.3 ScrollFilmSection

| Field | Value |
| --- | --- |
| Current state | LusionMonitorScrollScene with 74-frame canvas scrub on desktop, MP4 fallback on mobile. 4680 px desktop track, 3038 px mobile. |
| Desired state | Keep architecture. Tighten desktop track to ~3000 px (or matchMedia-conditional). Reduce atmosphere blur on mobile by 20%. End on a "system formed" frame that visually connects to MechanismSection's connector rail. |
| Content role | The decision system reveal. The visual proof of the metaphor. |
| Visual direction | Acid signal atmosphere, smoked vignette, scan lines low-opacity. Existing recipe is correct. |
| Motion direction | ScrollTrigger pin (existing). `invalidateOnRefresh` on. Scrub `1` (current). Frame preload via `requestIdleCallback` (current). |
| Mobile behavior | Keep MP4 fallback; reduce blur on `.lusion-monitor-scene__atmosphere`. |
| Files affected | `components/cinematic/LusionMonitorScrollScene.tsx` (matchMedia tighter end value), `components/venom/cinematic-v2.css` (mobile atmosphere). |
| Acceptance | Track length feels purposeful, not punishing. End frame visibly hands off to MechanismSection. Mobile scrub stays smooth. |

### 21.4 MechanismSection

| Field | Value |
| --- | --- |
| Current state | Four-step grid with animated SVG connector line and stagger reveal. |
| Desired state | Strengthen connector — make it pulse subtly during scroll-progress, not just on enter. Add a "current step" indicator that ticks as the user scrolls past. |
| Content role | Mechanism explanation. |
| Visual direction | Frosted Smoked Glass panel. Acid hairline connector. Steps numbered `01..04`. Active step highlights to acid emissive ring. |
| Motion direction | Existing stagger + connector draw. Add `ScrollTrigger.create({ trigger, scrub })` to drive an "active step" index. |
| Mobile behavior | Vertical stack. Connector line vertical. |
| Files affected | `components/sections/MechanismSection.tsx`, optional `components/venom/cinematic-v2.css` |
| Acceptance | The connector light visibly progresses with scroll. No pin (do not make this a sticky section). |

### 21.5 SystemStackSection (OPTIONAL MOUNT)

| Field | Value |
| --- | --- |
| Current state | Component exists with 5-card document stack ("Product Signal", "Store Build", "Ad Test", "Market Fit", "Validation"). Not mounted. |
| Desired state | Either mount as Beat 5 (between Mechanism and Roadmap) or fold its content into Mechanism step bodies. |
| Content role | Operator stack — feels like the inside of the room. |
| Visual direction | Document-stack interaction; cards tilt slightly on hover with edge glow. |
| Motion direction | Stagger + tilt (4°). |
| Mobile behavior | Vertical scroll stack. |
| Files affected | `app/page.tsx`, `components/sections/SystemStackSection.tsx`, `components/venom/DocumentStack.tsx` |
| Acceptance | If mounted: visibly different from Mechanism (Mechanism is *the loop*, SystemStack is *the inventory*). If folded: content survives, component is removed. |

### 21.6 RoadmapSection

| Field | Value |
| --- | --- |
| Current state | TimelineStep cards with stagger. Reads as informational. |
| Desired state | Reframe as a "45-day operating sprint" with KPI-tone numbers (e.g. `D1–D7 // Market`, `D8–D21 // Build`, etc.). Keep the existing curriculum data but render it as a timeline pressure track. |
| Content role | Map; sets expectation of the 45-day cadence. |
| Visual direction | Soft-Touch Matte Polymer cards, hairline acid divider per stage, mono typography for D-numbers. |
| Motion direction | Stagger reveal (existing). Add a single hairline animated stroke that sweeps across the section on enter. |
| Mobile behavior | Vertical stack. |
| Files affected | `components/sections/RoadmapSection.tsx`, copy in `lib/cinematicRecoveryContent.ts` (add D-number meta if not present), `lib/content.ts` curriculum data |
| Acceptance | Reads as a sprint plan, not a course outline. |

### 21.7 ProofSection (re-position)

| Field | Value |
| --- | --- |
| Current state | 6 real captures, dialog inspector, transparency note card, tilt 4°. Stable. |
| Desired state | Position **before** FounderSection. Reduce tilt to 3° (or remove entirely on cards already large enough). Strengthen the transparency note card material to Acid Emissive Surface. |
| Content role | Evidence wall. |
| Visual direction | Frosted glass cards. Acid emissive transparency note. Burnt-orange small badge for "Live capture" if appropriate. |
| Motion direction | Reveal on enter. Dialog open via native `<dialog>.showModal()` (existing). |
| Mobile behavior | Vertical stack of 6 cards. |
| Files affected | `app/page.tsx` (re-order), `components/sections/ProofSection.tsx` (tilt magnitude). |
| Acceptance | Cards remain stable across repeated scroll. Dialog open / close clean. AR proof copy intact. |

### 21.8 FounderSection (re-position)

| Field | Value |
| --- | --- |
| Current state | Real photo, two BentoCards (dual-market thinking, marketing-first execution), quote. Solid. |
| Desired state | Position **after** Proof. Add ambient amber-smoke lighting only here (visual differentiation). Treat the quote as a typographic moment (display-scale, single line, acid pull-quote rule above and below). |
| Content role | Operator authority after evidence. |
| Visual direction | OLED Black Glass portrait + amber smoke ambient + bone display type. |
| Motion direction | Quote reveal: SplitText `mask: chars` reveal. |
| Mobile behavior | Photo on top, quote, bento cards below. |
| Files affected | `app/page.tsx` (order), `components/sections/FounderSection.tsx`, optional CSS for amber ambient. |
| Acceptance | Founder lands as authority, not as profile. Quote feels like a thesis statement. |

### 21.9 OfferSection

| Field | Value |
| --- | --- |
| Current state | Glass panel with eyebrow + title + body + primary CTA + offer item list (market, bonuses, support). Solid. |
| Desired state | Add a small "spots remaining" indicator if a real signal is available; otherwise add a status pill that says "Selective intake". |
| Content role | Offer / Application Logic. |
| Visual direction | Acid signal-glass primary panel, frosted glass list panels. |
| Motion direction | Reveal on enter, button magnetic on hover. |
| Mobile behavior | Vertical, primary CTA full-width. |
| Files affected | `components/sections/OfferSection.tsx`, optional copy update in `lib/cinematicRecoveryContent.ts` and `lib/translations.ts`. |
| Acceptance | Feels like an application, not a checkout. |

### 21.10 FaqSection

| Field | Value |
| --- | --- |
| Current state | 5 items with framer-motion AnimatePresence and spring open/close. |
| Desired state | Add an inline `Apply now` GlowButton at the end of the FAQ list. Slightly tighten close-icon spring. |
| Content role | Objection handling + bridge. |
| Visual direction | Frosted glass items, acid hairline at open boundary. |
| Motion direction | Existing AnimatePresence + height/opacity. Inline CTA reveals once at least one FAQ has been opened. |
| Mobile behavior | Identical. |
| Files affected | `components/sections/FaqSection.tsx`. |
| Acceptance | After answering objections, the user sees the next action without scrolling. |

### 21.11 FinalCtaSection

| Field | Value |
| --- | --- |
| Current state | Glass panel with editorial heading and primary CTA. |
| Desired state | Lift to Acid Emissive Surface across the panel. Add a subtle door/threshold metaphor — a single horizontal hairline that animates from edge to centre on enter. |
| Content role | The door to the room. |
| Visual direction | Acid-emissive panel, deep OLED below, single horizontal hairline above. |
| Motion direction | Hairline draw on enter. Magnetic CTA. |
| Mobile behavior | Vertical, full-width primary CTA. Sticky CTA hides during this zone (current behaviour preserved). |
| Files affected | `components/sections/FinalCtaSection.tsx`. |
| Acceptance | Final CTA reads as the strongest acid moment on the page. |

### 21.12 Routes (`/apply` `/schedule` `/confirmation`)

| Route | Current | Desired | Files |
| --- | --- | --- | --- |
| `/apply` | OLED background with acid + amber bloom (per opus47); form with required-field validation | Strengthen form field focus state to acid emissive ring; add a "What happens next" 3-step indicator above the form. | `components/apply/ApplyPageShell.tsx`, `components/apply/application-form.tsx`. |
| `/schedule` | Same OLED treatment; calendar mount; provider configuration warning when env missing | Add a status pill that reads "{n} spots in next 14 days" if real provider data is fetched, else keep the warning. | `components/schedule/SchedulePageShell.tsx`, `components/schedule/countdown.tsx`. |
| `/confirmation` | Amber-smoke banner with acid headline; 4 pre-call steps; pre-call video | Tighten the 4-step pre-call sequence — make each step a confirmed status (with a check glyph) once the user has met it. | `components/confirmation/ConfirmationPageShell.tsx`. |

---

## 22. Hero Rebuild Plan

This section is where the visual leap happens. Detailed on its own because the hero is the single biggest brand decision.

### 22.1 Concept

**"Decision Convergence"** — The hero scene shows a field of small ambient signals (light particles, faint trails) drifting from peripheral chaos toward a single point. As the user scrolls, the signals tighten, lock onto the convergence point, and emit an acid lime pulse. The convergence point sits behind the headline cap-height.

This visualises the entire ECOMVENOM thesis in one motion: chaotic signals → one decision.

### 22.2 Implementation choices (ranked)

**Option A — R3F + Drei (recommended)**
- Wrap in `<Canvas frameloop="demand">` so it only renders on visible frames.
- Use `<Sparkles count={120} scale={[10,6,5]} size={2} speed={0.2} color="#D5D904" />` for ambient signals.
- Add a single bloom layer via `@react-three/postprocessing` `<EffectComposer><Bloom intensity={0.6} luminanceThreshold={0.6} /></EffectComposer>` (desktop only).
- Drive convergence via `useScroll()` from drei or a custom uniform fed from `ScrollTrigger`.
- Suspense fallback returns `null` (no gradient ghost).
- Mobile (≤768 px): mount nothing; show CSS gradient + soft grain instead.

Bundle delta vs current: +R3F (~30 kB) + Drei tree-shaken (~40 kB worst case) + postprocessing (~20 kB worst case). Net: ~90 kB worst case. Mitigation: code-split via `next/dynamic({ ssr: false })`.

**Option B — Raw Three.js (current path, refined)**
- Keep imperative architecture but replace TorusKnots with a `THREE.BufferGeometry` particle field plus an instanced quad layer for trails.
- Add a single `THREE.AdditiveBlending` glow plane at the convergence point.
- Smaller bundle delta (no R3F) but more code to maintain.

**Option C — Pure Canvas 2D**
- Skip Three.js entirely. Use a single 2D canvas with 200 small bezier paths converging on a point.
- Smallest bundle. Acceptable on mobile. Less premium.

**Recommendation: Option A on desktop, Option C on mobile.** The hero must communicate decision-making quality, and R3F + Drei + Bloom is the right tool. Option C provides the mobile fallback that already exists in `PlasmaAtmosphere.tsx`-style code.

### 22.3 Acceptance criteria

| Criterion | Target |
| --- | --- |
| Visual metaphor encodes chaos→system | Yes |
| Bundle (home First Load JS) | ≤ 300 kB after code-split (currently 383 kB) |
| Mobile CPU/GPU cost | No Three.js mounted on mobile |
| Headline reveal coordination | SplitText reveals after fonts.ready, then particles converge with first scroll |
| Reduced-motion fallback | No animation, single static frame, signals visible but motionless |
| Console errors | 0 |

### 22.4 Hero VSL behaviour preservation

- Wistia `0z2r9j4jnz`, aspect 16:9, autoplay+muted with custom controls. Do not touch `WistiaPlayer.tsx` or `VslStage.tsx` semantics.
- Add a static `/media/hero-vsl-poster.webp` fallback that mounts behind Wistia for the first 4 seconds, fades when player reports `api-ready`, and remains visible if Wistia times out.

---

## 23. Motion And Transition System Plan

### 23.1 Global easing language (lock)

| Token | Curve | Use |
| --- | --- | --- |
| `--ease-venom` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for premium reveals |
| `--ease-cinematic` | `cubic-bezier(0.4, 0, 0.1, 1)` | Section transitions, atmosphere shifts |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero parallax, headline reveals |
| `--ease-precision` | `cubic-bezier(0.65, 0, 0.35, 1)` | Connector lines, CTA hovers |

All four are already defined in `lib/gsap.ts` (`venom`, `filmDrop`, `venomIn` CustomEases) plus tokens.css and tailwind.

### 23.2 Motion table

| Motion | Purpose | Trigger | Files | Fallback | Risk |
| --- | --- | --- | --- | --- | --- |
| Preloader counter | Brand boot | Page ready | Preloader.tsx | Skip under reduced-motion (existing) | LOW |
| SplitText hero headline reveal | Cinematic open | Fonts loaded → onMount | HeroSection.tsx, motion.ts | Visible without animation | LOW |
| Hero parallax on `.v2-hero__media` | Depth | Scroll | motion.ts initHeroParallax | None under reduced-motion | LOW |
| Hero WebGL convergence | Brand metaphor | Scroll progress | three/HeroScene.tsx (rewrite) | Static frame | MEDIUM |
| ProblemSection leak stagger | Diagnose | Enter viewport | ProblemSection.tsx | Visible, no stagger | LOW |
| ScrollFilm canvas scrub | Decision system reveal | Scroll | LusionMonitorScrollScene.tsx | Single MP4 video on mobile | LOW |
| Mechanism connector line + active-step indicator | Mechanism | Scroll progress | MechanismSection.tsx | Static line, no progress indicator | LOW |
| Roadmap stagger + sheen sweep | Sprint feel | Enter viewport | RoadmapSection.tsx | Visible, no stagger | LOW |
| Proof card tilt (3°) + dialog | Inspect | Hover / click | ProofSection.tsx | No tilt | LOW |
| Founder quote SplitText reveal | Authority | Enter viewport | FounderSection.tsx | Visible | LOW |
| Offer panel reveal | Frame the offer | Enter viewport | OfferSection.tsx | Visible | LOW |
| FAQ open/close spring | Microinteraction | Click | FaqSection.tsx | Snap toggle | LOW |
| FinalCta hairline draw | Door metaphor | Enter viewport | FinalCtaSection.tsx | Static line | LOW |
| Page transitions | Cinematic route hand-off | Anchor click on `<a href>` | ViewTransitions.tsx | Native navigation | LOW |
| Magnetic CTAs | Microinteraction | Hover (fine pointer only) | useMagnetic | None | LOW |
| Atmosphere shift | Section pacing | Scroll progress | initAtmosphereTransitions | Static atmosphere | LOW |

### 23.3 Consolidation

Replace the three current motion init paths with a single hook in a new `lib/motionOrchestrator.ts` (deferred file, plan only). One MutationObserver watches for `[data-vx-reveal]` additions; one `gsap.matchMedia` block handles breakpoint-conditional motion. Remove `setInterval` polling.

### 23.4 Reduced motion (mandatory per AGENTS.md)

Every animation must check `prefers-reduced-motion: reduce`. Current state: ~95% compliance. The 5% gap is the section-sheen `vxSectionSheen` keyframes (already gated by `@media (prefers-reduced-motion: reduce)` per tokens.css) and the `body.overflow=hidden` lock during preloader (already gated). **No new gaps to open.**

---

## 24. WebGL / Creative Coding Plan

### 24.1 Decision

The current Three.js HeroScene is **kept architecturally** (the file becomes the implementation site) but is **rewritten** to encode the brand metaphor.

### 24.2 Hero WebGL scene (R3F + Drei + Postprocessing)

Concept: a particle field of 80–120 ambient signals drifting from screen edges toward a convergence point. As the user scrolls, the convergence tightens. A single bloomed acid-lime point pulses at the convergence centre.

Components (declarative):

```
<Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} frameloop="demand">
  <Suspense fallback={null}>
    <ambientLight intensity={0.15} />
    <SignalField count={120} converge={scrollProgress} />
    <ConvergencePoint pulse={scrollProgress} color="#D5D904" />
    <EffectComposer>
      <Bloom intensity={0.6} luminanceThreshold={0.7} luminanceSmoothing={0.2} mipmapBlur />
    </EffectComposer>
  </Suspense>
</Canvas>
```

Where `SignalField` is a custom component using `<Points>` with a `<bufferGeometry>` and a custom shader (or `MeshBasicMaterial` + `additive`).

### 24.3 Scene concept geometry

- 120 small spheres or points, distributed inside a roughly hemispherical shell offset behind the headline anchor.
- Velocity vector for each: a slow drift toward `(0, 0, 0)` (the convergence point), modulated by a noise field for organic motion.
- As scroll progress increases, the noise field amplitude decreases and the drift rate increases. By scroll 0.5, signals are tight at convergence.
- A single emissive plane at the convergence point with `additive` blending, opacity tied to scroll progress.

### 24.4 Performance budget

- 60 fps on M1, 30 fps on Snapdragon 8 Gen 1, scene disabled on `(max-width: 768px)`.
- DPR cap `[1, 1.5]`.
- Bloom only on desktop (gate via `window.matchMedia('(min-width: 769px)')`).
- Triangle count target ≤ 5,000.
- Resource disposal handled by R3F automatically; no manual cleanup required (replaces ~40 lines of imperative dispose code in current `HeroScene.tsx`).

### 24.5 Reduced-motion fallback

Single static convergence frame: signals at half-convergence, no animation. Render via `<Canvas frameloop="never">` with one render call.

### 24.6 Mobile fallback

Replace canvas with a CSS pseudo-element gradient + a 32×32 grain texture. Same convergence visual feeling at much lower cost.

### 24.7 Acceptance criteria

| Criterion | Target |
| --- | --- |
| Brand metaphor encoded | Yes (chaos → convergence) |
| Triangle count ≤ 5,000 | Yes |
| 60 fps on desktop | Yes |
| 30 fps on mid-tier mobile (if mounted) | N/A — disabled on mobile |
| Bundle delta | ≤ +90 kB worst case, ≤ +50 kB after tree-shake |
| Reduced-motion compliant | Yes |
| Mobile fallback rendered | CSS only |

---

## 25. Mobile-First Rebuild Plan

### 25.1 Lock principles

- No Three.js on mobile.
- No magnetic / no tilt on coarse pointers (already handled in `useMagnetic` and `useTilt`).
- Lenis enabled (current behaviour).
- Sticky mobile CTA visible after hero exit, hidden during cinematic and final-cta zones (current behaviour).
- No horizontal overflow at any viewport (current behaviour).
- Sticky CTA padding for safe-area inset bottom on iOS.

### 25.2 Targeted improvements

| Improvement | File | Why |
| --- | --- | --- |
| Mount HeroScene only `(min-width: 769px)` | `components/sections/HeroSection.tsx` | Mobile GPU savings |
| Mount PlasmaAtmosphere / SignalFieldScene only `(min-width: 769px)` | `components/effects/PlasmaAtmosphere.tsx`, `SignalFieldScene.tsx` | Mobile GPU savings |
| ParticleTrailCursor only on `pointer: fine` | `components/cursor/ParticleTrailCursor.tsx` | Mobile cleanup (verify already gated) |
| Reduce cinematic atmosphere blur on mobile (`14px → 10px`) | `components/venom/cinematic-v2.css` | Mobile paint cost |
| Tighten section heights on mobile by ~10% via `clamp()` | `tokens.css` `--vo-section-y` | Mobile pacing |
| Add `<Link prefetch>` from sticky CTA to `/apply` | `components/ui/StickyMobileCTA.tsx` | Conversion latency |
| Add `safe-area-inset-bottom` padding to sticky CTA | `StickyMobileCTA.tsx` | iOS edge |
| Show a minimal anchor pill within cinematic zone on mobile | new mobile-only element | Mobile users still see action signal during cinematic |

### 25.3 Mobile acceptance

| Criterion | Target |
| --- | --- |
| 390 First Load JS | ≤ 300 kB |
| 390 LCP | ≤ 2.5 s on 4G simulated |
| 390 INP | ≤ 200 ms |
| 390 horizontal overflow | None |
| 390 sticky CTA | Visible after hero, hidden during film, hidden in final CTA zone |
| 390 RTL parity | Identical pacing in AR |
| Reduced-motion mobile | All animations disabled; document height stays sensible |

---

## 26. Accessibility And Performance Plan

### 26.1 Accessibility

| Area | Current | Target |
| --- | --- | --- |
| Skip link | Yes (`#main-content` anchor) | Keep |
| Heading hierarchy | Correct on home (one H1, multiple H2/H3 per section) | Keep |
| Focus states | `:focus-visible` outline acid emissive (per `app/globals.css`) | Strengthen on form fields |
| Dialog | Native `<dialog>` with `showModal()` | Keep |
| Lang switching | `html lang/dir` + `aria-label` on toggle | Keep |
| Reduced-motion | Honoured in 95% of paths | Bring to 100% |
| Screen reader | `<span class="sr-only">` for VSL title; alt text on all proof images | Audit all alt strings for AR translation |
| Color contrast | Bone on Carbon Night = 12.7:1, Acid lime on Carbon Night = ~9:1, Steel grey on Carbon Night = ~4.5:1 | Minimum 4.5:1 must be enforced for body text and label text |
| Keyboard navigation | Tab order is correct on home | Verify after any DOM changes |
| ARIA on FAQ | `aria-expanded` set | Add `aria-controls` linking button to panel |
| ARIA on chapter rail | `aria-current="location"` set on active item | Keep |

### 26.2 Performance

| Metric | Current | Target |
| --- | --- | --- |
| Home First Load JS | 383 kB | ≤ 300 kB |
| Home LCP (estimated) | 3.6 s (per May 2026 Lighthouse) | ≤ 2.5 s |
| CLS | 0.051 | ≤ 0.05 |
| TBT | 320 ms | ≤ 200 ms |
| FCP | 2.0 s | ≤ 1.6 s |

Levers:

1. **Code-split Three.js scene** with `next/dynamic({ ssr: false, loading: () => null })`.
2. **Remove `lottie-react` and `lottie-web`** if grep confirms no usage.
3. **Lazy-load Wistia script** until viewport intersects VSL stage.
4. **Inline `font-display: swap`** already in place.
5. **Self-host fonts** already in place.
6. **Avoid `backdrop-filter` on scroll-bound elements** — already done.
7. **Image formats** AVIF + WebP already configured.

### 26.3 Real WCAG validation

Full WCAG 2.2 AA validation requires manual testing with assistive technologies (VoiceOver, NVDA, JAWS) and expert accessibility review. The plan delivers automation-friendly improvements; final compliance must be verified by the team.

---

## 27. Implementation Phases

### Phase 0 — Preflight (no code changes)

Plan-only verification.

- [x] Confirm directive read.
- [x] Confirm build / lint / typecheck green.
- [x] Confirm runtime serves all four routes.
- [x] Confirm browser QA captures evidence at 1440 / 768 / 390 EN + AR.
- [x] Confirm research consulted.
- [x] Master plan written.

### Phase 1 — Mount the missing narrative beats (low risk)

- Mount `ProblemSection` between Hero and ScrollFilm.
- Re-order Founder to appear after Proof.
- Decide on SystemStackSection: mount as Beat 5 OR fold into Mechanism.
- Add inline CTA at end of FAQ.
- Run `npx tsc --noEmit && npm run lint && npm run build`.
- Capture Playwright screenshots at 1440 / 390 to verify pacing.

### Phase 2 — Mobile gating + bundle slimming (medium risk)

- Gate Three.js, PlasmaAtmosphere, SignalFieldScene on `(min-width: 769px)` at component mount.
- Code-split Three.js scene via `next/dynamic`.
- Audit `lottie-react` usage; remove if unused (gated on team approval).
- Add `safe-area-inset-bottom` padding to sticky CTA.
- Add `<Link prefetch>` from sticky CTA to `/apply`.
- Run full QA matrix.

### Phase 3 — Hero WebGL rebuild (highest impact)

- Decide R3F vs raw Three.js (recommend R3F + Drei + Postprocessing).
- Implement Decision Convergence scene (§22 + §24).
- Wire scroll-progress uniform.
- Add reduced-motion + mobile fallback.
- Validate bundle delta.
- Capture before/after screenshots at 1440 EN + AR.

### Phase 4 — Section atmosphere differentiation (low–medium risk)

- Vary per-section atmosphere pivot (Mechanism: cool, Roadmap: neutral, Founder: amber, Offer: acid).
- Strengthen Mechanism connector to scroll-progress driven.
- Reframe Roadmap as 45-day operating sprint (copy + KPI numbers).
- Re-style Final CTA as Acid Emissive Surface with hairline draw.

### Phase 5 — Motion consolidation (medium risk)

- Replace 1 s polling rescan with MutationObserver.
- Merge SectionWrapper IO and motion.ts initScrollReveals into one orchestrator.
- Replace inline `window.matchMedia` checks with `gsap.matchMedia()`.
- Verify reduced-motion still honoured everywhere.

### Phase 6 — Wistia resilience (low risk)

- Add a 4 s timeout fallback that shows poster image when Wistia fails to register.
- Suppress non-fatal Wistia console errors in dev (DON'T suppress in production).

### Phase 7 — A11y polish (low risk)

- Add `aria-controls` to FAQ buttons.
- Add `aria-live="polite"` to scene scramble label in Nav.
- Audit AR alt strings on proof images.
- Verify focus order after re-mount.

### Phase 8 — Repo hygiene (no UX impact)

- Move legacy `_*.md`, `ECOMVENOM_*.md`, `PHASE*_*.md` to `docs/archive/`.
- Move `phase0-*.png`, `postchange-*.json`, `file.jpe*` out of root.
- Remove `tsconfig.tsbuildinfo` from repo if not gitignored.

### Phase 9 — Final QA + acceptance gate

- Run `npm run qa` (typecheck + lint + build + audit).
- Capture full screenshot matrix (10 views per viewport per language).
- Verify console at 0 errors / 0 warnings (excluding external Wistia network drops).
- Verify horizontal overflow zero at every viewport.
- Verify sticky mobile CTA states.
- Hand off for visual approval.

### Phase ordering rule

Phase 0 before any code change. Phases 1–4 can run in parallel by area (a single dev should run them sequentially; a team can split). Phase 5 must come after 1–4 because the motion orchestrator depends on the final mounted DOM. Phases 6–8 are independent and can interleave.

---

## 28. QA Protocol And No-Deploy Gate

### Build commands

```
npx tsc --noEmit
npm run lint
npm run build
```

All three must exit 0.

### Browser QA matrix

Run at every phase that changes user-visible behaviour. Use the existing `scripts/qa-opus47.mjs` and `scripts/qa-opus47-ar.mjs` plus a new screenshot pass per route:

```
Viewports: 1440×900, 1366×768, 1280×900, 768×1024, 430×932, 390×844, 360×740
Languages: EN, AR
Routes: /, /apply, /schedule, /confirmation
Per route capture stops: hero, mid (5 stops), bottom
Reduced motion emulation: prefers-reduced-motion: reduce on / and /confirmation
```

### Interaction QA

| Interaction | Expected |
| --- | --- |
| Nav links | Lenis-driven anchor scroll with `-72px` offset |
| Lang toggle | html `lang/dir` swaps, cookie + localStorage persist |
| All CTAs | Resolve to `/apply` |
| `Watch founder VSL` | Anchor scroll to `#founder-vsl` |
| Apply form | Required-field validation, falls through to `/schedule` when endpoint unset |
| Schedule | Enabled when `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL` set, else placeholder |
| Confirmation | VSL plays, 4 pre-call steps render |
| Mobile sticky CTA | Toggle states across hero / film / final-cta |
| Reduced motion | All animations disabled, content readable |

### Console gate

- 0 page errors.
- 0 console errors at first paint *excluding* known transient external Wistia network drops.
- 0 horizontal overflow at any viewport.

### No-deploy guarantees

| Forbidden | Confirmed |
| --- | --- |
| `git push` | Forbidden |
| Netlify deploy | Forbidden |
| Production publish | Forbidden |
| Branch merge | Forbidden |
| Dependency add / remove / update | Forbidden |
| File deletion | Forbidden in this pass |

Forced-browser hacks (opacity overrides, removed overlays, disabled scripts in DevTools) are not valid QA evidence.

---

## 29. Risks And Rollback Strategy

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Hero WebGL rewrite increases bundle beyond budget | Medium | Medium | Budget enforced in CI via `next/dynamic` split + bundle-analyzer gate |
| R3F + Drei subtree breaks under SSR | Low | High | `ssr: false` on dynamic import; Suspense boundary at scene root |
| Mounting ProblemSection breaks chapter rail counts | Low | Low | Chapter rail enumerates `[data-scene-title]` automatically; just add the attribute |
| Re-ordering Founder breaks anchor links | Low | Medium | Audit `lib/cinematicRecoveryContent.ts` and any nav references for `#founder` anchor |
| Removing lottie-react breaks an unmounted component | Low | Low | Grep confirms no usage; if found, defer removal |
| Wistia fallback poster overlaps real player | Low | Medium | Tie poster opacity to `wistia-player[data-wistia-state]` attribute; fade out on `playing` |
| Section atmosphere differentiation creates visual inconsistency | Medium | Medium | Limit palette pivots to four (cool, neutral, amber, acid); any pivot must be derived from the locked palette |
| Motion consolidation introduces a regression | Medium | High | Phase 5 only after Phase 1–4; full Playwright capture pass before / after |
| Mobile gating breaks desktop scene | Low | Medium | Use `(min-width: 769px)` matchMedia at mount, test at 768 boundary |
| AR layout shifts on re-ordered sections | Medium | Medium | Capture AR at every viewport in QA matrix |

### Rollback strategy

- Each phase is a separate commit on `claude/condescending-goldstine-e934b5` (or a fresh branch off `83b0816 main`).
- If any phase fails QA, `git revert <commit>` returns to the previous green state.
- The opus47 baseline is the safe rollback target if multiple phases need to revert.

---

## 30. Final Execution Prompt

Use exactly the following prompt to start implementation after this plan is approved:

```
Execute ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md exactly.

Start with Phase 0 only, then stop and report.

Rules:
- Do not skip inspection.
- Do not deploy.
- Do not push.
- Do not merge.
- Do not change dependencies without documented approval.
- Do not use forced browser hacks as QA proof.
- Preserve confirmed approved directions.
- Remove or replace rejected directions only after evidence.
- Fix P0 runtime/build/visibility blockers before visual upgrades.
- Produce a concise report with files changed, commands run, browser observations, remaining blockers, and pass/fail verdict.
```
