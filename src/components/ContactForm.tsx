'use client'

import { useState } from 'react'

type Props = {
  confirmationTitle?: string
  confirmationBody?: string
}

export function ContactForm({
  confirmationTitle = 'Nachricht erhalten.',
  confirmationBody = 'Danke, dass du geschrieben hast. Ich melde mich bei dir — in der Regel innerhalb von zwei bis drei Tagen.',
}: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('website')) return

    setLoading(true)
    // Demo: simulate send
    await new Promise(resolve => setTimeout(resolve, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-confirmation" style={{ display: 'block' }} role="status" aria-live="polite">
        <h3>{confirmationTitle}</h3>
        <p>
          {confirmationBody}{' '}
          Falls es dringend ist, wende dich direkt an{' '}
          <a href="https://www.infosekta.ch" target="_blank" rel="noopener noreferrer">
            infoSekta
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input type="text" name="website" aria-hidden="true" style={{ display: 'none' }} tabIndex={-1} />

      <div className="form-group">
        <label className="form-label" htmlFor="name">Name (wenn du magst)</label>
        <input className="form-input" type="text" id="name" name="name" autoComplete="name" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">E-Mail-Adresse *</label>
        <input className="form-input" type="email" id="email" name="email" autoComplete="email" required aria-required="true" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="nachricht">Nachricht *</label>
        <textarea className="form-textarea" id="nachricht" name="nachricht" required aria-required="true" minLength={10} />
      </div>

      <div className="form-group">
        <div className="form-checkbox-row">
          <input type="checkbox" id="datenschutz" name="datenschutz" required aria-required="true" />
          <label htmlFor="datenschutz">
            Ich habe die{' '}
            <a href="/datenschutz">Datenschutzerklärung</a>{' '}
            gelesen und bin einverstanden.
          </label>
        </div>
      </div>

      <div className="form-submit">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Wird gesendet…' : 'Nachricht senden'}
        </button>
      </div>
    </form>
  )
}
