/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      /* Animations */
      keyframes: {

        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },

          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

      },

      animation: {

        fadeIn:
          "fadeIn 0.2s ease-out",

      },

      /* Colors */
      colors: {

        primary: "#facc15",

        background: "#f5f5f4",

      },

      /* Border Radius */
      borderRadius: {

        card: "32px",

      },

      /* Box Shadow */
      boxShadow: {

        card:
          "0 10px 30px rgba(0,0,0,0.04)",

      },

    },
  },

  plugins: [],
};