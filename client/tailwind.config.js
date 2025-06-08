/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          1: "#ff5733",
        },
      },
    },
  },
  plugins: [
  require('tailwind-scrollbar-hide'),
  ],
};
