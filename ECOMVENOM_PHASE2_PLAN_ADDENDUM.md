# ECOMVENOM PHASE 2 — FINAL CORRECTION ADDENDUM (v2)

**Status:** Mandatory pre-execution patch to `ECOMVENOM_FINAL_MASTER_PHASE2_PLAN.md`.
**Authority:** Overrides any conflicting clause in the master plan.
**Scope:** Implementation agent must read this addendum AFTER the master plan and BEFORE any file edit.
**Owner:** Danverse — Creative Director / Senior CTO
**Version:** v2 — adds disk hygiene, full asset inventory directive, and project-wide context awareness.

---

## 0. Reading Order (Mandatory)

1. Read `D:\Projects\ECOMVENOM-FUNNEL\00_AGENT_READ_FIRST\00_READ_FIRST.md` — original project mission and constraints.
2. Read `ECOMVENOM_FINAL_MASTER_PHASE2_PLAN.md` in full.
3. Read this addendum in full.
4. If any conflict: **this addendum > master plan > 00_READ_FIRST**.
5. Do not begin Phase 2A until all three documents are loaded.

---

## 1. CORRECTION — Technical Verification Wording

### Defect
The master plan states "Technical Status: FUNCTIONAL. The codebase builds, typechecks, and runs" while admitting "Shell Verification: UNVERIFIED — Claude Code PowerShell wrapper failed on short commands." Logical contradiction.

### Authoritative replacement
> **Last known status:** PASS from prior Codex evidence (commit `1988116`).
> **Current planning session shell verification:** UNVERIFIED.
> **Implementation agent obligation:** Independently rerun the full preflight sequence (§5) and confirm GREEN before editing any file.

### Binding rule
Implementation agent MUST NOT proceed past preflight until clean. If preflight fails: stop, report, do not edit.

---

## 2. CORRECTION — Hero VSL Video Architecture (UPDATED — Assets Found)

### What the master plan got wrong
Master plan §11 assumed Hero VSL might be missing and proposed using `confirmation-mobile-muted.mp4` and `confirmation-720x1280.mp4` as substitutes. **This was wrong.** Proper Hero VSL assets exist in `01_INPUT/`. The agent must verify and use them correctly.

### Verified asset inventory (already in project)

**Location:** `D:\Projects\ECOMVENOM-FUNNEL\01_INPUT\site_ready_media\`

| File | Size | Likely Role |
|---|---|---|
| `confirmation-video-master-1080p.mp4` | 141.9 MB | Master 1080p — confirmation page video (likely portrait or landscape — verify) |
| `confirmation-video-web-720p.mp4` | 89.7 MB | Web-optimized 720p — most likely candidate for inline confirmation embed |
| `confirmation-video-site-h264-720x1280-30fps.mp4` | 21.9 MB | Portrait 720x1280 — confirmation mobile/portrait |
| `confirmation-video-mobile-muted-540x960-24fps.mp4` | 8.7 MB | Mobile muted preview loop (portrait) |
| `confirmation-video-poster.jpg` | 182.4 KB | Confirmation video poster |
| `wistia-poster.jpg` | 104.5 KB | **Hero VSL poster (Wistia origin)** |

**Location:** `D:\Projects\ECOMVENOM-FUNNEL\01_INPUT\higgsfield_generation_references\`

| File | Likely Role |
|---|---|
| `wistia-q7t4vov0a0-variant-1.mp4` | **Hero VSL candidate — Wistia export variant** |
| `wistia-q7t4vov0a0-variant-2.mp4` | **Hero VSL candidate — Wistia export variant** |
| `wistia-q7t4vov0a0-variant-3.mp4` | **Hero VSL candidate — Wistia export variant** |
| `wistia-q7t4vov0a0-variant-4.mp4` | **Hero VSL candidate — Wistia export variant** |
| `funnel-image-1.webp` / `2.webp` / `3.webp` | Funnel hero/section images |
| `hf_20260504_*.png` | Founder portrait variants |
| ChatGPT-generated dashboard mockups (May 4, 2026) | Scene06 proof candidates (verify against §6 of `00_READ_FIRST` — "fake dashboards as proof" forbidden) |

### Mandatory verification steps before Scene00 video reference

For EACH candidate file the agent intends to use:

```bash
ffprobe -v error -show_entries stream=width,height,duration,codec_name -of default=noprint_wrappers=1 "<path>"
```

Required for **Hero VSL** (Scene00):
- Aspect ratio: landscape preferred (16:9 or wider). Portrait acceptable only if Scene00 layout is portrait-friendly.
- Duration: 60–180s typical for VSL
- Content: founder-led pitch (verify visually by playing first 5s)

Required for **confirmation embed** (`/confirmation` Step 1):
- Any aspect ratio acceptable
- Use `confirmation-video-web-720p.mp4` as primary candidate

### Decision tree

```
IF wistia-q7t4vov0a0-variant-*.mp4 verifies as proper hero VSL:
  → copy chosen variant to public/media/hero-vsl.mp4
  → copy wistia-poster.jpg to public/media/hero-vsl-poster.jpg
  → use in Scene00 VideoStage

