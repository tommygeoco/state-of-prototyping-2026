import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

import type {
  AgentContext,
  FullSummaryResponse,
  HeadlineResponse,
  OutlookResponse,
  QuestionsResponse,
  RoleDistributionResponse,
  SatisfactionResponse,
  SurveyMeta,
  ToolsResponse,
  VibeByRoleResponse,
  VibeDistributionResponse,
} from '@/lib/data/schema'

const dataDir = path.join(process.cwd(), 'public', 'data')
const agentDir = path.join(process.cwd(), 'public', 'agent')

async function readJson<T>(directory: string, fileName: string): Promise<T> {
  const contents = await readFile(path.join(directory, fileName), 'utf8')
  return JSON.parse(contents) as T
}

export const loadMeta = cache(() => readJson<SurveyMeta>(dataDir, 'meta.json'))

export const loadQuestions = cache(() => readJson<QuestionsResponse>(dataDir, 'questions.json'))

export const loadHeadline = cache(() => readJson<HeadlineResponse>(dataDir, 'headline.json'))

export const loadRoleDistribution = cache(() =>
  readJson<RoleDistributionResponse>(dataDir, 'role-distribution.json'),
)

export const loadVibeDistribution = cache(() =>
  readJson<VibeDistributionResponse>(dataDir, 'vibe-distribution.json'),
)

export const loadVibeByRole = cache(() => readJson<VibeByRoleResponse>(dataDir, 'vibe-by-role.json'))

export const loadSatisfaction = cache(() =>
  readJson<SatisfactionResponse>(dataDir, 'satisfaction.json'),
)

export const loadOutlook = cache(() => readJson<OutlookResponse>(dataDir, 'outlook.json'))

export const loadTools = cache(() => readJson<ToolsResponse>(dataDir, 'tools.json'))

interface SimpleBarData {
  question: string
  n: number
  data: { label: string; pct: number }[]
}

export const loadCompanyContext = cache(() =>
  readJson<SimpleBarData>(dataDir, 'company-context.json'),
)

export const loadBuiltTool = cache(() => readJson<SimpleBarData>(dataDir, 'built-tool.json'))

export const loadTrustLevel = cache(() => readJson<SimpleBarData>(dataDir, 'trust-level.json'))

export const loadBlockers = cache(() => readJson<SimpleBarData>(dataDir, 'blockers.json'))

export const loadWorkflowChange = cache(() =>
  readJson<SimpleBarData>(dataDir, 'workflow-change.json'),
)

export const loadInvestingNext = cache(() =>
  readJson<SimpleBarData>(dataDir, 'investing-next.json'),
)

export const loadFullSummary = cache(() =>
  readJson<FullSummaryResponse>(dataDir, 'full-summary.json'),
)

export const loadAgentContext = cache(() => readJson<AgentContext>(agentDir, 'context.json'))

export async function loadQuestionById(id: string) {
  switch (id.toUpperCase()) {
    case 'Q2':
      return loadRoleDistribution()
    case 'Q4':
      return loadTools()
    case 'Q7':
      return loadVibeDistribution()
    case 'Q10':
      return loadSatisfaction()
    case 'Q11':
      return loadOutlook()
    default:
      return null
  }
}
