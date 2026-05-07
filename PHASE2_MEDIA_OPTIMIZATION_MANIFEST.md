# ECOMVENOM Phase 2K-PLAN — Media Optimization Manifest

Generated: 2026-05-07
Scope: manifest only. No media files converted, deleted, renamed, or overwritten.

## Approval Gate

2K-EXEC is skipped until the human sends exactly: `APPROVED: run 2K-EXEC`.

Before any execution batch:
- Create `.original-backup` copies.
- Compare at 100% zoom on at least 3 representative samples.
- Run reference scan before and after each filename change.
- Keep `raw_archive_do_not_ship/` untouched.

## Current High-Weight Assets

| Path | Count / Size | Current Use | Concern | 2K-EXEC Candidate |
|---|---:|---|---|---|
| `public/brand-visuals/brand-visual-03.png` to `brand-visual-22.png` | 20 files, about 26.7 MB total | Scene04 low-opacity decorative grid through `BRAND_VISUALS` | Oversized PNGs for 8vw background tiles | Convert to 400px-wide WebP q60, keep backups, update `lib/frameManifest.ts` |
| `public/generated/hf-still-01.png` and `hf-still-02.png` | 2 files, 2.77 MB each | Currently not referenced by app code | Heavy unreferenced PNGs | Leave untouched unless approved; consider archival or WebP conversion after visual review |
| `public/media/hero-vsl.mp4` | 123.7 MB | Scene00 click-to-play Hero VSL | Large but verified 1280x720 founder pitch | Manual approval only; possible CRF 22-24 web transcode |
| `public/media/confirmation-embed.mp4` | 21.91 MB | `/confirmation` inline pre-call video | Acceptable for now, could be lighter | Manual approval only; possible portrait CRF 23 transcode |
| `public/media/confirmation-720x1280.mp4` | 21.91 MB | Not referenced after Phase 2G | Duplicate-sized legacy asset | Do not delete without approval and backup |

## Brand Visual Detail

| File | Dimensions | Size |
|---|---:|---:|
| `brand-visual-03.png` | 1672x941 | 1692.4 KB |
| `brand-visual-04.png` | 1672x941 | 1692.4 KB |
| `brand-visual-05.png` | 1672x941 | 1882.3 KB |
| `brand-visual-06.png` | 1672x941 | 1882.3 KB |
| `brand-visual-07.png` | 1448x1086 | 1066.6 KB |
| `brand-visual-08.png` | 1448x1086 | 1066.6 KB |
| `brand-visual-09.png` | 1939x811 | 1964.5 KB |
| `brand-visual-10.png` | 1939x811 | 1964.5 KB |
| `brand-visual-11.png` | 1672x941 | 870.5 KB |
| `brand-visual-12.png` | 1672x941 | 870.5 KB |
| `brand-visual-13.png` | 1536x1024 | 1256.7 KB |
| `brand-visual-14.png` | 1536x1024 | 1256.7 KB |
| `brand-visual-15.png` | 1122x1402 | 1064.8 KB |
| `brand-visual-16.png` | 1122x1402 | 1064.8 KB |
| `brand-visual-17.png` | 1672x941 | 1014.0 KB |
| `brand-visual-18.png` | 1672x941 | 1014.0 KB |
| `brand-visual-19.png` | 1536x1024 | 1466.9 KB |
| `brand-visual-20.png` | 1536x1024 | 1466.9 KB |
| `brand-visual-21.png` | 1536x1024 | 1393.6 KB |
| `brand-visual-22.png` | 1536x1024 | 1393.6 KB |

Estimated 2K-EXEC savings for brand visuals: about 24-25 MB if resized to 400px-wide WebP q60.

## Reference Map

| Reference | Current Match |
|---|---|
| `BRAND_VISUALS` | `lib/frameManifest.ts` maps to `/brand-visuals/brand-visual-03.png` through `22.png` |
| Hero VSL | `components/sections/scroll-film/Scene00ColdOpen.tsx` uses `/media/hero-vsl.mp4` and `/media/hero-vsl-poster.jpg` |
| Confirmation embed | `components/confirmation/pre-call-video.tsx` uses `/media/confirmation-embed.mp4` |
| Generated stills | `lib/frameManifest.ts` references `hero-bg.webp`, `roadmap-bg.webp`, `proof-bg.webp`, `cta-bg.webp` |

## Deferred 2K-EXEC Plan

1. Copy each `public/brand-visuals/*.png` to `.original-backup.png`.
2. Generate 400px-wide WebP q60 copies.
3. Update `lib/frameManifest.ts` from `.png` to `.webp`.
4. Run reference scan before and after.
5. Run visual comparison on at least `03`, `09`, and `15`.
6. Run `npm run typecheck` and `npm run build`.

Status: waiting for explicit approval. No optimization executed.
