# ECOMVENOM Recovery Audit

Audit target: `http://127.0.0.1:3002` from `npm run start -- --port 3002` after a clean `npm run build`.

## Build Status

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run typecheck` | Pass | Exit code 0. TypeScript completed with no diagnostics. |
| `npm run lint` | Pass | Exit code 0. Next lint completed with no reported issues. |
| `npm run build` | Pass | Exit code 0. Next.js 15 production build completed for `/`, `/apply`, `/confirmation`, `/schedule`, and `/_not-found`. |
| Production smoke | Pass | `Invoke-WebRequest http://127.0.0.1:3002` returned `200 OK`. |

Build note: an earlier `next start` failed after `next build` was run while dev/start processes were still writing `.next`. Stopping the local Next processes and rebuilding fixed it; the production server on `3002` served successfully afterward.

## Screenshots

Desktop `1440x900`:

- `audit/desktop/01-hero.png`
- `audit/desktop/02-scrollfilm.png`
- `audit/desktop/03-mechanism.png`
- `audit/desktop/04-roadmap.png`
- `audit/desktop/05-founder.png`
- `audit/desktop/06-proof.png`
- `audit/desktop/07-offer.png`
- `audit/desktop/08-faq.png`
- `audit/desktop/09-footer.png`

Mobile `390x844`:

- `audit/mobile/01-hero.png`
- `audit/mobile/02-scrollfilm.png`
- `audit/mobile/03-mechanism.png`
- `audit/mobile/04-roadmap.png`
- `audit/mobile/05-founder.png`
- `audit/mobile/06-proof.png`
- `audit/mobile/07-offer.png`
- `audit/mobile/08-faq.png`
- `audit/mobile/09-footer.png`

Tablet:

- `audit/tablet/01-overview.png`

## Interactive Audit

| Surface | Result | Evidence |
| --- | --- | --- |
| Home routes | Pass | `/`, `/apply`, `/schedule`, `/confirmation` returned `200` in `audit/interactive-home-desktop.json`. |
| Primary `/apply` CTAs | Pass | Header, hero, offer, and final CTAs resolve to `/apply`; route fetch returned `200`. |
| Founder hash CTA | Pass | `Watch founder video` renders as `BUTTON`; click set `hashAfter: "#founder-vsl"` and landed with `targetTopAfter: 80`. |
| Language toggle | Pass | EN h1 changed to Arabic; `html.lang` became `ar`, `html.dir` became `rtl`. |
| Proof dialog | Pass | Real Playwright click opened `dialog.proof-inspector`; `aria-label: "Demand signal"` and proof image alt were present. |
| Mobile sticky CTA | Pass | At `390x844`, `[data-sticky-mobile-cta]` is offscreen at top, visible after `802px` and `1300px`, hidden again at final CTA. |
| Application form guard | Pass | Empty `Continue` stayed on `/apply` and surfaced required-field errors for name, email, and WhatsApp. |
| Schedule guard | Pass | Without `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL`, `Confirm booking` stayed disabled and page showed the provider configuration warning. |

## Video Audit

| Location | Media ID | Aspect | Autoplay | Muted | Plays inline | DNT | Size evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home VSL | `0z2r9j4jnz` | `1.7777777777777777` | yes | yes | yes | `true` | `593x359` in desktop audit |
| Confirmation | `bg446wfhed` | `0.5625` | yes | yes | yes | `true` | `245x436` in confirmation audit |

Known local console noise: Wistia emits localhost CORS/network errors for `app.wistia.com/account/activities` and related player assets. The app renders the Wistia custom elements with nonzero layout boxes; the errors are from the third-party player on local HTTP.

## Copy Diff

