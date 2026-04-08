import { CodeBlock } from '@/components/common/CodeBlock'
import { PageSection } from '@/components/layout/PageSection'

export const metadata = {
  title: 'API Docs',
}

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
    <PageSection
      eyebrow="API"
      title="Open Data API"
      intro="The runtime API mirrors the static dataset and keeps every chart, download, and agent workflow aligned with the same published summary tables."
    >
      <div className="space-y-8">
        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
              Endpoints
            </h3>
            <a href="/api/openapi.yaml" className="button-secondary">
              View OpenAPI YAML
            </a>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-text-body">
              <thead>
                <tr className="text-text-secondary">
                  <th className="pr-6">Method</th>
                  <th className="pr-6">Path</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map(([method, path, description]) => (
                  <tr key={path}>
                    <td className="pr-6 font-data text-text-primary">{method}</td>
                    <td className="pr-6 font-data text-text-primary">{path}</td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">cURL quickstart</h3>
          <div className="mt-5">
            <CodeBlock code={curlExamples} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
            Notes for builders
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-text-body">
            <li>All API payloads are sourced from the same files exposed in `/public/data`.</li>
            <li>The v1 agent route uses keyword matching rather than an LLM so its output shape stays deterministic.</li>
            <li>The `question/:id/crosstab` endpoint only publishes the Q7 by role cross-tab in v1.</li>
          </ul>
        </div>
      </div>
    </PageSection>
  )
}
