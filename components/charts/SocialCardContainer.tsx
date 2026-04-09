import type { ReactNode } from 'react'

import { ChartActions } from '@/components/charts/ChartActions'
import { sponsorLogos, sponsorLogoScale, UxToolsLogo } from '@/components/logos/SponsorLogos'
import { getSponsorByName } from '@/lib/site'

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
  centered?: boolean
  anchorId?: string
}

export function SocialCardContainer({ children, sponsor = 'MagicPath', centered = false, anchorId }: SocialCardContainerProps) {
  const SponsorLogo = sponsorLogos[sponsor]
  const sponsorMeta = getSponsorByName(sponsor)
  const sponsorMark = SponsorLogo ? (
    <SponsorLogo style={{ height: 16 * (sponsorLogoScale[sponsor] ?? 1), width: 'auto', color: 'var(--text-primary)' }} />
  ) : (
    <span className="social-card-footer-sponsor">{sponsorMeta?.name ?? sponsor}</span>
  )

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
          {sponsorMeta?.url ? (
            <a
              href={sponsorMeta.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${sponsorMeta.name}`}
              style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-primary)', textDecoration: 'none' }}
            >
              {sponsorMark}
            </a>
          ) : (
            sponsorMark
          )}
        </div>
        <UxToolsLogo className="social-card-footer-brand-logo" style={{ height: 16, width: 'auto', color: 'var(--text-primary)' }} />
      </div>
    </div>
  )
}
