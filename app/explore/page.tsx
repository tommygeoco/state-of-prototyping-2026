import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { PageSection } from '@/components/layout/PageSection'
import { loadOutlook, loadSatisfaction, loadTools, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

export const metadata = { title: 'Explore' }

export default async function ExplorePage() {
  const [outlook, satisfaction, tools, vibeByRole, vibeDistribution] = await Promise.all([
    loadOutlook(),
    loadSatisfaction(),
    loadTools(),
    loadVibeByRole(),
    loadVibeDistribution(),
  ])

  const icDesigner = vibeByRole.data.find((item) => item.role === 'IC Designer')
  const designEngineer = vibeByRole.data.find((item) => item.role === 'Design Engineer')

  return (
    <>
      <section style={{ marginBottom: 64 }}>
        <p className="page-eyebrow" style={{ marginBottom: 16 }}>Explore</p>
        <h1 className="page-title" style={{ marginBottom: 24 }}>Interactive Charts</h1>
        <p className="lead-text">
          Every chart on this page is rendered live from the open summary tables.
          The same JSON files power the REST API and the downloadable dataset.
        </p>
      </section>

      <PageSection
        eyebrow="Section 01"
        title="The vibe coding split"
        intro="This was the centerpiece question: how much of your building is actually vibe coding — using AI to generate code you may not fully understand, but that works?"
      >
        <HeroStatChart
          value="44%"
          label="of designers spend more than half their building time vibe coding"
        />
        <SegmentedDistributionChart
          title="Vibe Coding Distribution — All Respondents"
          distribution={vibeDistribution}
          callout="43.8% spend 50%+ time vibe coding. 31.2% say most or nearly all. The 38% doing zero is the more surprising number — the hype has outpaced adoption at the tail."
        />
        <div className="pull-quote">
          &ldquo;38% of designers do zero vibe coding. 31% say it&apos;s most or all of how they build.
          These aren&apos;t different generations — they&apos;re working in the same orgs, on the same products.&rdquo;
        </div>
      </PageSection>

      <PageSection
        eyebrow="Section 02"
        title="The stack right now"
        intro="Five of the ten most-used weekly tools are now AI tools. Figma holds its seat. But Claude, ChatGPT, Claude Code, Figma Make, and Gemini now sit alongside it in the weekly rotation."
      >
        <AccentHighlightBarChart
          title="Top 10 Tools Used Every Week"
          items={tools.data}
          callout="Claude is the #2 tool after Figma — 50.8% weekly use. Claude Code at #4 (38.4%) ranks above FigJam and Slack."
        />
      </PageSection>

      <PageSection
        eyebrow="Section 03"
        title="Vibe coding by role"
        intro="Same profession. Different reality. The vibe coding split isn't random — it maps almost perfectly to role type."
      >
        <AdoptionBySegmentChart
          title="% Spending 50%+ Time Vibe Coding — By Role"
          items={vibeByRole.data}
          callout={`Design engineers: ${designEngineer?.pct.toFixed(1)}%. IC designers: ${icDesigner?.pct.toFixed(1)}%. A 46-point gap between two roles in the same design org.`}
        />
        <div className="pull-quote">
          &ldquo;The managers-at-47% number is telling. Vibe coding didn&apos;t just serve engineers — it gave
          managers and non-designers an exit from prototyping constraints they&apos;ve always had.&rdquo;
        </div>
      </PageSection>

      <PageSection
        eyebrow="Section 04"
        title="IC Designer vs Design Engineer"
        intro="The two largest practitioner roles sit on opposite sides of the vibe coding divide."
      >
        <ComparativeSideBySideChart
          title="50%+ Vibe Coding — IC Designer vs Design Engineer"
          leftLabel="IC Designer"
          leftValue={icDesigner?.pct ?? 35.0}
          rightLabel="Design Engineer"
          rightValue={designEngineer?.pct ?? 80.9}
          callout="Design engineers are already working in conditions that reward heavy AI code generation. IC designers are still mostly in Figma."
        />
      </PageSection>

      <PageSection
        eyebrow="Section 05"
        title="How designers feel about their role"
        intro="Your confidence tracks with your seat. Design engineers are the most optimistic. Researchers are the most anxious."
      >
        <GroupedComparisonChart
          title="Role Outlook — More Valuable vs. Less Secure"
          items={outlook.data}
          callout="Researcher anxiety is the loudest signal in this table. 39.1% feel less secure — highest in the survey. Design engineers invert that entirely: 50% more valuable, only 11% less secure."
        />
        <div className="pull-quote">
          &ldquo;IC designers and researchers are the most exposed. They&apos;re also the largest
          groups in most design orgs. This is the conversation that&apos;s not happening loudly enough.&rdquo;
        </div>
      </PageSection>

      <PageSection
        eyebrow="Section 06"
        title="The satisfaction gap"
        intro="1.5 points separates the floor from the ceiling. Both are people with the same job title. The difference is how much of their workflow runs on AI."
      >
        <DualAxisChart
          title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)"
          satisfaction={satisfaction}
          callout={`${satisfaction.overall_mean.toFixed(1)}/10 overall mean. The satisfaction curve is nearly linear with adoption.`}
        />
        <SatisfactionHeroDeltaChart
          overallMean={satisfaction.overall_mean}
          delta={satisfaction.delta.value}
          fromTier={satisfaction.delta.from_tier}
          toTier={satisfaction.delta.to_tier}
        />
      </PageSection>
    </>
  )
}
