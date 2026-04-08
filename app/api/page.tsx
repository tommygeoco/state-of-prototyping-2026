import Link from 'next/link'

import { CodeBlock } from '@/components/common/CodeBlock'
import { Button } from '@/components/ui/button'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'API' }

const endpoints = [
  { method: 'GET', path: '/api/v1/stats/tools', desc: 'Top 10 weekly tools' },
  { method: 'GET', path: '/api/v1/stats/vibe-by-role', desc: 'Vibe coding by role' },
  { method: 'GET', path: '/api/v1/stats/satisfaction', desc: 'Satisfaction by tier' },
  { method: 'GET', path: '/api/v1/stats/outlook', desc: 'Role outlook' },
  { method: 'GET', path: '/api/v1/stats/headline', desc: 'Headline numbers' },
  { method: 'GET', path: '/api/v1/meta', desc: 'Survey metadata' },
  { method: 'GET', path: '/api/v1/questions', desc: 'Question list' },
  { method: 'GET', path: '/api/v1/download/json', desc: 'Full dataset' },
  { method: 'GET', path: '/api/v1/download/csv', desc: 'CSV export' },
  { method: 'POST', path: '/api/v1/agent/query', desc: 'Natural language' },
]

export default function ApiDocsPage() {
  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">API</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          No auth. Same JSON as the charts. CC BY 4.0.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button asChild variant="outline" size="sm"><a href="/api/openapi.yaml">OpenAPI spec</a></Button>
          <Button asChild variant="outline" size="sm"><Link href="/agent">Agent tools →</Link></Button>
        </div>
      </header>

      <hr className="section-divider" />

      <div style={{ marginBottom: 48 }}>
        {endpoints.map((ep, i) => (
          <div
            key={ep.path}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              padding: '8px 0',
              borderBottom: i < endpoints.length - 1 ? '1px solid var(--border-grid)' : 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 10,
                fontWeight: 700,
                color: ep.method === 'POST' ? 'var(--bar-1)' : 'var(--text-secondary)',
                width: 32,
                flexShrink: 0,
              }}
            >
              {ep.method}
            </span>
            <span style={{ fontFamily: 'var(--font-data)', fontSize: 12, color: 'var(--text-primary)', flex: 1, minWidth: 0 }}>
              {ep.path}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{ep.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Disclosure title="cURL" defaultOpen>
          <CodeBlock code={`curl https://data.prototypingstate.com/api/v1/stats/vibe-by-role`} />
        </Disclosure>
        <Disclosure title="Natural language query">
          <CodeBlock code={`curl -X POST https://data.prototypingstate.com/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What percentage of design engineers vibe code?"}'`} />
        </Disclosure>
        <Disclosure title="JavaScript">
          <CodeBlock code={`const data = await fetch('https://data.prototypingstate.com/api/v1/stats/tools').then(r => r.json())
console.log(data.data[0]) // { tool: "Figma", n: 1221, pct: 82.6 }`} />
        </Disclosure>
        <Disclosure title="Python">
          <CodeBlock code={`import pandas as pd
data = pd.read_json("https://data.prototypingstate.com/api/v1/download/json")
print(pd.DataFrame(data["vibe_by_role"]["data"]).sort_values("pct", ascending=False))`} />
        </Disclosure>
        <Disclosure title="Example response">
          <CodeBlock code={`{
  "question": "Q7 × Q2 cross-tab — Vibe coding 50%+ by role",
  "n_total": 1478,
  "data": [
    { "role": "Design Engineer", "n": 94, "pct": 80.9 },
    { "role": "Lead / Principal", "n": 280, "pct": 56.8 },
    { "role": "IC Designer", "n": 862, "pct": 35.0 }
  ]
}`} />
        </Disclosure>
      </div>
    </>
  )
}
