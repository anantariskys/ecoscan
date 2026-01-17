/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2ecc70",
        "primary-dark": "#27ae60",
        "background-light": "#f6f8f7",
        "background-dark": "#131f18",
        "surface-light": "#ffffff",
        "surface-dark": "#1e2b24",
      },
    },
  },
  plugins: [],
};
