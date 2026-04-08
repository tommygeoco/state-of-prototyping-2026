import Link from 'next/link'

import { sponsors } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-grid px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-page flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-text-secondary">CC BY 4.0 · survey.uxtools.co · UX Tools</p>
            <p className="mt-2 max-w-[52ch] text-sm leading-6 text-text-body">
              The State of Prototyping Spring 2026 open dataset is released for research, citation,
              and remixing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/download" className="button-secondary">
              Download JSON
            </Link>
            <Link href="/agent" className="button-primary">
              Query with Agents
            </Link>
          </div>
        </div>
        <div className="border-t border-grid pt-4">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.12em] text-text-secondary">
            Research Sponsors
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.slug}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-card px-4 py-3 transition hover:border-text-secondary"
              >
                <div className="font-display text-sm uppercase tracking-[0.1em] text-text-primary">
                  {sponsor.name}
                </div>
                <div className="mt-1 text-xs leading-5 text-text-secondary">{sponsor.label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
