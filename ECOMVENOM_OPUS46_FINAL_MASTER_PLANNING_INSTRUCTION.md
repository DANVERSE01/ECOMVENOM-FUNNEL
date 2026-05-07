# ECOMVENOM Funnel — Opus 4.6 Final Master Planning Instruction

## Mission

You are operating as **Senior CTO / Principal Creative Engineering Director / Award-Level Frontend Architect**.

Your task is to produce the **final master Phase 2 implementation plan** for the ECOMVENOM funnel.

This is a planning-only session.

Do not implement anything.

You must inspect the project yourself, then compare and synthesize the previous Codex audit and Claude Sonnet plan into one final, corrected, superior, execution-ready plan.

The final output must be strong enough that a coding agent can implement it tomorrow without needing more creative direction.

---

## Project Path

```text
D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
```

---

## Primary Goal

Create the final CTO-grade master implementation plan for a full premium rebuild of the ECOMVENOM funnel.

The plan must be:

- technically verified
- visually superior
- file-mapped
- execution-ready
- ordered by implementation phase
- safe for handoff to another coding agent
- free from unauthorized references
- more complete than both prior Codex and Sonnet outputs

---

## Read These Local Planning / Audit Files First

Inspect these files if present:

```text
ECOMVENOM_CTO_AUDIT_INSTRUCTION.md
ECOMVENOM_PHASE1_SANITIZE_AND_CORRECT_PLAN.md
ECOMVENOM_CLAUDE_OPUS_PHASE2_PLANNING_INSTRUCTION.md
```

Also inspect any existing generated audit/planning artifacts in the project root that contain:

```text
PHASE
AUDIT
PLAN
CTO
CLAUDE
CODEX
SANITIZE
```

Do not blindly trust them.

Treat them as input evidence, not final truth.

---

## Required Source Verification

Before writing the final plan, inspect the real project yourself.

Run only read-only verification commands unless explicitly needed for local QA.

Required commands:

```powershell
git status --short --branch
git log -5 --oneline
npm run typecheck
npm run build
```

Then inspect at minimum:

```text
package.json
next.config.*
tailwind.config.*
tsconfig.json
app/layout.tsx
app/globals.css
app/page.tsx
app/apply/page.tsx
app/schedule/page.tsx
app/confirmation/page.tsx
lib/content.ts
lib/frameManifest.ts
lib/mediaOptimization.ts
lib/gsap.ts
lib/lenis.ts
lib/motionConfig.ts
components/nav.tsx
components/footer.tsx
components/ui/button.tsx
components/ui/container.tsx
components/ui/reveal.tsx
components/ui/Preloader.tsx
components/ui/ScrollProgressIndicator.tsx
components/cinematic/*
components/sections/scroll-film/*
components/apply/*
components/schedule/*
components/confirmation/*
hooks/*
public/brand/*
public/brand-visuals/*
public/founder/*
public/media/*
public/posters/*
public/stills/*
public/generated/*
public/frames/higgsfield-system/*
```

If a file from this list does not exist, mark it as `MISSING` and continue.

---

## Local QA Rules

Valid QA URL:

```text
http://localhost:3012
```

Known invalid/stale URL:

```text
http://localhost:3011
```

`localhost:3011` previously returned missing Next static chunks and is not valid visual evidence.

Use `localhost:3012` only.

If the server is not running, start a clean local dev server on port `3012`.

Do not deploy.

Do not push.

Do not commit.

---

## Absolute Ban

Do not use obsolete legacy reference.

```text
obsolete legacy reference
removed-obsolete-legacy-domain
[removed obsolete legacy URL]
[removed obsolete legacy URL]
[removed obsolete legacy URL]
```

obsolete legacy reference is banned from this project and all future projects unless explicitly requested by the user.

Do not open it.
Do not search it.
Do not mention it as a reference.
Do not cite it.
Do not benchmark against it.
Do not use any obsolete legacy reference screenshot.
Do not use any obsolete legacy reference wording.
Do not write "obsolete legacy reference-grade", "obsolete legacy reference-style", "obsolete legacy reference-inspired", or "obsolete legacy reference benchmark".

If older audit artifacts include obsolete legacy reference, classify them as contaminated and excluded.

---

## Approved External References Only

Use only these external references if already available or accessible:

```text
https://github.com/thebuggeddev/delphi
https://github.com/JosephASG/codrops-cinematic-scroll-animations
https://codepen.io/filipz/pen/yyNGpmv
https://codepen.io/filipz/pen/JoGNQzm
https://github.com/andrewwoan/codrops-fan-museum
https://codepen.io/moussamamadou/pen/zxYONpz
https://codepen.io/moussamamadou/pen/XJWrMEx
https://github.com/codrops/OneElementScroll
https://codepen.io/osmosupply/pen/NWQevrB
https://tympanus.net/codrops/
https://github.com/codrops/HoverGrid/
```

Do not research new visual references.

These references are inspiration/pattern sources only.

Do not copy them directly.

