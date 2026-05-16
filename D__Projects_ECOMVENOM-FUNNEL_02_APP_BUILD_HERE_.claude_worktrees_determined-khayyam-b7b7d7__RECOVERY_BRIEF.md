# ECOMVENOM RECOVERY BRIEF — FULL AUTONOMOUS EXECUTION

> **YOU HAVE FULL AUTHORITY.** Read, write, edit, install dependencies, run the dev server, take screenshots with Playwright, commit, and push. No confirmations needed. Execute production-grade work end-to-end. The user has reviewed the live broken site and approved this brief. Do not ask questions unless you hit a genuine blocker.

---

## CONTEXT

| Item | Value |
|---|---|
| Live broken site | https://6a07a3371bd5a0000800e36a--ecomvenom.netlify.app/ |
| Production domain | https://go.ecomvenom.com |
| Repo | https://github.com/DANVERSE01/ECOMVENOM-FUNNEL |
| Base commit | `2392fe9` |
| Branch | `main` (push directly when done — Netlify auto-deploys) |
| Worktree | `D:\Projects\ECOMVENOM-FUNNEL\02_APP_BUILD_HERE\.claude\worktrees\determined-khayyam-b7b7d7` |
| Stack | Next.js 15.5 (App Router) · React 18.3 · TypeScript 5.6 · Tailwind 3.4 · GSAP 3.15 · Lenis 1.3 |

---

## PHASE 0 — DEEP DISCOVERY (DO THIS FIRST. DO NOT SKIP.)

Before touching any code:

1. Read every relevant skill under `D:\Projects\DANVERSE-X\.claude\skills\`:
   - `nextjs-patterns.md`
   - `framer-motion.md`
   - `arabic-rtl.md`
   - `typescript-rules.md`
   - `cinematic-prompts.md`
   - `threejs-webgl.md`
   - `danverse-design-system.md`
2. Map the codebase:
   - `git status` · `git log --oneline -10`
   - `app/page.tsx`, `app/layout.tsx`, `app/apply/page.tsx`, `app/confirmation/page.tsx`, `app/schedule/page.tsx`
   - Every file under `components/sections/`, `components/venom/`, `components/cinematic/`, `components/ui/`, `components/providers/`
   - `lib/cinematicRecoveryContent.ts`, `lib/lang-context.tsx`, `lib/lenis.ts`, `lib/gsap.ts`, `lib/motion.ts`, `lib/translations.ts`, `lib/useContent.ts`
   - `components/venom/tokens.css`, `components/venom/cinematic-v2.css`, `app/globals.css`
3. Launch the dev server (`npm run dev` — use a free port if 3000 is taken) and open in Playwright headless:
   - Desktop 1440×900 — scroll the whole page, screenshot 4 frames.
   - Mobile 390×844 — same.
   - Click every button, every CTA, every nav anchor. Log the result in `_DISCOVERY.md`.
   - Capture console errors.
4. Write `_DISCOVERY.md` at the worktree root: what's actually broken, what's working, file paths involved.

**Time budget for Phase 0:** 15 minutes max. Then move on.

---

## ROOT CAUSES (already analyzed — confirm and fix)

| Symptom | Root cause | Fix location |
|---|---|---|
| In-page anchor buttons do nothing (e.g. "Watch founder video" → `#founder-vsl`) | Lenis intercepts default hash scrolling. `GlowButton` uses Next.js `<Link>` which doesn't call `lenis.scrollTo()`. | `components/venom/GlowButton.tsx` + expose Lenis instance from `components/providers/SmoothScroll.tsx` |
| Hero VSL shows a static image instead of an autoplay video | `components/venom/VslStage.tsx` renders `<Image src="/media/hero-vsl-poster.webp">` and only opens a modal on click. No in-place player. | Replace with a real `WistiaPlayer` component embedded in the hero. |
| Confirmation page video missing | `components/confirmation/pre-call-video.tsx` likely uses the same poster pattern. | Replace with vertical Wistia player. |
| 3 new proof captures not visible | `lib/cinematicRecoveryContent.ts` `proofAssets` array has only 3 entries; new files are in `/public/proof/` but not referenced. | Append 3 entries to BOTH `ar` and `en` arrays. |
| Copy reads generic | Headlines OK, supporting paragraphs lean abstract. Founder + offer + FAQ sections need precision. | `lib/cinematicRecoveryContent.ts` — sharpen, don't fully rewrite. |
| Motion feels generic | No SplitText reveal, no magnetic CTA, no 3D tilt on proof cards, no count-up on stats. | New: `lib/magnetic.ts`, `lib/tilt.ts`. Extend: `lib/motion.ts`. Wire into sections. |
| No mobile/desktop audit | Doesn't exist. | Generate after all fixes. |

