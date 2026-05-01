/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── 80s core palette ────────────────────────────────────────────
        pink80: {
          DEFAULT: '#E91E63',
          dark:    '#C2185B',
          deeper:  '#880E4F',
          light:   '#F48FB1',
          bg:      '#FCE4EC',
        },
        cyan80: {
          DEFAULT: '#00BCD4',
          dark:    '#0097A7',
          deeper:  '#006064',
          light:   '#80DEEA',
          bg:      '#E0F7FA',
        },
        gold80: {
          DEFAULT: '#FFD740',
          dark:    '#FFA000',
          deeper:  '#E65100',
          light:   '#FFF9C4',
        },
        dark80: {
          DEFAULT: '#1A0A2E',
          mid:     '#3D1C6E',
          light:   '#6A1B9A',
        },
        paper: {
          DEFAULT: '#FFF5E6',
          dark:    '#FFE8C8',
          darker:  '#FFCC88',
        },
        // ── Relationship accent colors ──────────────────────────────────
        rel: {
          familia: '#E91E63',
          amigo:   '#00BCD4',
          pareja:  '#FFD740',
          trabajo: '#6A1B9A',
          otro:    '#607D8B',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Arial Black"', 'Impact', 'sans-serif'],
        sans:    ['"Raleway"', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'retro':       '4px 4px 0px #1A0A2E',
        'retro-sm':    '3px 3px 0px #1A0A2E',
        'retro-lg':    '6px 6px 0px #1A0A2E',
        'retro-pink':  '4px 4px 0px #880E4F',
        'retro-cyan':  '4px 4px 0px #006064',
        'retro-gold':  '4px 4px 0px #E65100',
        'neon-pink':   '0 0 8px #E91E63, 0 0 20px #E91E6350',
        'neon-cyan':   '0 0 8px #00BCD4, 0 0 20px #00BCD450',
        'neon-gold':   '0 0 8px #FFD740, 0 0 16px #FFD74050',
        'inset-retro': 'inset 3px 3px 0px rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'grid80': 'linear-gradient(rgba(26,10,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,10,46,0.06) 1px, transparent 1px)',
        'stripe80': 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(26,10,46,0.04) 6px, rgba(26,10,46,0.04) 12px)',
        'gradient80': 'linear-gradient(135deg, #E91E63 0%, #9C27B0 50%, #1A0A2E 100%)',
        'header80': 'linear-gradient(135deg, #1A0A2E 0%, #3D1C6E 60%, #1A0A2E 100%)',
      },
      backgroundSize: {
        'grid-24': '24px 24px',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-in':   'slide-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 8px #E91E63, 0 0 20px #E91E6350' },
          '50%':       { boxShadow: '0 0 16px #E91E63, 0 0 32px #E91E6370' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
