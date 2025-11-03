import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          card: '#111111',
          subtle: '#1a1a1a'
        },
        brand: {
          gold: '#facc15',
          amber: '#f59e0b',
          accent: '#fde68a'
        }
      },
      fontFamily: {
        // wired to next/font variables in layout.tsx
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif']
      },
      boxShadow: {
        'glow-gold': '0 0 40px rgba(250,204,21,.4)'
      }
    }
  }
} satisfies Config
