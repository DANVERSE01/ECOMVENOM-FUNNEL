# ECOMVENOM PHASE 2 — CODEX RESUME HANDOFF

**Generated:** 2026-05-06
**Reason:** Claude Sonnet 4.6 hit Pro rate limit mid-Phase 2F.
**Resume point:** Phase 2F — partial edits done, NOT committed.

---

## STEP 1 — READ THESE FILES IN FULL, IN THIS ORDER

```
1. D:\Projects\ECOMVENOM-FUNNEL\00_AGENT_READ_FIRST\00_READ_FIRST.md
2. D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\ECOMVENOM_FINAL_MASTER_PHASE2_PLAN.md
3. D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\ECOMVENOM_PHASE2_PLAN_ADDENDUM.md
4. D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\PHASE2_ASSET_INVENTORY.md
```

**Precedence on conflict:** Addendum > Master Plan > 00_READ_FIRST

No skimming. Load all into context before any action.

---

## STEP 2 — ACKNOWLEDGE

Reply with the EXACT block from §7 of the addendum. No changes. No additions.

```
I have read ECOMVENOM_FINAL_MASTER_PHASE2_PLAN.md and
ECOMVENOM_PHASE2_PLAN_ADDENDUM.md in full.

I will run the preflight sequence (§4) before any edit.
I will treat Hero VSL assets as unverified until §2 verification passes.
I will not optimize media without §3 approval gating.
I will not deploy, push, install unapproved dependencies, or fabricate content.

Proceeding to Phase 2A preflight.
```

---

## STEP 3 — VERIFY CURRENT GIT STATE

```bash
cd D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE
git log --oneline -8
git status --short
```

**Expected last 5 commits (already done by Claude):**

```
feat(phase-2e): CTA button system + StickyMobileCTA
feat(phase-2d): color and material system expanded
feat(phase-2c): typography — Syne, Inter, JetBrains_Mono
feat(phase-2b): remove all debug labels
fix: complete ecomvenom funnel repair pass   ← pre-phase-2 tag is here
```

**Expected dirty files (Phase 2F — edited but NOT committed):**

```
M  components/cinematic/SceneEyebrow.tsx   ← CREATED by Claude, verify it exists
M  components/cinematic/ScrollFilmScene.tsx ← data-scene-title={title} (no number prefix)
M  components/nav.tsx                       ← scene default = "ECOMVENOM", routes cleaned
```

Run:
```bash
git diff --name-only
cat components/cinematic/SceneEyebrow.tsx
```

Confirm all 3 files exist and have correct content before proceeding.

---

## STEP 4 — COMPLETE PHASE 2F

Phase 2F is INCOMPLETE. Claude did:
- ✅ Created `components/cinematic/SceneEyebrow.tsx`
- ✅ Updated `components/nav.tsx` (default label, route labels)
- ✅ Updated `components/cinematic/ScrollFilmScene.tsx` (data-scene-title)
- ❌ Did NOT replace ShotLabel usages in scene files
- ❌ Did NOT typecheck
- ❌ Did NOT build
- ❌ Did NOT commit

**You must complete 2F:**

1. Search for any remaining `ShotLabel` usage across all scene files:
   ```bash
   grep -r "ShotLabel" components/sections/scroll-film/
   ```
   If found → replace each with `<SceneEyebrow label="..." />` from `@/components/cinematic/SceneEyebrow`

2. Run typecheck:
   ```bash
   npm run typecheck
   ```
   Must be 0 errors. If errors → fix them. Do not proceed with errors.

3. Run build:
   ```bash
   npm run build
   ```
   Must be 0 errors.

4. Commit:
   ```bash
   git add components/cinematic/SceneEyebrow.tsx components/cinematic/ScrollFilmScene.tsx components/nav.tsx
   git add -A  # picks up any scene file edits
   git commit -m "feat(phase-2f): scene eyebrow system, nav label cleanup"
   ```

---

## STEP 5 — CONTINUE 2G → 2N IN STRICT ORDER

After 2F is committed and GREEN:

Execute phases **2G → 2N** in exact order from master plan §20.

After EVERY phase:
```
npm run typecheck    → 0 errors
npm run build        → 0 errors  
git commit -m "feat(phase-2X): description"
```

Never skip. Never reorder. Never combine phases.

---

## STEP 6 — PHASE-SPECIFIC OVERRIDES (BINDING)

### Phase 2G — Hero VSL
Before referencing ANY video in Scene00:
```bash
# ffprobe is available on this machine (verified by Claude)
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,duration,codec_name \
  -of default=noprint_wrappers=1 \
  "D:\Projects\ECOMVENOM-FUNNEL\01_INPUT\site_ready_media\<filename>.mp4"
```

**Verified by Claude in prior session:**
- `wistia-q7t4vov0a0-variant-1.mp4` → 1920×1080, H264, landscape ✅ — PRIMARY HERO VSL CANDIDATE
- `wistia-q7t4vov0a0-variant-2.mp4` → verify similarly
- `confirmation-video-master-1080p.mp4` → 1080×1920, portrait — DO NOT use in Scene00 hero

If Wistia variants verify as founder pitch content → use as hero.
If content is wrong → ship poster-only VideoStage with TODO marker.

### Phase 2K — Media Optimization
**Split mandatory:**
- `2K-PLAN` → manifest only, no file changes
- `2K-EXEC` → SKIP unless human sends explicit "APPROVED: run 2K-EXEC"

---

## STEP 7 — HARD RULES (NON-NEGOTIABLE)

```
❌ No WACUS references, screenshots, comparisons, terminology
❌ No deployment (Netlify, Vercel, any CDN)
❌ No git push to any remote
❌ No new dependencies (unless master plan §19 explicitly approves)
❌ No fabricated proof, testimonials, metrics, founder claims
❌ No language change — English only on public site
❌ No git reset --hard, force-push, history rewriting
❌ No media deletion without .original-backup
❌ No Three.js, WebGL, R3F, LUSION
❌ No reading/copying from raw_archive_do_not_ship/
❌ No writing build artifacts to C:\
```

---

## STEP 8 — STOP CONDITION

After Phase 2N:

1. `npm run typecheck` → paste output
2. `npm run build` → paste output + bundle sizes
3. `git log --oneline pre-phase-2..HEAD` → paste output
4. Visual QA per addendum §8.2 (32-item checklist × 4 routes × 4 breakpoints)
5. Professional review per addendum §8.3 (5 questions × 9 scenes)
6. Generate `PHASE2_FINAL_REPORT.md` in `02_APP_BUILD_HERE/`
7. **STOP.** Do not deploy. Do not push. Wait for human review.

---

## FAILURE PROTOCOL

On ANY failure at ANY step:
1. STOP immediately
2. Report exact error + exact command that failed
3. Do NOT fix outside the failing phase scope
4. Do NOT edit further
5. Wait for human input

---

## CONTEXT — DISK STATE (last verified by Claude)

```
C: ~6.6 GB free (minimum — monitor this)
D: ~25 GB free (adequate)
npm cache → D:\npm-cache ✓
.next → deleted and will rebuild
node_modules/.cache → deleted
```

Every 3 phases: re-check disk. If C: < 5 GB → STOP and report.

---

**Begin with STEP 1. Do not skip the acknowledgement gate.**
