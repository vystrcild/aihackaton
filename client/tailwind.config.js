/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgblack: "#1F1F1F",
        bglight: "#969593",
        primary: "#F045FF",
        olive: "#F2D43D",
      },
      fontFamily: {
        vietnam: ["IBM Plex Mono", "sans-serif"]},
    },
  },
  plugins: [],
}
