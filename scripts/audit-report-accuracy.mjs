import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const dataDir = path.join(rootDir, 'public', 'data')
const auditDir = path.join(rootDir, 'audit')
const explorePagePath = path.join(rootDir, 'app', 'explore', 'page.tsx')
const readmePath = path.join(rootDir, 'README.md')
const agentContextJsonPath = path.join(rootDir, 'public', 'agent', 'context.json')
const agentContextMdPath = path.join(rootDir, 'public', 'agent', 'SURVEY_CONTEXT.md')
const dataContextMdPath = path.join(rootDir, 'public', 'data', 'SURVEY_CONTEXT.md')
const socialPngRoutePath = path.join(rootDir, 'app', 'social', 'png', '[slug]', 'route.tsx')

const roleOrder = [
  'Designer (Individual contributor)',
  'Lead or principal',
  'Design manager or director',
  'Design engineer',
  'Non-designer who designs (e.g. PM, founder)',
  'Researcher',
]

const roleLabelMap = {
  'Designer (Individual contributor)': 'IC Designer',
  'Lead or principal': 'Lead / Principal',
  'Design manager or director': 'Manager / Director',
  'Design engineer': 'Design Engineer',
  'Non-designer who designs (e.g. PM, founder)': 'Non-designer',
  Researcher: 'Researcher',
}

const workContextOrder = [
  'Startup in-house (2–100)',
  'Independent or freelance',
  'Enterprise in-house (1,000+)',
  'Mid-size in-house (101–999)',
  'Agency or consulting',
  'Student, educator, or between roles',
]

const workContextLabelMap = {
  'Startup in-house (2–100)': 'Startup (2–100)',
  'Independent or freelance': 'Independent / Freelance',
  'Enterprise in-house (1,000+)': 'Enterprise (1,000+)',
  'Mid-size in-house (101–999)': 'Mid-size (101–999)',
  'Agency or consulting': 'Agency / Consulting',
  'Student, educator, or between roles': 'Student / Between',
}

const vibeOrder = ['None', 'Occasionally', 'About half', 'Most of it', 'Nearly all of it']
const vibeLabelMap = {
  None: 'None (0%)',
  Occasionally: 'Occasionally',
  'About half': 'About half',
  'Most of it': 'Most of it',
  'Nearly all of it': 'Nearly all',
}

const builtToolOrder = [
  'Yes, once or twice',
  'No, but I want to',
  'Yes, I build personal tools regularly',
  "No, and I don't plan to",
]

const builtToolLabelMap = {
  'Yes, once or twice': 'Yes, once or twice',
  'No, but I want to': 'No, but I want to',
  'Yes, I build personal tools regularly': 'Yes, I do it regularly',
  "No, and I don't plan to": "No, don't plan to",
}

const trustOrder = [
  'First drafts I heavily edit',
  'Exploration and brainstorming only',
  'Working output I review before shipping',
  'Ships with minor tweaks',
  "I don't use AI output in my work",
  'Full trust without oversight',
]

const trustLabelMap = {
  'First drafts I heavily edit': 'First drafts, edit heavily',
  'Exploration and brainstorming only': 'Exploration only',
  'Working output I review before shipping': 'Review before shipping',
  'Ships with minor tweaks': 'Ships with minor tweaks',
  "I don't use AI output in my work": "Don't use AI output",
  'Full trust without oversight': 'Full trust, no oversight',
}

const blockerOptions = [
  'Time to learn new tools',
  'Too many tools, unclear which to commit',
  "AI output quality isn't reliable enough",
  'Budget or procurement friction',
  'Security or compliance policy',
  'Engineering team constraints',
]

const blockerLabelMap = {
  'Time to learn new tools': 'Time to learn tools',
  'Too many tools, unclear which to commit': 'Too many tools',
  "AI output quality isn't reliable enough": 'AI output quality',
  'Budget or procurement friction': 'Budget / procurement',
  'Security or compliance policy': 'Security / compliance',
  'Engineering team constraints': 'Engineering constraints',
}

const investmentOptions = [
  'AI-generated coding',
  'Agent workflows & automations',
  'Design systems & tokens',
  'Canvas design tools',
  'Video, motion, & 3D',
  'Simplifying my stack',
  'Image generation',
  'No-code tools (not AI)',
  'Manual coding',
  'No major changes planned',
]

const investmentLabelMap = {
  'AI-generated coding': 'AI-generated coding',
  'Agent workflows & automations': 'Agent workflows',
  'Design systems & tokens': 'Design systems & tokens',
  'Canvas design tools': 'Canvas design tools',
  'Video, motion, & 3D': 'Video, motion & 3D',
  'Simplifying my stack': 'Simplifying my stack',
  'Image generation': 'Image generation',
  'No-code tools (not AI)': 'No-code (not AI)',
  'Manual coding': 'Manual coding',
  'No major changes planned': 'No major changes',
}

const workflowOrder = [
  'Added new tools, AI included',
  'AI is now central — major shift',
  'Still in flux, changing often',
  'Mostly the same',
  'Consolidated into fewer tools',
]

const workflowLabelMap = {
  'Added new tools, AI included': 'Added AI tools',
  'AI is now central — major shift': 'AI is now central',
  'Still in flux, changing often': 'Still in flux',
  'Mostly the same': 'Mostly the same',
  'Consolidated into fewer tools': 'Consolidated tools',
}

