import type { SatisfactionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface DualAxisChartProps {
  title: string
  satisfaction: SatisfactionResponse
  callout: string
}

export function DualAxisChart({ title, satisfaction, callout }: DualAxisChartProps) {
  const maxMean = Math.max(...satisfaction.data.map((item) => item.mean))
  const reversed = [...satisfaction.data].reverse()

  return (
    <ChartCard title={title} callout={callout}>
      {reversed.map((item, index) => (
        <HorizontalBarRow
          key={item.tier}
          label={item.tier}
          pct={item.mean}
          rank={index + 1}
          maxPct={maxMean}
          displayValue={`${item.mean.toFixed(1)} / 10`}
          accentWinner
        />
      ))}
    </ChartCard>
  )
}
