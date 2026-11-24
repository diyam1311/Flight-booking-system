/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      keyframes: {
        fly: { '0%, 100%': { transform: 'translateX(-14px)' }, '50%': { transform: 'translateX(14px)' } }, // plane of the processing popup
        radar: { '0%': { transform: 'scale(0.3)', opacity: '0.8' }, '100%': { transform: 'scale(1)', opacity: '0' } }, // rings of the booking-confirmed popup
      },
      animation: { fly: 'fly 2s ease-in-out infinite', radar: 'radar 2s ease-out infinite' },
      colors: {
        brand: '#E8580D', // orange
        navy: '#013172',  // Search Flights button, headings
        page: '#EEF5FF',  // page background
      },
    },
  },
}
