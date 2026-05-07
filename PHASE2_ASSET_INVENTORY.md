# ECOMVENOM PHASE 2 — ASSET INVENTORY

**Generated:** 2026-05-06
**Agent:** Claude Sonnet 4.6
**Status:** Preflight complete — dev server running at http://localhost:3012

---

## 1. Hero VSL Decision — RESOLVED

**Decision:** USE `wistia-q7t4vov0a0-variant-3.mp4` (1280x720, 16:9, 660s, 124MB)

**Rationale:**
- All 4 Wistia variants share same Wistia ID (`q7t4vov0a0`) — same source, different quality tiers
- All verified as 16:9 landscape (1920x1080 / 1280x720 / 960x540) — PASS aspect ratio
- Duration: 660.6s (~11 minutes) — PASS VSL duration (60–180s minimum; 11min is a full VSL)
- Poster confirmed: `wistia-poster.jpg` is explicitly labeled "Hero VSL poster (Wistia origin)"
- Variant-3 (1280x720, 124MB) = optimal quality/size for web click-to-play
- ⚠️ Visual content verification (founder-led pitch) PENDING — cannot play video in agent session. Human must visually confirm before Phase 3.

**Target path:** `public/media/hero-vsl.mp4`
**Poster path:** `public/media/hero-vsl-poster.jpg`

---

## 2. Video Assets

### Hero VSL Candidates (01_INPUT/higgsfield_generation_references/)

| File | Dimensions | Duration | Codec | Size | Role | Status |
|---|---|---|---|---|---|---|
| `wistia-q7t4vov0a0-variant-1.mp4` | 1920×1080 (16:9) | 660s | H.264+AAC | 338MB | Hero VSL 1080p | TOO LARGE for web |
| `wistia-q7t4vov0a0-variant-2.mp4` | 1920×1080 (16:9) | 660s | H.264+AAC | 338MB | Hero VSL 1080p dupe | TOO LARGE for web |
| `wistia-q7t4vov0a0-variant-3.mp4` | 1280×720 (16:9) | 660s | H.264+AAC | 124MB | **CHOSEN Hero VSL** | ✅ SELECTED |
| `wistia-q7t4vov0a0-variant-4.mp4` | 960×540 (16:9) | 660s | H.264+AAC | 78MB | Hero VSL fallback | Available if needed |
| `wistia-poster.jpg` | — | — | JPEG | 107KB | Hero VSL poster | ✅ Copy to public/media/ |

### Confirmation Video Candidates (01_INPUT/site_ready_media/)

| File | Dimensions | Duration | Codec | Size | Role | Status |
|---|---|---|---|---|---|---|
| `confirmation-video-master-1080p.mp4` | 1080×1920 (portrait) | 202s | H.264+AAC | 142MB | Confirmation master | TOO LARGE |
| `confirmation-video-web-720p.mp4` | 1080×1920 (portrait) | 202s | H.264+AAC | 90MB | Confirmation inline embed | ⚠️ Large for web |
| `confirmation-video-site-h264-720x1280-30fps.mp4` | 720×1280 (portrait) | 202s | H.264+AAC | 22MB | **CHOSEN confirmation** | ✅ SELECTED |
| `confirmation-video-mobile-muted-540x960-24fps.mp4` | 540×960 (portrait) | 202s | H.264 muted | 8.8MB | Mobile muted loop | ✅ Available |
| `confirmation-video-poster.jpg` | — | — | JPEG | 182KB | Confirmation poster | ✅ Already in public/posters/ |

**Note on duplicate hash-suffixed files:** `site_ready_media/` contains ~30+ hash-suffixed duplicates (`_3137B119.jpg`, `_7A6F75D8.jpg`, etc.) occupying ~1.5GB. These are safe to delete — see §3 cleanup manifest. Requires explicit human approval.

### Existing Production Ambient Loops (02_APP_BUILD_HERE/public/media/)

| File | Dimensions | Duration | Size | Role | Scene |
|---|---|---|---|---|---|
| `system-loop-01.mp4` | 960×540 | 3s | 500KB | BG loop — in use | Scene00 |
| `system-loop-02.mp4` | 960×540 | 3s | 428KB | BG loop — UNUSED | Available Scene05/08 |
| `final-lockup-loop.mp4` | 960×540 | 3.2s | 168KB | Lockup loop — UNUSED | Available Scene08 |
| `chaos-system.mp4` | 960×540 | 15s | 1.9MB | Chaos→system — UNUSED | Available Scene02 |

