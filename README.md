# State of Prototyping — Spring 2026

Open dataset from the State of Prototyping survey. 1,478 designers across 18 regions. Published by [UX Tools](https://uxtools.co).

This project has three jobs: publish the canonical report, expose the published summary data and API, and package the strongest findings as shareable chart bites.

**[Read the report →](https://survey.uxtools.co/spring-2026)**

## What's here

- **Report** — 12-section editorial article with live charts at `/spring-2026`
- **Summary tables** — pre-aggregated percentages and cross-tabs
- **Shareable bites** — chart anchors and PNG exports for the findings that travel
- **REST API** — public summary endpoints, question lookups, and row-level downloads at `/api/v1/*`
- **Agent tools** — natural language query endpoint, LLM context file, tool definitions

## Key findings

1. **5 of the top 10 weekly tools are now AI.** Claude is #2 after Figma at 50.8%.
2. **43.8% spend 50%+ of their building time vibe coding.** The profession has split into thirds.
3. **80.9% of design engineers vs. 35.0% of IC designers.** A 45.9-point gap in the same org.
4. **59.1% have built their own tool with AI** in the last 6 months.
5. **Vibe coders are 1.46 points more satisfied** with their workflow (5.93 → 7.39 out of 10).

## Quick start

```bash
# Get the data
curl https://survey.uxtools.co/api/v1/stats/vibe-by-role

# Ask a question
curl -X POST https://survey.uxtools.co/api/v1/agent/query \
  -H "Content-Type: application/json" \
  -d '{"question":"Which role vibes the most?"}'

# Download the published summary tables
curl -O https://survey.uxtools.co/api/v1/download/csv

# Download the de-identified respondent CSV
curl -O https://survey.uxtools.co/api/v1/download/responses-csv
```

## Run locally

```bash
npm install
npm run dev
```

Requires Node 18+. No database — all data lives in `public/data/*`.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS + shadcn/ui
- Custom chart components (no chart library)
- PP Fraktion Mono + Space Mono + Inter
- Dark mode with system-default toggle

## Data files

All in `public/data/`. This includes the published summary-table set used to render the report charts, plus the de-identified respondent-level exports.

| File | Contents |
|---|---|
| `tools.json` | Top 10 weekly tools (Q4) |
| `vibe-distribution.json` | Vibe coding tier breakdown (Q7) |
| `vibe-by-role.json` | 50%+ vibe coding by role (Q7×Q2) |
| `satisfaction.json` | Satisfaction by vibe tier (Q10) |
| `outlook.json` | Role outlook (Q11) |
| `role-distribution.json` | Role breakdown (Q2) |
| `region-distribution.json` | Region breakdown (Q3) |
| `company-context.json` | Work setting (Q1) |
| `built-tool.json` | Built own tool (Q8) |
| `trust-level.json` | AI trust level (Q9) |
| `blockers.json` | Workflow blockers |
| `workflow-change.json` | Workflow changes in 6 months |
| `workflow-change-by-company.json` | AI-central workflow shift by company context |
| `investing-next.json` | Investment areas (Q6) |
| `headline.json` | Key headline stats |
| `meta.json` | Survey metadata |
| `questions.json` | Published question dictionary |
| `full-summary.json` | All tables merged |
| `full-summary.csv` | CSV export |
| `responses.json` | De-identified respondent-level JSON export |
| `responses.csv` | De-identified respondent-level CSV export |

## API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/questions` | Survey question dictionary |
| GET | `/api/v1/question/{id}` | Published result for one question |
| GET | `/api/v1/question/{id}/crosstab?by=role` | Published cross-tab result |
| GET | `/api/v1/stats/tools` | Top 10 weekly tools |
| GET | `/api/v1/stats/vibe-by-role` | Vibe coding by role |
| GET | `/api/v1/stats/satisfaction` | Satisfaction by tier |
| GET | `/api/v1/stats/outlook` | Role outlook |
| GET | `/api/v1/stats/headline` | Headline numbers |
| GET | `/api/v1/meta` | Survey metadata |
| GET | `/api/v1/download/json` | Full summary tables JSON |
| GET | `/api/v1/download/csv` | Full summary tables CSV |
| GET | `/api/v1/responses` | Row-level response JSON |
| GET | `/api/v1/download/responses-json` | Row-level response JSON download |
| GET | `/api/v1/download/responses-csv` | Row-level response CSV download |
| POST | `/api/v1/agent/query` | Natural language query over the published summary tables |
| GET | `/api/openapi.yaml` | OpenAPI spec |

## Agent context

For LLM system prompts: [`/agent/SURVEY_CONTEXT.md`](public/agent/SURVEY_CONTEXT.md)

```python
from langchain.tools import StructuredTool

def query_survey(question: str) -> dict:
    """Query the State of Prototyping 2026 summary API."""
    import requests
    headers = {"Content-Type": "application/json"}
    # Add Authorization only if your deployment protects non-first-party access.
    # headers["Authorization"] = "Bearer YOUR_API_KEY"
    return requests.post(
        "https://survey.uxtools.co/api/v1/agent/query",
        json={"question": question},
        headers=headers
    ).json()

survey_tool = StructuredTool.from_function(query_survey)
```

## License

Data: **CC BY 4.0**. Code: MIT.

**Citation:** UX Tools. (2026). State of Prototyping Spring 2026. https://survey.uxtools.co.
