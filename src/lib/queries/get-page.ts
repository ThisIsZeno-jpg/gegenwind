import { getPayload } from '@/lib/payload'
import { unstable_cache } from 'next/cache'

export const getPageBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: slug },
        },
        limit: 1,
        depth: 3,
      })
      return result.docs[0] ?? null
    },
    [`page-${slug}`],
    {
      tags: [`page-${slug}`],
      revalidate: 3600,
    },
  )()
