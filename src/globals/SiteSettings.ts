import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website-Einstellungen',
  admin: {
    group: 'Einstellungen',
  },
  hooks: {
    afterChange: [
      async () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        try {
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidate-secret': process.env.REVALIDATE_SECRET || '',
            },
            body: JSON.stringify({ collection: 'site-settings' }),
          })
        } catch {
          // silent
        }
      },
    ],
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Kurs halten, wenn der Wind dreht.',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright-Text',
      defaultValue: '© 2026 Gegenwind · Zürich',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Kontakt-E-Mail',
      defaultValue: 'kontakt@gegenwind.ch',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigationslinks',
      admin: {
        description: 'Links in der Hauptnavigation',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link-Text',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Link-Ziel (z.B. /#themen oder /blog)',
        },
      ],
    },
    {
      name: 'footerNavLinks',
      type: 'array',
      label: 'Footer: Navigation-Spalte',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Link-Text' },
        { name: 'href', type: 'text', required: true, label: 'Link-Ziel' },
      ],
    },
    {
      name: 'footerLegalLinks',
      type: 'array',
      label: 'Footer: Rechtliche Spalte',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Link-Text' },
        { name: 'href', type: 'text', required: true, label: 'Link-Ziel' },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'Externer Link (öffnet in neuem Tab)',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      label: 'SEO-Standards',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Website-Name',
          defaultValue: 'Gegenwind',
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          label: 'Standard Meta-Description',
          defaultValue: 'Eine Plattform für Betroffene und Angehörige von Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen in der Schweiz.',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Standard OG-Bild (Social Sharing)',
        },
      ],
    },
  ],
}
