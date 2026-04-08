import type { SatisfactionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface DualAxisChartProps {
  title: string
  satisfaction: SatisfactionResponse
  callout: string
  bare?: boolean
}

export function DualAxisChart({ title, satisfaction, callout, bare = false }: DualAxisChartProps) {
  const maxMean = 10
  const reversed = [...satisfaction.data].reverse()

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
      <div style={{ position: 'relative' }}>
        <GridLines max={maxMean} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {reversed.map((item, index) => (
            <HorizontalBarRow
              key={item.tier}
              label={item.tier}
              pct={item.mean}
              rank={index + 1}
              maxPct={maxMean}
              displayValue={`${item.mean.toFixed(1)} / 10`}
              accentWinner
            />
          ))}
        </div>
      </div>
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
        n=1,477 · Mean satisfaction score (1–10 scale)
      </div>
    </ChartCard>
  )
}

function GridLines({ max }: { max: number }) {
  const steps = [0, 2, 4, 6, 8, 10]

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
        const leftPct = (step / max) * 100
        return (
          <div
            key={step}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
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
