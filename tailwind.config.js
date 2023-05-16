const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      secondary: "#3B4F5F",
      base: "#ffffff",
      principal: "#006473",
      transparent: "transparent",
      success: "#68BC00",
      current: "currentColor",
      process: "#fcc400",
      error: "#FF0000",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
  plugins: [],
};
