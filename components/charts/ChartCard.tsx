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
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%' }}>
        <div className="chart-title" style={{ marginBottom: 16 }}>{title}</div>
        <div style={{ flex: '1 1 0%' }}>{children}</div>
        {callout ? (
          <div
            style={{
              borderRadius: 6,
              padding: '10px 14px',
              background: 'var(--bg-callout)',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              lineHeight: 1.5,
              color: 'var(--text-body)',
              marginTop: 12,
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
