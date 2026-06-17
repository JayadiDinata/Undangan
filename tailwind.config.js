/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        champagne: '#D4AF37',
        cream: '#E8D9C4',
        green: {
          dark: '#0d2818',
          warm: '#1a3c2a',
          light: '#E8D9C4',
        },
      },
      fontFamily: {
        title: ['"Meow Script"', 'cursive'],
        content: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        arabic: ['"Traditional Arabic"', '"Scheherazade New"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
