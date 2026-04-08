import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface ComparativeSideBySideChartProps {
  title: string
  subtitle?: string
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  callout: string
  bare?: boolean
}

export function ComparativeSideBySideChart({
  title,
  subtitle,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  callout,
  bare = false,
}: ComparativeSideBySideChartProps) {
  const maxPct = Math.max(leftValue, rightValue)

  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
      <div>
        <HorizontalBarRow label={rightLabel} pct={rightValue} rank={1} maxPct={maxPct} displayValue={`${rightValue.toFixed(1)}%`} accentWinner />
        <HorizontalBarRow label={leftLabel} pct={leftValue} rank={2} maxPct={maxPct} displayValue={`${leftValue.toFixed(1)}%`} />
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
        State of Prototyping · Spring 2026 · n=1,478
      </div>
    </ChartCard>
  )
}
