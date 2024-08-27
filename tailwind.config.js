/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.astro"],
  theme: {
    extend: {
      fill: ["dark"],
      colors: {
        "dark-primary": "#e0d0e3",
        "dark-secondary": "#bfa4c4", 
        "light-primary": "#3b1f6e",
        "light-secondary": "#5e2a8e",
      },
    },
  },
  plugins: [],
};
