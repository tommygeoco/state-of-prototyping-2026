import Image from 'next/image'
import type { ReactNode } from 'react'

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
        <div className="mx-5 flex h-[80px] items-start justify-between border-t border-border pt-4">
          <div>
            <div className="font-display text-[12px] uppercase tracking-[0.12em] text-text-secondary">
              Presented by
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {sponsors.slice(0, 3).map((sponsor) => (
                <Image
                  key={sponsor.slug}
                  src={`/sponsors/${sponsor.slug}.svg`}
                  alt={sponsor.name}
                  width={112}
                  height={28}
                />
              ))}
            </div>
          </div>
          <Image src="/sponsors/uxtools.svg" alt="UX Tools" width={132} height={32} />
        </div>
      </div>
    </div>
  )
}
