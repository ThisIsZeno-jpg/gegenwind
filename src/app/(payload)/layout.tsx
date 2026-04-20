import React from 'react'

export const metadata = {
  title: 'Gegenwind Admin',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