---

## TASK 1 — FIX BROKEN BUTTONS & ANCHOR NAVIGATION

### 1A. Expose Lenis globally

Edit `components/providers/SmoothScroll.tsx`. Currently Lenis is created internally. Change so the instance is stored on `window.__lenis` (typed) and provide a custom hook `useLenis()` returning the instance.

```ts
// Add at top of SmoothScroll.tsx
declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}
```

In the effect that creates Lenis, after construction: `window.__lenis = lenis;` and on cleanup `delete window.__lenis;`.

### 1B. Smart hash navigation in GlowButton

Edit `components/venom/GlowButton.tsx`. When `href` starts with `#`:
- Render a `<button>` (not `<Link>`) with an `onClick` that:
  - Calls `window.__lenis?.scrollTo(href, { offset: -80, duration: 1.2 })` if Lenis exists.
  - Falls back to `document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })`.
- For non-hash hrefs, keep the existing `<Link>` behavior.

### 1C. Audit every CTA in the codebase

Use `Grep` to find every `<Link>`, `<a>`, `onClick`, and `href=`. Verify each one routes or scrolls correctly. Fix any broken ones (typos, missing routes, dead anchors).

### 1D. Mobile sticky CTA on home page

Current `components/nav.tsx` hides the mobile apply button on `/`. The home page needs a mobile sticky CTA visible after scroll past the hero. Either:
- Wire `components/ui/StickyMobileCTA.tsx` to show on home after `scrollY > window.innerHeight`, OR
- Make the existing mobile apply button visible on home too.

Choose the cleaner path. Test on 390px viewport.

### Commit message:
```
fix(nav): restore lenis anchor scroll, audit all CTAs, mobile sticky on home
```

---

## TASK 2 — RESTORE WISTIA VSL VIDEOS

### 2A. Create reusable `WistiaPlayer` component

New file: `components/cinematic/WistiaPlayer.tsx`

```tsx
"use client";

import { useEffect } from "react";

type WistiaPlayerProps = {
  mediaId: string;
  aspect: number; // 1.7777 = 16:9, 0.5625 = 9:16
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
};

let scriptsLoaded = false;

function loadWistiaScripts() {
  if (scriptsLoaded || typeof window === "undefined") return;
  scriptsLoaded = true;

  const playerScript = document.createElement("script");
  playerScript.src = "https://fast.wistia.com/player.js";
  playerScript.async = true;
  document.head.appendChild(playerScript);
}

function loadMediaScript(mediaId: string) {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src*="${mediaId}.js"]`)) return;

  const mediaScript = document.createElement("script");
  mediaScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
  mediaScript.async = true;
  mediaScript.type = "module";
  document.head.appendChild(mediaScript);
}

