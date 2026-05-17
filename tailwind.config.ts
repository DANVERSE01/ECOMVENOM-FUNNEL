import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				ink: { DEFAULT: "#010101", 2: "#0B0A08", 3: "#1A1813", 4: "#2D2B26", 5: "#474741" },
				bone: { DEFAULT: "#E4E1DC", 2: "#A29E97" },
				ash: { DEFAULT: "#A29E97", 2: "#6E6B67", 3: "#474741" },
				venom: { DEFAULT: "#D5D904", 2: "#918C09", 3: "#D5D904", dim: "rgba(213,217,4,0.12)", glow: "rgba(213,217,4,0.06)" },
				acid: { DEFAULT: "#D5D904", shadow: "#918C09" },
				steel: { DEFAULT: "#6E6B67", 2: "#474741" },
				gold: { DEFAULT: "#5C3E0B", 2: "#5C3E0B" },
				amber: { DEFAULT: "#5C3E0B", smoke: "#5C3E0B" },
				crimson: { DEFAULT: "#C74208", 2: "#C74208", 3: "#E47A3A", glow: "rgba(199,66,8,0.14)", dim: "rgba(199,66,8,0.06)" },
				heat: { DEFAULT: "#C74208", glow: "rgba(199,66,8,0.18)" },
				violet: { DEFAULT: "#5C3E0B", 2: "#474741", glow: "rgba(92,62,11,0.10)" },
				alert: "#C74208", info: "#A29E97", success: "#D5D904",
			},
			fontFamily: {
				display: ["var(--font-syne)", "Impact", "ui-sans-serif"],
				heading: ["var(--font-space)", "ui-sans-serif"],
				sans: ["var(--font-inter)", "var(--font-space)", "ui-sans-serif", "system-ui"],
				mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
			},
			letterSpacing: {
				tightest: "0", tighter: "0", tight: "0",
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
