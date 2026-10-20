# CP Studio Lab — landing

Una pagina sola per presentare lo studio alle **PMI manifatturiere** (meccanica, subfornitura, lamiera, stampaggio,
carpenteria): titolari e responsabili commerciali. Si dà del **voi**.
Lo studio vende **servizi digitali**: siti tecnici, Google, CRM e follow-up, automazioni, manutenzione.
Obiettivo della pagina: farsi chiedere un preventivo («Chiedeteci un preventivo»). L'analisi è solo la fase 10 del metodo.

Sito statico: HTML + CSS, nessun build, nessuna libreria, nessuna richiesta a server esterni.
Un piccolo `main.js` aggiunge solo movimento: **senza JavaScript la pagina è completa**, e con «riduci movimento»
attivo nel sistema nulla si muove.
Identità: kit «CP Studio Lab — Logo», variante F (verde `#1F4D3F`, crema `#F4F1EA`, Inter + Geist Mono,
griglia 8px). Il linguaggio visivo è quello del **disegno tecnico**: carta millimetrata, quote, una tavola quotata,
distinta, ciclo di lavoro, cartiglio.

```
index.html            la pagina: apertura (tavola quotata), il punto, servizi (con un esempio ciascuno), settori,
                      metodo (ciclo di lavoro), chi siamo, domande, contatto, piè di pagina
privacy.html          informativa privacy (BOZZA da compilare e far verificare)
grazie.html           pagina dopo l'invio del modulo (noindex)
style.css             stile: token in :root, poi una sezione per blocco della pagina, il movimento in fondo
main.js               movimento legato allo scorrimento e mirino CAD (miglioramento progressivo, ~7 KB)
fonts/                Inter e Geist Mono, variabili 100–900, woff2 subset latin, licenza OFL
favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest   icone «cp» del kit
og-image.png          anteprima 1200×630 per i link condivisi (WhatsApp, LinkedIn, email)
robots.txt, sitemap.xml
DESIGN_SYSTEM.md      token, componenti, momenti firma, regole del marchio
DA_FORNIRE.md         i dati che mancano
```

## Aprirla in locale

- Doppio clic su `index.html` (il movimento c'è, i font potrebbero non caricarsi da file), oppure
- `python3 -m http.server 8123` dentro questa cartella, poi `http://localhost:8123`.

## Da compilare prima di pubblicare

Ogni segnaposto visibile è dentro un `<mark class="da-compilare">`, che lo mostra **giallo con bordo tratteggiato**:
non può passare inosservato. Quando compilate un dato, togliete anche il `<mark>` che lo avvolge.
I segnaposto dentro gli attributi (`href`, meta) hanno accanto un commento `DA COMPILARE`. L'elenco completo è in
`DA_FORNIRE.md`.

Controllo prima del deploy: questo comando deve restituire **0 righe**.

```bash
grep -n 'da-compilare\|000000\|DA COMPILARE' index.html privacy.html grazie.html robots.txt sitemap.xml
```

Regole di contenuto: niente prezzi (il listino è interno), niente numeri, clienti, lavori o recensioni inventati.
Gli esempi dei servizi sono dichiarati «Esempio»; «Officina Esempio» e la tavola dell'albero sono di fantasia.

## Il modulo di richiesta

Due campi obbligatori (azienda o sito, email o telefono) e le scelte facoltative «Cosa vi serve» (`servizi[]`),
nessun JavaScript. Il `mailto:` resta come alternativa,
perché su molti PC (Gmail o Outlook web) il clic su un `mailto:` non apre niente.

- **Su Netlify** funziona così com'è (Netlify Forms: `data-netlify="true"`, campo trappola anti-spam `altro`
  con `data-netlify-honeypot`, la forma valida in HTML). Al primo deploy fate un invio di prova.
  Le richieste arrivano nel pannello Netlify → Forms; da lì si attiva la notifica email.
- **Altrove**: create un modulo su Formspree e mettete il suo indirizzo in `action`
  (`action="https://formspree.io/f/XXXX"`); togliete `data-netlify` e `netlify-honeypot`.

In locale il modulo non invia nulla: porta solo a `grazie.html`.

## Online

- **Sito:** https://cpstudiolab.netlify.app (Netlify, account di Francesco). Il dominio `cpstudiolab.it` va ancora collegato.
- **Repository:** https://github.com/FrancescoParolin/cpstudiolab-landing, pubblico (il codice di un sito è comunque visibile);
  Campa, `yngcmp`, ha accesso in scrittura. Mai password, chiavi o dati dei clienti nel repository.
  Netlify pubblica `main` a ogni push: chiave di sola lettura e webhook sul repository.
- **Cosa si pubblica:** `prepara.sh` copia in `dist/` solo i file del sito (niente `.md`); `netlify.toml` dice a Netlify
  di eseguirlo e di pubblicare `dist/`, con gli header di sicurezza e la cache lunga per i font.
- **Modulo:** Netlify Forms, modulo «richiesta». Le richieste arrivano in Netlify → Forms.

## Lavorare in due

Il repository è su GitHub; Netlify pubblica da solo quello che entra in `main`.

1. Mai lavorare su `main`: un ramo per ogni modifica, `paro/…` o `campa/…`.
2. Pull request verso `main`. Netlify crea un'anteprima della pull request: si guarda lì prima di unire.
3. Si unisce quando l'altro socio ha visto l'anteprima. Unita in `main`, la modifica è online in un minuto.

Prima di ogni pull request: la pagina in locale (sopra), a 390px e a 1440px, e la console senza errori.
Le regole di testi, design e movimento sono in `CLAUDE.md` e `DESIGN_SYSTEM.md`.

Controlli dopo ogni pubblicazione: anteprima del link con il debugger di condivisione di LinkedIn o Facebook,
PageSpeed Insights (obiettivo: sopra 95 su telefono, in tutte e quattro le voci), un invio di prova del modulo.
