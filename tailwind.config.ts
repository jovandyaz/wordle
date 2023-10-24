import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "dark-mode": "url('/src/assets/dark-mode-toggle.svg')",
        "light-mode": "url('/src/assets/light-mode-toggle.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
