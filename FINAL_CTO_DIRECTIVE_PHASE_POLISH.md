

ECOMVENOM Final Production‑Polish Directive
## Context
You are resuming work on branch hotfix/final‑production‑polish‑vsl‑funnel. The previous plan
and execution phases up to Phase 10 delivered a VSL‑first funnel but left several serious regressions and
unresolved visual issues. In particular:
The cinematic hero scene no longer animates smoothly with scroll because the hero section was
collapsed to one viewport height. The ScrollTrigger controlling HeroScene no longer has enough
runway to play its animation.
Visual clutter and outdated artefacts (custom cursors, noisy backgrounds, decorative labels and
control panels) are still present and hurting performance and polish.
Key sections (Founder/Operator, FAQ/Practical Objections, Final CTA) feel random, unfinished and
unprofessional.
The responsive layout suffers on laptop/tablet/mobile viewports, leaving the hero composition
broken and mobile flow cramped.
As Senior CTO & Creative Director you must perform a production recovery pass and execute a final visual
elevation without introducing new regressions. The goal is to reach a professionally finished, premium
funnel that maintains the VSL‑first narrative, cinematic feel, and conversion clarity across all devices.
Non‑negotiable constraints
No new dependencies – your fixes must use the existing tech stack (Next.js, React, Tailwind, GSAP).
Do not install additional packages.
No copy/claim fabrication – do not add fake urgency, fake viewers/bookings, fake prices, fake
testimonials or anything misleading. All messaging must remain truthful.
No design reversions – do not reintroduce the custom cursor, noisy backgrounds or clutter removed
in earlier phases. Keep the VSL‑first composition, but refine it.
Do not push or merge to main – all work must stay on the hotfix branch until approved. Never run
Netlify CLI or any manual deploy.
Media IDs are fixed – Hero VSL must remain 0z2r9j4jnz and the confirmation video must
remain bg446wfhed.
Respect performance and accessibility – animations must degrade gracefully under
prefers‑reduced‑motion; mobile must remain performant; no horizontal overflow or long
repaint chains.
## •
## •
## •
## •
## 1.
## 2.
## 3.
## 4.
## 5.
## 6.
## 1

Phase 1 – Diagnose the regression
Perform a detailed inspection to locate the exact change that collapsed the hero height and broke the
cinematic motion:
Run git status --short and git diff --stat to see uncommitted changes.
Inspect diffs for HeroSection.tsx, HeroScene.tsx, VslStage.tsx,
final‑production‑polish.css and opus47‑premium.css. Identify where .v2‑hero or
.v2‑hero--vsl‑first is set to 100svh or similar.
Check ScrollTrigger setup in lib/motion.ts and components/effects/
ScrollMotionInit.tsx – ensure you still call ScrollTrigger.refresh() and that the trigger
range uses the full height of the hero.
Validate that HeroScene is still mounted and not removed due to gating logic.
Document your findings in audit‑production‑polish/USER_VISUAL_DEFECTS_FIX_PLAN.md under a
P0 defect entry. Include the exact file/line causing the height collapse and describe how it interferes with
the scroll animation.
Phase 2 – Stabilise legacy styles
opus47‑premium.css is a legacy CSS layer that has accumulated patches over the project’s history. Do
not keep appending overrides into this file. Clean it enough to be build‑safe and then leave it alone:
Remove partial or malformed overrides introduced during the broken patch attempt. Use
npm run lint and the IDE to locate syntax errors.
Do not add new design rules or overrides into opus47‑premium.css.
Create a new file components/venom/final‑production‑polish.css that will load after all other CSS.
This file will contain only the scoped, final corrections. Import it at the end of the global CSS import chain in
app/layout.tsx or the appropriate entry point.
Phase 3 – Restore cinematic scroll runway
Rework the hero section so it preserves enough scroll distance for the cinematic scene to breathe while
keeping the VSL, headline and CTA visible on the first fold:
Desktop/laptop: Set the .v2‑hero--vsl‑first section height to roughly 140svh–155svh.
Top‑anchor the content wrapper (VslStage and headline container) using position: sticky
or nested flexbox so they occupy the first 100svh, leaving an extra runway below for the scene to
animate.
Mobile: Keep the hero height light, but ensure there is still a small runway for any subtle mobile
effect. You may gate the cinematic scene entirely on mobile if performance requires it – but the VSL
must remain first and fully visible.
Ensure ScrollTrigger starts at top top and ends at bottom top of the hero. With a taller
hero, the scroll range (end minus start) will be > 350px on desktop. Verify by logging self.end -
self.start in the onUpdate callback.
## •
## •
## •
## •
## •
## •
## 1.
## 2.
## 3.
## 2

