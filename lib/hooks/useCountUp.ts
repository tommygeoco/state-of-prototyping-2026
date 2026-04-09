'use client'

import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to `target` over `duration` ms, triggered by `active`.
 * Returns the current display value as a formatted string.
 */
export function useCountUp(
  target: number,
  active: boolean,
  options?: { duration?: number; decimals?: number }
) {
  const duration = options?.duration ?? 800
  const decimals = options?.decimals ?? 1
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }

    let start: number | null = null
    let raf: number

    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)

      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value.toFixed(decimals)
}
