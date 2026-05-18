# ECOMVENOM — Supreme Local + Global Audit Directive for Kiro

## Purpose

This directive is for Kiro / Claude Code to run a complete strategic audit of the entire ECOMVENOM project and produce a world-class execution plan before any implementation.

The goal is not to patch bugs.  
The goal is to understand the complete project history, current codebase, design direction, accepted decisions, rejected decisions, repeated mistakes, current technical state, current visual quality, and the best available 2025/2026 creative technology references — then produce a precise professional rebuild plan.

---

## Operating Mode

**PLAN ONLY. NO SOURCE CODE EDITS.**

During this pass, you may:

- Inspect all project files.
- Inspect all git history.
- Inspect all commits.
- Inspect all branches/worktrees.
- Inspect all project documentation.
- Inspect all configuration files.
- Inspect all available Kiro / Claude / Codex / MCP / skills / plugins configuration inside the project.
- Run read-only diagnostic commands.
- Run build/type/lint/test commands.
- Run local dev server for browser QA.
- Use browser research for current 2025/2026 references, docs, libraries, patterns, and examples.
- Produce one master plan file.

During this pass, you must not:

- Edit app/source code.
- Patch bugs.
- Change dependencies.
- Change package versions.
- Install libraries.
- Deploy.
- Push.
- Merge.
- Delete files.
- Rewrite content.
- Generate fake QA.
- Claim anything without evidence.

Allowed output file:

```text
ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md
```

---

## Role

Operate as a combined:

- Principal Creative Technology Director.
- Principal Frontend Architect.
- Principal Motion Systems Engineer.
- Senior Conversion UX Strategist.
- Senior Brand Systems Designer.
- Technical Art Director.
- QA Director.
- World-class web experience consultant operating at 2026 standards.

Assume the expected quality bar is equivalent to a $100,000/hour global expert team.

---

## Project Quality Target

The final website must aim for:

- Awwwards-level interaction quality.
- Framer-level visual polish.
- 2025/2026 premium landing-page standards.
- Cinematic ecommerce conversion storytelling.
- High-end productized funnel experience.
- Strong founder-led authority.
- Fast, stable, accessible, mobile-first execution.
- Motion with purpose, not decoration.
- Visual surprise without breaking usability.
- Premium dark editorial design system.
- Modern creative technology without fragile gimmicks.

---

## Brand Direction

### Brand

`ECOM VENOM`

### Core Meaning

A premium ecommerce conversion system that turns scattered product, traffic, creative, and offer chaos into a precise product-to-call decision machine.

### Desired Feeling

- Dangerous precision.
- Black luxury.
- Tactical confidence.
- Ecommerce authority.
- Conversion discipline.
- Founder-led credibility.
- High-performance system design.
- Sharp modern product energy.
- Controlled intensity.

### Forbidden Visual Direction

Do not push the brand into:

- Snake visuals.
- Fangs.
- Venom-drip clichés.
- Reptile graphics.
- Cheap toxic green.
- Gamer UI.
- Cyberpunk clichés.
- Crypto dashboard aesthetics.
- Fake futuristic dashboards.
- Random code/data labels.
- Generic SaaS templates.
- Canva-like layouts.
- Low-end AI-generated visual clutter.
- Unapproved fake logos.
- Unapproved founder face edits.
- Unnecessary literal “venom” imagery.

---

## Step 1 — Confirm Exact Active Project Root

Before reading anything else, run:

```powershell
pwd
git rev-parse --show-toplevel
git status --short
git branch --show-current
git log --oneline -10
```

Document:

- Current terminal directory.
- Real git root.
- Current branch.
- Whether this is a worktree.
- Whether there are uncommitted changes.
- Latest 10 commits.

If current directory is a Claude/Kiro worktree, identify the parent project root and explain the relationship.

---

## Step 2 — Full Repository Inventory

Create a complete map of the repository.

Run equivalent read-only inventory commands:

```powershell
Get-ChildItem -Recurse -File | Select-Object FullName
git ls-files
git branch --all
git remote -v
git worktree list
```

Inspect all relevant directories, including but not limited to:

```text
app/
components/
lib/
hooks/
public/
styles/
data/
content/
scripts/
docs/
.claude/
.kiro/
.codex/
.github/
.netlify/
```

Also search for:

