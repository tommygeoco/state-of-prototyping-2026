export interface SurveyMeta {
  survey_name: string
  period: string
  n: number
  regions: number
  publisher: string
  publisher_url: string
  license: string
  fields: string[]
}

export interface QuestionDefinition {
  id: string
  field: string
  question: string
  type: string
  options: string
  published: boolean
}

export interface QuestionsResponse {
  survey: string
  data: QuestionDefinition[]
}

export interface RoleDistributionDatum {
  role: string
  n: number
  pct: number
}

export interface RoleDistributionResponse {
  question: string
  n: number
  data: RoleDistributionDatum[]
}

export interface VibeDistributionDatum {
  tier: string
  n: number
  pct: number
}

export interface VibeDistributionResponse {
  question: string
  n: number
  data: VibeDistributionDatum[]
  pct_50plus: {
    n: number
    pct: number
  }
}

export interface HeadlineDatum {
  key: string
  label: string
  value: number
  unit: 'count' | 'pct' | 'delta'
}

export interface HeadlineResponse {
  question: string
  n_total: number
  data: HeadlineDatum[]
}

export interface ToolDatum {
  tool: string
  n: number
  pct: number
}

export interface ToolsResponse {
  question: string
  n_total: number
  data: ToolDatum[]
}

export interface VibeByRoleDatum {
  role: string
  n: number
  pct: number
  note?: string
}

export interface VibeByRoleResponse {
  question: string
  n_total: number
  metric: string
  data: VibeByRoleDatum[]
}

export interface SatisfactionDatum {
  tier: string
  mean: number
}

export interface SatisfactionResponse {
  question: string
  n: number
  data: SatisfactionDatum[]
  overall_mean: number
  delta: {
    value: number
    from_tier: string
    to_tier: string
  }
}

export interface OutlookDatum {
  role: string
  more_valuable: number
  less_secure: number
  about_same: number
}

export interface OutlookResponse {
  question: string
  metric_labels: string[]
  data: OutlookDatum[]
}

export interface AgentContext {
  survey_name: string
  base_url: string
  publisher: string
  license: string
  key_facts: string[]
  headlines: string[]
  data_caveats: string[]
  endpoints: string[]
}

export interface FullSummaryResponse {
  meta: SurveyMeta
  questions: QuestionsResponse
  headline: HeadlineResponse
  role_distribution: RoleDistributionResponse
  vibe_distribution: VibeDistributionResponse
  vibe_by_role: VibeByRoleResponse
  satisfaction: SatisfactionResponse
  outlook: OutlookResponse
  tools: ToolsResponse
}
