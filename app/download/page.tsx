import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'Download' }

const summaryColumns = [
  { field: 'headline', desc: 'Key topline metrics used across the report and share cards' },
  { field: 'tools', desc: 'Top 10 weekly tools with counts and percentages' },
  { field: 'vibe-by-role', desc: 'Published role cross-tab for 50%+ vibe coding' },
  { field: 'satisfaction', desc: 'Workflow satisfaction by vibe coding tier' },
  { field: 'outlook', desc: 'Role outlook and job security summary by role' },
  { field: 'full-summary', desc: 'Merged summary export used for downstream analysis and downloads' },
]

const responseFields = [
  { field: 'work_context', desc: 'Company size and type (6 options)' },
  { field: 'role_seat', desc: 'Role level — IC, lead, manager, etc. (6 options)' },
  { field: 'region', desc: 'Geographic region (18 regions)' },
  { field: 'design_tools', desc: 'Tools used weekly (free-form, comma-separated)' },
  { field: 'code_in_workflow', desc: 'How code fits into the respondent\u2019s workflow (5 options)' },
  { field: 'anticipated_investment', desc: 'Where they plan to invest in the next 12 months (multi-select)' },
  { field: 'vibe_coding_ratio', desc: 'Share of output that is AI-generated (5 tiers)' },
  { field: 'built_own_tool', desc: 'Whether they\u2019ve built their own tool with AI (4 options)' },
  { field: 'ai_trust', desc: 'Level of trust in AI-generated output (6 levels)' },
  { field: 'blockers', desc: 'Adoption blockers (multi-select)' },
  { field: 'workflow_shift', desc: 'How their workflow has changed recently (single select)' },
  { field: 'role_outlook', desc: 'How they feel about AI\u2019s impact on their role (5 options)' },
  { field: 'workflow_satisfaction', desc: 'Satisfaction with current workflow (1\u201310 scale)' },
]

function FieldTable({ fields }: { fields: { field: string; desc: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {fields.map((col) => (
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
  )
}

export default function DownloadPage() {
  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">Get the data</h1>
        <p className="lead-text" style={{ marginBottom: 16 }}>
          Open data from 1,478 designers. CC BY 4.0.
        </p>
        <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-muted)', marginBottom: 24 }}>
          Download summary tables, chart-ready exports, or the full de-identified respondent dataset.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button asChild><Link href="/api/v1/download/csv">Summary CSV</Link></Button>
          <Button asChild variant="outline"><Link href="/api/v1/download/json">Summary JSON</Link></Button>
        </div>
      </header>

      <hr className="section-divider" />

      {/* ── Open data: respondent-level ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <h2 className="section-title">Respondent-level data</h2>
        <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)', marginBottom: 8 }}>
          All 1,478 responses, one row per respondent. De-identified — no emails, names, or timestamps.
          Run your own cross-tabs, build charts, or feed it into a notebook.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <Button asChild><Link href="/api/v1/download/responses-csv">Responses CSV</Link></Button>
          <Button asChild variant="outline"><Link href="/api/v1/download/responses-json">Responses JSON</Link></Button>
        </div>

        <Disclosure title="Response fields (13 columns)">
          <FieldTable fields={responseFields} />
        </Disclosure>
      </div>

      <hr className="section-divider" />

      {/* ── Summary tables ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <h2 className="section-title">Summary tables</h2>
        <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)', marginBottom: 8 }}>
          Pre-computed percentages and cross-tabs used by the report charts.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/csv">Summary CSV</Link></Button>
          <Button asChild variant="outline" size="sm"><Link href="/api/v1/download/json">Summary JSON</Link></Button>
        </div>

        <Disclosure title="Included tables">
          <FieldTable fields={summaryColumns} />
        </Disclosure>
      </div>

      <hr className="section-divider" />

      {/* ── Disclosures ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <h2 className="section-title">About the data</h2>

        <Disclosure title="Privacy and de-identification">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)' }}>
            The respondent-level export contains only survey answers — 13 categorical or scale fields.
            No emails, names, IP addresses, or submission timestamps are included.
            Rows are shuffled so order does not correspond to submission time.
          </p>
        </Disclosure>

        <Disclosure title="License and citation">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)', marginBottom: 10 }}>
            All data is released under CC BY 4.0. You are free to share and adapt
            the data for any purpose, including commercial use, as long as you give appropriate credit.
          </p>
          <p style={{ fontFamily: 'var(--font-data)', fontSize: 14, lineHeight: '20px', color: 'var(--text-body)' }}>
            UX Tools. (2026). State of Prototyping Spring 2026. https://survey.uxtools.co. CC BY 4.0.
          </p>
        </Disclosure>

        <Disclosure title="API access">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)' }}>
            The full respondent dataset is also available at <code style={{ fontSize: 13 }}>/api/v1/responses</code> as
            JSON. Summary endpoints and agent tools are documented on the{' '}
            <Link href="/api" style={{ color: 'var(--text-link)' }}>API page</Link>.
          </p>
        </Disclosure>
      </div>

      {/* ── Related resources ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 className="section-title">Related resources</h2>
        {[
          { href: '/api', label: 'REST API', desc: 'Query summary tables, published crosstabs, and respondent data' },
          { href: '/agent', label: 'Agent tools', desc: 'LLM integrations, natural language queries' },
          { href: '/spring-2026', label: 'Full report', desc: '12 sections, all charts' },
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
