import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dim": "rgb(var(--accent-dim) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        12: ["0.75rem", { lineHeight: "1rem" }],
        14: ["0.875rem", { lineHeight: "1.25rem" }],
        16: ["1rem", { lineHeight: "1.6rem" }],
        18: ["1.125rem", { lineHeight: "1.75rem" }],
        24: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        40: ["2.5rem", { lineHeight: "2.75rem", letterSpacing: "-0.04em" }],
        64: ["4rem", { lineHeight: "4rem", letterSpacing: "-0.055em" }],
        96: ["6rem", { lineHeight: "5.75rem", letterSpacing: "-0.065em" }],
        hero: [
          "clamp(4rem, 10vw, 6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.065em" },
        ],
      },
      maxWidth: {
        container: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
