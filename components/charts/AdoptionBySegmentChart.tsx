import type { VibeByRoleDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AdoptionBySegmentChartProps {
  title: string
  items: VibeByRoleDatum[]
  callout: string
  bare?: boolean
}

export function AdoptionBySegmentChart({ title, items, callout, bare = false }: AdoptionBySegmentChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
      {items.map((item, index) => (
        <HorizontalBarRow
          key={item.role}
          label={item.role}
          pct={item.pct}
          rank={index + 1}
          maxPct={maxPct}
          displayValue={`${item.pct.toFixed(1)}%`}
          accentWinner
        />
      ))}
    </ChartCard>
  )
}
