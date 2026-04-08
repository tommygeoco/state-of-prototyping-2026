import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  callout?: string
  children: ReactNode
  bare?: boolean
}

export function ChartCard({ title, subtitle, callout, children, bare = false }: ChartCardProps) {
  const header = (
    <div style={{ marginBottom: 16 }}>
      <div className="chart-title">{title}</div>
      {subtitle ? (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: '18px',
            color: 'var(--text-secondary)',
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  )

  if (bare) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minHeight: 0 }}>
        {header}
        <div style={{ flex: '1 1 0%', minHeight: 0 }}>{children}</div>
        {callout ? (
          <div
            style={{
              borderRadius: 6,
              padding: '8px 12px',
              background: 'var(--bg-callout)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
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
      {header}
      {children}
      {callout ? <div className="chart-callout">{callout}</div> : null}
    </div>
  )
}
