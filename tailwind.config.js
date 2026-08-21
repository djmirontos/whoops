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
        background: '#0D0D10',
        surface: '#1A1A24',
        'surface-raised': '#22222F',
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
        secondary: '#F43F8E',
        accent: '#FACC15',
        success: '#A3E635',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-muted': '#52525B',
        border: '#2D2D3D',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};
