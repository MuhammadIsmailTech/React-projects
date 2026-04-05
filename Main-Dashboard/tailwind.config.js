module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 50px rgba(34, 197, 94, 0.15)'
      }
    }
  },
  plugins: []
};
