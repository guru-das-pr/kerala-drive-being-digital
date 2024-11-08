/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        drive: 'drive 1s ease-in-out infinite',
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(-70%)' },
          '100%': { transform: 'translateX(70%)' },
        },
      },
    },
  },
  plugins: [],
}