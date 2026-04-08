import type { ReactNode } from 'react'

/*
  Social Card Container — from Paper artboard 8MG-1
  1080×1080 frame with:
    - Outer bg: #F7F6F3
    - Card: flex-grow, margin 20px 20px 0 20px, #FFF bg, 1px #E8E6E1 border, 8px radius, 40px pad
    - Sponsor footer: 80px height, margin 0 20px, 1px top border, 16px inline pad
*/

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
}

export function SocialCardContainer({ children, sponsor = 'MagicPath' }: SocialCardContainerProps) {
  return (
    <div className="social-card-wrapper">
    <div
      style={{
        width: 1080,
        height: 1080,
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F6F3',
        overflow: 'clip',
      }}
    >
      <div
        style={{
          flex: '1 1 0%',
          margin: '20px 20px 0 20px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 8,
          padding: 40,
          overflow: 'clip',
          background: '#FFFFFF',
          border: '1px solid #E8E6E1',
        }}
      >
        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </div>

      <div
        style={{
          height: 80,
          flexShrink: 0,
          margin: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 16,
          borderTop: '1px solid #E8E6E1',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '20px',
              color: '#000000',
            }}
          >
            PRESENTED BY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 700,
              color: '#000000',
            }}
          >
            {sponsor}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: '#000000',
          }}
        >
          UX Tools
        </span>
      </div>
    </div>
    </div>
  )
}
