import type { ReactNode } from 'react'

import { ImageResponse } from 'next/og'

import {
  DazlLogo,
  DscoutLogo,
  MagicPathLogo,
  MagicPatternsLogo,
  MobbinLogo,
  UxToolsLogo,
} from '@/components/logos/SponsorLogos'
import {
  loadBlockers,
  loadBuiltTool,
  loadCompanyContext,
  loadHeadline,
  loadInvestingNext,
  loadOutlook,
  loadRegionDistribution,
  loadSatisfaction,
  loadTools,
  loadTrustLevel,
  loadVibeByRole,
  loadVibeDistribution,
  loadWorkflowChange,
  loadWorkflowChangeByCompany,
} from '@/lib/data/loaders'
import type { OutlookDatum, SatisfactionDatum, VibeByRoleDatum, VibeDistributionDatum } from '@/lib/data/schema'

export const runtime = 'nodejs'

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1' } },
  ).then((res) => res.text())
  const url = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`Failed to load font ${family}@${weight}`)
  return fetch(url).then((res) => res.arrayBuffer())
}

const interRegular = loadGoogleFont('Inter', 400)
const interMedium = loadGoogleFont('Inter', 500)
const interSemiBold = loadGoogleFont('Inter', 600)
const interBold = loadGoogleFont('Inter', 700)

const DEFAULT_WIDTH = 720
const DEFAULT_HEIGHT = 520
const MIN_WIDTH = 320
const MIN_HEIGHT = 240
const MAX_WIDTH = 1600
const MAX_HEIGHT = 1200

const palette = {
  bgCanvas: '#fffbf7',
  bgCard: '#ffffff',
  bgCallout: '#f5f4f0',
  borderCard: '#e8e6e1',
  borderGrid: '#edebe7',
  textPrimary: '#1a1a1a',
  textBody: '#4a4844',
  textSecondary: '#8a8680',
  textMuted: '#6b6560',
  bar1: '#c9624d',
  bar2: '#6b6560',
  bar3: 'rgba(107, 101, 96, 0.75)',
  bar4: 'rgba(107, 101, 96, 0.58)',
  bar5: 'rgba(107, 101, 96, 0.42)',
  bar6: 'rgba(107, 101, 96, 0.28)',
  bar7: 'rgba(107, 101, 96, 0.18)',
  deltaBg: 'rgba(44, 41, 36, 0.08)',
  deltaBorder: 'rgba(44, 41, 36, 0.12)',
}

const sponsorBySlug: Record<string, string> = {
  'global-respondent-mix': 'Mobbin',
  'where-designers-work': 'MagicPatterns',
  'top-10-weekly-tools': 'Dazl',
  'claude-hero-stat': 'Mobbin',
  'vibe-coding-hero': 'MagicPath',
  'vibe-coding-distribution': 'Framer',
  'vibe-by-role': 'dscout',
  'ic-vs-design-engineer': 'MagicPatterns',
  'built-own-tool': 'Dazl',
  'trust-level': 'MagicPath',
  'top-blockers': 'dscout',
  'workflow-change': 'Dazl',
  'ai-central-by-company': 'MagicPatterns',
  'role-outlook': 'Mobbin',
  'role-contrast': 'dscout',
  'investing-next': 'MagicPath',
  'satisfaction-by-vibe': 'dscout',
  'satisfaction-delta': 'Framer',
}

const barRamp = [palette.bar2, palette.bar3, palette.bar4, palette.bar5, palette.bar6, palette.bar7]

type SimpleBarItem = { label: string; pct: number }

