import type { ReactNode } from 'react'

import { SiteShell } from '@/components/layout/SiteShell'

export default function AgentLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
