import type { ReactNode } from 'react'

interface SocialCardContainerProps {
  children: ReactNode
  sponsor?: string
}

export function SocialCardContainer({ children, sponsor = 'MagicPath' }: SocialCardContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F6F3',
        borderRadius: 12,
        overflow: 'hidden',
        margin: '32px 0',
      }}
    >
      <div
        style={{
          flex: '1 1 0%',
          margin: '16px 16px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 8,
          padding: '24px 28px',
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid #E8E6E1',
        }}
      >
        <div
          style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {children}
        </div>
      </div>

      <div
        style={{
          height: 44,
          flexShrink: 0,
          margin: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 12,
          borderTop: '1px solid #E8E6E1',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              lineHeight: '14px',
              color: '#8A8680',
            }}
          >
            Presented by
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 700,
              color: '#1A1A1A',
            }}
          >
            {sponsor}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: '#1A1A1A',
          }}
        >
          UX Tools
        </span>
      </div>
    </div>
  )
}
