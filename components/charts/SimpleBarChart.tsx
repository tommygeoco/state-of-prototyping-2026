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
  callout: string
  source?: string
  bare?: boolean
}

export function SimpleBarChart({ title, subtitle, items, callout, source, bare = false }: SimpleBarChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
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
      {source ? (
        <div
          style={{
            marginTop: 12,
            paddingTop: 8,
            borderTop: '1px solid var(--border-grid)',
            fontFamily: 'var(--font-data)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
          }}
        >
          {source}
        </div>
      ) : null}
    </ChartCard>
  )
}
