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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 32px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          lineHeight: '18px',
          marginBottom: 24,
        }}
      >
        Q10 Workflow Satisfaction · N=1,477
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 80px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 12,
        }}
      >
        {overallMean.toFixed(2)}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--text-secondary)',
          marginBottom: 24,
        }}
      >
        mean workflow satisfaction out of 10
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--delta-bg)',
          border: '1px solid var(--delta-border)',
          borderRadius: 24,
          padding: '10px 20px',
          marginBottom: 24,
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
          ▲ +{delta.toFixed(2)}
        </span>
        <span style={{ fontSize: 14, color: 'var(--delta-text)' }}>
          heavy vibers vs. non-vibers
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--text-secondary)',
          lineHeight: '18px',
        }}
      >
        Non-vibers: {(overallMean - delta / 2).toFixed(2)} → Heavy vibers: {(overallMean + delta / 2).toFixed(2)}
      </div>
    </div>
  )
}
