import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

export interface SimpleBarDatum {
  label: string
  pct: number
}

interface SimpleBarChartProps {
  title: string
  items: SimpleBarDatum[]
  callout: string
  source?: string
  bare?: boolean
}

export function SimpleBarChart({ title, items, callout, source, bare = false }: SimpleBarChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
      <div style={{ position: 'relative' }}>
        <GridLines maxPct={maxPct} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {items.map((item, index) => (
            <HorizontalBarRow
              key={item.label}
              label={item.label}
              pct={item.pct}
              rank={index + 1}
              maxPct={maxPct}
              displayValue={`${item.pct.toFixed(1)}%`}
              accentWinner
            />
          ))}
        </div>
      </div>
      {source ? (
        <div
          style={{
            marginTop: 20,
            paddingTop: 12,
            borderTop: '1px solid var(--border-grid)',
            fontFamily: 'var(--font-data)',
            fontSize: 11,
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

function GridLines({ maxPct }: { maxPct: number }) {
  const steps = [0, 25, 50, 75, 100].filter((v) => v <= maxPct + 10)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 156,
        right: 68,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {steps.map((step) => {
        const leftPct = (step / maxPct) * 100
        if (leftPct > 105) return null
        return (
          <div
            key={step}
            style={{
              position: 'absolute',
              left: `${Math.min(leftPct, 100)}%`,
              top: 0,
              bottom: 0,
              borderLeft: '1px solid var(--border-grid)',
            }}
          />
        )
      })}
    </div>
  )
}
