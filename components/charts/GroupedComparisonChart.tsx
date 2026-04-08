import type { OutlookDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'

interface GroupedComparisonChartProps {
  items: OutlookDatum[]
  callout: string
}

const metrics = [
  { key: 'more_valuable', label: 'More valuable', color: 'var(--accent)' },
  { key: 'less_secure', label: 'Less secure', color: 'var(--bar-2)' },
  { key: 'about_same', label: 'About same', color: 'var(--bar-5)' },
] as const

export function GroupedComparisonChart({ items, callout }: GroupedComparisonChartProps) {
  return (
    <ChartCard title="Role Outlook By Role" callout={callout}>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.role} className="rounded-md border border-grid bg-[var(--bg-card-inner)] p-5">
            <div className="mb-4 font-display text-sm uppercase tracking-[0.12em] text-text-primary">{item.role}</div>
            <div className="space-y-3">
              {metrics.map((metric) => {
                const value = item[metric.key]
                return (
                  <div key={metric.key}>
                    <div className="mb-1 flex items-center justify-between text-sm text-text-body">
                      <span>{metric.label}</span>
                      <span className="font-data">{value.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[var(--bg-callout)]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${value}%`, backgroundColor: metric.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
