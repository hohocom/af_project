// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "apple-hard": ["apple-h"],
        "apple-bold": ["apple-b"],
        "apple-light": ["apple-l"],
        "apple-regular": ["apple-r"],
        "apple-tiny": ["apple-t"],
        "apple-sb": ["apple-sb"],
        "gong-bold": ["gong-bold"],
        "gong-light": ["gong-light"],
        "gong-medium": ["gong-medium"],
        "noto-light": ["noto-light"],
        "noto-regular": ["noto-regular"],
        "noto-bold": ["noto-bold"],
      },
    },
  },
  variants: {},
  plugins: [],
};
