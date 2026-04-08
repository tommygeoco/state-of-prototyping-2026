import type { VibeByRoleDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AdoptionBySegmentChartProps {
  title: string
  subtitle?: string
  items: VibeByRoleDatum[]
  bare?: boolean
}

export function AdoptionBySegmentChart({ title, subtitle, items, bare = false }: AdoptionBySegmentChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
        {items.map((item, index) => (
          <HorizontalBarRow
            key={item.role}
            label={item.role}
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
