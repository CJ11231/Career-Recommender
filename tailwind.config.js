/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'inter': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#f0f1fe',
          100: '#e2e3fc',
          200: '#c5c7f9',
          300: '#a7aaf6',
          400: '#8a8df3',
          500: '#6c70f0',
          600: '#4f46e5', // Main brand color
          700: '#4338ca',
          800: '#372fa8',
          900: '#2c2786',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
} 