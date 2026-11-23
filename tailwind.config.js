/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        bloom: {
          remember: {
            light: '#f1f5f9',
            badge: '#e2e8f0',
            text: '#334155',
            border: '#94a3b8',
            accent: '#64748b',
          },
          understand: {
            light: '#f0f9ff',
            badge: '#e0f2fe',
            text: '#0369a1',
            border: '#7dd3fc',
            accent: '#0284c7',
          },
          apply: {
            light: '#f0fdf4',
            badge: '#dcfce7',
            text: '#15803d',
            border: '#86efac',
            accent: '#16a34a',
          },
          analyze: {
            light: '#fffbeb',
            badge: '#fef3c7',
            text: '#b45309',
            border: '#fcd34d',
            accent: '#d97706',
          },
          evaluate: {
            light: '#faf5ff',
            badge: '#f3e8ff',
            text: '#6d28d9',
            border: '#d8b4fe',
            accent: '#7c3aed',
          },
          create: {
            light: '#fff1f2',
            badge: '#ffe4e6',
            text: '#be123c',
            border: '#fda4af',
            accent: '#e11d48',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
