/**
 * Seed script — Gegenwind
 * Migriert alle statischen HTML-Inhalte in Payload CMS.
 *
 * Ausführen: npx tsx scripts/seed.ts
 */

import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

// ─── Lexical helpers ─────────────────────────────────────────────────────────

type LexicalNode =
  | ParagraphNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | TextNode

interface TextNode {
  type: 'text'
  version: 1
  text: string
  format: number
  detail: 0
  mode: 'normal'
  style: ''
}

interface ParagraphNode {
  type: 'paragraph'
  version: 1
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: 0
}

interface HeadingNode {
  type: 'heading'
  version: 1
  tag: 'h1' | 'h2' | 'h3' | 'h4'
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: 0
}

interface ListNode {
  type: 'list'
  version: 1
  listType: 'bullet' | 'number'
  start: 1
  tag: 'ul' | 'ol'
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: 0
}

interface ListItemNode {
  type: 'listitem'
  version: 1
  value: number
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  checked: undefined
}

interface QuoteNode {
  type: 'quote'
  version: 1
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: 0
}

const t = (text: string, format = 0): TextNode => ({
  type: 'text',
  version: 1,
  text,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
})

const p = (...children: LexicalNode[]): ParagraphNode => ({
  type: 'paragraph',
  version: 1,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
})

const h2 = (...children: LexicalNode[]): HeadingNode => ({
  type: 'heading',
  version: 1,
  tag: 'h2',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
})

const h3 = (...children: LexicalNode[]): HeadingNode => ({
  type: 'heading',
  version: 1,
  tag: 'h3',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
})

const li = (value: number, ...children: LexicalNode[]): ListItemNode => ({
  type: 'listitem',
  version: 1,
  value,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  checked: undefined,
})

const ul = (...items: ListItemNode[]): ListNode => ({
  type: 'list',
  version: 1,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items,
  direction: 'ltr',
  format: '',
  indent: 0,
})

const quote = (...children: LexicalNode[]): QuoteNode => ({
  type: 'quote',
  version: 1,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
})

const lexical = (children: LexicalNode[]) => ({
  root: {
    type: 'root',
    version: 1,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
  },
})

// Text format constants
const BOLD = 1
const ITALIC = 2

// ─── Article content ──────────────────────────────────────────────────────────

