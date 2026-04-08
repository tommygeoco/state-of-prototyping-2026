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
          <a href="https://uxtools.co" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            UX Tools
          </a>
          {' · '}
          <a href="https://uxtools.co" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            uxtools.co
          </a>
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: '20px' }}>
          State of Prototyping is part of an ongoing survey initiative by{' '}
          <a href="https://linkedin.com/in/tommygeoco" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'underline', textUnderlineOffset: 2, textDecorationColor: 'var(--border-card)' }}>
            Tommy Geoco
          </a>
          {' '}and{' '}
          <a href="https://uxtools.co" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'underline', textUnderlineOffset: 2, textDecorationColor: 'var(--border-card)' }}>
            UX Tools
          </a>
          {' '}to understand how design and software are changing. Spring 2026 edition. n&nbsp;=&nbsp;1,478. CC&nbsp;BY&nbsp;4.0.
        </p>
      </section>
    </footer>
  )
}
