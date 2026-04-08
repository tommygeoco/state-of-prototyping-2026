import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { SiteShellInner } from '@/components/layout/SiteShellInner'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SiteShellInner
      nav={<Nav />}
      footer={<Footer />}
    >
      {children}
    </SiteShellInner>
  )
}
