import type { Block } from 'payload'

export const BlogPreviewBlock: Block = {
  slug: 'blog-preview',
  labels: {
    singular: 'Blog-Vorschau-Sektion',
    plural: 'Blog-Vorschau-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '06 · Beiträge',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 3,
      label: 'Ausgewählte Artikel',
      admin: {
        description: 'Wähle bis zu 3 Artikel für die Vorschau auf der Homepage',
      },
    },
    {
      name: 'viewAllText',
      type: 'text',
      label: 'Link "Alle Beiträge"',
      defaultValue: 'Alle Beiträge ansehen →',
    },
    {
      name: 'viewAllHref',
      type: 'text',
      label: 'Link-Ziel',
      defaultValue: '/blog',
    },
  ],
}