const reportClaimDefinitions = [
  {
    id: 'report-region-summary',
    surface: 'app/explore/page.tsx',
    actualPattern:
      /63% of respondents are outside North America\.[\s\S]*?Western Europe \(18\.1%\), South Asia \(10\.2%\),\s*and Southeast Asia \(7\.3%\)/,
    expectedText:
      '61.4% of respondents are outside North America. Western Europe (16.2%), South Asia (8.1%), and Southeast Asia (3.8%) are the largest non-North America regions.',
    source: ['responses.csv.region'],
  },
  {
    id: 'report-vibe-split-body',
    surface: 'app/explore/page.tsx',
    actualPattern:
      /43\.8% spend 50%\+ time vibe coding\.\s*31\.2% say most or nearly all\.\s*The 38% doing zero/,
    expectedText:
      '43.8% spend 50%+ time vibe coding. 31.1% say most or nearly all. The 37.7% doing zero is the more surprising number.',
    source: ['vibe-distribution.json'],
  },
  {
    id: 'report-vibe-split-quote',
    surface: 'app/explore/page.tsx',
    actualPattern: /38% of designers do zero vibe coding\.\s*31% say it&apos;s most or all of how they build\./,
    expectedText:
      '37.7% of designers do zero vibe coding. 31.1% say it&apos;s most or all of how they build.',
    source: ['vibe-distribution.json'],
  },
  {
    id: 'report-vibe-role-title',
    surface: 'app/explore/page.tsx',
    actualPattern: /title="An 81% vs 35% Split in the Same Design Org"/,
    expectedText: 'An 80.9% vs 35.0% Split in the Same Design Org',
    source: ['vibe-by-role.json'],
  },
  {
    id: 'report-vibe-role-manager',
    surface: 'app/explore/page.tsx',
    actualPattern: /The managers-at-47% number is telling\./,
    expectedText: 'The managers-at-46.6% number is telling.',
    source: ['vibe-by-role.json'],
  },
  {
    id: 'report-built-tool-body',
    surface: 'app/explore/page.tsx',
    actualPattern: /59% of designers have built their own tool, app, or utility with AI in the last 6 months\./,
    expectedText:
      '59.1% of designers have built their own tool, app, or utility with AI in the last 6 months.',
    source: ['built-tool.json'],
  },
  {
    id: 'report-built-tool-detail',
    surface: 'app/explore/page.tsx',
    actualPattern: /59% have built something\.\s*30% want to but haven&apos;t yet\.\s*Only 10\.5% have no plans to\./,
    expectedText:
      '59.1% have built something. 30.5% want to but haven&apos;t yet. Only 10.4% have no plans to.',
    source: ['built-tool.json'],
  },
  {
    id: 'report-trust-line',
    surface: 'app/explore/page.tsx',
    actualPattern: /Only 1\.4% trust AI output without oversight\.\s*But 34% trust it for production — with review\./,
    expectedText:
      'Only 1.4% trust AI output without oversight. But 32.8% trust it for production — with review.',
    source: ['trust-level.json'],
  },
  {
    id: 'report-blockers-body',
    surface: 'app/explore/page.tsx',
    actualPattern: /The top 3 blockers are within 3 percentage points of each other\./,
    expectedText: 'The top 3 blockers are within 3.5 percentage points of each other.',
    source: ['blockers.json'],
  },
  {
    id: 'report-blockers-title',
    surface: 'app/explore/page.tsx',
    actualPattern: /title="The Top 3 Blockers Are Within 3 Points of Each Other"/,
    expectedText: 'The Top 3 Blockers Are Within 3.5 Points of Each Other',
    source: ['blockers.json'],
  },
  {
    id: 'report-workflow-body',
    surface: 'app/explore/page.tsx',
    actualPattern: /71% have added AI or gone AI-central in the last 6 months\.\s*Only 10% say/,
    expectedText:
      '71.1% have added AI or gone AI-central in the last 6 months. Only 9.9% say',
    source: ['workflow-change.json'],
  },
  {
    id: 'report-workflow-crosstab',
    surface: 'app/explore/page.tsx',
    actualPattern: /Startups lead the AI-central shift at 39\.1%\.\s*Enterprise lags at 25\.0% — a 14-point gap/,
    expectedText:
      'Startups lead the AI-central shift at 38.8%. Enterprise is close behind at 34.7% — a much narrower 4.1-point gap.',
    source: ['workflow-change-by-company.json'],
  },
  {
    id: 'report-investment-body',
    surface: 'app/explore/page.tsx',
    actualPattern: /64% say AI-generated coding is their top investment\.\s*Agent workflows at 46% is about[\s\S]*?Design systems at 40%/,
    expectedText:
      '64.0% say AI-generated coding is their top investment. Agent workflows at 46.3% is about automating repetitive work. Design systems at 40.2% shows the systems layer isn&apos;t dead',
    source: ['investing-next.json'],
  },
  {
    id: 'report-summary-built-tool',
    surface: 'app/explore/page.tsx',
    actualPattern: /title: '59% of designers have built their own tool with AI in the last 6 months\.'/,
    expectedText: '59.1% of designers have built their own tool with AI in the last 6 months.',
    source: ['built-tool.json'],
  },
  {
    id: 'report-summary-blockers',
    surface: 'app/explore/page.tsx',
    actualPattern: /Time to learn \(55\.6%\), too many tools \(53\.1%\), output quality \(52\.2%\) — within 3 points of each other\./,
    expectedText:
      'Time to learn (55.7%), too many tools (53.0%), output quality (52.2%) — within 3.5 points of each other.',
    source: ['blockers.json'],
  },
  {
    id: 'report-summary-outlook',
    surface: 'app/explore/page.tsx',
    actualPattern: /Researchers: 17% more valuable, 39% less secure\./,
    expectedText: 'Researchers: 17.4% more valuable, 39.1% less secure.',
    source: ['outlook.json'],
  },
  {
    id: 'report-summary-satisfaction',
    surface: 'app/explore/page.tsx',
    actualPattern: /No vibe coding: 5\.9\/10\.\s*Heavy vibe coders: 7\.4\/10\./,
    expectedText: 'No vibe coding: 5.93/10. Heavy vibe coders: 7.39/10.',
    source: ['satisfaction.json'],
  },
  {
    id: 'report-methodology-microdata',
    surface: 'app/explore/page.tsx',
    actualPattern: /All published data is aggregated — no individual microdata is released\./,
    expectedText:
      'Published charts use aggregated data, and the full de-identified microdata is also available for download.',
    source: ['responses.csv', 'responses.json', 'README.md'],
  },
]

