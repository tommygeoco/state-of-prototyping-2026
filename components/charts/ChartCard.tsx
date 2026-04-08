import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  bare?: boolean
}

export function ChartCard({ title, subtitle, children, bare = false }: ChartCardProps) {
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
      </div>
    )
  }

  return (
    <div className="chart-card">
      {header}
      {children}
    </div>
  )
}