```text
README
AGENTS
AUDIT
PHASE
PLAN
RECOVERY
PREMIUM
AWWWARDS
FRAMER
REJECTED
APPROVED
TODO
FIXME
HACK
TEMP
WACUS
LUSION
R3F
Three
Lenis
GSAP
ScrollTrigger
preloader
hero
VSL
apply
schedule
confirmation
```

Use commands such as:

```powershell
git grep -n "TODO\|FIXME\|HACK\|TEMP\|WACUS\|LUSION\|R3F\|ScrollTrigger\|Lenis\|preloader\|HeroScene\|VSL\|Awwwards\|Framer"
```

If `git grep` fails, use PowerShell recursive search.

---

## Step 3 — Inspect Git History and Decision Trail

Analyze the project history, not just current files.

Run:

```powershell
git log --oneline --decorate --all --graph -40
git log --stat --oneline -20
git log --name-status --oneline -20
```

For important commits, inspect:

```powershell
git show --stat <commit>
git show --name-only <commit>
git show <commit> -- <important-file-path>
```

Identify:

- What was recently changed.
- What was repeatedly changed.
- What was reverted.
- What was accepted.
- What appears rejected.
- Which areas have repeated failures.
- Which files are unstable or high-risk.
- Whether visual/design changes were actual architecture changes or just overlays/patches.

Create a “Decision History Map” in the output plan:

| Area | Accepted | Rejected | Repeated Failure | Evidence |
|---|---|---|---|---|

---

## Step 4 — Inspect Project Documentation and Instructions

Read all project docs and instruction files before forming conclusions.

Prioritize:

```text
README.md
AGENTS.md
CLAUDE.md
KIRO.md
AUDIT_REPORT.md
PHASE*.md
PLAN*.md
RECOVERY*.md
PREMIUM*.md
REJECTED*.md
*_PLAN.md
*_AUDIT.md
```

Extract:

- Client/user goals.
- Approved direction.
- Rejected direction.
- Previous implementation attempts.
- Known blockers.
- QA requirements.
- No-deploy rules.
- Brand constraints.
- Stack constraints.
- Motion/design requirements.

Do not invent missing context. Mark unknowns clearly.

---

## Step 5 — Inspect Stack, Dependencies, Scripts, and Tooling

Read:

```text
package.json
package-lock.json
next.config.*
tsconfig.json
eslint.config.*
postcss.config.*
tailwind.config.*
middleware.*
```

Run:

```powershell
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('package.json valid')"
node -e "JSON.parse(require('fs').readFileSync('package-lock.json','utf8')); console.log('package-lock.json valid')"
npm pkg get scripts
npm pkg get dependencies
npm pkg get devDependencies
node -v
npm -v
```

Identify:

- Framework version.
- React version.
- Animation libraries.
- WebGL/Three.js usage.
- Smooth scroll library.
- Video/VSL dependencies.
- CSS architecture.
- Build scripts.
- Test scripts.
- Missing scripts.
- Risky dependencies.
- Duplicate/broken package entries.
- Outdated or unnecessary packages.
- Any dependency that conflicts with current React/Next versions.

No dependency change should be proposed without reason, benefit, risk, and fallback.

---

## Step 6 — Static Code Architecture Audit

Read all major files and map the app.

Must map:

- Routes.
- Layouts.
- Providers.
- Homepage sections.
- Funnel routes.
- VSL/video components.
- CTA components.
- Form/application flow.
- Motion system.
- Scroll system.
- Preloader system.
- WebGL/Three.js system.
- CSS system.
- Mobile responsive rules.
- Content/data source files.

Create a file-level architecture map:

| System | Files | Responsibility | Risk | Notes |
|---|---|---|---|---|

---

## Step 7 — Runtime Verification

Run baseline commands:

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

If tests exist:

```powershell
npm test
```

Then start dev server:

```powershell
npm run dev
```

Open local site in browser:

```text
http://localhost:3000
```

Inspect without hacks.

Do not:

- Force opacity.
- Delete DOM overlays.
- Disable scripts manually.
- Hide preloaders manually.
- Pretend a manually patched browser state is proof.

---

## Step 8 — Browser Visual QA Matrix

Inspect all required viewports:

