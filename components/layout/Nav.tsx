import Link from 'next/link'

const navLinks = [
  { href: '/explore', label: 'Explore' },
  { href: '/download', label: 'Download' },
  { href: '/api', label: 'API' },
  { href: '/agent', label: 'Agents' },
]

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        height: 'var(--nav-height)',
        borderBottom: '1px solid var(--border-nav)',
        background: 'rgba(255,251,247,0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 'var(--nav-padding-inline)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20px',
              color: 'var(--text-primary)',
            }}
          >
            State of Prototyping
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden md:inline"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '18px',
                color: 'var(--text-muted)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
