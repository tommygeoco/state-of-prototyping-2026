'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface SiteShellInnerProps {
  children: ReactNode
  nav: ReactNode
  footer: ReactNode
}

export function SiteShellInner({ children, nav, footer }: SiteShellInnerProps) {
  const pathname = usePathname()
  const isSocial = pathname.startsWith('/social/')

  if (isSocial) {
    return <main>{children}</main>
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      {nav}
      <main
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
      {footer}
    </div>
  )
}
