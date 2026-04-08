import type { ToolDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'
import { HorizontalBarRow } from '@/components/charts/HorizontalBarRow'

interface AccentHighlightBarChartProps {
  title: string
  items: ToolDatum[]
  callout: string
  bare?: boolean
}

export function AccentHighlightBarChart({ title, items, callout, bare = false }: AccentHighlightBarChartProps) {
  const maxPct = Math.max(...items.map((item) => item.pct))

  return (
    <ChartCard title={title} callout={callout} bare={bare}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 16 }}>
        <LegendItem color="var(--accent)" label="Winner" />
        <LegendItem color="var(--bar-2)" label="Others" />
      </div>
      <div style={{ position: 'relative' }}>
        <GridLines maxPct={maxPct} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {items.map((item, index) => (
            <HorizontalBarRow
              key={item.tool}
              label={item.tool}
              pct={item.pct}
              rank={index + 1}
              maxPct={maxPct}
              displayValue={`${item.pct.toFixed(1)}%`}
              accentWinner
            />
          ))}
        </div>
      </div>
      <SourceLine n={1478} label="% of respondents" />
    </ChartCard>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
      <span style={{ fontFamily: 'var(--font-data)', fontSize: 11, color: 'var(--text-secondary)' }}>{label}</span>
    </div>
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

function SourceLine({ n, label }: { n: number; label: string }) {
  return (
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
      n={n.toLocaleString()} · {label}
    </div>
  )
}
