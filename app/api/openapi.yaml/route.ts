import { cacheHeaders } from '@/lib/api/headers'

const openApiDocument = `openapi: 3.1.0
info:
  title: State of Prototyping Open Data API
  version: "1.0"
  description: Survey results from 1,478 designers (Spring 2026). CC BY 4.0.
  contact:
    name: UX Tools
    url: https://uxtools.co
servers:
  - url: https://survey.uxtools.co/api/v1
paths:
  /meta:
    get:
      summary: Survey metadata
      responses:
        "200":
          description: Metadata object
  /questions:
    get:
      summary: List all survey questions
      responses:
        "200":
          description: Question list
  /question/{id}:
    get:
      summary: Full published result for one question
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Question result
        "404":
          description: Unknown or unpublished question
  /question/{id}/crosstab:
    get:
      summary: Published cross-tab for one question
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
        - in: query
          name: by
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Cross-tab result
        "404":
          description: Cross-tab not available
  /stats/headline:
    get:
      summary: Key headline numbers
      responses:
        "200":
          description: Headline stats
  /stats/tools:
    get:
      summary: Top weekly tools
      responses:
        "200":
          description: Tool ranking
  /stats/vibe-by-role:
    get:
      summary: Vibe coding 50%+ by role
      responses:
        "200":
          description: Array of role × percentage objects
  /stats/satisfaction:
    get:
      summary: Workflow satisfaction by vibe coding tier
      responses:
        "200":
          description: Mean satisfaction per tier + overall + delta
  /stats/outlook:
    get:
      summary: Role outlook by role
      responses:
        "200":
          description: More valuable / less secure / about same metrics by role
  /download/json:
    get:
      summary: Summary tables as JSON (pre-aggregated)
      responses:
        "200":
          description: Downloadable JSON dataset
  /download/csv:
    get:
      summary: Summary tables as CSV (pre-aggregated)
      responses:
        "200":
          description: Downloadable CSV dataset
  /agent/query:
    post:
      summary: Natural-language survey query over published summary tables
      parameters:
        - in: header
          name: Authorization
          required: false
          schema:
            type: string
          description: Optional bearer token for deployments that protect non-first-party access.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                question:
                  type: string
              required: [question]
      responses:
        "200":
          description: Routed endpoint plus structured data and answer
`

export async function GET() {
  return new Response(openApiDocument, {
    headers: {
      'Content-Type': 'application/yaml; charset=utf-8',
      ...cacheHeaders,
    },
  })
}
