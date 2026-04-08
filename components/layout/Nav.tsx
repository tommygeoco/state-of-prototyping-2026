import Link from 'next/link'

const navLinks = [
  { href: '/explore', label: 'Explore Charts' },
  { href: '/download', label: 'Download' },
  { href: '/api', label: 'API Docs' },
  { href: '/agent', label: 'For Agents' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-grid bg-[rgba(255,251,247,0.92)] backdrop-blur">
      <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-page items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-[0.12em] text-text-primary"
        >
          State of Prototyping 2026
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-text-body transition hover:text-text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-text-secondary">By UX Tools</div>
      </div>
    </header>
  )
}
