import { sponsors } from '@/lib/site'

export function Footer() {
  return (
    <footer style={{ width: '100%', maxWidth: 720, margin: '0 auto', paddingBottom: 64, paddingInline: 24 }}>
      <hr className="section-divider" />

      <section style={{ marginTop: 48, marginBottom: 48 }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>Sponsors</p>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Made possible by</h2>
        <p className="body-text" style={{ marginBottom: 24 }}>
          This survey was independently run by UX Tools. Distribution and production
          was supported by our Spring 2026 sponsors.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.slug}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text-primary)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 8,
                padding: '10px 20px',
                textDecoration: 'none',
              }}
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section style={{ marginTop: 32 }}>
        <p
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          UX Tools · uxtools.co
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: '18px' }}>
          State of Prototyping is a quarterly survey by UX Tools. Spring 2026 edition. n = 1,478. CC BY 4.0.
        </p>
      </section>
    </footer>
  )
}