function ChartFrame({
  sponsor,
  children,
}: {
  sponsor: string
  children: ReactNode
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: palette.bgCallout,
        color: palette.textPrimary,
        fontFamily: 'Inter, sans-serif',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          margin: 16,
          marginBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          background: palette.bgCard,
          border: `1px solid ${palette.borderCard}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: 56,
          margin: '0 16px',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `1px solid ${palette.borderCard}`,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: palette.textSecondary, fontSize: 14, lineHeight: 1 }}>
            Presented by
          </span>
          <SponsorFooterLogo sponsor={sponsor} />
        </div>
        <UxToolsLogo style={{ width: 54, height: 16, color: palette.textPrimary, flexShrink: 0 }} />
      </div>
    </div>
  )
}

function SponsorFooterLogo({ sponsor }: { sponsor: string }) {
  const common = { color: palette.textPrimary, flexShrink: 0 }

  switch (sponsor) {
    case 'MagicPatterns':
      return <MagicPatternsLogo style={{ ...common, width: 106, height: 16 }} />
    case 'MagicPath':
      return <MagicPathLogo style={{ ...common, width: 80, height: 16 }} />
    case 'dscout':
      return <DscoutLogo style={{ ...common, width: 66, height: 14 }} />
    case 'Mobbin':
      return <MobbinLogo style={{ ...common, width: 81, height: 12 }} />
    case 'Dazl':
      return <DazlLogo style={{ ...common, width: 52, height: 16 }} />
    case 'Framer':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: palette.textPrimary }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
          </svg>
          <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}>Framer</span>
        </div>
      )
    default:
      return <span style={{ color: palette.textPrimary, fontWeight: 700 }}>{sponsor}</span>
  }
}

function ChartHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          fontSize: 16,
          fontWeight: 700,
          lineHeight: '22px',
          color: palette.textPrimary,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            lineHeight: '18px',
            color: palette.textSecondary,
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  )
}

function BarRow({
  label,
  value,
  rank,
  max = 100,
  accentWinner = false,
  suffix = '%',
}: {
  label: string
  value: number
  rank: number
  max?: number
  accentWinner?: boolean
  suffix?: string
}) {
  const isWinner = accentWinner && rank === 1
  const barColor = isWinner ? palette.bar1 : barRamp[Math.min(rank - 2, barRamp.length - 1)] ?? palette.bar2
  const widthPct = Math.min((value / max) * 100, 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: isWinner ? 600 : 500, color: isWinner ? palette.textPrimary : palette.textBody, lineHeight: '18px' }}>
          {label}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: isWinner ? palette.bar1 : palette.textBody }}>
          {`${value.toFixed(1)}${suffix}`}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 16,
          borderRadius: 3,
          background: palette.bgCallout,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${widthPct}%`,
            minWidth: 4,
            height: '100%',
            borderRadius: 3,
            background: barColor,
          }}
        />
      </div>
    </div>
  )
}

function SimpleBars({
  title,
  subtitle,
  items,
  accentWinner = false,
  max = 100,
  suffix = '%',
}: {
  title: string
  subtitle?: string
  items: SimpleBarItem[]
  accentWinner?: boolean
  max?: number
  suffix?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <ChartHeader title={title} subtitle={subtitle} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, index) => (
          <BarRow
            key={`${item.label}-${index}`}
            label={item.label}
            value={item.pct}
            rank={index + 1}
            max={max}
            accentWinner={accentWinner}
            suffix={suffix}
          />
        ))}
      </div>
    </div>
  )
}

function HeroStat({ value, accentLabel, label }: { value: string; accentLabel?: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1, padding: '20px 0' }}>
      {accentLabel ? (
        <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.bar1, marginBottom: 16 }}>
          {accentLabel}
        </div>
      ) : null}
      <div style={{ display: 'flex', fontSize: 80, fontWeight: 700, lineHeight: 1, color: palette.textPrimary, marginBottom: 16 }}>{value}</div>
      <div style={{ display: 'flex', width: 60, height: 2, background: palette.bar1, marginBottom: 16 }} />
      <div style={{ display: 'flex', fontSize: 14, lineHeight: '22px', color: palette.textBody, maxWidth: 448 }}>{label}</div>
    </div>
  )
}

function SatisfactionDelta({
  overallMean,
  delta,
  fromTier,
  toTier,
  fromValue,
  toValue,
}: {
  overallMean: number
  delta: number
  fromTier: string
  toTier: string
  fromValue: number
  toValue: number
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1 }}>
      <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: palette.textMuted, marginBottom: 20 }}>
        The Satisfaction Gap
      </div>
      <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1, color: palette.textPrimary, marginBottom: 10 }}>
        {`${overallMean.toFixed(1)}/10`}
      </div>
      <div style={{ display: 'flex', fontSize: 14, color: palette.textBody, marginBottom: 16 }}>overall mean workflow satisfaction</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 24,
          border: `1px solid ${palette.deltaBorder}`,
          background: palette.deltaBg,
          marginBottom: 18,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: palette.bar1 }}>{`▲ +${delta.toFixed(2)}`}</span>
        <span style={{ fontSize: 14, color: palette.textBody }}>heavy vibers vs. non-vibers</span>
      </div>
      <div style={{ display: 'flex', fontSize: 14, lineHeight: '18px', color: palette.textMuted }}>
        {`${fromTier}: ${fromValue.toFixed(2)} → ${toTier}: ${toValue.toFixed(2)}`}
      </div>
    </div>
  )
}

