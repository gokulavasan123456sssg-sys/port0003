/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0d0d11',
          light: '#16161d',
          border: '#22222a',
        },
        cinema: {
          red: '#e50914',
          crimson: '#b30006',
          orange: '#ff5500',
          amber: '#ff8400',
          glow: 'rgba(229, 9, 20, 0.45)',
        },
      },
      fontFamily: {
        display: ['Anton', 'Oswald', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'cinema-radial': 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.15) 0%, rgba(5, 5, 5, 0.95) 70%)',
        'cinema-glow': 'radial-gradient(ellipse at bottom, rgba(229, 9, 20, 0.25) 0%, rgba(5, 5, 5, 0) 70%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
