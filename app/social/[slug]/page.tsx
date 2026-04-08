import type { ReactNode } from 'react'

import { notFound } from 'next/navigation'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { SocialCardFrame } from '@/components/social/SocialCardFrame'
import { loadOutlook, loadSatisfaction, loadTools, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

const socialSlugs = [
  'hero',
  'tools',
  'vibe-by-role',
  'ic-vs-de',
  'outlook',
  'distribution',
  'satisfaction',
  'satisfaction-delta',
] as const

type SocialSlug = (typeof socialSlugs)[number]

export function generateStaticParams() {
  return socialSlugs.map((slug) => ({ slug }))
}

interface SocialPageProps {
  params: { slug: string }
}

export default async function SocialPage({ params }: SocialPageProps) {
  if (!socialSlugs.includes(params.slug as SocialSlug)) {
    notFound()
  }

  const [outlook, satisfaction, tools, vibeByRole, vibeDistribution] = await Promise.all([
    loadOutlook(),
    loadSatisfaction(),
    loadTools(),
    loadVibeByRole(),
    loadVibeDistribution(),
  ])

  const icDesigner = vibeByRole.data.find((item) => item.role === 'IC Designer')
  const designEngineer = vibeByRole.data.find((item) => item.role === 'Design Engineer')

  const socialCharts: Record<SocialSlug, ReactNode> = {
    hero: (
      <HeroStatChart value="43.8%" label="of designers spend more than half their building time vibe coding" />
    ),
    tools: (
      <AccentHighlightBarChart title="Top 10 Tools Used Every Week" items={tools.data} callout="Figma #1, Claude #2, ChatGPT #3." />
    ),
    'vibe-by-role': (
      <AdoptionBySegmentChart title="% Spending 50%+ Time Vibe Coding — By Role" items={vibeByRole.data} callout="Design engineers lead at 80.9%." />
    ),
    'ic-vs-de': (
      <ComparativeSideBySideChart title="50%+ Vibe Coding — IC vs DE" leftLabel="IC Designer" leftValue={icDesigner?.pct ?? 35.0} rightLabel="Design Engineer" rightValue={designEngineer?.pct ?? 80.9} callout="46-point gap." />
    ),
    outlook: (
      <GroupedComparisonChart title="Role Outlook — More Valuable vs. Less Secure" items={outlook.data} callout="Confidence tracks with implementation exposure." />
    ),
    distribution: (
      <SegmentedDistributionChart title="Vibe Coding Distribution — All Respondents" distribution={vibeDistribution} callout="38% do zero. 31% say most or all." />
    ),
    satisfaction: (
      <DualAxisChart title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)" satisfaction={satisfaction} callout={`${satisfaction.overall_mean.toFixed(1)}/10 overall mean.`} />
    ),
    'satisfaction-delta': (
      <SatisfactionHeroDeltaChart overallMean={satisfaction.overall_mean} delta={satisfaction.delta.value} fromTier={satisfaction.delta.from_tier} toTier={satisfaction.delta.to_tier} />
    ),
  }

  return <SocialCardFrame>{socialCharts[params.slug as SocialSlug]}</SocialCardFrame>
}
