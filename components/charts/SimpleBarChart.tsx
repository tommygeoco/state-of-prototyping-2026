'use client'

import { AnimatedBarContainer } from '@/components/charts/AnimatedBarContainer'
import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

export interface SimpleBarDatum {
  label: string
  pct: number
  n?: number
}

interface SimpleBarChartProps {
  title: string
  subtitle?: string
  items: SimpleBarDatum[]
  bare?: boolean
  /** Total respondents for the question -- used to compute per-item n when items lack it */
  totalN?: number
}

export function SimpleBarChart({ title, subtitle, items, bare = false, totalN }: SimpleBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <AnimatedBarContainer>
        {(inView) => (
          <div>
            {items.map((item, index) => (
              <HorizontalBarRow
                key={item.label}
                label={item.label}
                pct={item.pct}
                rank={index + 1}
                displayValue={`${item.pct.toFixed(1)}%`}
                accentWinner
                n={item.n ?? (totalN != null ? Math.round((item.pct / 100) * totalN) : undefined)}
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
