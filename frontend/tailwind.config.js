
module.exports = {
  content: [
    "./index.html",
    "./src*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#60A5FA',
        accent: '#FB923C',
        background: '#F9FAFB',
        text: '#1F2937',
        subtleText: '#6B7280',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },

      
      keyframes: {
        'cart-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'cart-pop': 'cart-pop 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}