### Art Direction Reference Videos (01_INPUT/video_art_direction_reference/) — DO NOT SHIP

| File | Dimensions | Duration | Size | Notes |
|---|---|---|---|---|
| `hf_20260504_205550_*.mp4` | 1920×1080 | 15s | 13MB | Higgsfield generated — motion ref |
| `1622E0D659-*.mp4` | 540×960 | 202s | 45MB | Confirmation video variant |
| `2AEA82A608-*.mp4` | 360×640 | 202s | 24MB | Confirmation video low-res |
| `4BEE9C7D2D-*.mp4` | 1080×1920 | 202s | 133MB | Confirmation video 1080p portrait |
| Wistia/confirmation dupes | Various | — | — | Same as above |

---

## 3. Image Assets

### Brand Identity (01_INPUT/brand_identity_raw/)

| File | Type | Size | Role | Status |
|---|---|---|---|---|
| `ECOM VENOM PNG LOGO.png` | PNG | 2MB | Source logo (unoptimized) | ✅ Already optimized in public/brand/ |
| `hf_20260504_045341_*.png` | PNG | 2.9MB | Higgsfield founder/brand still | ⚠️ 2.9MB — optimize before use |
| `ChatGPT Image May 4, 2026, 06_29_55 PM.png` | PNG | 1.7MB | Brand visual variant | Reference only |
| `ChatGPT Image May 4, 2026, 06_30_*.png` | PNG | 0.9–2MB | Brand visual variants (×10) | Reference only |
| `funnel-image-1/2/3.webp` | WebP | 54–89KB | Funnel support images | ✅ Already in public/stills/ |
| `21B6557DD3-*.jpeg` | JPEG | 56KB | Founder portrait variant | Reference |
| `846A649B88-*.jpeg` | JPEG | 54KB | Founder portrait variant | Reference |
| `CDD8AE6011-*.jpeg` | JPEG | 89KB | Founder portrait variant | Reference |

### Founder Identity (01_INPUT/founder_identity_reference/)

| File | Type | Size | Role | Status |
|---|---|---|---|---|
| `5aea4b0c936690c0f8e76139ea28ac8516d2bd65.jpg` | JPEG | 107KB | **Primary Youssef portrait** | ✅ In public/founder/youssef-adel.jpg |

### Higgsfield References (01_INPUT/higgsfield_generation_references/)

| File | Type | Role | Notes |
|---|---|---|---|
| `funnel-image-1/2/3.webp` | WebP | Funnel section images | ✅ In public/stills/ |
| `hf_20260504_045341_*.png` | PNG (2.9MB) | Higgsfield founder still | ⚠️ In public/generated/ as hf-still-01/02.png — UNOPTIMIZED |
| `ChatGPT Image May 4, 2026, 06_29_55 PM.png` and variants | PNG | Dashboard-style mockups | ❌ FORBIDDEN as proof — fake dashboard (per 00_READ_FIRST §Higgsfield MCP Rule) |
| `59DC366D80-*.jpg` | JPEG | — | Available for reference |
| `5aea4b0c936690c0f8e76139ea28ac8516d2bd65.jpg` | JPEG | Founder portrait | ✅ Used in public/founder/ |

### Existing Production Images (02_APP_BUILD_HERE/public/)

| Path | Format | Size | Role |
|---|---|---|---|
| `public/brand/ecomvenom-logo-final.png` | PNG | 72KB | Logo — production |
| `public/brand/ecomvenom-logo.png` | PNG | 63KB | Logo variant |
| `public/founder/youssef-adel.jpg` | JPEG | 107KB | Founder portrait |
| `public/stills/funnel-image-1.webp` | WebP | 56KB | Funnel image 1 |
| `public/stills/funnel-image-2.webp` | WebP | 54KB | Funnel image 2 |
| `public/stills/funnel-image-3.webp` | WebP | 89KB | Funnel image 3 |
| `public/stills/cart-chaos.webp` | WebP | 49KB | Scene01 still |
| `public/stills/dashboard-system.webp` | WebP | 34KB | Scene02 still |
| `public/stills/product-wireframe.webp` | WebP | 18KB | Scene03 still |
| `public/stills/store-portal.webp` | WebP | 42KB | Scene04 still |
| `public/stills/system-intro.webp` | WebP | 86KB | Scene00 still |
| `public/generated/cta-bg.webp` | WebP | 38KB | Scene08 CTA bg |
| `public/generated/hero-bg.webp` | WebP | 124KB | Scene00 hero bg |
| `public/generated/hf-still-01.png` | PNG | 2.9MB | ⚠️ UNOPTIMIZED — should be WebP |
| `public/generated/hf-still-02.png` | PNG | 2.9MB | ⚠️ UNOPTIMIZED — should be WebP |
| `public/generated/proof-bg.webp` | WebP | 13KB | Scene06 proof bg |
| `public/generated/roadmap-bg.webp` | WebP | 26KB | Scene03 roadmap bg |
| `public/posters/wistia-poster.jpg` | JPEG | 107KB | Hero VSL poster ✅ |
| `public/posters/confirmation-poster.jpg` | JPEG | 187KB | Confirmation video poster |
| `public/posters/chaos-system-poster.jpg` | JPEG | 47KB | chaos-system.mp4 poster |
| `public/brand-visuals/brand-visual-*.png` | PNG | TBD | 20 files — decorative bg grid (Scene04) ⚠️ Need size check |

