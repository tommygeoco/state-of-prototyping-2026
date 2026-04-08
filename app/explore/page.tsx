import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { KPIStripChart } from '@/components/charts/KPIStripChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { PageSection } from '@/components/layout/PageSection'
import { loadHeadline, loadOutlook, loadSatisfaction, loadTools, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

export const metadata = {
  title: 'Explore',
}

export default async function ExplorePage() {
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

  return (
    <PageSection
      eyebrow="Explore"
      title="Interactive Charts"
      intro="Every chart on this page is rendered live from the open summary tables and mirrored by the REST API."
    >
      <div className="space-y-6">
        <HeroStatChart
          value={vibe50?.value ?? 43.8}
          label="Designers spend 50%+ of output time on AI-generated code"
          supporting={[
            `${designEngineer?.pct.toFixed(1)}% among design engineers`,
            `${icDesigner?.pct.toFixed(1)}% among IC designers`,
          ]}
          callout="The 50%+ threshold is the primary adoption metric in the release because it marks respondents who have already crossed from occasional usage into workflow-level reliance."
        />
        <KPIStripChart
          items={kpiItems}
          callout="The KPI strip pairs adoption with behavior: it is not just that respondents use AI, but that many are already generating code and shipping their own tools."
        />
        <AccentHighlightBarChart
          items={tools.data}
          callout="The tool stack is still design-native at the top, but the rest of the top ten shows language models and agentic coding tools consolidating into weekly habits."
        />
        <AdoptionBySegmentChart
          items={vibeByRole.data}
          callout="Role is the clearest segmentation variable in the published cross-tabs. The design engineer cohort sits well ahead of everyone else, while researchers remain the most cautious."
        />
        <ComparativeSideBySideChart
          leftLabel="IC Designer"
          leftValue={icDesigner?.pct ?? 35.0}
          rightLabel="Design Engineer"
          rightValue={designEngineer?.pct ?? 80.9}
          callout="This side-by-side view turns the main role gap into a simple contrast. Design engineers are already working in conditions that reward heavy AI code generation."
        />
        <GroupedComparisonChart
          items={outlook.data}
          callout="Outlook diverges by seat. The more a role already includes implementation, the more likely respondents are to see AI as leverage instead of threat."
        />
        <SegmentedDistributionChart
          distribution={vibeDistribution}
          callout="The distribution shows a polarized market: the largest single bucket is still zero vibe coding, but the combined 50%+ share now rivals the cautious middle."
        />
        <DualAxisChart
          distribution={vibeDistribution}
          satisfaction={satisfaction}
          callout="Adoption share and satisfaction move in the same direction. The heavier the vibe-coding tier, the higher the reported workflow satisfaction."
        />
        <SatisfactionHeroDeltaChart
          overallMean={satisfaction.overall_mean}
          delta={satisfaction.delta.value}
          fromTier={satisfaction.delta.from_tier}
          toTier={satisfaction.delta.to_tier}
          callout="The average score alone is useful, but the delta is the story beat worth remembering: the difference between zero-vibe and nearly-all-vibe respondents is 1.46 points."
        />
      </div>
    </PageSection>
  )
}
