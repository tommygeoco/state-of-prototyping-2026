import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { AgentQueryPlayground } from '@/components/agent/AgentQueryPlayground'
import { CodeBlock } from '@/components/common/CodeBlock'
import { CopyButton } from '@/components/common/CopyButton'
import { PageSection } from '@/components/layout/PageSection'

export const metadata = {
  title: 'For Agents',
}

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
  "description": "Query the State of Prototyping Spring 2026 survey. 1,478 designers. Data on vibe coding adoption, AI tool usage, workflow satisfaction, role outlooks. CC BY 4.0.",
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
    <PageSection
      eyebrow="For AI Agents & Developers"
      title="Agent-ready dataset"
      intro="Query the survey in natural language, integrate it as a tool, or load the context file into an LLM before calling the structured endpoints."
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-6 py-5">
          <div className="text-sm text-text-body">Context file URL: https://data.prototypingstate.com/agent/SURVEY_CONTEXT.md</div>
          <CopyButton text="https://data.prototypingstate.com/agent/SURVEY_CONTEXT.md" label="Copy context file URL" />
        </div>

        <AgentQueryPlayground />

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">LangChain Tool</div>
          <div className="mt-5">
            <CodeBlock code={langChainSnippet} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
            OpenAI Function Definition
          </div>
          <div className="mt-5">
            <CodeBlock code={openAiSnippet} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">cURL</div>
          <div className="mt-5">
            <CodeBlock code={curlSnippet} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">Python + pandas</div>
          <div className="mt-5">
            <CodeBlock code={pythonSnippet} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
            Context File (Inline)
          </div>
          <div className="mt-5">
            <CodeBlock code={contextMarkdown} />
          </div>
        </div>
      </div>
    </PageSection>
  )
}
