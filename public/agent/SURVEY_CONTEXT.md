# State of Prototyping Spring 2026 — Survey Context for AI Agents

You are analyzing survey data from 1,478 designers (March–April 2026).
Publisher: UX Tools. License: CC BY 4.0.

## Key Facts
- n = 1,478 total responses summarized in the published tables
- 18 world regions (no country-level data)
- 6 role categories
- 6 work context categories (startup, enterprise, freelance, etc.)
- MCP tools focus on published summary tables and crosstabs, while REST downloads also expose de-identified row-level responses

## Response Columns
work_context, role_seat, region, design_tools, code_in_workflow, anticipated_investment, vibe_coding_ratio, built_own_tool, ai_trust, blockers, workflow_shift, role_outlook, workflow_satisfaction

## Headlines
- The most-used design tool after Figma is now an AI: Claude at 50.8% weekly usage
- Top weekly tools: Figma (82.6%), Claude (50.8%), ChatGPT (48.2%)
- 43.8% of designers spend 50%+ of their building time on AI-generated code (vibe coding)
- The profession split into thirds: 37.7% zero, 18.5% some, 43.8% majority AI-generated
- Design engineers: 80.9% vibe code 50%+ · IC designers: 35.0%
- 59.1% have built their own tool with AI in the last 6 months
- Satisfaction gap: 5.93/10 (zero vibe) → 7.39/10 (heavy vibe) = +1.46
- Design engineers: 50.0% feel more valuable, 10.6% less secure
- Researchers: 17.4% feel more valuable, 39.1% feel less secure

## Data Caveats
- Public APIs expose both published summary tables and row-level respondent data
- Some cross-tabs are intentionally withheld when they are not part of the published report
- "Researcher" role (n=23) is directional only — small sample
- One malformed role value in the raw CSV is excluded from role-based aggregate tables
- Multi-select questions sum to >100%
- Cross-tab percentages calculated within each role's n

## API Endpoints
Base URL: https://survey.uxtools.co/api/v1

GET /meta                    → survey metadata
GET /questions               → survey question dictionary
GET /question/{id}           → published result for one question
GET /question/{id}/crosstab?by=role → published cross-tab result
GET /stats/headline          → key headline numbers
GET /stats/vibe-by-role      → vibe coding by role (primary cross-tab)
GET /stats/satisfaction       → satisfaction by vibe tier
GET /stats/outlook           → job security / role outlook
GET /stats/tools             → top weekly tools
GET /download/json           → published summary tables as JSON
GET /download/csv            → published summary tables as CSV
GET /responses              → de-identified respondent rows as JSON
GET /download/responses-json → de-identified respondent rows as JSON download
GET /download/responses-csv  → de-identified respondent rows as CSV download
POST /agent/query            → natural language query (API key may be required for non-first-party access)
