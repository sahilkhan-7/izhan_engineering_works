/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        },
        colors: {
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12'
          }
        },
        animation: {
          'slide': 'slide-left 40s linear infinite'
        },
        keyframes: {
          'slide-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' }
          }
        }
      }
    },
    plugins: []
  };
  