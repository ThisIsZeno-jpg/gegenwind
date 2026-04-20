import type { Block } from 'payload'

export const KontaktBlock: Block = {
  slug: 'kontakt',
  labels: {
    singular: 'Kontakt-Sektion',
    plural: 'Kontakt-Sektionen',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow-Label',
      defaultValue: '09 · Kontakt',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Überschrift (H2)',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitungstext',
    },
    {
      name: 'whisper',
      type: 'text',
      label: 'Persönliche Note (kursiv)',
      admin: {
        description: 'z.B. "Vielleicht ist es das erste Mal, dass du darüber schreibst."',
      },
    },
    {
      name: 'confirmationTitle',
      type: 'text',
      label: 'Bestätigungstitel (nach Absenden)',
      defaultValue: 'Nachricht erhalten.',
    },
    {
      name: 'confirmationBody',
      type: 'textarea',
      label: 'Bestätigungstext',
      defaultValue: 'Danke, dass du geschrieben hast. Ich melde mich bei dir — in der Regel innerhalb von zwei bis drei Tagen.',
    },
    {
      name: 'recipientEmail',
      type: 'email',
      label: 'Empfänger-E-Mail',
      admin: {
        position: 'sidebar',
        description: 'An diese Adresse werden Nachrichten gesendet',
      },
    },
  ],
}
