/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".btn": {
      "background-color": "#001C30",
      cursor: "pointer",
      padding: "8px 12px ",
      "border-radius": "6px",
      color: "#DAFFFB",
    },
    ".btn-out": {
      "border": "2px solid #001C30",
      cursor: "pointer",
      padding: "4px 8px ",
      "border-radius": "6px",
      color: "#001C30",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        mywhite: "#DAFFFB",
        mylight: "#64CCC5",
        mygreen: "#176B87",
        mydark: "#001C30",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
      textColor: ["hover"],
    },
  },
  plugins: [Myclass],
};
