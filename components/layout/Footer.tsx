import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ width: '100%', maxWidth: 720, margin: '0 auto', paddingBottom: 64, paddingInline: 24 }}>
      <hr className="section-divider" />

      <section style={{ marginTop: 32 }}>
        <p
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          State of Prototyping · Open Survey + Open Data
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: '20px' }}>
          An open survey project by{' '}
          <a href="https://linkedin.com/in/tommygeoco" target="_blank" rel="noreferrer" className="content-link">
            Tommy Geoco
          </a>
          {' '}and{' '}
          <a href="https://uxtools.co" target="_blank" rel="noreferrer" className="content-link">
            UX Tools
          </a>
          . Spring 2026 includes n&nbsp;=&nbsp;1,478 responses, a public{' '}
          <Link href="/download" className="content-link">
            dataset
          </Link>
          , and a public{' '}
          <Link href="/api" className="content-link">
            API
          </Link>
          . Licensed under CC&nbsp;BY&nbsp;4.0.
        </p>
      </section>
    </footer>
  )
}
