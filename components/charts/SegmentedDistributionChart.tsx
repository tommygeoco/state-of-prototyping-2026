import type { VibeDistributionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'

interface SegmentedDistributionChartProps {
  distribution: VibeDistributionResponse
  callout: string
}

const colors = [
  'var(--bar-1)',
  'var(--bar-2)',
  'var(--bar-3)',
  'var(--bar-4)',
  'var(--bar-5)',
]

export function SegmentedDistributionChart({ distribution, callout }: SegmentedDistributionChartProps) {
  return (
    <ChartCard title="Vibe Coding Distribution" callout={callout}>
      <div>
        <div className="flex h-12 overflow-hidden rounded-md border border-grid">
          {distribution.data.map((item, index) => (
            <div
              key={item.tier}
              className="flex items-center justify-center px-2 text-center font-data text-[14px] font-medium text-white"
              style={{
                width: `${item.pct}%`,
                backgroundColor: colors[index] ?? 'var(--bar-secondary)',
              }}
            >
              {item.pct >= 12 ? `${item.pct.toFixed(1)}%` : ''}
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {distribution.data.map((item, index) => (
            <div key={item.tier} className="flex items-center gap-3 rounded-md bg-[var(--bg-card-inner)] px-4 py-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] ?? 'var(--bar-secondary)' }} />
              <div className="text-sm text-text-body">
                <span className="font-medium text-text-primary">{item.tier}</span> · {item.pct.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}
