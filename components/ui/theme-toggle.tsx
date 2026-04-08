'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'system' | 'dark'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

const icons: Record<Theme, string> = {
  dark: '☽',
  system: '◻',
  light: '☀',
}

const order: Theme[] = ['dark', 'system', 'light']

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial = stored ?? 'system'
    setTheme(initial)
    applyTheme(initial)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if ((localStorage.getItem('theme') ?? 'system') === 'system') {
        applyTheme('system')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function select(t: Theme) {
    setTheme(t)
    localStorage.setItem('theme', t)
    applyTheme(t)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {order.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => select(t)}
          aria-label={`${t} mode${theme === t ? ' (active)' : ''}`}
          style={{
            fontSize: 15,
            lineHeight: 1,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            background: theme === t ? 'var(--bg-callout)' : 'transparent',
            color: theme === t ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'background 150ms, color 150ms',
          }}
        >
          {icons[t]}
        </button>
      ))}
    </div>
  )
}
