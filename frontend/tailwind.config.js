/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './app/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        text: '#0c1810',
        background: '#f4faf6',
        primary: '#47c168',
        primary_hover: '#7BD593',
        secondary: '#98CFBC',
        secondary_hover: '#AEE1CF',
        accent: '#FFDC00',
        accent_hover: '#FFE859',
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
