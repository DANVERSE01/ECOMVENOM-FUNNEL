# ECOMVENOM — Final CTO Directive: Phase Polish Supreme

> **Authority:** Senior CTO + Creative Director — direct user mandate
> **Branch:** `hotfix/final-production-polish-vsl-funnel`
> **Base `main` commit:** `8bc2ef5`
> **Supersedes:** `FINAL_CTO_DIRECTIVE_PHASE_POLISH.md` (v1)
> **Scope:** Production-recovery + final visual elevation pass on the existing hotfix branch.
> **Outcome contract:** A genuinely production-grade, premium VSL-first funnel that survives a senior visual-director review, with zero regressions to the cinematic hero scroll behavior and zero residual dependency on the legacy `opus47-premium.css` layer.

---

## 0. Locked Constants (do not violate under any circumstance)

| Locked asset | Value |
|---|---|
| Hero VSL `mediaId` | `0z2r9j4jnz` |
| Confirmation video `mediaId` | `bg446wfhed` |
| Active branch | `hotfix/final-production-polish-vsl-funnel` |
| Base `main` commit | `8bc2ef5` |
| Allowed push target | `origin hotfix/final-production-polish-vsl-funnel` only |

**Forbidden actions (absolute):**

- Do not merge into `main`.
- Do not push `main`.
- Do not invoke Netlify CLI, `netlify deploy`, `netlify build`, or any manual deploy path.
- Do not `git reset --hard`, `git push --force`, or rewrite history.
- Do not add npm dependencies.
- Do not rewrite copy or content files (`lib/content.ts`, `lib/translations.ts`, `lib/cinematicRecoveryContent.ts`) unless required to repair a structurally broken layout — and report it explicitly if you do.
- Do not fabricate urgency, viewers, bookings, prices, countdowns, testimonials, revenue, or any social proof not already present.
- Do not reintroduce the custom mouse cursor, the SYSTEM ONLINE / status-rail clutter, the duplicate Pause/Mute pills, or the heavy noisy background atmosphere.
- Do not append further override blocks into `components/venom/opus47-premium.css`. That file is being removed entirely in Phase 0.

---

## 1. Worktree Snapshot — Factual Baseline

Verified `git status --short` at session entry:

```
 M app/layout.tsx
 D components/cursor/ParticleTrailCursor.tsx
 M components/sections/FaqSection.tsx
 M components/sections/FinalCtaSection.tsx
 M components/sections/FounderSection.tsx
 M components/sections/HeroSection.tsx
 M components/sections/MechanismSection.tsx
 M components/venom/VslStage.tsx
?? FINAL_CTO_DIRECTIVE_PHASE_POLISH.md
?? FINAL_CTO_DIRECTIVE_PHASE_POLISH_SUPREME.md
?? audit-production-polish/
?? components/venom/final-production-polish.css
```

`opus47-premium.css` was restored via `git checkout HEAD -- components/venom/opus47-premium.css` after a botched mid-session patch. It is the primary target of Phase 0 below.

---

## 2. What Is Already Fixed — Locked (do NOT re-fix)

These are confirmed working — validated by Playwright DOM probes, captured screenshots, and clean `tsc --noEmit` + `lint` + `build`. Treat as immutable baseline:

