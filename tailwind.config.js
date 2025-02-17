/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#646cff',
        'button-black': '#1a1a1a',
        'accent-border': '#27272a',
      }
    },
  },
  plugins: [],
}

