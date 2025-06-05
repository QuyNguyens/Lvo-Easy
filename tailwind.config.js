/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": '#034786',
        "primary-2": '#003465',
        "primary-3": '#2C669D',
        "primary-4": '#72BAFF',
        "stroke-200": '#767373',
        "blue-50": 'F1F9F9'
      }
    },
  },
  plugins: [],
}