import type { ReactNode } from 'react'

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
}

export function SocialCardContainer({ children, sponsor = 'MagicPath' }: SocialCardContainerProps) {
  return (
    <div className="social-card-outer">
      <div className="social-card-body">
        <div className="social-card-content">
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
