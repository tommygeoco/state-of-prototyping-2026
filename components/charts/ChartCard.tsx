import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  callout?: string
  children: ReactNode
  hero?: boolean
  className?: string
}

export function ChartCard({ title, callout, children, hero = false, className = '' }: ChartCardProps) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="chart-title">{title}</div>
      <div style={{ padding: hero ? '0 0 8px 0' : 0 }}>{children}</div>
      {callout ? <div className="chart-callout">{callout}</div> : null}
    </section>
  )
}
