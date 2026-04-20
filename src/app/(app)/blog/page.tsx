import { Suspense } from 'react'
import { getArticles } from '@/lib/queries/get-articles'
import { BlogFilterClient } from '@/components/BlogFilterClient'

export const revalidate = 3600

export const metadata = {
  title: 'Blog',
  description: 'Einordnung, Analyse und persönliche Reflexion zu Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const KATEGORIE_LABELS: Record<string, string> = {
  'narzissmus': 'Narzissmus',
  'spiritueller-missbrauch': 'Spiritueller Missbrauch',
  'sektenhafte-gruppierungen': 'Sektenhafte Gruppierungen',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string }>
}) {
  const params = await searchParams
  const kategorie = params.kategorie || 'alle'
  const result = await getArticles(kategorie === 'alle' ? undefined : kategorie)
  const articles = result.docs

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Gegenwind</span>
          <h1>Blog</h1>
          <p className="page-header-lede">
            Einordnung, Analyse und persönliche Reflexion zu Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen.
          </p>
        </div>
      </header>

      <Suspense>
        <BlogFilterClient currentKategorie={kategorie} />
      </Suspense>

      <main>
        <div className="container">
          <div style={{ paddingBottom: '6rem' }}>
            <p className="blog-list-count" aria-live="polite" aria-atomic="true">
              {articles.length} {articles.length === 1 ? 'Artikel' : 'Artikel'}
            </p>

            {articles.map(article => (
              <a
                key={article.id}
                href={`/blog/${article.slug}`}
                className="blog-article-item"
              >
                <div>
                  <div className="article-meta">
                    <span className="article-kategorie">
                      {KATEGORIE_LABELS[article.kategorie] || article.kategorie}
                    </span>
                    <span className="article-date">
                      {article.publishedAt ? formatDate(article.publishedAt) : ''}
                    </span>
                  </div>
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-summary">{article.description}</p>
                </div>
                <div>
                  {article.readingTime && (
                    <span className="article-readtime">{article.readingTime} Min.</span>
                  )}
                  <span className="article-arrow">→</span>
                </div>
              </a>
            ))}

            {articles.length === 0 && (
              <p style={{ padding: '4rem 0', color: 'var(--slate-soft)', fontSize: '.9375rem' }}>
                Zu dieser Kategorie gibt es noch keine Artikel — schau bald wieder vorbei.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
