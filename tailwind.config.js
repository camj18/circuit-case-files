/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#f59e0b',
        accent: '#10b981',
      },
    },
  },
  plugins: [],
}
