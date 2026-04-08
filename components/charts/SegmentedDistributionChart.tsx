import type { VibeDistributionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface SegmentedDistributionChartProps {
  title: string
  distribution: VibeDistributionResponse
  callout: string
}

export function SegmentedDistributionChart({ title, distribution, callout }: SegmentedDistributionChartProps) {
  const maxPct = Math.max(...distribution.data.map((item) => item.pct))

  return (
    <ChartCard title={title} callout={callout}>
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
    </ChartCard>
  )
}
