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
    <div style={{ display: 'flex', alignItems: 'center', height: 32 }}>
      <div
        style={{
          fontFamily: 'var(--font-data)',
          fontSize: 12,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          width: 140,
          textAlign: 'right',
          paddingRight: 16,
          flexShrink: 0,
          lineHeight: '16px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 24,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-callout)',
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: `${widthPct.toFixed(1)}%`,
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
          width: 56,
          paddingLeft: 12,
          flexShrink: 0,
          textAlign: 'right',
        }}
      >
        {displayValue ?? `${pct.toFixed(1)}%`}
      </div>
    </div>
  )
}

interface GridLine {
  label: string
  pct: number
}

export function BarChartGrid({ lines, maxPct }: { lines: GridLine[]; maxPct: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 140,
        right: 56,
        pointerEvents: 'none',
      }}
    >
      {lines.map((line) => {
        const leftPct = (line.pct / maxPct) * 100
        return (
          <div
            key={line.label}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              top: -20,
              bottom: -8,
              width: 1,
              background: 'var(--border-grid)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-data)',
                fontSize: 10,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {line.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