ELSE IF a confirmation video has correct hero aspect ratio and content:
  → use that
  → document choice in PHASE2_FINAL_REPORT.md

ELSE:
  → ship Scene00 with poster-only VideoStage (use wistia-poster.jpg)
  → add: // TODO: Hero VSL asset REQUIRED
  → flag in Required Missing Assets list
```

### Binding rule
Never substitute a confirmation video into the hero role unless verification confirms correct aspect ratio AND content AND duration. Aspect-ratio violation in the hero is unacceptable.

---

## 3. CORRECTION — Media Optimization Gating

### Defect
Phase 2K describes brand-visuals PNG→WebP conversion as if automatic. Unsafe — can break references and silently degrade quality.

### Authoritative replacement
Media optimization is **APPROVAL-GATED**. No conversion without:
1. `.original-backup` copy of every file
2. Visual comparison at 100% zoom on ≥3 sample frames (no banding, no color shift > 2 ΔE)
3. `grep -r "filename.png" .` before AND after — zero broken references
4. Explicit human approval per batch

### Phase 2K split
- **2K-PLAN:** manifest only, no edits
- **2K-EXEC:** only after approval

If approval not given: skip 2K-EXEC. Build still ships.

---

## 4. NEW — Phase 0: Disk Hygiene (MANDATORY BEFORE PREFLIGHT)

### Why this exists
Current disk state (verified May 6, 2026):
- **C: drive: 4.16 GB free of 237 GB — CRITICAL RED**
- **D: drive: 24.6 GB free of 238 GB — Low**

The project lives on `D:\` but Node, npm, and Windows write to `C:\` by default. Without cleanup, the build will fail or corrupt mid-execution.

### Phase 0 sequence — run before Phase 2A preflight

Run each command separately. Do not batch. Confirm success before next.

**Step 0.1 — Verify current disk state**
```powershell
Get-PSDrive C, D | Select-Object Name, @{N="Free(GB)";E={[math]::Round($_.Free/1GB,2)}}, @{N="Used(GB)";E={[math]::Round($_.Used/1GB,2)}}
```

**Step 0.2 — Redirect npm cache from C: to D:**
```powershell
npm config set cache D:\npm-cache --global
npm config get cache
```
Expected output: `D:\npm-cache`

**Step 0.3 — Clean stale build artifacts in project**
```powershell
cd D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
```

**Step 0.4 — Clean npm cache (free up 1–3 GB typical)**
```powershell
npm cache clean --force
```

**Step 0.5 — Clean stale duplicate assets in `01_INPUT/site_ready_media/`**

The `site_ready_media` folder contains many duplicate files with hash suffixes (e.g., `confirmation-video-poster_3137B119.jpg`, `_7A6F75D8.jpg`, etc.). These are wasting ~1.5 GB. Cleanup is **OPTIONAL and APPROVAL-GATED** (per §3 — media is sacred until verified):

```powershell
# DO NOT RUN WITHOUT HUMAN APPROVAL
# This removes hash-suffixed duplicates while keeping originals
Get-ChildItem D:\Projects\ECOMVENOM-FUNNEL\01_INPUT\site_ready_media -File |
  Where-Object { $_.BaseName -match "_[0-9A-F]{8}(_[0-9A-F]{8})?$" } |
  ForEach-Object { Write-Host "WOULD DELETE: $($_.Name)" }
