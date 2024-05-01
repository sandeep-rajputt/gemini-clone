/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1100px" },
      // => @media (max-width: 1535px) { ... }

      md: { max: "694px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      maxHeight: {
        "calc-100vh-minus-51px": "calc(100vh - 51px)",
      },
      colors: {
        dark: "#131314",
        "light-dark": "#19191a",
        "light-dark-2": "#1E1F20",
        "light-dark-3": "#292a2c",
        "light-dark-4": "#313334",
        primary: "#d0d0d0",
        secondary: "#89898a",
        third: "#696969",
      },
      animation: { loader: "loader 3s infinite linear" },
      keyframes: {
        loader: {
          "0%": {
            backgroundPosition: "-800px 0px",
          },
          "100%": {
            backgroundPosition: "800px 0px",
          },
        },
      },
    },
  },
  plugins: [],
};
