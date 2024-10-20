import flowbite from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ytRed: "#FF0000",
        ytBlack: "#111111",
        ytWhite: "#FFFFFF",
        primary: "#0F0F0F",
        primaryDark: "#eeeeee",
        secondary: "#606060",
        secondaryDark: "#AAAAAA",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, Opera */,
          },
        },
        ".scrollbar-show": {
          "-ms-overflow-style": "auto" /* IE and Edge */,
          "scrollbar-width": "auto" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "block" /* Chrome, Safari, Opera */,
          },
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
