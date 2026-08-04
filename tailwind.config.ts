import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0a",
          900: "#0d0d0d",
          850: "#111111",
          800: "#161616",
        },
        line: "rgba(255,255,255,0.08)",
        line2: "rgba(255,255,255,0.14)",
        smoke: {
          400: "#8f8f8f",
          300: "#a6a6a6",
          200: "#c7c7c7",
        },
        accent: {
          DEFAULT: "#f97316",
          dim: "#c2600f",
          soft: "rgba(249,115,22,0.12)",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
export default config;
