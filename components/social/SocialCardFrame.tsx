import type { ReactNode } from 'react'

import { sponsorLogos, sponsorLogoScale, UxToolsLogo } from '@/components/logos/SponsorLogos'
import { sponsors } from '@/lib/site'

interface SocialCardFrameProps {
  children: ReactNode
}

export function SocialCardFrame({ children }: SocialCardFrameProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] p-6">
      <div
        className="flex h-[1080px] w-[1080px] flex-col overflow-hidden rounded-[24px] border border-border bg-[var(--bg-canvas)]"
        style={{ boxShadow: '0 40px 80px rgba(26, 25, 24, 0.08)' }}
      >
        <div className="flex-1 p-5">
          <div className="h-full">{children}</div>
        </div>
        <div className="mx-5 flex h-[80px] items-center justify-between border-t border-border">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}
            >
              Presented by
            </span>
            <div className="flex items-center gap-3">
              {sponsors.slice(0, 3).map((sponsor) => {
                const Logo = sponsorLogos[sponsor.name]
                return Logo ? (
                  <Logo key={sponsor.slug} style={{ height: 16 * (sponsorLogoScale[sponsor.name] ?? 1), width: 'auto', color: 'var(--text-primary)' }} />
                ) : null
              })}
            </div>
          </div>
          <UxToolsLogo style={{ height: 16, width: 'auto', color: 'var(--text-primary)' }} />
        </div>
      </div>
    </div>
  )
}
