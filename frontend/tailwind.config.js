/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#60A5FA',      // Blue (cool, friendly)
          accent: '#FB923C',       // Orange (food vibe)
          background: '#F9FAFB',   // Light gray (clean bg)
          text: '#1F2937',         // Strong gray for text
          subtleText: '#6B7280',   // Soft gray
          danger: '#EF4444',       // Red for errors/warnings
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
      },
    },
    plugins: [],
  }
  