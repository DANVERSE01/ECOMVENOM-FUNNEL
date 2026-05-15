# ECOMVENOM — Codex Context
# Project: 02_APP_BUILD_HERE
# Director: Danverse | 2026

---

## IDENTITY

This is ECOMVENOM — a dark premium, toxic-green, cinematic conversion engine
for ecommerce training and booking. Every visual decision serves conversion.
Every animation serves brand perception. Nothing is decorative without purpose.

**Creative bar:** lusion.co · activetheory.net · resn.co.nz · unfold.no · unit9.com

---

## ACTIVE SPRINT

**Visual Acceleration Layer — Design Only**

Read `.Codex/visual-acceleration-brief.md` immediately and follow it completely.

---

## BRAND DNA

```
Base:     #050505 / #0a0a0a  — deep black, not pure black
Accent:   toxic green        — energy, not decoration
Motion:   cinematic, weighted, precise — never bouncy, never generic
Texture:  grain + noise = depth
Energy:   lethal · premium · conversion-focused · non-template
```

---

## STACK (DO NOT CHANGE)

- Next.js 15 App Router — Server Components default
- TypeScript 5.x strict
- Tailwind v4 CSS-first
- shadcn/ui + Radix
- Zustand (subscribeWithSelector)
- TanStack Query v5

**3D / Animation (if present):**
- Three.js r184+ / React Three Fiber
- GSAP 3.13+ (all plugins free — SplitText mask, ScrollTrigger, Flip)
- Framer Motion
- Lenis (import from 'lenis/react')

---

## EXECUTION RULES

- Read repo first. Plan second. Edit third.
- Never edit files before producing the implementation plan.
- Never change the stack.
- Never push, deploy, publish, or delete anything.
- Never add dependencies without explicit justification.
- Keep build green after every step.
- One question max if uncertain — then proceed with stated assumption.
- `prefers-reduced-motion` guard on every animation — mandatory.

---

## BUILD VALIDATION SEQUENCE

```bash
npm run typecheck    # or: npx tsc --noEmit
npm run lint
npm run build
```

All three must pass after every implementation step.

---

## SKILL REFERENCE (Codex)

If operating inside DANVERSE-X project context, reference:
- `danverse-web-master.md` → animation, 3D, cursor, GPU modules
- `frontend-design.md` → component patterns, spacing, typography
- `css-animation-system.md` → motion guidelines

---

## DO NOT

- Change core stack
- Rewrite architecture
- Touch backend / routing / data / deployment config
- Copy UI library components directly
- Create generic SaaS / AI-dashboard / crypto aesthetics
- Add fake placeholder content
- Push or deploy anything