const gaslightingContent = lexical([
  p(
    t('«Das habe ich nie so gesagt.» «Du übertreibst mal wieder.» «Du bist zu empfindlich.» — Wer diese Sätze regelmässig zu hören bekommt, kennt vielleicht das Gefühl, das sich danach einstellt: eine seltsame Leere, ein leises Zweifeln an sich selbst. Man sucht in der Erinnerung nach dem, was wirklich passiert ist — und findet keinen festen Boden mehr.'),
  ),
  p(
    t('Dieses Phänomen hat einen Namen: Gaslighting. Und es ist eine der subtilsten, wirkungsvollsten Formen psychischer Manipulation.'),
  ),
  h2(t('Was ist Gaslighting?')),
  p(
    t('Der Begriff stammt aus dem Theaterstück «Gas Light» (1938) und dem gleichnamigen Film von 1944: Ein Ehemann manipuliert systematisch das Gasleuchten-System im Haus und leugnet danach, dass sich die Lichter verändert haben — bis seine Frau beginnt, an ihrer eigenen Wahrnehmung zu zweifeln.'),
  ),
  p(
    t('Im psychologischen Sinne bezeichnet Gaslighting ein Verhaltensmuster, bei dem eine Person die subjektive Realität einer anderen systematisch in Frage stellt, verzerrt oder umschreibt. Das Ziel — ob bewusst oder unbewusst angestrebt — ist Kontrolle: Der Betroffene wird abhängig von der Perspektive des Manipulators, verliert das Vertrauen in die eigene Urteilsfähigkeit.'),
  ),
  quote(
    t('«Gaslighting funktioniert nicht durch einen einzigen grossen Lügen-Moment. Es ist der langsame, tropfende Prozess, der die Wahrnehmung aushöhlt — so langsam, dass man nicht merkt, wann es begonnen hat.»', ITALIC),
    t(' — Thomas Meier'),
  ),
  h2(t('Typische Muster')),
  p(t('Gaslighting kommt in vielen Formen vor. Diese Aussagen oder Verhaltensweisen sind häufige Erkennungszeichen:')),
  ul(
    li(1, t('Leugnen von Fakten:', BOLD), t(' «Das habe ich nie gesagt / Das ist nie passiert.»')),
    li(2, t('Umdeutung von Ereignissen:', BOLD), t(' «Du hast das völlig falsch verstanden. Ich habe das doch nur gut gemeint.»')),
    li(3, t('Verharmlosung:', BOLD), t(' «Du bist zu empfindlich / Du machst aus einer Mücke einen Elefanten.»')),
    li(4, t('Täter-Opfer-Umkehr:', BOLD), t(' «Jetzt tust du mir leid — ich bin derjenige, der hier verletzt wird.»')),
    li(5, t('Soziale Isolation:', BOLD), t(' «Deine Freunde sehen auch, dass du dir das einbildest.»')),
    li(6, t('Zweifel an der Erinnerung:', BOLD), t(' «Dein Gedächtnis war schon immer schlecht.»')),
  ),
  h2(t('Warum es so schwer zu erkennen ist')),
  p(
    t('Gaslighting funktioniert gerade deshalb so effektiv, weil es selten offen aggressiv auftritt. Die Manipulation geschieht in kleinen, alltäglichen Momenten — in einem Ton, einer Geste, einem Blick, einer Korrektur. Einzeln wirkt jede Situation vielleicht unbedeutend. Die kumulative Wirkung aber ist gravierend.'),
  ),
  p(
    t('Hinzu kommt: Die meisten Menschen, die Gaslighting erleben, lieben die Person, die sie manipuliert. Es handelt sich nicht um einen Fremden, sondern um jemanden, dem man vertraut hat — einen Partner, ein Elternteil, eine Vertrauensperson in einer Gemeinschaft. Das macht das Zweifeln an dieser Person schwerer als das Zweifeln an sich selbst.'),
  ),
  h3(t('Das «Nebel»-Gefühl')),
  p(
    t('Viele Betroffene beschreiben einen Zustand, den manche Fachleute als «Gaslighting-Nebel» bezeichnen: eine anhaltende Erschöpfung, Desorientierung, das Gefühl, nicht mehr klar denken zu können. Man beginnt, vor Konflikten zu kapitulieren — nicht weil man keine Meinung mehr hat, sondern weil man ihr nicht mehr traut.'),
  ),
  h2(t('Was passiert im Inneren')),
  p(
    t('Auf neurologischer Ebene ist Gaslighting ein chronischer Stressor. Der Körper befindet sich dauerhaft in einem Zustand erhöhter Wachsamkeit. Das limbische System, das Emotionen verarbeitet, ist ständig aktiviert; gleichzeitig wird die kognitive Funktion des präfrontalen Kortex beeinträchtigt — also genau jener Teil des Gehirns, der kritisches Denken ermöglicht.'),
  ),
  p(
    t('Das Ergebnis ist ein Teufelskreis: Die Person ist erschöpft, kann weniger klar denken — und ist dadurch noch anfälliger für weitere Manipulation.'),
  ),
  h2(t('Erste Schritte zurück zu sich')),
  p(
    t('Der Weg aus dem Gaslighting beginnt meistens mit einer einfachen, aber entscheidenden Erkenntnis: '),
    t('Meine Wahrnehmung ist real.', ITALIC),
  ),
  ul(
    li(1, t('Dokumentieren:', BOLD), t(' Ein privates Tagebuch führen — schreibe auf, was passiert ist, direkt danach. Nicht um Beweise zu sammeln, sondern um einen Anker in der Realität zu haben.')),
    li(2, t('Vertrauen suchen:', BOLD), t(' Eine Person ausserhalb der Beziehung finden, der man sich anvertrauen kann. Isolation ist ein Werkzeug der Manipulation — Verbindung ist das Gegenmittel.')),
    li(3, t('Validierung zulassen:', BOLD), t(' Wenn jemand sagt «Das klingt wirklich schwierig», nicht sofort abwehren oder relativieren. Es darf wahr sein, was man erlebt.')),
    li(4, t('Professionelle Unterstützung:', BOLD), t(' Therapeutische Begleitung kann helfen, das eigene Erleben zu sortieren und die eigene Urteilsfähigkeit wiederzufinden — frei von dem ständigen «Aber vielleicht habe ich das falsch eingeschätzt?»')),
  ),
])

const gaslightingHinweis = lexical([
  p(
    t('Wenn du erkennst, dass du Gaslighting in einer Beziehung erlebst oder erlebt hast, bist du nicht allein — und du brauchst nicht allein damit umzugehen. infoSekta bietet kostenlose, vertrauliche Beratung für Betroffene von psychischer Manipulation in Beziehungen und Gruppen (Tel. 044 204 00 64).'),
  ),
  p(
    t('Gegenwind ist kein Ersatz für professionelle Beratung oder Psychotherapie. Bei akuten Belastungen: Die Dargebotene Hand (143) ist rund um die Uhr erreichbar.'),
  ),
])

