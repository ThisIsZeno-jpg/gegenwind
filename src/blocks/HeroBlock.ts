import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Text',
      defaultValue: 'Gegenwind · Austausch & Orientierung',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H1)',
    },
    {
      name: 'lede',
      type: 'textarea',
      label: 'Einleitungstext',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primärer Button',
      fields: [
        { name: 'text', type: 'text', label: 'Buttontext' },
        { name: 'href', type: 'text', label: 'Link' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Sekundärer Button (Ghost)',
      fields: [
        { name: 'text', type: 'text', label: 'Buttontext' },
        { name: 'href', type: 'text', label: 'Link' },
      ],
    },
  ],
}
