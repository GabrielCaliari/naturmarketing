/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'heading': ['var(--font-poppins)', 'var(--font-inter)', 'sans-serif'],
        'body': ['var(--font-poppins)', 'sans-serif'],
        'display': ['var(--font-inter)', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          green: '#84936f',
          brown: '#994f2a',
          'brown-light': '#c4a48e',
        },
        bg: {
          warm: '#EDE8E0',
          offwhite: '#F7F3EE',
          surface: '#FDFAF7',
        }
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        'container': '2rem',
      }
    },
  },
  plugins: [],
}