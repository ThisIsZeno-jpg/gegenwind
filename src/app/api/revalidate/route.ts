import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { collection, slug } = body

    if (collection === 'articles') {
      revalidateTag(`article-${slug}`)
      revalidateTag('articles-list')
    } else if (collection === 'pages') {
      revalidateTag(`page-${slug}`)
    } else if (collection === 'site-settings') {
      revalidateTag('site-settings')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