---

## LUSION Package

Local LUSION package may exist at:

```text
C:\Users\Mohamed\Desktop\LUSION_TUNNEL_FULL_PACKAGE.zip
.audit\lusion-tunnel-package
```

Use it only as:

- local technical inspection evidence
- tunnel/screen architecture reference
- material/texture inspiration
- scroll-depth design inspiration

Do not copy LUSION assets into production folders.
Do not import WebGL code.
Do not implement WebGL.
Do not move assets.
Do not install Three.js unless the final plan explicitly justifies it and marks it as approval-required.

Preferred LUSION decision unless evidence proves otherwise:

```text
Use as visual/architecture reference only in Phase 2A.
Build an original CSS/GSAP-inspired TunnelSystemStage for Scene02 using existing project systems.
No WebGL import in Phase 2.
```

---

## User Findings That Must Drive the Final Plan

These are mandatory:

- The funnel is not premium enough.
- The current design feels visually underdeveloped.
- The current typography is weak and must be replaced completely.
- The font direction is not premium.
- Typography rhythm, scale, hierarchy, line-height, letter-spacing, and spacing need a complete rebuild.
- Buttons and CTA system look primitive and must be redesigned.
- Iconography and micro-UI elements feel weak and must be cleaned/replaced.
- Scene/system labels like `00 SYSTEM BOOT`, `03 ROADMAP`, `08 FINAL COMMAND` feel like raw debug UI and must not remain as-is.
- Video placement is wrong and not professional.
- Video architecture is weak.
- The funnel is too dark-first and needs one or two professional accent colors with controlled material behavior.
- New colors must be premium, restrained, and conversion-focused.
- The funnel needs better interactions, hover states, scroll transitions, scene rhythm, and cinematic motion.
- The funnel needs a full premium visual-system replacement, not cosmetic patching.
- Assets, videos, frames, and images must be professionally optimized without visible degradation.
- Do not fabricate proof, metrics, testimonials, claims, outcomes, or scarcity.
- Website content must stay English only.

---

## Previous Plan Handling

You must review the prior Codex audit and Sonnet planning output, then improve it.

Do not just restate it.

Your final plan must explicitly answer:

1. What did Codex get right?
2. What did Codex get wrong?
3. What did Sonnet get right?
4. What did Sonnet miss?
5. What needs to be corrected before implementation?
6. What is the final approved master direction?
7. What exact file-by-file implementation sequence should the next agent follow?

If any prior claim is not verified by source inspection, mark it as:

```text
UNVERIFIED — must verify before implementation
```

---

## Required Output

Produce one final markdown document titled:

```text
ECOMVENOM Funnel — Final Master Phase 2 Implementation Plan
```

The document must include these sections:

### 1. Executive Final Verdict

Include:

- technical status
- creative status
- whether the current funnel is shippable
- whether Phase 2 should proceed
- final recommended direction
- what must not happen

### 2. Evidence and Source Control

Include:

- files inspected
- commands run
- valid localhost QA source
- stale localhost source excluded
- previous audit/planning artifacts reviewed
- obsolete legacy reference exclusion note

### 3. Codex Audit Review

Include:

- useful findings to keep
- mistakes to discard
- contaminated references/artifacts
- what still needs verification

### 4. Claude Sonnet Plan Review

Include:

- strong recommendations to keep
- weak recommendations to revise
- unverified claims
- missing components
- where the plan is too conservative or too broad

### 5. Final Creative Direction

Define the final direction as:

```text
premium cinematic ECOMVENOM conversion funnel
dark commerce operating system
founder-led high-trust application funnel
controlled venom/steel/gold material palette
conversion-first cinematic scroll
```

Do not use obsolete legacy reference language.

### 6. Final Typography System

Must include:

- final display font
- final heading font
- final body font
- final mono font
- exact import strategy
- fallback strategy
- token names
- type scale
- line-height scale
- letter-spacing rules
- files to change
- QA criteria

If choosing Syne, explain why it beats Anton and why it is acceptable as the final free/self-hosted option.

### 7. Final Color and Material System

Must include:

- exact hex palette
- semantic tokens
- dark base
- surface levels
- text hierarchy
- venom rules
- steel rules
- gold rules
- glow rules
- borders
- gradients
- glass
- metal
- grain
- files to change

### 8. Final CTA / Button System

Must include:

- Primary CTA
- Secondary CTA
- Ghost CTA
- Sticky mobile CTA
- Form submit button
- Loading state
- Disabled state
- Hover / focus / active states
- Mobile tap targets
- Exact components/files

### 9. Final Scene Label / Progress System

Must include:

- remove debug labels
- replace ShotLabel design
- nav scene pill replacement labels
- progress indicator behavior
- desktop/mobile/reduced-motion behavior
- exact files

### 10. Final Iconography and Micro-UI System

Must include:

- whether to use inline SVG or icon library
- icon list
- stroke/sizing system
- what to remove
- what to redesign
- exact files