```
Run with `Write-Host` first to preview. Only delete after explicit approval.

**Step 0.6 — Optional Windows temp cleanup (if C: still red)**
```powershell
# Clear user temp
Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
# Clear Windows temp
Remove-Item -Path "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
```

**Step 0.7 — Re-verify disk state**
```powershell
Get-PSDrive C, D | Select-Object Name, @{N="Free(GB)";E={[math]::Round($_.Free/1GB,2)}}
```

### Pass criteria for Phase 0
- C: ≥10 GB free (preferred) OR ≥6 GB free (minimum)
- D: ≥20 GB free
- npm cache redirected to `D:\npm-cache`
- `.next` and `node_modules\.cache` removed from project

### Failure protocol
If C: cannot be brought above 6 GB free even after cleanup: **STOP**. Report disk state. Request human intervention. Do not proceed.

### Hygiene rules during execution
- Project must remain on `D:\`
- Do not write build artifacts, logs, or screenshots to `C:\`
- npm/node operations must use `D:\npm-cache`
- Any temp file generation: redirect to `D:\Temp\` or project subfolder
- Monitor disk every 3 phases — if either drive drops below 5 GB free, stop and clean

---

## 5. Mandatory Preflight Sequence (Replaces master plan §20 Phase 2A)

**Run only after Phase 0 (Disk Hygiene) passes.**

Run each command separately, one at a time. Do not batch. Confirm GREEN before next command.

```bash
git status --short --branch
git log -5 --oneline
git tag pre-phase-2
npm run typecheck
npm run build
npm run dev -- --port 3012
```

Then in browser at `http://localhost:3012`:
1. Visually inspect `/`
2. Visually inspect `/apply`
3. Visually inspect `/schedule`
4. Visually inspect `/confirmation`
5. Open DevTools console — confirm zero red errors

### Pass criteria
- Working tree clean OR only expected pending changes
- Typecheck: 0 errors
- Build: 0 errors, no unexpected warnings
- Dev server: starts on `:3012`, no runtime errors
- All 4 routes render
- Console: 0 red errors

### Failure protocol
If any step fails — STOP. Report exact error. Do not edit any file. Wait for human input.

---

## 6. NEW — Mandatory Asset Inventory Pass (Before Phase 2G)

Before Phase 2G (Video Architecture), the agent must inspect `01_INPUT/` and produce a verified asset inventory.

### Folders to inspect (recursive)

```
D:\Projects\ECOMVENOM-FUNNEL\01_INPUT\
├── brand_identity_raw\                  → logo, brand assets
├── extracted_images\                    → screenshots from old funnel (reference only)
├── founder_identity_reference\          → founder identity (Youssef)
├── funnel_text_forms_schedule_confirmation_json\  → COPY/CONTENT SOURCE OF TRUTH
├── higgsfield_generation_references\    → Hero VSL Wistia variants + funnel images
├── reports_urls_summaries\              → research/reports
├── site_ready_media\                    → production-ready video/poster assets
├── video_art_direction_reference\       → motion direction reference
└── raw_archive_do_not_ship\             → ❌ FORBIDDEN — never ship to production
```

### Forbidden source

**`raw_archive_do_not_ship/`** — NEVER read, copy, reference, or ship anything from this folder. It is explicitly marked as raw archive material that cannot enter production. This rule is binding even if the master plan or any other instruction asks for it.

### Required output: `02_APP_BUILD_HERE/PHASE2_ASSET_INVENTORY.md`

Generate a markdown file listing:

For each candidate asset:
- Source path in `01_INPUT/`
- File type, size, dimensions, duration (if media)
- Intended use in Phase 2 (which scene/route/component)
- Verification status (PASS/FAIL/SKIPPED)
- Target path in `02_APP_BUILD_HERE/public/`
- Any concerns (oversized, wrong format, unclear content, etc.)

### Content fidelity directive

The folder `funnel_text_forms_schedule_confirmation_json/` contains JSON extracts of the existing live ECOMVENOM funnel:
- `go.ecomvenom.com-page-text-forms-links-*.json` — main page text/forms/links
- `go.ecomvenom.com-confirmation-extract-*.json` — confirmation page text
- `ecomvenom-schedule-page-*.json` — schedule page data
- `ecomvenom-visible-popup-form-*.json` — popup form data