function OutlookTable({ title, subtitle, items }: { title: string; subtitle?: string; items: OutlookDatum[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <ChartHeader title={title} subtitle={subtitle} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', padding: '0 0 16px 0', color: palette.textSecondary, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          <div style={{ display: 'flex', width: '34%' }}>Role</div>
          <div style={{ display: 'flex', width: '22%' }}>More Valuable</div>
          <div style={{ display: 'flex', width: '22%' }}>Less Secure</div>
          <div style={{ display: 'flex', width: '22%' }}>About Same</div>
        </div>
        {items.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 0',
              borderTop: `1px solid ${palette.borderGrid}`,
              fontSize: 14,
            }}
          >
            <div style={{ display: 'flex', width: '34%', color: palette.textPrimary, fontWeight: 500, paddingRight: 16 }}>{item.role}</div>
            <div style={{ display: 'flex', width: '22%', color: palette.bar1, fontWeight: 700 }}>{`${item.more_valuable.toFixed(1)}%`}</div>
            <div style={{ display: 'flex', width: '22%', color: palette.bar1, fontWeight: 700 }}>{`${item.less_secure.toFixed(1)}%`}</div>
            <div style={{ display: 'flex', width: '22%', color: palette.textSecondary, fontWeight: 400 }}>{`${item.about_same.toFixed(1)}%`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function renderSlug(slug: string) {
  switch (slug) {
    case 'global-respondent-mix': {
      const data = await loadRegionDistribution()
      return (
        <SimpleBars
          title="A Global Sample, Not a North America-Only Read"
          subtitle={`Top regions in the sample · ${data.pct_outside_na.pct.toFixed(1)}% of respondents are outside North America`}
          items={data.data.slice(0, 6).map((item) => ({ label: item.region, pct: item.pct }))}
          accentWinner
        />
      )
    }
    case 'where-designers-work': {
      const data = await loadCompanyContext()
      return <SimpleBars title="Where Designers Work" subtitle="Company size and work setting · 1,478 respondents, Spring 2026" items={data.data} accentWinner />
    }
    case 'top-10-weekly-tools': {
      const tools = await loadTools()
      return <SimpleBars title="5 of the Top 10 Weekly Tools Are Now AI" subtitle="What designers use every week · % of respondents" items={tools.data.map((item) => ({ label: item.tool, pct: item.pct }))} accentWinner />
    }
    case 'claude-hero-stat': {
      const tools = await loadTools()
      const topTool = tools.data[0]
      const secondTool = tools.data[1]
      return <HeroStat value={`${secondTool?.pct.toFixed(1) ?? '50.8'}%`} accentLabel="The #2 Weekly Tool" label={`${secondTool?.tool ?? 'Claude'} is the #2 weekly tool in design, after ${topTool?.tool ?? 'Figma'}. More embedded in designer workflows than any canvas-first tool.`} />
    }
    case 'vibe-coding-hero': {
      const headline = await loadHeadline()
      const vibeCoding = headline.data.find((item) => item.key === 'vibe_coding_50plus')
      return <HeroStat value={`${vibeCoding?.value.toFixed(1) ?? '43.8'}%`} accentLabel="Vibe Coding 50%+" label="of designers now spend more than half their building time on AI-generated code" />
    }
    case 'vibe-coding-distribution': {
      const distribution = await loadVibeDistribution()
      return <SimpleBars title="The Profession Has Split Into Thirds" subtitle="How much of your building time is AI-generated code?" items={distribution.data.map((item: VibeDistributionDatum) => ({ label: item.tier, pct: item.pct }))} accentWinner />
    }
    case 'vibe-by-role': {
      const vibeByRole = await loadVibeByRole()
      const ic = vibeByRole.data.find((item) => item.role === 'IC Designer')
      const de = vibeByRole.data.find((item) => item.role === 'Design Engineer')
      return <SimpleBars title={`An ${de?.pct.toFixed(1) ?? '80.9'}% vs ${ic?.pct.toFixed(1) ?? '35.0'}% Split in the Same Design Org`} subtitle="% spending 50%+ of building time on AI-generated code, by role" items={vibeByRole.data.map((item: VibeByRoleDatum) => ({ label: item.role, pct: item.pct }))} accentWinner />
    }
    case 'ic-vs-design-engineer': {
      const vibeByRole = await loadVibeByRole()
      const ic = vibeByRole.data.find((item) => item.role === 'IC Designer')
      const de = vibeByRole.data.find((item) => item.role === 'Design Engineer')
      return <SimpleBars title="Same Profession, Different Reality" subtitle="% spending 50%+ time on AI-generated code" items={[{ label: 'Design Engineer', pct: de?.pct ?? 80.9 }, { label: 'IC Designer', pct: ic?.pct ?? 35.0 }]} accentWinner />
    }
    case 'built-own-tool': {
      const [data, headlineData] = await Promise.all([loadBuiltTool(), loadHeadline()])
      const builtSomething = headlineData.data.find((item) => item.key === 'built_tool_with_ai')
      return <SimpleBars title={`${builtSomething?.value.toFixed(1) ?? '59.1'}% of Designers Have Built Their Own AI Tool`} subtitle="Have you built your own tool, app, or utility with AI? · last 6 months" items={data.data} accentWinner />
    }
    case 'trust-level': {
      const data = await loadTrustLevel()
      const trustWithReview = (
        (data.data.find((item) => item.label === 'Review before shipping')?.pct ?? 0) +
        (data.data.find((item) => item.label === 'Ships with minor tweaks')?.pct ?? 0)
      ).toFixed(1)
      return <SimpleBars title={`${trustWithReview}% Trust AI for Production With Review`} subtitle="How far do you trust AI-generated output in your workflow?" items={data.data} accentWinner />
    }
    case 'top-blockers': {
      const data = await loadBlockers()
      const spread = (data.data[0].pct - data.data[2].pct).toFixed(1)
      return <SimpleBars title={`The Top 3 Blockers Are Within ${spread} Points of Each Other`} subtitle="What's slowing down your workflow the most?" items={data.data} accentWinner />
    }
    case 'workflow-change': {
      const data = await loadWorkflowChange()
      const combinedPct = (data.data[0].pct + data.data[1].pct).toFixed(1)
      return <SimpleBars title={`${combinedPct}% Have Added AI or Gone AI-Central in 6 Months`} subtitle="How has your design workflow changed since late 2025?" items={data.data} accentWinner />
    }
    case 'ai-central-by-company': {
      const data = await loadWorkflowChangeByCompany()
      const startup = data.data.find((item) => item.context === 'Startup (2\u2013100)')
      const enterprise = data.data.find((item) => item.context === 'Enterprise (1,000+)')
      const gap = ((startup?.pct ?? 0) - (enterprise?.pct ?? 0)).toFixed(1)
      return (
        <SimpleBars
          title={`Startups vs Enterprise: A ${gap}-Point Gap`}
          subtitle='Share saying "AI is now central" by work context'
          items={[{ label: 'Startup (2\u2013100)', pct: startup?.pct ?? 38.8 }, { label: 'Enterprise (1,000+)', pct: enterprise?.pct ?? 34.7 }]}
          accentWinner
        />
      )
    }
    case 'role-outlook': {
      const data = await loadOutlook()
      return <OutlookTable title="Design Engineers Feel More Valuable. Researchers Feel Most at Risk." subtitle="How do you think AI will affect your role in the next 2 years?" items={data.data} />
    }
    case 'role-contrast': {
      const data = await loadOutlook()
      const de = data.data.find((item) => item.role === 'Design Engineer')
      const researcher = data.data.find((item) => item.role === 'Researcher')
      return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ChartHeader title="Same Industry. Opposite Experience." subtitle="How AI is affecting role confidence, by role" />
          <div style={{ display: 'flex', width: '100%', gap: 0, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center', gap: 12, padding: '8px 16px' }}>
              <div style={{ display: 'flex', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.bar1 }}>Design Engineer</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: palette.textPrimary }}>{`${de?.more_valuable.toFixed(1) ?? '50.0'}%`}</div>
                <div style={{ display: 'flex', fontSize: 13, color: palette.textBody }}>feel more valuable</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: palette.textMuted }}>{`${de?.less_secure.toFixed(1) ?? '10.6'}%`}</div>
                <div style={{ display: 'flex', fontSize: 13, color: palette.textBody }}>feel less secure</div>
              </div>
            </div>
            <div style={{ display: 'flex', width: 1, background: palette.borderCard, flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center', gap: 12, padding: '8px 16px' }}>
              <div style={{ display: 'flex', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.bar1 }}>Researcher</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: palette.textMuted }}>{`${researcher?.more_valuable.toFixed(1) ?? '17.4'}%`}</div>
                <div style={{ display: 'flex', fontSize: 13, color: palette.textBody }}>feel more valuable</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: palette.textPrimary }}>{`${researcher?.less_secure.toFixed(1) ?? '39.1'}%`}</div>
                <div style={{ display: 'flex', fontSize: 13, color: palette.textBody }}>feel less secure</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    case 'investing-next': {
      const data = await loadInvestingNext()
      return <SimpleBars title="2 of the Top 3 Investment Areas Are AI" subtitle="Where are you investing your time in the next 12 months? (pick 3)" items={data.data} accentWinner />
    }
    case 'satisfaction-by-vibe': {
      const data = await loadSatisfaction()
      const items = [...data.data].reverse().map((item: SatisfactionDatum) => ({ label: item.tier, pct: item.mean }))
      return <SimpleBars title="Heavier Vibe Coders Are More Satisfied" subtitle="Mean workflow satisfaction (1–10) by vibe coding level" items={items} accentWinner max={10} suffix=" / 10" />
    }
    case 'satisfaction-delta': {
      const data = await loadSatisfaction()
      const fromValue = data.data.find((item) => item.tier.startsWith(data.delta.from_tier))?.mean ?? 0
      const toValue = data.data.find((item) => item.tier.startsWith(data.delta.to_tier))?.mean ?? 0
      return <SatisfactionDelta overallMean={data.overall_mean} delta={data.delta.value} fromTier={data.delta.from_tier} toTier={data.delta.to_tier} fromValue={fromValue} toValue={toValue} />
    }
    default:
      return null
  }
}

