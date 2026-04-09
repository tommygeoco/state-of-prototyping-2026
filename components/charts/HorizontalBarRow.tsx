'use client'

import { useCallback, useState } from 'react'

interface HorizontalBarRowProps {
  label: string
  pct: number
  displayValue?: string
  rank?: number
  maxPct?: number
  accentWinner?: boolean
  n?: number
  animIndex?: number
  animate?: boolean
}

const barVars = [
  'var(--bar-2)',
  'var(--bar-3)',
  'var(--bar-4)',
  'var(--bar-5)',
  'var(--bar-6)',
  'var(--bar-7)',
]

export function HorizontalBarRow({
  label,
  pct,
  displayValue,
  rank = 1,
  maxPct = 100,
  accentWinner = false,
  n,
  animIndex = 0,
  animate = true,
}: HorizontalBarRowProps) {
  const isWinner = accentWinner && rank === 1
  const barColor = isWinner ? 'var(--bar-1)' : barVars[Math.min(rank - 2, barVars.length - 1)] ?? barVars[0]
  const widthPct = Math.min((pct / maxPct) * 100, 100)

  const [hovered, setHovered] = useState(false)
  const handleEnter = useCallback(() => setHovered(true), [])
  const handleLeave = useCallback(() => setHovered(false), [])

  const defaultDisplay = displayValue ?? `${pct.toFixed(1)}%`
  const hoverDisplay = n != null ? `${n.toLocaleString()} resp.` : defaultDisplay
  const delay = `${animIndex * 60}ms`

  const ariaLabel = n != null
    ? `${label}: ${defaultDisplay}, ${n.toLocaleString()} respondents`
    : `${label}: ${defaultDisplay}`

  const handleFocus = useCallback(() => setHovered(true), [])
  const handleBlur = useCallback(() => setHovered(false), [])

  return (
    <div
      style={{ marginBottom: 8 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={n != null ? handleFocus : undefined}
      onBlur={n != null ? handleBlur : undefined}
      tabIndex={n != null ? 0 : undefined}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
          gap: 8,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: isWinner ? 600 : 500,
            color: hovered ? 'var(--text-primary)' : isWinner ? 'var(--text-primary)' : 'var(--text-body)',
            lineHeight: '18px',
            transition: 'color 120ms ease',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 14,
            fontWeight: 700,
            color: isWinner ? 'var(--bar-1)' : hovered ? 'var(--text-primary)' : 'var(--text-body)',
            flexShrink: 0,
            transition: 'color 120ms ease',
          }}
        >
          {hovered ? hoverDisplay : defaultDisplay}
        </span>
      </div>
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: 16,
          background: 'var(--bg-callout)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: animate ? `${widthPct.toFixed(1)}%` : '0%',
            height: '100%',
            background: barColor,
            borderRadius: 3,
            minWidth: animate ? 4 : 0,
            transition: `width 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}`,
          }}
        />
      </div>
    </div>
  )
}