| Device Class | Width | Height |
|---|---:|---:|
| Desktop Large | 1440 | 1000 |
| Desktop Standard | 1280 | 900 |
| Laptop | 1366 | 768 |
| Tablet | 768 | 1024 |
| Mobile iPhone | 390 | 844 |
| Mobile Large | 430 | 932 |
| Small Mobile | 360 | 740 |

Inspect:

- First load.
- Preloader behavior.
- Hero.
- Navigation.
- Language toggle.
- CTA behavior.
- VSL/video area.
- Every homepage section.
- Footer.
- `/apply`
- `/schedule`
- `/confirmation`
- Mobile scroll.
- Desktop scroll.
- Hash navigation.
- Console errors.
- Console warnings.
- Layout shifts.
- Overflow.
- Touch target sizes.
- Reduced-motion behavior if possible.

For each viewport, document:

| Viewport | What Works | What Fails | Severity | Evidence |
|---|---|---|---|---|

---

## Step 9 — Complete Visual and Creative Audit

Judge the current site as a real premium web product.

Audit:

### Art Direction

- Does it have a coherent visual concept?
- Does it feel premium or patched?
- Does it feel like ecommerce conversion authority?
- Does it avoid snake/toxic/gamer/cyberpunk clichés?
- Does it have a memorable visual system?

### Layout

- Is the hero composition powerful?
- Is the hierarchy obvious?
- Is the CTA priority clear?
- Are sections sequenced as a persuasive narrative?
- Is there dead space?
- Are cards generic?
- Is the content rhythm premium?

### Typography

- Scale.
- Contrast.
- Line length.
- Weight balance.
- Editorial hierarchy.
- Mobile readability.
- CTA clarity.

### Color

- Background depth.
- Accent discipline.
- Premium green usage.
- Contrast.
- Avoidance of cheap neon.
- Supporting tones.
- Section differentiation.

### Motion

- Purpose.
- Timing.
- Easing.
- Scroll choreography.
- Reveal logic.
- Reduced-motion fallback.
- No hidden-content dependency.
- No jank.
- No decorative motion that harms comprehension.

### WebGL / Visual Systems

- Does it add meaning or just noise?
- Is it visible enough?
- Is it integrated into the content?
- Does it harm performance?
- Does it have mobile fallback?
- Does it match the brand?

### Conversion UX

- Does the user understand the offer fast?
- Is the journey persuasive?
- Are objections handled?
- Is founder authority clear?
- Is proof credible?
- Are CTAs placed correctly?
- Is VSL positioned correctly?
- Is the application path clear?

---

## Step 10 — Global Research Requirement

Use browser research for current 2025/2026 references and tools. Do not rely on memory.

Research must include:

### Design and Inspiration

- Current Awwwards-winning landing pages and interactions.
- Framer high-end showcase websites.
- Premium dark editorial web design.
- High-conversion product landing pages.
- Premium SaaS/product storytelling pages.
- Cinematic scroll narratives.
- Founder-led conversion pages.
- Non-generic ecommerce education/training brands.

### Motion / Scroll / Interaction

Research current best-fit libraries and techniques for:

- Scroll choreography.
- Smooth scroll.
- Text splitting/reveal.
- Magnetic buttons.
- Cursor systems.
- Route/page transitions.
- Microinteractions.
- View transitions.
- Reduced-motion-safe systems.
- Performance-safe animation in Next.js.

### WebGL / Creative Tech

Research current best-fit free/open-source tools and techniques for:

- Three.js premium atmospheres.
- Shader gradients.
- Particle fields.
- Flow fields.
- Fluid/metal/glass material illusions.
- Postprocessing alternatives.
- Canvas/WebGL fallbacks.
- Mobile-safe creative coding.

### UI / Component / CSS Systems

Research:

- Modern Next.js 15 compatible UI patterns.
- Tailwind v4 compatible premium CSS patterns.
- shadcn-style composition ideas if already present or appropriate.
- Modern card systems.
- Premium dark theme tokens.
- Accessible interaction patterns.
- Production-ready responsive patterns.

### Templates / Repos / Plugins / Skills

Search for useful public references, repos, examples, templates, and open-source packages.

Rules:

- Prefer official docs, GitHub repos, npm pages, and credible examples.
- Check license if recommending code/templates.
- Do not recommend paid-only services.
- Do not recommend adding a library just because it is trendy.
- Every recommended library/tool must include:
  - Use case.
  - Why it fits this project.
  - Compatibility risk.
  - Bundle/performance risk.
  - Free/open-source status.
  - Whether it is required or optional.

