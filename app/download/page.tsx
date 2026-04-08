import Link from 'next/link'

import { PageSection } from '@/components/layout/PageSection'
import { loadQuestions } from '@/lib/data/loaders'
import { sponsors } from '@/lib/site'

export const metadata = { title: 'Download' }

export default async function DownloadPage() {
  const questions = await loadQuestions()

  return (
    <>
      <section style={{ marginBottom: 64 }}>
        <p className="page-eyebrow" style={{ marginBottom: 16 }}>Download</p>
        <h1 className="page-title" style={{ marginBottom: 24 }}>Download the Data</h1>
        <p className="lead-text" style={{ marginBottom: 40 }}>
          The complete State of Prototyping Spring 2026 dataset.
          Released under CC BY 4.0 — use it, cite it, build with it.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/api/v1/download/csv" className="button-primary">Download CSV</Link>
          <Link href="/api/v1/download/json" className="button-secondary">Download JSON</Link>
          <Link href="/api/openapi.yaml" className="button-secondary">View OpenAPI YAML</Link>
        </div>
      </section>

      <PageSection eyebrow="Reference" title="Data dictionary">
        <div className="chart-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Field', 'Type', 'Values'].map((header) => (
                  <th
                    key={header}
                    style={{
                      fontFamily: 'var(--font-data)',
                      fontSize: 11,
                      fontWeight: 400,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      textAlign: 'left',
                      paddingBottom: 16,
                      paddingRight: 16,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.data.map((question) => (
                <tr key={question.id} style={{ borderTop: '1px solid var(--border-grid)' }}>
                  <td style={{ fontFamily: 'var(--font-data)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', paddingBlock: 12, paddingRight: 16 }}>
                    {question.id}
                  </td>
                  <td style={{ fontSize: 14, color: 'var(--text-body)', paddingBlock: 12, paddingRight: 16 }}>{question.field}</td>
                  <td style={{ fontSize: 14, color: 'var(--text-body)', paddingBlock: 12, paddingRight: 16 }}>{question.type}</td>
                  <td style={{ fontSize: 14, color: 'var(--text-secondary)', paddingBlock: 12 }}>{question.options}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection eyebrow="Citation" title="How to cite">
        <div className="chart-callout">
          UX Tools. (2026). State of Prototyping Spring 2026. https://data.prototypingstate.com. CC BY 4.0.
        </div>
      </PageSection>

      <PageSection eyebrow="Sponsors" title="This research was made possible by">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.slug}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text-primary)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 8,
                padding: '10px 20px',
              }}
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </PageSection>
    </>
  )
}