| # | Defect | Resolution | Files touched |
|---|---|---|---|
| 1 | Custom mouse cursor / glow / particle trail | Component file deleted, layout reference removed, `cursor: none` rules eliminated | `components/cursor/ParticleTrailCursor.tsx` (DELETED), `app/layout.tsx` |
| 2 | Hero VSL cluttered with SYSTEM ONLINE label, oversized status/step rail, slate, eyebrow, proof bullets, duplicate Pause/Mute pills | Stripped to: ECOM VENOM logo + language toggle + clean dominant VSL + headline + body + primary CTA | `components/sections/HeroSection.tsx`, `components/venom/VslStage.tsx` |
| 3 | FAQ accordion did not reveal answers | Rewritten with one-open-at-a-time semantics, `aria-expanded`, `aria-controls`, keyboard-accessible button, Framer Motion height/opacity transition | `components/sections/FaqSection.tsx` |
| 4 | Founder/Operator section random + mechanical | Editorial 2-column composition, balanced image/text relationship, controlled headline scale | `components/sections/FounderSection.tsx` |
| 5 | Final CTA dead empty rectangle | Premium close panel with restrained surface treatment, clear CTA hierarchy, mobile-safe, reduced-motion-safe | `components/sections/FinalCtaSection.tsx` |
| 6 | Cinematic hero scroll froze (P0 regression caused by compressing the hero to exactly 100svh, collapsing ScrollTrigger range to ~0px) | Restored `min-height: 145svh` on `.v2-hero--vsl-first` desktop, `130svh` tablet, `100svh` mobile; top-anchored content via `align-content: start`; scroll runway ≈ 405px @ 1440×900 | `components/venom/final-production-polish.css` |
| 7 | Mechanism scrub timing too tight | Lengthened scrub duration | `components/sections/MechanismSection.tsx` |
| 8 | Build/lint/typecheck failures | All pass with 0 errors, 0 warnings | — |

### 2.1 Measured baselines after the above fixes

**1440×900 desktop:**
- VSL height: 503px (was 659px before fold fix)
- Headline top: 700px (in viewport)
- Primary CTA top: 863px (in viewport)
- Hero total: 1305px (includes ~405px cinematic scroll runway)
- `HeroScene` canvas: mounted, ScrollTrigger active, progress ≈ 0.62 at y=250 — gradual cinematic confirmed

**1366×768 laptop:**
- VSL height: 363px
- Primary CTA top: 668px (in viewport)
- Hero total: 1114px (includes ~346px cinematic scroll runway)

**390×844 mobile:**
- VSL top: 144px, VSL height: 240px
- Headline top: 400px
- Hero total: 844px (HeroScene gated off — mobile-light)

These numbers are the **lower bounds**. Any subsequent change that drops below these baselines is a P0 regression.

---

## 3. Phase 0 — Nuke `opus47-premium.css` (CRITICAL OUTSTANDING ACTION)

**Rationale:** `opus47-premium.css` is a 1,958-line accumulated legacy visual layer. It corrupted twice during this session's polish work, was partially deleted, restored via `git checkout HEAD --`, and was the source of the cinematic regression risk. The user has explicitly authorized its complete permanent removal. Any rules it currently contributes to the live site must be salvaged into the clean `final-production-polish.css` layer (or `tokens.css` / `cinematic-v2.css` if foundational) **before** deletion — but only the rules that are actually used.

### 3.1 Dependency surface audit (read-only)

Run the audit and produce evidence:

```bash
# Extract every unique class/id/selector defined in opus47-premium.css
grep -oE '\.[a-zA-Z_][a-zA-Z0-9_-]*' components/venom/opus47-premium.css \
  | sort -u > /tmp/opus47-selectors.txt

# Cross-reference each selector against the active source tree
> /tmp/opus47-usage.txt
while IFS= read -r raw; do
  sel="${raw#.}"
  hits=$(grep -rl --include='*.tsx' --include='*.ts' --include='*.css' "$sel" app/ components/ lib/ 2>/dev/null | grep -v 'opus47-premium.css' | wc -l)
  echo "$sel $hits" >> /tmp/opus47-usage.txt
done < /tmp/opus47-selectors.txt

sort -k2 -nr /tmp/opus47-usage.txt | head -60
```

Output to: `audit-production-polish/OPUS47_DEPENDENCY_AUDIT.md`

Classify every selector into one of:

