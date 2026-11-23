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
        dark: {
          bg: '#070B14',
          card: '#0D1424',
          surface: '#131D33',
          border: 'rgba(255, 255, 255, 0.08)',
          muted: '#8A99AD',
        },
        neon: {
          teal: '#00E5BE',
          cyan: '#00F0FF',
          coral: '#FF647C',
          amber: '#FFB800',
          purple: '#A855F7',
          emerald: '#10B981',
        },
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
          950: '#070B14',
        },
        bloom: {
          remember: {
            light: 'rgba(100, 116, 139, 0.15)',
            badge: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
            text: '#94a3b8',
            border: '#475569',
            accent: '#64748b',
          },
          understand: {
            light: 'rgba(2, 132, 199, 0.15)',
            badge: 'bg-sky-950/80 text-sky-300 border-sky-800/80',
            text: '#38bdf8',
            border: '#0284c7',
            accent: '#00F0FF',
          },
          apply: {
            light: 'rgba(16, 185, 129, 0.15)',
            badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
            text: '#34d399',
            border: '#059669',
            accent: '#00E5BE',
          },
          analyze: {
            light: 'rgba(245, 158, 11, 0.15)',
            badge: 'bg-amber-950/80 text-amber-300 border-amber-800/80',
            text: '#fbbf24',
            border: '#d97706',
            accent: '#FFB800',
          },
          evaluate: {
            light: 'rgba(168, 85, 247, 0.15)',
            badge: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
            text: '#c084fc',
            border: '#7c3aed',
            accent: '#A855F7',
          },
          create: {
            light: 'rgba(244, 63, 94, 0.15)',
            badge: 'bg-rose-950/80 text-rose-300 border-rose-800/80',
            text: '#fb7185',
            border: '#e11d48',
            accent: '#FF647C',
          },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
        'glow-teal': '0 0 25px -4px rgba(0, 229, 190, 0.45)',
        'glow-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.45)',
        'glow-coral': '0 0 25px -4px rgba(255, 100, 124, 0.45)',
        'glow-amber': '0 0 25px -4px rgba(255, 184, 0, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
