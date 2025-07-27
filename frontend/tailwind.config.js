/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        head:["head"],
        logo:["logo"],
        hero:["hero"]
      }
    },
  },
  plugins: [],
}

