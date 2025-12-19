/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        powerball: {
          primary: '#E11D48',
          secondary: '#1E293B',
        },
      },
    },
  },
  plugins: [],
};
