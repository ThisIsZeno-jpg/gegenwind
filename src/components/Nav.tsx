'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Props = {
  settings: {
    navLinks?: Array<{ label: string; href: string }>
  } | null
}

const defaultLinks = [
  { label: 'Themen', href: '/#themen' },
  { label: 'Über mich', href: '/#ueber' },
  { label: 'Blog', href: '/blog' },
  { label: 'Bücher', href: '/#buecher' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export function Nav({ settings }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navEl = useRef<HTMLElement>(null)
  const links = settings?.navLinks?.length ? settings.navLinks : defaultLinks

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav ref={navEl} className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Hauptnavigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Gegenwind — zur Startseite">
            <img src="/assets/gegenwind-lockup-horizontal.png" alt="Gegenwind" />
          </Link>
          <ul className="nav-links">
            {links.map(link => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <button
            className="nav-burger"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`nav-overlay${menuOpen ? ' is-open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <button
          className="nav-overlay-close"
          aria-label="Menü schliessen"
          onClick={() => setMenuOpen(false)}
        >
          Schliessen ✕
        </button>
        <ul>
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
