import type { ReactNode } from 'react'

interface PageSectionProps {
  eyebrow?: string
  title?: string
  intro?: string
  body?: string
  children: ReactNode
  divider?: boolean
}

export function PageSection({ eyebrow, title, intro, body, children, divider = true }: PageSectionProps) {
  return (
    <>
      {divider ? <hr className="section-divider" /> : null}
      <section style={{ marginBottom: 'var(--section-gap)' }}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="section-title">{title}</h2> : null}
        {intro ? <p className="lead-text" style={{ marginBottom: 16 }}>{intro}</p> : null}
        {body ? <p className="body-text" style={{ marginBottom: 16 }}>{body}</p> : null}
        {children}
      </section>
    </>
  )
}
