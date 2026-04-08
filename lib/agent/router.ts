import { loadHeadline, loadOutlook, loadSatisfaction, loadTools, loadVibeByRole } from '@/lib/data/loaders'

const ROUTE_MAP = [
  {
    endpoint: '/stats/vibe-by-role',
    keywords: ['vibe', 'role', 'engineer', 'designer', 'adoption'],
    answer: async () => {
      const data = await loadVibeByRole()
      const highest = data.data[0]
      return `${highest.role} has the highest 50%+ vibe coding adoption at ${highest.pct}%.`
    },
    loader: loadVibeByRole,
  },
  {
    endpoint: '/stats/satisfaction',
    keywords: ['satisfaction', 'happy', 'workflow', 'delta', 'gap'],
    answer: async () => {
      const data = await loadSatisfaction()
      return `Workflow satisfaction rises from ${data.data[0]?.mean}/10 among zero-vibe respondents to ${data.data[data.data.length - 1]?.mean}/10 among nearly-all vibe coders.`
    },
    loader: loadSatisfaction,
  },
  {
    endpoint: '/stats/tools',
    keywords: ['tools', 'weekly', 'use', 'figma', 'claude', 'chatgpt'],
    answer: async () => {
      const data = await loadTools()
      return `${data.data[0]?.tool} is the top weekly tool at ${data.data[0]?.pct}%, followed by ${data.data[1]?.tool} at ${data.data[1]?.pct}%.`
    },
    loader: loadTools,
  },
  {
    endpoint: '/stats/outlook',
    keywords: ['outlook', 'secure', 'valuable', 'role', 'future'],
    answer: async () => {
      const data = await loadOutlook()
      const highest = [...data.data].sort((a, b) => b.more_valuable - a.more_valuable)[0]
      return `${highest.role} is the most optimistic segment, with ${highest.more_valuable}% saying the role becomes more valuable.`
    },
    loader: loadOutlook,
  },
  {
    endpoint: '/stats/headline',
    keywords: ['headline', 'key', 'stat', 'number', 'overview'],
    answer: async () => {
      const data = await loadHeadline()
      const vibe = data.data.find((item) => item.key === 'vibe_coding_50plus')
      return `${vibe?.value}% of respondents spend at least half of their output time on AI-generated code.`
    },
    loader: loadHeadline,
  },
]

export async function routeAgentQuestion(question: string) {
  const lower = question.toLowerCase()
  const match = ROUTE_MAP.find((route) => route.keywords.some((keyword) => lower.includes(keyword)))
  const selected = match ?? ROUTE_MAP[4]
  const data = await selected.loader()
  const answer = await selected.answer()

  return {
    question,
    endpoint: `/api/v1${selected.endpoint}`,
    answer,
    data,
  }
}
