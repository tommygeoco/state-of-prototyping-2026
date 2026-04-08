import type { VibeByRoleDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AdoptionBySegmentChartProps {
  title: string
  subtitle?: string
  items: VibeByRoleDatum[]
  callout: string
  bare?: boolean
}

export function AdoptionBySegmentChart({ title, subtitle, items, callout, bare = false }: AdoptionBySegmentChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
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
      <div
        style={{
          marginTop: 12,
          paddingTop: 8,
          borderTop: '1px solid var(--border-grid)',
          fontFamily: 'var(--font-data)',
          fontSize: 14,
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
        }}
      >
        State of Prototyping · Spring 2026 · n=1,478
      </div>
    </ChartCard>
  )
}
