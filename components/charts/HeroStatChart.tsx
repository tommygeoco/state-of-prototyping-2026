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
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 10vw, 80px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 16,
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
            color: 'var(--bar-1)',
            lineHeight: '18px',
            marginBottom: 16,
          }}
        >
          {accentLabel}
        </div>
      ) : null}

      <div
        style={{
          width: 60,
          height: 2,
          background: 'var(--bar-1)',
          marginBottom: 16,
        }}
      />

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          lineHeight: '22px',
          color: 'var(--text-body)',
          maxWidth: '32ch',
        }}
      >
        {label}
      </div>

    </div>
  )
}
