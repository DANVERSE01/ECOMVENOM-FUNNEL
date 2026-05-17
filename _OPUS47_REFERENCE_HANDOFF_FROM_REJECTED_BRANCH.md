# Opus 4.7 Reference Handoff — From Visually Rejected Branch

**Status: REFERENCE ONLY. Do not merge. Do not push. Do not deploy.**

---

## 1. Branch Identity

- **Branch:** `design/creative-impact-upgrade`
- **Latest commit:** `2130ca8`
- **Branched from:** `main@85a9c9a` ("fix: phase 4 vsl and cinematic mobile QA")

---

## 2. What Is Technically Useful (Reuse Carefully)

### GSAP Proof Section — Vertical-Scroll-Driven Horizontal Pin
The core ScrollTrigger implementation in `components/sections/ProofSection.tsx` is technically correct and can be carried forward into any redesign:

```tsx
useGSAP(() => {
  if (reducedMotion()) return;
  const mq = window.matchMedia("(min-width: 1040px)");
  if (!mq.matches) return;
  const section = document.getElementById("proof"); // SectionWrapper owns the ref
  const rail = railRef.current;
  if (!section || !rail) return;
  const travel = rail.scrollWidth - rail.offsetWidth;
  if (travel <= 0) return;
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${travel + window.innerWidth * 0.4}`,
    pin: true,
    anticipatePin: 1,
    scrub: 1.4,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(rail, { x: -(travel * self.progress) });
      const firstCard = rail.children[0] as HTMLElement | null;
      const cardW = (firstCard?.offsetWidth ?? 380) + 20;
      const idx = Math.min(Math.round((travel * self.progress) / cardW), assets.length - 1);
      setActiveIndex(Math.max(0, idx));
    },
  });
  ScrollTrigger.refresh();
  return () => st.kill();
}, [assets.length]);
```

Key architectural note: `SectionWrapper` owns the `<section>` ref — you cannot attach a ref from `ProofSection`. Use `document.getElementById("proof")` to access the trigger element at runtime.

Fallback (reduced-motion + mobile): drag-scroll via `useEffect`, activates only when `isDesktopMotion` is false.

CSS layout pair for the pin to work:
```css
/* desktop only */
.v2-proof-scroll-wrap { overflow: hidden; }
.v2-proof-rail { display: flex; flex-wrap: nowrap; will-change: transform; }
.v2-proof-card { flex: 0 0 clamp(22rem, 28vw, 30rem); }
```

### QA Notes
- Travel confirmed at runtime: **1226px** across 6 cards
- Rail X mid-scroll confirmed: **-397px** at ~700px into the pin zone
- No horizontal overflow at any viewport (390 / 768 / 1440)
- 0 console errors, 0 warnings on production build

### Build and Typecheck Commands
```bash
npm run typecheck        # tsc --noEmit — must be clean before commit
npm run build            # full Next.js build — must pass
npm start -- -p 3004     # production server for CSS QA (dev server CSS pipeline is unreliable in worktrees)
```

**Important:** Always QA against the production server (`npm start`), not `npm run dev`. The dev server has exhibited broken CSS pipelines (serving 9-byte CSS) in this worktree context. Production build is authoritative.

### Screenshots Path
All QA screenshots are in `screenshots/` on this branch. See section 5 for details.

---

## 3. What Must NOT Be Reused Visually

**Do not carry any of the following into the next design direction:**

- **Color direction** — the green-on-black venom palette application in `creative-upgrade.css` is flat and unsophisticated; it reads as a generic dark SaaS template, not a premium Arabic ecom brand
- **CSS overlay approach** — layering a new `creative-upgrade.css` on top of `cinematic-v2.css` creates specificity conflicts and unpredictable cascade; the next direction should work from tokens and the existing layer cleanly, not add a third override layer
- **Basic visual treatment** — gradient overlays, glow shadows, and backdrop-filter stacks without a coherent lighting model; everything feels additive rather than designed
- **Arabic/English feel inconsistency** — the two languages do not feel like the same brand; Arabic headings look unstyled compared to their English equivalents, and the count indicator (`01 / 06`) reads awkwardly in RTL
- **Laggy/unstable interactions** — the proof gallery's GSAP scrub creates visible jank at certain scroll velocities; the tilt effect (`useTilt`) on proof cards compounds this; the next direction should benchmark interactions at 60fps before shipping

---

## 4. Exact Files Changed on This Branch

| File | Change |
|---|---|
| `components/venom/creative-upgrade.css` | NEW — ~400-line visual override layer |
| `app/globals.css` | +1 import line for `creative-upgrade.css` |
| `components/sections/ProofSection.tsx` | Full rewrite — GSAP ScrollTrigger pin, drag fallback, pip nav, count indicator |
| `_ECOMVENOM_CREATIVE_PREFLIGHT.md` | New — preflight notes |
| `_ECOMVENOM_CREATIVE_IMPACT_REPORT.md` | New — QA report (updated twice) |
| `screenshots/*.png` | 12 QA screenshots added |

To diff against baseline:
```bash
git diff main@85a9c9a..2130ca8 -- components/ app/
```

---

## 5. Screenshots Captured

| File | Viewport | What It Shows |
|---|---|---|
| `qa2-1440-proof-pinned.png` | 1440 | Proof section pinned to viewport (GSAP pin active) |
| `qa3-1440-proof-mid-scroll.png` | 1440 | Mid-scroll — rail at x=-397px, horizontal movement confirmed |
| `qa4-1440-hero.png` | 1440 | Hero with atmosphere/glass upgrades applied |
| `qa4-1440-vsl.png` | 1440 | VSL stage with cinematic frame treatment |
| `qa4-1440-cinematic.png` | 1440 | Cinematic scroll scene (chaos-system-film section) |
| `qa4-1440-final-cta.png` | 1440 | Final CTA panel with atmospheric glow |
| `qa4-390-hero.png` | 390 | Mobile hero |
| `qa4-390-proof-vertical.png` | 390 | Mobile proof — vertical stacked, no pin |
| `qa4-390-apply.png` | 390 | /apply route rendering |
| `qa4-390-schedule.png` | 390 | /schedule route rendering |
| `qa4-768-hero.png` | 768 | Tablet hero |
| `qa4-768-proof.png` | 768 | Tablet proof — vertical stacked (768 < 1040px breakpoint) |

---

## 6. Branch Status

- **Not merged into main** ✓
- **Not pushed to remote** ✓
- **Not deployed** ✓
- This branch exists locally only as a technical reference
- Do not merge, push, or deploy without explicit approval from the user

---

## 7. Recommended Baseline for Next Opus 4.7 Session

**Start from `main@85a9c9a`** — not from this branch.

```bash
git checkout main
git checkout -b design/opus47-premium-v2
```

`main@85a9c9a` is the clean production baseline with all Codex fixes confirmed:
- Hero VSL visibility ✓
- VSL play/pause controls ✓
- Wistia sound fallback ✓
- Proof dialog behavior ✓
- Mobile cinematic scroll-scrub ✓
- Sticky mobile CTA ✓
- No horizontal overflow ✓

The GSAP proof pin logic from `ProofSection.tsx` on this branch can be cherry-picked or manually ported into the new direction — it is the one component worth transplanting.
