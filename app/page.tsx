import Link from 'next/link'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { DualAxisChart } from '@/components/charts/DualAxisChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { KPIStripChart } from '@/components/charts/KPIStripChart'
import { loadSatisfaction, loadTools } from '@/lib/data/loaders'

export default async function HomePage() {
  const [satisfaction, tools] = await Promise.all([
    loadSatisfaction(),
    loadTools(),
  ])

  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <p className="page-eyebrow">UX Tools Survey · Spring 2026</p>
        <h1 className="page-title" style={{ marginBottom: 16 }}>
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
          <Link href="/explore" className="button-primary">Read the report →</Link>
          <Link href="/api/v1/download/csv" className="button-secondary">Download CSV</Link>
          <Link href="/api" className="button-secondary">API Docs</Link>
          <Link href="/agent" className="button-secondary">For Agents</Link>
        </div>
      </header>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">What this dataset contains</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The dataset covers 11 questions across tools, AI adoption, vibe coding, workflow
          satisfaction, and role outlook. Individual microdata is not published. All files are
          aggregated summary tables.
        </p>
        <HeroStatChart
          value="43.8%"
          accentLabel="Vibe Coding 50%+"
          label="of designers spend more than half their building time on AI-generated code"
          meta="1,478 respondents · Spring 2026"
        />
      </section>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">The stack right now</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          Five of the ten most-used weekly tools are now AI tools. Figma holds its seat, but
          Claude, ChatGPT, and Claude Code now sit alongside it in the weekly rotation.
        </p>
        <AccentHighlightBarChart
          title="Top 10 Tools Used Every Week"
          items={tools.data}
          callout="Claude is the #2 tool after Figma — 50.8% weekly use. Claude Code at #4 (38.4%) ranks above FigJam and Slack."
        />
      </section>

      <hr className="section-divider" />

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">The satisfaction gap</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          1.5 points separates the floor from the ceiling. Both are people with the same job
          title. The difference is how much of their workflow runs on AI.
        </p>
        <DualAxisChart
          title="Workflow Satisfaction by Vibe Coding Level (Mean / 10)"
          satisfaction={satisfaction}
          callout={`${satisfaction.overall_mean.toFixed(1)}/10 overall mean. The satisfaction curve is nearly linear with adoption.`}
        />
      </section>
    </>
  )
}
