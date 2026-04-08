import type { OutlookDatum } from '@/lib/data/schema'

import { ChartCard } from '@/components/charts/ChartCard'

interface GroupedComparisonChartProps {
  title: string
  subtitle?: string
  items: OutlookDatum[]
  callout: string
  bare?: boolean
}

export function GroupedComparisonChart({ title, subtitle, items, callout, bare = false }: GroupedComparisonChartProps) {
  return (
    <ChartCard title={title} subtitle={subtitle} callout={callout} bare={bare}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-accent)',
                textAlign: 'left',
                paddingBottom: 16,
              }}
            >
              Role
            </th>
            <th
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                paddingBottom: 16,
              }}
            >
              More Valuable
            </th>
            <th
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                paddingBottom: 16,
              }}
            >
              Less Secure
            </th>
            <th
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                paddingBottom: 16,
              }}
            >
              About Same
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.role} style={{ borderTop: '1px solid var(--border-grid)' }}>
              <td
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  paddingBlock: 14,
                  paddingRight: 16,
                }}
              >
                {item.role}
              </td>
              <td
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--text-accent)',
                  paddingBlock: 14,
                }}
              >
                {item.more_valuable.toFixed(1)}%
              </td>
              <td
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--text-accent)',
                  paddingBlock: 14,
                }}
              >
                {item.less_secure.toFixed(1)}%
              </td>
              <td
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 14,
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  paddingBlock: 14,
                }}
              >
                {item.about_same.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  )
}
