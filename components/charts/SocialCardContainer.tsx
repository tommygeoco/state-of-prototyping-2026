import type { ReactNode } from 'react'

import { ChartActions } from '@/components/charts/ChartActions'
import { sponsorLogos, sponsorLogoScale, UxToolsLogo } from '@/components/logos/SponsorLogos'

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
  centered?: boolean
  anchorId?: string
}

export function SocialCardContainer({ children, sponsor = 'MagicPath', centered = false, anchorId }: SocialCardContainerProps) {
  const SponsorLogo = sponsorLogos[sponsor]

  return (
    <div
      id={anchorId}
      className="social-card-outer chart-hover-target"
      style={centered ? { aspectRatio: '1 / 1' } : undefined}
    >
      {anchorId ? <ChartActions anchorId={anchorId} /> : null}

      <div className="social-card-body">
        <div
          className="social-card-content"
          style={centered ? { justifyContent: 'center' } : undefined}
        >
          {children}
        </div>
      </div>

      <div className="social-card-footer">
        <div className="social-card-footer-left">
          <span className="social-card-footer-label">Presented by</span>
          {SponsorLogo ? (
            <SponsorLogo style={{ height: 16 * (sponsorLogoScale[sponsor] ?? 1), width: 'auto', flexShrink: 0, color: 'var(--text-primary)' }} />
          ) : (
            <span className="social-card-footer-sponsor">{sponsor}</span>
          )}
        </div>
        <UxToolsLogo style={{ height: 16, width: 'auto', flexShrink: 0, color: 'var(--text-primary)' }} />
      </div>
    </div>
  )
}
