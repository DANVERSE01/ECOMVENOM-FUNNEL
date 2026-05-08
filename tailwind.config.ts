import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#060608", 2: "#0A0A0E", 3: "#101016", 4: "#18181F", 5: "#222230" },
        bone: { DEFAULT: "#F0EDE6", 2: "#D8D4CC" },
        ash: { DEFAULT: "#8A8A94", 2: "#6B6B75", 3: "#3D3D47" },
        venom: { DEFAULT: "#B8FF2E", 2: "#9AE600", 3: "#CCFF66", dim: "rgba(184,255,46,0.12)", glow: "rgba(184,255,46,0.06)" },
        steel: { DEFAULT: "#5A9AAD", 2: "#4D8A9E" },
        gold: { DEFAULT: "#D4A45A", 2: "#C99A52" },
        alert: "#FF3344", info: "#3B82F6", success: "#22C55E",
      },
      fontFamily: {
        display: ["var(--font-syne)", "Impact", "ui-sans-serif"],
        heading: ["var(--font-space)", "ui-sans-serif"],
        sans: ["var(--font-inter)", "var(--font-space)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em", tighter: "-0.02em", tight: "-0.01em",
        caps: "0.12em", label: "0.12em", widest: "0.14em",
      },
      maxWidth: { wrap: "1200px", measure: "1120px", wide: "1320px" },
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
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "venom-pulse": { "0%,100%": { opacity:"0.45", transform:"scale(0.82)" }, "50%": { opacity:"1", transform:"scale(1)" } },
        "cursor-blink": { "0%,49%": { opacity:"1" }, "50%,100%": { opacity:"0" } },
        "marquee": { "from": { transform:"translateX(0)" }, "to": { transform:"translateX(-50%)" } },
        "digit-roll": { "from": { transform:"translateY(1.2em)", opacity:"0" }, "to": { transform:"translateY(0)", opacity:"1" } },
        "float": { "0%,100%": { transform:"translateY(0)" }, "50%": { transform:"translateY(-8px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
