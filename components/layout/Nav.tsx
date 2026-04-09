import Link from 'next/link'

import { MobileMenu } from '@/components/layout/MobileMenu'
import { UxToolsLogo } from '@/components/logos/SponsorLogos'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navLinks = [
  { href: '/explore', label: 'Report' },
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
        background: 'var(--bg-canvas)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
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
          <a
            href="https://uxtools.co"
            target="_blank"
            rel="noreferrer"
            aria-label="UX Tools"
            style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
          >
            <UxToolsLogo style={{ height: 24, width: 'auto' }} />
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <nav aria-label="Main" className="hidden md:contents">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
