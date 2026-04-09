'use client'

import { useCountUp } from '@/lib/hooks/useCountUp'
import { useInView } from '@/lib/hooks/useInView'

interface HeroStatChartProps {
  value: string
  label: string
  accentLabel?: string
}

function parseHeroValue(value: string): { num: number; suffix: string; decimals: number } {
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value, decimals: 1 }
  const numStr = match[1]
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { num: parseFloat(numStr), suffix: match[2], decimals }
}

export function HeroStatChart({ value, label, accentLabel }: HeroStatChartProps) {
  const { ref, inView } = useInView()
  const { num, suffix, decimals } = parseHeroValue(value)
  const animatedValue = useCountUp(num, inView, { duration: 900, decimals })

  return (
    <figure
      ref={ref}
      role="figure"
      aria-label={`${value} ${label}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: '1 1 0%',
        padding: '40px 24px',
        margin: 0,
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
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 12vw, 96px)',
          fontWeight: 700,
          lineHeight: 0.9,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {animatedValue}{suffix}
      </div>

      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 2,
          background: 'var(--bar-1)',
          margin: '20px 0',
        }}
      />

      <figcaption
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: '24px',
          color: 'var(--text-body)',
          maxWidth: '30ch',
        }}
      >
        {label}
      </figcaption>
    </figure>
  )
}
