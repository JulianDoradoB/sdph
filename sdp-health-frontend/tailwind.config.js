/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        sdp: {
          'bg-deep':     '#080d14',
          'bg-surface':  '#0d1520',
          'bg-card':     '#111b28',
          'bg-elevated': '#162030',
          'border-dim':  '#1e2f42',
          'border-mid':  '#243547',
          'border-glow': '#2a4566',
          'cyan':        '#00c8e0',
          'blue':        '#1a78ff',
          'teal':        '#00e5b0',
          'text':        '#e8f0f8',
          'muted':       '#6b8299',
          'dim':         '#3d5570',
          'red':         '#ff3b3b',
          'orange':      '#ff7a1a',
          'yellow':      '#f5c518',
          'green':       '#00c97a',
        },
      },
      animation: {
        'heartbeat':   'heartbeat 2s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
        'spin-slow':   'rotate-slow 8s linear infinite',
        'fade-up':     'fadeInUp 0.5s ease forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
        'slide-right': 'slide-in-right 0.4s ease forwards',
        'ecg':         'ecg-draw 3s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%':      { transform: 'scale(1.08)' },
          '28%':      { transform: 'scale(1)' },
          '42%':      { transform: 'scale(1.05)' },
          '70%':      { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};