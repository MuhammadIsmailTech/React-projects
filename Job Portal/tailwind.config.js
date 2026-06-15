/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c2d57',
        },
        secondary: {
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
      },
    },
  },
  plugins: [],
}
