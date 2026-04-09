'use client'

import type { SatisfactionResponse } from '@/lib/data/schema'

import { AnimatedBarContainer } from '@/components/charts/AnimatedBarContainer'
import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface DualAxisChartProps {
  title: string
  subtitle?: string
  satisfaction: SatisfactionResponse
  /** Per-tier respondent counts keyed by tier name (from vibe distribution) */
  tierCounts?: Record<string, number>
  bare?: boolean
}

export function DualAxisChart({ title, subtitle, satisfaction, tierCounts, bare = false }: DualAxisChartProps) {
  const maxMean = 10
  const reversed = [...satisfaction.data].reverse()

  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <AnimatedBarContainer>
        {(inView) => (
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
                n={tierCounts?.[item.tier]}
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