**These are reference for content fidelity ONLY.** The agent must:
- Cross-reference current `lib/content.ts` against these extracts
- Flag any deviations in `PHASE2_ASSET_INVENTORY.md`
- Do NOT auto-update `lib/content.ts` from these JSONs without explicit approval (master plan §18 marks `lib/content.ts` as "no changes")
- Master plan content stays unless human explicitly approves a content sync

### Higgsfield MCP usage

Per `00_READ_FIRST.md` §"Higgsfield MCP Rule": Higgsfield is connected and may be used **only if extra production visuals are needed**. Forbidden uses (binding):
- ❌ Fake testimonials, fake metrics, fake awards, fake platform logos
- ❌ Fake dashboards as proof
- ❌ Changing Youssef identity
- ❌ Redesigning the ECOMVENOM logo
- ❌ Random decorative filler
- ❌ Unreadable text-heavy generated images

Generated assets must be saved to `04_GENERATED_ASSETS_BY_AGENT/` and logged in `03_DOCS_TO_BE_CREATED_BY_AGENT/HIGGSFIELD_ASSET_GENERATION_LOG.md`.

### Binding rule
Phase 2G cannot start until `PHASE2_ASSET_INVENTORY.md` is generated and human-reviewable.

---

## 7. Hard Rules — Immutable

### Forbidden (absolute)
- ❌ WACUS — references, screenshots, comparisons, terminology
- ❌ Deployment (Netlify, Vercel, any CDN)
- ❌ `git push` to any remote
- ❌ Paid services or external paid APIs
- ❌ New dependencies unless master plan §19 explicitly approves
- ❌ Fabricated proof, testimonials, metrics, founder claims, dates, names
- ❌ Public-content language changes — site copy stays English only
- ❌ `git reset --hard` on shared branches, force-push, history rewriting
- ❌ Deletion of any media without `.original-backup`
- ❌ Forcing confirmation videos into Hero VSL role (see §2)
- ❌ Auto-executing media conversions without approval (see §3)
- ❌ Editing `node_modules` or lock files manually
- ❌ Three.js, R3F, WebGL libraries, or LUSION asset imports
- ❌ Reading, copying, or shipping anything from `raw_archive_do_not_ship/`
- ❌ Writing build artifacts to `C:\`
- ❌ Higgsfield-generated fake dashboards, fake testimonials, or Youssef identity changes

### Required (absolute)
- ✅ Run Phase 0 disk hygiene before preflight
- ✅ Tag `pre-phase-2` BEFORE Phase 2A starts
- ✅ Generate `PHASE2_ASSET_INVENTORY.md` before Phase 2G
- ✅ Per-phase commits: `feat(phase-2X): <description>` or `fix(phase-2X): <description>`
- ✅ `npm run typecheck && npm run build` GREEN at end of every phase
- ✅ Stop and report after Phase 2N
- ✅ Disk monitoring every 3 phases
- ✅ All file edits within project root (`02_APP_BUILD_HERE/`) unless explicitly approved

---

## 8. Stop Condition + Mandatory Final Visual + Professional Review

After Phase 2N completes:

### 8.1 Technical Final Checks
1. Run final `npm run typecheck`
2. Run final `npm run build`
3. Capture `git log --oneline pre-phase-2..HEAD`
4. Verify zero console errors on all 4 routes
5. Re-verify disk state (`Get-PSDrive C, D`)

### 8.2 Mandatory Visual QA Pass

In a clean browser session at `http://localhost:3012`, perform full audit. No skipping. Each item: PASS / FAIL with one-line note.

**Routes:** `/`, `/apply`, `/schedule`, `/confirmation`
**Breakpoints:** `390x844`, `834x1112`, `1280x800`, `1440x900`

**Checklist:**

