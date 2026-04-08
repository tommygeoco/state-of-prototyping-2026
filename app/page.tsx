import Link from 'next/link'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { KPIStripChart } from '@/components/charts/KPIStripChart'
import { PageSection } from '@/components/layout/PageSection'
import { loadHeadline, loadSatisfaction, loadTools } from '@/lib/data/loaders'

export default async function HomePage() {
  const [headline, satisfaction, tools] = await Promise.all([
    loadHeadline(),
    loadSatisfaction(),
    loadTools(),
  ])

  return (
    <>
      <section style={{ marginBottom: 64, paddingTop: 0 }}>
        <p className="page-eyebrow" style={{ marginBottom: 16 }}>
          UX Tools Survey · Spring 2026
        </p>
        <h1 className="page-title" style={{ marginBottom: 24 }}>
          State of Prototyping:
          <br />
          Open Dataset
        </h1>
        <p className="lead-text" style={{ marginBottom: 40 }}>
          1,478 designers and builders told us how they actually work right now — what they
          use every week, how much they&apos;re vibe coding, whether they trust AI to ship, and
          what they&apos;re investing in next. This is the open data release.
        </p>

        <KPIStripChart
          items={[
            { value: '1,478', label: 'Respondents' },
            { value: '18', label: 'Regions' },
            { value: '24 days', label: 'Mar 14 – Apr 6, 2026' },
            { value: 'CC BY 4.0', label: 'License' },
          ]}
        />

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Link href="/explore" className="button-primary">Explore the data →</Link>
          <Link href="/api/v1/download/csv" className="button-secondary">Download CSV</Link>
          <Link href="/api" className="button-secondary">API Docs</Link>
          <Link href="/agent" className="button-secondary">For Agents</Link>
        </div>
      </section>

      <PageSection
        eyebrow="Section 01"
        title="What this dataset contains"
        intro="The dataset covers 11 questions across tools, AI adoption, vibe coding, workflow satisfaction, and role outlook. Individual microdata is not published. All files are aggregated summary tables."
      >
        <HeroStatChart
          value="43.8%"
          label="of designers spend more than half their building time vibe coding"
        />
      </PageSection>

      <PageSection
        eyebrow="Section 02"
        title="The stack right now"
        intro="Five of the ten most-used weekly tools are now AI tools. Figma holds its seat. But Claude, ChatGPT, Claude Code, Figma Make, and Gemini now sit alongside it in the weekly rotation."
      >
        <AccentHighlightBarChart
          title="Top 10 Tools Used Every Week"
          items={tools.data}
          callout="Claude is the #2 tool after Figma — 50.8% weekly use. Claude Code at #4 (38.4%) ranks above FigJam and Slack. An AI coding terminal is now more embedded in designer workflows than any whiteboarding tool."
        />
        <div className="pull-quote">
          &ldquo;An AI coding terminal is more embedded in designer workflows than any
          whiteboarding tool. That shift happened quietly, and it happened fast.&rdquo;
        </div>
      </PageSection>

      <PageSection
        eyebrow="Section 03"
        title="The satisfaction gap"
        intro="1.5 points separates the floor from the ceiling. Both are people with the same job title. The difference is how much of their workflow runs on AI."
      >
        <DualAxisChart
          title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)"
          satisfaction={satisfaction}
          callout={`${satisfaction.overall_mean.toFixed(1)}/10 overall mean. The satisfaction curve is nearly linear with adoption.`}
        />
      </PageSection>
    </>
  )
}