const loveBombingContent = lexical([
  p(
    t('Es beginnt so schön. Du triffst jemanden, der dich von Anfang an wie niemanden sonst behandelt. Tägliche Nachrichten, unerwartete Gesten, Sätze wie «Ich habe so lange auf jemanden wie dich gewartet» — nach wenigen Wochen. Das Tempo ist atemberaubend. Du fühlst dich gesehen, besonders, endlich wirklich angekommen.'),
  ),
  p(t('Was sich wie eine Traumbeziehung anfühlt, trägt manchmal einen anderen Namen: Love Bombing.')),
  h2(t('Was bedeutet Love Bombing?')),
  p(
    t('Love Bombing bezeichnet ein Verhaltensmuster, bei dem jemand — oft mit narzisstischen Zügen — eine andere Person zu Beginn einer Beziehung mit überwältigender Aufmerksamkeit, Zuneigung und Idealisierung «bombardiert». Das Ziel ist die schnelle Herstellung emotionaler Abhängigkeit.'),
  ),
  p(
    t('Der Begriff stammt ursprünglich aus der Beobachtung sektenhafter Gruppen, die Neumitglieder mit exzessiver Wärme empfangen, um sie schnell einzubinden. In zwischenmenschlichen Beziehungen funktioniert das gleiche Prinzip: Die Intensität der frühen Phase soll Bindung schaffen, bevor die Person die andere wirklich kennt.'),
  ),
  quote(
    t('«Liebe, die sich anfühlt wie Sauerstoff nach langem Atemnot — das ist meistens kein Zufall. Jemand hat dein Bedürfnis gesehen und es für sich genutzt.»', ITALIC),
    t(' — Thomas Meier'),
  ),
  h2(t('Erkennungszeichen')),
  p(t('Die Grenze zwischen echtem Liebesüberschwang und Love Bombing ist nicht immer eindeutig. Diese Muster geben aber Hinweise:')),
  ul(
    li(1, t('Überwältigende Intensität von Anfang an:', BOLD), t(' Ständige Kontaktaufnahme, Liebeserklärungen nach wenigen Tagen, Gespräche über gemeinsame Zukunftspläne zu einem Zeitpunkt, wo man sich kaum kennt.')),
    li(2, t('Idealisierung ohne Grundlage:', BOLD), t(' «Du bist anders als alle anderen», «Ich habe so jemanden noch nie getroffen» — ohne dass die Person dich wirklich kennt.')),
    li(3, t('Druck durch Erwartungen:', BOLD), t(' Das Gefühl, dass die Intensität der Zuneigung eine Gegenseitigkeit verlangt, die man vielleicht noch nicht fühlt — aber zu fühlen versucht.')),
    li(4, t('Isolation:', BOLD), t(' Subtile Kommentare, die deine anderen Beziehungen kleiner machen, oder die Erwartung, dass du deine Zeit fast ausschliesslich mit dieser Person verbringst.')),
    li(5, t('Abrupter Wechsel nach der «Bonding»-Phase:', BOLD), t(' Die Intensität lässt nach, sobald emotionale Bindung entstanden ist. Die Reaktion auf kleinste Enttäuschungen kann plötzlich unverhältnismässig stark sein.')),
  ),
  h2(t('Warum es so schwer zu erkennen ist')),
  p(
    t('Love Bombing fühlt sich nicht schlecht an. Das ist sein Wesen. Wer von Klein auf gelernt hat, dass Liebe mit Bedingungen verknüpft ist, wer sich nach echter Anerkennung gesehnt hat — für den kann diese Intensität wie das Erfüllen eines tiefen Bedürfnisses wirken.'),
  ),
  p(
    t('Dazu kommt: Unsere Kultur romantisiert Intensität. «Liebe auf den ersten Blick», Leidenschaft, Überwältigung — das sind Ideale aus Filmen und Liedern. Dass echte gesunde Bindung meistens langsamer wächst, ruhiger ist, sich nach Sicherheit anfühlt statt nach Rausch — das wird selten gezeigt.'),
  ),
  h3(t('Der Wendepunkt')),
  p(
    t('Love Bombing ist keine stabile Strategie. Irgendwann kommt der Moment, an dem die Idealisierung kippt — meistens dann, wenn die Zielperson eine Enttäuschung darstellt, eine eigene Meinung äussert oder eigene Grenzen setzt. Was folgt, ist oft ein abrupter Wechsel: Kälte, Kritik, Rückzug. Der Kontrast ist erschütternd — und erzeugt genau den Schmerz, der die Abhängigkeit verfestigt: Man will das erste Gefühl zurück.'),
  ),
  h2(t('Was hilft')),
  p(
    t('Wenn du Love Bombing in einer vergangenen oder aktuellen Beziehung erkennst, ist das kein Zeichen für deine Naivität. Es ist ein Hinweis auf ein manipulatives Verhalten der anderen Person — und auf ein System, das ausgenutzt hat, was dir wichtig ist.'),
  ),
  ul(
    li(1, t('Tempo bewusst wahrnehmen:', BOLD), t(' Echte Verbindung braucht Zeit. Wenn sich alles sehr schnell anfühlt, ist es erlaubt — und sinnvoll — innezuhalten und zu fragen: Kenne ich diese Person wirklich?')),
    li(2, t('Auf das Bauchgefühl hören:', BOLD), t(' Wenn die Intensität erschöpfend wirkt, auch wenn sie sich schön anfühlt — das ist eine Information.')),
    li(3, t('Unterstützung suchen:', BOLD), t(' Mit einer Person ausserhalb der Beziehung sprechen, die eine unvoreingenommene Perspektive einbringen kann.')),
    li(4, t('Therapeutische Begleitung:', BOLD), t(' Wenn Love Bombing ein Muster in mehreren Beziehungen ist, kann es helfen zu verstehen, welche eigenen Bedürfnisse angesprochen werden — und wie man sie auf gesündere Weise erfüllen kann.')),
  ),
])

const loveBombingHinweis = lexical([
  p(
    t('Love Bombing ist ein frühes Warnsignal für emotionalen Missbrauch. Wenn du dich in einer solchen Situation befindest oder befunden hast, bietet infoSekta kostenlose, vertrauliche Beratung an (Tel. 044 204 00 64).'),
  ),
  p(
    t('Gegenwind ersetzt keine professionelle Beratung. In akuten Situationen: Dargebotene Hand (143), täglich rund um die Uhr.'),
  ),
])

