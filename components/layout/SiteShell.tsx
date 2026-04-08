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
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
