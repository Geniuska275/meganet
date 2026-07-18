/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        green: "#007518",
        "green-dark": "#003d0c",
        gold: "#ffba00",
        cream: "#fcfbfe",
      },
    },
  },
  plugins: [],
};
