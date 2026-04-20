import { getPageBySlug } from '@/lib/queries/get-page'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { RichText } from '@/components/RichText'
import { ContactForm } from '@/components/ContactForm'

export const revalidate = 3600

// Compass SVG component (inline, animated via CSS)
function CompassSVG() {
  return (
    <div className="hero-compass" aria-hidden="true">
      <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle id="compassRing" cx="130" cy="130" r="106" stroke="#2C3E50" strokeOpacity="0.10" strokeWidth="1.5"/>
        <circle cx="130" cy="130" r="72" stroke="#2C3E50" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 6"/>
        <g id="compassNeedle">
          <path d="M130 130 L146 130 L130 218 L114 130 Z" fill="#2C3E50"/>
          <path id="compassTip" d="M130 42 L146 130 L114 130 Z" fill="#D4A574"/>
        </g>
        <circle id="compassPivot" cx="130" cy="130" r="8" fill="#F4EFE8" stroke="#2C3E50" strokeOpacity="0.22" strokeWidth="1.2"/>
        <circle cx="130" cy="130" r="2.5" fill="#2C3E50" opacity="0.35"/>
      </svg>
    </div>
  )
}

// Breath divider
function BreathDivider() {
  return (
    <div className="breath" aria-hidden="true">
      <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g transform="rotate(-3 130 130)">
          <path d="M130 130 L146 130 L130 218 L114 130 Z" fill="#2C3E50"/>
          <path d="M130 42 L146 130 L114 130 Z" fill="#D4A574"/>
        </g>
        <circle cx="130" cy="130" r="8" fill="#F4EFE8" stroke="#2C3E50" strokeOpacity="0.3" strokeWidth="1.5"/>
      </svg>
    </div>
  )
}

