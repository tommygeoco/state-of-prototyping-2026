import Link from 'next/link'

interface KPIItem {
  value: string
  label: string
  href?: string
}

interface KPIStripChartProps {
  items: KPIItem[]
}

export function KPIStripChart({ items }: KPIStripChartProps) {
  return (
    <div className="stats-strip">
      {items.map((item) => (
        item.href ? (
          <Link key={item.label} href={item.href} className="stats-strip-item stats-strip-link">
            <div className="stats-strip-value">{item.value}</div>
            <div className="stats-strip-label">{item.label}</div>
          </Link>
        ) : (
          <div key={item.label} className="stats-strip-item">
            <div className="stats-strip-value">{item.value}</div>
            <div className="stats-strip-label">{item.label}</div>
          </div>
        )
      ))}
    </div>
  )
}
