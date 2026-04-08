import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'
import { loadQuestions } from '@/lib/data/loaders'

export const metadata = { title: 'Download' }

export default async function DownloadPage() {
  const questions = await loadQuestions()

  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">Get the data</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          CC BY 4.0. Use it, cite it, build with it.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button asChild><Link href="/api/v1/download/csv">CSV</Link></Button>
          <Button asChild variant="outline"><Link href="/api/v1/download/json">JSON</Link></Button>
          <Button asChild variant="outline"><a href="/api/openapi.yaml">OpenAPI</a></Button>
        </div>
      </header>

      <hr className="section-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        <Disclosure title="Data dictionary (11 fields)" defaultOpen>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {questions.data.map((q) => (
              <div
                key={q.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border-grid)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-data)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', width: 28, flexShrink: 0 }}>
                  {q.id}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-body)', flex: 1 }}>{q.field}</span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: 11, color: 'var(--text-secondary)' }}>{q.type}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 72, textAlign: 'right', flexShrink: 0 }}>{q.options}</span>
              </div>
            ))}
          </div>
        </Disclosure>

        <Disclosure title="What's in the download?">
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-body)' }}>
            Summary-level aggregated tables — not individual microdata. Multi-select questions sum to more than 100%.
            The Researcher role (n=23) is directional only.
          </p>
        </Disclosure>

        <Disclosure title="Citation">
          <p style={{ fontFamily: 'var(--font-data)', fontSize: 12, lineHeight: '18px', color: 'var(--text-body)' }}>
            UX Tools. (2026). State of Prototyping Spring 2026. https://data.prototypingstate.com. CC BY 4.0.
          </p>
        </Disclosure>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { href: '/api', label: 'REST API', desc: 'Query endpoints, no auth' },
          { href: '/agent', label: 'Agent tools', desc: 'LLM integrations, natural language' },
          { href: '/explore', label: 'Full report', desc: '12 sections, all charts' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--border-grid)',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.desc} →</span>
          </Link>
        ))}
      </div>
    </>
  )
}
