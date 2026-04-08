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

async function renderChart(slug: SocialSlug): Promise<ReactNode> {
  switch (slug) {
    case 'hero':
      return (
        <HeroStatChart value="43.8%" label="of designers spend more than half their building time vibe coding" />
      )
    case 'tools': {
      const tools = await loadTools()
      return <AccentHighlightBarChart title="Top 10 Tools Used Every Week" items={tools.data} />
    }
    case 'vibe-by-role': {
      const vibeByRole = await loadVibeByRole()
      return <AdoptionBySegmentChart title="% Spending 50%+ Time Vibe Coding — By Role" items={vibeByRole.data} />
    }
    case 'ic-vs-de': {
      const vibeByRole = await loadVibeByRole()
      const ic = vibeByRole.data.find((item) => item.role === 'IC Designer')
      const de = vibeByRole.data.find((item) => item.role === 'Design Engineer')
      return <ComparativeSideBySideChart title="50%+ Vibe Coding — IC vs DE" leftLabel="IC Designer" leftValue={ic?.pct ?? 35.0} rightLabel="Design Engineer" rightValue={de?.pct ?? 80.9} />
    }
    case 'outlook': {
      const outlook = await loadOutlook()
      return <GroupedComparisonChart title="Role Outlook — More Valuable vs. Less Secure" items={outlook.data} />
    }
    case 'distribution': {
      const vibeDistribution = await loadVibeDistribution()
      return <SegmentedDistributionChart title="Vibe Coding Distribution — All Respondents" distribution={vibeDistribution} />
    }
    case 'satisfaction': {
      const satisfaction = await loadSatisfaction()
      return <DualAxisChart title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)" satisfaction={satisfaction} />
    }
    case 'satisfaction-delta': {
      const satisfaction = await loadSatisfaction()
      return <SatisfactionHeroDeltaChart overallMean={satisfaction.overall_mean} delta={satisfaction.delta.value} fromTier={satisfaction.delta.from_tier} toTier={satisfaction.delta.to_tier} />
    }
  }
}

export default async function SocialPage({ params }: SocialPageProps) {
  if (!socialSlugs.includes(params.slug as SocialSlug)) {
    notFound()
  }

  const chart = await renderChart(params.slug as SocialSlug)

  return <SocialCardFrame>{chart}</SocialCardFrame>
}
