import { readFile } from 'node:fs/promises'
import path from 'node:path'

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

export function loadMeta() {
  return readJson<SurveyMeta>(dataDir, 'meta.json')
}

export function loadQuestions() {
  return readJson<QuestionsResponse>(dataDir, 'questions.json')
}

export function loadHeadline() {
  return readJson<HeadlineResponse>(dataDir, 'headline.json')
}

export function loadRoleDistribution() {
  return readJson<RoleDistributionResponse>(dataDir, 'role-distribution.json')
}

export function loadVibeDistribution() {
  return readJson<VibeDistributionResponse>(dataDir, 'vibe-distribution.json')
}

export function loadVibeByRole() {
  return readJson<VibeByRoleResponse>(dataDir, 'vibe-by-role.json')
}

export function loadSatisfaction() {
  return readJson<SatisfactionResponse>(dataDir, 'satisfaction.json')
}

export function loadOutlook() {
  return readJson<OutlookResponse>(dataDir, 'outlook.json')
}

export function loadTools() {
  return readJson<ToolsResponse>(dataDir, 'tools.json')
}

export function loadFullSummary() {
  return readJson<FullSummaryResponse>(dataDir, 'full-summary.json')
}

export function loadAgentContext() {
  return readJson<AgentContext>(agentDir, 'context.json')
}

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
