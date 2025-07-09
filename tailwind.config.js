/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      brand: {
        DEFAULT: '#002d2b',
        secondary: '#00968f',
        accent: '#00fff4',
      },
    },
    extend: {},
  },
  plugins: [],
};
