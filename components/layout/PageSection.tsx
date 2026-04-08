import type { ReactNode } from 'react'

interface PageSectionProps {
  eyebrow?: string
  title?: string
  intro?: string
  children: ReactNode
}

export function PageSection({ eyebrow, title, intro, children }: PageSectionProps) {
  return (
    <section className="px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-content">
        {eyebrow ? (
          <p className="mb-3 font-display text-sm uppercase tracking-[0.12em] text-text-accent">{eyebrow}</p>
        ) : null}
        {title ? <h2 className="text-[24px] font-semibold leading-8 text-text-primary">{title}</h2> : null}
        {intro ? <p className="mt-4 max-w-[62ch] text-lg leading-[1.625] text-text-body">{intro}</p> : null}
        <div className={title || intro || eyebrow ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}
