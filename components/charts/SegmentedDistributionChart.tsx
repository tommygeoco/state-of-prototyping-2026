'use client'

import { useState } from 'react'

import type { VibeDistributionDatum, VibeDistributionResponse } from '@/lib/data/schema'

import { AnimatedBarContainer } from '@/components/charts/AnimatedBarContainer'
import { ChartCard } from '@/components/charts/ChartCard'

interface Group {
  label: string
  tiers: VibeDistributionDatum[]
  pct: number
  n: number
}

const groupColors = [
  'var(--text-primary)',
  'var(--text-muted)',
  'var(--text-secondary)',
]

function buildGroups(data: VibeDistributionDatum[]): Group[] {
  const find = (tier: string) => data.find((d) => d.tier === tier)

  const none = find('None (0%)')
  const occasionally = find('Occasionally')
  const aboutHalf = find('About half')
  const most = find('Most of it')
  const nearlyAll = find('Nearly all')

  return [
    {
      label: 'No vibe coding',
      tiers: none ? [none] : [],
      pct: none?.pct ?? 0,
      n: none?.n ?? 0,
    },
    {
      label: 'Some',
      tiers: [occasionally, aboutHalf].filter((t): t is VibeDistributionDatum => t != null),
      pct: (occasionally?.pct ?? 0) + (aboutHalf?.pct ?? 0),
      n: (occasionally?.n ?? 0) + (aboutHalf?.n ?? 0),
    },
    {
      label: 'Majority AI-generated',
      tiers: [most, nearlyAll].filter((t): t is VibeDistributionDatum => t != null),
      pct: (most?.pct ?? 0) + (nearlyAll?.pct ?? 0),
      n: (most?.n ?? 0) + (nearlyAll?.n ?? 0),
    },
  ]
}

interface SegmentedDistributionChartProps {
  title: string
  subtitle?: string
  distribution: VibeDistributionResponse
  bare?: boolean
}

export function SegmentedDistributionChart({ title, subtitle, distribution, bare = false }: SegmentedDistributionChartProps) {
  const groups = buildGroups(distribution.data)

  return (
    <ChartCard title={title} subtitle={subtitle} bare={bare}>
      <AnimatedBarContainer>
        {(inView) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {groups.map((group, gi) => (
              <GroupRow
                key={group.label}
                group={group}
                color={groupColors[gi]}
                animate={inView}
                index={gi}
              />
            ))}
          </div>
        )}
      </AnimatedBarContainer>
    </ChartCard>
  )
}

function GroupRow({ group, color, animate, index }: { group: Group; color: string; animate: boolean; index: number }) {
  const [hovered, setHovered] = useState(false)
  const delay = `${index * 80}ms`

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: '20px',
          }}
        >
          {group.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)',
            flexShrink: 0,
          }}
        >
          {hovered ? `${group.n.toLocaleString()} resp.` : `${group.pct.toFixed(1)}%`}
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: 20,
          background: 'var(--bg-callout)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: animate ? `${group.pct.toFixed(1)}%` : '0%',
            height: '100%',
            background: color,
            borderRadius: 4,
            minWidth: animate ? 4 : 0,
            transition: `width 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}`,
          }}
        />
      </div>

      {group.tiers.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 6,
            paddingLeft: 2,
          }}
        >
          {group.tiers.map((tier) => (
            <span
              key={tier.tier}
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--text-secondary)',
                lineHeight: '16px',
              }}
            >
              {tier.tier} {tier.pct.toFixed(1)}%
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
