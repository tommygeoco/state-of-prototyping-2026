import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface ComparativeSideBySideChartProps {
  title: string
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  callout: string
}

export function ComparativeSideBySideChart({
  title,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  callout,
}: ComparativeSideBySideChartProps) {
  const maxPct = Math.max(leftValue, rightValue)

  return (
    <ChartCard title={title} callout={callout}>
      <HorizontalBarRow label={leftLabel} pct={leftValue} rank={2} maxPct={maxPct} displayValue={`${leftValue.toFixed(1)}%`} />
      <HorizontalBarRow label={rightLabel} pct={rightValue} rank={1} maxPct={maxPct} displayValue={`${rightValue.toFixed(1)}%`} accentWinner />
    </ChartCard>
  )
}