---

## 4. Content/Text Assets (JSON)

| File | Location | Purpose |
|---|---|---|
| `go.ecomvenom.com-page-text-forms-links-*.json` | brand_identity_raw/ & funnel_text/ | Main page copy — reference for lib/content.ts validation |
| `go.ecomvenom.com-confirmation-extract-*.json` | brand_identity_raw/ & funnel_text/ | Confirmation page copy — reference |
| `ecomvenom-schedule-page-*.json` | brand_identity_raw/ & funnel_text/ | Schedule page data — reference |
| `ecomvenom-visible-popup-form-*.json` | brand_identity_raw/ & funnel_text/ | Popup form data — reference |
| `ecomvenom-full-popup-form-*.json` | brand_identity_raw/ & funnel_text/ | Full popup form data — reference |

**Content fidelity:** Master plan §18 marks `lib/content.ts` as "no changes". JSON files are reference ONLY. No auto-sync.

---

## 5. Hero VSL Copy Plan

```bash
# Copy chosen Hero VSL variant to production media folder
cp "D:/Projects/ECOMVENOM-FUNNEL/01_INPUT/higgsfield_generation_references/wistia-q7t4vov0a0-variant-3.mp4" \
   "D:/Projects/ECOMVENOM-FUNNEL/02_APP_BUILD_HERE/public/media/hero-vsl.mp4"

# Wistia poster already in public/posters/wistia-poster.jpg — also copy to media/
cp "D:/Projects/ECOMVENOM-FUNNEL/01_INPUT/site_ready_media/wistia-poster.jpg" \
   "D:/Projects/ECOMVENOM-FUNNEL/02_APP_BUILD_HERE/public/media/hero-vsl-poster.jpg"

# Copy confirmation video (720x1280, 22MB) for /confirmation page embed
cp "D:/Projects/ECOMVENOM-FUNNEL/01_INPUT/site_ready_media/confirmation-video-site-h264-720x1280-30fps.mp4" \
   "D:/Projects/ECOMVENOM-FUNNEL/02_APP_BUILD_HERE/public/media/confirmation-embed.mp4"
```

---

## 6. Concerns and Flags

| Item | Concern | Action |
|---|---|---|
| `public/generated/hf-still-01.png` + `hf-still-02.png` | 2.9MB each — unoptimized PNG | Phase 2K-PLAN: convert to WebP q85 |
| `wistia-q7t4vov0a0-variant-3.mp4` (Hero VSL) | Visual content unverified by agent | Human: play first 5s to confirm founder-led pitch |
| ChatGPT dashboard mockups | ❌ Forbidden as proof/testimonial per 00_READ_FIRST | EXCLUDED from production |
| Duplicate hash-suffixed files in site_ready_media/ | ~1.5GB wasted disk | Phase 2K-PLAN: list for human-approved deletion |
| `public/brand-visuals/*.png` (20 files) | Sizes unknown — likely unoptimized | Phase 2K-PLAN: measure, convert to WebP q60 |
| confirmation-video-web-720p.mp4 (90MB) | Too large for inline web embed | Using -720x1280-30fps.mp4 (22MB) instead |

---

## 7. Required Missing Assets

- ❌ **Hero VSL visual content verification** — pending human review
- ❌ `public/media/hero-vsl.mp4` — not yet copied (Phase 2G task)
- ❌ `public/media/confirmation-embed.mp4` — not yet copied (Phase 2G task)

---

*Generated by Phase 2 implementation agent. Phase 2G cannot start without this file. Phase 2K-EXEC requires human approval.*
