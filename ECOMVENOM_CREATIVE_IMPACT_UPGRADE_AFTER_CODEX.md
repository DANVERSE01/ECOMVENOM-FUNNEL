# ECOMVENOM — Creative Impact Upgrade Brief After Codex

**Target Agent:** Claude Code  
**Project:** ECOMVENOM Funnel Website  
**Mode:** Full-site creative design upgrade after Codex Phase 4 recovery  
**Primary Standard:** visibly better, more premium, more interactive, more cinematic — without regressing working production behavior.

---

## 1. Core Instruction

This is not a bureaucracy task.

Do not waste time producing long audit documents, long research summaries, or generic reports.

The goal is a **real visible creative upgrade** to the current ECOMVENOM website.

The site already has working recovery fixes from Codex. Your job is to build on top of that baseline and make the website noticeably more premium, more creative, more visually interactive, and more impressive — without making it worse, slower, or unstable.

The final result must feel like a high-end creative direction pass, not a safe cosmetic tweak.

---

## 2. Known Production Baseline To Preserve

Current known production baseline:

```txt
Production URL: https://ecomvenom.netlify.app
Production branch: main
Production commit: 85a9c9a
Commit message: fix: phase 4 vsl and cinematic mobile QA
Netlify deploy: 6a091ace57edd90008a2b424
State: ready
```

Codex already fixed important functional and interaction issues. Do not regress them.

Preserve:

- Hero VSL visibility.
- Hero VSL play/pause controls.
- Hero VSL mute/unmute behavior.
- Browser-safe Wistia sound fallback.
- Proof dialog no longer blocking clicks when closed.
- Mobile cinematic scene is scroll-scrubbed.
- Mobile cinematic video progresses with scroll.
- Mobile cinematic scene expands immersively instead of staying as a small card.
- Sticky mobile CTA hides during the cinematic scene and returns after it.
- No mobile horizontal overflow.
- `/`, `/apply`, `/schedule`, `/confirmation` remain working.
- `typecheck`, `lint`, and `build` remain passing if scripts exist.

Files previously touched by Codex and requiring extra care:

```txt
components/cinematic/WistiaPlayer.tsx
components/venom/VslStage.tsx
components/sections/HeroSection.tsx
components/venom/tokens.css
components/venom/cinematic-v2.css
components/cinematic/LusionMonitorScrollScene.tsx
components/ui/StickyMobileCTA.tsx
```

These files are not forbidden, but any edit to them must preserve the working behavior above.

---

## 3. What This Upgrade Must Achieve

The website must become clearly better than the current live version.

The improvement must be visible immediately.

Upgrade the site into a more:

- premium
- cinematic
- dark-luxury
- interactive
- high-conversion
- visually memorable
- art-directed
- polished
- scroll-narrative-driven
- modern 2026 creative web experience

Do not deliver a minor color tweak and call it done.

Do not deliver a weaker or flatter design than the current site.

Do not over-protect the existing version so much that nothing meaningfully improves.

The rule is:

```txt
Preserve working functionality.
Upgrade the visual and interaction quality aggressively but safely.
```

---

## 4. Brand Direction

ECOMVENOM is not a snake brand.

Do not use:

- snakes
- fangs
- reptile textures
- venom drops
- slime
- toxic green clichés
- gamer neon
- cyberpunk HUD clutter
- fake futuristic labels
- fake badges
- fake awards
- fake logos
- AI-looking decoration

ECOMVENOM should feel like:

- lethal execution
- ecommerce discipline
- speed
- control
- premium funnel strategy
- high-ticket authority
- dark luxury
- founder-led precision
- conversion power
- cinematic evidence
- commercial seriousness

Visual atmosphere:

- premium black editorial luxury
- deep graphite surfaces
- petrol black depth
- dark emerald accents
- smoked green light
- warm off-white typography
- muted metallic glass
- controlled glow
- precise borders
- cinematic shadows
- glossy final highlight pass
- section-to-section visual continuity