const duplicateCopyClaimDefinitions = [
  {
    id: 'readme-built-tool',
    surface: 'README.md',
    targetPath: readmePath,
    actualPattern: /\*\*59% have built their own tool with AI\*\* in the last 6 months\./,
  },
  {
    id: 'readme-satisfaction',
    surface: 'README.md',
    targetPath: readmePath,
    actualPattern: /5\.9 → 7\.4 out of 10/,
  },
  {
    id: 'readme-gap',
    surface: 'README.md',
    targetPath: readmePath,
    actualPattern: /A 46-point gap in the same org\./,
  },
  {
    id: 'agent-json-built-tool',
    surface: 'public/agent/context.json',
    targetPath: agentContextJsonPath,
    actualPattern: /59\.0% have built a custom tool with AI-generated code/,
  },
  {
    id: 'agent-md-built-tool',
    surface: 'public/agent/SURVEY_CONTEXT.md',
    targetPath: agentContextMdPath,
    actualPattern: /59\.0% have built a custom tool with AI-generated code/,
  },
  {
    id: 'data-md-built-tool',
    surface: 'public/data/SURVEY_CONTEXT.md',
    targetPath: dataContextMdPath,
    actualPattern: /59\.0% have built a custom tool with AI-generated code/,
  },
  {
    id: 'social-vibe-by-role-title',
    surface: 'app/social/png/[slug]/route.tsx',
    targetPath: socialPngRoutePath,
    actualPattern: /title="An 81% vs 35% Split in the Same Design Org"/,
  },
  {
    id: 'social-built-tool-title',
    surface: 'app/social/png/[slug]/route.tsx',
    targetPath: socialPngRoutePath,
    actualPattern: /title="59% of Designers Have Built Their Own AI Tool"/,
  },
  {
    id: 'social-blockers-title',
    surface: 'app/social/png/[slug]/route.tsx',
    targetPath: socialPngRoutePath,
    actualPattern: /title="The Top 3 Blockers Are Within 3 Points of Each Other"/,
  },
  {
    id: 'social-workflow-title',
    surface: 'app/social/png/[slug]/route.tsx',
    targetPath: socialPngRoutePath,
    actualPattern: /title="71% Have Added AI or Gone AI-Central in 6 Months"/,
  },
]

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (!inQuotes && char === ',') {
      row.push(value)
      value = ''
      continue
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') {
        i += 1
      }
      row.push(value)
      value = ''
      if (row.length > 1 || row[0] !== '') {
        rows.push(row)
      }
      row = []
      continue
    }

    value += char
  }

  if (value !== '' || row.length > 0) {
    row.push(value)
    rows.push(row)
  }

  const [headers, ...dataRows] = rows
  return dataRows.map((dataRow) =>
    Object.fromEntries(headers.map((header, index) => [header, dataRow[index] ?? ''])),
  )
}

