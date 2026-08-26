/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B46F6', // Electric Indigo / Purple
          hover: '#4C35E0',
          dark: '#4338CA',
          light: '#EEECFE',
          50: '#F5F3FF',
          100: '#EEECFE',
          200: '#DDD6FE',
          500: '#5B46F6',
          600: '#4C35E0',
          700: '#4338CA',
        },
        secondary: '#F8F9FE',
        surface: '#FFFFFF',
        obsidian: '#5B46F6', // Mapped to primary purple for compatibility
        gold: {
          DEFAULT: '#7C66FF',
          light: '#EEECFE',
          dark: '#4338CA',
        },
        background: '#F8F9FE',
        stone: {
          50: '#F8FAFC',
          100: '#F1F5F9', // Surface & Card background
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569', // Body Text
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A', // Deep Headings
          950: '#090D16',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        subtle: '0 2px 16px rgba(91, 70, 246, 0.04)',
        card: '0 4px 20px rgba(0, 0, 0, 0.04)',
        purple: '0 8px 25px rgba(91, 70, 246, 0.25)',
        luxe: '0 10px 30px rgba(91, 70, 246, 0.08)',
      },
    },
  },
  plugins: [],
};
