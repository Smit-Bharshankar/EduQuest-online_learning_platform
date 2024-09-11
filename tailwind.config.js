/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins : ['Poppins' , 'sans-serif'] ,
        sedan : ['Sedan' , 'sans-serif'],
        Serena : ['serena' , 'sans-serif'],
        Ubuntu : ['ubuntu' , 'sans-serif']
      } ,
    },
  },
  plugins: [],
}