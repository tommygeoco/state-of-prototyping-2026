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
      <section style={{ marginBottom: 48 }}>
        {eyebrow ? (
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p className="body-text" style={{ marginBottom: 16 }}>
            {intro}
          </p>
        ) : null}
        {body ? (
          <p className="body-text" style={{ marginBottom: 16 }}>
            {body}
          </p>
        ) : null}
        {children}
      </section>
    </>
  )
}
