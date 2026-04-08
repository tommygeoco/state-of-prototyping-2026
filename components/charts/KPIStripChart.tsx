import type { HeadlineDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'

interface KPIStripChartProps {
  items: HeadlineDatum[]
  callout: string
}

function renderValue(item: HeadlineDatum) {
  if (item.unit === 'count') return item.value.toLocaleString()
  if (item.unit === 'delta') return `+${item.value.toFixed(2)}`
  return `${item.value.toFixed(1)}%`
}

export function KPIStripChart({ items, callout }: KPIStripChartProps) {
  return (
    <ChartCard title="Headline KPI Strip" callout={callout}>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.key}
            className={`rounded-md border border-grid bg-[var(--bg-card-inner)] px-5 py-6 ${
              index < items.length - 1 ? '' : ''
            }`}
          >
            <div className="font-display text-[48px] font-extrabold leading-none text-text-primary">
              {renderValue(item)}
            </div>
            <div className="mt-3 text-sm leading-6 text-text-body">{item.label}</div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
