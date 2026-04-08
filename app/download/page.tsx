import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'Download' }

const columns = [
  { field: 'work_context', desc: 'Company size / work setting' },
  { field: 'role_seat', desc: 'Role (IC designer, lead, engineer, etc.)' },
  { field: 'region', desc: 'World region' },
  { field: 'design_tools', desc: 'Tools used weekly (multi-select)' },
  { field: 'code_in_workflow', desc: 'How code fits in workflow (multi-select)' },
  { field: 'anticipated_investment', desc: 'Investment areas next 12mo (multi-select)' },
  { field: 'vibe_coding_ratio', desc: 'AI-generated code ratio (5 tiers)' },
  { field: 'built_own_tool', desc: 'Built own tool with AI (4 options)' },
  { field: 'ai_trust', desc: 'How far they trust AI output (6 levels)' },
  { field: 'blockers', desc: 'Top workflow blockers (multi-select)' },
  { field: 'workflow_shift', desc: 'How workflow changed in 6 months' },
  { field: 'role_outlook', desc: 'How AI will affect their role' },
  { field: 'workflow_satisfaction', desc: 'Workflow satisfaction (1-10 scale)' },
]

export default function DownloadPage() {
  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">Get the data</h1>
        <p className="lead-text" style={{ marginBottom: 16 }}>
          1,478 individual responses. 13 columns. CC BY 4.0.
        </p>
        <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-muted)', marginBottom: 24 }}>
          Emails and timestamps stripped. Row order shuffled. This is the real microdata, not just summaries.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button asChild><Link href="/api/v1/download/responses-csv">Download CSV (1,478 rows)</Link></Button>
          <Button asChild variant="outline"><a href="/data/responses.json" download>Download JSON</a></Button>
        </div>
      </header>

      <hr className="section-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <Disclosure title="Columns (13 fields)" defaultOpen>
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
            Pre-computed percentages and cross-tabs used by the report charts. Available alongside the full response data.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/csv">Summary CSV</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/json">Summary JSON</Link></Button>
          </div>
        </Disclosure>

        <Disclosure title="De-identification">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)' }}>
            Email addresses (1,038 of 1,478 respondents provided one) and all timestamps have been removed.
            Row order is randomized so submission sequence cannot be used to re-identify.
            Multi-select fields use comma-separated values. The Researcher role (n=23) is directional only.
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
          { href: '/api', label: 'REST API', desc: 'Query responses and summaries, paginated' },
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
