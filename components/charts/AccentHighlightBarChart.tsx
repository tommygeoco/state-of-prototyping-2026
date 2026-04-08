import type { ToolDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AccentHighlightBarChartProps {
  items: ToolDatum[]
  callout: string
}

export function AccentHighlightBarChart({ items, callout }: AccentHighlightBarChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title="Top 10 Weekly Tools" callout={callout}>
      <div>
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
      </div>
    </ChartCard>
  )
}