const sektenhafteContent = lexical([
  p(
    t('Kaum jemand tritt einer Gruppe bei und denkt: «Das ist eine Sekte.» Der Einstieg fühlt sich oft wie das Gegenteil an — wie Heimkommen. Eine Gemeinschaft, die einen sieht, versteht, willkommen heisst. Antworten auf Fragen, die man schon lange mit sich trägt. Das Gefühl von Sinn.'),
  ),
  p(t('Genau das macht sektenhafte Gruppierungen so schwer greifbar — und so gefährlich.')),
  h2(t('Was macht eine Gruppe «sektenhaft»?')),
  p(
    t('Der Begriff «Sekte» ist im Volksmund oft mit religiösem Extremismus verbunden. Das ist eine zu enge Lesart. Sektenhafte Strukturen finden sich in spirituellen Gemeinschaften, in Therapie- und Coachingszenen, in politischen Bewegungen, in Online-Communities, in Selbsthilfe- und Persönlichkeitsentwicklungsgruppen.'),
  ),
  p(
    t('Das entscheidende Merkmal ist nicht der Inhalt, sondern die Struktur. Sozialpsychologin Alexandra Stein und andere Forscher haben beschrieben, was sektenhafte Gruppen trotz aller inhaltlichen Unterschiede gemeinsam haben:'),
  ),
  ul(
    li(1, t('Totale Ideologie:', BOLD), t(' Eine umfassende Welterklärung, die für alles eine Antwort hat — und die Welt in «uns» und «die anderen» einteilt.')),
    li(2, t('Autoritäre Führung:', BOLD), t(' Eine Person oder ein innerer Kreis, die nicht hinterfragt werden darf. Kritik gilt als Verrat, Illoyalität oder spirituelles Versagen.')),
    li(3, t('Kontrolle durch Gemeinschaft:', BOLD), t(' Die Gruppe selbst übernimmt die soziale Kontrolle. Mitglieder überwachen einander; Anpassung wird belohnt, Abweichung bestraft.')),
    li(4, t('Isolation:', BOLD), t(' Beziehungen ausserhalb der Gruppe werden systematisch entwertet oder abgebaut.')),
    li(5, t('Ausbeutung:', BOLD), t(' Zeit, Geld, emotionale Ressourcen fliessen in die Gruppe — oft ohne angemessene Gegenleistung.')),
  ),
  h2(t('Das Modell der «totalen Bindung»')),
  p(
    t('Bindungstheoretisch gesehen schaffen sektenhafte Gruppen eine Form desorganisierter Bindung: Der Anführer oder die Gruppe ist gleichzeitig Quelle von Sicherheit '),
    t('und', ITALIC),
    t(' Quelle von Bedrohung. Der Betroffene kann weder näherkommen noch weggehen — er erstarrt.'),
  ),
  quote(
    t('«Sektenhafte Gruppen sind so gefährlich, weil sie echte menschliche Bedürfnisse nutzen — Zugehörigkeit, Sinn, Gemeinschaft — und sie in ein Kontrollsystem einbauen.»', ITALIC),
    t(' — Thomas Meier'),
  ),
  p(
    t('Dieser Mechanismus erklärt, warum es so schwer ist, eine solche Gruppe zu verlassen, selbst wenn man rational weiss, dass etwas nicht stimmt. Die Bindung ist real — und die Verlustangst, die entsteht, wenn man geht, ebenfalls.'),
  ),
  h2(t('Wer ist besonders vulnerabel?')),
  p(
    t('Die Frage «Wie kann man so naiv sein?» geht am Kern vorbei. Sektenhafte Gruppen zielen nicht auf Naivität. Sie zielen auf Bedürfnisse — und diese sind menschlich, nicht dumm.'),
  ),
  ul(
    li(1, t('Menschen in Lebensphasen der Orientierungslosigkeit (Trauer, Scheidung, Jobverlust, Auszug von zu Hause)')),
    li(2, t('Menschen mit tief verwurzeltem Bedürfnis nach Gemeinschaft und Zugehörigkeit')),
    li(3, t('Menschen, die spirituelle oder philosophische Antworten suchen')),
    li(4, t('Menschen, die als Kinder in Umgebungen aufgewachsen sind, in denen unsichere Bindung normal war')),
  ),
  p(
    t('Das heisst nicht, dass andere nicht betroffen sein können. Untersuchungen zeigen, dass Bildungsgrad, Intelligenz und kritisches Denken keinen zuverlässigen Schutz bieten. Im Gegenteil: Hochgebildete Menschen sind oft besonders anfällig für elaborierte ideologische Systeme, weil sie die intellektuelle Komplexität als Qualitätsmerkmal interpretieren.'),
  ),
  h2(t('Frühe Warnsignale')),
  p(
    t('Sektenhafte Gruppen zeigen selten sofort ihr ganzes Gesicht. Der Einstieg ist warm, inklusiv, inspirierend. Erst im Verlauf — oft über Monate oder Jahre — manifestieren sich die Kontrollmechanismen. Dennoch gibt es frühe Signale:'),
  ),
  ul(
    li(1, t('Die Gruppe beansprucht exklusiven Zugang zur Wahrheit oder hat eine «besondere Mission»')),
    li(2, t('Mitglieder ausserhalb des eigenen sozialen Umfelds werden als «nicht verständnisvoll» oder «noch nicht so weit» beschrieben')),
    li(3, t('Es gibt impliziten oder expliziten Druck, mehr Zeit, Geld oder Energie zu investieren')),
    li(4, t('Kritische Fragen werden umgedeutet als Zeichen persönlicher Unzulänglichkeit («Du blockierst dich selbst»)')),
    li(5, t('Der Austritt aus der Gruppe wird als drastischer Schritt dargestellt — mit Konsequenzen für Beziehungen innerhalb der Gruppe')),
  ),
  h2(t('Was nach dem Austritt passiert')),
  p(
    t('Der Austritt aus einer sektenhaften Gruppe ist selten ein Moment der Befreiung — zumindest nicht sofort. Viele Betroffene berichten von einer tiefen Orientierungslosigkeit. Die Welterklärung, die alles geordnet hat, fällt weg. Das soziale Netz, das mit der Gruppe entstanden ist, bricht zusammen. Was bleibt, ist oft eine spezifische Form der Trauer: Man trauert um etwas, das es in der Form nie wirklich gegeben hat.'),
  ),
  p(
    t('Hinzu kommt: Sektenhafte Erfahrungen hinterlassen oft Scham. «Wie konnte ich darauf hereinfallen?» — Eine Frage, die die Verarbeitung erschwert, weil sie die Energie in Selbstkritik lenkt, statt in Verstehen.'),
  ),
  h3(t('Professionelle Begleitung')),
  p(
    t('Die Verarbeitung einer sektenhaften Erfahrung braucht Zeit und oft fachkundige Begleitung. Nicht jede Therapieform ist hilfreich; wichtig ist, mit jemandem zu arbeiten, der das Thema kennt und keine erneuten Abhängigkeitsmuster schafft.'),
  ),
])