| Area | Before | After |
| --- | --- | --- |
| Mechanism EN | "This is not motivation. It connects product, offer, store, ad test, and next decision into one operating loop." | "Before spend, the system links four layers: demand signal, offer engineering, store build, and ad decision..." |
| Mechanism AR | "المنهج لا يبيعك حماسًا..." | "‏قبل أي إنفاق، النظام بيربط 4 طبقات..." |
| Founder EN | "The founder section builds trust in the method..." | "Youssef runs the curriculum the way he runs his stores..." |
| Founder quote EN | "The shift begins when ecommerce stops being luck..." | "When ecommerce stops being luck, the numbers start telling a story." |
| Offer EN | "The seat is not only curriculum..." | "The seat combines curriculum with execution support..." |
| FAQ EN | Longer explanatory answers. | Shorter operator answers with reduced promise language. |
| Final CTA EN | "The application checks fit first..." | "The application gates fit first. If there's a match..." |

## Motion Checklist

| Motion layer | Status | Implementation |
| --- | --- | --- |
| SplitText hero reveal | Pass | `lib/motion.ts` exports `revealHeadline`; `HeroSection` reverts split on cleanup. |
| Magnetic primary CTA | Pass | `lib/magnetic.ts` guards coarse pointers and `prefers-reduced-motion`; applied to hero CTA wrapper. |
| 3D proof-card tilt | Pass | `lib/tilt.ts` guards coarse pointers and `prefers-reduced-motion`; applied to `ProofCardTilt`. |
| Lenis hash scroll | Pass | `SmoothScroll` exposes `window.__lenis`; hash CTAs use Lenis `scrollTo` with fallback. |
| Reduced motion | Pass | New magnetic, tilt, and headline motion paths check reduced-motion before animating. |

## Mobile Parity

| Check | Result | Evidence |
| --- | --- | --- |
| No horizontal scroll | Pass | Desktop, mobile, tablet, apply, schedule, confirmation audits all reported `horizontalOverflow: false`. |
| Sticky CTA | Pass | `data-visible` transitions `false -> true -> false` across hero exit and final CTA zone. |
| Video attributes | Pass | Wistia elements include `autoplay`, `muted`, and `playsinline`. |
| Touch target sizing | Pass | Sticky CTA is `375x108`; primary buttons measured `62px` tall in form/home audits. |
| RTL toggle | Pass | Toggle set `html.dir` to `rtl` and swapped copy to Arabic. |

## Performance

Lighthouse commands:

- `npx -y @lhci/cli@0.15.1 autorun --collect.url=http://127.0.0.1:3002 --collect.numberOfRuns=1 --upload.target=filesystem --upload.outputDir=.lighthouseci`
- `npx -y lighthouse@12.6.1 http://127.0.0.1:3002 --output=json --output-path=audit\lighthouse-home.json --chrome-flags="--headless=new --no-sandbox --disable-gpu" --quiet`

Result: both Lighthouse commands exited `1` because Chrome cleanup hit `EPERM, Permission denied` on a Lighthouse temp directory. The direct Lighthouse run still wrote `audit/lighthouse-home.json`; summarized in `audit/lighthouse-summary.json`.

| Metric | Value |
| --- | --- |
| Performance | `81` |
| Accessibility | `92` |
| Best Practices | `79` |
| SEO | `91` |
| FCP | `2.0 s` |
| LCP | `3.6 s` |
| CLS | `0.051` |
| TBT | `320 ms` |
| Speed Index | `2.7 s` |
| Third-party impact | `Third-party code blocked the main thread for 230 ms` |
| HTTPS audit on local HTTP | `7 insecure requests found`, all Wistia/local HTTP context |

## Known Remaining Issues

- Wistia player emits localhost HTTP/CORS console errors. Production HTTPS should be checked after deploy.
- `/schedule` intentionally remains disabled until `NEXT_PUBLIC_SCHEDULE_PROVIDER_URL` is configured.
- `NEXT_PUBLIC_FORM_ENDPOINT` remains outside this recovery scope; the form validation path works locally, but production submission endpoint should be verified separately.

## Live Deploy Verification

Pending until Task 7 push/deploy verification.
