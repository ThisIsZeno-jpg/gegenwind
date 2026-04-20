import type { Block } from 'payload'

export const ThemenBlock: Block = {
  slug: 'themen',
  labels: {
    singular: 'Themenbereiche-Sektion',
    plural: 'Themenbereiche-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: 'Themenbereiche',
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
      label: 'Themen-Karten',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow (z.B. "02 · Thema")',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Thema-Titel (H3)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link-Text',
          defaultValue: 'Zum Thema →',
        },
        {
          name: 'linkHref',
          type: 'text',
          label: 'Link-Ziel',
          defaultValue: '#blog',
        },
      ],
    },
  ],
}
