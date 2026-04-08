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

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 9 }}>
      <div
        style={{
          fontFamily: 'var(--font-data)',
          fontSize: 12,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          width: 170,
          textAlign: 'right',
          paddingRight: 12,
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 22,
          background: 'var(--bg-callout)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min((pct / maxPct) * 100, 100).toFixed(1)}%`,
            height: '100%',
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-data)',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-body)',
          width: 52,
          paddingLeft: 8,
          flexShrink: 0,
        }}
      >
        {displayValue ?? `${pct.toFixed(1)}%`}
      </div>
    </div>
  )
}
