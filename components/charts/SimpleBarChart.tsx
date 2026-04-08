import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

export interface SimpleBarDatum {
  label: string
  pct: number
}

interface SimpleBarChartProps {
  title: string
  subtitle?: string
  items: SimpleBarDatum[]
  bare?: boolean
}

export function SimpleBarChart({ title, subtitle, items, bare = false }: SimpleBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <div>
        {items.map((item, index) => (
          <HorizontalBarRow
            key={item.label}
            label={item.label}
            pct={item.pct}
            rank={index + 1}
            displayValue={`${item.pct.toFixed(1)}%`}
            accentWinner
          />
        ))}
      </div>
    </ChartCard>
  )
}
