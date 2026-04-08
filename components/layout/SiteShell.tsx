'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isSocial = pathname.startsWith('/social/')

  if (isSocial) {
    return <main>{children}</main>
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      <Nav />
      <main style={{ width: 720, margin: '0 auto', paddingTop: 64 }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
