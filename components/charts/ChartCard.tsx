import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  callout?: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, callout, children, className = '' }: ChartCardProps) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-title">{title}</div>
      {children}
      {callout ? <div className="chart-callout">{callout}</div> : null}
    </div>
  )
}
