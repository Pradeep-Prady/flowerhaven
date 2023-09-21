/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'mywhite':"#DAFFFB",
        "mylight":"#64CCC5",
        "mygreen":"#176B87",
        "mydark":"#001C30",
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

