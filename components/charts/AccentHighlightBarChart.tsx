'use client'

import type { ToolDatum } from '@/lib/data/schema'

import { AnimatedBarContainer } from '@/components/charts/AnimatedBarContainer'
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
      <AnimatedBarContainer>
        {(inView) => (
          <div>
            {items.map((item, index) => (
              <HorizontalBarRow
                key={item.tool}
                label={item.tool}
                pct={item.pct}
                rank={index + 1}
                displayValue={`${item.pct.toFixed(1)}%`}
                accentWinner
                n={item.n}
                animIndex={index}
                animate={inView}
              />
            ))}
          </div>
        )}
      </AnimatedBarContainer>
    </ChartCard>
  )
}
