// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'apple-hard': ['apple-h'],
        'apple-bold': ['apple-b'],
        'apple-light': ['apple-l'],
        'apple-regular': ['apple-r'],
        'apple-tiny': ['apple-t'],
      },
    },
  },
  variants: {},
  plugins: [],
}
