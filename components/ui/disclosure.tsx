'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'

interface DisclosureProps {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function Disclosure({ title, defaultOpen = false, children }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const buttonId = `${id}-btn`
  const panelId = `${id}-panel`

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
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
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
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            transition: 'transform 150ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="disclosure-content"
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
