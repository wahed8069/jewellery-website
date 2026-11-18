import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FAF4F0",
          100: "#F5E8E1",
          200: "#EBD2C4",
          300: "#DEB8A4",
          400: "#D29E85",
          500: "#CB8E76", // Signature Jewelish Terracotta / Muted Rose Copper
          600: "#B87A62",
          700: "#9E644F",
          800: "#7F4E3D",
          900: "#5E392C",
        },
        terracotta: {
          DEFAULT: "#CB8E76",
          dark: "#B87A62",
          light: "#F5E8E1",
        },
        cream: {
          50: "#FCFAF8",
          100: "#F9F6F2", // soft primary background
          200: "#F3EDE6",
          300: "#E9DFD4",
          400: "#D6C7B7",
        },
        ivory: "#FEFCF9",
        champagne: "#F7F1EB",
        charcoal: {
          DEFAULT: "#262322",
          light: "#3D3836",
          muted: "#78726F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(203, 142, 118, 0.12)",
        card: "0 2px 14px rgba(38, 35, 34, 0.05)",
        circle: "0 4px 15px rgba(0, 0, 0, 0.06)",
        dropdown: "0 10px 30px -5px rgba(38, 35, 34, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
