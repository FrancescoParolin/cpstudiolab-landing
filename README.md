# Campa & Paro Studio — landing

Una pagina sola per presentare lo studio e i suoi servizi digitali alle PMI (artigiani, studi, attività locali).
Obiettivo unico: far richiedere l'**analisi gratuita del sito**.
Sito statico: HTML + CSS, nessun build, nessun JavaScript, nessuna libreria, nessuna richiesta a server esterni.
Stessa identità del CRM (verde `#1F4D3F`, Instrument Serif + Inter, griglia 8px, radius 10px).

```
index.html            la pagina (apertura, servizi, metodo, chi siamo, domande, contatto, piè di pagina)
privacy.html          informativa privacy (BOZZA da compilare e far verificare)
grazie.html           pagina dopo l'invio del modulo (noindex)
style.css             stile; i colori sono variabili in :root
fonts/                Instrument Serif (normale e corsivo) e Inter 400–500, woff2 subset latin, licenza OFL
favicon.svg/.ico      la "&" del marchio (in tracciato, non dipende dai font)
apple-touch-icon.png  icona 180×180 per la schermata Home
og-image.png          anteprima 1200×630 per i link condivisi (WhatsApp, Facebook, LinkedIn)
robots.txt, sitemap.xml
```

## Aprirla in locale

- Doppio clic su `index.html`, oppure
- `npx serve .` dentro questa cartella, poi apri l'indirizzo che stampa.

## Da compilare prima di pubblicare

Ogni segnaposto visibile è dentro un `<mark class="da-compilare">`, che lo mostra **giallo con bordo tratteggiato**:
non può passare inosservato. Quando compili un dato, togli anche il `<mark>` che lo avvolge.
I segnaposto dentro gli attributi (`href`, meta) hanno accanto un commento `DA COMPILARE`.

| Cosa | Segnaposto attuale | Dove |
|---|---|---|
| Città | `Città`, `Città-da-compilare` | occhiello dell'apertura, Chi siamo, piè di pagina, `<title>` |
| Email | `email@da-compilare.it` | apertura e Contatto (testo e `mailto:`), privacy |
| Telefono | `+39 000 000 0000` / `tel:+390000000000` | Contatto |
| WhatsApp | `https://wa.me/390000000000` | apertura e Contatto |
| P.IVA | `00000000000` | piè di pagina, privacy |
| Tempi dell'analisi | `N` giorni lavorativi | Metodo, Contatto, `grazie.html` — solo un numero che potete garantire |
| Soci | `Nome Cognome`, cosa segue ciascuno, una riga concreta | Chi siamo |
| Foto dei soci | sigla C / P | Chi siamo: c'è l'`<img>` d'esempio nel commento (anche in bianco e nero, con `alt`) |
| Dominio | `www.dominio-da-compilare.it` | `canonical`, `og:url`, `og:image`, `robots.txt`, `sitemap.xml` |
| Informativa | titolare, fornitori, conservazione, data | `privacy.html` (da far verificare) |
| Dati strutturati | JSON-LD commentato | `<head>` di `index.html`: togli il commento quando i dati sono veri |
| Lavori | blocco commentato | fine di Chi siamo: solo lavori veri, con il permesso del cliente |

Controllo prima del deploy: questo comando deve restituire **0 righe**.

```bash
grep -n 'da-compilare\|000000\|DA COMPILARE' index.html privacy.html grazie.html robots.txt sitemap.xml
```

Regole di contenuto: niente prezzi (il listino è interno), niente numeri, clienti o recensioni inventati.

## Il modulo di richiesta

Due campi (sito, email o telefono), nessun JavaScript. Il `mailto:` resta come alternativa,
perché su molti PC (Gmail o Outlook web) il clic su un `mailto:` non apre niente.

- **Su Netlify** funziona così com'è (Netlify Forms: `data-netlify="true"`, campo trappola anti-spam `altro`).
  Le richieste arrivano nel pannello Netlify → Forms; da lì si attiva la notifica email.
- **Altrove**: crea un modulo su Formspree e metti il suo indirizzo in `action`
  (`action="https://formspree.io/f/XXXX"`); togli `data-netlify` e `netlify-honeypot`.

In locale il modulo non invia nulla: porta solo a `grazie.html`.

## Pubblicarla (quando sarà il momento, non ora)

È una cartella statica: va bene qualunque hosting statico.

- **Netlify:** collega il repository (nessun comando di build, cartella da pubblicare `.`). Il modulo funziona da subito;
  attiva il rilevamento dei moduli in Site settings → Forms se è spento.
- **Vercel:** importa il repository, preset «Other», nessun comando di build (poi modulo con Formspree).
- **Railway:** servizio da repository con un server statico (es. `npx serve .`) (poi modulo con Formspree).

Poi collega il dominio, sostituisci `dominio-da-compilare.it` ovunque e controlla l'anteprima del link
con il debugger di condivisione di Facebook.