- [ ] Typography in correct font family (Syne / Inter / Space Grotesk / JetBrains Mono) — no Times New Roman / system fallback
- [ ] No FOUT on first paint
- [ ] No layout shift after font load
- [ ] All scene labels human-readable (no `00 SYSTEM BOOT` style debug)
- [ ] No debug copy anywhere ("Operator identity locked", "Verification state", etc.)
- [ ] All 9 scenes scroll smoothly on `/`
- [ ] Scene02 frame-scrub canvas smooth (no jank)
- [ ] All entrance animations fire once on scroll
- [ ] No re-animation on scroll back
- [ ] Hover-grid sibling-dim works on Scene03 and Scene06
- [ ] Custom cursor renders on desktop, hidden on mobile
- [ ] Magnetic CTA effect works on hover
- [ ] Sticky mobile CTA appears after Scene02 (mobile only)
- [ ] Sticky mobile CTA hides on `/apply`, `/schedule`, `/confirmation`
- [ ] All videos have poster frames
- [ ] Hero VSL plays on click (or shows poster-only stub if asset invalid per §2)
- [ ] Confirmation page video embeds inline at Step 1
- [ ] Background loops auto-pause when not in viewport
- [ ] Form validation feedback visible on `/apply`
- [ ] Time slot selection visually clear on `/schedule`
- [ ] No horizontal overflow at any breakpoint
- [ ] Touch targets ≥44px on mobile
- [ ] All CTAs correct hover/focus/active states
- [ ] Focus ring visible on keyboard navigation
- [ ] Tab order logical on all routes
- [ ] Color contrast ≥4.5:1 for body text
- [ ] `prefers-reduced-motion` disables all animations correctly
- [ ] No console errors on any route
- [ ] No 404s on any asset
- [ ] No mixed-content warnings
- [ ] Lenis smooth scroll active on desktop, OK on mobile
- [ ] Scene transitions feel deliberate, not abrupt
- [ ] No assets sourced from `raw_archive_do_not_ship/`
- [ ] No fabricated proof/testimonial/metric content

### 8.3 Senior Professional Review

For each of 9 scenes + 3 routes (`/apply`, `/schedule`, `/confirmation`), answer 1–2 sentences each:

1. **Visual Hierarchy:** Is the most important element the most visually dominant?
2. **Material Restraint:** Venom only for primary actions? Steel + gold appropriately restrained?
3. **Conversion Path:** Is the next step obvious without thinking?
4. **Premium Feel:** Looks like "developer prototype" or "premium operating system"?
5. **Regressions:** Anything that worked before but is now broken?

### 8.4 Final Report

Generate `PHASE2_FINAL_REPORT.md` in `02_APP_BUILD_HERE/` containing:

- Phase 0 disk state (before/after)
- Asset inventory summary (link to `PHASE2_ASSET_INVENTORY.md`)
- Phase commit list (2B → 2N) with hashes and messages
- Final typecheck output (paste)
- Final build output + bundle sizes (paste)
- **Required Missing Assets** list (Hero VSL if applicable, anything else)
- **Deferred Items** list (Phase 2K-EXEC if not approved, anything else)
- Console errors observed (or "none")
- Visual QA checklist results (each item PASS/FAIL with note)
- Professional review per scene/route (1–2 sentences each)
- Known issues for Phase 3 (if any)
- Total time spent per phase
- Higgsfield generations used (if any) with prompt + asset path

### 8.5 Stop

Do not deploy. Do not push. Do not start Phase 3. Wait for human review.

---

## 9. Acknowledgement (Required Before Phase 0)

Before Phase 0 begins, agent must reply with EXACT block:

```
I have read 00_READ_FIRST.md, ECOMVENOM_FINAL_MASTER_PHASE2_PLAN.md,
and ECOMVENOM_PHASE2_PLAN_ADDENDUM.md in full.

I will run Phase 0 disk hygiene before preflight.
I will run preflight (§5) before any edit.
I will generate PHASE2_ASSET_INVENTORY.md before Phase 2G.
I will treat Hero VSL assets as unverified until §2 verification passes.
I will not optimize media without §3 approval gating.
I will never read, copy, or ship anything from raw_archive_do_not_ship/.
I will not deploy, push, install unapproved dependencies, or fabricate content.
I will execute the mandatory final visual + professional review (§8.2 and §8.3) after Phase 2N.
I will generate PHASE2_FINAL_REPORT.md as the final artifact.

Proceeding to Phase 0 disk hygiene.
```

No paraphrase. No additions. No emojis. Exact text.

---

**End of addendum v2.**
