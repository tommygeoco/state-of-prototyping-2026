import Link from 'next/link'

import { KPIStripChart } from '@/components/charts/KPIStripChart'

export default function HomePage() {
  return (
    <>
      <header style={{ marginBottom: 48 }}>
        <p className="page-eyebrow">Spring 2026</p>
        <h1 className="page-title" style={{ marginBottom: 16 }}>
          State of Prototyping
          <br />
          Open Dataset
        </h1>
        <p className="lead-text" style={{ marginBottom: 40 }}>
          1,478 designers. 18 regions. The most detailed look at how designers work
          in the age of AI-generated code.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/explore" className="button-primary">Explore the data →</Link>
          <Link href="/api/v1/download/csv" className="button-secondary">Download CSV</Link>
        </div>
      </header>

      {/* ── 3-column feature row ── */}
      <hr className="section-divider" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
        {[
          {
            title: 'Explore',
            body: 'Interactive charts — every data point from the survey, rendered live from the open dataset.',
            href: '/explore',
          },
          {
            title: 'Download',
            body: 'Raw data in CSV and JSON — use it in your research, tools, or writing.',
            href: '/download',
          },
          {
            title: 'Build',
            body: 'REST API + agent endpoint — query the data with code or natural language.',
            href: '/api',
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            style={{
              padding: '24px',
              borderRadius: 8,
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 12,
              }}
            >
              {item.title}
            </div>
            <p className="body-text" style={{ fontSize: 14 }}>{item.body}</p>
          </Link>
        ))}
      </div>

      {/* ── Headline stats strip (3 big numbers from PRD) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
        {[
          { value: '43.8%', label: 'designers vibe coding 50%+ of their output' },
          { value: '+1.46', label: 'satisfaction gap between heavy vibers and zero vibers' },
          { value: '80.9%', label: 'design engineers spending 50%+ on vibe coding' },
        ].map((item) => (
          <div key={item.value} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 6vw, 48px)',
                fontWeight: 700,
                lineHeight: 1,
                color: 'var(--text-primary)',
                marginBottom: 12,
              }}
            >
              {item.value}
            </div>
            <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── What the report covers ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">What the report covers</h2>
        <p className="body-text" style={{ marginBottom: 16 }}>
          The dataset covers 11 questions across tools, AI adoption, vibe coding, workflow
          satisfaction, and role outlook. The report surfaces six core findings from 1,478
          designers across 18 world regions.
        </p>
        <KPIStripChart
          items={[
            { value: '1,478', label: 'Respondents' },
            { value: '18', label: 'Regions' },
            { value: '24 days', label: 'Mar 14 – Apr 6, 2026' },
            { value: 'CC BY 4.0', label: 'License' },
          ]}
        />
      </section>

      {/* ── Key findings preview ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Key findings</h2>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            'Claude is the #2 weekly tool in design, after Figma — 50.8% weekly use.',
            '44% of designers spend more than half their building time vibe coding.',
            'Design engineers at 80.9% vs. IC designers at 35% — a 46-point gap in the same design org.',
            '59% have built their own tool with AI in the last 6 months.',
            'Design engineers feel 50% more valuable; researchers feel 39% less secure.',
            'Vibe coders are 1.5 points more satisfied with their workflow.',
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: 16, paddingLeft: 24, position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  fontFamily: 'var(--font-data)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--text-accent)',
                }}
              >
                {index + 1}.
              </span>
              <p className="body-text">{item}</p>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 32 }}>
          <Link href="/explore" className="button-primary">Read the full report →</Link>
        </div>
      </section>

      {/* ── Use the data ── */}
      <hr className="section-divider" />
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Use the data</h2>
        <p className="body-text" style={{ marginBottom: 24 }}>
          The full dataset is open under CC BY 4.0. Download it, query it through the API,
          or feed the context file directly into an LLM.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/api/v1/download/csv" className="button-secondary">Download CSV</Link>
          <Link href="/api/v1/download/json" className="button-secondary">Download JSON</Link>
          <Link href="/api" className="button-secondary">API Docs</Link>
          <Link href="/agent" className="button-secondary">For Agents</Link>
        </div>
      </section>
    </>
  )
}
