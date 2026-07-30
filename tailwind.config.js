/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#1B6CA8', dark: '#145285' },
        accent:    { DEFAULT: '#E8A020', dark: '#C8871A' },
        brand: {
          dark:    '#1A1A2E',
          text:    '#4A4A6A',
          muted:   '#8A8AAA',
          surface: '#F7F8FC',
          border:  '#E2E4EE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1840px',
      },
    },
  },
  plugins: [],
}
