import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0A0B", 2: "#0D0D10", 3: "#111116", 4: "#1A1A22", 5: "#242430" },
        bone: "#E6E7EA",
        ash: { DEFAULT: "#A1A1A8", 2: "#6B6B75", 3: "#3D3D47" },
        venom: { DEFAULT: "#B8FF2E", 2: "#8FEA00", 3: "#CCFF66", dim: "rgba(184,255,46,0.15)", glow: "rgba(184,255,46,0.08)" },
        steel: { DEFAULT: "#6EA6B8", 2: "#4D8A9E" },
        gold: { DEFAULT: "#E3B46F", 2: "#C99A52" },
        alert: "#FF3344", info: "#3B82F6", success: "#22C55E",
      },
      fontFamily: {
        display: ["var(--font-syne)", "Impact", "ui-sans-serif"],
        heading: ["var(--font-space)", "ui-sans-serif"],
        sans: ["var(--font-inter)", "var(--font-space)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "0em", tighter: "0em", tight: "0em",
        caps: "0.22em", label: "0.18em", widest: "0.2em",
      },
      maxWidth: { wrap: "1200px", wide: "1440px" },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "venom": "cubic-bezier(0.22, 1, 0.36, 1)",
        "cinematic": "cubic-bezier(0.4, 0, 0.1, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "venom-pulse": "venom-pulse 2.8s ease-in-out infinite",
        "cursor-blink": "cursor-blink 0.8s steps(1) infinite",
        "marquee": "marquee 28s linear infinite",
        "digit-roll": "digit-roll 0.4s cubic-bezier(0.22,1,0.36,1) both",
      },
      keyframes: {
        "venom-pulse": { "0%,100%": { opacity:"0.45", transform:"scale(0.82)" }, "50%": { opacity:"1", transform:"scale(1)" } },
        "cursor-blink": { "0%,49%": { opacity:"1" }, "50%,100%": { opacity:"0" } },
        "marquee": { "from": { transform:"translateX(0)" }, "to": { transform:"translateX(-50%)" } },
        "digit-roll": { "from": { transform:"translateY(1.2em)", opacity:"0" }, "to": { transform:"translateY(0)", opacity:"1" } },
      },
    },
  },
  plugins: [],
};
export default config;
