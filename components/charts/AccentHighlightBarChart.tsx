import type { ToolDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AccentHighlightBarChartProps {
  title: string
  subtitle?: string
  items: ToolDatum[]
  bare?: boolean
}

export function AccentHighlightBarChart({ title, subtitle, items, bare = false }: AccentHighlightBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
        {items.map((item, index) => (
          <HorizontalBarRow
            key={item.tool}
            label={item.tool}
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
