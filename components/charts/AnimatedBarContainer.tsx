'use client'

import type { ReactNode } from 'react'

import { useInView } from '@/lib/hooks/useInView'

interface AnimatedBarContainerProps {
  children: (inView: boolean) => ReactNode
}

export function AnimatedBarContainer({ children }: AnimatedBarContainerProps) {
  const { ref, inView } = useInView()

  return <div ref={ref}>{children(inView)}</div>
}