function parseDimension(value: string | null, fallback: number, min: number, max: number) {
  if (value == null) {
    return fallback
  }

  const numeric = Number(value)
  if (!Number.isFinite(numeric)) {
    return fallback
  }

  return Math.min(max, Math.max(min, Math.round(numeric)))
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const sponsor = sponsorBySlug[slug]
  if (!sponsor) {
    return new Response('Not found', { status: 404 })
  }

  const url = new URL(request.url)
  const width = parseDimension(url.searchParams.get('w'), DEFAULT_WIDTH, MIN_WIDTH, MAX_WIDTH)
  const height = parseDimension(url.searchParams.get('h'), DEFAULT_HEIGHT, MIN_HEIGHT, MAX_HEIGHT)
  const chart = await renderSlug(slug)
  if (!chart) {
    return new Response('Not found', { status: 404 })
  }

  const [regularData, mediumData, semiBoldData, boldData] = await Promise.all([
    interRegular, interMedium, interSemiBold, interBold,
  ])

  const response = new ImageResponse(
    <ChartFrame sponsor={sponsor}>
      {chart}
    </ChartFrame>,
    {
      width,
      height,
      fonts: [
        { name: 'Inter', data: regularData, weight: 400 as const, style: 'normal' as const },
        { name: 'Inter', data: mediumData, weight: 500 as const, style: 'normal' as const },
        { name: 'Inter', data: semiBoldData, weight: 600 as const, style: 'normal' as const },
        { name: 'Inter', data: boldData, weight: 700 as const, style: 'normal' as const },
      ],
    },
  )

  response.headers.set('Cache-Control', 'no-store, must-revalidate')

  return response
}
