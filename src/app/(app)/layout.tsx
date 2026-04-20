import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { getSettings } from '@/lib/queries/get-settings'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Gegenwind',
    default: 'Gegenwind — Kurs halten, wenn der Wind dreht.',
  },
  description:
    'Eine Plattform für Betroffene und Angehörige von Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen in der Schweiz.',
  icons: {
    icon: [
      { url: '/assets/gegenwind-favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/gegenwind-favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => null)

  return (
    <html lang="de-CH" className={`${interTight.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Nav settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
