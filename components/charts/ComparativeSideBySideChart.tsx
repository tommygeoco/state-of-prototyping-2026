'use client'

import { AnimatedBarContainer } from '@/components/charts/AnimatedBarContainer'
import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface ComparativeSideBySideChartProps {
  title: string
  subtitle?: string
  leftLabel: string
  leftValue: number
  leftN?: number
  rightLabel: string
  rightValue: number
  rightN?: number
  bare?: boolean
}

export function ComparativeSideBySideChart({
  title,
  subtitle,
  leftLabel,
  leftValue,
  leftN,
  rightLabel,
  rightValue,
  rightN,
  bare = false,
}: ComparativeSideBySideChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <AnimatedBarContainer>
        {(inView) => (
          <div>
            <HorizontalBarRow label={rightLabel} pct={rightValue} rank={1} displayValue={`${rightValue.toFixed(1)}%`} accentWinner n={rightN} animIndex={0} animate={inView} />
            <HorizontalBarRow label={leftLabel} pct={leftValue} rank={2} displayValue={`${leftValue.toFixed(1)}%`} n={leftN} animIndex={1} animate={inView} />
          </div>
        )}
      </AnimatedBarContainer>
    </ChartCard>
  )
}
