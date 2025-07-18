/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-1": "#034786", 
        "primary-2": "#003465",
        "primary-3": "#2C669D",
        "primary-4": "#72BAFF",
        "stroke-200": "#767373",
        "blue-50": "#F1F9F9",
        "blue-100": "#D3EFFA",
        "blue-200": "#A6E6FF",
        "green-100": "#F1F5F2",
        "gray-200": "#A09E9E",
        "black-400": "#000000",
      },
      fontSize: {
        base12: "12px",
        base16: "1rem",
        base18: "18px",
      },
    },
  },
  plugins: [],
};