- **Category A — Critical & in-use:** referenced by at least one active component AND no equivalent rule exists in `cinematic-v2.css`, `tokens.css`, or `final-production-polish.css`. → **Must migrate.**
- **Category B — Used but already covered:** referenced by components, but an equivalent rule already lives in another active stylesheet. → **No migration. Verify no specificity regression.**
- **Category C — Orphan / dead:** zero component references. → **Drop entirely. Do not migrate.**
- **Category D — Toxic legacy (Phase 11 override block):** the block that caused the cinematic regression and the patching loop. → **Drop entirely under all circumstances.**

### 3.2 Selective migration (Category A only)

For each Category A selector:

1. Copy the rule verbatim into `components/venom/final-production-polish.css` under a labeled section comment:
   ```css
   /* ---- Migrated from opus47-premium.css: .selector-name ---- */
   ```
2. Preserve the original cascade weight. If `opus47-premium.css` previously loaded earlier than `final-production-polish.css`, the migrated rule must remain less specific than any later override in `final-production-polish.css`.
3. **Do not** copy decorative rules tied to defects intentionally removed in §2 (cursor glow, status rail decorations, SYSTEM ONLINE styling, heavy background atmospheres, decorative VSL slate, etc.).
4. **Do not** copy any rule from the Phase 11 / Phase 12 / "FINAL USER VISUAL DEFECTS OVERRIDE" block — those were the broken patching attempts and are explicitly toxic.

### 3.3 Delete the legacy file

```bash
git rm components/venom/opus47-premium.css
```

Then remove the `@import` (or JS import) of `opus47-premium.css` from `app/globals.css` and from anywhere else it might be referenced. Verify zero residual references:

```bash
grep -rn "opus47-premium" app/ components/ lib/ public/ \
  && echo "FAIL: residual references" \
  || echo "CLEAN: zero references"
```

If the check returns `FAIL`, remove every residual line before proceeding.

### 3.4 Post-deletion build + visual parity verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```

All three must exit `0`. Then start `npm run dev` and visually inspect at 1440×900, 1366×768, 390×844:

- Hero composition unchanged (VSL + headline + CTA still composed inside the first viewport).
- Cinematic scroll runway still ≥ 350px @ 1440×900 (re-measure via DOM probe).
- HeroScene still mounted and progress is still gradual.
- No flash of unstyled content (FOUC).
- No broken card surfaces, button states, or section spacing.
- No `404` on stylesheet fetch in DevTools Network panel.

If any visual regression appears, the missing rule is Category A and was misclassified. Recover it from history:

```bash
git show HEAD~1:components/venom/opus47-premium.css | grep -A 10 'broken-selector'
```

Migrate, re-verify. Do **not** restore the whole file.

### 3.5 Commit Phase 0 as an atomic commit

```bash
git add -A
git commit -m "refactor(css): remove legacy opus47-premium.css, migrate critical rules to final-production-polish.css"
```

(Do not push yet — Phase 0 is part of the final hotfix commit chain, or you may push intermediate commits to the same branch for safety.)

---

## 4. Phase 1 — Cinematic Scroll Integrity Re-verification

Confirm the cinematic runway survived Phase 0 with no regression:

| Viewport | Expected hero height | Expected scroll runway | HeroScene scroll-progress sample |
|---|---|---|---|
| 1440 × 900 desktop | 1305 px | ≥ 350 px | y=0 → 0.00, y=200 → ~0.50, y=400 → ~1.00 |
| 1366 × 768 laptop | 1114 px | ≥ 320 px | y=0 → 0.00, y=170 → ~0.50, y=340 → ~1.00 |
| 1280 × 900 desktop | 1305 px | ≥ 350 px | identical curve to 1440 |
| 768 × 1024 tablet | 100 svh | 0 | HeroScene gated off |
| 430 × 932 / 390 × 844 / 360 × 740 mobile | 100 svh | 0 | HeroScene gated off — mobile-light |

**Reduced-motion contract:** HeroScene renders one static frame near half-convergence. No scroll-driven animation runs. All content remains fully visible. No opacity ghosts. No transform freezes that hide content.

