interface HeroStatChartProps {
  value: string
  label: string
}

export function HeroStatChart({ value, label }: HeroStatChartProps) {
  return (
    <div className="hero-stat-block">
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--text-primary)',
        }}
      >
        {value}
      </div>
      <div className="body-text" style={{ marginTop: 12 }}>
        {label}
      </div>
    </div>
  )
}
