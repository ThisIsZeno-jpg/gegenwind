'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const KATEGORIEN = [
  { label: 'Alle', value: 'alle' },
  { label: 'Narzissmus', value: 'narzissmus' },
  { label: 'Spiritueller Missbrauch', value: 'spiritueller-missbrauch' },
  { label: 'Sektenhafte Gruppierungen', value: 'sektenhafte-gruppierungen' },
]

export function BlogFilterClient({ currentKategorie }: { currentKategorie: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'alle') {
      params.delete('kategorie')
    } else {
      params.set('kategorie', value)
    }
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="blog-filter">
      <div className="container">
        <div className="filter-row" role="group" aria-label="Nach Kategorie filtern">
          <span className="filter-label">Filtern</span>
          {KATEGORIEN.map(k => (
            <button
              key={k.value}
              className={`filter-pill${currentKategorie === k.value ? ' is-active' : ''}`}
              onClick={() => setFilter(k.value)}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