export function WistiaPlayer({
  mediaId,
  aspect,
  autoplay = true,
  muted = true,
  className,
}: WistiaPlayerProps) {
  useEffect(() => {
    loadWistiaScripts();
    loadMediaScript(mediaId);
  }, [mediaId]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", aspectRatio: aspect }}>
      {/* @ts-expect-error -- Wistia web component */}
      <wistia-player
        media-id={mediaId}
        aspect={aspect}
        autoplay={autoplay ? "true" : undefined}
        muted={muted ? "true" : undefined}
        playsinline="true"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
```

### 2B. Replace VslStage with real player

Edit `components/venom/VslStage.tsx`. Remove the static `<Image>` + modal-button pattern. Render the `WistiaPlayer` directly inside `.vx-vsl`:

```tsx
"use client";

import { WistiaPlayer } from "@/components/cinematic/WistiaPlayer";
import { StatusPill } from "./StatusPill";

const HERO_VSL_MEDIA_ID = "0z2r9j4jnz";
const HERO_VSL_ASPECT = 1.7777777777777777;

type VslStageProps = {
  label: string;
  playLabel: string;
  title: string;
};

export function VslStage({ label, title }: VslStageProps) {
  return (
    <div className="vx-stage" data-vx-reveal>
      <StatusPill>{label}</StatusPill>
      <div className="vx-vsl">
        <WistiaPlayer mediaId={HERO_VSL_MEDIA_ID} aspect={HERO_VSL_ASPECT} autoplay muted />
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}
```

Remove the `playLabel` prop usage if no longer needed (or keep for accessibility).

### 2C. Confirmation page vertical player

Edit `components/confirmation/pre-call-video.tsx`. Replace with the vertical Wistia player:
- `mediaId = "bg446wfhed"`
- `aspect = 0.5625` (9:16)
- Wrap in a container with `max-width: 360px` and center on the page.

### 2D. CSS — make the in-place player frame match design

In `app/globals.css` or `components/venom/cinematic-v2.css`, update `.vx-vsl`:
- Keep border-radius and overflow:hidden.
- Remove any rules that hide native video controls.
- Make sure `wistia-player` element fills the container.

Test in browser. Mobile must autoplay-muted on iOS Safari (the `playsinline` attribute handles this).

### Commit message:
```
fix(video): embed Wistia VSL in hero + 9:16 confirmation video, remove static poster
```

---

## TASK 3 — ADD THREE NEW PROOF CAPTURES

The files are already at:
```
public/proof/proof-shopify-dashboard.png
public/proof/proof-easyorders-flood.png
public/proof/proof-whatsapp-stats.png
```

Edit `lib/cinematicRecoveryContent.ts`. In the `proofAssets` object, APPEND these 3 entries to BOTH `ar` and `en` arrays (after the existing 3):

### Arabic entries

```ts
{
  src: "/proof/proof-shopify-dashboard.png",
  alt: "لقطة لوحة بيانات شهرية حقيقية من متجر تشغيل",
  label: "أداء شهر كامل",
  market: "متجر تشغيل / لوحة المبيعات",
  note: "‏$5,029 خلال شهر واحد، 81 أوردر، تحويل 2.88%. لقطة مباشرة من المنصة بدون إضافات.",
},
{
  src: "/proof/proof-easyorders-flood.png",
  alt: "إشعارات أوردرات متلاحقة من EasyOrders",
  label: "موجة أوردرات حية",
  market: "EasyOrders / إشعارات",
  note: "9 أوردرات في أقل من دقيقتين، كل واحد 220، إشعارات اتسجلت لايف وقت الإطلاق.",
},
{
  src: "/proof/proof-whatsapp-stats.png",
  alt: "تحديث واتساب من ستور سعودي مع إحصائيات تشغيل",
  label: "تحديث ستور سعودي",
  market: "واتساب / متجر تشغيل",
  note: "9 أوردرات لحد الفجر، متوسط الطلب 352 ريال، تحويل 1.61% — تحديث من تشغيل حقيقي.",
},
```

### English entries

```ts
{
  src: "/proof/proof-shopify-dashboard.png",
  alt: "Real monthly dashboard capture from an operating store",
  label: "Full month performance",
  market: "Live store / Sales dashboard",
  note: "$5,029 in a single month, 81 orders, 2.88% conversion. Direct platform capture, no edits.",
},
{
  src: "/proof/proof-easyorders-flood.png",
  alt: "EasyOrders notification stack from a live launch",
  label: "Live order burst",
  market: "EasyOrders / Notifications",
  note: "9 orders in under 2 minutes, 220 each. Notification stack captured during launch.",
},
{
  src: "/proof/proof-whatsapp-stats.png",
  alt: "WhatsApp update from a Saudi store with operating stats",
  label: "Saudi store update",
  market: "WhatsApp / Operating store",
  note: "9 orders by Fajr, SAR 352 AOV, 1.61% conversion — update from a working operator.",
},
```

**Important:** the captions describe what the capture shows. They do not claim revenue results for the program. They identify the **source platform** ("Live store / Sales dashboard") and the **operator context** — never invented brand affiliations.

### Commit message:
```
feat(proof): add 3 new captures (monthly dashboard, order burst, KSA update)
```

---

## TASK 4 — SHARPEN COPY (PRECISE EDITS, NOT FULL REWRITE)

Edit `lib/cinematicRecoveryContent.ts`. Keep the structure. Sharpen specific strings.

### Hero — keep as-is (already good)

### Mechanism body (`ar.mechanism.body` and `en.mechanism.body`)
Replace with more concrete:
- **AR:** "‏قبل أي إنفاق، النظام بيربط 4 طبقات: إشارة الطلب، هندسة العرض، بناء المتجر، وقرار الإعلان. كل قرار يدخل بمدخلات، يطلع بنتيجة قابلة للقياس."
- **EN:** "Before spend, the system links four layers: demand signal, offer engineering, store build, and ad decision. Every decision enters with inputs and exits with a measurable outcome."

### Founder body (`ar.founder.body` and `en.founder.body`)
Tighten — remove abstraction:
- **AR:** "‏يوسف بيشغّل المنهج زي ما بيشغّل ستوراته: قراءة سوق، اختيار منتج بإشارات، عرض مبني على اعتراضات، وقرار إعلان بأرقام. مفيش حماس، فيه تشغيل."
- **EN:** "Youssef runs the curriculum the way he runs his stores: read the market, pick a product from signals, build an offer around objections, decide on ads from numbers. No hype — operating discipline."

### Founder quote
- **AR:** "‏لما التجارة تتحول من حظ لنظام، الأرقام بتفرق."
- **EN:** "When ecommerce stops being luck, the numbers start telling a story."

### Offer body — convert paragraph to compact lead-in (keep the prose, just trim 20%)

### FAQ answers — trim each by ~25%, keep direct tone.

### Final CTA body
- **AR:** "‏الطلب بيقيّم التوافق الأول. لو فيه مساحة، بنتحرك لمكالمة مركّزة وخطة سوق واضحة."
- **EN:** "The application gates fit first. If there's a match, we move to a focused call and a clear market plan."

### Proof eyebrow / title — already strong, keep.

### Commit message:
```
refactor(copy): tighten founder, mechanism, FAQ — operator voice EN+AR
```

---

## TASK 5 — MOTION ELEVATION

### 5A. SplitText hero reveal

In `lib/motion.ts`, add a helper:

```ts
import { gsap, SplitText, reducedMotion } from "@/lib/gsap";

export function revealHeadline(target: HTMLElement | null) {
  if (!target || reducedMotion()) return;
  const split = new SplitText(target, { type: "chars,words", mask: "chars" });
  gsap.from(split.chars, {
    yPercent: 110,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.018,
  });
  return split;
}
```

Verify `SplitText` is imported in `lib/gsap.ts`:

```ts
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
export { gsap, ScrollTrigger, SplitText };
```

In `components/sections/HeroSection.tsx`, wire it via `useGSAP`:

```tsx
const headlineRef = useRef<HTMLHeadingElement>(null);
useGSAP(() => {
  const split = revealHeadline(headlineRef.current);
  return () => split?.revert();
}, []);
// then <h1 ref={headlineRef} className="v2-hero__headline">...
```

### 5B. Magnetic CTA hook

New file: `lib/magnetic.ts`

```ts
"use client";

import { useEffect, useRef } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.25, radius = 140) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const ex = e.clientX - (r.left + r.width / 2);
      const ey = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(ex, ey);
      if (dist < radius) {
        tx = ex * strength;
        ty = ey * strength;
      } else {
        tx = 0; ty = 0;
      }
      tick();
    };

    const onLeave = () => { tx = 0; ty = 0; tick(); };

    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) tick();
      });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return ref;
}
```

Use it on the hero primary CTA. Wrap the existing GlowButton in a span with the ref:

```tsx
const magRef = useMagnetic<HTMLSpanElement>(0.22, 130);
// <span ref={magRef}><GlowButton href="/apply">{c.primary}</GlowButton></span>
```

### 5C. 3D tilt on proof cards

New file: `lib/tilt.ts`

```ts
"use client";

