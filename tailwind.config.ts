import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b17",
        surface: "#1a1a2e",
        surface2: "#25253e",
        neon: {
          purple: "#a78bfa",
          cyan: "#2dd4bf",
        },
        muted: "#6b6b85",
        "text-secondary": "#9d9db5",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        glass: "16px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.3)",
        glow: "0 8px 32px rgba(167,139,250,0.25)",
        "glow-cyan": "0 8px 32px rgba(45,212,191,0.25)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s infinite",
        float: "float 8s infinite ease-in-out",
        wave: "wave 1.2s infinite ease-in-out",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "25%": { opacity: "0.5" },
          "50%": { opacity: "0.25", transform: "translateY(-40px) scale(1)" },
          "75%": { opacity: "0.5" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.6)", opacity: "0.6" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
