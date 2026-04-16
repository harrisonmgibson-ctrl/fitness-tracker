/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00AAFF',
          light: '#33BBFF',
          dark: '#0088DD',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          card: '#141414',
        },
      },
    },
  },
  plugins: [],
}

