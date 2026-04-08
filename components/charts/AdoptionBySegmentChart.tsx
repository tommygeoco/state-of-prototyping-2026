import type { VibeByRoleDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AdoptionBySegmentChartProps {
  items: VibeByRoleDatum[]
  callout: string
}

export function AdoptionBySegmentChart({ items, callout }: AdoptionBySegmentChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title="Vibe Coding 50%+ By Role" callout={callout}>
      <div>
        {items.map((item, index) => (
          <div key={item.role}>
            <HorizontalBarRow
              label={item.role}
              pct={item.pct}
              rank={index + 1}
              maxPct={maxPct}
              displayValue={`${item.pct.toFixed(1)}%`}
            />
            {item.note ? <p className="mb-2 ml-[185px] text-sm text-text-secondary">{item.note}</p> : null}
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
