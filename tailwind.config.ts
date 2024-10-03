/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#f0f0f0",
        muted: "#e0e0e0",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}