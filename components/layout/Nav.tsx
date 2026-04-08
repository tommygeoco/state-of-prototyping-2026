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
        borderBottom: '1px solid var(--border-card)',
        background: 'rgba(255,251,247,0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="mx-auto flex h-full items-center justify-between"
        style={{ maxWidth: 'var(--page-width)', paddingInline: 60 }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: 'var(--text-primary)',
            lineHeight: '18px',
          }}
        >
          UX Tools
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--text-secondary)',
                  lineHeight: '16px',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase' as const,
              color: 'var(--text-secondary)',
              lineHeight: '16px',
            }}
          >
            State of Prototyping · Spring 2026
          </span>
        </div>
      </div>
    </header>
  )
}
