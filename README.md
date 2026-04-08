# State of Prototyping — Spring 2026

Open dataset from the State of Prototyping survey. 1,478 designers across 18 regions. Published by [UX Tools](https://uxtools.co).

**[Read the report →](https://survey.uxtools.co/explore)**

## What's here

- **Full microdata** — 1,478 individual responses, de-identified (emails/timestamps removed, rows shuffled)
- **Report** — 12-section editorial article with live charts at `/explore`
- **Summary tables** — pre-aggregated percentages and cross-tabs
- **REST API** — query endpoints at `/api/v1/*`, no auth required
- **Agent tools** — natural language query endpoint, LLM context file, tool definitions

## Key findings

1. **5 of the top 10 weekly tools are now AI.** Claude is #2 after Figma at 50.8%.
2. **43.8% spend 50%+ of building time vibe coding.** The profession has split into thirds.
3. **80.9% of design engineers vs. 35% of IC designers.** A 46-point gap in the same org.
4. **59% have built their own tool with AI** in the last 6 months.
5. **Vibe coders are 1.5 points more satisfied** with their workflow (5.9 → 7.4 out of 10).

## Quick start

```bash
# Get the data
curl https://survey.uxtools.co/api/v1/stats/vibe-by-role

# Ask a question
curl -X POST https://survey.uxtools.co/api/v1/agent/query \
  -H "Content-Type: application/json" \
  -d '{"question":"Which role vibes the most?"}'

# Download everything
curl -O https://survey.uxtools.co/api/v1/download/csv
```

## Run locally

```bash
npm install
npm run dev
```

Requires Node 18+. No database — all data lives in `public/data/*.json`.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Custom chart components (no chart library)
- PP Fraktion Mono + Space Mono + Inter
- Dark mode with system-default toggle

## Data files

All in `public/data/`. The primary dataset is `responses.csv` / `responses.json` with all 1,478 individual responses. Summary tables are pre-aggregated for chart rendering.

| File | Contents |
|---|---|
| `responses.csv` | **All 1,478 individual responses** (13 columns, de-identified) |
| `responses.json` | Same as above, JSON array |
| `tools.json` | Top 10 weekly tools (Q4) |
| `vibe-distribution.json` | Vibe coding tier breakdown (Q7) |
| `vibe-by-role.json` | 50%+ vibe coding by role (Q7×Q2) |
| `satisfaction.json` | Satisfaction by vibe tier (Q10) |
| `outlook.json` | Role outlook (Q11) |
| `role-distribution.json` | Role breakdown (Q2) |
| `company-context.json` | Work setting (Q1) |
| `built-tool.json` | Built own tool (Q8) |
| `trust-level.json` | AI trust level (Q9) |
| `blockers.json` | Workflow blockers |
| `workflow-change.json` | Workflow changes in 6 months |
| `investing-next.json` | Investment areas (Q6) |
| `headline.json` | Key headline stats |
| `full-summary.json` | All tables merged |
| `full-summary.csv` | CSV export |

## API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/responses` | **All 1,478 responses** (paginated, `?limit=100&offset=0`) |
| GET | `/api/v1/download/responses-csv` | Full response CSV download |
| GET | `/api/v1/stats/tools` | Top 10 weekly tools |
| GET | `/api/v1/stats/vibe-by-role` | Vibe coding by role |
| GET | `/api/v1/stats/satisfaction` | Satisfaction by tier |
| GET | `/api/v1/stats/outlook` | Role outlook |
| GET | `/api/v1/stats/headline` | Headline numbers |
| GET | `/api/v1/meta` | Survey metadata |
| GET | `/api/v1/download/json` | Full dataset |
| GET | `/api/v1/download/csv` | CSV export |
| POST | `/api/v1/agent/query` | Natural language query |
| GET | `/api/openapi.yaml` | OpenAPI spec |

## Agent context

For LLM system prompts: [`/agent/SURVEY_CONTEXT.md`](public/agent/SURVEY_CONTEXT.md)

```python
from langchain.tools import StructuredTool

def query_survey(question: str) -> dict:
    """Query the State of Prototyping 2026 survey. n=1,478."""
    import requests
    return requests.post(
        "https://survey.uxtools.co/api/v1/agent/query",
        json={"question": question}
    ).json()

survey_tool = StructuredTool.from_function(query_survey)
```

## License

Data: **CC BY 4.0**. Code: MIT.

**Citation:** UX Tools. (2026). State of Prototyping Spring 2026. https://survey.uxtools.co.