### 11. Final Video Architecture

Must include:

- hero/VSL decision
- confirmation video decision
- autoplay vs click-to-play rules
- muted/unmuted rules
- poster strategy
- preload strategy
- lazy loading
- mobile fallback
- reduced-motion fallback
- exact components/files
- asset verification list

### 12. Final Media and Asset Optimization Plan

Must include:

- image strategy
- WebP/AVIF strategy
- video encoding strategy
- frame-sequence strategy
- brand visual optimization
- backup strategy
- no overwrite without approval
- visual QA rules
- what can be optimized automatically
- what requires manual approval

### 13. Final LUSION Decision

Must include one clear decision.

Preferred direction:

```text
Use LUSION as architecture/visual inspiration only.
No direct WebGL implementation in Phase 2.
No direct asset copying into production.
Create an original GSAP/CSS TunnelSystemStage only if Scene02 benefits.
```

If you disagree, justify with evidence.

### 14. Final Reusable Component Architecture

Must include component list with:

- path
- purpose
- props/API
- where used
- what it replaces
- implementation order

Evaluate at minimum:

```text
SectionShell
CinematicPanel
MotionReveal
VideoStage
CinematicVideo
ResponsiveMediaFrame
PremiumCTA
StickyMobileCTA
ProgressRail
SceneTransition
SceneProgress
ShotLabel replacement
HoverGrid
MagneticButton
ProofAssetCard
FormStepCard
TunnelSystemStage
Icon components
```

### 15. Final Motion and Scroll System

Must include:

- GSAP standards
- pinning decision
- scene transitions
- text reveals
- hover-grid behavior
- CTA magnetic behavior
- scroll progress
- mobile alternatives
- reduced-motion fallbacks
- performance guardrails
- files

### 16. Scene-by-Scene Final Plan

For each:

```text
Scene00 Hero / Cold Open
Scene01 Problem
Scene02 Chaos to System
Scene03 Roadmap
Scene04 Offer / Beyond
Scene05 Founder
Scene06 Proof Gate
Scene07 Application
Scene08 Final CTA
```

Include:

- current issue
- final target
- copy/content handling
- visual system changes
- motion changes
- media/video changes
- files
- QA acceptance criteria

### 17. Route-by-Route Final Plan

For:

```text
/
 /apply
/schedule
/confirmation
```

Include:

- current issue
- exact improvements
- components changed
- QA acceptance criteria

### 18. Final File-by-File Change Map

Include every likely file to edit with the reason.

Must include:

```text
app/layout.tsx
app/globals.css
tailwind.config.ts
lib/content.ts
lib/frameManifest.ts
lib/mediaOptimization.ts
lib/gsap.ts
lib/motionConfig.ts
components/nav.tsx
components/footer.tsx
components/ui/button.tsx
components/ui/*
components/cinematic/*
components/sections/scroll-film/*
components/apply/application-form.tsx
components/schedule/schedule-board.tsx
components/confirmation/pre-call-video.tsx
```

### 19. Final Dependency Policy

Include:

- no new dependencies by default
- exact conditions for adding any dependency
- no paid services
- no unnecessary packages
- no Three/WebGL unless approved
- no deployment/push

### 20. Final Phase 2 Execution Sequence

Break into ordered phases:

1. Preflight verification
2. Remove visible debug UI/copy
3. Typography/token system
4. Color/material system
5. CTA/button system
6. Scene label/progress system
7. Video architecture
8. Reusable component system
9. Scene-by-scene rebuild
10. Mobile/responsive pass
11. Media optimization planning and optional approved optimization
12. Accessibility
13. Performance QA
14. Final report

Each phase must include:

- commands
- files
- expected output
- acceptance criteria
- rollback checkpoint

### 21. Final QA Gates

Include:

- git status
- typecheck
- build
- local server
- console errors/warnings
- desktop/laptop/tablet/mobile screenshots
- route testing
- form testing
- video testing
- reduced motion
- accessibility
- performance
- asset weight check
- final report

### 22. Risks and Mitigations

Include:

- design overreach
- performance regression
- video mismatch
- mobile scroll problems
- frame sequence bloat
- font loading risk
- CTA conversion risk
- fake proof/content risk
- LUSION misuse risk

### 23. Rollback Plan

Include safe rollback checkpoints and git strategy.

### 24. Final Execution Prompt for Tomorrow

Write a compact prompt for the next implementation agent.

This prompt must instruct the agent to:

- read this master plan
- inspect files first
- implement Phase 2 in order
- never use obsolete legacy reference
- not deploy
- not push
- not install dependencies unless approved
- not delete media without proof
- run build/typecheck after each major phase
- stop with final report and screenshots

---

## Forbidden Actions

Do not:

- edit source files
- create implementation files
- install dependencies
- copy assets into production
- delete files
- commit
- push
- deploy
- open obsolete legacy reference
- research new references
- implement Phase 2

---

## Final Instruction

Produce the final master plan only.

Stop after the plan.
