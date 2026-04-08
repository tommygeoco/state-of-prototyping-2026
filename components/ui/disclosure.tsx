'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

interface DisclosureProps {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function Disclosure({ title, defaultOpen = false, children }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        border: '1px solid var(--border-card)',
        borderRadius: 8,
        background: 'var(--bg-card)',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 12,
            color: 'var(--text-secondary)',
            transition: 'transform 150ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>
      {open ? (
        <div style={{ padding: '0 20px 16px 20px', borderTop: '1px solid var(--border-grid)' }}>
          <div style={{ paddingTop: 16 }}>{children}</div>
        </div>
      ) : null}
    </div>
  )
}
