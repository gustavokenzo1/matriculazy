/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  variants: {
    scrollbar: ["dark", "rounded"]
  },
  plugins: [require("tailwind-scrollbar")],
};
