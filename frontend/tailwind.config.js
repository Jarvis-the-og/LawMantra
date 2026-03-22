/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: "#0a0e1a",
        surface: "#0f172a",
        panel: "#1e293b",
        border: "#334155",
        muted: "#64748b",
        accent: "#ef4444",
        warn: "#f97316",
        safe: "#22c55e",
        highlight: "#facc15",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "scan": "scan 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "1" },
          "50%": { transform: "translateY(100%)", opacity: "0.4" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
