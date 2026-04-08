import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { AgentQueryPlayground } from '@/components/agent/AgentQueryPlayground'
import { CodeBlock } from '@/components/common/CodeBlock'
import { CopyButton } from '@/components/common/CopyButton'
import { Disclosure } from '@/components/ui/disclosure'

export const metadata = { title: 'For Agents' }

export default async function AgentPage() {
  const contextMarkdown = await readFile(path.join(process.cwd(), 'public', 'agent', 'SURVEY_CONTEXT.md'), 'utf8')

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <p className="page-eyebrow">For AI Agents & Developers</p>
        <h1 className="page-title" style={{ marginBottom: 12 }}>Agent-ready dataset</h1>
        <p className="lead-text" style={{ marginBottom: 24 }}>
          Query in natural language, integrate as an LLM tool, or load the context file
          into any model. No auth required.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 8,
            background: 'var(--bg-callout)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 12,
              color: 'var(--text-body)',
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            /agent/SURVEY_CONTEXT.md
          </span>
          <CopyButton text="https://data.prototypingstate.com/agent/SURVEY_CONTEXT.md" label="Copy" />
        </div>
      </header>

      {/* ── Playground (always visible, primary action) ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Try it</h2>
        <AgentQueryPlayground />
      </section>

      {/* ── Integration snippets (progressive disclosure) ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Integrate</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Disclosure title="LangChain / LlamaIndex tool" defaultOpen>
            <CodeBlock code={`from langchain.tools import StructuredTool

def query_survey(question: str) -> dict:
    """Query the State of Prototyping 2026 survey data.
    1,478 designers. Vibe coding, AI tools, satisfaction, role outlook."""
    import requests
    r = requests.post(
        "https://data.prototypingstate.com/api/v1/agent/query",
        json={"question": question}
    )
    return r.json()

survey_tool = StructuredTool.from_function(query_survey)`} />
          </Disclosure>

          <Disclosure title="OpenAI function definition">
            <CodeBlock code={`{
  "name": "query_prototyping_survey",
  "description": "Query the State of Prototyping Spring 2026 survey. 1,478 designers. Data on vibe coding, AI tools, satisfaction, role outlook. CC BY 4.0.",
  "parameters": {
    "type": "object",
    "properties": {
      "question": {
        "type": "string",
        "description": "Natural language question about the survey data"
      }
    },
    "required": ["question"]
  }
}`} />
          </Disclosure>

          <Disclosure title="cURL — direct query">
            <CodeBlock code={`# Natural language query
curl -X POST https://data.prototypingstate.com/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"Which role vibes the most?"}'

# Structured endpoint
curl https://data.prototypingstate.com/api/v1/stats/vibe-by-role`} />
          </Disclosure>

          <Disclosure title="Python — pandas">
            <CodeBlock code={`import pandas as pd

url = "https://data.prototypingstate.com/api/v1/download/json"
data = pd.read_json(url)
vibe = pd.DataFrame(data["vibe_by_role"]["data"])
print(vibe.sort_values("pct", ascending=False))`} />
          </Disclosure>
        </div>
      </section>

      {/* ── Context file (collapsed by default) ── */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Context file</h2>
        <p className="body-text" style={{ marginBottom: 12 }}>
          Load this into your LLM&apos;s system prompt so it understands the dataset before querying.
        </p>
        <Disclosure title="SURVEY_CONTEXT.md — full contents">
          <CodeBlock code={contextMarkdown} />
        </Disclosure>
      </section>
    </>
  )
}
