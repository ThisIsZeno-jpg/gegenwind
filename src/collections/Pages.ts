import type { CollectionConfig } from 'payload'

import { HeroBlock } from '../blocks/HeroBlock'
import { WillkommenBlock } from '../blocks/WillkommenBlock'
import { ThemenBlock } from '../blocks/ThemenBlock'
import { UeberBlock } from '../blocks/UeberBlock'
import { BlogPreviewBlock } from '../blocks/BlogPreviewBlock'
import { BuecherBlock } from '../blocks/BuecherBlock'
import { InfoSektaBlock } from '../blocks/InfoSektaBlock'
import { KontaktBlock } from '../blocks/KontaktBlock'
import { LegalContentBlock } from '../blocks/LegalContentBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        try {
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidate-secret': process.env.REVALIDATE_SECRET || '',
            },
            body: JSON.stringify({
              collection: 'pages',
              slug: doc.slug,
            }),
          })
        } catch {
          // silent
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Seitentitel',
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
        description: 'z.B. "home", "impressum", "datenschutz"',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Sektionen',
      blocks: [
        HeroBlock,
        WillkommenBlock,
        ThemenBlock,
        UeberBlock,
        BlogPreviewBlock,
        BuecherBlock,
        InfoSektaBlock,
        KontaktBlock,
        LegalContentBlock,
      ],
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
          label: 'Meta-Titel',
          maxLength: 70,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta-Description',
          maxLength: 160,
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Von Suchmaschinen ausschliessen (noindex)',
          defaultValue: false,
        },
      ],
    },
  ],
}
