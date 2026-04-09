'use client'

import { useCountUp } from '@/lib/hooks/useCountUp'
import { useInView } from '@/lib/hooks/useInView'

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
  const { ref, inView } = useInView()
  const animatedMean = useCountUp(overallMean, inView, { duration: 900, decimals: 1 })
  const animatedDelta = useCountUp(delta, inView, { duration: 1100, decimals: 2 })

  return (
    <div
      ref={ref}
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
        {animatedMean}/10
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
          ▲ +{animatedDelta}
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

    </div>
  )
}
