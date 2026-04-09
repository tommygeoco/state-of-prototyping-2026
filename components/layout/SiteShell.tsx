import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main
        id="main-content"
        style={{
          width: '100%',
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          paddingBlock: 'var(--hero-padding-block)',
          paddingInline: 'var(--nav-padding-inline)',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
