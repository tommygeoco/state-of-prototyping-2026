'use client'

import { useCountUp } from '@/lib/hooks/useCountUp'
import { useInView } from '@/lib/hooks/useInView'

interface RoleContrastCalloutProps {
  leftRole: string
  leftMoreValuable: number
  leftLessSecure: number
  leftN?: number
  rightRole: string
  rightMoreValuable: number
  rightLessSecure: number
  rightN?: number
}

export function RoleContrastCallout({
  leftRole,
  leftMoreValuable,
  leftLessSecure,
  leftN,
  rightRole,
  rightMoreValuable,
  rightLessSecure,
  rightN,
}: RoleContrastCalloutProps) {
  const { ref, inView } = useInView()
  const leftValuable = useCountUp(leftMoreValuable, inView, { duration: 900, decimals: 1 })
  const leftSecure = useCountUp(leftLessSecure, inView, { duration: 900, decimals: 1 })
  const rightValuable = useCountUp(rightMoreValuable, inView, { duration: 900, decimals: 1 })
  const rightSecure = useCountUp(rightLessSecure, inView, { duration: 900, decimals: 1 })

  return (
    <figure
      ref={ref}
      role="figure"
      aria-label={`${leftRole}: ${leftMoreValuable.toFixed(1)}% feel more valuable, ${leftLessSecure.toFixed(1)}% feel less secure. ${rightRole}: ${rightMoreValuable.toFixed(1)}% feel more valuable, ${rightLessSecure.toFixed(1)}% feel less secure.`}
      style={{ margin: 0 }}
    >
      <div className="role-contrast-block">
        <div className="role-contrast-side">
          <div className="role-contrast-role">{leftRole}{leftN != null && <span style={{ fontWeight: 400, opacity: 0.6 }}> (n={leftN})</span>}</div>
          <div>
            <div className="role-contrast-stat">{leftValuable}%</div>
            <div className="role-contrast-label">feel more valuable</div>
          </div>
          <div>
            <div className="role-contrast-stat" style={{ color: 'var(--text-muted)' }}>{leftSecure}%</div>
            <div className="role-contrast-label">feel less secure</div>
          </div>
        </div>

        <div className="role-contrast-divider" />

        <div className="role-contrast-side">
          <div className="role-contrast-role">{rightRole}{rightN != null && <span style={{ fontWeight: 400, opacity: 0.6 }}> (n={rightN})</span>}</div>
          <div>
            <div className="role-contrast-stat" style={{ color: 'var(--text-muted)' }}>{rightValuable}%</div>
            <div className="role-contrast-label">feel more valuable</div>
          </div>
          <div>
            <div className="role-contrast-stat">{rightSecure}%</div>
            <div className="role-contrast-label">feel less secure</div>
          </div>
        </div>
      </div>
    </figure>
  )
}
