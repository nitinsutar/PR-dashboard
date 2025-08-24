import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "bg-red-950/40","border-red-800/60",
    "bg-amber-950/40","border-amber-800/60",
    "bg-emerald-950/40","border-emerald-800/60",
    "text-brand-600"
  ],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#eef2ff",100:"#e0e7ff",600:"#4f46e5",700:"#4338ca" }
      }
    }
  },
  plugins: []
} satisfies Config;
