type Props = {
  settings: {
    tagline?: string
    copyright?: string
    footerNavLinks?: Array<{ label: string; href: string }>
    footerLegalLinks?: Array<{ label: string; href: string; isExternal?: boolean }>
  } | null
}

const defaultNavLinks = [
  { label: 'Themen', href: '/#themen' },
  { label: 'Blog', href: '/blog' },
  { label: 'Bücher', href: '/#buecher' },
  { label: 'Kontakt', href: '/#kontakt' },
]

const defaultLegalLinks = [
  { label: 'Impressum', href: '/impressum', isExternal: false },
  { label: 'Datenschutz', href: '/datenschutz', isExternal: false },
  { label: 'infoSekta', href: 'https://www.infosekta.ch', isExternal: true },
]

export function Footer({ settings }: Props) {
  const tagline = settings?.tagline || 'Kurs halten, wenn der Wind dreht.'
  const copyright = settings?.copyright || '© 2026 Gegenwind · Zürich'
  const navLinks = settings?.footerNavLinks?.length ? settings.footerNavLinks : defaultNavLinks
  const legalLinks = settings?.footerLegalLinks?.length ? settings.footerLegalLinks : defaultLegalLinks

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/gegenwind-lockup-horizontal-white.png" alt="Gegenwind" />
            <p className="footer-tagline">{tagline}</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Rechtliches</h4>
            <ul>
              {legalLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">{copyright}</div>
      </div>
    </footer>
  )
}
