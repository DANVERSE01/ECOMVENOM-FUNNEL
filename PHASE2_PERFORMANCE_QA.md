# ECOMVENOM Phase 2M — Performance QA

Generated: 2026-05-07

## Command Checks

- `npm run typecheck`: PASS
- `npm run build`: PASS

## Build Size Summary

| Route | Size | First Load JS |
|---|---:|---:|
| `/` | 16.8 kB | 200 kB |
| `/apply` | 3.58 kB | 187 kB |
| `/schedule` | 6.88 kB | 190 kB |
| `/confirmation` | 1.97 kB | 177 kB |
| Shared JS | 100 kB | n/a |

No route exceeds the 250 kB first-load guardrail.

## Browser Performance Check

Fresh-tab Playwright checks at `1440x900` on `http://localhost:3012`:

| Route | FCP | Load Event | Console Errors | 4xx/5xx Assets |
|---|---:|---:|---:|---:|
| `/` | 340 ms | 592 ms | 0 | 0 |
| `/apply` | 132 ms | 257 ms | 0 | 0 |
| `/schedule` | 128 ms | 271 ms | 0 | 0 |
| `/confirmation` | 136 ms | 256 ms | 0 | 0 |

Note: `/confirmation` reported an aborted media request only when the QA tab was closed while `confirmation-embed.mp4` metadata was loading. This was not a 404 or server error.

## Deferred Performance Items

- `hero-vsl.mp4` is 123.7 MB and remains click-to-play with `preload="metadata"`. Re-encode only after explicit human approval.
- `brand-visuals/*.png` remain unoptimized until approved 2K-EXEC.
