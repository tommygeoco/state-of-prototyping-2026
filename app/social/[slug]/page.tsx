import type { ReactNode } from 'react'

import { notFound } from 'next/navigation'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { KPIStripChart } from '@/components/charts/KPIStripChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { SocialCardFrame } from '@/components/social/SocialCardFrame'
import { loadHeadline, loadOutlook, loadSatisfaction, loadTools, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

const socialSlugs = [
  'hero',
  'kpis',
  'tools',
  'vibe-by-role',
  'ic-vs-de',
  'outlook',
  'distribution',
  'dual-axis',
  'satisfaction-delta',
] as const

type SocialSlug = (typeof socialSlugs)[number]

export function generateStaticParams() {
  return socialSlugs.map((slug) => ({ slug }))
}

interface SocialPageProps {
  params: {
    slug: string
  }
}

export default async function SocialPage({ params }: SocialPageProps) {
  if (!socialSlugs.includes(params.slug as SocialSlug)) {
    notFound()
  }

  const [headline, outlook, satisfaction, tools, vibeByRole, vibeDistribution] = await Promise.all([
    loadHeadline(),
    loadOutlook(),
    loadSatisfaction(),
    loadTools(),
    loadVibeByRole(),
    loadVibeDistribution(),
  ])

  const vibe50 = headline.data.find((item) => item.key === 'vibe_coding_50plus')
  const builtTool = headline.data.find((item) => item.key === 'built_tool_with_ai')
  const generateCode = headline.data.find((item) => item.key === 'generate_code_ai')
  const icDesigner = vibeByRole.data.find((item) => item.role === 'IC Designer')
  const designEngineer = vibeByRole.data.find((item) => item.role === 'Design Engineer')
  const kpiItems = headline.data.filter((item) =>
    ['vibe_coding_50plus', 'built_tool_with_ai', 'generate_code_ai'].includes(item.key),
  )

  const socialCharts: Record<SocialSlug, ReactNode> = {
    hero: (
      <HeroStatChart
        value={vibe50?.value ?? 43.8}
        label="Designers spend 50%+ of output time on AI-generated code"
        supporting={[
          `${designEngineer?.pct.toFixed(1)}% among design engineers`,
          `${icDesigner?.pct.toFixed(1)}% among IC designers`,
        ]}
        callout="The defining headline of the release: nearly half of respondents already spend at least half of their output time on AI-generated code."
      />
    ),
    kpis: (
      <KPIStripChart
        items={kpiItems}
        callout="Three numbers frame the release: adoption, code generation, and tool building are all well beyond novelty."
      />
    ),
    tools: (
      <AccentHighlightBarChart
        items={tools.data}
        callout="Figma still anchors the workflow, but LLM-native tools now make up most of the rest of the top ten."
      />
    ),
    'vibe-by-role': (
      <AdoptionBySegmentChart
        items={vibeByRole.data}
        callout="Role is the clearest dividing line in the published cross-tabs, with design engineers far ahead of IC designers."
      />
    ),
    'ic-vs-de': (
      <ComparativeSideBySideChart
        leftLabel="IC Designer"
        leftValue={icDesigner?.pct ?? 35.0}
        rightLabel="Design Engineer"
        rightValue={designEngineer?.pct ?? 80.9}
        callout="The gap between these two roles captures the broader split in how AI-generated code is entering design workflows."
      />
    ),
    outlook: (
      <GroupedComparisonChart
        items={outlook.data}
        callout="Confidence tracks with implementation exposure: the more code-touching the role, the more optimistic the outlook."
      />
    ),
    distribution: (
      <SegmentedDistributionChart
        distribution={vibeDistribution}
        callout="The market is split between a large zero-vibe block and a rapidly growing 50%+ block."
      />
    ),
    'dual-axis': (
      <DualAxisChart
        distribution={vibeDistribution}
        satisfaction={satisfaction}
        callout="Adoption share and satisfaction rise together across the published vibe tiers."
      />
    ),
    'satisfaction-delta': (
      <SatisfactionHeroDeltaChart
        overallMean={satisfaction.overall_mean}
        delta={satisfaction.delta.value}
        fromTier={satisfaction.delta.from_tier}
        toTier={satisfaction.delta.to_tier}
        callout="The satisfaction gap is one of the strongest directional signals in the release."
      />
    ),
  }

  return <SocialCardFrame>{socialCharts[params.slug as SocialSlug]}</SocialCardFrame>
}
