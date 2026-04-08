import { ChartCard } from '@/components/charts/ChartCard'

interface SatisfactionHeroDeltaChartProps {
  overallMean: number
  delta: number
  fromTier: string
  toTier: string
  callout: string
}

export function SatisfactionHeroDeltaChart({
  overallMean,
  delta,
  fromTier,
  toTier,
  callout,
}: SatisfactionHeroDeltaChartProps) {
  return (
    <ChartCard title="Workflow Satisfaction Delta" callout={callout} hero>
      <div className="flex flex-col gap-6 rounded-md border border-grid bg-[var(--bg-card-inner)] p-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-secondary">
            Overall mean satisfaction
          </div>
          <div className="mt-4 font-display text-[72px] font-extrabold leading-none text-text-primary">
            {overallMean.toFixed(2)}
          </div>
          <div className="mt-3 text-sm text-text-body">Across all published Q10 respondents (n=1,477)</div>
        </div>
        <div className="rounded-full border border-[var(--delta-border)] bg-[var(--delta-bg)] px-5 py-4">
          <div className="font-data text-[28px] font-bold text-[var(--delta-arrow)]">▲ {delta.toFixed(2)}</div>
          <div className="mt-2 max-w-[20ch] text-sm leading-6 text-[var(--delta-text)]">
            Change from {fromTier} vibe coding to {toTier}
          </div>
        </div>
      </div>
    </ChartCard>
  )
}
