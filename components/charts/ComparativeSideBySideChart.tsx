import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface ComparativeSideBySideChartProps {
  title: string
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  callout: string
  bare?: boolean
}

export function ComparativeSideBySideChart({
  title,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  callout,
  bare = false,
}: ComparativeSideBySideChartProps) {
  const maxPct = Math.max(leftValue, rightValue)

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
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
        n=1,478 · % spending 50%+ time vibe coding
      </div>
    </ChartCard>
  )
}
