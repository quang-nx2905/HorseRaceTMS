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

        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },

          "100%": {
            backgroundPosition: "1000px 0",
          },
        },

      },

      animation: {

        fadeIn:
          "fadeIn 0.2s ease-out",

        shimmer:
          "shimmer 2s linear infinite",

      },

      colors: {

        primary: "#facc15",

        background: "#f5f5f4",

      },

      borderRadius: {

        card: "32px",

      },

      boxShadow: {

        card:
          "0 10px 30px rgba(0,0,0,0.04)",

      },

    },
  },

  plugins: [],
};