import type { ToolDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AccentHighlightBarChartProps {
  title: string
  subtitle?: string
  items: ToolDatum[]
  callout: string
  bare?: boolean
}

export function AccentHighlightBarChart({ title, subtitle, items, callout, bare = false }: AccentHighlightBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
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
      <div
        style={{
          marginTop: 12,
          paddingTop: 8,
          borderTop: '1px solid #EDEBE7',
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