function countBy(rows, field) {
  const counts = new Map()
  for (const row of rows) {
    const value = row[field]
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return counts
}

function roundPercent(count, denominator) {
  return denominator === 0 ? 0 : Math.round((count * 1000) / denominator) / 10
}

function roundTo(value, decimals) {
  const factor = 10 ** decimals
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function average(numbers) {
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length
}

function splitCommaList(value) {
  if (!value) {
    return []
  }
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function countPresence(rows, field, options, denominator) {
  return options.map((option) => {
    const count = rows.filter((row) => row[field].includes(option)).length
    return {
      rawLabel: option,
      n: count,
      pct: roundPercent(count, denominator),
    }
  })
}

function buildCompanyContext(rows) {
  const counts = countBy(rows, 'work_context')
  return {
    question: 'Q1 — Company context (work setting)',
    n: rows.length,
    data: workContextOrder.map((rawLabel) => ({
      label: workContextLabelMap[rawLabel],
      pct: roundPercent(counts.get(rawLabel) ?? 0, rows.length),
    })),
  }
}

function buildRegionDistribution(rows) {
  const nonBlankRows = rows.filter((row) => row.region)
  const counts = countBy(nonBlankRows, 'region')
  const sortedData = [...counts.entries()]
    .map(([region, count]) => ({
      region,
      n: count,
      pct: roundPercent(count, nonBlankRows.length),
    }))
    .sort((left, right) => right.n - left.n || left.region.localeCompare(right.region))

  const outsideNaCount = nonBlankRows.length - (counts.get('North America') ?? 0)

  return {
    question: 'Q3 — Region distribution',
    n: nonBlankRows.length,
    data: sortedData,
    pct_outside_na: {
      n: outsideNaCount,
      pct: roundPercent(outsideNaCount, nonBlankRows.length),
    },
  }
}

function buildRoleDistribution(rows) {
  const counts = countBy(rows, 'role_seat')
  const unexpected = [...counts.entries()]
    .filter(([role]) => !roleOrder.includes(role))
    .map(([role, count]) => ({ role, count }))

  return {
    question: 'Q2 — Role distribution',
    n: rows.length,
    data: roleOrder.map((rawLabel) => ({
      role: roleLabelMap[rawLabel],
      n: counts.get(rawLabel) ?? 0,
      pct: roundPercent(counts.get(rawLabel) ?? 0, rows.length),
    })),
    unexpected,
  }
}

function buildTools(rows) {
  const counts = new Map()
  for (const row of rows) {
    for (const tool of splitCommaList(row.design_tools)) {
      counts.set(tool, (counts.get(tool) ?? 0) + 1)
    }
  }

  const data = [...counts.entries()]
    .map(([tool, count]) => ({
      tool,
      n: count,
      pct: roundPercent(count, rows.length),
    }))
    .sort((left, right) => right.n - left.n || left.tool.localeCompare(right.tool))
    .slice(0, 10)

  return {
    question: 'Q4 — Top tools used weekly',
    n_total: rows.length,
    data,
  }
}

function buildCodeInWorkflow(rows) {
  const aiCodeUsers = rows.filter((row) =>
    row.code_in_workflow.includes('I use AI or no-code to generate code'),
  ).length

  return {
    count: aiCodeUsers,
    pct: roundPercent(aiCodeUsers, rows.length),
  }
}

function buildVibeDistribution(rows) {
  const counts = countBy(rows, 'vibe_coding_ratio')
  const denominator = rows.length
  const data = vibeOrder.map((rawLabel) => ({
    tier: vibeLabelMap[rawLabel],
    n: counts.get(rawLabel) ?? 0,
    pct: roundPercent(counts.get(rawLabel) ?? 0, denominator),
  }))
  const fiftyPlusCount =
    (counts.get('About half') ?? 0) +
    (counts.get('Most of it') ?? 0) +
    (counts.get('Nearly all of it') ?? 0)

  return {
    question: 'Q7 — Vibe coding ratio (% AI-generated output)',
    n: denominator,
    data,
    pct_50plus: {
      n: fiftyPlusCount,
      pct: roundPercent(fiftyPlusCount, denominator),
    },
  }
}

function buildVibeByRole(rows) {
  const groups = roleOrder.map((role) => rows.filter((row) => row.role_seat === role))
  const data = groups
    .map((groupRows, index) => {
      const rawLabel = roleOrder[index]
      const count50Plus = groupRows.filter((row) =>
        ['About half', 'Most of it', 'Nearly all of it'].includes(row.vibe_coding_ratio),
      ).length
      const datum = {
        role: roleLabelMap[rawLabel],
        n: groupRows.length,
        pct: roundPercent(count50Plus, groupRows.length),
      }
      if (rawLabel === 'Researcher') {
        datum.note = 'directional — small n'
      }
      return datum
    })
    .sort((left, right) => right.pct - left.pct || right.n - left.n)

  return {
    question: 'Q7 × Q2 cross-tab — Vibe coding 50%+ by role',
    n_total: rows.length,
    metric: 'pct_spending_50pct_plus_on_vibe_coding',
    data,
  }
}

function buildBuiltTool(rows) {
  const nonBlankRows = rows.filter((row) => row.built_own_tool)
  const counts = countBy(nonBlankRows, 'built_own_tool')

  return {
    question: 'Q8 — Have you built your own tool with AI in the last 6 months?',
    n: nonBlankRows.length,
    data: builtToolOrder.map((rawLabel) => ({
      label: builtToolLabelMap[rawLabel],
      pct: roundPercent(counts.get(rawLabel) ?? 0, nonBlankRows.length),
    })),
  }
}

function buildTrustLevel(rows) {
  const nonBlankRows = rows.filter((row) => row.ai_trust)
  const counts = countBy(nonBlankRows, 'ai_trust')

  return {
    question: 'Q9 — How far do you trust AI output?',
    n: nonBlankRows.length,
    data: trustOrder.map((rawLabel) => ({
      label: trustLabelMap[rawLabel],
      pct: roundPercent(counts.get(rawLabel) ?? 0, nonBlankRows.length),
    })),
  }
}

function buildBlockers(rows) {
  const data = countPresence(rows, 'blockers', blockerOptions, rows.length)
    .map(({ rawLabel, pct }) => ({
      label: blockerLabelMap[rawLabel],
      pct,
    }))
    .sort((left, right) => right.pct - left.pct || left.label.localeCompare(right.label))

  return {
    question: 'Top workflow blockers',
    n: rows.length,
    data,
  }
}

function buildWorkflowChange(rows) {
  const counts = countBy(rows, 'workflow_shift')
  return {
    question: 'How has your workflow changed in the last 6 months?',
    n: rows.length,
    data: workflowOrder.map((rawLabel) => ({
      label: workflowLabelMap[rawLabel],
      pct: roundPercent(counts.get(rawLabel) ?? 0, rows.length),
    })),
  }
}

function buildWorkflowChangeByCompany(rows) {
  const data = workContextOrder.map((rawLabel) => {
    const groupRows = rows.filter((row) => row.work_context === rawLabel)
    const aiCentralCount = groupRows.filter(
      (row) => row.workflow_shift === 'AI is now central — major shift',
    ).length

    return {
      context: workContextLabelMap[rawLabel],
      n: groupRows.length,
      pct: roundPercent(aiCentralCount, groupRows.length),
      note: 'AI is now central — major shift',
    }
  }).sort((left, right) => right.pct - left.pct || right.n - left.n)

  return {
    question: 'Q10 × Q1 cross-tab — AI is now central by company context',
    n_total: rows.length,
    metric: 'pct_ai_central_by_company_context',
    data,
  }
}

function buildInvestingNext(rows) {
  const data = countPresence(rows, 'anticipated_investment', investmentOptions, rows.length)
    .map(({ rawLabel, pct }) => ({
      label: investmentLabelMap[rawLabel],
      pct,
    }))
    .sort((left, right) => right.pct - left.pct || left.label.localeCompare(right.label))

  return {
    question: 'Q6 — Where are you investing your time next? (Pick 3)',
    n: rows.length,
    data,
  }
}

function buildSatisfaction(rows) {
  const nonBlankRows = rows.filter((row) => row.workflow_satisfaction)
  const values = nonBlankRows.map((row) => Number(row.workflow_satisfaction))
  const byTier = new Map()

  for (const vibe of vibeOrder) {
    byTier.set(
      vibe,
      nonBlankRows
        .filter((row) => row.vibe_coding_ratio === vibe)
        .map((row) => Number(row.workflow_satisfaction)),
    )
  }

  const noneMean = roundTo(average(byTier.get('None')), 2)
  const nearlyAllMean = roundTo(average(byTier.get('Nearly all of it')), 2)

  return {
    question: 'Q10 — Mean workflow satisfaction (1–10) by Q7 vibe coding tier',
    n: nonBlankRows.length,
    data: vibeOrder.map((rawLabel) => ({
      tier: vibeLabelMap[rawLabel],
      mean: roundTo(average(byTier.get(rawLabel)), 2),
    })),
    overall_mean: roundTo(average(values), 2),
    delta: {
      value: roundTo(nearlyAllMean - noneMean, 2),
      from_tier: 'None',
      to_tier: 'Nearly all',
    },
  }
}

function buildOutlook(rows) {
  const relevantRoles = roleOrder.filter((role) => role !== '')
  const data = relevantRoles
    .filter((role) => role !== 'Independent or freelance')
    .map((rawLabel) => {
      const roleRows = rows.filter((row) => row.role_seat === rawLabel)
      return {
        role: roleLabelMap[rawLabel],
        more_valuable: roundPercent(
          roleRows.filter((row) => row.role_outlook === 'More valuable, my skills matter more than before').length,
          roleRows.length,
        ),
        less_secure: roundPercent(
          roleRows.filter((row) => row.role_outlook === "Less secure, AI is changing what's expected of me").length,
          roleRows.length,
        ),
        about_same: roundPercent(
          roleRows.filter((row) => row.role_outlook === 'About the same').length,
          roleRows.length,
        ),
      }
    })
    .sort((left, right) => right.more_valuable - left.more_valuable || right.less_secure - left.less_secure)

  return {
    question: 'Q11 — Role outlook by role',
    metric_labels: ['more_valuable', 'less_secure', 'about_same'],
    data,
  }
}

function buildHeadline(rows, derived) {
  const builtSomethingPct = roundPercent(
    rows.filter((row) =>
      ['Yes, once or twice', 'Yes, I build personal tools regularly'].includes(row.built_own_tool),
    ).length,
    rows.filter((row) => row.built_own_tool).length,
  )

  return {
    question: 'Key headline numbers from the State of Prototyping Spring 2026 survey',
    n_total: rows.length,
    data: [
      { key: 'total_responses', label: 'Total responses', value: rows.length, unit: 'count' },
      {
        key: 'vibe_coding_50plus',
        label: 'Designers vibe coding 50%+ of their output',
        value: derived.vibeDistribution.pct_50plus.pct,
        unit: 'pct',
      },
      {
        key: 'built_tool_with_ai',
        label: 'Built a custom tool with AI-generated code',
        value: builtSomethingPct,
        unit: 'pct',
      },
      {
        key: 'generate_code_ai',
        label: 'Use AI or no-code to generate code in workflow',
        value: derived.codeInWorkflow.pct,
        unit: 'pct',
      },
      {
        key: 'non_na_respondents',
        label: 'Respondents outside North America',
        value: derived.regionDistribution.pct_outside_na.pct,
        unit: 'pct',
      },
      {
        key: 'ai_invest_next_12mo',
        label: 'Expect more AI investment in the next 12 months',
        value: derived.investingNext.data[0].pct,
        unit: 'pct',
      },
      {
        key: 'satisfaction_delta',
        label: 'Satisfaction gap between zero and nearly all vibe coding',
        value: derived.satisfaction.delta.value,
        unit: 'delta',
      },
    ],
  }
}

function buildQuestions(questions) {
  return {
    ...questions,
    data: questions.data.map((question) => {
      const publishedIds = new Set(['Q1', 'Q2', 'Q3', 'Q4', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11'])
      if (!publishedIds.has(question.id)) {
        return question
      }
      return {
        ...question,
        published: true,
      }
    }),
  }
}

function buildFullSummary(meta, questions, derived) {
  return {
    meta,
    questions,
    headline: derived.headline,
    role_distribution: stripKey(derived.roleDistribution, 'unexpected'),
    region_distribution: derived.regionDistribution,
    vibe_distribution: derived.vibeDistribution,
    vibe_by_role: derived.vibeByRole,
    satisfaction: derived.satisfaction,
    outlook: derived.outlook,
    tools: derived.tools,
    company_context: derived.companyContext,
    built_tool: derived.builtTool,
    trust_level: derived.trustLevel,
    blockers: derived.blockers,
    workflow_change: derived.workflowChange,
    workflow_change_by_company: derived.workflowChangeByCompany,
    investing_next: derived.investingNext,
  }
}

function stripKey(object, key) {
  const clone = { ...object }
  delete clone[key]
  return clone
}

function csvCell(value) {
  if (value === undefined || value === null) {
    return ''
  }
  const stringValue = String(value)
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`
  }
  return stringValue
}

function row(...cells) {
  return cells.map(csvCell).join(',')
}

function buildFullSummaryCsv(fullSummary) {
  const lines = ['table,dimension,value,n,pct,mean,note']

  for (const datum of fullSummary.headline.data) {
    lines.push(
      row(
        'headline',
        datum.key,
        datum.label,
        datum.unit === 'count' ? datum.value : '',
        datum.unit === 'pct' ? datum.value : '',
        datum.unit === 'delta' ? datum.value : '',
      ),
    )
  }

  for (const datum of fullSummary.role_distribution.data) {
    lines.push(row('role_distribution', 'role', datum.role, datum.n, datum.pct))
  }

  for (const datum of fullSummary.region_distribution.data) {
    lines.push(row('region_distribution', 'region', datum.region, datum.n, datum.pct))
  }
  lines.push(
    row(
      'region_distribution',
      'outside_north_america',
      'Outside North America',
      fullSummary.region_distribution.pct_outside_na.n,
      fullSummary.region_distribution.pct_outside_na.pct,
    ),
  )

  for (const datum of fullSummary.vibe_distribution.data) {
    lines.push(row('vibe_distribution', 'tier', datum.tier, datum.n, datum.pct))
  }
  lines.push(
    row(
      'vibe_distribution',
      'pct_50plus',
      '50%+',
      fullSummary.vibe_distribution.pct_50plus.n,
      fullSummary.vibe_distribution.pct_50plus.pct,
    ),
  )

  for (const datum of fullSummary.vibe_by_role.data) {
    lines.push(row('vibe_by_role', 'role', datum.role, datum.n, datum.pct, '', datum.note))
  }

  for (const datum of fullSummary.satisfaction.data) {
    lines.push(row('satisfaction', 'tier', datum.tier, '', '', datum.mean))
  }
  lines.push(row('satisfaction', 'overall_mean', 'Overall', '', '', fullSummary.satisfaction.overall_mean))
  lines.push(
    row(
      'satisfaction',
      'delta',
      `${fullSummary.satisfaction.delta.from_tier} → ${fullSummary.satisfaction.delta.to_tier}`,
      '',
      '',
      fullSummary.satisfaction.delta.value,
    ),
  )

  for (const datum of fullSummary.outlook.data) {
    lines.push(row('outlook_more_valuable', 'role', datum.role, '', datum.more_valuable))
    lines.push(row('outlook_less_secure', 'role', datum.role, '', datum.less_secure))
    lines.push(row('outlook_about_same', 'role', datum.role, '', datum.about_same))
  }

  for (const datum of fullSummary.tools.data) {
    lines.push(row('tools', 'tool', datum.tool, datum.n, datum.pct))
  }

  for (const datum of fullSummary.company_context.data) {
    lines.push(row('company_context', 'label', datum.label, '', datum.pct))
  }

  for (const datum of fullSummary.built_tool.data) {
    lines.push(row('built_tool', 'label', datum.label, '', datum.pct))
  }

  for (const datum of fullSummary.trust_level.data) {
    lines.push(row('trust_level', 'label', datum.label, '', datum.pct))
  }

  for (const datum of fullSummary.blockers.data) {
    lines.push(row('blockers', 'label', datum.label, '', datum.pct))
  }

  for (const datum of fullSummary.workflow_change.data) {
    lines.push(row('workflow_change', 'label', datum.label, '', datum.pct))
  }

  for (const datum of fullSummary.workflow_change_by_company.data) {
    lines.push(row('workflow_change_by_company', 'context', datum.context, datum.n, datum.pct, '', datum.note))
  }

  for (const datum of fullSummary.investing_next.data) {
    lines.push(row('investing_next', 'label', datum.label, '', datum.pct))
  }

  return `${lines.join('\n')}\n`
}

function buildClaimInventory(explorePage, derived) {
  const blockersTopSpread = roundTo(
    derived.blockers.data[0].pct - derived.blockers.data[2].pct,
    1,
  )
  const workflowCombined = roundTo(
    derived.workflowChange.data[0].pct + derived.workflowChange.data[1].pct,
    1,
  )
  const trustProductionWithReview = roundTo(
    derived.trustLevel.data[2].pct + derived.trustLevel.data[3].pct,
    1,
  )

  const dynamicExpected = {
    'report-region-summary':
      `61.4% of respondents are outside North America. Western Europe (${derived.regionDistribution.data.find((item) => item.region === 'Western Europe').pct}%), South Asia (${derived.regionDistribution.data.find((item) => item.region === 'South Asia').pct}%), and Southeast Asia (${derived.regionDistribution.data.find((item) => item.region === 'Southeast Asia').pct}%) are the largest non-North America regions.`,
    'report-vibe-split-body':
      `43.8% spend 50%+ time vibe coding. ${roundTo(derived.vibeDistribution.data[3].pct + derived.vibeDistribution.data[4].pct, 1)}% say most or nearly all. The ${derived.vibeDistribution.data[0].pct}% doing zero is the more surprising number.`,
    'report-vibe-split-quote':
      `${derived.vibeDistribution.data[0].pct}% of designers do zero vibe coding. ${roundTo(derived.vibeDistribution.data[3].pct + derived.vibeDistribution.data[4].pct, 1)}% say it&apos;s most or all of how they build.`,
    'report-vibe-role-title':
      `An ${derived.vibeByRole.data[0].pct}% vs ${derived.vibeByRole.data.find((item) => item.role === 'IC Designer').pct.toFixed(1)}% Split in the Same Design Org`,
    'report-vibe-role-manager':
      `The managers-at-${derived.vibeByRole.data.find((item) => item.role === 'Manager / Director').pct.toFixed(1)}% number is telling.`,
    'report-built-tool-body':
      `${derived.headline.data.find((item) => item.key === 'built_tool_with_ai').value.toFixed(1)}% of designers have built their own tool, app, or utility with AI in the last 6 months.`,
    'report-built-tool-detail':
      `${derived.headline.data.find((item) => item.key === 'built_tool_with_ai').value.toFixed(1)}% have built something. ${derived.builtTool.data.find((item) => item.label === 'No, but I want to').pct.toFixed(1)}% want to but haven&apos;t yet. Only ${derived.builtTool.data.find((item) => item.label === "No, don't plan to").pct.toFixed(1)}% have no plans to.`,
    'report-trust-line':
      `Only ${derived.trustLevel.data.find((item) => item.label === 'Full trust, no oversight').pct.toFixed(1)}% trust AI output without oversight. But ${trustProductionWithReview.toFixed(1)}% trust it for production — with review.`,
    'report-blockers-body':
      `The top 3 blockers are within ${blockersTopSpread.toFixed(1)} percentage points of each other.`,
    'report-blockers-title':
      `The Top 3 Blockers Are Within ${blockersTopSpread.toFixed(1)} Points of Each Other`,
    'report-workflow-body':
      `${workflowCombined.toFixed(1)}% have added AI or gone AI-central in the last 6 months. Only ${derived.workflowChange.data.find((item) => item.label === 'Mostly the same').pct.toFixed(1)}% say`,
    'report-workflow-crosstab':
      `Startups lead the AI-central shift at ${derived.workflowChangeByCompany.data.find((item) => item.context === 'Startup (2–100)').pct.toFixed(1)}%. Enterprise is close behind at ${derived.workflowChangeByCompany.data.find((item) => item.context === 'Enterprise (1,000+)').pct.toFixed(1)}% — a much narrower ${roundTo(derived.workflowChangeByCompany.data.find((item) => item.context === 'Startup (2–100)').pct - derived.workflowChangeByCompany.data.find((item) => item.context === 'Enterprise (1,000+)').pct, 1).toFixed(1)}-point gap.`,
    'report-investment-body':
      `${derived.investingNext.data[0].pct.toFixed(1)}% say AI-generated coding is their top investment. Agent workflows at ${derived.investingNext.data.find((item) => item.label === 'Agent workflows').pct.toFixed(1)}% is about automating repetitive work. Design systems at ${derived.investingNext.data.find((item) => item.label === 'Design systems & tokens').pct.toFixed(1)}% shows the systems layer isn&apos;t dead`,
    'report-summary-built-tool':
      `${derived.headline.data.find((item) => item.key === 'built_tool_with_ai').value.toFixed(1)}% of designers have built their own tool with AI in the last 6 months.`,
    'report-summary-blockers':
      `Time to learn (${derived.blockers.data[0].pct.toFixed(1)}%), too many tools (${derived.blockers.data[1].pct.toFixed(1)}%), output quality (${derived.blockers.data[2].pct.toFixed(1)}%) — within ${blockersTopSpread.toFixed(1)} points of each other.`,
    'report-summary-outlook':
      `Researchers: ${derived.outlook.data.find((item) => item.role === 'Researcher').more_valuable.toFixed(1)}% more valuable, ${derived.outlook.data.find((item) => item.role === 'Researcher').less_secure.toFixed(1)}% less secure.`,
    'report-summary-satisfaction':
      `No vibe coding: ${derived.satisfaction.data.find((item) => item.tier === 'None (0%)').mean.toFixed(2)}/10. Heavy vibe coders: ${derived.satisfaction.data.find((item) => item.tier === 'Nearly all').mean.toFixed(2)}/10.`,
    'report-methodology-microdata':
      'Published charts use aggregated data, and the full de-identified microdata is also available for download.',
  }

  return reportClaimDefinitions.map((claim) => {
    const expectedText = dynamicExpected[claim.id] ?? claim.expectedText
    const normalizedExpected = expectedText.replace(/\s+/g, ' ').trim()
    const normalizedPage = explorePage.replace(/\s+/g, ' ').trim()
    const status = claim.actualPattern.test(explorePage)
      ? 'mismatch'
      : normalizedPage.includes(normalizedExpected)
        ? 'verified'
        : 'needs_manual_review'

    return {
      id: claim.id,
      surface: claim.surface,
      source: claim.source,
      status,
      actual_pattern: String(claim.actualPattern),
      expected_text: expectedText,
    }
  })
}

function buildDuplicateCopyInventory(fileContents, derived) {
  const builtToolPct = derived.headline.data.find((item) => item.key === 'built_tool_with_ai').value.toFixed(1)
  const roleGap = (
    derived.vibeByRole.data.find((item) => item.role === 'Design Engineer').pct -
    derived.vibeByRole.data.find((item) => item.role === 'IC Designer').pct
  ).toFixed(1)
  const blockerSpread = (derived.blockers.data[0].pct - derived.blockers.data[2].pct).toFixed(1)
  const workflowCombined = (
    (derived.workflowChange.data.find((item) => item.label === 'Added AI tools')?.pct ?? 0) +
    (derived.workflowChange.data.find((item) => item.label === 'AI is now central')?.pct ?? 0)
  ).toFixed(1)

  const expectedTextById = {
    'readme-built-tool': `**${builtToolPct}% have built their own tool with AI** in the last 6 months.`,
    'readme-satisfaction': `${derived.satisfaction.data.find((item) => item.tier === 'None (0%)').mean.toFixed(2)} → ${derived.satisfaction.data.find((item) => item.tier === 'Nearly all').mean.toFixed(2)} out of 10`,
    'readme-gap': `A ${roleGap}-point gap in the same org.`,
    'agent-json-built-tool': `${builtToolPct}% have built a custom tool with AI-generated code`,
    'agent-md-built-tool': `${builtToolPct}% have built a custom tool with AI-generated code`,
    'data-md-built-tool': `${builtToolPct}% have built a custom tool with AI-generated code`,
    'social-vibe-by-role-title': `title={\`An ${derived.vibeByRole.data.find((item) => item.role === 'Design Engineer').pct.toFixed(1)}% vs ${derived.vibeByRole.data.find((item) => item.role === 'IC Designer').pct.toFixed(1)}% Split in the Same Design Org\`}`,
    'social-built-tool-title': `title={\`${builtToolPct}% of Designers Have Built Their Own AI Tool\`}`,
    'social-blockers-title': `title={\`The Top 3 Blockers Are Within ${blockerSpread} Points of Each Other\`}`,
    'social-workflow-title': `title={\`${workflowCombined}% Have Added AI or Gone AI-Central in 6 Months\`}`,
  }

  return duplicateCopyClaimDefinitions.map((claim) => {
    const contents = fileContents[claim.targetPath] ?? ''
    const status = claim.actualPattern.test(contents)
      ? 'mismatch'
      : contents.includes(expectedTextById[claim.id])
        ? 'verified'
        : 'needs_manual_review'

    return {
      id: claim.id,
      surface: claim.surface,
      source: ['responses.csv', 'public/data/*.json'],
      status,
      actual_pattern: String(claim.actualPattern),
      expected_text: expectedTextById[claim.id],
    }
  })
}

function diffValue(expected, actual, pathParts, mismatches) {
  if (Array.isArray(expected) && Array.isArray(actual)) {
    const maxLength = Math.max(expected.length, actual.length)
    for (let index = 0; index < maxLength; index += 1) {
      diffValue(expected[index], actual[index], [...pathParts, String(index)], mismatches)
    }
    return
  }

  if (
    expected &&
    actual &&
    typeof expected === 'object' &&
    typeof actual === 'object' &&
    !Array.isArray(expected) &&
    !Array.isArray(actual)
  ) {
    const keys = new Set([...Object.keys(expected), ...Object.keys(actual)])
    for (const key of keys) {
      diffValue(expected[key], actual[key], [...pathParts, key], mismatches)
    }
    return
  }

  if (expected !== actual) {
    mismatches.push({
      path: pathParts.join('.'),
      expected,
      actual,
    })
  }
}

function buildDiscrepancyLedger(currentFiles, expectedFiles, claimInventory, roleDistributionUnexpected) {
  const mismatches = []
  const warnings = []

  for (const [fileName, expectedValue] of Object.entries(expectedFiles)) {
    const actualValue = currentFiles[fileName]
    diffValue(expectedValue, actualValue, [fileName], mismatches)
  }

  const reportMismatches = claimInventory.filter((claim) => claim.status === 'mismatch')

  if (roleDistributionUnexpected.length > 0) {
    warnings.push({
      path: 'responses.csv.role_seat',
      message: 'Unexpected raw role values are excluded from role-based aggregate tables.',
      actual: roleDistributionUnexpected,
    })
  }

  return {
    generated_at: new Date().toISOString(),
    aggregate_mismatch_count: mismatches.length,
    report_copy_mismatch_count: reportMismatches.length,
    raw_data_warning_count: warnings.length,
    aggregate_mismatches: mismatches,
    report_copy_mismatches: reportMismatches,
    raw_data_warnings: warnings,
  }
}

function renderLedgerMarkdown(ledger) {
  const lines = [
    '# Report Accuracy Audit Ledger',
    '',
    `Generated: ${ledger.generated_at}`,
    '',
    `Aggregate mismatches: ${ledger.aggregate_mismatch_count}`,
    `Report copy mismatches: ${ledger.report_copy_mismatch_count}`,
    `Raw data warnings: ${ledger.raw_data_warning_count}`,
    '',
    '## Aggregate Mismatches',
  ]

  if (ledger.aggregate_mismatches.length === 0) {
    lines.push('', 'None.')
  } else {
    lines.push('', '| Path | Expected | Actual |', '|---|---|---|')
    for (const mismatch of ledger.aggregate_mismatches) {
      lines.push(
        `| \`${mismatch.path}\` | \`${JSON.stringify(mismatch.expected)}\` | \`${JSON.stringify(mismatch.actual)}\` |`,
      )
    }
  }

  lines.push('', '## Report Copy Mismatches')

  if (ledger.report_copy_mismatches.length === 0) {
    lines.push('', 'None.')
  } else {
    lines.push('', '| Claim | Expected Text |', '|---|---|')
    for (const mismatch of ledger.report_copy_mismatches) {
      lines.push(`| \`${mismatch.id}\` | ${mismatch.expected_text} |`)
    }
  }

  lines.push('', '## Raw Data Warnings')

  if (ledger.raw_data_warnings.length === 0) {
    lines.push('', 'None.')
  } else {
    lines.push('', '| Path | Warning | Actual |', '|---|---|---|')
    for (const warning of ledger.raw_data_warnings) {
      lines.push(
        `| \`${warning.path}\` | ${warning.message} | \`${JSON.stringify(warning.actual)}\` |`,
      )
    }
  }

  return `${lines.join('\n')}\n`
}

async function readJson(fileName) {
  return JSON.parse(await readFile(path.join(dataDir, fileName), 'utf8'))
}

async function main() {
  const writeMode = process.argv.includes('--write')
  await mkdir(auditDir, { recursive: true })

  const csvText = await readFile(path.join(dataDir, 'responses.csv'), 'utf8')
  const jsonRows = JSON.parse(await readFile(path.join(dataDir, 'responses.json'), 'utf8'))
  const explorePage = await readFile(explorePagePath, 'utf8')
  const duplicateFileContents = {
    [readmePath]: await readFile(readmePath, 'utf8'),
    [agentContextJsonPath]: await readFile(agentContextJsonPath, 'utf8'),
    [agentContextMdPath]: await readFile(agentContextMdPath, 'utf8'),
    [dataContextMdPath]: await readFile(dataContextMdPath, 'utf8'),
    [socialPngRoutePath]: await readFile(socialPngRoutePath, 'utf8'),
  }
  const rows = parseCsv(csvText)

  if (JSON.stringify(rows) !== JSON.stringify(jsonRows)) {
    throw new Error('responses.csv and responses.json no longer match')
  }

  const meta = await readJson('meta.json')
  const currentQuestions = await readJson('questions.json')
  const questions = buildQuestions(currentQuestions)

  const derived = {}
  derived.companyContext = buildCompanyContext(rows)
  derived.regionDistribution = buildRegionDistribution(rows)
  derived.roleDistribution = buildRoleDistribution(rows)
  derived.tools = buildTools(rows)
  derived.codeInWorkflow = buildCodeInWorkflow(rows)
  derived.vibeDistribution = buildVibeDistribution(rows)
  derived.vibeByRole = buildVibeByRole(rows)
  derived.builtTool = buildBuiltTool(rows)
  derived.trustLevel = buildTrustLevel(rows)
  derived.blockers = buildBlockers(rows)
  derived.workflowChange = buildWorkflowChange(rows)
  derived.workflowChangeByCompany = buildWorkflowChangeByCompany(rows)
  derived.investingNext = buildInvestingNext(rows)
  derived.satisfaction = buildSatisfaction(rows)
  derived.outlook = buildOutlook(rows)
  derived.headline = buildHeadline(rows, derived)
  derived.fullSummary = buildFullSummary(meta, questions, derived)
  derived.fullSummaryCsv = buildFullSummaryCsv(derived.fullSummary)

  const currentFiles = {
    'questions.json': currentQuestions,
    'headline.json': await readJson('headline.json'),
    'role-distribution.json': await readJson('role-distribution.json'),
    'region-distribution.json': await readJson('region-distribution.json'),
    'vibe-distribution.json': await readJson('vibe-distribution.json'),
    'vibe-by-role.json': await readJson('vibe-by-role.json'),
    'satisfaction.json': await readJson('satisfaction.json'),
    'outlook.json': await readJson('outlook.json'),
    'tools.json': await readJson('tools.json'),
    'company-context.json': await readJson('company-context.json'),
    'built-tool.json': await readJson('built-tool.json'),
    'trust-level.json': await readJson('trust-level.json'),
    'blockers.json': await readJson('blockers.json'),
    'workflow-change.json': await readJson('workflow-change.json'),
    'workflow-change-by-company.json': await readJson('workflow-change-by-company.json'),
    'investing-next.json': await readJson('investing-next.json'),
    'full-summary.json': await readJson('full-summary.json'),
    'full-summary.csv': await readFile(path.join(dataDir, 'full-summary.csv'), 'utf8'),
  }

  const expectedFiles = {
    'questions.json': questions,
    'headline.json': derived.headline,
    'role-distribution.json': stripKey(derived.roleDistribution, 'unexpected'),
    'region-distribution.json': derived.regionDistribution,
    'vibe-distribution.json': derived.vibeDistribution,
    'vibe-by-role.json': derived.vibeByRole,
    'satisfaction.json': derived.satisfaction,
    'outlook.json': derived.outlook,
    'tools.json': derived.tools,
    'company-context.json': derived.companyContext,
    'built-tool.json': derived.builtTool,
    'trust-level.json': derived.trustLevel,
    'blockers.json': derived.blockers,
    'workflow-change.json': derived.workflowChange,
    'workflow-change-by-company.json': derived.workflowChangeByCompany,
    'investing-next.json': derived.investingNext,
    'full-summary.json': derived.fullSummary,
    'full-summary.csv': derived.fullSummaryCsv,
  }

  const claimInventory = buildClaimInventory(explorePage, derived)
  const duplicateCopyInventory = buildDuplicateCopyInventory(duplicateFileContents, derived)
  const ledger = buildDiscrepancyLedger(
    currentFiles,
    expectedFiles,
    [...claimInventory, ...duplicateCopyInventory],
    derived.roleDistribution.unexpected,
  )

  await writeFile(
    path.join(auditDir, 'report-claim-inventory.json'),
    `${JSON.stringify([...claimInventory, ...duplicateCopyInventory], null, 2)}\n`,
  )
  await writeFile(
    path.join(auditDir, 'report-discrepancy-ledger.json'),
    `${JSON.stringify(ledger, null, 2)}\n`,
  )
  await writeFile(
    path.join(auditDir, 'report-discrepancy-ledger.md'),
    renderLedgerMarkdown(ledger),
  )

  if (writeMode) {
    const writes = [
      ['headline.json', derived.headline],
      ['questions.json', questions],
      ['role-distribution.json', stripKey(derived.roleDistribution, 'unexpected')],
      ['region-distribution.json', derived.regionDistribution],
      ['vibe-distribution.json', derived.vibeDistribution],
      ['vibe-by-role.json', derived.vibeByRole],
      ['satisfaction.json', derived.satisfaction],
      ['outlook.json', derived.outlook],
      ['tools.json', derived.tools],
      ['company-context.json', derived.companyContext],
      ['built-tool.json', derived.builtTool],
      ['trust-level.json', derived.trustLevel],
      ['blockers.json', derived.blockers],
      ['workflow-change.json', derived.workflowChange],
      ['workflow-change-by-company.json', derived.workflowChangeByCompany],
      ['investing-next.json', derived.investingNext],
      ['full-summary.json', derived.fullSummary],
    ]

    for (const [fileName, value] of writes) {
      await writeFile(path.join(dataDir, fileName), `${JSON.stringify(value, null, 2)}\n`)
    }

    await writeFile(path.join(dataDir, 'full-summary.csv'), derived.fullSummaryCsv)
    await writeFile(path.join(dataDir, 'responses.json'), `${JSON.stringify(rows, null, 2)}\n`)
  }

  if (!writeMode && (ledger.aggregate_mismatch_count > 0 || ledger.report_copy_mismatch_count > 0)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
