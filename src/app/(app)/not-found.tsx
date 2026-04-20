export default function NotFound() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--terracotta)' }}>404</span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 300 }}>Seite nicht gefunden.</h1>
          <p className="page-header-lede">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
        </div>
      </header>
      <main>
        <div className="container" style={{ padding: '4rem 2rem' }}>
          <a href="/" className="btn">Zur Startseite →</a>
        </div>
      </main>
    </>
  )
}
