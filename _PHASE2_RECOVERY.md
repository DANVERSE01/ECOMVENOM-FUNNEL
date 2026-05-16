# ECOMVENOM PHASE 2 RECOVERY — CONTINUE FROM CODEX COMMIT a0ce976

> **CRITICAL:** You are continuing work from a previous agent session. Do NOT revert or restart. Build on commit `a0ce976`. Read every file before editing. Run dev server and visually verify EVERY change in a real browser via Playwright before committing.

> **FULL AUTHORITY granted.** Read, write, install, run dev, screenshot, commit, push. Zero questions to user. Execute silently. Use all skills in `D:\Projects\DANVERSE-X\.claude\skills\`.

---

## VERIFIED BROKEN ITEMS (from real screenshots + code inspection)

### BUG 1 — MOBILE HERO TEXT INVISIBLE
**Root cause:** `lib/motion.ts` → `revealHeadline()` uses GSAP SplitText with `gsap.from(split.chars, { yPercent: 110 })`. On mobile/production, the animation fires before layout completes or fails silently — chars stay at yPercent:110 (offscreen). The headline, body, buttons are ALL invisible on mobile.

**Fix:**
- In `components/sections/HeroSection.tsx`, add a CSS fallback: set `.v2-hero__headline` to `visibility: visible` by default.
- In `lib/motion.ts` → `revealHeadline()`, wrap in `requestAnimationFrame` or use `gsap.set()` with a `delay: 0.1` to ensure layout is ready.
- Add a CSS safety net in `cinematic-v2.css`:
```css
.v2-hero__headline .char {
  will-change: transform;
}
/* Fallback if GSAP fails */
@media (prefers-reduced-motion: reduce) {
  .v2-hero__headline {
    opacity: 1 !important;
    transform: none !important;
  }
}
```
- **TEST:** Screenshot mobile 390px hero. The headline "Turn dropshipping..." MUST be visible. If it's not, remove the SplitText animation entirely and use a simpler fade-in.

### BUG 2 — VSL NOT AUTOPLAYING ON LOAD
**Root cause:** Wistia web component attributes `autoplay="true"` and `muted="true"` are set, but the media script loads asynchronously. The player initializes after React hydration completes, and the autoplay may not fire on mobile browsers.

**Fix:**
- In `components/cinematic/WistiaPlayer.tsx`, add Wistia's JavaScript API initialization:
```tsx
useEffect(() => {
  loadWistiaScripts();
  loadMediaScript(mediaId);

  // Ensure autoplay via Wistia JS API
  const checkReady = setInterval(() => {
    const wistiaEmbeds = (window as any)._wq || [];
    wistiaEmbeds.push({
      id: mediaId,
      onReady: (video: any) => {
        if (autoplay && muted) {
          video.mute();
          video.play();
        }
      },
    });
    // Also try the modern API
    const el = document.querySelector(`wistia-player[media-id="${mediaId}"]`) as any;
    if (el?.play) {
      clearInterval(checkReady);
      el.muted = true;
      el.play().catch(() => {});
    }
  }, 500);

  return () => clearInterval(checkReady);
}, [mediaId, autoplay, muted]);
```
- Also ensure the `<wistia-player>` has `seo="false"` to prevent poster-only rendering.
- **TEST:** Open home page. Video must start playing immediately (muted). Click to unmute.

### BUG 3 — "WATCH FOUNDER VIDEO" BUTTON NOT RESPONDING
**Root cause:** `GlowButton` with `href="#founder-vsl"` renders a `<button>` that calls `window.__lenis?.scrollTo()`. But `window.__lenis` might not be available at click time if SmoothScroll provider hasn't mounted yet, or if there's a z-index issue.

**Fix:**
- In `GlowButton.tsx`, make the hash handler more robust:
```tsx
const handleHashClick = () => {
  onClick?.();
  if (typeof window === "undefined") return;

  const targetId = href!;
  const target = document.querySelector<HTMLElement>(targetId);
  if (!target) return;

  // Try multiple scroll methods
  try {
    window.history.pushState(null, "", targetId);
  } catch {}

  if ((window as any).__lenis) {
    (window as any).__lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
```
- Check z-index: the button must be above any overlapping elements. Add `position: relative; z-index: 10;` to `.vx-actions`.
- **TEST:** Click "Watch founder video". Page must scroll smoothly to the VSL section.

### BUG 4 — FAQ ACCORDION APPEARS BROKEN
**Root cause:** The `<details>/<summary>` is native HTML and should work. But the `GlassPanel` wrapper might have `overflow: hidden` or `pointer-events` issues. Also the `+/-` toggle icon might not be clear enough.

**Fix:**
- Verify `GlassPanel` doesn't have `overflow: hidden` that clips the expanded content.
- Add explicit `cursor: pointer` to summary and ensure the entire row is clickable.
- Add smooth open/close animation:
```css
.vx-faq details > p {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.25s ease,
              padding 0.35s ease;
  padding: 0 1rem;
}

.vx-faq details[open] > p {
  max-height: 12rem;
  opacity: 1;
  padding: 0 1rem 1rem;
}
```
- **TEST:** Click each FAQ item. It must expand/collapse smoothly.

### BUG 5 — MOBILE SCROLLFILM BROKEN
**Root cause:** On mobile (<767px), `.v2-scroll-film__stage` is `display: none`. The `LusionMonitorScrollScene` component renders the mobile fallback video. But the mobile video container has bad positioning — not centered, weird gaps.

**Fix:**
- In the mobile CSS (<767px), ensure the video container is centered:
```css
@media (max-width: 767px) {
  .v2-scroll-film--visual .v2-scroll-film__pin {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80svh;
    padding: 2rem 1rem;
  }

  .v2-scroll-film--visual .v2-scroll-film__mobile {
    width: 100%;
    max-width: 22rem;
    margin: 0 auto;
  }

  .v2-scroll-film__mobile video {
    width: 100%;
    border-radius: 0.75rem;
    aspect-ratio: 9/16;
    object-fit: cover;
  }
}
```
- Remove any weird absolute positioning or misaligned frames on mobile.
- **TEST:** Screenshot mobile scrollfilm section. Video must be centered, properly sized, no gaps.

### BUG 6 — FONTS CUT OFF / OVERLAPPING
**Root cause:** `v2-hero__headline` has `max-width: 10.6ch` which constrains line breaks. With SplitText masks, the chars might clip. Also `line-height: 0.98` is extremely tight and causes ascenders/descenders to clip.

**Fix:**
- Change `line-height: 0.98` to `line-height: 1.05` for the headline.
- Add `overflow: visible` to the headline container.
- On mobile, increase line-height to `1.12` (already set but verify).
- Add `padding-block: 0.05em` to prevent ascender/descender clipping with SplitText masks.
- **TEST:** Screenshot headline at all breakpoints. No clipping.

### BUG 7 — MISSING PROFESSIONAL MOTION & TRANSITIONS
**Current state:** Only SplitText hero + magnetic CTA + tilt on proof cards. No section transitions, no scroll-driven reveals, no parallax, no cursor effects working.

**Add these (in order of impact):**

**7A. Section reveal animations:**
In `lib/motion.ts`, add a function that finds all `[data-vx-reveal]` elements and creates ScrollTrigger animations:
```ts
export function initScrollReveals() {
  if (reducedMotion()) return;

  const elements = document.querySelectorAll<HTMLElement>("[data-vx-reveal]");
  elements.forEach((el) => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}
```
Call this from the root layout or a global motion initializer component.

**7B. Parallax on hero media:**
```ts
gsap.to(".v2-hero__media", {
  yPercent: 12,
  scrollTrigger: {
    trigger: ".v2-hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
  },
});
```

**7C. Section divider lines with gradient sheen:**
Add a CSS animation to `.vx-section--compact::before`:
```css
.vx-section--compact::before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--v2-green), transparent);
  background-size: 200% 100%;
  animation: sheen 4s ease-in-out infinite;
  opacity: 0.3;
  margin-bottom: 3rem;
}

