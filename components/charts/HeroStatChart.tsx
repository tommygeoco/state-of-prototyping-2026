/*
  Hero Metric Card — modeled after Paper "C Light — Hero Stat Card" (QZ-0)
  Centered layout with: category label → big number → accent label → accent rule → metadata
  Gap: 32px between elements (from computed styles on 36C-1)
*/

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
          marginBottom: 32,
        }}
      >
        State of Prototyping · Spring 2026
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 12vw, 96px)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--text-primary)',
          marginBottom: 32,
        }}
      >
        {value}
      </div>

      {accentLabel ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#A34B3A',
            lineHeight: '22px',
            marginBottom: 32,
          }}
        >
          {accentLabel}
        </div>
      ) : null}

      <div
        style={{
          width: 80,
          height: 2,
          background: 'var(--accent)',
          marginBottom: 32,
        }}
      />

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: '24px',
          color: 'var(--text-secondary)',
          maxWidth: '36ch',
        }}
      >
        {label}
      </div>

      {meta ? (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: '18px',
            marginTop: 16,
          }}
        >
          {meta}
        </div>
      ) : null}
    </div>
  )
}
