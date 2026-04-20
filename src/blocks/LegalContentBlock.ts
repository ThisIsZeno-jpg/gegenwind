import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const LegalContentBlock: Block = {
  slug: 'legal-content',
  labels: {
    singular: 'Rechtlicher Inhalt',
    plural: 'Rechtliche Inhalte',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhalt (Rich Text)',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
  ],
}
