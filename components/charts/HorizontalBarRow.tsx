interface HorizontalBarRowProps {
  label: string
  pct: number
  displayValue?: string
  rank?: number
  maxPct?: number
  accentWinner?: boolean
}

const colors = [
  'var(--bar-1)',
  'var(--bar-2)',
  'var(--bar-3)',
  'var(--bar-4)',
  'var(--bar-5)',
  'var(--bar-6)',
  'var(--bar-7)',
]

export function HorizontalBarRow({
  label,
  pct,
  displayValue,
  rank = 1,
  maxPct = 100,
  accentWinner = false,
}: HorizontalBarRowProps) {
  const color = accentWinner && rank === 1 ? 'var(--accent)' : colors[Math.min(rank - 1, colors.length - 1)]
  const widthPct = Math.min((pct / maxPct) * 100, 100)

  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: '16px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-body)',
            marginLeft: 12,
            flexShrink: 0,
          }}
        >
          {displayValue ?? `${pct.toFixed(1)}%`}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 20,
          background: 'var(--bg-callout)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${widthPct.toFixed(1)}%`,
            height: '100%',
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  )
}
