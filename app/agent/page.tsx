import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { AgentQueryPlayground } from '@/components/agent/AgentQueryPlayground'
import { CodeBlock } from '@/components/common/CodeBlock'
import { CopyButton } from '@/components/common/CopyButton'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'Agents' }

export default async function AgentPage() {
  const contextMarkdown = await readFile(path.join(process.cwd(), 'public', 'agent', 'SURVEY_CONTEXT.md'), 'utf8')

  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <h1 className="page-title">For agents</h1>
        <p className="lead-text" style={{ marginBottom: 20 }}>
          Natural language queries, LLM tool definitions, context files. No auth.
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 6,
            background: 'var(--bg-callout)',
            fontFamily: 'var(--font-data)',
            fontSize: 11,
            color: 'var(--text-body)',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            /agent/SURVEY_CONTEXT.md
          </span>
          <CopyButton text="https://survey.uxtools.co/agent/SURVEY_CONTEXT.md" label="Copy" />
        </div>
      </header>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 12 }}>Try it</p>
        <AgentQueryPlayground />
      </section>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 12 }}>Integrate</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Disclosure title="LangChain tool" defaultOpen>
            <CodeBlock code={`from langchain.tools import StructuredTool

def query_survey(question: str) -> dict:
    """Query the State of Prototyping 2026 survey. n=1,478."""
    import requests
    return requests.post(
        "https://survey.uxtools.co/api/v1/agent/query",
        json={"question": question}
    ).json()

survey_tool = StructuredTool.from_function(query_survey)`} />
          </Disclosure>
          <Disclosure title="OpenAI function">
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
          <Disclosure title="cURL">
            <CodeBlock code={`curl -X POST https://survey.uxtools.co/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"Which role vibes the most?"}'`} />
          </Disclosure>
          <Disclosure title="Context file">
            <CodeBlock code={contextMarkdown} />
          </Disclosure>
        </div>
      </section>
    </>
  )
}
