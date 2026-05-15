export const HIGGSFIELD_FRAME_COUNT = 74;

export const HIGGSFIELD_FRAMES = Array.from(
  { length: HIGGSFIELD_FRAME_COUNT },
  (_, index) =>
    `/frames/higgsfield-system/frame_${String(index + 1).padStart(3, "0")}.webp`,
);

export const HIGGSFIELD_STILLS = {
  systemIntro: "/stills/system-intro.webp",
  cartChaos: "/stills/cart-chaos.webp",
  productWireframe: "/stills/product-wireframe.webp",
  dashboardSystem: "/stills/dashboard-system.webp",
  storePortal: "/stills/store-portal.webp",
  ecomvenomLockup: "/generated/cta-bg.webp",
} as const;

export const FINAL_FUNNEL_IMAGES = [
  "/proof/proof-order-signal.webp",
  "/proof/proof-student-dashboard.webp",
  "/proof/proof-first-day-orders.webp",
] as const;

export const BRAND_VISUALS = Array.from(
  { length: 20 },
  (_, index) => `/brand-visuals/brand-visual-${String(index + 3).padStart(2, "0")}.png`,
) as readonly string[];

export const HIGGSFIELD_LOOPS = {
  systemWake: "/media/system-loop-01.mp4",
  systemAlign: "/media/system-loop-02.mp4",
  finalLockup: "/media/final-lockup-loop.mp4",
} as const;

export const GENERATED_STILLS = {
  heroBg: "/generated/hero-bg.webp",
  roadmapBg: "/generated/roadmap-bg.webp",
  proofBg: "/generated/proof-bg.webp",
  ctaBg: "/generated/cta-bg.webp",
} as const;
