import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        card: 'var(--bg-card)',
        callout: 'var(--bg-callout)',
        border: 'var(--border-card)',
        grid: 'var(--border-grid)',
        text: {
          primary: 'var(--text-primary)',
          body: 'var(--text-body)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--text-accent)',
        },
        accent: 'var(--accent)',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        data: ['var(--font-data)'],
      },
      maxWidth: {
        content: 'var(--content-width)',
        page: 'var(--page-width)',
      },
    },
  },
  plugins: [],
}

export default config
