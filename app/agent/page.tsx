import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { AgentQueryPlayground } from '@/components/agent/AgentQueryPlayground'
import { CodeBlock } from '@/components/common/CodeBlock'
import { CopyButton } from '@/components/common/CopyButton'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'Agents' }

const mcpConfig = `{
  "mcpServers": {
    "state-of-prototyping": {
      "command": "npx",
      "args": ["-y", "state-of-prototyping-mcp"]
    }
  }
}`

const cursorConfig = `{
  "mcpServers": {
    "state-of-prototyping": {
      "command": "npx",
      "args": ["-y", "state-of-prototyping-mcp"]
    }
  }
}`

const tools = [
  { name: 'get_survey_meta', desc: 'Sample size, regions, methodology, license' },
  { name: 'get_headline_stats', desc: 'Key headline numbers' },
  { name: 'get_tool_rankings', desc: 'Top weekly tools, ranked by usage %' },
  { name: 'get_vibe_coding_by_role', desc: 'Vibe coding 50%+ adoption by role' },
  { name: 'get_vibe_distribution', desc: 'Vibe coding levels across all respondents' },
  { name: 'get_satisfaction', desc: 'Workflow satisfaction (1-10) by vibe tier' },
  { name: 'get_role_outlook', desc: 'More valuable / less secure / about same by role' },
  { name: 'get_blockers', desc: 'Top workflow blockers' },
  { name: 'get_trust_levels', desc: 'AI trust levels' },
  { name: 'get_workflow_change', desc: 'Workflow changes in last 6 months' },
  { name: 'get_investing_next', desc: 'Investment areas for next 12 months' },
  { name: 'get_built_tool', desc: 'Have designers built their own AI tool?' },
  { name: 'get_region_distribution', desc: 'Respondents by world region' },
  { name: 'get_company_context', desc: 'Respondents by company size' },
  { name: 'get_question', desc: 'Published result for a question by ID (Q1-Q11)' },
  { name: 'get_full_summary', desc: 'All published tables in one payload' },
  { name: 'search_data', desc: 'Keyword search across all datasets' },
]

export default async function AgentPage() {
  const contextMarkdown = await readFile(path.join(process.cwd(), 'public', 'agent', 'SURVEY_CONTEXT.md'), 'utf8')

  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">Connect your agent</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          17 tools, 2 resources, zero cost. Give any MCP-compatible agent
          direct access to the full State of Prototyping dataset.
        </p>

        <div
          style={{
            background: 'var(--bg-callout)',
            borderRadius: 8,
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}
            >
              Add to your MCP config
            </span>
            <CopyButton text={mcpConfig} label="Copy" />
          </div>
          <CodeBlock code={mcpConfig} />
        </div>
      </header>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Available tools</h2>
        <p className="body-text" style={{ marginBottom: 20 }}>
          Your agent can call any of these. Each returns structured JSON from the published survey data.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{
                padding: '10px 14px',
                borderRadius: 6,
                border: '1px solid var(--border-card)',
                background: 'var(--bg-card)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 2,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: '18px',
                }}
              >
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Try it</h2>
        <AgentQueryPlayground />
      </section>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Other ways to connect</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Disclosure title="Cursor / Windsurf config">
            <CodeBlock code={cursorConfig} />
          </Disclosure>
          <Disclosure title="REST API (cURL)">
            <CodeBlock code={`# Get headline stats
curl https://survey.uxtools.co/api/v1/stats/headline

# Get tool rankings
curl https://survey.uxtools.co/api/v1/stats/tools

# Get vibe coding by role
curl https://survey.uxtools.co/api/v1/stats/vibe-by-role

# All endpoints listed at /api`} />
          </Disclosure>
          <Disclosure title="OpenAI function definition">
            <CodeBlock code={`{
  "name": "query_prototyping_survey",
  "description": "State of Prototyping Spring 2026. 1,478 designers. Vibe coding, AI tools, satisfaction, role outlook.",
  "parameters": {
    "type": "object",
    "properties": { "question": { "type": "string" } },
    "required": ["question"]
  }
}`} />
          </Disclosure>
          <Disclosure title="Context file (for RAG / system prompts)">
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-data)',
                  fontSize: 13,
                  color: 'var(--text-body)',
                  marginBottom: 8,
                }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  https://survey.uxtools.co/agent/SURVEY_CONTEXT.md
                </span>
                <CopyButton text="https://survey.uxtools.co/agent/SURVEY_CONTEXT.md" label="Copy" />
              </div>
            </div>
            <CodeBlock code={contextMarkdown} />
          </Disclosure>
        </div>
      </section>
    </>
  )
}
