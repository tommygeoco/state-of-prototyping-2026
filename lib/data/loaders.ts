import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

import type {
  AgentContext,
  FullSummaryResponse,
  HeadlineResponse,
  OutlookResponse,
  QuestionsResponse,
  RegionDistributionResponse,
  RoleDistributionResponse,
  SatisfactionResponse,
  SimpleBarResponse,
  SurveyMeta,
  ToolsResponse,
  VibeByRoleResponse,
  VibeDistributionResponse,
  WorkflowChangeByCompanyResponse,
} from '@/lib/data/schema'

const dataDir = path.join(process.cwd(), 'public', 'data')
const agentDir = path.join(process.cwd(), 'public', 'agent')
let responsesPromise: Promise<Record<string, string>[]> | undefined

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

export const loadRegionDistribution = cache(() =>
  readJson<RegionDistributionResponse>(dataDir, 'region-distribution.json'),
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

export const loadCompanyContext = cache(() =>
  readJson<SimpleBarResponse>(dataDir, 'company-context.json'),
)

export const loadBuiltTool = cache(() => readJson<SimpleBarResponse>(dataDir, 'built-tool.json'))

export const loadTrustLevel = cache(() => readJson<SimpleBarResponse>(dataDir, 'trust-level.json'))

export const loadBlockers = cache(() => readJson<SimpleBarResponse>(dataDir, 'blockers.json'))

export const loadWorkflowChange = cache(() =>
  readJson<SimpleBarResponse>(dataDir, 'workflow-change.json'),
)

export const loadInvestingNext = cache(() =>
  readJson<SimpleBarResponse>(dataDir, 'investing-next.json'),
)

export const loadWorkflowChangeByCompany = cache(() =>
  readJson<WorkflowChangeByCompanyResponse>(dataDir, 'workflow-change-by-company.json'),
)

export const loadFullSummary = cache(() =>
  readJson<FullSummaryResponse>(dataDir, 'full-summary.json'),
)

export const loadAgentContext = cache(() => readJson<AgentContext>(agentDir, 'context.json'))

export function loadResponses() {
  responsesPromise ??= readJson<Record<string, string>[]>(dataDir, 'responses.json')
  return responsesPromise
}

export async function loadQuestionById(id: string) {
  switch (id.toUpperCase()) {
    case 'Q1':
      return loadCompanyContext()
    case 'Q2':
      return loadRoleDistribution()
    case 'Q3':
      return loadRegionDistribution()
    case 'Q4':
      return loadTools()
    case 'Q6':
      return loadInvestingNext()
    case 'Q7':
      return loadVibeDistribution()
    case 'Q8':
      return loadBuiltTool()
    case 'Q9':
      return loadTrustLevel()
    case 'Q10':
      return loadSatisfaction()
    case 'Q11':
      return loadOutlook()
    default:
      return null
  }
}
