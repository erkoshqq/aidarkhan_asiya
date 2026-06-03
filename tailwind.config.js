/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        champagne: '#F5EDD8',
        gold: '#C9A96E',
        'gold-light': '#E8D5A3',
        'gold-dark': '#9B7B3E',
        warm: '#EDE0C8',
        ivory: '#FDFBF7',
        'text-deep': '#3D2B1F',
        'text-mid': '#6B4F38',
        'text-soft': '#9B7F65',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Jost', 'sans-serif'],
        fell: ['"IM Fell DW Pica"', 'serif'],
      },
    },
  },
  plugins: [],
}
