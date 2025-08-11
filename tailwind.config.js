/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { opacity: "0", marginLeft: "-100px" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", marginRight: "-100%" },
          "100%": { opacity: "1" },
        },
        bottom: {
          "0%": { opacity: "0", bottom: "-100px" },
          "100%": { opacity: "1", bottom: "0" },
        },
      },

      animation: {
        slide: "slide 0.3s ease-out",
        slideLeft: "slideLeft 0.3s ease-out",
        bottom: "bottom 0.5s",
      },
    },
  },
  plugins: [],
};