Measure via Playwright/DOM probe and record the readings into `audit-production-polish/CINEMATIC_VERIFICATION.md`.

---

## 5. Phase 2 — Final Visual Elevation Sweep

Only after Phase 0 + Phase 1 fully pass, perform a controlled elevation sweep. Use external references **as inspiration only** — never copy-paste.

### 5.1 Reference usage matrix

| Reference | Use for | Reject |
|---|---|---|
| Superdesign (`app.superdesign.dev`) | Editorial section rhythm, dark premium surface depth, restrained hierarchy | Generic templates, neon/gamer aesthetics |
| shadcn/ui | Accessibility baseline via Radix primitives semantics | Direct component copy-paste |
| Magic UI | Hairline section signal-line ideas, restrained animated badges | Heavy effects (Meteors, BorderBeam) in production |
| Motion Primitives | Reveal / transition choreography, scroll-linked fade timing | Repetitive blur or wave effects |
| React Bits | Desktop-only controlled wow — only if implementation < 4 KB gzipped and reduced-motion safe | Anything > 8 KB or that breaks mobile |
| Uiverse | Microinteraction grammar — button focus rings, card hover restraint | Community snippets with weak fundamentals |

**Universal rules:** never copy 1:1. Never paste templates. Every selected idea must improve conversion clarity, perceived trust, premium feel, or motion comprehension. Every effect must degrade safely under `prefers-reduced-motion: reduce`.

### 5.2 Background restraint pass

Inspect and reduce:

- Heavy particle fields, glitch grain, animated noise loops still active on desktop.
- Any full-viewport animated SVG / canvas painted on mobile.

Implement in `final-production-polish.css`:

- Restrained graphite / OLED radial gradient — maximum 2 color stops.
- Optional `mask-image` vignette at 8-12% opacity.
- Mobile background: flat or single-stop gradient only — no animation.

### 5.3 Section handoff transitions

Add **one** restrained transition primitive: a 1 px acid-lime hairline that fades in via `IntersectionObserver` as the next section enters the viewport. Apply to:

- Hero → Problem
- Problem → Mechanism / ScrollFilm
- Founder/Operator → Offer
- FAQ → Final CTA

Implementation lives in `components/venom/final-production-polish.css` + a minimal hook inside `components/effects/ScrollMotionInit.tsx`. The hairline must be hidden when `prefers-reduced-motion: reduce` is set.

### 5.4 Typography rhythm

Verify the perfect-fourth typographic scale is consistent across:

- Hero headline
- Section headings (Problem, Mechanism, Founder, Offer, FAQ, Final CTA)
- Body copy
- Caption / meta / label tier

Fix any oversized headline competing with the VSL or the founder image. Headings must respect `--font-display` / `--font-heading` token assignment from `tokens.css`.

### 5.5 Card system pass

Audit every card-like surface — proof tiles, mechanism steps, FAQ items, founder credentials, offer pillars:

- Same border-radius family: `--radius-lg` for primary surfaces, `--radius-md` for nested.
- Same hairline border: `1px solid var(--ev-line-soft)` (or the existing token equivalent).
- Same hover restraint: no `translateY` > 2 px, no glow halo > 12% opacity, no scale > 1.015.

### 5.6 CTA hierarchy

Confirm exactly one **primary** CTA per fold:

- Hero — "Start Your Application"
- Offer — same primary action
- Final CTA — same primary action

All secondary CTAs (ghost / link variants) must be visually subordinate: no halo, no fill, no equal weight.

### 5.7 Mobile parity audit

Slow-scroll the entire homepage at 390 × 844 and 430 × 932 with the eye of someone who has never seen the desktop version. The mobile experience must feel **intentionally designed**, not a stacked desktop. Check specifically:

- VSL is first, dominant, and immediately visible.
- No horizontal overflow.
- No headline forced into 3+ awkward wrap lines.
- Section padding ≥ 48 px top / bottom on every section.
- Sticky mobile CTA is present, restrained, and never overlaps the active CTA in view.
- AR / RTL mirrors correctly with no broken margins.