export default async function HomePage() {
  const page = await getPageBySlug('home')

  // Fallback values if no CMS data yet
  const hero = page?.layout?.find((b: any) => b.blockType === 'hero')
  const willkommen = page?.layout?.find((b: any) => b.blockType === 'willkommen')
  const themen = page?.layout?.find((b: any) => b.blockType === 'themen')
  const ueber = page?.layout?.find((b: any) => b.blockType === 'ueber')
  const blogPreview = page?.layout?.find((b: any) => b.blockType === 'blog-preview')
  const buecher = page?.layout?.find((b: any) => b.blockType === 'buecher')
  const infosekta = page?.layout?.find((b: any) => b.blockType === 'infosekta')
  const kontakt = page?.layout?.find((b: any) => b.blockType === 'kontakt')

  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section id="hero" aria-label="Einstieg">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">{hero?.eyebrow || 'Gegenwind · Austausch & Orientierung'}</span>
            <h1>{hero?.heading || 'Kurs halten,\nwenn der Wind dreht.'}</h1>
            <p className="hero-lede">
              {hero?.lede || 'Eine Plattform für Betroffene und Angehörige von Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen. Erfahrungen teilen. Klarheit finden. Nicht allein bleiben.'}
            </p>
            <div className="hero-ctas">
              <a href={hero?.primaryCta?.href || '#themen'} className="btn">{hero?.primaryCta?.text || 'Themen erkunden →'}</a>
              <a href={hero?.secondaryCta?.href || '#kontakt'} className="btn btn-ghost">{hero?.secondaryCta?.text || 'Kontakt aufnehmen'}</a>
            </div>
          </div>
          <CompassSVG />
        </div>
      </section>

      <BreathDivider />

      {/* WILLKOMMEN */}
      <section id="willkommen" className="section" aria-labelledby="willkommen-title">
        <div className="container">
          <div className="inner reveal">
            <span className="eyebrow">{willkommen?.eyebrow || '01 · Willkommen'}</span>
            <h2 id="willkommen-title">{willkommen?.heading || 'Du bist hier richtig.'}</h2>
            {willkommen?.body ? (
              <RichText content={willkommen.body} />
            ) : (
              <p>Wenn du diese Seite gefunden hast, hast du vermutlich etwas erlebt, für das dir lange die Worte fehlten.</p>
            )}
            {willkommen?.statement && (
              <p className="willkommen-statement reveal">{willkommen.statement}</p>
            )}
            {!willkommen?.statement && (
              <p className="willkommen-statement reveal">Du bist nicht allein.<br />Und du bist nicht schuld.</p>
            )}
          </div>
        </div>
      </section>

      {/* THEMEN */}
      <section id="themen" className="section" aria-labelledby="themen-title">
        <div className="container">
          <div className="themes-header">
            <span className="eyebrow">{themen?.eyebrow || 'Themenbereiche'}</span>
            <h2 id="themen-title">{themen?.heading || 'Worum es geht.'}</h2>
          </div>
          <div className="themes-grid stagger-parent" role="list">
            {(themen?.items || [
              { eyebrow: '02 · Thema', heading: 'Narzissmus', description: 'Muster erkennen, Gaslighting verstehen, die eigene Wahrnehmung zurückgewinnen.', linkText: 'Zum Thema →', linkHref: '#blog' },
              { eyebrow: '03 · Thema', heading: 'Spiritueller Missbrauch', description: 'Wenn Sinnsuche zu systematischer Abhängigkeit wird.', linkText: 'Zum Thema →', linkHref: '#blog' },
              { eyebrow: '04 · Thema', heading: 'Sektenhafte Gruppierungen', description: 'Systeme, die vereinnahmen, isolieren und die eigene Wahrnehmung überschreiben.', linkText: 'Zum Thema →', linkHref: '#blog' },
            ]).map((item: any, i: number) => (
              <a href={item.linkHref} className="theme-item" role="listitem" key={i}>
                <span className="eyebrow">{item.eyebrow}</span>
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
                <span className="theme-arrow">{item.linkText}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ÜBER THOMAS */}
      <section id="ueber" className="section" aria-labelledby="ueber-title">
        <div className="container">
          <div className="about-grid">
            <div className="about-portrait reveal">
              {ueber?.portrait?.url ? (
                <img src={ueber.portrait.url} alt={ueber.portrait.alt || 'Portrait von Thomas'} />
              ) : (
                <span className="about-portrait-placeholder">Portrait · Thomas</span>
              )}
            </div>
            <div className="about-text reveal">
              <span className="eyebrow">{ueber?.eyebrow || '05 · Über mich'}</span>
              <h2 id="ueber-title">{ueber?.heading || 'Warum ich diese Seite gemacht habe.'}</h2>
              {ueber?.body ? (
                <RichText content={ueber.body} />
              ) : (
                <>
                  <p>Mein Name ist Thomas, und ich lebe in der Schweiz. Ich bin selbst Betroffener und Angehöriger — von narzisstischem Missbrauch und von spirituellem Missbrauch.</p>
                  <blockquote className="blockquote-thomas">
                    «Genau dieses Gefühl — endlich verstanden zu werden — möchte ich weitergeben.»
                    <br /><small>— Thomas</small>
                  </blockquote>
                  <p>Diese Seite möchte dazu beitragen. Ich teile meine Erfahrungen, Bücher, die mir geholfen haben, und Einordnungen zu Begriffen.</p>
                  <p><em>Eine der grössten Hürden ist die eigene Scham. Du musst dich nicht erklären. Du bist hier willkommen.</em></p>
                </>
              )}
              <div className="about-disclaimer">
                {ueber?.disclaimer?.text || 'Diese Seite ist kein Beratungsangebot.'}{' '}
                <a href={ueber?.disclaimer?.linkHref || 'https://www.infosekta.ch'} target="_blank" rel="noopener noreferrer">
                  {ueber?.disclaimer?.linkText || 'infoSekta'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section id="blog" className="section" aria-labelledby="blog-title">
        <div className="container">
          <div className="blog-section-header">
            <div>
              <span className="eyebrow">{blogPreview?.eyebrow || '06 · Beiträge'}</span>
              <h2 id="blog-title">{blogPreview?.heading || 'Zum Nachlesen.'}</h2>
            </div>
            <a href={blogPreview?.viewAllHref || '/blog'} className="blog-section-link">
              {blogPreview?.viewAllText || 'Alle Beiträge ansehen →'}
            </a>
          </div>
          <div className="blog-grid stagger-parent">
            {(blogPreview?.articles || []).length > 0 ? (
              (blogPreview.articles as any[]).map((article: any, i: number) => {
                const a = article?.value || article
                return (
                  <a href={`/blog/${a.slug}`} className="blog-card" key={i}>
                    <div className="blog-card-meta">
                      <span className="blog-tag">{a.kategorie}</span>
                      <span className="blog-date">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                    </div>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    <span className="blog-read">Weiterlesen →</span>
                  </a>
                )
              })
            ) : (
              // Fallback to static preview
              [
                { slug: 'gaslighting-erkennen', kategorie: 'Narzissmus', date: '14. März 2026', title: 'Gaslighting erkennen — wenn die eigene Wahrnehmung zum Problem wird', summary: 'Was Gaslighting ist, wie es wirkt, und wie du dir selbst wieder vertrauen kannst.' },
                { slug: 'love-bombing', kategorie: 'Narzissmus', date: '22. März 2026', title: 'Love Bombing — wenn überwältigende Zuneigung ein Warnsignal ist', summary: 'Was sich wie echte Liebe anfühlt, kann der Beginn von Kontrolle sein.' },
                { slug: 'sektenhafte-gruppen-heute', kategorie: 'Sektenhafte Gruppierungen', date: '5. April 2026', title: 'Sektenhafte Gruppen heute — warum sie so schwer zu erkennen sind', summary: 'Wie Kontrollstrukturen sich hinter spirituellen und therapeutischen Formaten verbergen.' },
              ].map((a, i) => (
                <a href={`/blog/${a.slug}`} className="blog-card" key={i}>
                  <div className="blog-card-meta">
                    <span className="blog-tag">{a.kategorie}</span>
                    <span className="blog-date">{a.date}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                  <span className="blog-read">Weiterlesen →</span>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* BÜCHER */}
      <section id="buecher" className="section" aria-labelledby="buecher-title">
        <div className="container">
          <span className="eyebrow">{buecher?.eyebrow || '07 · Lesetipps'}</span>
          <h2 id="buecher-title">{buecher?.heading || 'Bücher, die Orientierung geben.'}</h2>
          <div className="book-list" style={{ marginTop: '2.5rem' }}>
            {(buecher?.items || [
              { title: 'Warum fühle ich mich leer, obwohl ich gebraucht werde?', authorMeta: 'Christine Merzeder · Narzissmus · Klett-Cotta, 2022', linkText: 'Bei Orell Füssli →', linkHref: '#' },
              { title: 'Dem Chaos entkommen', authorMeta: 'Ramani Durvasula · Narzissmus · riva Verlag, 2023', linkText: 'Bei Orell Füssli →', linkHref: '#' },
              { title: 'Thought Reform and the Psychology of Totalism', authorMeta: 'Robert Jay Lifton · Sekten · W. W. Norton, 1961', linkText: 'Bei Ex Libris →', linkHref: '#' },
              { title: 'Der Missbrauch spiritueller Macht', authorMeta: 'David Johnson, Jeff VanVonderen · Spiritueller Missbrauch · Brunnen, 2020', linkText: 'Bei Orell Füssli →', linkHref: '#' },
              { title: 'Gift der Spiritualität', authorMeta: 'Jana Lembke · Spiritueller Missbrauch · Kösel, 2024', linkText: 'Bei Orell Füssli →', linkHref: '#' },
              { title: 'Toxic Parents', authorMeta: 'Susan Forward · Narzissmus · Ballantine Books, 2002', linkText: 'Bei Ex Libris →', linkHref: '#' },
            ]).map((book: any, i: number) => (
              <div className="book-item" key={i}>
                <div>
                  <p className="book-title">{book.title}</p>
                  <p className="book-meta">{book.authorMeta}</p>
                </div>
                {book.linkHref && book.linkHref !== '#' ? (
                  <a href={book.linkHref} className="book-link" target="_blank" rel="noopener noreferrer">{book.linkText}</a>
                ) : (
                  <span className="book-link" style={{ opacity: 0.4 }}>{book.linkText}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFOSEKTA */}
      <section id="infosekta" className="section" aria-labelledby="infosekta-title">
        <div className="container">
          <div className="inner reveal">
            <span className="eyebrow">{infosekta?.eyebrow || '08 · Professionelle Hilfe'}</span>
            <h2 id="infosekta-title">{infosekta?.heading || 'Wenn du mehr als Austausch brauchst.'}</h2>
            <p>{infosekta?.body || 'Gegenwind ist eine persönliche Plattform — kein Beratungsangebot. Für professionelle Einordnung empfehle ich infoSekta Zürich.'}</p>
            <div style={{ marginTop: '2rem' }}>
              <a
                href={infosekta?.ctaHref || 'https://www.infosekta.ch'}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {infosekta?.ctaText || 'Zur Website von infoSekta →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="section" aria-labelledby="kontakt-title">
        <div className="container">
          <div className="kontakt-grid">
            <div className="kontakt-intro">
              <span className="eyebrow">{kontakt?.eyebrow || '09 · Kontakt'}</span>
              <h2 id="kontakt-title">{kontakt?.heading || 'Schreib mir.'}</h2>
              <p>{kontakt?.intro || 'Du musst nicht alles auf einmal sagen. Ein Satz genügt, um anzufangen. Ich antworte persönlich und vertraulich.'}</p>
              <p className="contact-whisper">{kontakt?.whisper || 'Vielleicht ist es das erste Mal, dass du darüber schreibst. Das darf so sein.'}</p>
            </div>
            <div>
              <ContactForm
                confirmationTitle={kontakt?.confirmationTitle}
                confirmationBody={kontakt?.confirmationBody}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
