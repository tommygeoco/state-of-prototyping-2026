# State of Prototyping Spring 2026 — Survey Context for AI Agents

You are analyzing survey data from 1,478 designers (March–April 2026).
Publisher: UX Tools. License: CC BY 4.0.

## Key Facts
- n = 1,478 total responses
- 18 world regions (no country-level data)
- 6 role categories
- 6 work context categories (startup, enterprise, freelance, etc.)

## Headlines
- 43.8% of designers spend 50%+ of output time on AI-generated code (vibe coding)
- Design engineers: 80.9% vibe code 50%+ · IC designers: 35.0%
- 46-point gap between those two roles
- Satisfaction gap: 5.93/10 (zero vibe) → 7.39/10 (heavy vibe) = +1.46
- 59.0% have built a custom tool with AI-generated code
- 63.1% use AI or no-code to generate code in their workflow
- Top weekly tools: Figma (82.6%), Claude (50.8%), ChatGPT (48.2%)

## Data Caveats
- No individual microdata is published (privacy)
- "Researcher" role (n=23) is directional only — small sample
- Multi-select questions sum to >100%
- Cross-tab percentages calculated within each role's n

## API Endpoints
Base URL: https://data.prototypingstate.com/api/v1

GET /meta                    → survey metadata
GET /stats/headline          → key headline numbers
GET /stats/vibe-by-role      → vibe coding by role (primary cross-tab)
GET /stats/satisfaction      → satisfaction by vibe tier
GET /stats/outlook           → job security / role outlook
GET /stats/tools             → top weekly tools
GET /download/json           → full dataset