import { useEffect, useRef } from "react";

export function useTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
      });
    };
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxDeg]);

  return ref;
}
```

In `components/sections/ProofSection.tsx`, apply `useTilt` to each `.v2-proof-card`. Since it's an array, refactor the card body into a small sub-component `<ProofCardTilt>` so the hook can be called per card.

Add CSS in `cinematic-v2.css`:
```css
.v2-proof-card {
  transform-style: preserve-3d;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}
```

### 5D. Count-up on stat captions

The existing `components/ui/count-up.tsx` is available. Wire it into the proof captions where numbers appear ($5,029 → count-up from 0; 81 orders → count-up; 9 orders → count-up).

Optional — only if it doesn't break the caption text flow. Skip if it gets clunky.

### 5E. Section scroll reveals

Confirm `data-vx-reveal` elements are wired in `lib/motion.ts` with ScrollTrigger:
- `y: 30, opacity: 0` initial.
- `y: 0, opacity: 1` on enter, `scrub: 1.5`.
- If not wired, add the IntersectionObserver-based one-time fade-in.

### Commit message:
```
feat(motion): splittext hero, magnetic cta, 3d tilt proof cards
```

---

## TASK 6 — AUDIT REPORT

Generate `AUDIT_REPORT.md` at the worktree root.

### Required sections

1. **Build status** — `npm run typecheck` and `npm run build` output (paste exit codes + any warnings).
2. **Screenshots** — captured via Playwright headless on a local dev server:
   - `audit/desktop/01-hero.png` through `audit/desktop/09-footer.png`
   - `audit/mobile/01-hero.png` through `audit/mobile/09-footer.png`
   - `audit/tablet/01-overview.png`
3. **Interactive audit table**:
   | Element | Desktop | Mobile | Action | Status |
   | "Start your application" hero | ✓ | ✓ | Routes to /apply | OK |
   | … (every CTA) | … |
4. **Video audit**:
   - Hero VSL: Wistia ID, autoplay status, muted status, mobile playsinline confirmed.
   - Confirmation video: same.
5. **Copy diff table**: 5–7 rows showing the most important before/after lines.
6. **Motion checklist**:
   - SplitText hero reveal ✓
   - Magnetic CTA ✓
   - 3D tilt on proof cards ✓
   - Lenis smooth scroll ✓
   - Scroll reveals ✓
   - prefers-reduced-motion respected ✓
7. **Mobile parity checklist**:
   - No horizontal scroll
   - Touch targets ≥ 44px
   - Hero VSL plays muted on iOS Safari
   - Sticky CTA appears after first viewport scroll
   - Lang toggle works
8. **Performance** (run Lighthouse via `npx unlighthouse` or `npx @lhci/cli autorun --collect.url=http://localhost:3000`):
   - LCP / CLS / INP targets: <2.5s / <0.1 / <200ms.
