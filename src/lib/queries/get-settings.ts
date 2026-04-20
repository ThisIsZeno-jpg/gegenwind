import { getPayload } from '@/lib/payload'
import { unstable_cache } from 'next/cache'

export const getSettings = unstable_cache(
  async () => {
    const payload = await getPayload()
    return payload.findGlobal({
      slug: 'site-settings',
    })
  },
  ['site-settings'],
  {
    tags: ['site-settings'],
    revalidate: 3600,
  },
)
