import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 'calc(100vh - var(--nav-height) - 200px)',
        padding: '48px 0',
      }}
    >
      <p className="page-eyebrow" style={{ marginBottom: 20 }}>Spring 2026</p>

      <h1
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(32px, 5vw, 44px)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.5px',
          color: 'var(--text-primary)',
          marginBottom: 20,
          maxWidth: '18ch',
        }}
      >
        State of Prototyping
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 17,
          lineHeight: '28px',
          color: 'var(--text-muted)',
          maxWidth: '38ch',
          marginBottom: 40,
        }}
      >
        1,478 designers. 18 regions. The most detailed look at how designers work
        in the age of AI-generated code.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
        <Button asChild size="lg">
          <Link href="/explore">Read the report →</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/api/v1/download/csv">Download CSV</Link>
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'center',
          marginBottom: 48,
        }}
      >
        {[
          { value: '43.8%', label: 'vibe coding 50%+' },
          { value: '+1.46', label: 'satisfaction gap' },
          { value: '80.9%', label: 'design engineers' },
        ].map((item) => (
          <div key={item.value}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 40px)',
                fontWeight: 700,
                lineHeight: 1,
                color: 'var(--text-primary)',
              }}
            >
              {item.value}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { href: '/explore', label: 'Report' },
          { href: '/download', label: 'Download' },
          { href: '/api', label: 'API' },
          { href: '/agent', label: 'Agents' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
