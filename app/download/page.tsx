import Link from 'next/link'

import { PageSection } from '@/components/layout/PageSection'
import { loadQuestions } from '@/lib/data/loaders'
import { sponsors } from '@/lib/site'

export const metadata = {
  title: 'Download',
}

export default async function DownloadPage() {
  const questions = await loadQuestions()

  return (
    <PageSection
      eyebrow="Download"
      title="Download the Data"
      intro="The complete State of Prototyping Spring 2026 dataset. Released under CC BY 4.0 — use it, cite it, build with it."
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-3">
          <Link href="/api/v1/download/csv" className="button-primary">
            Download CSV
          </Link>
          <Link href="/api/v1/download/json" className="button-secondary">
            Download JSON
          </Link>
          <Link href="/api/openapi.yaml" className="button-secondary">
            View OpenAPI YAML
          </Link>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">Data dictionary</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm text-text-body">
              <thead>
                <tr className="text-text-secondary">
                  <th className="pr-6">ID</th>
                  <th className="pr-6">Field</th>
                  <th className="pr-6">Type</th>
                  <th className="pr-6">Values</th>
                </tr>
              </thead>
              <tbody>
                {questions.data.map((question) => (
                  <tr key={question.id}>
                    <td className="pr-6 font-data text-text-primary">{question.id}</td>
                    <td className="pr-6">{question.field}</td>
                    <td className="pr-6">{question.type}</td>
                    <td className="pr-6">{question.options}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">Citation</h3>
          <p className="mt-4 text-sm leading-7 text-text-body">
            UX Tools. (2026). State of Prototyping Spring 2026. https://data.prototypingstate.com.
            CC BY 4.0.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card px-6 py-6">
          <h3 className="font-display text-sm uppercase tracking-[0.12em] text-text-primary">
            This research was made possible by our sponsors
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.slug}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-grid bg-[var(--bg-card-inner)] px-4 py-4"
              >
                <div className="font-display text-sm uppercase tracking-[0.1em] text-text-primary">
                  {sponsor.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}
