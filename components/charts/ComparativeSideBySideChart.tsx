import { ChartCard } from '@/components/charts/ChartCard'

interface ComparativeSideBySideChartProps {
  leftLabel: string
  leftValue: number
  rightLabel: string
  rightValue: number
  callout: string
}

export function ComparativeSideBySideChart({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  callout,
}: ComparativeSideBySideChartProps) {
  const maxValue = Math.max(leftValue, rightValue)

  return (
    <ChartCard title="IC Designer Vs Design Engineer" callout={callout}>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: leftLabel, value: leftValue, accent: false },
          { label: rightLabel, value: rightValue, accent: true },
        ].map((panel) => (
          <div key={panel.label} className="rounded-md border border-grid bg-[var(--bg-card-inner)] p-5">
            <div className="font-display text-sm uppercase tracking-[0.12em] text-text-secondary">{panel.label}</div>
            <div className="mt-5 h-4 rounded-full bg-[var(--bg-callout)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(panel.value / maxValue) * 100}%`,
                  background: panel.accent ? 'var(--accent)' : 'var(--bar-2)',
                }}
              />
            </div>
            <div className="mt-5 font-display text-[60px] font-extrabold leading-none text-text-primary">
              {panel.value.toFixed(1)}%
            </div>
            <div className="mt-3 text-sm leading-6 text-text-body">
              Share spending at least half of output time on AI-generated code.
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
