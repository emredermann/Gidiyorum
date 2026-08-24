/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F1012', // Obsidian Black
        secondary: '#F9F8F6', // Warm Stone & Sand
        surface: '#FFFFFF', // Clean White Surface
        stone: {
          50: '#FAF9F6',
          100: '#F2F0EB', // Surface & Card background
          200: '#E6E4DE',
          300: '#D5D2C9',
          400: '#A8A498',
          500: '#787468',
          600: '#555555', // Body Text
          700: '#333333',
          800: '#1A1A1A',
          900: '#111111', // Deep Charcoal Headings
        },
        gold: {
          DEFAULT: '#C5A880', // Champagne Muted Gold
          light: '#DFCBAD',
          dark: '#9E825C',
        },
        obsidian: '#0F1012',
        background: '#F9F8F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderWidth: {
        hairline: '0.5px',
      },
      boxShadow: {
        subtle: '0 2px 16px rgba(0, 0, 0, 0.03)',
        luxe: '0 8px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
