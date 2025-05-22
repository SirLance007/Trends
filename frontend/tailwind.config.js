/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rabbit-red": "#ea2e0e",
      },
      keyframes: {
        "color-pop": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "60%": { transform: "scale(1.25) rotate(-10deg)" },
          "80%": { transform: "scale(0.95) rotate(5deg)" },
          "100%": { transform: "scale(1.1) rotate(0deg)" },
        },
        "color-wiggle": {
          "0%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "40%": { transform: "rotate(8deg)" },
          "60%": { transform: "rotate(-4deg)" },
          "80%": { transform: "rotate(4deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "color-pop": "color-pop 0.4s cubic-bezier(0.4,0,0.2,1)",
        "color-wiggle": "color-wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
