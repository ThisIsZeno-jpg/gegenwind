import type { Block } from 'payload'

export const BuecherBlock: Block = {
  slug: 'buecher',
  labels: {
    singular: 'Bücher-Sektion',
    plural: 'Bücher-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '07 · Lesetipps',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bücher',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Buchtitel',
        },
        {
          name: 'authorMeta',
          type: 'text',
          label: 'Autor · Kategorie · Verlag, Jahr',
          admin: {
            description: 'z.B. "Christine Merzeder · Narzissmus · Klett-Cotta, 2022"',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link-Text',
          defaultValue: 'Bei Orell Füssli →',
        },
        {
          name: 'linkHref',
          type: 'text',
          label: 'Link-URL',
        },
      ],
    },
  ],
}
