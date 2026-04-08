import type { SatisfactionResponse, VibeDistributionResponse } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'

interface DualAxisChartProps {
  distribution: VibeDistributionResponse
  satisfaction: SatisfactionResponse
  callout: string
}

const tierMap: Record<string, string> = {
  'None (0%)': 'None (0%)',
  Occasionally: 'Occasionally',
  'About half': 'About half',
  'Most of it': 'Most of it',
  'Nearly all': 'Nearly all',
}

export function DualAxisChart({ distribution, satisfaction, callout }: DualAxisChartProps) {
  const satisfactionByTier = new Map(satisfaction.data.map((item) => [item.tier, item.mean]))

  return (
    <ChartCard title="Vibe Tier × Adoption + Satisfaction" callout={callout}>
      <div className="space-y-4">
        {distribution.data.map((item, index) => {
          const mean = satisfactionByTier.get(tierMap[item.tier]) ?? 0
          return (
            <div key={item.tier} className="rounded-md border border-grid bg-[var(--bg-card-inner)] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-display text-sm uppercase tracking-[0.1em] text-text-primary">
                    {item.tier}
                  </div>
                  <div className="mt-1 text-sm text-text-secondary">Adoption share and average satisfaction</div>
                </div>
                <div className="font-data text-sm text-text-body">{mean.toFixed(2)} / 10 satisfaction</div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_144px] md:items-center">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-text-body">
                    <span>Share of respondents</span>
                    <span className="font-data">{item.pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-[var(--bg-callout)]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.pct}%`, backgroundColor: `var(--bar-${Math.min(index + 1, 7)})` }}
                    />
                  </div>
                </div>
                <div className="rounded-md border border-grid bg-card px-4 py-3 text-center">
                  <div className="font-display text-[32px] font-bold leading-none text-text-primary">
                    {mean.toFixed(2)}
                  </div>
                  <div className="mt-2 text-sm text-text-secondary">Mean satisfaction</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}