---

## 6. Phase 3 — Full QA Gate

### 6.1 Automated gate (must all exit 0)

```bash
npx tsc --noEmit
npm run lint
npm run build
```

### 6.2 Viewport × route matrix (manual slow-scroll inspection)

| Viewport | Routes to inspect |
|---|---|
| 1440 × 900 desktop | `/`, `/apply`, `/schedule`, `/confirmation` |
| 1366 × 768 laptop | `/`, `/apply`, `/schedule`, `/confirmation` |
| 1280 × 900 desktop | `/` |
| 768 × 1024 tablet | `/` |
| 430 × 932 mobile | `/`, `/apply`, `/schedule`, `/confirmation` |
| 390 × 844 mobile | `/`, `/apply`, `/schedule`, `/confirmation` |
| 360 × 740 small mobile | `/` |

For each row: open the route, slow-scroll top → bottom, pause at every major section, judge with a senior creative director's eye. Automated DOM probes are **supplements**, not a substitute, for real visual judgment.

### 6.3 Assertion checklist (every box must tick)

- [ ] Zero custom cursor visible at any viewport
- [ ] Hero VSL clean — no SYSTEM ONLINE, no status rail, no decorative Founder VSL / ECOMVENOM slate, no duplicate Pause/Mute pills
- [ ] Hero VSL uses `mediaId="0z2r9j4jnz"`
- [ ] Confirmation page uses `mediaId="bg446wfhed"`
- [ ] HeroScene mounted on desktop/laptop, gated off on tablet/mobile per the existing media-query gate
- [ ] Cinematic scroll runway ≥ 350 px @ 1440 × 900
- [ ] HeroScene progress visibly advances at 25 %, 50 %, 75 % of hero scroll
- [ ] Zero `opus47-premium.css` references anywhere in the repo (grep returns empty)
- [ ] Zero horizontal overflow at any viewport (compare `documentElement.scrollWidth` to `clientWidth`)
- [ ] Zero black/blank Wistia state on first paint
- [ ] Click-for-sound overlay appears **only** when autoplay-with-sound is blocked; never as decoration
- [ ] FAQ expand/collapse works; only one open at a time; `aria-expanded` toggles correctly; answer region is keyboard-focusable
- [ ] Founder section reads as editorial, not random
- [ ] Final CTA reads as a premium conversion close, not a placeholder rectangle
- [ ] Background is restrained graphite / smoked depth, not noisy
- [ ] Section handoff hairlines visible but tasteful
- [ ] EN flow works end-to-end
- [ ] AR / RTL mirrors correctly end-to-end
- [ ] `prefers-reduced-motion: reduce` shows all content; disables scroll-driven motion
- [ ] DevTools console: zero errors, zero React warnings, zero hydration mismatches
- [ ] Lighthouse Performance (local production build): ≥ 85 desktop, ≥ 70 mobile

### 6.4 Required evidence — capture into `audit-production-polish/final-evidence/`

```
d1440-hero.png
d1440-hero-scroll-25.png
d1440-hero-scroll-50.png
d1440-hero-scroll-75.png
d1440-problem.png
d1440-scrollfilm.png
d1440-mechanism.png
d1440-roadmap.png
d1440-proof.png
d1440-founder.png
d1440-offer.png
d1440-faq-closed.png
d1440-faq-expanded.png
d1440-final-cta.png
d1366-hero.png
d1280-hero.png
t768-hero.png
m430-hero.png
m430-mid-scroll.png
m430-final-cta.png
m390-hero.png
m390-mid-scroll.png
m390-faq-expanded.png
m390-final-cta.png
s360-hero.png
apply-desktop.png
apply-mobile.png
schedule-desktop.png
schedule-mobile.png
confirmation-desktop.png
confirmation-mobile.png
ar-rtl-hero.png
reduced-motion-hero.png
```

