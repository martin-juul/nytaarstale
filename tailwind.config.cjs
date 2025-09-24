/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          primary: '#8B0F26',
          primaryDark: '#6E0A1F',
          accent: '#C5A46D',
          ink: '#1C2431',
          paper: '#F7F4EF',
        },
      },
    },
  },
  plugins: [],
};
