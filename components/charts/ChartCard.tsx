import type { ReactNode } from 'react'

type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  bare?: boolean
  headingLevel?: HeadingLevel
  titleId?: string
}

export function ChartCard({ title, subtitle, children, bare = false, headingLevel = 'h3', titleId }: ChartCardProps) {
  const Heading = headingLevel
  const header = (
    <div style={{ marginBottom: 16 }}>
      <Heading id={titleId} className="chart-title">{title}</Heading>
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
