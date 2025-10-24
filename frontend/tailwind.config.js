/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: ['72px', '110%'],
        body: ['18px', '160%'],
      },
      // Tu peux ajouter des couleurs custom ici :
      colors: {
        primary: '#6D28D9',   // Violet
        dark: '#0F172A',      // Fond foncé global
        purple_text: '#C083FC',  // Violet clair
        purple_button: '#9334E9', // Violet bouton
        gray_header: '#191F2D', // Gris foncé pour l'en-tête
        'purple-10': 'rgba(192, 132, 252, 0.1)',
        gray_footer: '#94A3B8', // Gris clair pour le pied de page
      },
      maxWidth: {
        'custom': '1000px',
      },
      boxShadow: {
        'dark': `
          0px 0px 15px rgba(0, 0, 0, 0.07),
          0px 25px 50px -12px rgba(0, 0, 0, 0.25)
        `,
      },
    },
  },
  plugins: [],
}
