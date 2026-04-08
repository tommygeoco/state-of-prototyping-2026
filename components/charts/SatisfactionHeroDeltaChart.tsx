interface SatisfactionHeroDeltaChartProps {
  overallMean: number
  delta: number
  fromTier: string
  toTier: string
}

export function SatisfactionHeroDeltaChart({
  overallMean,
  delta,
  fromTier,
  toTier,
}: SatisfactionHeroDeltaChartProps) {
  return (
    <div
      style={{
        background: 'var(--bg-callout)',
        borderRadius: 8,
        padding: 32,
        marginTop: 32,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--text-primary)',
        }}
      >
        {overallMean.toFixed(1)}/10
      </div>
      <div className="body-text" style={{ marginTop: 12, marginBottom: 16 }}>
        Overall mean satisfaction across all respondents (n=1,477)
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--delta-bg)',
          border: '1px solid var(--delta-border)',
          borderRadius: 20,
          padding: '8px 16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--delta-arrow)',
          }}
        >
          ▲ {delta.toFixed(2)}
        </span>
        <span style={{ fontSize: 14, color: 'var(--delta-text)' }}>
          {fromTier} → {toTier}
        </span>
      </div>
    </div>
  )
}