If a single assertion fails or a single screenshot reveals a weak/cheap/cluttered/broken state: **stop, fix, rerun the automated gate, recapture the affected evidence**. Do not commit on a weak result.

---

## 7. Phase 4 — Commit & Push (hotfix branch only)

When and only when every Phase 3 assertion passes:

```bash
git add -A
git commit -m "fix: remove opus47 legacy layer, restore cinematic scroll, final production polish"
git push origin hotfix/final-production-polish-vsl-funnel
```

**Explicitly forbidden in Phase 4:**

- `git checkout main` followed by any merge
- `git push origin main`
- `git push --force` to any branch
- `git reset --hard`
- Any invocation of `netlify` CLI
- Any manual deploy command

Netlify auto-deploy from `main` is unaffected — `main` is untouched.

---

## 8. Required Final Report (return verbatim in Kiro chat)

```
## ECOMVENOM Final Production Polish — Phase Polish Supreme Report

- Branch: hotfix/final-production-polish-vsl-funnel
- Base main commit: 8bc2ef5
- Final commit hash on hotfix: <hash>
- opus47-premium.css status: DELETED
- final-production-polish.css status: ACTIVE (loaded last in CSS chain)

### Opus47 migration audit
- Selectors classified A (migrated): <count>
- Selectors classified B (already covered elsewhere): <count>
- Selectors classified C (orphan, dropped): <count>
- Selectors classified D (toxic legacy, dropped): <count>
- Audit doc: audit-production-polish/OPUS47_DEPENDENCY_AUDIT.md

### Cinematic scroll verification
- HeroScene mounted: YES
- Hero height @ 1440×900: <px>
- Hero scroll runway @ 1440×900: <px>
- Hero height @ 1366×768: <px>
- Hero scroll runway @ 1366×768: <px>
- Progress sample at y = hero/2: <value 0..1>
- Verification doc: audit-production-polish/CINEMATIC_VERIFICATION.md

### User-observed defects resolved
1. Custom cursor — REMOVED
2. Hero VSL clutter — CLEANED
3. Founder section — REWORKED (editorial)
4. FAQ accordion — FIXED (one-at-a-time, accessible)
5. Final CTA — REWORKED (premium close)
6. Background heaviness — REDUCED
7. Section transitions — UPGRADED (acid-lime hairline)
8. Hero fold composition — FIXED (1440 / 1366 / 1280)
9. Mobile parity — VERIFIED (390 / 430 slow-scroll)

### Reference ideas applied vs rejected
- Applied: <list with one-line reason each>
- Rejected: <list with one-line reason each>

### Files changed (full)
<full list>

### Commands run + exit codes
- npx tsc --noEmit: <exit>
- npm run lint: <exit>
- npm run build: <exit>

### Evidence
- Folder: audit-production-polish/final-evidence/
- Screenshots captured: <count>

### Performance
- Lighthouse Performance desktop: <score>
- Lighthouse Performance mobile: <score>
- LCP / CLS / INP: <values>

### Mobile observations
<one-paragraph narrative>

### Reduced-motion observations
<one-paragraph narrative>

### Remaining risks
<list or "none">

### Push hygiene
- Pushed to main: NO
- Manual Netlify deploy run: NO
- Netlify CLI invoked: NO
- git push --force used: NO
- git reset used: NO
```

---

## 9. Short-form Kiro command (paste into chat)

```
Read FINAL_CTO_DIRECTIVE_PHASE_POLISH_SUPREME.md from the active project root and execute Phase 0 through Phase 4 in strict order. Phase 0 is non-skippable: audit opus47-premium.css dependencies, migrate only Category A rules into final-production-polish.css, delete opus47-premium.css and its import, then verify build and visual parity. Do not merge or push main. Do not invoke Netlify CLI or any deploy command. Stay on branch hotfix/final-production-polish-vsl-funnel. Return the full final report verbatim per Section 8 of the directive.
```

---

**End of directive.**