Create a research table:

| Category | Source / Tool / Reference | Why It Matters | Use In Project | Risk | Required/Optional |
|---|---|---|---|---|---|

---

## Step 11 — Local Skills / Plugins / Agent Capability Audit

Inspect local project tooling and available agent infrastructure.

Look for:

```text
.kiro/
.claude/
.codex/
mcp/
skills/
plugins/
scripts/
```

Identify:

- Existing MCP configuration.
- Available local skills/tools.
- Existing agent instructions.
- Any repo-specific rules.
- Any automation scripts.
- Any screenshot or browser QA tooling.
- Any command shortcuts.
- Any build or deploy workflows.

Create:

| Tooling Area | Path | Capability | How To Use | Risk |
|---|---|---|---|---|

---

## Step 12 — Problem Discovery Across Entire Project

Find every important problem, not only homepage design.

Classify issues:

### P0 — Must Fix Before Anything Else

- Broken build.
- Broken typecheck.
- Broken runtime.
- Broken package files.
- Site does not render.
- Preloader blocks site.
- Critical content invisible.
- Routes broken.
- Mobile unusable.
- CTA/apply flow broken.
- Video/VSL broken.

### P1 — Must Fix For Premium Launch

- Weak hero.
- Bad hierarchy.
- Generic sections.
- Poor mobile experience.
- Weak motion.
- Weak proof.
- Weak founder authority.
- Empty/black sections.
- Brand mismatch.
- Visual inconsistency.
- Accessibility issues.
- Performance issues.

### P2 — Technical / Creative Debt

- Duplicate CSS systems.
- Dead components.
- Legacy references.
- Placeholder content.
- Repeated abandoned attempts.
- Overlapping motion systems.
- Unnecessary dependencies.
- Inconsistent naming.
- Fragile workarounds.

Every problem must include:

| Severity | Problem | Evidence | Path | Root Cause | Impact | Fix Direction |
|---|---|---|---|---|---|---|

---

## Step 13 — Define The New Premium Experience Architecture

The plan must define a new homepage journey.

Required narrative structure:

1. **Opening Impact**  
   Immediate high-end brand world, clear offer, serious CTA.

2. **Chaos Diagnosis**  
   Show the real ecommerce chaos operators face.

3. **Decision System Reveal**  
   Present ECOM VENOM as the system that turns chaos into decisions.

4. **Mechanism**  
   Explain how the product-to-call machine works.

5. **Proof Wall**  
   Present proof as premium evidence, not generic testimonials.

6. **Founder Authority**  
   Show founder credibility without cheap influencer styling.

7. **Offer / Application Logic**  
   Make the next step feel selective and high-value.

8. **Objection Handling**  
   Answer friction points with authority.

9. **Final Conversion Moment**  
   Strong CTA with confidence and urgency.

For each section define:

- Current state.
- Desired state.
- Content role.
- Visual direction.
- Motion direction.
- Mobile behavior.
- Files likely affected.
- Acceptance criteria.

---

## Step 14 — Define A Premium Visual System

Plan must include:

### Color System

Define premium tokens for:

- Absolute black.
- Graphite surfaces.
- Deep green accent.
- Muted lime highlight.
- Warm editorial off-white.
- Burnt orange warning/accent if appropriate.
- Glass stroke.
- Hairline borders.
- Glow layers.
- Disabled/muted text.

Do not use cheap neon as the main identity.

### Typography System

Define:

- Hero scale.
- Section heading scale.
- Body text.
- Label text.
- Proof numbers.
- CTA text.
- Mobile scale.
- Line height.
- Max line length.

### Layout System

Define:

- Grid.
- Max widths.
- Section spacing.
- Card rhythm.
- Sticky/pinned moments if useful.
- Fullscreen moments.
- Editorial breaks.
- Proof modules.

### Material System

Define:

- Matte black.
- Smoked glass.
- Subtle green emission.
- Graphite panels.
- Hairline borders.
- Soft bloom.
- Realistic depth.
- No cheap gradients.

---

## Step 15 — Define Motion and Transition System

Plan must include:

- Global easing language.
- Entrance reveals.
- Text reveals.
- CTA interactions.
- Section transitions.
- Scroll progress moments.
- WebGL interaction.
- Video/VSL transition.
- Mobile simplified motion.
- Reduced-motion fallback.
- No content hidden by default.
- No animation dependency for readability.