const sektenhafteHinweis = lexical([
  p(
    t('infoSekta ist die Schweizer Fachstelle zu Sektenfragen und bietet kostenlose, vertrauliche Beratung für Betroffene, Angehörige und Fachpersonen (Tel. 044 204 00 64). Die Beratung ist auch für Menschen, die sich «nicht sicher sind» — ein Verdacht ist genug, um anzurufen.'),
  ),
  p(t('Gegenwind ist kein Ersatz für professionelle Beratung oder Psychotherapie.')),
])

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Gegenwind Seed — Start')

  // ── 1. Admin-User ───────────────────────────────────────────────────────────
  console.log('  → Erstelle Admin-User Thomas Meier…')
  let thomas: { id: string | number }
  try {
    thomas = await payload.create({
      collection: 'users',
      data: {
        name: 'Thomas Meier',
        email: 'thomas@gegenwind.ch',
        password: 'Gegenwind2026!',
        role: 'admin',
      },
    })
    console.log(`     ✓ User erstellt (id: ${thomas.id})`)
  } catch {
    console.log('     ⚡ User existiert bereits — lade ID…')
    const existing = await payload.find({ collection: 'users', where: { email: { equals: 'thomas@gegenwind.ch' } } })
    thomas = existing.docs[0] as { id: string | number }
  }

  // ── 2. Blog-Artikel ─────────────────────────────────────────────────────────
  console.log('  → Erstelle Blog-Artikel…')

  let gaslighting: { id: string | number }
  let loveBombing: { id: string | number }
  let sektenhafte: { id: string | number }

  try {
    gaslighting = await payload.create({
      collection: 'articles',
      data: {
        title: 'Gaslighting erkennen: Wenn die eigene Wahrnehmung zum Feind wird',
        slug: 'gaslighting-erkennen',
        kategorie: 'narzissmus',
        publishedAt: '2026-03-14T00:00:00.000Z',
        readingTime: 8,
        description:
          'Gaslighting ist eine Form psychischer Manipulation, die systematisch das Vertrauen in die eigene Wahrnehmung untergräbt. Was steckt dahinter — und wie kommt man wieder zu sich?',
        content: gaslightingContent,
        hinweisBox: {
          eyebrow: 'Weitere Unterstützung',
          text: gaslightingHinweis,
        },
      },
    })
    console.log(`     ✓ Gaslighting-Artikel erstellt (id: ${gaslighting.id})`)
  } catch {
    console.log('     ⚡ Gaslighting-Artikel existiert bereits — lade ID…')
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: 'gaslighting-erkennen' } } })
    gaslighting = existing.docs[0] as { id: string | number }
  }

  try {
    loveBombing = await payload.create({
      collection: 'articles',
      data: {
        title: 'Love Bombing: Wenn überwältigende Zuneigung zur Falle wird',
        slug: 'love-bombing',
        kategorie: 'narzissmus',
        publishedAt: '2026-03-22T00:00:00.000Z',
        readingTime: 6,
        description:
          'Love Bombing: Warum überwältigende Zuneigung zu Beginn einer Beziehung ein Warnsignal sein kann — und wie man das Muster erkennt.',
        content: loveBombingContent,
        hinweisBox: {
          eyebrow: 'Weitere Unterstützung',
          text: loveBombingHinweis,
        },
      },
    })
    console.log(`     ✓ Love-Bombing-Artikel erstellt (id: ${loveBombing.id})`)
  } catch {
    console.log('     ⚡ Love-Bombing-Artikel existiert bereits — lade ID…')
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: 'love-bombing' } } })
    loveBombing = existing.docs[0] as { id: string | number }
  }

  try {
    sektenhafte = await payload.create({
      collection: 'articles',
      data: {
        title: 'Sektenhafte Gruppen heute: Wie sie funktionieren und wen sie anziehen',
        slug: 'sektenhafte-gruppen-heute',
        kategorie: 'sektenhafte-gruppierungen',
        publishedAt: '2026-04-05T00:00:00.000Z',
        readingTime: 10,
        description:
          'Sektenhafte Strukturen existieren weit jenseits klassischer Religionsgemeinschaften. Was macht eine Gruppe sektenhaft — und warum ist es so schwer, das rechtzeitig zu erkennen?',
        content: sektenhafteContent,
        hinweisBox: {
          eyebrow: 'Fachberatung',
          text: sektenhafteHinweis,
        },
      },
    })
    console.log(`     ✓ Sektenhafte-Gruppen-Artikel erstellt (id: ${sektenhafte.id})`)
  } catch {
    console.log('     ⚡ Sektenhafte-Gruppen-Artikel existiert bereits — lade ID…')
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: 'sektenhafte-gruppen-heute' } } })
    sektenhafte = existing.docs[0] as { id: string | number }
  }

  // ── 3. Verwandte Artikel setzen ─────────────────────────────────────────────
  console.log('  → Setze verwandte Artikel…')
  await payload.update({
    collection: 'articles',
    id: gaslighting.id,
    data: { relatedArticles: [loveBombing.id, sektenhafte.id] },
  })
  await payload.update({
    collection: 'articles',
    id: loveBombing.id,
    data: { relatedArticles: [gaslighting.id, sektenhafte.id] },
  })
  await payload.update({
    collection: 'articles',
    id: sektenhafte.id,
    data: { relatedArticles: [gaslighting.id, loveBombing.id] },
  })
  console.log('     ✓ Verwandte Artikel verknüpft')

  // ── 4. Homepage ─────────────────────────────────────────────────────────────
  console.log('  → Erstelle Homepage…')
  const homepageBlocks = [
    {
      blockType: 'hero',
      eyebrow: 'Gegenwind',
      heading: 'Orientierung finden,\nwenn alles dreht.',
      lede: 'Eine Plattform für Menschen, die psychische Manipulation erlebt haben — in Beziehungen, Gruppen oder spirituellen Gemeinschaften. Sachlich. Ehrlich. Ohne Vereinfachungen.',
      primaryCta: { text: 'Themen entdecken', href: '#themen' },
      secondaryCta: { text: 'Zum Blog', href: '/blog' },
    },
    {
      blockType: 'willkommen',
      eyebrow: 'Willkommen',
      heading: 'Hier darf es kompliziert sein.',
      body: lexical([
        p(
          t('Wer psychische Manipulation erlebt hat — ob in einer Partnerschaft, einer spirituellen Gemeinschaft oder einer Gruppe — trägt oft Fragen mit sich, für die es keine einfachen Antworten gibt. Gegenwind ist ein Ort, an dem diese Komplexität nicht wegerklärt wird.'),
        ),
        p(
          t('Die Inhalte hier entstehen aus dem Wunsch heraus, Betroffenen verlässliche Orientierung zu geben: Was ist eigentlich passiert? Wie erkenne ich Manipulationsmuster? Was hilft wirklich — und was sind leere Versprechen?'),
        ),
      ]),
      statement: 'Gegenwind ist kein Therapieangebot und kein Ersatz für professionelle Beratung. Aber ein ehrlicher Startpunkt.',
    },
    {
      blockType: 'themen',
      eyebrow: 'Schwerpunkte',
      heading: 'Drei Themen.\nEin gemeinsamer Kern.',
      items: [
        {
          eyebrow: '01 — Narzissmus',
          heading: 'Narzisstische Dynamiken',
          description:
            'Narzissmus ist kein Schimpfwort, sondern ein Persönlichkeitsmuster mit spezifischen Verhaltensweisen. Was steckt dahinter — und wie verändert es Beziehungen?',
          linkText: 'Blog: Narzissmus',
          linkHref: '/blog?kategorie=narzissmus',
        },
        {
          eyebrow: '02 — Spiritueller Missbrauch',
          heading: 'Spiritueller Missbrauch',
          description:
            'Wenn spirituelle oder religiöse Kontexte genutzt werden, um Kontrolle auszuüben, Kritik zu unterdrücken oder Menschen von aussen zu isolieren.',
          linkText: 'Blog: Spiritueller Missbrauch',
          linkHref: '/blog?kategorie=spiritueller-missbrauch',
        },
        {
          eyebrow: '03 — Sektenhafte Gruppen',
          heading: 'Sektenhafte Gruppen',
          description:
            'Sektenhafte Strukturen existieren weit jenseits klassischer Religionsgemeinschaften — in Coaching-Szenen, Online-Communities und Therapiegruppen.',
          linkText: 'Blog: Sektenhafte Gruppen',
          linkHref: '/blog?kategorie=sektenhafte-gruppierungen',
        },
      ],
    },
    {
      blockType: 'ueber',
      eyebrow: 'Über mich',
      heading: 'Thomas Meier',
      portraitAlt: 'Thomas Meier',
      body: lexical([
        p(
          t('Ich beschäftige mich seit Jahren mit den psychologischen Mechanismen hinter Manipulation, Kontrolle und Ausbeutung in menschlichen Beziehungen und Gemeinschaften — als Betroffener, als Angehöriger und als jemand, der versucht hat, die Muster zu verstehen.'),
        ),
        p(
          t('Gegenwind ist mein Versuch, das Wissen, das mir geholfen hat, zugänglich zu machen — ohne Vereinfachungen, ohne Heilsversprechen, ohne neue Abhängigkeiten zu schaffen.'),
        ),
        p(
          t('Ich bin kein Therapeut und kein Psychologe. Ich bin jemand, der sich intensiv mit diesen Themen auseinandergesetzt hat und weiss, wie schwer es ist, in diesem Terrain verlässliche Orientierung zu finden.'),
        ),
      ]),
      disclaimer: {
        text: 'Gegenwind ist kein Therapieangebot. Bei akuten Belastungen bitte professionelle Unterstützung suchen.',
        linkText: 'infoSekta',
        linkHref: 'https://www.infosekta.ch',
      },
    },
    {
      blockType: 'blog-preview',
      eyebrow: 'Aus dem Blog',
      heading: 'Aktuelle Beiträge',
      articles: [gaslighting.id, loveBombing.id, sektenhafte.id],
      viewAllText: 'Alle Artikel',
      viewAllHref: '/blog',
    },
    {
      blockType: 'buecher',
      eyebrow: 'Literatur',
      heading: 'Bücher, die ich empfehle.',
      items: [
        {
          title: 'Zersetzt',
          authorMeta: 'Dorothea Zimmermann · Scorpio Verlag',
          linkText: 'Bei Buch.ch suchen →',
          linkHref: 'https://www.buch.ch',
        },
        {
          title: 'Terror, Love and Brainwashing',
          authorMeta: 'Alexandra Stein · Routledge',
          linkText: 'Bei Buch.ch suchen →',
          linkHref: 'https://www.buch.ch',
        },
        {
          title: 'Menschen, die manipulieren',
          authorMeta: 'Simon Crompton · mvg Verlag',
          linkText: 'Bei Buch.ch suchen →',
          linkHref: 'https://www.buch.ch',
        },
        {
          title: 'Psychologische Kriegsführung',
          authorMeta: 'Robert Cialdini · Heyne Verlag',
          linkText: 'Bei Buch.ch suchen →',
          linkHref: 'https://www.buch.ch',
        },
      ],
    },
    {
      blockType: 'infosekta',
      eyebrow: 'Fachberatung',
      heading: 'infoSekta',
      body: 'infoSekta ist die Schweizer Fachstelle zu Sektenfragen. Sie bietet kostenlose, vertrauliche Beratung für Betroffene, Angehörige und Fachpersonen — zu sektenhaften Gruppen, spirituellem Missbrauch und psychischer Manipulation in Gemeinschaften.',
      ctaText: 'infosekta.ch aufrufen →',
      ctaHref: 'https://www.infosekta.ch',
    },
    {
      blockType: 'kontakt',
      eyebrow: 'Kontakt',
      heading: 'Schreib mir.',
      intro:
        'Du hast Fragen zu einem Artikel, möchtest etwas ergänzen oder hast selbst eine Geschichte, die du teilen möchtest? Ich lese jede Nachricht — und antworte, wenn ich kann.',
      whisper: 'Gegenwind ist kein Krisentelefon und kann keine Sofortberatung anbieten. Für akute Notlagen bitte die Dargebotene Hand (Tel. 143) oder infoSekta (Tel. 044 204 00 64) kontaktieren.',
      confirmationTitle: 'Nachricht erhalten.',
      confirmationBody: 'Danke für deine Nachricht. Ich melde mich, sobald ich kann — meistens innerhalb weniger Tage.',
    },
  ]

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Homepage',
        slug: 'home',
        layout: homepageBlocks,
        seo: {
          title: 'Gegenwind — Orientierung bei Narzissmus & Manipulation',
          description:
            'Eine Plattform für Menschen, die psychische Manipulation erlebt haben. Sachlich. Ehrlich. Ohne Vereinfachungen.',
        },
      },
    })
    console.log('     ✓ Homepage erstellt')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('duplicate') || msg.includes('unique') || msg.includes('UNIQUE')) {
      console.log('     ⚡ Homepage existiert bereits — überspringe')
    } else {
      console.error('     ✗ Homepage-Fehler:', msg)
    }
  }

  // ── 5. Impressum ────────────────────────────────────────────────────────────
  console.log('  → Erstelle Impressum…')
  const impressumContent = lexical([
    h2(t('Impressum')),
    p(t('Angaben gemäss Art. 3 UWG (Schweiz)')),
    h3(t('Verantwortlich für diesen Auftritt')),
    p(t('Thomas Meier')),
    p(t('[Strasse und Hausnummer]')),
    p(t('[PLZ] Zürich')),
    p(t('Schweiz')),
    h3(t('Kontakt')),
    p(t('E-Mail: kontakt@gegenwind.ch')),
    h3(t('Haftungsausschluss')),
    p(
      t('Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Die Inhalte auf gegenwind.ch sind ausschliesslich zu Informationszwecken bestimmt und ersetzen keine professionelle medizinische, psychologische oder rechtliche Beratung.'),
    ),
    h3(t('Keine Haftung für externe Links')),
    p(
      t('Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.'),
    ),
    h3(t('Urheberrecht')),
    p(
      t('Die auf dieser Website veröffentlichten Inhalte (Texte, Grafiken, Logos) unterliegen dem schweizerischen Urheberrecht. Eine Vervielfältigung, Verarbeitung, Verbreitung oder jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors.'),
    ),
  ])

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Impressum',
        slug: 'impressum',
        layout: [{ blockType: 'legal-content', content: impressumContent }],
        seo: { title: 'Impressum — Gegenwind', noIndex: true },
      },
    })
    console.log('     ✓ Impressum erstellt')
  } catch {
    console.log('     ⚡ Impressum existiert bereits — überspringe')
  }

  // ── 6. Datenschutz ──────────────────────────────────────────────────────────
  console.log('  → Erstelle Datenschutzerklärung…')
  const datenschutzContent = lexical([
    h2(t('Datenschutzerklärung')),
    p(t('Stand: April 2026 — Gültig für gegenwind.ch')),
    h3(t('1. Verantwortliche Stelle')),
    p(
      t('Verantwortlich für die Datenbearbeitung auf dieser Website ist Thomas Meier, Zürich, kontakt@gegenwind.ch. Diese Datenschutzerklärung gilt für die Website gegenwind.ch und richtet sich nach dem Schweizer Datenschutzgesetz (nDSG) sowie der EU-Datenschutz-Grundverordnung (DSGVO) für Nutzer aus dem EU/EWR-Raum.'),
    ),
    h3(t('2. Hosting')),
    p(
      t('Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA gehostet. Vercel verarbeitet Serverprotokolle, die IP-Adresse, Browser-Typ, aufgerufene Seiten und Zeitstempel enthalten können. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb). Vercel ist nach dem EU-US Data Privacy Framework zertifiziert.'),
    ),
    h3(t('3. Websiteanalyse (Plausible)')),
    p(
      t('Diese Website nutzt Plausible Analytics, ein datenschutzfreundliches Analyse-Tool ohne Cookies. Es werden keine personenbezogenen Daten gespeichert und kein Tracking über Websites hinweg durchgeführt. Die gesammelten Daten (Seitenaufrufe, Verweisquellen, Gerätekategorien) sind anonymisiert und werden auf Servern in der EU verarbeitet.'),
    ),
    h3(t('4. Kontaktformular')),
    p(
      t('Wenn du das Kontaktformular verwendest, werden dein Name, deine E-Mail-Adresse und deine Nachricht über Resend Inc. (548 Market St, PMB 72529, San Francisco, CA 94104) verarbeitet und an kontakt@gegenwind.ch weitergeleitet. Die Daten werden ausschliesslich zur Bearbeitung deiner Anfrage verwendet und danach gelöscht.'),
    ),
    h3(t('5. Deine Rechte')),
    p(
      t('Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Wende dich dazu an kontakt@gegenwind.ch. Du hast ausserdem das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen.'),
    ),
    h3(t('6. Änderungen dieser Datenschutzerklärung')),
    p(
      t('Diese Datenschutzerklärung kann jederzeit angepasst werden. Die aktuelle Version ist stets unter gegenwind.ch/datenschutz abrufbar.'),
    ),
  ])

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Datenschutzerklärung',
        slug: 'datenschutz',
        layout: [{ blockType: 'legal-content', content: datenschutzContent }],
        seo: { title: 'Datenschutz — Gegenwind', noIndex: true },
      },
    })
    console.log('     ✓ Datenschutzerklärung erstellt')
  } catch {
    console.log('     ⚡ Datenschutzerklärung existiert bereits — überspringe')
  }

  // ── 7. SiteSettings Global ──────────────────────────────────────────────────
  console.log('  → Aktualisiere SiteSettings…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      tagline: 'Kurs halten, wenn der Wind dreht.',
      copyright: '© 2026 Gegenwind · Zürich',
      contactEmail: 'kontakt@gegenwind.ch',
      navLinks: [
        { label: 'Themen', href: '/#themen' },
        { label: 'Über mich', href: '/#ueber' },
        { label: 'Blog', href: '/blog' },
        { label: 'Bücher', href: '/#buecher' },
        { label: 'Kontakt', href: '/#kontakt' },
      ],
      footerNavLinks: [
        { label: 'Themen', href: '/#themen' },
        { label: 'Blog', href: '/blog' },
        { label: 'Bücher', href: '/#buecher' },
        { label: 'Kontakt', href: '/#kontakt' },
      ],
      footerLegalLinks: [
        { label: 'Impressum', href: '/impressum', isExternal: false },
        { label: 'Datenschutz', href: '/datenschutz', isExternal: false },
        { label: 'infoSekta', href: 'https://www.infosekta.ch', isExternal: true },
      ],
      seoDefaults: {
        siteName: 'Gegenwind',
        defaultDescription:
          'Eine Plattform für Betroffene und Angehörige von Narzissmus, spirituellem Missbrauch und sektenhaften Gruppierungen in der Schweiz.',
      },
    },
  })
  console.log('     ✓ SiteSettings gesetzt')

  console.log('\n✅ Seed abgeschlossen.')
  console.log('   Admin-Login: thomas@gegenwind.ch / Gegenwind2026!')
  console.log('   Admin-Panel: http://localhost:3000/admin\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed fehlgeschlagen:', err)
  process.exit(1)
})
