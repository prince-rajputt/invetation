/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury Hindu wedding palette
        ivory: {
          DEFAULT: '#FBF6EC',
          50: '#FDFBF6',
          100: '#FBF6EC',
          200: '#F4EAD6',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E7C878',
          deep: '#A67C28',
          soft: '#D9B978',
        },
        blush: {
          DEFAULT: '#E5A6A6',
          light: '#F3D2CE',
          deep: '#C9757C',
        },
        maroon: {
          DEFAULT: '#7C2B33',
          deep: '#5C1D24',
        },
        royal: {
          DEFAULT: '#25406B',
          deep: '#1B2E4E',
        },
        sage: {
          DEFAULT: '#7C8C6A',
          deep: '#5C6B4C',
        },
        ink: '#3A2A22',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Mukta"', '"Poppins"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      boxShadow: {
        gold: '0 10px 40px -12px rgba(201,162,75,0.45)',
        soft: '0 20px 60px -20px rgba(58,42,34,0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s ease forwards',
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
        shimmer: 'shimmer 4s linear infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
