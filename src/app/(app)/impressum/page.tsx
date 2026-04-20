import { getPageBySlug } from '@/lib/queries/get-page'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Impressum',
  robots: { index: false },
}

export default async function ImpressumPage() {
  const page = await getPageBySlug('impressum')
  const block = page?.layout?.find((b: any) => b.blockType === 'legal-content')

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Impressum</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="legal-content">
            {block?.content ? (
              <RichText content={block.content} />
            ) : (
              <section>
                <h2>Verantwortlicher für den Inhalt</h2>
                <address className="legal-address">
                  Thomas Meier<br />
                  [Strasse und Hausnummer]<br />
                  [PLZ] Zürich<br />
                  Schweiz
                </address>
                <p style={{ marginTop: '1rem' }}>
                  E-Mail: <a href="mailto:kontakt@gegenwind.ch">kontakt@gegenwind.ch</a>
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
