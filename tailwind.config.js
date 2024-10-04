/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-green": "#EE4266",
        "light-lime": "#e1f6b2",
        "primary-red": "#eb7e6c",
        "medium-black": "#222222",
        "very-light-gray": "#f9f9f9",
        "gray-filter": "#e5e7eb",
      },
      boxShadow: {
        shuttle: "0 0 1rem 1px rgb(0 0 0 / 3%);",
        "custom-primary":
          "0 -5px 5px rgba(238, 66, 102, 0.2), 5px 0 5px rgba(238, 66, 102, 0.2), -5px 0 5px rgba(238, 66, 102, 0.2)",
        autosuggest:
          "0px 5px 5px rgba(238, 66, 102, 0.2), 5px 0 5px rgba(238, 66, 102, 0.2), -5px 0 5px rgba(238, 66, 102, 0.2)",
        "black-box-shadow": "rgba(0, 0, 0, 0.12) 20px 20px 20px",
        btn: "0 0 0.7em #EE4266",
      },
      aspectRatio: {
        "16/14": "16/14",
      },
      border: {
        filter: "#e5e7eb",
      },
    },
  },
  plugins: [
    nextui(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    }),
  ],
};
