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
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { SocialCardFrame } from '@/components/social/SocialCardFrame'
import { loadBuiltTool, loadHeadline, loadOutlook, loadSatisfaction, loadTools, loadTrustLevel, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

const socialSlugMap = {
  hero: 'vibe-coding-hero',
  'vibe-coding-hero': 'vibe-coding-hero',
  tools: 'top-10-weekly-tools',
  'top-10-weekly-tools': 'top-10-weekly-tools',
  'vibe-by-role': 'vibe-by-role',
  'ic-vs-de': 'ic-vs-design-engineer',
  'ic-vs-design-engineer': 'ic-vs-design-engineer',
  outlook: 'role-outlook',
  'role-outlook': 'role-outlook',
  distribution: 'vibe-coding-distribution',
  'vibe-coding-distribution': 'vibe-coding-distribution',
  satisfaction: 'satisfaction-by-vibe',
  'satisfaction-by-vibe': 'satisfaction-by-vibe',
  'satisfaction-delta': 'satisfaction-delta',
  'built-own-tool': 'built-own-tool',
  'trust-level': 'trust-level',
} as const

type SocialSlug = keyof typeof socialSlugMap
type CanonicalSocialSlug = (typeof socialSlugMap)[SocialSlug]

export function generateStaticParams() {
  return Object.keys(socialSlugMap).map((slug) => ({ slug }))
}

interface SocialPageProps {
  params: Promise<{ slug: string }>
}

async function renderChart(slug: CanonicalSocialSlug): Promise<ReactNode> {
  switch (slug) {
    case 'vibe-coding-hero': {
      const headline = await loadHeadline()
      const vibeCoding = headline.data.find((item) => item.key === 'vibe_coding_50plus')
      return (
        <HeroStatChart
          value={`${vibeCoding?.value.toFixed(1) ?? '43.8'}%`}
          label="of designers spend more than half their building time vibe coding"
        />
      )
    }
    case 'top-10-weekly-tools': {
      const tools = await loadTools()
      return <AccentHighlightBarChart title="5 of the Top 10 Weekly Tools Are Now AI" items={tools.data} />
    }
    case 'vibe-by-role': {
      const vibeByRole = await loadVibeByRole()
      const ic = vibeByRole.data.find((item) => item.role === 'IC Designer')
      const de = vibeByRole.data.find((item) => item.role === 'Design Engineer')
      return (
        <AdoptionBySegmentChart
          title={`An ${de?.pct.toFixed(1) ?? '80.9'}% vs ${ic?.pct.toFixed(1) ?? '35.0'}% Split in the Same Design Org`}
          items={vibeByRole.data}
        />
      )
    }
    case 'ic-vs-design-engineer': {
      const vibeByRole = await loadVibeByRole()
      const ic = vibeByRole.data.find((item) => item.role === 'IC Designer')
      const de = vibeByRole.data.find((item) => item.role === 'Design Engineer')
      return <ComparativeSideBySideChart title="Same Profession, Different Reality" leftLabel="IC Designer" leftValue={ic?.pct ?? 35.0} leftN={ic?.n} rightLabel="Design Engineer" rightValue={de?.pct ?? 80.9} rightN={de?.n} />
    }
    case 'role-outlook': {
      const outlook = await loadOutlook()
      return <GroupedComparisonChart title="Design Engineers Feel More Valuable. Researchers Feel Most at Risk." items={outlook.data} />
    }
    case 'vibe-coding-distribution': {
      const vibeDistribution = await loadVibeDistribution()
      return <SegmentedDistributionChart title="The Profession Has Split Into Thirds" distribution={vibeDistribution} />
    }
    case 'built-own-tool': {
      const builtTool = await loadBuiltTool()
      const builtSomething = builtTool.data
        .filter((item) => item.label === 'Yes, once or twice' || item.label === 'Yes, I do it regularly')
        .reduce((sum, item) => sum + item.pct, 0)
      return (
        <SimpleBarChart
          title={`${builtSomething.toFixed(1)}% of Designers Have Built Their Own AI Tool`}
          subtitle="Have you built your own tool, app, or utility with AI? — last 6 months"
          items={builtTool.data}
          totalN={builtTool.n}
        />
      )
    }
    case 'trust-level': {
      const trustLevel = await loadTrustLevel()
      const trustWithReview = (
        (trustLevel.data.find((item) => item.label === 'Review before shipping')?.pct ?? 0) +
        (trustLevel.data.find((item) => item.label === 'Ships with minor tweaks')?.pct ?? 0)
      ).toFixed(1)
      return (
        <SimpleBarChart
          title={`${trustWithReview}% Trust AI for Production With Review`}
          subtitle="How far do you trust AI-generated output in your workflow?"
          items={trustLevel.data}
          totalN={trustLevel.n}
        />
      )
    }
    case 'satisfaction-by-vibe': {
      const [satisfaction, vibeDistribution] = await Promise.all([loadSatisfaction(), loadVibeDistribution()])
      return <DualAxisChart title="Heavier Vibe Coders Are More Satisfied" satisfaction={satisfaction} tierCounts={Object.fromEntries(vibeDistribution.data.map((d) => [d.tier, d.n]))} />
    }
    case 'satisfaction-delta': {
      const satisfaction = await loadSatisfaction()
      return <SatisfactionHeroDeltaChart overallMean={satisfaction.overall_mean} delta={satisfaction.delta.value} fromTier={satisfaction.delta.from_tier} toTier={satisfaction.delta.to_tier} />
    }
  }
}

export default async function SocialPage({ params }: SocialPageProps) {
  const { slug } = await params

  if (!(slug in socialSlugMap)) {
    notFound()
  }

  const chart = await renderChart(socialSlugMap[slug as SocialSlug])

  return <SocialCardFrame>{chart}</SocialCardFrame>
}
