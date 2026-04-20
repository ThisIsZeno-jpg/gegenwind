import { getPageBySlug } from '@/lib/queries/get-page'
import { RichText } from '@/components/RichText'

export const metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false },
}

export default async function DatenschutzPage() {
  const page = await getPageBySlug('datenschutz')
  const block = page?.layout?.find((b: any) => b.blockType === 'legal-content')

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Rechtliches</span>
          <h1>Datenschutzerklärung</h1>
          <p className="page-header-meta">Stand: April 2026 · Gilt für gegenwind.ch</p>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="legal-content">
            {block?.content ? (
              <RichText content={block.content} />
            ) : (
              <section>
                <h2>Verantwortlicher</h2>
                <p>Thomas Meier, Zürich — <a href="mailto:kontakt@gegenwind.ch">kontakt@gegenwind.ch</a></p>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
