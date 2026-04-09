#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'public', 'data')
const agentDir = join(__dirname, 'public', 'agent')

async function readJson(dir, file) {
  return JSON.parse(await readFile(join(dir, file), 'utf8'))
}

const server = new McpServer({
  name: 'state-of-prototyping-2026',
  version: '1.0.0',
})

// ── Tools ──

server.tool('get_survey_meta', 'Survey metadata: sample size, regions, methodology, license', {}, async () => {
  const data = await readJson(dataDir, 'meta.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_headline_stats', 'Key headline numbers from the survey', {}, async () => {
  const data = await readJson(dataDir, 'headline.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_tool_rankings', 'Top weekly tools used by designers, ranked by usage %', {}, async () => {
  const data = await readJson(dataDir, 'tools.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_vibe_coding_by_role', 'Vibe coding adoption (50%+ AI-generated code) broken down by role', {}, async () => {
  const data = await readJson(dataDir, 'vibe-by-role.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_vibe_distribution', 'Distribution of vibe coding levels across all respondents', {}, async () => {
  const data = await readJson(dataDir, 'vibe-distribution.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_satisfaction', 'Workflow satisfaction (1-10 scale) by vibe coding tier, with overall mean and delta', {}, async () => {
  const data = await readJson(dataDir, 'satisfaction.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_role_outlook', 'How each role feels about AI impact: more valuable, less secure, or about the same', {}, async () => {
  const data = await readJson(dataDir, 'outlook.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_blockers', 'Top workflow blockers reported by designers', {}, async () => {
  const data = await readJson(dataDir, 'blockers.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_trust_levels', 'How far designers trust AI-generated output', {}, async () => {
  const data = await readJson(dataDir, 'trust-level.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_workflow_change', 'How workflows have changed in the last 6 months', {}, async () => {
  const data = await readJson(dataDir, 'workflow-change.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_investing_next', 'Where designers are investing their time in the next 12 months', {}, async () => {
  const data = await readJson(dataDir, 'investing-next.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_built_tool', 'Have designers built their own tool with AI?', {}, async () => {
  const data = await readJson(dataDir, 'built-tool.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_region_distribution', 'Respondent distribution by world region', {}, async () => {
  const data = await readJson(dataDir, 'region-distribution.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool('get_company_context', 'Respondent distribution by company size / work setting', {}, async () => {
  const data = await readJson(dataDir, 'company-context.json')
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
})

server.tool(
  'get_question',
  'Get the full published result for a specific survey question by ID (Q1-Q11)',
  { question_id: z.string().describe('Question ID, e.g. Q1, Q4, Q7') },
  async ({ question_id }) => {
    const map = {
      Q1: 'company-context.json', Q2: 'role-distribution.json', Q3: 'region-distribution.json',
      Q4: 'tools.json', Q6: 'investing-next.json', Q7: 'vibe-distribution.json',
      Q8: 'built-tool.json', Q9: 'trust-level.json', Q10: 'satisfaction.json', Q11: 'outlook.json',
    }
    const file = map[question_id.toUpperCase()]
    if (!file) {
      return { content: [{ type: 'text', text: `Unknown question ID: ${question_id}. Available: ${Object.keys(map).join(', ')}` }] }
    }
    const data = await readJson(dataDir, file)
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
  },
)

server.tool(
  'get_full_summary',
  'All published summary tables in one response. Large payload — use specific tools when possible.',
  {},
  async () => {
    const data = await readJson(dataDir, 'full-summary.json')
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
  },
)

server.tool(
  'search_data',
  'Search across all summary tables for a keyword. Returns matching entries from every dataset.',
  { query: z.string().describe('Keyword to search for, e.g. "Claude", "Researcher", "Startup"') },
  async ({ query }) => {
    const lower = query.toLowerCase()
    const files = [
      'tools.json', 'vibe-by-role.json', 'vibe-distribution.json', 'satisfaction.json',
      'outlook.json', 'blockers.json', 'trust-level.json', 'workflow-change.json',
      'investing-next.json', 'built-tool.json', 'region-distribution.json',
      'company-context.json', 'workflow-change-by-company.json',
    ]
    const results = []
    for (const file of files) {
      const data = await readJson(dataDir, file)
      const matches = data.data?.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(lower)
      )
      if (matches?.length) {
        results.push({ source: file.replace('.json', ''), question: data.question, matches })
      }
    }
    if (results.length === 0) {
      return { content: [{ type: 'text', text: `No matches found for "${query}".` }] }
    }
    return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] }
  },
)

// ── Resources ──

server.resource('survey-context', 'survey://context', { description: 'Survey context document for LLM grounding', mimeType: 'text/markdown' }, async () => {
  const text = await readFile(join(agentDir, 'SURVEY_CONTEXT.md'), 'utf8')
  return { contents: [{ uri: 'survey://context', text, mimeType: 'text/markdown' }] }
})

server.resource('survey-questions', 'survey://questions', { description: 'All survey questions with IDs and types', mimeType: 'application/json' }, async () => {
  const data = await readJson(dataDir, 'questions.json')
  return { contents: [{ uri: 'survey://questions', text: JSON.stringify(data, null, 2), mimeType: 'application/json' }] }
})

// ── Start ──

const transport = new StdioServerTransport()
await server.connect(transport)
