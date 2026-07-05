import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        abyss: "#050507",
        surface: "#0A0A0F",
        elevated: "#11111A",
        aether: "#A88BFA",
        elyos: "#F0C75E",
        asmodian: "#5B9BD5",
        textPrimary: "#F0F0F5",
        textSecondary: "#8A8AA3",
        textMuted: "#4A4A6A",
        danger: "#E05260",
        success: "#4ADE80",
        warning: "#FBBF24",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 139, 250, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(168, 139, 250, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
