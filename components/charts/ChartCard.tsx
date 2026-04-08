import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  callout?: string
  children: ReactNode
  bare?: boolean
}

export function ChartCard({ title, callout, children, bare = false }: ChartCardProps) {
  if (bare) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minHeight: 0 }}>
        <div className="chart-title" style={{ marginBottom: 12 }}>{title}</div>
        <div style={{ flex: '1 1 0%', minHeight: 0, overflow: 'auto' }}>{children}</div>
        {callout ? (
          <div
            style={{
              borderRadius: 6,
              padding: '8px 12px',
              background: '#F5F4F0',
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              lineHeight: 1.5,
              color: 'var(--text-body)',
              marginTop: 10,
              flexShrink: 0,
            }}
          >
            {callout}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      {children}
      {callout ? <div className="chart-callout">{callout}</div> : null}
    </div>
  )
}
