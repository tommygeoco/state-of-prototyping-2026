import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { AdoptionBySegmentChart } from '@/components/charts/AdoptionBySegmentChart'
import { ComparativeSideBySideChart } from '@/components/charts/ComparativeSideBySideChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { GroupedComparisonChart } from '@/components/charts/GroupedComparisonChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { SegmentedDistributionChart } from '@/components/charts/SegmentedDistributionChart'
import { SimpleBarChart } from '@/components/charts/SimpleBarChart'
import { SocialCardContainer } from '@/components/charts/SocialCardContainer'
import { loadBlockers, loadBuiltTool, loadCompanyContext, loadInvestingNext, loadOutlook, loadSatisfaction, loadTools, loadTrustLevel, loadVibeByRole, loadVibeDistribution, loadWorkflowChange } from '@/lib/data/loaders'

export const metadata = {
  title: 'State of Prototyping: Spring 2026',
  description: 'We asked 1,478 designers how they actually work. Here\'s what the data says about vibe coding, AI tools, workflow satisfaction, and role outlook.',
}

export default async function ExplorePage() {
  const [
    blockers, builtTool, companyContext, investingNext, outlook,
    satisfaction, tools, trustLevel, vibeByRole, vibeDistribution, workflowChange,
  ] = await Promise.all([
    loadBlockers(),
    loadBuiltTool(),
    loadCompanyContext(),
    loadInvestingNext(),
    loadOutlook(),
    loadSatisfaction(),
    loadTools(),
    loadTrustLevel(),
    loadVibeByRole(),
    loadVibeDistribution(),
    loadWorkflowChange(),
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

      {/* ── 1. Who took this survey ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">1. Who took this survey</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          This is the first edition of our quarterly State of Prototyping — a recurring snapshot
          built specifically for designers and builders who work across the design-to-code spectrum.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          63% of respondents are outside North America. Western Europe (18.1%), South Asia (10.2%),
          and Southeast Asia (7.3%) are the largest non-US regions. This is a global read on how
          design practitioners work.
        </p>
        <SocialCardContainer sponsor="MagicPatterns">
          <SimpleBarChart
            title="Company Context"
            items={companyContext.data}
            callout="Startup-heavy, indie-strong. Nearly half the sample is at a startup or working independently — the cohort most likely to move fast on new tools."
            source="n=1,478 · % of respondents"
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
        <SocialCardContainer sponsor="MagicPath" centered>
          <HeroStatChart
            value="43.8%"
            accentLabel="Vibe Coding 50%+"
            label="of designers spend more than half their building time on AI-generated code"
            meta="1,478 respondents · Spring 2026"
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

      {/* ── 4. Vibe coding by role ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">4. Vibe coding by role</h2>
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

      {/* ── 5. Who's building their own tools ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">5. Who&apos;s building their own tools</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          59% of designers have built their own tool, app, or utility with AI in the last 6 months.
          One in four does it regularly.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          That number would have been in the low single digits two years ago. The ability to build
          something for yourself — not a product, just a thing that solves your own problem — has
          unlocked a new kind of creative leverage.
        </p>
        <SocialCardContainer sponsor="Framer">
          <SimpleBarChart
            title="Have You Built Your Own Tool With AI?"
            items={builtTool.data}
            callout="59% have built something. 30% want to but haven't yet. Only 10.5% have no plans to. The intent-to-try cohort is bigger than the never-will cohort by 3x."
            source="n=1,478 · Last 6 months"
            bare
          />
        </SocialCardContainer>
        <p className="body-text" style={{ marginBottom: 16 }}>
          59% have built something. 30% want to but haven&apos;t yet. Only 10.5% have no plans to.
          The intent-to-try cohort is bigger than the never-will cohort by 3x.
        </p>
      </section>

      {/* ── 6. The trust line ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">6. The trust line</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Only 1.4% trust AI output without oversight. But 34% trust it for production — with
          review. That&apos;s a bigger number than most people would have guessed.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          We&apos;re in the &ldquo;first drafts I heavily edit&rdquo; era. The trust line isn&apos;t whether AI
          works. It&apos;s how much cleanup it takes before it&apos;s usable.
        </p>
        <SocialCardContainer sponsor="Mobbin">
          <SimpleBarChart
            title="How Far Do You Trust AI Output?"
            items={trustLevel.data}
            callout="34.1% trust AI for production work — review before shipping + minor tweaks + full trust combined. Independents lead at 42.0%. Enterprise is lowest at 30.9%."
            source="n=1,478 · % of respondents"
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 7. What's blocking everyone ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">7. What&apos;s blocking everyone</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The top 3 blockers are within 3 percentage points of each other. That&apos;s not noise —
          that&apos;s signal. Three simultaneous problems, nearly identical in size.
        </p>
        <SocialCardContainer sponsor="dscout">
          <SimpleBarChart
            title="Top Workflow Blockers"
            items={blockers.data}
            callout="A 3-point cluster at the top: 55.6%, 53.1%, 52.2%. The problem isn't that AI doesn't work. It's that no one has time to learn it properly, there are too many options, and the output still isn't reliable enough."
            source="n=1,478 · % of respondents (multi-select)"
            bare
          />
        </SocialCardContainer>
      </section>

      {/* ── 8. How workflows changed in 6 months ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">8. How workflows changed in 6 months</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          71% have added AI or gone AI-central in the last 6 months. Only 10% say
          &ldquo;mostly the same.&rdquo; The shift already happened. The question is how far
          you&apos;ve gone.
        </p>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Startups lead the AI-central shift at 39.1%. Enterprise lags at 25.0% — a 14-point gap
          that maps directly to policy and procurement friction.
        </p>
        <SocialCardContainer sponsor="Dazl">
          <SimpleBarChart
            title="How Has Your Workflow Changed in 6 Months?"
            items={workflowChange.data}
            callout="Startups lead the AI-central shift at 39.1%. Enterprise lags at 25.0% — a 14-point gap that maps directly to policy and procurement friction."
            source="n=1,478 · % of respondents"
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
          64% say AI-generated coding is their top investment. Agent workflows at 46% is about
          automating repetitive work. Design systems at 40% shows the systems layer isn&apos;t dead —
          it&apos;s getting more important as implementation gets easier.
        </p>
        <SocialCardContainer sponsor="MagicPath">
          <SimpleBarChart
            title="Where Are You Investing Your Time Next? (Pick 3)"
            items={investingNext.data}
            callout="64% say AI-generated coding is their top investment. Agent workflows at 46% is about automating repetitive work. Design systems at 40% shows the systems layer isn't dead — it's getting more important as implementation gets easier."
            source="n=1,478 · % of respondents (pick 3)"
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
        <SocialCardContainer sponsor="Framer" centered>
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
          All published data is aggregated — no individual microdata is released. The
          &ldquo;Researcher&rdquo; role (n=23) should be treated as directional only due to small sample
          size. Multi-select questions sum to more than 100%. Cross-tab percentages are calculated
          within each role&apos;s n.
        </p>
        <p className="body-text">
          The full dataset is available under CC BY 4.0. Citation: UX Tools. (2026). State of
          Prototyping Spring 2026. https://data.prototypingstate.com.
        </p>
      </section>
    </article>
  )
}