For every proposed motion, include:

| Motion | Purpose | Trigger | Files | Fallback | Risk |
|---|---|---|---|---|---|

---

## Step 16 — Define WebGL / Creative Coding Plan

Plan must decide whether the current Three.js scene should be:

- Kept and upgraded.
- Rebuilt.
- Simplified.
- Replaced with CSS/canvas.
- Disabled on mobile.

If using Three.js, define:

- Scene concept.
- Geometry/material strategy.
- Shader/postprocessing strategy if needed.
- Interaction.
- Performance budget.
- DPR cap.
- Reduced-motion fallback.
- Mobile fallback.
- Cleanup.
- Acceptance criteria.

No WebGL for decoration only. It must support the brand story.

---

## Step 17 — Define Library / Template / Repo Recommendation Rules

The plan may recommend libraries, snippets, templates, or public repos only if:

- They are compatible with the current stack.
- They are free/open-source or clearly optional.
- License is acceptable or must be checked before use.
- They solve a real project problem.
- They do not replace the brand with generic template design.
- They do not bloat mobile performance unnecessarily.

For each recommended external tool:

| Name | Category | Source | Why Use | Risk | Required/Optional | Integration Target |
|---|---|---|---|---|---|---|

---

## Step 18 — QA Protocol For Final Implementation

The plan must define final QA requirements:

Commands:

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

Browser QA:

- Desktop 1440.
- Desktop 1280.
- Laptop 1366.
- Tablet 768.
- Mobile 390.
- Mobile 430.
- Small mobile 360.

Routes:

```text
/
 /apply
 /schedule
 /confirmation
```

Interactions:

- Navigation.
- Language toggle.
- CTA clicks.
- Form/application path.
- VSL/video controls.
- Scroll.
- Hash anchors.
- Mobile touch.
- Reduced motion.
- Console.

Evidence required:

- Screenshots or browser observations for all major sections.
- Console report.
- Command outputs.
- Known remaining issues.
- Final pass/fail verdict.

---

## Step 19 — Required Final Plan File Structure

Create:

```text
ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md
```

With this exact structure:

```markdown
# ECOMVENOM Supreme Rebuild Master Plan

## 1. Executive Verdict
## 2. Active Project Root And Git State
## 3. Evidence Log
## 4. Commands Run And Results
## 5. Files And Directories Inspected
## 6. Git History And Decision Trail
## 7. Existing Project Goals, Accepted Directions, And Rejected Directions
## 8. Current Architecture Map
## 9. Current Tooling / Skills / Plugins / MCP Audit
## 10. Current Runtime / Build / Route Status
## 11. Current Visual And Creative Quality Assessment
## 12. Current UX And Conversion Assessment
## 13. Current Mobile Assessment
## 14. Current Motion / Scroll / WebGL Assessment
## 15. Complete Problem List By Severity
## 16. Root Cause Analysis
## 17. 2025/2026 Global Research Summary
## 18. Recommended Libraries / References / Repos / Techniques
## 19. New Premium Brand And Art Direction
## 20. New Homepage Experience Architecture
## 21. Section-By-Section Rebuild Plan
## 22. Hero Rebuild Plan
## 23. Motion And Transition System Plan
## 24. WebGL / Creative Coding Plan
## 25. Mobile-First Rebuild Plan
## 26. Accessibility And Performance Plan
## 27. Implementation Phases
## 28. QA Protocol And No-Deploy Gate
## 29. Risks And Rollback Strategy
## 30. Final Execution Prompt
```

---

## Step 20 — Final Response After Creating The Plan

After writing `ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md`, respond only with:

```text
Created:
- ECOMVENOM_SUPREME_REBUILD_MASTER_PLAN.md

Active root:
- ...

Commands run:
- ...

Files/directories inspected:
- ...

Git history inspected:
- Yes/No

Browser research completed:
- Yes/No
- Sources/categories researched:

Browser QA completed:
- Yes/No
- If blocked, why:

Confirmed blockers:
- P0: ...
- P1: ...
- P2: ...

Verdict:
- Safe / Not safe to start implementation

Next prompt:
- ...
```

---

## Final Execution Prompt To Include In The Plan

The final plan must end with this prompt:

```text
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
