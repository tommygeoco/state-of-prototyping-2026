import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'Download' }

const columns = [
  { field: 'headline', desc: 'Key topline metrics used across the landing page and share cards' },
  { field: 'tools', desc: 'Top 10 weekly tools with counts and percentages' },
  { field: 'vibe-by-role', desc: 'Published role cross-tab for 50%+ vibe coding' },
  { field: 'satisfaction', desc: 'Workflow satisfaction by vibe coding tier' },
  { field: 'outlook', desc: 'Role outlook and job security summary by role' },
  { field: 'full-summary', desc: 'Merged summary export used for downstream analysis and downloads' },
]

export default function DownloadPage() {
  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">Get the data</h1>
        <p className="lead-text" style={{ marginBottom: 16 }}>
          Summary tables and chart-ready exports. CC BY 4.0.
        </p>
        <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-muted)', marginBottom: 24 }}>
          Public downloads now focus on aggregated tables and published cross-tabs rather than row-level microdata.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button asChild><Link href="/api/v1/download/csv">Download summary CSV</Link></Button>
          <Button asChild variant="outline"><Link href="/api/v1/download/json">Download summary JSON</Link></Button>
        </div>
      </header>

      <hr className="section-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <Disclosure title="Included tables" defaultOpen>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {columns.map((col) => (
              <div
                key={col.field}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border-grid)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-data)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', minWidth: 160, flexShrink: 0 }}>
                  {col.field}
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-body)' }}>{col.desc}</span>
              </div>
            ))}
          </div>
        </Disclosure>

        <Disclosure title="Summary tables (pre-aggregated)">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)', marginBottom: 14 }}>
            Pre-computed percentages and cross-tabs used by the report charts. These are the supported public exports.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/csv">Summary CSV</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/json">Summary JSON</Link></Button>
          </div>
        </Disclosure>

        <Disclosure title="Published surface">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)' }}>
            Public downloads include the summary tables used by the report, not the underlying row-level response export.
            This keeps the published dataset aligned with the charts while reducing re-identification risk for small respondent cohorts.
          </p>
        </Disclosure>

        <Disclosure title="Citation">
          <p style={{ fontFamily: 'var(--font-data)', fontSize: 14, lineHeight: '20px', color: 'var(--text-body)' }}>
            UX Tools. (2026). State of Prototyping Spring 2026. https://survey.uxtools.co. CC BY 4.0.
          </p>
        </Disclosure>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { href: '/api', label: 'REST API', desc: 'Query summary tables and published crosstabs' },
          { href: '/agent', label: 'Agent tools', desc: 'LLM integrations, natural language queries' },
          { href: '/explore', label: 'Full report', desc: '12 sections, all charts' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: '1px solid var(--border-grid)',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.desc} →</span>
          </Link>
        ))}
      </div>
    </>
  )
}
