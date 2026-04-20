import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles } from '@/lib/queries/get-articles'
import { RichText } from '@/components/RichText'

export const revalidate = 3600

export async function generateStaticParams() {
  const result = await getArticles()
  return result.docs.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.description,
  }
}

const KATEGORIE_LABELS: Record<string, string> = {
  'narzissmus': 'Narzissmus',
  'spiritueller-missbrauch': 'Spiritueller Missbrauch',
  'sektenhafte-gruppierungen': 'Sektenhafte Gruppierungen',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const katLabel = KATEGORIE_LABELS[article.kategorie] || article.kategorie

  return (
    <>
      <header className="article-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Gegenwind</a>
            <span className="breadcrumb-sep">/</span>
            <a href="/blog">Blog</a>
            <span className="breadcrumb-sep">/</span>
            <a href={`/blog?kategorie=${article.kategorie}`}>{katLabel}</a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{article.title}</span>
          </nav>

          <span className="eyebrow">{katLabel}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-.03em', lineHeight: 1.08, color: 'var(--slate-ink)', maxWidth: '820px', marginBottom: '1.5rem' }}>
            {article.title}
          </h1>

          <div className="article-header-meta">
            {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
            {article.readingTime && <span>{article.readingTime} Minuten</span>}
            <span>Von Thomas Meier</span>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="article-layout">
            <article className="article-body">
              <RichText content={article.content as any} />

              {article.hinweisBox?.text && (
                <>
                  <hr className="article-rule" />
                  <div className="hinweis-box">
                    <span className="eyebrow">{article.hinweisBox.eyebrow || 'Weitere Unterstützung'}</span>
                    <RichText content={article.hinweisBox.text as any} />
                  </div>
                </>
              )}

              <a href="/blog" className="back-link">
                <span>←</span> Zurück zum Blog
              </a>
            </article>

            <aside className="article-sidebar" aria-label="Weitere Artikel">
              {(article.relatedArticles as any[])?.length > 0 && (
                <div className="sidebar-block">
                  <span className="eyebrow">Weitere Artikel</span>
                  <ul className="sidebar-related">
                    {(article.relatedArticles as any[]).map((rel: any) => {
                      const a = rel?.value || rel
                      return (
                        <li key={a.id || a.slug}>
                          <a href={`/blog/${a.slug}`}>
                            <span className="rel-cat">{KATEGORIE_LABELS[a.kategorie] || a.kategorie}</span>
                            {a.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <div className="sidebar-block">
                <span className="eyebrow">Beratung</span>
                <p>Vertrauliche Fachberatung bei psychischer Manipulation und sektenhaften Gruppen:</p>
                <br />
                <a href="https://www.infosekta.ch" target="_blank" rel="noopener noreferrer">
                  infoSekta →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
