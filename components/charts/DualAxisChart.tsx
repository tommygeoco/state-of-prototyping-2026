import type { SatisfactionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface DualAxisChartProps {
  title: string
  satisfaction: SatisfactionResponse
  callout: string
  bare?: boolean
}

export function DualAxisChart({ title, satisfaction, callout, bare = false }: DualAxisChartProps) {
  const maxMean = 10
  const reversed = [...satisfaction.data].reverse()

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
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
      <div
        style={{
          marginTop: 12,
          paddingTop: 8,
          borderTop: '1px solid var(--border-grid)',
          fontFamily: 'var(--font-data)',
          fontSize: 10,
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
        }}
      >
        n=1,477 · Mean satisfaction score (1–10 scale)
      </div>
    </ChartCard>
  )
}
