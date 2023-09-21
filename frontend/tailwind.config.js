/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'mywhite':"#EFFFFD",
        "mylight":"#B8FFF9",
        "myblue":"#85F4FF",
        "mydark":"#42C2FF",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'], 
      textColor: ['hover'], 
    },
  },
  plugins: [],
}

