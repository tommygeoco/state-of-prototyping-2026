import { ChartCard } from '@/components/charts/ChartCard'

interface HeroStatChartProps {
  value: number
  label: string
  supporting?: string[]
  callout: string
}

export function HeroStatChart({ value, label, supporting = [], callout }: HeroStatChartProps) {
  return (
    <ChartCard title="Vibe Coding 50%+ Headline" callout={callout} hero>
      <div className="flex flex-col items-center justify-center gap-6 py-6 text-center">
        <div className="font-display text-[72px] font-extrabold leading-none text-text-primary md:text-[96px]">
          {value.toFixed(1)}%
        </div>
        <p className="max-w-[28ch] font-display text-[16px] uppercase tracking-[0.1em] text-text-secondary">
          {label}
        </p>
        {supporting.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {supporting.map((item) => (
              <div key={item} className="rounded-md border border-grid bg-[var(--bg-card-inner)] px-4 py-3 text-sm text-text-body">
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ChartCard>
  )
}
