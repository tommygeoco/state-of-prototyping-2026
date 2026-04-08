import type { ReactNode } from 'react'

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
  centered?: boolean
}

export function SocialCardContainer({ children, sponsor = 'MagicPath', centered = false }: SocialCardContainerProps) {
  return (
    <div className="social-card-outer" style={centered ? { aspectRatio: '1 / 1' } : undefined}>
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
          <span className="social-card-footer-sponsor">{sponsor}</span>
        </div>
        <span className="social-card-footer-brand">UX Tools</span>
      </div>
    </div>
  )
}
