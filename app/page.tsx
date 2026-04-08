import Link from 'next/link'

import { AccentHighlightBarChart } from '@/components/charts/AccentHighlightBarChart'
import { HeroStatChart } from '@/components/charts/HeroStatChart'
import { SatisfactionHeroDeltaChart } from '@/components/charts/SatisfactionHeroDeltaChart'
import { PageSection } from '@/components/layout/PageSection'
import { loadHeadline, loadSatisfaction, loadTools, loadVibeByRole } from '@/lib/data/loaders'

const features = [
  {
    title: 'Explore',
    body: 'Interactive charts powered directly by the survey summary tables, with every number rendered live from the open dataset.',
  },
  {
    title: 'Download',
    body: 'Raw CSV and JSON files for research, reporting, teaching, and product experiments under a CC BY 4.0 license.',
  },
  {
    title: 'Build',
    body: 'REST endpoints, a natural-language query route, OpenAPI docs, and context files that make the dataset usable by agents.',
  },
]

export default async function HomePage() {
  const [headline, satisfaction, tools, vibeByRole] = await Promise.all([
    loadHeadline(),
    loadSatisfaction(),
    loadTools(),
    loadVibeByRole(),
  ])

  const vibeHeadline = headline.data.find((item) => item.key === 'vibe_coding_50plus')
  const builtTool = headline.data.find((item) => item.key === 'built_tool_with_ai')
  const generateCode = headline.data.find((item) => item.key === 'generate_code_ai')
  const delta = satisfaction.delta

  return (
    <>
      <section className="px-6 pb-12 pt-14 md:px-10 md:pb-20 md:pt-20">
        <div className="mx-auto flex max-w-page flex-col gap-12">
          <div className="max-w-content">
            <p className="font-display text-sm uppercase tracking-[0.14em] text-text-accent">Spring 2026</p>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.1] text-text-primary md:text-[64px]">
              State of Prototyping
              <br />
              Open Dataset
            </h1>
            <p className="mt-6 max-w-[34ch] text-[18px] leading-[1.625] text-text-body">
              1,478 designers. 18 regions. The most detailed look at how designers work in the
              age of AI-generated code.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/explore" className="button-primary">
                Explore the data →
              </Link>
              <Link href="/api/v1/download/csv" className="button-secondary">
                Download CSV
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-border bg-card px-6 py-6">
                <div className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
                  {feature.title}
                </div>
                <p className="mt-4 text-sm leading-6 text-text-body">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageSection title="Headline Stats" intro="Three numbers that frame the open-data release.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              value: `${vibeHeadline?.value.toFixed(1)}%`,
              label: 'Designers vibe coding 50%+ of output',
            },
            {
              value: `+${delta.value.toFixed(2)}`,
              label: 'Satisfaction gap between heavy vibers and zero vibers',
            },
            {
              value: `${vibeByRole.data[0]?.pct.toFixed(1)}%`,
              label: 'Design engineers spending 50%+ on vibe coding',
            },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card px-6 py-6">
              <div className="font-display text-[52px] font-extrabold leading-none text-text-primary">
                {item.value}
              </div>
              <div className="mt-4 text-sm leading-6 text-text-body">{item.label}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Preview"
        title="Live Chart Preview"
        intro="These cards are rendered from the same JSON files the API and downloads use."
      >
        <div className="space-y-6">
          <HeroStatChart
            value={vibeHeadline?.value ?? 43.8}
            label="Designers spend 50%+ of output time on AI-generated code"
            supporting={[
              `${builtTool?.value.toFixed(1)}% have built a custom tool with AI-generated code`,
              `${generateCode?.value.toFixed(1)}% use AI or no-code to generate code in workflow`,
            ]}
            callout="The headline number is already large enough to anchor the story: nearly half of respondents now spend at least half of their output time on AI-generated code."
          />
          <AccentHighlightBarChart
            items={tools.data.slice(0, 10)}
            callout="Figma remains the universal baseline, but Claude and ChatGPT sit directly behind it as weekly tools rather than occasional experiments."
          />
          <SatisfactionHeroDeltaChart
            overallMean={satisfaction.overall_mean}
            delta={satisfaction.delta.value}
            fromTier={satisfaction.delta.from_tier}
            toTier={satisfaction.delta.to_tier}
            callout="The gap is directional rather than causal, but it is one of the strongest signals in the release: heavier vibe coders also report higher workflow satisfaction."
          />
        </div>
      </PageSection>
    </>
  )
}
