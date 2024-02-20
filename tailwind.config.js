/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  backgroundImage: {
      
        'demo': "url('/blip.jpg')",

    },},
  },
  plugins: [],
}

