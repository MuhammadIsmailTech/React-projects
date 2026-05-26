module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./src/**/*.{js,jsx}", "./**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#7C3AED',
          pink: '#FF4DAB',
          cyan: '#00F0FF'
        }
      },
      boxShadow: {
        glow: '0 8px 30px rgba(124,58,237,0.25)'
      }
    },
  },
  plugins: [],
};