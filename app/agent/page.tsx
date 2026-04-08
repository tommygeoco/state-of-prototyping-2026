import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { AgentQueryPlayground } from '@/components/agent/AgentQueryPlayground'
import { CodeBlock } from '@/components/common/CodeBlock'
import { CopyButton } from '@/components/common/CopyButton'
import { PageSection } from '@/components/layout/PageSection'

export const metadata = { title: 'For Agents' }

const curlSnippet = `# Get vibe coding breakdown by role
curl https://data.prototypingstate.com/api/v1/stats/vibe-by-role

# Ask a natural language question
curl -X POST https://data.prototypingstate.com/api/v1/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What percentage of design engineers vibe code?"}'`

const pythonSnippet = `import pandas as pd

url = "https://data.prototypingstate.com/api/v1/download/json"
data = pd.read_json(url)

vibe = pd.DataFrame(data["vibe_by_role"]["data"])
print(vibe.sort_values("pct", ascending=False))`

const langChainSnippet = `from langchain.tools import StructuredTool

def query_survey(question: str) -> dict:
    """Query the State of Prototyping 2026 survey data."""
    import requests
    r = requests.post(
        "https://data.prototypingstate.com/api/v1/agent/query",
        json={"question": question}
    )
    return r.json()

survey_tool = StructuredTool.from_function(query_survey)`

const openAiSnippet = `{
  "name": "query_prototyping_survey",
  "description": "Query the State of Prototyping Spring 2026 survey.",
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
}`

export default async function AgentPage() {
  const contextMarkdown = await readFile(path.join(process.cwd(), 'public', 'agent', 'SURVEY_CONTEXT.md'), 'utf8')

  return (
    <>
      <section style={{ marginBottom: 64 }}>
        <p className="page-eyebrow" style={{ marginBottom: 16 }}>For AI Agents & Developers</p>
        <h1 className="page-title" style={{ marginBottom: 24 }}>Agent-ready dataset</h1>
        <p className="lead-text" style={{ marginBottom: 32 }}>
          Query the survey in natural language, integrate it as a tool, or load the context
          file into any LLM before calling the structured endpoints.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: 13, color: 'var(--text-body)' }}>
            https://data.prototypingstate.com/agent/SURVEY_CONTEXT.md
          </span>
          <CopyButton text="https://data.prototypingstate.com/agent/SURVEY_CONTEXT.md" label="Copy URL" />
        </div>
      </section>

      <PageSection eyebrow="Playground" title="Natural Language Query">
        <AgentQueryPlayground />
      </PageSection>

      <PageSection eyebrow="Integration" title="LangChain Tool">
        <CodeBlock code={langChainSnippet} />
      </PageSection>

      <PageSection eyebrow="Integration" title="OpenAI Function Definition">
        <CodeBlock code={openAiSnippet} />
      </PageSection>

      <PageSection eyebrow="Integration" title="cURL">
        <CodeBlock code={curlSnippet} />
      </PageSection>

      <PageSection eyebrow="Integration" title="Python + pandas">
        <CodeBlock code={pythonSnippet} />
      </PageSection>

      <PageSection eyebrow="Reference" title="Context File (Inline)">
        <CodeBlock code={contextMarkdown} />
      </PageSection>
    </>
  )
}
