import dynamic from 'next/dynamic'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { SocialCardContainer } from '@/components/charts/SocialCardContainer'
import { loadBlockers, loadBuiltTool, loadCompanyContext, loadHeadline, loadInvestingNext, loadOutlook, loadRegionDistribution, loadSatisfaction, loadTools, loadTrustLevel, loadVibeByRole, loadVibeDistribution, loadWorkflowChange, loadWorkflowChangeByCompany } from '@/lib/data/loaders'

const AdoptionBySegmentChart = dynamic(() =>
  import('@/components/charts/AdoptionBySegmentChart').then((m) => m.AdoptionBySegmentChart),
)
const ComparativeSideBySideChart = dynamic(() =>
  import('@/components/charts/ComparativeSideBySideChart').then((m) => m.ComparativeSideBySideChart),
)
const DualAxisChart = dynamic(() =>
  import('@/components/charts/DualAxisChart').then((m) => m.DualAxisChart),
)
const GroupedComparisonChart = dynamic(() =>
  import('@/components/charts/GroupedComparisonChart').then((m) => m.GroupedComparisonChart),
)
const HeroStatChart = dynamic(() =>
  import('@/components/charts/HeroStatChart').then((m) => m.HeroStatChart),
)
const SatisfactionHeroDeltaChart = dynamic(() =>
  import('@/components/charts/SatisfactionHeroDeltaChart').then((m) => m.SatisfactionHeroDeltaChart),
)
const SegmentedDistributionChart = dynamic(() =>
  import('@/components/charts/SegmentedDistributionChart').then((m) => m.SegmentedDistributionChart),
)

export const metadata = {
  title: 'State of Prototyping: Spring 2026',
  description: 'We asked 1,478 designers how they actually work. Here\'s what the data says about vibe coding, AI tools, workflow satisfaction, and role outlook.',
}

