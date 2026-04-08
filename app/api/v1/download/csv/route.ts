import { cacheHeaders } from '@/lib/api/headers'
import {
  loadBlockers,
  loadBuiltTool,
  loadCompanyContext,
  loadHeadline,
  loadInvestingNext,
  loadOutlook,
  loadRoleDistribution,
  loadSatisfaction,
  loadTools,
  loadTrustLevel,
  loadVibeByRole,
  loadVibeDistribution,
  loadWorkflowChange,
} from '@/lib/data/loaders'

function row(...cells: (string | number | undefined)[]) {
  return cells.map((c) => (c === undefined ? '' : String(c))).join(',')
}

export async function GET() {
  const [
    headline, roleDistribution, vibeDistribution, vibeByRole,
    satisfaction, outlook, tools, companyContext, builtTool,
    trustLevel, blockers, workflowChange, investingNext,
  ] = await Promise.all([
    loadHeadline(), loadRoleDistribution(), loadVibeDistribution(), loadVibeByRole(),
    loadSatisfaction(), loadOutlook(), loadTools(), loadCompanyContext(), loadBuiltTool(),
    loadTrustLevel(), loadBlockers(), loadWorkflowChange(), loadInvestingNext(),
  ])

  const lines: string[] = ['table,question,label,n,pct,mean,note']

  for (const d of headline.data) {
    lines.push(row('headline', headline.question, d.label, d.unit === 'count' ? d.value : '', d.unit === 'pct' ? d.value : '', d.unit === 'delta' ? d.value : ''))
  }

  for (const d of roleDistribution.data) {
    lines.push(row('role_distribution', roleDistribution.question, d.role, d.n, d.pct))
  }

  for (const d of vibeDistribution.data) {
    lines.push(row('vibe_distribution', vibeDistribution.question, d.tier, d.n, d.pct))
  }
  lines.push(row('vibe_distribution', vibeDistribution.question, '50%+ combined', vibeDistribution.pct_50plus.n, vibeDistribution.pct_50plus.pct))

  for (const d of vibeByRole.data) {
    lines.push(row('vibe_by_role', vibeByRole.question, d.role, d.n, d.pct, '', d.note))
  }

  for (const d of satisfaction.data) {
    lines.push(row('satisfaction', satisfaction.question, d.tier, '', '', d.mean))
  }
  lines.push(row('satisfaction', satisfaction.question, 'Overall', '', '', satisfaction.overall_mean))

  for (const d of outlook.data) {
    lines.push(row('outlook_more_valuable', outlook.question, d.role, '', d.more_valuable))
    lines.push(row('outlook_less_secure', outlook.question, d.role, '', d.less_secure))
    lines.push(row('outlook_about_same', outlook.question, d.role, '', d.about_same))
  }

  for (const d of tools.data) {
    lines.push(row('tools', tools.question, d.tool, d.n, d.pct))
  }

  for (const d of companyContext.data) {
    lines.push(row('company_context', companyContext.question, d.label, '', d.pct))
  }

  for (const d of builtTool.data) {
    lines.push(row('built_tool', builtTool.question, d.label, '', d.pct))
  }

  for (const d of trustLevel.data) {
    lines.push(row('trust_level', trustLevel.question, d.label, '', d.pct))
  }

  for (const d of blockers.data) {
    lines.push(row('blockers', blockers.question, d.label, '', d.pct))
  }

  for (const d of workflowChange.data) {
    lines.push(row('workflow_change', workflowChange.question, d.label, '', d.pct))
  }

  for (const d of investingNext.data) {
    lines.push(row('investing_next', investingNext.question, d.label, '', d.pct))
  }

  const csv = lines.join('\n') + '\n'

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="state-of-prototyping-spring-2026.csv"',
      ...cacheHeaders,
    },
  })
}