9. **Known remaining issues** — if any, listed with priority.

### Commit message:
```
docs(audit): full desktop+mobile parity audit with screenshots
```

---

## TASK 7 — PUSH

After all 6 commits:

```bash
git push origin main
```

Netlify will auto-deploy. Wait for deploy to complete (~2 min). Then:
- `curl -I https://6a07a3371bd5a0000800e36a--ecomvenom.netlify.app/` (the latest deploy URL will change; use `ecomvenom.netlify.app` if you can find it from the Netlify CLI or just trust the auto-deploy)
- Re-screenshot the live site and append a `## LIVE DEPLOY VERIFICATION` section to `AUDIT_REPORT.md`.

---

## SKILLS TO USE

Pull techniques from these — they exist in `D:\Projects\DANVERSE-X\.claude\skills\`:

- **`nextjs-patterns.md`** — App Router, "use client" boundaries, dynamic imports for the Wistia player.
- **`framer-motion.md`** — although you're using GSAP, the motion principles apply.
- **`arabic-rtl.md`** — verify all new copy renders correctly in RTL (already wired but test).
- **`typescript-rules.md`** — strict types, no `any` except the documented Wistia web-component ts-expect-error.
- **`cinematic-prompts.md`** — for any creative direction calls.
- **`danverse-design-system.md`** — tokens, spacing, type scale.

---

## QUALITY BAR

- Production-ready output. No placeholder content. No commented-out code.
- TypeScript strict — zero errors on `npm run typecheck`.
- ESLint clean — zero new warnings.
- Lighthouse mobile score ≥ 85 for performance.
- 60fps on a mid-tier device for scroll + hover interactions.
- Mobile parity: every desktop feature works identically on 390px.

---

## EXECUTION ORDER

1. Phase 0 — Discovery (15 min)
2. Task 1 — Buttons (20 min)
3. Task 2 — Videos (20 min)
4. Task 3 — Proof captures (10 min)
5. Task 4 — Copy (15 min)
6. Task 5 — Motion (30 min)
7. Task 6 — Audit (20 min)
8. Task 7 — Push + verify (10 min)

**Total target:** 2h20m. Begin now. No questions. Execute.
