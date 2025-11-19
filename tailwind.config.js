import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: "Arial, Helvetica, sans-serif",
    },
    fontSize: {
      base: ["1rem", "1.5rem"],
    },
    colors: {
      primary: "#444444",
      white: "#ffffff",
      black: "#000000",
      charcoal: "#444444",
      transparent: "transparent",
    },
    container: {
      padding: "1.5rem",
      center: true,
    },
    backgroundImage: {
     
    },

    extend: {},
  },
  plugins: [typography],
}

export default config
