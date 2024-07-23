import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1840px",
      },
      transitionDelay: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
      keyframes: {
        swing: {
          "0%, 100%": {
            transform: "translateY(0px) ",
          },
          "50%": {
            transform: "translateY(-20px) ",
          },
        },
      },
      animation: {
        swing: "swing 5s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    nextui(),
  ],
};
