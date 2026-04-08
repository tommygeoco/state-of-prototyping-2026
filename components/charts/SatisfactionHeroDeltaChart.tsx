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
        flex: '1 1 0%',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          lineHeight: '14px',
          marginBottom: 20,
        }}
      >
        The Satisfaction Gap
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 72px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 10,
        }}
      >
        {overallMean.toFixed(1)}/10
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-body)',
          marginBottom: 16,
        }}
      >
        overall mean workflow satisfaction
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--delta-bg)',
          border: '1px solid var(--delta-border)',
          borderRadius: 24,
          padding: '8px 16px',
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--bar-1)',
          }}
        >
          ▲ +{delta.toFixed(2)}
        </span>
        <span style={{ fontSize: 14, color: 'var(--text-body)' }}>
          heavy vibers vs. non-vibers
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-muted)',
          lineHeight: '18px',
        }}
      >
        {fromTier}: 5.93 → {toTier}: 7.39
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 400,
          color: 'var(--text-secondary)',
          marginTop: 12,
        }}
      >
        State of Prototyping · Spring 2026 · n=1,477
      </div>
    </div>
  )
}
