import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Primitive tokens — values defined once in globals.css :root via RGB channels
				ink: {
					DEFAULT: "rgb(var(--c-ink-rgb) / <alpha-value>)",
					2: "rgb(var(--c-ink-2-rgb) / <alpha-value>)",
					3: "rgb(var(--c-ink-3-rgb) / <alpha-value>)",
					4: "rgb(var(--c-ink-4-rgb) / <alpha-value>)",
					5: "rgb(var(--c-ink-5-rgb) / <alpha-value>)",
				},
				bone: {
					DEFAULT: "rgb(var(--c-bone-rgb) / <alpha-value>)",
					2: "rgb(var(--c-bone-2-rgb) / <alpha-value>)",
				},
				ash: {
					DEFAULT: "rgb(var(--c-ash-rgb) / <alpha-value>)",
					2: "rgb(var(--c-ash-2-rgb) / <alpha-value>)",
					3: "rgb(var(--c-ash-3-rgb) / <alpha-value>)",
				},
				venom: {
					DEFAULT: "rgb(var(--c-venom-rgb) / <alpha-value>)",
					2: "rgb(var(--c-venom-2-rgb) / <alpha-value>)",
					3: "rgb(var(--c-venom-3-rgb) / <alpha-value>)",
					dim: "rgba(184,255,46,0.12)",
					glow: "rgba(184,255,46,0.06)",
				},
				steel: {
					DEFAULT: "rgb(var(--c-steel-rgb) / <alpha-value>)",
					2: "rgb(var(--c-steel-2-rgb) / <alpha-value>)",
				},
				gold: {
					DEFAULT: "rgb(var(--c-gold-rgb) / <alpha-value>)",
					2: "rgb(var(--c-gold-2-rgb) / <alpha-value>)",
				},
				crimson: {
					DEFAULT: "rgb(var(--c-crimson-rgb) / <alpha-value>)",
					2: "rgb(var(--c-crimson-2-rgb) / <alpha-value>)",
					3: "rgb(var(--c-crimson-3-rgb) / <alpha-value>)",
					glow: "rgba(255,23,68,0.12)",
					dim: "rgba(255,23,68,0.06)",
				},
				// violet removed — zero usage confirmed in full codebase audit
				alert: "#FF3344", info: "#3B82F6", success: "#22C55E",
				// Semantic aliases — Batch 2+ work uses these for layout/component tokens
				bg: {
					DEFAULT: "rgb(var(--c-ink-rgb) / <alpha-value>)",
					raised: "rgb(var(--c-ink-3-rgb) / <alpha-value>)",
					overlay: "rgb(var(--c-ink-2-rgb) / <alpha-value>)",
				},
				fg: {
					DEFAULT: "rgb(var(--c-bone-rgb) / <alpha-value>)",
					muted: "rgb(var(--c-ash-rgb) / <alpha-value>)",
					subtle: "rgb(var(--c-ash-2-rgb) / <alpha-value>)",
				},
				accent: "rgb(var(--c-venom-rgb) / <alpha-value>)",
				danger: "rgb(var(--c-crimson-rgb) / <alpha-value>)",
			},
			fontFamily: {
				display: ["var(--font-syne)", "Impact", "ui-sans-serif"],
				// Space Grotesk removed — --font-space aliases Inter in LTR, Arabic display in RTL
				heading: ["var(--font-space)", "ui-sans-serif"],
				// font-sans no longer falls back to --font-space (was redundant after Inter loads)
				sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
				// JetBrains Mono removed — var(--font-mono) resolves to system stack via :root
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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
				marquee: "marquee 28s linear infinite",
				"digit-roll": "digit-roll 0.4s cubic-bezier(0.22,1,0.36,1) both",
				float: "float 6s ease-in-out infinite",
				"geometric-float": "geometric-float 28s ease-in-out infinite",
				"crimson-pulse": "crimson-pulse 3s ease-in-out infinite",
				"gradient-shift": "gradient-shift 8s ease infinite",
			},
			keyframes: {
				"venom-pulse": { "0%,100%": { opacity: "0.45", transform: "scale(0.82)" }, "50%": { opacity: "1", transform: "scale(1)" } },
				"cursor-blink": { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
				marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
				"digit-roll": { from: { transform: "translateY(1.2em)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
				float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
				"geometric-float": { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
				"crimson-pulse": { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
				"gradient-shift": { "0%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" }, "100%": { backgroundPosition: "0% 50%" } },
			},
		},
	},
	plugins: [],
};

export default config;