Reduced motion: when prefers‑reduced‑motion: reduce is detected, skip the animation and
display a static hero state at mid‑convergence.
Acceptance criteria for this phase:
At 1440×900, the hero height is > viewport height and the cinematic scene progresses visibly at 0%,
25%, 50% and 75% scroll positions.
At 1366×768, the hero fold still shows the VSL and headline; the cinematic scene moves; no jump.
At 390×844, the hero remains VSL‑first with no jank.
Capture evidence screenshots at these scroll positions and place them in audit‑production‑polish/
user‑defect‑fixes‑evidence/.
Phase 4 – Implement final polish fixes
Using the new final‑production‑polish.css and component edits, execute the following tasks. Log
each as a separate entry in your fix plan with severity, affected files and intended outcomes.
4.1 Remove custom cursor
Delete or disable any components under components/cursor/ and remove references in app/
layout.tsx or other providers.
Ensure the normal system cursor is visible. Remove CSS rules like cursor: none, cursor:
url(...), or custom pointer trails.
Confirm there is no JS pointer‑follow effect in lib/motion.ts or related hooks.
4.2 Clean the hero VSL area
Strip decorative labels such as “SYSTEM ONLINE”, “Pause video” duplicates, or extraneous status
rails. Keep only the ECOM VENOM logo, language toggle, primary CTA and native Wistia controls.
If a click‑to‑start or click‑for‑sound overlay is required because of autoplay‑with‑sound restrictions,
design a minimal overlay that appears only when autoplay is blocked and hides once the user
interacts.
Ensure HeroSection.tsx uses the cleaned structure and that VslStage.tsx only mounts the
necessary HTML.
4.3 Fix laptop and tablet hero composition
Adjust CSS grid/flex rules so that on 1366×768 and 1280×900 the hero doesn’t break. You may adjust
max widths or switch to a single column earlier.
Avoid over‑compressing the video; maintain a balanced hierarchy.
Use Tailwind’s responsive utilities to tune margins and padding.
4.4 Rework the Operator/Founder section
Redesign the founder section with editorial polish: a strong headline (no mechanical phrasing),
balanced image‑text composition and purposefully placed call‑outs.
## 4.
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## 3

Remove or redesign the two small cards; they currently look random. If kept, they must align to the
grid and communicate clear value (e.g. credentials, trust badges).
Use final‑production‑polish.css to set refined spacing, typography sizes and color palette
consistent with the brand.
4.5 Fix the FAQ/Practical Objections
Ensure the accordion component in FaqSection.tsx toggles answers correctly and uses
accessible markup (button, aria-expanded, aria-controls).
Answers must appear beneath the question with a smooth but unobtrusive animation. Only one
question may expand at a time if this improves clarity.
Style answers with readable line height and adequate contrast.
4.6 Rework the Final CTA (Next Move)
Replace the large empty rectangle with a premium conversion panel: high‑contrast background,
concise call‑to‑action copy, and a single prominent button. Use a subtle sheen or edge highlight to
convey depth.
Add a tasteful hover/focus animation on the CTA button using GSAP or CSS transitions.
Ensure mobile and reduced‑motion variants remain functional and visually appealing.
4.7 Simplify and upgrade the background
Remove heavy particle fields or glitch effects leftover from older phases. Any background noise that
competes with the content must go.
Implement a restrained dark‑graphite gradient or subtle textured backdrop that reinforces the
premium aesthetic without distracting motion.
Ensure backgrounds on mobile are lighter to avoid performance hits.
4.8 Enhance section handoffs and scroll feel
Use Motion Primitives or GSAP to add hairline wipes or signal lines that connect sections. For
example, a thin acid‑lime line that appears when transitioning from Hero to Problem and Problem to
## Mechanism.
Avoid heavy pinned sections or long overlaps – handoffs should be quick, enhancing comprehension
rather than causing confusion.
Guard all animations with prefers‑reduced‑motion so that users with reduced motion
preference see static transitions.
4.9 Conduct a full funnel polish pass
After applying the above fixes, inspect the entire funnel across all required routes (/, /apply, /
schedule, /confirmation) and breakpoints. Address any leftover misalignments, spacing
issues, inconsistent typography or broken states.
Validate that the confirmation page still presents the new 9:16 video and that /apply and /schedule
flows remain functional.
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## •
## 4

Phase 5 – Quality Assurance and evidence collection
Run the full verification commands:
npxtsc--noEmit
npmrunlint
npmrunbuild
All must exit with status 0. Then perform manual visual QA using the viewport matrix listed above (desktop,
laptop, tablet, and multiple mobile sizes). Inspect both English and Arabic/RTL flows, and test
prefers‑reduced‑motion. Use Chrome dev tools to monitor for console errors and ensure there is no
horizontal overflow on any route. Record observations.
Take screenshots for each required state and save them under audit‑production‑polish/
user‑defect‑fixes‑evidence/ using the naming scheme provided. These images will serve as proof that
all issues have been resolved.
Phase 6 – Commit and push (branch only)
When all defects are fixed and the QA passes:
Commit your changes on the hotfix/final‑production‑polish‑vsl‑funnel branch with the
message:
fix: restore cinematic hero scroll and resolve final production defects
Push only the hotfix branch to origin. Do not merge or push to main. Do not run Netlify CLI or any
manual deploy. Provide the commit hash, list of files changed, and confirmation that main was not
updated.
Final reporting
Your final response in the chat must include:
The branch name and the base commit of main you started from.
A summary of the exact root cause of the cinematic scroll regression and how you fixed it.
Confirmation that HeroScene remains mounted and functioning.
Measured hero heights and scroll runway at 1440×900 and 1366×768 after the fix.
A list of user‑observed defects that were fixed and any additional defects found and corrected.
References to any design inspiration used (Superdesign, Magic UI, Motion Primitives, etc.) and
whether they were applied or rejected.
The list of files changed.
The commands run and their results.
The path to the screenshot evidence folder.
## 1.
## 1.
## •
## •
## •
## •
## •
## •
## •
## •
## •
## 5

Observations on performance, mobile experience, and reduced motion.
The final commit hash pushed to the hotfix branch.
Confirmation that main was not pushed and no manual deploy was run.
Only after this final polish pass is approved should you prepare a PR for merging into main. Until then,
stay on the hotfix branch.
## •
## •
## •
## 6