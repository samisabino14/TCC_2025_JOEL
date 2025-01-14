/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilita o dark mode baseado na classe
  content: [
    "./index.html",        // O arquivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
