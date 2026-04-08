interface HorizontalBarRowProps {
  label: string
  pct: number
  displayValue?: string
  rank?: number
  maxPct?: number
  accentWinner?: boolean
}

const barVars = [
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
  const isWinner = accentWinner && rank === 1
  const barColor = isWinner ? 'var(--bar-1)' : barVars[Math.min(rank - 2, barVars.length - 1)] ?? barVars[0]
  const widthPct = Math.min((pct / maxPct) * 100, 100)

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: isWinner ? 600 : 500,
            color: isWinner ? 'var(--text-primary)' : 'var(--text-body)',
            lineHeight: '18px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 13,
            fontWeight: 700,
            color: isWinner ? 'var(--bar-1)' : 'var(--text-body)',
            flexShrink: 0,
          }}
        >
          {displayValue ?? `${pct.toFixed(1)}%`}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 16,
          background: 'var(--bg-callout)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${widthPct.toFixed(1)}%`,
            height: '100%',
            background: barColor,
            borderRadius: 3,
            minWidth: 4,
          }}
        />
      </div>
    </div>
  )
}
