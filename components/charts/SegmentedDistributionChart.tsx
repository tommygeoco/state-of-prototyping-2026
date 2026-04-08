import type { VibeDistributionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface SegmentedDistributionChartProps {
  title: string
  subtitle?: string
  distribution: VibeDistributionResponse
  bare?: boolean
}

export function SegmentedDistributionChart({ title, subtitle, distribution, bare = false }: SegmentedDistributionChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
        {distribution.data.map((item, index) => (
          <HorizontalBarRow
            key={item.tier}
            label={item.tier}
            pct={item.pct}
            rank={index + 1}
            displayValue={`${item.pct.toFixed(1)}%`}
            accentWinner
          />
        ))}
      </div>
    </ChartCard>
  )
}
