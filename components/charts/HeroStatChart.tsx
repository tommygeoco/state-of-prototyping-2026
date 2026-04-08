interface HeroStatChartProps {
  value: string
  label: string
  accentLabel?: string
}

export function HeroStatChart({ value, label, accentLabel }: HeroStatChartProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: '1 1 0%',
        padding: '40px 24px',
      }}
    >
      {accentLabel ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--bar-1)',
            lineHeight: '16px',
            marginBottom: 12,
          }}
        >
          {accentLabel}
        </div>
      ) : null}

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 12vw, 96px)',
          fontWeight: 700,
          lineHeight: 0.9,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      <div
        style={{
          width: 40,
          height: 2,
          background: 'var(--bar-1)',
          margin: '20px 0',
        }}
      />

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: '24px',
          color: 'var(--text-body)',
          maxWidth: '30ch',
        }}
      >
        {label}
      </div>
    </div>
  )
}
