import type { SatisfactionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface DualAxisChartProps {
  title: string
  subtitle?: string
  satisfaction: SatisfactionResponse
  bare?: boolean
}

export function DualAxisChart({ title, subtitle, satisfaction, bare = false }: DualAxisChartProps) {
  const maxMean = 10
  const reversed = [...satisfaction.data].reverse()

  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
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
      </div>
    </ChartCard>
  )
}
