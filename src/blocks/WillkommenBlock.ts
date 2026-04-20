import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const WillkommenBlock: Block = {
  slug: 'willkommen',
  labels: {
    singular: 'Willkommen-Sektion',
    plural: 'Willkommen-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '01 · Willkommen',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Fliesstext',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name: 'statement',
      type: 'text',
      label: 'Emotionales Statement (grosse kursive Schrift)',
      admin: {
        description: 'z.B. "Du bist nicht allein. Und du bist nicht schuld."',
      },
    },
  ],
}
