/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        gt: ["GT-Walsheim", "sans-serif"],
      },
      colors: {
        brand: {
          500: "#9922ff",
        },
        primary: {
          500: "#00bbff",
        },
        secondary: {
          500: "#dd22cc",
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
