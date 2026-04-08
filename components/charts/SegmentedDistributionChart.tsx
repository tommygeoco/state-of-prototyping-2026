import type { VibeDistributionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface SegmentedDistributionChartProps {
  title: string
  subtitle?: string
  distribution: VibeDistributionResponse
  callout: string
  bare?: boolean
}

export function SegmentedDistributionChart({ title, subtitle, distribution, callout, bare = false }: SegmentedDistributionChartProps) {
  const maxPct = Math.max(...distribution.data.map((item) => item.pct))

  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
      <div>
        {distribution.data.map((item, index) => (
          <HorizontalBarRow
            key={item.tier}
            label={item.tier}
            pct={item.pct}
            rank={index + 1}
            maxPct={maxPct}
            displayValue={`${item.pct.toFixed(1)}%`}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          paddingTop: 8,
          borderTop: '1px solid var(--border-grid)',
          fontFamily: 'var(--font-data)',
          fontSize: 10,
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
        }}
      >
        State of Prototyping · Spring 2026 · n=1,478
      </div>
    </ChartCard>
  )
}
