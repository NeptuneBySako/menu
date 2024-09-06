/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        PlayWriteLight:["PlayWriteLight"],
        PlayWriteRegular:["PlayWriteRegular"],
        PlayWriteThin:["PlayWriteThin"],
      }
    },
  },
  plugins: [],
}