@keyframes sheen {
  0%, 100% { background-position: -100% 0; }
  50% { background-position: 200% 0; }
}
```

**7D. Number count-up on proof captions:**
Only if there are standalone visible numbers. Don't force count-up into paragraph text.

- **TEST:** Scroll through the full page. Every section should fade in smoothly. Hero media should parallax.

### BUG 8 — NETLIFY DEPLOY NOT PUBLISHED
**Root cause:** Codex pushed to main but Netlify's production alias is still on an older locked deploy.

**Fix:** After all code changes are committed and pushed:
```bash
npx netlify-cli deploy --prod --dir=.next --site=ecomvenom
```
Or manually: the Netlify dashboard → Deploys → find the latest deploy → click "Publish deploy".

Actually, since Netlify auto-deploys from main, just check if the latest deploy is published. If not, use:
```bash
npx -y netlify-cli api updateSiteDeploy --data '{"site_id":"6ab905be-a39f-46ca-bf37-81e1bd5e9b6d","deploy_id":"LATEST","body":{"published":true}}'
```

---

## EXECUTION ORDER

1. Fix Bug 1 (mobile hero text) — HIGHEST PRIORITY
2. Fix Bug 6 (font clipping)
3. Fix Bug 2 (VSL autoplay)
4. Fix Bug 3 (founder button)
5. Fix Bug 4 (FAQ)
6. Fix Bug 5 (mobile scrollfilm)
7. Add Bug 7 motion
8. Run `npm run typecheck && npm run lint && npm run build`
9. Start production server, screenshot ALL pages at 1440px, 768px, 390px
10. Visual diff: EVERY screenshot must show correct content. If anything looks wrong, fix it before committing.
11. Commit: `fix: phase2 recovery — hero visibility, VSL autoplay, motion, mobile parity`
12. Push: `git push origin main`
13. Verify Netlify deploy is live and published.

---

## QUALITY GATES (DO NOT COMMIT UNTIL ALL PASS)

- [ ] Mobile 390px: Hero headline visible
- [ ] Mobile 390px: Hero CTAs visible and clickable
- [ ] Mobile 390px: VSL plays muted
- [ ] Mobile 390px: ScrollFilm video centered, no gaps
- [ ] Mobile 390px: No horizontal overflow
- [ ] Mobile 390px: Sticky CTA appears after hero scroll
- [ ] Desktop 1440px: VSL autoplays muted on load
- [ ] Desktop 1440px: "Watch founder video" scrolls to VSL
- [ ] Desktop 1440px: FAQ items expand/collapse
- [ ] Desktop 1440px: All 6 proof cards visible
- [ ] Desktop 1440px: Section reveal animations work
- [ ] Both: `npm run typecheck` passes
- [ ] Both: `npm run build` passes
- [ ] Both: Zero console errors (ignore Wistia CORS on localhost)

---

## FILES TO TOUCH (be precise, don't rewrite files you don't need to)

1. `lib/motion.ts` — fix `revealHeadline`, add `initScrollReveals`
2. `components/cinematic/WistiaPlayer.tsx` — add JS API autoplay fallback
3. `components/venom/GlowButton.tsx` — harden hash scroll handler
4. `components/venom/cinematic-v2.css` — fix headline line-height, mobile scrollfilm, add section dividers
5. `components/venom/tokens.css` — fix FAQ animation, ensure details/summary works
6. `components/sections/HeroSection.tsx` — add CSS fallback for headline visibility
7. `components/ui/StickyMobileCTA.tsx` — verify visibility logic (may be fine)
8. Root layout or a new `components/effects/ScrollMotionInit.tsx` — call `initScrollReveals()` on mount

---

## DO NOT

- Do not revert previous commits
- Do not remove existing proof cards or copy
- Do not change the routing structure
- Do not add new npm dependencies unless absolutely required
- Do not modify the design tokens in tokens.css unless fixing a specific bug
- Do not skip the visual verification step
- Do not commit without passing typecheck and build

**BEGIN NOW. No questions. Execute production-grade work.**
