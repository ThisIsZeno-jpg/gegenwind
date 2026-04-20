import type { Block } from 'payload'

export const InfoSektaBlock: Block = {
  slug: 'infosekta',
  labels: {
    singular: 'infoSekta-Sektion',
    plural: 'infoSekta-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '08 · Professionelle Hilfe',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Fliesstext',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Button-Text',
      defaultValue: 'Zur Website von infoSekta →',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Button-Link',
      defaultValue: 'https://www.infosekta.ch',
    },
  ],
}
