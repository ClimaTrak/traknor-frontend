/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#002d2b' },
        secondary: { 100: '#00fff4', 500: '#00968f' },
      },
    },
  },
  plugins: [],
};

