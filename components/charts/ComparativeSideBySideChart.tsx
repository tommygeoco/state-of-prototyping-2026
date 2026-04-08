import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface ComparativeSideBySideChartProps {
  title: string
  subtitle?: string
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  bare?: boolean
}

export function ComparativeSideBySideChart({
  title,
  subtitle,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  bare = false,
}: ComparativeSideBySideChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
        <HorizontalBarRow label={rightLabel} pct={rightValue} rank={1} displayValue={`${rightValue.toFixed(1)}%`} accentWinner />
        <HorizontalBarRow label={leftLabel} pct={leftValue} rank={2} displayValue={`${leftValue.toFixed(1)}%`} />
      </div>
    </ChartCard>
  )
}
