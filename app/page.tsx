import Link from 'next/link'

import { KPIStripChart } from '@/components/charts/KPIStripChart'
import { SiteShell } from '@/components/layout/SiteShell'
import { Button } from '@/components/ui/button'
import { loadHeadline, loadTools, loadTrustLevel, loadVibeByRole } from '@/lib/data/loaders'

export default async function HomePage() {
  const [headline, tools, trustLevel, vibeByRole] = await Promise.all([
    loadHeadline(),
    loadTools(),
    loadTrustLevel(),
    loadVibeByRole(),
  ])

  const vibeCoding = headline.data.find((item) => item.key === 'vibe_coding_50plus')
  const builtTool = headline.data.find((item) => item.key === 'built_tool_with_ai')
  const topAiTools = tools.data.filter((item) => ['Claude', 'ChatGPT', 'Claude Code', 'Figma Make', 'Gemini'].includes(item.tool)).length
  const designEngineer = vibeByRole.data.find((item) => item.role === 'Design Engineer')
  const icDesigner = vibeByRole.data.find((item) => item.role === 'IC Designer')
  const trustWithReview = (
    (trustLevel.data.find((item) => item.label === 'Review before shipping')?.pct ?? 0) +
    (trustLevel.data.find((item) => item.label === 'Ships with minor tweaks')?.pct ?? 0)
  ).toFixed(1)

  const keyBites = [
    { value: `${topAiTools} / 10`, label: 'top weekly tools are AI', href: '/explore#top-10-weekly-tools' },
    { value: `${vibeCoding?.value.toFixed(1) ?? '43.8'}%`, label: 'spend 50%+ of their building time vibe coding', href: '/explore#vibe-coding-hero' },
    { value: `${designEngineer?.pct.toFixed(1) ?? '80.9'}%`, label: 'design engineers spending 50%+ time vibe coding', href: '/explore#vibe-by-role' },
    { value: `${builtTool?.value.toFixed(1) ?? '59.1'}%`, label: 'have built their own AI tool', href: '/explore#built-own-tool' },
    { value: `${trustWithReview}%`, label: 'trust AI for production with review', href: '/explore#trust-level' },
    { value: `${designEngineer && icDesigner ? (designEngineer.pct - icDesigner.pct).toFixed(1) : '45.9'} pts`, label: 'gap between design engineers and IC designers', href: '/explore#ic-vs-design-engineer' },
  ]

  return (
    <SiteShell>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: 'calc(100vh - var(--nav-height) - 200px)',
          padding: '48px 0',
          width: '100%',
        }}
      >
        <div style={{ width: '100%', maxWidth: 960 }}>
          <p className="page-eyebrow" style={{ marginBottom: 20 }}>Spring 2026</p>

          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              color: 'var(--text-primary)',
              marginBottom: 20,
              maxWidth: '18ch',
              marginInline: 'auto',
            }}
          >
            State of Prototyping
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: '28px',
              color: 'var(--text-muted)',
              maxWidth: '38ch',
              marginBottom: 20,
              marginInline: 'auto',
            }}
          >
            1,478 designers. 18 regions. The most detailed look at how designers work
            in the age of AI-generated code.
          </p>

          <p
            className="body-text"
            style={{
              maxWidth: '48ch',
              marginBottom: 40,
              marginInline: 'auto',
            }}
          >
            Read the canonical report, download the full dataset, query the API, or jump
            straight to the chart bites that best capture what prototyping looks like right now.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <Button asChild size="lg">
              <Link href="/explore">Read the report →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/api/v1/download/csv">Download CSV</Link>
            </Button>
          </div>

          <div style={{ textAlign: 'left', marginBottom: 48 }}>
            <p className="page-eyebrow" style={{ marginBottom: 12, textAlign: 'center' }}>Key bites</p>
            <KPIStripChart items={keyBites} />
          </div>

          <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: '/explore', label: 'Report' },
              { href: '/download', label: 'Download' },
              { href: '/api', label: 'API' },
              { href: '/agent', label: 'Agents' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </SiteShell>
  )
}
