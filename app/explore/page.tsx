import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { SocialCardContainer } from '@/components/charts/SocialCardContainer'
import { loadOutlook, loadSatisfaction, loadTools, loadVibeByRole, loadVibeDistribution } from '@/lib/data/loaders'

export const metadata = {
  title: 'State of Prototyping: Spring 2026',
  description: 'We asked 1,478 designers how they actually work. Here\'s what the data says about vibe coding, AI tools, workflow satisfaction, and role outlook.',
}

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
    <article>
      {/* ── Hero ── */}
      <header style={{ marginBottom: 48 }}>
        <p className="page-eyebrow">UX Tools Survey · Spring 2026</p>
        <h1 className="page-title" style={{ marginBottom: 16 }}>
          State of Prototyping:
          <br />
          Spring 2026
        </h1>
        <p className="lead-text">
          We asked 1,478 designers and builders how they actually work right now — what they
          use every week, how much they&apos;re vibe coding, whether they trust AI to ship, and
          what they&apos;re investing in next.
        </p>
      </header>

      {/* ── 1. The stack right now ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">1. The stack right now</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Five of the ten most-used weekly tools are now AI tools. That sentence didn&apos;t make
          sense two years ago.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Figma holds its seat. But Claude, ChatGPT, Claude Code, Figma Make, and Gemini now sit
          alongside it in the weekly rotation. The traditional design tool stack has been
          restructured from the inside.
        </p>
        <SocialCardContainer sponsor="Dazl">
          <AccentHighlightBarChart
            title="Top 10 Tools Used Every Week"
            items={tools.data}
            callout="Claude is the #2 tool after Figma — 50.8% weekly use. Claude Code at #4 (38.4%) ranks above FigJam and Slack. An AI coding terminal is now more embedded in designer workflows than any whiteboarding tool."
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;An AI coding terminal is more embedded in designer workflows than any
          whiteboarding tool. That shift happened quietly, and it happened fast.&rdquo;
        </div>
      </section>

      {/* ── 2. The vibe coding split ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">2. The vibe coding split</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This was the centerpiece question: how much of your building is actually vibe coding —
          using AI to generate code you may not fully understand, but that works?
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The answer landed in three roughly equal camps. The profession has split into thirds.
        </p>
        <SocialCardContainer sponsor="MagicPath">
          <HeroStatChart
            value="44%"
            label="of designers spend more than half their building time vibe coding"
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          43.8% spend 50%+ time vibe coding. 31.2% say most or nearly all. The 38% doing zero
          is the more surprising number — the hype has outpaced adoption at the tail.
        </p>
        <SocialCardContainer sponsor="Framer">
          <SegmentedDistributionChart
            title="Vibe Coding Distribution — All Respondents"
            distribution={vibeDistribution}
            callout="43.8% spend 50%+ time vibe coding. 31.2% say most or nearly all. The 38% doing zero is the more surprising number — the hype has outpaced adoption at the tail."
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;38% of designers do zero vibe coding. 31% say it&apos;s most or all of how they
          build. These aren&apos;t different generations — they&apos;re working in the same orgs,
          on the same products.&rdquo;
        </div>
      </section>

      {/* ── 3. Vibe coding by role ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">3. Vibe coding by role</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Same profession. Different reality. The vibe coding split isn&apos;t random — it maps
          almost perfectly to role type.
        </p>
        <SocialCardContainer sponsor="dscout">
          <AdoptionBySegmentChart
            title="% Spending 50%+ Time Vibe Coding — By Role"
            items={vibeByRole.data}
            callout={`Design engineers: ${designEngineer?.pct.toFixed(1)}%. IC designers: ${icDesigner?.pct.toFixed(1)}%. A 46-point gap between two roles in the same design org.`}
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The managers-at-47% number is telling. Vibe coding didn&apos;t just serve engineers — it
          gave managers and non-designers an exit from prototyping constraints they&apos;ve always had.
        </p>
      </section>

      {/* ── 4. IC Designer vs Design Engineer ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">4. IC Designer vs Design Engineer</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The two largest practitioner roles sit on opposite sides of the vibe coding divide.
          Design engineers at {designEngineer?.pct.toFixed(1)}% vs. IC designers
          at {icDesigner?.pct.toFixed(1)}%. Same profession, different reality.
        </p>
        <SocialCardContainer sponsor="MagicPatterns">
          <ComparativeSideBySideChart
            title="50%+ Vibe Coding — IC Designer vs Design Engineer"
            leftLabel="IC Designer"
            leftValue={icDesigner?.pct ?? 35.0}
            rightLabel="Design Engineer"
            rightValue={designEngineer?.pct ?? 80.9}
            callout="Design engineers are already working in conditions that reward heavy AI code generation. IC designers are still mostly in Figma."
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 5. How designers feel about their role ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">5. How designers feel about their role</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Your confidence tracks with your seat. Design engineers are the most optimistic.
          Researchers are the most anxious. The gap between those two groups is the sharpest
          finding in the survey.
        </p>
        <SocialCardContainer sponsor="Mobbin">
          <GroupedComparisonChart
            title="Role Outlook — More Valuable vs. Less Secure"
            items={outlook.data}
            callout="Researcher anxiety is the loudest signal in this table. 39.1% feel less secure — highest in the survey. Design engineers invert that entirely: 50% more valuable, only 11% less secure."
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;IC designers and researchers are the most exposed. They&apos;re also the largest
          groups in most design orgs. This is the conversation that&apos;s not happening loudly
          enough.&rdquo;
        </div>
      </section>

      {/* ── 6. The satisfaction gap ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">6. The satisfaction gap</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          1.5 points separates the floor from the ceiling. Both are people with the same job
          title. The difference is how much of their workflow runs on AI.
        </p>
        <SocialCardContainer sponsor="dscout">
          <DualAxisChart
            title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)"
            satisfaction={satisfaction}
            callout={`${satisfaction.overall_mean.toFixed(1)}/10 overall mean. The satisfaction curve is nearly linear with adoption.`}
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This isn&apos;t proof that vibe coding causes satisfaction. The causality likely runs both
          ways. But the correlation is strong enough to take seriously.
        </p>
        <SocialCardContainer sponsor="Framer">
          <SatisfactionHeroDeltaChart
            overallMean={satisfaction.overall_mean}
            delta={satisfaction.delta.value}
            fromTier={satisfaction.delta.from_tier}
            toTier={satisfaction.delta.to_tier}
          />
        </SocialCardContainer>
      </section>

      {/* ── Summary ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">The story in summary</h2>
        <p className="body-text" style={{ marginBottom: 24 }}>
          Six findings that capture what this data actually says.
        </p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            {
              title: 'Claude is the #2 weekly tool in design, after Figma.',
              body: '50.8% of designers use it every week. Claude Code sits at #4 — ahead of every collaboration tool. An AI coding terminal now ranks above FigJam in the designer\'s everyday stack.',
            },
            {
              title: '44% of designers spend more than half their building time vibe coding.',
              body: 'The profession has split into thirds: no vibe coding (38%), some (18%), and majority AI-generated code (44%). Design engineers at 80.9% vs. IC designers at 35%. Same profession, different reality.',
            },
            {
              title: '59% of designers have built their own tool with AI in the last 6 months.',
              body: 'One in four does it regularly. Only 10.5% have no plans to. The builder instinct is spreading across the design org — no longer limited to engineers.',
            },
            {
              title: 'The top 3 blockers are nearly tied — and none of them are \'AI doesn\'t work.\'',
              body: 'Time to learn (55.6%), too many tools (53.1%), output quality (52.2%) — within 3 points of each other. The barrier isn\'t belief in AI. It\'s time, clarity, and consistency.',
            },
            {
              title: 'Design engineers feel more valuable. Researchers feel most at risk.',
              body: 'Design engineers: 50% more valuable, 11% less secure. Researchers: 17% more valuable, 39% less secure. The confidence gap tracks directly with proximity to code.',
            },
            {
              title: 'Vibe coders are 1.5 points more satisfied with their workflow.',
              body: 'No vibe coding: 5.9/10. Heavy vibe coders: 7.4/10. The satisfaction gradient is nearly perfectly linear across adoption levels.',
            },
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                {index + 1}. {item.title}
              </p>
              <p className="body-text">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
