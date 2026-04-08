import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'
import { loadQuestions } from '@/lib/data/loaders'

export const metadata = { title: 'Download' }

export default async function DownloadPage() {
  const questions = await loadQuestions()

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <p className="page-eyebrow">Download</p>
        <h1 className="page-title" style={{ marginBottom: 12 }}>Get the data</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          The complete State of Prototyping Spring 2026 dataset.
          Released under CC BY 4.0 — use it, cite it, build with it.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button asChild>
            <Link href="/api/v1/download/csv">Download CSV</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/api/v1/download/json">Download JSON</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="/api/openapi.yaml">OpenAPI YAML</a>
          </Button>
        </div>
      </header>

      {/* ── Data dictionary ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Data dictionary</h2>
        <div
          style={{
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            background: 'var(--bg-card)',
            overflow: 'hidden',
          }}
        >
          {questions.data.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                padding: '10px 20px',
                borderTop: i > 0 ? '1px solid var(--border-grid)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  width: 32,
                  flexShrink: 0,
                }}
              >
                {q.id}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-body)', flex: 1, minWidth: 0 }}>
                {q.field}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                }}
              >
                {q.type}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                  width: 80,
                  textAlign: 'right',
                }}
              >
                {q.options}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Citation + license ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Citation</h2>
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 8,
            background: 'var(--bg-callout)',
            fontFamily: 'var(--font-data)',
            fontSize: 13,
            lineHeight: '20px',
            color: 'var(--text-body)',
          }}
        >
          UX Tools. (2026). State of Prototyping Spring 2026. https://data.prototypingstate.com. CC BY 4.0.
        </div>
      </section>

      {/* ── What's included (collapsed) ── */}
      <section style={{ marginBottom: 40 }}>
        <Disclosure title="What's in the CSV?">
          <p className="body-text" style={{ marginBottom: 8 }}>
            Summary-level aggregated tables — not individual response microdata. Each row
            represents a dimension (role, vibe tier, tool, etc.) with its count and percentage.
          </p>
          <p className="body-text">
            Multi-select questions sum to more than 100%. Cross-tab percentages are calculated
            within each role&apos;s n. The Researcher role (n=23) is directional only.
          </p>
        </Disclosure>
      </section>

      {/* ── Other ways to access ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Other ways to access</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link
            href="/api"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderRadius: 8,
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)',
              textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>REST API</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Query endpoints directly, no auth required</div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>→</span>
          </Link>
          <Link
            href="/agent"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderRadius: 8,
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)',
              textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Agent integration</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Natural language queries, LLM tool definitions</div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
