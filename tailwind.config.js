/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0066EE',
          light: '#3385F0',
          dark: '#0052BE',
        },
        surface: {
          DEFAULT: '#F4F4F4',
          card: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

