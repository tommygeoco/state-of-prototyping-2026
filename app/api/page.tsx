import { CodeBlock } from '@/components/common/CodeBlock'
import { PageSection } from '@/components/layout/PageSection'

export const metadata = { title: 'API Docs' }

const endpoints = [
  ['GET', '/api/v1/meta', 'Survey metadata (n, period, fields)'],
  ['GET', '/api/v1/questions', 'List of all questions with types'],
  ['GET', '/api/v1/question/:id', 'Full published result for one question'],
  ['GET', '/api/v1/question/:id/crosstab?by=role', 'Cross-tab for Q7 by role'],
  ['GET', '/api/v1/stats/headline', 'Key headline numbers'],
  ['GET', '/api/v1/stats/tools', 'Top weekly tools list'],
  ['GET', '/api/v1/stats/vibe-by-role', '50%+ vibe coding by role'],
  ['GET', '/api/v1/stats/satisfaction', 'Workflow satisfaction by vibe tier'],
  ['GET', '/api/v1/stats/outlook', 'Role outlook by role'],
  ['GET', '/api/v1/download/csv', 'Full summary CSV'],
  ['GET', '/api/v1/download/json', 'Full summary JSON'],
  ['POST', '/api/v1/agent/query', 'Natural-language query route'],
]

const curlExamples = `# Get vibe coding breakdown by role
curl https://data.prototypingstate.com/api/v1/stats/vibe-by-role

# Ask a natural language question
curl -X POST https://data.prototypingstate.com/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What percentage of design engineers vibe code?"}'`

export default function ApiDocsPage() {
  return (
    <>
      <section style={{ marginBottom: 64 }}>
        <p className="page-eyebrow" style={{ marginBottom: 16 }}>API</p>
        <h1 className="page-title" style={{ marginBottom: 24 }}>Open Data API</h1>
        <p className="lead-text">
          The runtime API mirrors the static dataset. Every chart, download, and agent workflow
          reads from the same published summary tables.
        </p>
      </section>

      <PageSection eyebrow="Reference" title="Endpoints">
        <div className="chart-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Method', 'Path', 'Description'].map((header) => (
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
              {endpoints.map(([method, path, description]) => (
                <tr key={path} style={{ borderTop: '1px solid var(--border-grid)' }}>
                  <td style={{ fontFamily: 'var(--font-data)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', paddingBlock: 12, paddingRight: 16 }}>{method}</td>
                  <td style={{ fontFamily: 'var(--font-data)', fontSize: 13, color: 'var(--text-body)', paddingBlock: 12, paddingRight: 16 }}>{path}</td>
                  <td style={{ fontSize: 14, color: 'var(--text-body)', paddingBlock: 12 }}>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 16 }}>
          <a href="/api/openapi.yaml" className="button-secondary">View OpenAPI YAML</a>
        </div>
      </PageSection>

      <PageSection eyebrow="Quickstart" title="cURL examples">
        <CodeBlock code={curlExamples} />
      </PageSection>
    </>
  )
}
