import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
        heading: ["Orbitron", "sans-serif"],
      },
      colors: {
        cp: {
          yellow: "#F5C518",
          "yellow-dim": "#C49B10",
          cyan: "#00D4FF",
          "cyan-dim": "#0099BB",
          red: "#FF3366",
          void: "#0A0A0F",
          card: "#12121A",
          muted: "#1C1C2E",
          border: "#2A2A3A",
          text: "#E0E0E0",
          "text-dim": "#888899",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