export default async function ExplorePage() {
  const [
    blockers, builtTool, companyContext, headline, investingNext, outlook,
    regionDistribution, satisfaction, tools, trustLevel, vibeByRole, vibeDistribution,
    workflowChange, workflowChangeByCompany,
  ] = await Promise.all([
    loadBlockers(),
    loadBuiltTool(),
    loadCompanyContext(),
    loadHeadline(),
    loadInvestingNext(),
    loadOutlook(),
    loadRegionDistribution(),
    loadSatisfaction(),
    loadTools(),
    loadTrustLevel(),
    loadVibeByRole(),
    loadVibeDistribution(),
    loadWorkflowChange(),
    loadWorkflowChangeByCompany(),
  ])

  const icDesigner = vibeByRole.data.find((item) => item.role === 'IC Designer')
  const designEngineer = vibeByRole.data.find((item) => item.role === 'Design Engineer')
  const managerDirector = vibeByRole.data.find((item) => item.role === 'Manager / Director')
  const westernEurope = regionDistribution.data.find((item) => item.region === 'Western Europe')
  const southAsia = regionDistribution.data.find((item) => item.region === 'South Asia')
  const southeastAsia = regionDistribution.data.find((item) => item.region === 'Southeast Asia')
  const noneVibe = vibeDistribution.data.find((item) => item.tier === 'None (0%)')
  const mostVibe = vibeDistribution.data.find((item) => item.tier === 'Most of it')
  const nearlyAllVibe = vibeDistribution.data.find((item) => item.tier === 'Nearly all')
  const builtSomething = headline.data.find((item) => item.key === 'built_tool_with_ai')
  const wantToBuild = builtTool.data.find((item) => item.label === 'No, but I want to')
  const noBuildPlans = builtTool.data.find((item) => item.label === "No, don't plan to")
  const reviewBeforeShipping = trustLevel.data.find((item) => item.label === 'Review before shipping')
  const shipsWithMinorTweaks = trustLevel.data.find((item) => item.label === 'Ships with minor tweaks')
  const fullTrust = trustLevel.data.find((item) => item.label === 'Full trust, no oversight')
  const startupAiCentral = workflowChangeByCompany.data.find((item) => item.context === 'Startup (2–100)')
  const enterpriseAiCentral = workflowChangeByCompany.data.find((item) => item.context === 'Enterprise (1,000+)')
  const agentWorkflows = investingNext.data.find((item) => item.label === 'Agent workflows')
  const designSystems = investingNext.data.find((item) => item.label === 'Design systems & tokens')
  const researcherOutlook = outlook.data.find((item) => item.role === 'Researcher')
  const noneSatisfaction = satisfaction.data.find((item) => item.tier === 'None (0%)')
  const heavySatisfaction = satisfaction.data.find((item) => item.tier === 'Nearly all')

  const mostOrNearlyAllPct = ((mostVibe?.pct ?? 0) + (nearlyAllVibe?.pct ?? 0)).toFixed(1)
  const productionWithReviewPct = (
    (reviewBeforeShipping?.pct ?? 0) + (shipsWithMinorTweaks?.pct ?? 0)
  ).toFixed(1)
  const blockerSpread = (blockers.data[0].pct - blockers.data[2].pct).toFixed(1)
  const addedOrCentralPct = (
    (workflowChange.data.find((item) => item.label === 'Added AI tools')?.pct ?? 0) +
    (workflowChange.data.find((item) => item.label === 'AI is now central')?.pct ?? 0)
  ).toFixed(1)
  const startupEnterpriseGap = (
    (startupAiCentral?.pct ?? 0) - (enterpriseAiCentral?.pct ?? 0)
  ).toFixed(1)

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

      {/* ── 1. Who took this survey ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">1. Who took this survey</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This is the first edition of our quarterly State of Prototyping — a recurring snapshot
          built specifically for designers and builders who work across the design-to-code spectrum.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {regionDistribution.pct_outside_na.pct.toFixed(1)}% of respondents are outside North
          America. Western Europe ({westernEurope?.pct.toFixed(1)}%), South Asia (
          {southAsia?.pct.toFixed(1)}%), and Southeast Asia ({southeastAsia?.pct.toFixed(1)}%) are
          the largest non-North America regions. This is a global read on how
          design practitioners work.
        </p>
        <SocialCardContainer sponsor="MagicPatterns" anchorId="where-designers-work">
          <SimpleBarChart
            title="Where Designers Work"
            subtitle="Company size and work setting — 1,478 respondents, Spring 2026"
            items={companyContext.data}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 2. The stack right now ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">2. The stack right now</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Five of the ten most-used weekly tools are now AI tools. That sentence didn&apos;t make
          sense two years ago.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Figma holds its seat. But Claude, ChatGPT, Claude Code, Figma Make, and Gemini now sit
          alongside it in the weekly rotation. The traditional design tool stack has been
          restructured from the inside.
        </p>
        <SocialCardContainer sponsor="Dazl" anchorId="top-10-weekly-tools">
          <AccentHighlightBarChart
            title="5 of the Top 10 Weekly Tools Are Now AI"
            subtitle="What designers use every week — % of respondents"
            items={tools.data}
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;An AI coding terminal is more embedded in designer workflows than any
          whiteboarding tool. That shift happened quietly, and it happened fast.&rdquo;
        </div>
      </section>

      {/* ── 3. The vibe coding split ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">3. The vibe coding split</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This was the centerpiece question: how much of your building is actually vibe coding —
          using AI to generate code you may not fully understand, but that works?
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The answer landed in three roughly equal camps. The profession has split into thirds.
        </p>
        <SocialCardContainer sponsor="MagicPath" centered anchorId="vibe-coding-hero">
          <HeroStatChart
            value="43.8%"
            accentLabel="Vibe Coding 50%+"
            label="of designers now spend more than half their building time on AI-generated code"
          />

        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {vibeDistribution.pct_50plus.pct.toFixed(1)}% spend 50%+ time vibe coding. {mostOrNearlyAllPct}% say most or nearly all. The {noneVibe?.pct.toFixed(1)}% doing zero is the more surprising number — the hype has outpaced adoption at the tail.
        </p>
        <SocialCardContainer sponsor="Framer" anchorId="vibe-coding-distribution">
          <SegmentedDistributionChart
            title="The Profession Has Split Into Thirds"
            subtitle="How much of your building time is AI-generated code?"
            distribution={vibeDistribution}
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;{noneVibe?.pct.toFixed(1)}% of designers do zero vibe coding. {mostOrNearlyAllPct}% say it&apos;s most or all of how they
          build. These aren&apos;t different generations — they&apos;re working in the same orgs,
          on the same products.&rdquo;
        </div>
      </section>

      {/* ── 4. Vibe coding by role ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">4. Vibe coding by role</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Same profession. Different reality. The vibe coding split isn&apos;t random — it maps
          almost perfectly to role type.
        </p>
        <SocialCardContainer sponsor="dscout" anchorId="vibe-by-role">
          <AdoptionBySegmentChart
            title={`An ${designEngineer?.pct.toFixed(1) ?? '80.9'}% vs ${icDesigner?.pct.toFixed(1) ?? '35.0'}% Split in the Same Design Org`}
            subtitle="% spending 50%+ of building time on AI-generated code, by role"
            items={vibeByRole.data}
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The managers-at-{managerDirector?.pct.toFixed(1)}% number is telling. Vibe coding didn&apos;t just serve engineers — it
          gave managers and non-designers an exit from prototyping constraints they&apos;ve always had.
        </p>
        <SocialCardContainer sponsor="MagicPatterns" anchorId="ic-vs-design-engineer">
          <ComparativeSideBySideChart
            title="Same Profession, Different Reality"
            subtitle="% spending 50%+ time on AI-generated code"
            leftLabel="IC Designer"
            leftValue={icDesigner?.pct ?? 35.0}
            rightLabel="Design Engineer"
            rightValue={designEngineer?.pct ?? 80.9}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 5. Who's building their own tools ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">5. Who&apos;s building their own tools</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {builtSomething?.value.toFixed(1)}% of designers have built their own tool, app, or utility with AI in the last 6 months. One in four does it regularly.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          That number would have been in the low single digits two years ago. The ability to build
          something for yourself — not a product, just a thing that solves your own problem — has
          unlocked a new kind of creative leverage.
        </p>
        <SocialCardContainer sponsor="Framer" anchorId="built-own-tool">
          <SimpleBarChart
            title={`${builtSomething?.value.toFixed(1)}% of Designers Have Built Their Own AI Tool`}
            subtitle="Have you built your own tool, app, or utility with AI? — last 6 months"
            items={builtTool.data}
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {builtSomething?.value.toFixed(1)}% have built something. {wantToBuild?.pct.toFixed(1)}% want to but haven&apos;t yet. Only {noBuildPlans?.pct.toFixed(1)}% have no plans to.
          The intent-to-try cohort is bigger than the never-will cohort by 3x.
        </p>
      </section>

      {/* ── 6. The trust line ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">6. The trust line</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Only {fullTrust?.pct.toFixed(1)}% trust AI output without oversight. But {productionWithReviewPct}% trust it for production — with review. That&apos;s a bigger number than most people would have guessed.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          We&apos;re in the &ldquo;first drafts I heavily edit&rdquo; era. The trust line isn&apos;t whether AI
          works. It&apos;s how much cleanup it takes before it&apos;s usable.
        </p>
        <SocialCardContainer sponsor="Mobbin" anchorId="trust-level">
          <SimpleBarChart
            title="Only 1.4% Trust AI Output Without Oversight"
            subtitle="How far do you trust AI-generated output in your workflow?"
            items={trustLevel.data}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 7. What's blocking everyone ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">7. What&apos;s blocking everyone</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The top 3 blockers are within {blockerSpread} percentage points of each other. That&apos;s not noise —
          that&apos;s signal. Three simultaneous problems, nearly identical in size.
        </p>
        <SocialCardContainer sponsor="dscout" anchorId="top-blockers">
          <SimpleBarChart
            title={`The Top 3 Blockers Are Within ${blockerSpread} Points of Each Other`}
            subtitle="What's slowing down your workflow the most?"
            items={blockers.data}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 8. How workflows changed in 6 months ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">8. How workflows changed in 6 months</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {addedOrCentralPct}% have added AI or gone AI-central in the last 6 months. Only {(workflowChange.data.find((item) => item.label === 'Mostly the same')?.pct ?? 0).toFixed(1)}% say
          &ldquo;mostly the same.&rdquo; The shift already happened. The question is how far
          you&apos;ve gone.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Startups lead the AI-central shift at {startupAiCentral?.pct.toFixed(1)}%. Enterprise is close behind at {enterpriseAiCentral?.pct.toFixed(1)}% — a much narrower {startupEnterpriseGap}-point gap.
        </p>
        <SocialCardContainer sponsor="Dazl" anchorId="workflow-change">
          <SimpleBarChart
            title="71% Have Added AI or Gone AI-Central in 6 Months"
            subtitle="How has your design workflow changed since late 2025?"
            items={workflowChange.data}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 9. How designers feel about their role ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">9. How designers feel about their role</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Your confidence tracks with your seat. Design engineers are the most optimistic.
          Researchers are the most anxious. The gap between those two groups is the sharpest
          finding in the survey.
        </p>
        <SocialCardContainer sponsor="Mobbin" anchorId="role-outlook">
          <GroupedComparisonChart
            title="Design Engineers Feel More Valuable. Researchers Feel Most at Risk."
            subtitle="How do you think AI will affect your role in the next 2 years?"
            items={outlook.data}
            bare
          />
        </SocialCardContainer>
        <div className="pull-quote">
          &ldquo;IC designers and researchers are the most exposed. They&apos;re also the largest
          groups in most design orgs. This is the conversation that&apos;s not happening loudly
          enough.&rdquo;
        </div>
      </section>

      {/* ── 10. Where designers are investing next ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">10. Where designers are investing next</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Two of the top 3 are AI. Design systems are the only holdout in the top tier — and
          that&apos;s not an accident. Systems work is how you stay relevant when the output layer
          gets automated.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          {investingNext.data[0].pct.toFixed(1)}% say AI-generated coding is their top investment. Agent workflows at {agentWorkflows?.pct.toFixed(1)}% is about automating repetitive work. Design systems at {designSystems?.pct.toFixed(1)}% shows the systems layer isn&apos;t dead —
          it&apos;s getting more important as implementation gets easier.
        </p>
        <SocialCardContainer sponsor="MagicPath" anchorId="investing-next">
          <SimpleBarChart
            title="2 of the Top 3 Investment Areas Are AI"
            subtitle="Where are you investing your time in the next 12 months? (pick 3)"
            items={investingNext.data}
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 11. The satisfaction gap ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">11. The satisfaction gap</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          1.5 points separates the floor from the ceiling. Both are people with the same job
          title. The difference is how much of their workflow runs on AI.
        </p>
        <SocialCardContainer sponsor="dscout" anchorId="satisfaction-by-vibe">
          <DualAxisChart
            title="Heavier Vibe Coders Are More Satisfied"
            subtitle="Mean workflow satisfaction (1–10) by vibe coding level"
            satisfaction={satisfaction}
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This isn&apos;t proof that vibe coding causes satisfaction. The causality likely runs both
          ways. But the correlation is strong enough to take seriously.
        </p>
        <SocialCardContainer sponsor="Framer" centered anchorId="satisfaction-delta">
          <SatisfactionHeroDeltaChart
            overallMean={satisfaction.overall_mean}
            delta={satisfaction.delta.value}
            fromTier={satisfaction.delta.from_tier}
            toTier={satisfaction.delta.to_tier}
          />
        </SocialCardContainer>
      </section>

      {/* ── 12. The story in summary ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">12. The story in summary</h2>
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
              title: '43.8% of designers spend more than half their building time vibe coding.',
              body: 'The profession has split into thirds: no vibe coding (37.7%), some (18.5%), and majority AI-generated code (43.8%). Design engineers at 80.9% vs. IC designers at 35.0%. Same profession, different reality.',
            },
            {
              title: '59.1% of designers have built their own tool with AI in the last 6 months.',
              body: 'One in four does it regularly. Only 10.4% have no plans to. The builder instinct is spreading across the design org — no longer limited to engineers.',
            },
            {
              title: 'The top 3 blockers are nearly tied — and none of them are \'AI doesn\'t work.\'',
              body: 'Time to learn (55.7%), too many tools (53.0%), output quality (52.2%) — within 3.5 points of each other. The barrier isn\'t belief in AI. It\'s time, clarity, and consistency.',
            },
            {
              title: 'Design engineers feel more valuable. Researchers feel most at risk.',
              body: 'Design engineers: 50.0% more valuable, 10.6% less secure. Researchers: 17.4% more valuable, 39.1% less secure. The confidence gap tracks directly with proximity to code.',
            },
            {
              title: 'Vibe coders are 1.5 points more satisfied with their workflow.',
              body: 'No vibe coding: 5.93/10. Heavy vibe coders: 7.39/10. The satisfaction gradient is nearly perfectly linear across adoption levels.',
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

      {/* ── Methodology note ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Methodology</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The State of Prototyping Spring 2026 survey ran from March 14 to April 6, 2026 and
          collected 1,478 responses from designers and builders across 18 world regions. Distribution
          was via UX Tools newsletter, social channels, and sponsor networks.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Published charts use aggregated data, and the full de-identified microdata is also
          available for download. One malformed role response in the raw CSV is excluded from
          role-based breakdown tables. The &ldquo;Researcher&rdquo; role (n=23) should be treated as
          directional only due to small sample size. Multi-select questions sum to more than 100%.
          Cross-tab percentages are calculated within each role&apos;s n.
        </p>
        <p className="body-text">
          The full dataset is available under CC BY 4.0. Citation: UX Tools. (2026). State of
          Prototyping Spring 2026. https://survey.uxtools.co.
        </p>
      </section>
    </article>
  )
}
