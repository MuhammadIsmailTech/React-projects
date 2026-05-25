export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 60px rgba(0,0,0,0.16)',
        soft: '0 12px 30px rgba(50,60,90,0.12)'
      },
      colors: {
        surface: '#0b1220',
        surface2: '#111a2f',
        brand: '#5b7dff',
        neon: '#57f3ff'
      }
    }
  },
  plugins: []
};