---

## 5. Execution Style

Work like a senior creative technologist.

Do not just “fix”.
Do not just “polish”.
Do not just “audit”.

Actually improve the experience.

Use the current project stack first.

Do not add dependencies unless there is a strong reason and the visual payoff is clearly worth it.

Do not install libraries just because they are trendy.

Use modern creative UI references only as inspiration, not as a reason to create a component-library demo.

Useful references to consider only when helpful:

- shadcn/ui
- Magic UI
- Aceternity UI
- React Bits
- Motion-Primitives
- 21st.dev
- Origin UI
- Kibo UI
- Animate UI

Do not spend excessive time researching. This is an execution task.

---

## 6. Minimal Required Preflight

Before editing, run only the necessary checks:

```bash
git remote -v
git branch --show-current
git rev-parse --short HEAD
git status --short
git log -1 --oneline
```

If the workspace is not the expected project or not aligned with the production baseline, stop and report it.

Create one short preflight note:

```txt
_ECOMVENOM_CREATIVE_PREFLIGHT.md
```

Keep it concise. It should include:

- current branch
- current commit
- whether it matches `85a9c9a`
- current dirty files
- scripts available in `package.json`
- top 5 visual upgrade opportunities

Do not turn this into a long audit report.

---

## 7. Safe Branch

Work on a safe branch:

```bash
git checkout -b design/creative-impact-upgrade
```

If the branch exists, create a unique variant.

Do not push or deploy unless the user explicitly asks after QA.

---

## 8. Priority Creative Targets

Upgrade the full site top-to-bottom, but prioritize visible impact.

### 8.1 Hero / First Screen

Make the first screen feel significantly more premium and cinematic.

Improve:

- composition
- headline hierarchy
- depth
- lighting
- CTA grouping
- visual confidence
- hero/VSL relationship
- above-the-fold conversion clarity
- mobile first-screen impact

Do not break VSL controls or Wistia behavior.

The hero must feel like a premium conversion machine, not a generic landing page.

---

### 8.2 VSL Stage Visual Upgrade

Keep the working Wistia logic.

Improve only the visual and interaction frame:

- cinematic dark viewing stage
- premium glass/metal border
- controlled light spill around the video
- better play/control visual integration
- responsive proportion
- polished mobile layout
- no fake controls
- no random analytics labels

---

### 8.3 Cinematic Scroll Scene

This is one of the most important experiential sections.

Preserve the scroll-scrub behavior.

Improve the cinematic feeling:

- deeper immersion
- smoother visual scale
- better transition into and out of the scene
- more premium “screen tunnel” feeling
- less empty space
- more controlled light and shadow
- better mobile visual composition

Do not turn it back into a normal autoplay video.

Do not break the mobile scroll-scrub.

---

### 8.4 REAL PROOF Evidence Wall

Upgrade REAL PROOF into a high-impact evidence experience.

Desired behavior:

- desktop pinned horizontal proof gallery
- vertical scroll drives horizontal movement
- premium framed proof cards
- cinematic evidence wall feeling
- subtle progress indicator
- readable proof images
- dark glass/metal surfaces

Mobile behavior:

- no scroll trap
- use horizontal snap or stacked premium cards
- keep screenshots readable
- keep CTA accessible

Use existing proof assets only.

Do not invent proof, claims, names, screenshots, numbers, or captions.

---

### 8.5 Full Section-by-Section Upgrade

Move through every section in visual order.

For each section:

- improve hierarchy
- improve spacing
- improve rhythm
- improve mobile layout
- improve card design
- improve backgrounds
- improve transition from previous section
- improve CTA clarity
- remove generic styling
- add premium visual treatment where useful

Do not leave any section looking like the old weaker version.

---

### 8.6 UI / Creative Component Upgrade

Upgrade the feel of:

- buttons
- cards
- badges only if real
- video frames
- proof frames
- FAQ accordions
- dividers
- progress indicators
- section labels
- mobile cards
- hover states
- tap states
- focus states

