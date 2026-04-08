import type { ToolDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AccentHighlightBarChartProps {
  title: string
  items: ToolDatum[]
  callout: string
  bare?: boolean
}

export function AccentHighlightBarChart({ title, items, callout, bare = false }: AccentHighlightBarChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
      {items.map((item, index) => (
        <HorizontalBarRow
          key={item.tool}
          label={item.tool}
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
