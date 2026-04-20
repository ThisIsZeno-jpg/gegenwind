import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const UeberBlock: Block = {
  slug: 'ueber',
  labels: {
    singular: 'Über-mich-Sektion',
    plural: 'Über-mich-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '05 · Über mich',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait-Foto',
    },
    {
      name: 'portraitAlt',
      type: 'text',
      label: 'Alt-Text Portrait (falls kein Bild hochgeladen)',
      defaultValue: 'Portrait · Thomas',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Fliesstext (mit Blockquote)',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name: 'disclaimer',
      type: 'group',
      label: 'Hinweis-Box',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          defaultValue: 'Diese Seite ist kein Beratungsangebot. Für persönliche Beratung vermittle ich dich gerne an infoSekta weiter.',
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link-Text',
          defaultValue: 'infoSekta',
        },
        {
          name: 'linkHref',
          type: 'text',
          label: 'Link-URL',
          defaultValue: 'https://www.infosekta.ch',
        },
      ],
    },
  ],
}
