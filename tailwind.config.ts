import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#3b82f6",
        danger: "#ef4444",
        warning: "#f59e0b",
        surface: "rgba(15, 15, 20, 0.85)",
        "surface-elevated": "rgba(25, 25, 35, 0.9)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
