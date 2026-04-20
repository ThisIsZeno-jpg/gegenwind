import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kategorie', 'publishedAt', 'updatedAt'],
    listSearchableFields: ['title', 'description'],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // Trigger ISR revalidation
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        try {
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidate-secret': process.env.REVALIDATE_SECRET || '',
            },
            body: JSON.stringify({
              collection: 'articles',
              slug: doc.slug,
            }),
          })
        } catch {
          // Revalidation failed silently in dev
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL-Slug',
      admin: {
        position: 'sidebar',
        description: 'z.B. gaslighting-erkennen — erscheint in der URL',
      },
    },
    {
      name: 'kategorie',
      type: 'select',
      required: true,
      label: 'Kategorie',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Narzissmus', value: 'narzissmus' },
        { label: 'Spiritueller Missbrauch', value: 'spiritueller-missbrauch' },
        { label: 'Sektenhafte Gruppierungen', value: 'sektenhafte-gruppierungen' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Veröffentlichungsdatum',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd. MMMM yyyy',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Lesezeit (Minuten)',
      admin: {
        position: 'sidebar',
        description: 'Geschätzte Lesezeit in Minuten',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurzbeschreibung (Meta/Vorschau)',
      maxLength: 300,
      admin: {
        description: 'Erscheint in der Blog-Übersicht und als Meta-Description',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Beitragsbild (optional)',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Artikelinhalt',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name: 'hinweisBox',
      type: 'group',
      label: 'Hinweis-Box (am Ende des Artikels)',
      admin: {
        description: 'Erscheint als Sand-farbener Kasten mit Verweis auf infoSekta',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow-Label',
          defaultValue: 'Weitere Unterstützung',
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Text der Hinweis-Box',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => defaultFeatures,
          }),
        },
      ],
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      label: 'Verwandte Artikel (Sidebar)',
      maxRows: 3,
      admin: {
        description: 'Werden in der Sidebar des Artikels angezeigt',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO-Titel (leer = Artikeltitel)',
          maxLength: 70,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta-Description (leer = Kurzbeschreibung)',
          maxLength: 160,
        },
      ],
    },
  ],
}
