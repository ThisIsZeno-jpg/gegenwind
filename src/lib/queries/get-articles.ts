import { getPayload } from '@/lib/payload'
import { unstable_cache } from 'next/cache'

export const getArticles = unstable_cache(
  async (kategorie?: string) => {
    try {
      const payload = await getPayload()
      return payload.find({
        collection: 'articles',
        where: {
          ...(kategorie
            ? { kategorie: { equals: kategorie } }
            : {}),
        },
        sort: '-publishedAt',
        depth: 2,
      })
    } catch {
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false }
    }
  },
  ['articles-list'],
  {
    tags: ['articles-list'],
    revalidate: 3600,
  },
)

export const getArticleBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const payload = await getPayload()
        const result = await payload.find({
          collection: 'articles',
          where: {
            slug: { equals: slug },
          },
          limit: 1,
          depth: 3,
        })
        return result.docs[0] ?? null
      } catch {
        return null
      }
    },
    [`article-${slug}`],
    {
      tags: [`article-${slug}`, 'articles-list'],
      revalidate: 3600,
    },
  )()
