/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#111111',
        surface: '#1C1C1E',
        'surface-raised': '#2C2C2E',
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
        secondary: '#F43F8E',
        accent: '#FACC15',
        success: '#A3E635',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-muted': '#636366',
        border: '#3A3A3C',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};
