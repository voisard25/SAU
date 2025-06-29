/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          primary: '#0D6EFD',
          hover: '#0b5ed7'
        },
        empresa: {
          primary: '#198754',
          hover: '#157347'
        },
        estudiante: {
          primary: '#FD7E14',
          hover: '#D96A0D'
        }
      }
    },
  },
  plugins: [],
}