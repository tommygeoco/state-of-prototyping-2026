interface KPIItem {
  value: string
  label: string
}

interface KPIStripChartProps {
  items: KPIItem[]
}

export function KPIStripChart({ items }: KPIStripChartProps) {
  return (
    <div className="stats-strip">
      {items.map((item) => (
        <div key={item.label} className="stats-strip-item">
          <div className="stats-strip-value">{item.value}</div>
          <div className="stats-strip-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
