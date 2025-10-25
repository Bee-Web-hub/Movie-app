/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🌙 enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // 🧹 plugin to hide scrollbars
  ],
};