Everything must feel branded and intentional.

No pasted template feeling.

---

### 8.7 Scroll / Navigation / Transitions

Improve the whole scroll experience.

Verify:

- anchor links
- CTA links
- section transitions
- sticky elements
- mobile scroll
- reduced motion
- no horizontal overflow
- no hidden content
- no scroll jank

Add only purposeful scroll motion.

Do not add random animations everywhere.

---

### 8.8 Final Lighting Pass

After layout and structure, do one final premium lighting pass.

Add restrained:

- edge highlights
- soft green glow
- glass reflections
- metallic borders
- cinematic shadows
- light falloff
- section separators
- subtle hover shimmer
- final CTA emphasis

This should make the site look expensive.

Do not make it noisy, neon, or cheap.

---

## 9. Motion Direction

Motion must improve the story and conversion path.

Use:

- subtle hero entrance
- scroll-linked section progression
- proof gallery movement
- CTA hover/press feedback
- card depth
- FAQ open/close polish
- final CTA emphasis

Avoid:

- random fade-ins everywhere
- excessive parallax
- scroll hijacking
- custom cursor on mobile
- heavy 3D decoration
- animations that delay reading
- animations that hide CTAs
- motion that hurts mobile

Performance rules:

- animate `transform` and `opacity`
- avoid animating layout properties
- respect `prefers-reduced-motion`
- simplify on mobile
- avoid unnecessary JavaScript

---

## 10. Mobile Standard

Mobile must be designed, not compressed.

Check and improve:

- first screen
- headline scale
- CTA accessibility
- sticky CTA behavior
- VSL controls
- cinematic scene
- proof readability
- section spacing
- FAQ usability
- final CTA visibility
- no horizontal overflow
- no sticky overlap

Mobile must feel premium and intentional.

---

## 11. Acceptance Criteria

The final result is acceptable only if:

- It is visibly more premium than the current production site.
- The improvement is clear from screenshots.
- Full site was upgraded, not only one section.
- Hero feels stronger.
- VSL frame feels more premium without breaking controls.
- Cinematic scene still works and feels better.
- REAL PROOF is upgraded into a memorable evidence experience.
- Navigation and CTAs still work.
- Mobile is clean and premium.
- No fake content was added.
- No snake/venom clichés were introduced.
- No unnecessary heavy dependency was added.
- Typecheck/lint/build pass if scripts exist.
- Browser QA was actually performed.

---

## 12. Real Browser QA

Run the local app.

Open in Chrome/Chromium or Playwright if available.

Test:

```txt
/
 /apply
 /schedule
 /confirmation
```

Viewports:

```txt
390
768
1440
```

Must verify:

- all CTAs
- navigation links
- hash links
- VSL controls
- language RTL behavior
- FAQ
- proof dialog
- REAL PROOF section
- cinematic scroll scene
- mobile sticky CTA
- application form basic flow
- schedule disabled state
- no horizontal overflow
- no framework overlay
- no relevant console app errors
- final CTA visibility

Capture screenshots if available:

- hero desktop
- hero mobile
- VSL stage
- cinematic scene mid-scroll
- REAL PROOF desktop
- REAL PROOF mobile
- final CTA

---

## 13. Final Report

Create only one concise final report:

```txt
_ECOMVENOM_CREATIVE_IMPACT_REPORT.md
```

Include:

- branch used
- files changed
- visual upgrades completed
- before/after improvement summary
- Codex fixes preserved
- REAL PROOF behavior
- cinematic scene behavior
- mobile behavior
- dependencies added or none
- commands run
- QA result
- screenshots captured if available
- remaining risks

Keep it concise and useful.

Do not write a long essay.

---

## 14. Completion Rule

Do not claim completion unless the site is actually better.

The final design must create a clear visible difference.

The correct output is not “I audited the site”.

The correct output is:

```txt
A noticeably stronger, more cinematic, more premium, more interactive ECOMVENOM website that preserves the current working production fixes.
```
