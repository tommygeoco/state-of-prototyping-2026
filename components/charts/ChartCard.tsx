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
      <>
        <div className="chart-title">{title}</div>
        {children}
        {callout ? (
          <div
            style={{
              borderRadius: 6,
              padding: '14px 18px',
              background: 'var(--bg-callout)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text-body)',
              marginTop: 24,
            }}
          >
            {callout}
          </div>
        ) : null}
      </>
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
