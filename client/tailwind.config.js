/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orang: "#ff8a00",
        green: "#449626",
        lBlue: "#12b6e8",
        dBlue: "#2a41e8",
        lRead: "#dc3139",
        menuBg: "#2a2a2a",
        menu: "rgba(3, 2, 1, 0)",
        menuBorder: "rgba(255, 255, 255, 0.1)",
      },

      keyframes: {
        dropDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      screens: {
        lg: "1042px",
      },

      backgroundImage: {
        banner:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('../public/images/banner.jpg')",
        jobBg:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('../public/images/section.jpg')",
        subscribe:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../public/images/office.jpg')",
        cardBg:
          "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)),url('../public/images/line.jpg')",
        foot: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)),url('../public/images/foot.png')",
        profileBg:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url('../public/images/page-title.jpg')",
      },

      gridTemplateColumns: {
        cart: "repeat(auto-fit, minmax(250px, 1fr))",
      },

      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};
