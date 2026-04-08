interface HeroStatChartProps {
  value: string
  label: string
  accentLabel?: string
  meta?: string
}

export function HeroStatChart({ value, label, accentLabel, meta }: HeroStatChartProps) {
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
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          lineHeight: '16px',
          marginBottom: 24,
        }}
      >
        State of Prototyping · Spring 2026
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 80px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 20,
        }}
      >
        {value}
      </div>

      {accentLabel ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            lineHeight: '18px',
            marginBottom: 20,
          }}
        >
          {accentLabel}
        </div>
      ) : null}

      <div
        style={{
          width: 60,
          height: 2,
          background: 'var(--accent)',
          marginBottom: 20,
        }}
      />

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          lineHeight: '22px',
          color: 'var(--text-secondary)',
          maxWidth: '32ch',
        }}
      >
        {label}
      </div>

      {meta ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: '16px',
            marginTop: 12,
          }}
        >
          {meta}
        </div>
      ) : null}
    </div>
  )
}
