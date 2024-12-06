/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
     mobile: { max:'767px'},
     tablet: { max:'1024px', min:'767px' },
     desktopLg: { min: '1024px'}
    },
    extend: {
      fontFamily: {
        sans: ['Poppins','sans-serif'],
      },
    },
  },
  plugins: [],
}

