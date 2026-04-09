'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ThemeToggle } from '@/components/ui/theme-toggle'

const navLinks = [
  { href: '/explore', label: 'Report' },
  { href: '/download', label: 'Download' },
  { href: '/api', label: 'API' },
  { href: '/agent', label: 'Agents' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const firstLink = drawerRef.current?.querySelector<HTMLElement>('a, button')
      firstLink?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const toggle = useCallback(() => setOpen((o) => !o), [])
  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="mobile-menu-btn md:hidden"
        onClick={toggle}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <div className={`hamburger-icon ${open ? 'hamburger-open' : ''}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      {open && (
        <div className="mobile-menu-backdrop" onClick={close} aria-hidden="true" />
      )}

      <div
        ref={drawerRef}
        className={`mobile-menu-drawer ${open ? 'mobile-menu-drawer-open' : ''}`}
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Site navigation"
        inert={!open || undefined}
      >
        <nav className="mobile-menu-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu-link ${pathname === link.href ? 'mobile-menu-link-active' : ''}`}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <span className="mobile-menu-footer-label">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
