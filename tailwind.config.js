import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "100%": {
            "background-position": "100% 50%",
          },
        },
      },
      animation: {
        swing: "swing 7.5s ease-in-out infinite",
        gradient: "gradient 2.5s ease-out 2",
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
