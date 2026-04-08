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
    <div className="flex items-center gap-3 py-[4.5px]">
      <div
        className="font-data text-[14px] uppercase tracking-[0.03em] text-text-secondary"
        style={{ width: 170, textAlign: 'right', flexShrink: 0 }}
      >
        {label}
      </div>
      <div className="h-[22px] flex-1 overflow-hidden rounded-[3px] bg-[var(--bg-callout)]">
        <div
          className="h-full rounded-[3px]"
          style={{ width: `${Math.min((pct / maxPct) * 100, 100)}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-[58px] flex-shrink-0 font-data text-[14px] font-medium text-text-body">
        {displayValue ?? `${pct.toFixed(1)}%`}
      </div>
    </div>
  )
}
