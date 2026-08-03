import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['Zodiak', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'primary-blue': '#1B2441',
        'primary-red': '#E30016',
        'dark-blue': '#101524',
        'dark-gray': '#6B7183',
        'light-blue': '#144CD9',
        'whitebg': '#F8F8F9',
        'redbg': '#F1EAEB',
        // deprecated duplicate of light-blue — kept for legacy usages, removed in Phase 2
        'pure-blue': '#144CD9',
        'cardbg': '#F4F4F4',
        // extended accent
        'red-soft': '#F76B79',
        'red-softer': '#F1A9B0',
        cream: '#F4F1EC',
        // status
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#144CD9',
        // shadcn semantic layer (vars defined in globals.css)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontSize: {
        h1: ['42px', { lineHeight: '110%' }],
        h2: ['34px', { lineHeight: '120%' }],
        h3: ['30px', { lineHeight: '120%' }],
        h4: ['28px', { lineHeight: '120%' }],
        h5: ['24px', { lineHeight: '120%' }],
        h6: ['20px', { lineHeight: '120%' }],
        b18: ['18px', { lineHeight: '150%' }],
        b16: ['16px', { lineHeight: '150%' }],
        b14: ['14px', { lineHeight: '150%' }],
        b12: ['12px', { lineHeight: '150%' }],
        h1M: ['32px', { lineHeight: '110%' }],
        h2M: ['28px', { lineHeight: '120%' }],
        h3M: ['24px', { lineHeight: '120%' }],
        h4M: ['22px', { lineHeight: '120%' }],
        h5M: ['20px', { lineHeight: '120%' }],
        h6M: ['18px', { lineHeight: '120%' }],
        label: ['11px', { lineHeight: '150%' }],
      },
      letterSpacing: {
        display: '-0.0032em',
        kicker: '0.12em',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(27,36,65,0.06)',
        e2: '0 12px 32px rgba(27,36,65,0.12)',
        e3: '0 10px 40px -15px rgba(27,36,65,0.25)',
      },
      zIndex: {
        sticky: '30',
        header: '40',
        overlay: '50',
        drawer: '60',
        modal: '70',
        max: '80',
      },
      aspectRatio: {
        card: '3 / 2',
      },
    },
  },
}

export default config
