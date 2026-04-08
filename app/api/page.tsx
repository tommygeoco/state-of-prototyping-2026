import Link from 'next/link'

import { CodeBlock } from '@/components/common/CodeBlock'
import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'API Docs' }

const endpoints = [
  { method: 'GET', path: '/api/v1/meta', desc: 'Survey metadata' },
  { method: 'GET', path: '/api/v1/questions', desc: 'All questions with types' },
  { method: 'GET', path: '/api/v1/stats/headline', desc: 'Key headline numbers' },
  { method: 'GET', path: '/api/v1/stats/tools', desc: 'Top 10 weekly tools' },
  { method: 'GET', path: '/api/v1/stats/vibe-by-role', desc: '50%+ vibe coding by role' },
  { method: 'GET', path: '/api/v1/stats/satisfaction', desc: 'Satisfaction by vibe tier' },
  { method: 'GET', path: '/api/v1/stats/outlook', desc: 'Role outlook' },
  { method: 'GET', path: '/api/v1/download/csv', desc: 'Download summary CSV' },
  { method: 'GET', path: '/api/v1/download/json', desc: 'Download full JSON' },
  { method: 'POST', path: '/api/v1/agent/query', desc: 'Natural-language query' },
]

export default function ApiDocsPage() {
  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <p className="page-eyebrow">Open Data API</p>
        <h1 className="page-title" style={{ marginBottom: 12 }}>Query the dataset</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          RESTful endpoints serving the same JSON that powers the report charts.
          No auth required. CC BY 4.0.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button asChild variant="outline" size="sm">
            <a href="/api/openapi.yaml">OpenAPI YAML</a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/agent">Agent integrations →</Link>
          </Button>
        </div>
      </header>

      {/* ── Endpoint table ── */}
      <section style={{ marginBottom: 40 }}>
        <div
          style={{
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            background: 'var(--bg-card)',
            overflow: 'hidden',
          }}
        >
          {endpoints.map((ep, i) => (
            <div
              key={ep.path}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                padding: '12px 20px',
                borderTop: i > 0 ? '1px solid var(--border-grid)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: ep.method === 'POST' ? '#C9624D' : 'var(--text-secondary)',
                  width: 40,
                  flexShrink: 0,
                }}
              >
                {ep.method}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  flex: 1,
                  minWidth: 0,
                  wordBreak: 'break-all',
                }}
              >
                {ep.path}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                }}
              >
                {ep.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick start examples (progressive disclosure) ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Quick start</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Disclosure title="cURL — fetch vibe coding by role" defaultOpen>
            <CodeBlock code={`curl https://data.prototypingstate.com/api/v1/stats/vibe-by-role`} />
          </Disclosure>

          <Disclosure title="cURL — natural language query">
            <CodeBlock code={`curl -X POST https://data.prototypingstate.com/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What percentage of design engineers vibe code?"}'`} />
          </Disclosure>

          <Disclosure title="JavaScript — fetch and parse">
            <CodeBlock code={`const res = await fetch('https://data.prototypingstate.com/api/v1/stats/tools')
const data = await res.json()
console.log(data.data[0]) // { tool: "Figma", n: 1221, pct: 82.6 }`} />
          </Disclosure>

          <Disclosure title="Python — load into pandas">
            <CodeBlock code={`import pandas as pd

url = "https://data.prototypingstate.com/api/v1/download/json"
data = pd.read_json(url)
vibe = pd.DataFrame(data["vibe_by_role"]["data"])
print(vibe.sort_values("pct", ascending=False))`} />
          </Disclosure>
        </div>
      </section>

      {/* ── Response example ── */}
      <section style={{ marginBottom: 40 }}>
        <Disclosure title="Example response — /api/v1/stats/vibe-by-role">
          <CodeBlock code={`{
  "question": "Q7 × Q2 cross-tab — Vibe coding 50%+ by role",
  "n_total": 1478,
  "metric": "pct_spending_50pct_plus_on_vibe_coding",
  "data": [
    { "role": "Design Engineer", "n": 94, "pct": 80.9 },
    { "role": "Lead / Principal", "n": 280, "pct": 56.8 },
    { "role": "Non-designer", "n": 57, "pct": 50.9 },
    { "role": "Manager/Director", "n": 161, "pct": 46.6 },
    { "role": "IC Designer", "n": 862, "pct": 35.0 },
    { "role": "Researcher", "n": 23, "pct": 26.1 }
  ]
}`} />
        </Disclosure>
      </section>
    </>
  )
}
