# Campa & Paro Studio — landing

Una pagina sola per presentare lo studio e i suoi servizi digitali alle PMI italiane.
Obiettivo unico: far richiedere l'**analisi gratuita del sito**.
Sito statico: HTML + CSS, nessun build, nessun JavaScript, nessuna libreria.
Stessa identità del CRM (verde `#1F4D3F`, Instrument Serif + Inter, griglia 8px, radius 10px).

```
index.html    la pagina (7 sezioni: apertura, servizi, metodo, chi siamo, domande, contatto, piè di pagina)
style.css     stile; i colori sono variabili in :root
favicon.svg   la "&" del marchio
```

## Aprirla in locale

- Doppio clic su `index.html`, oppure
- `npx serve .` dentro questa cartella, poi apri l'indirizzo che stampa.

## Da compilare prima di pubblicare

Cerca `DA COMPILARE` in `index.html`: ogni segnaposto ha il suo commento.

| Cosa | Segnaposto attuale | Dove |
|---|---|---|
| Email | `email@da-compilare.it` | i due pulsanti «Richiedi l'analisi gratuita» (nel `mailto:`) e la sezione Contatto |
| Telefono | `+39 000 000 0000` / `tel:+390000000000` | sezione Contatto |
| WhatsApp | `https://wa.me/390000000000` | sezione Contatto |
| Città | `Città da compilare` | piè di pagina |
| P.IVA | `00000000000` | piè di pagina |
| Indirizzo del sito | `og:url` commentato | `<head>` |
| Ruolo e una riga sui soci (facoltativo) | «Socio fondatore» | sezione Chi siamo |
| Informativa privacy | manca il link | piè di pagina |

Regole di contenuto: niente prezzi (il listino è interno), niente numeri, clienti o recensioni inventati.

## Prima di andare online

- **Privacy:** serve un'informativa raggiungibile dal piè di pagina.
- **Font:** ora arrivano da Google Fonts. Per non passare l'IP dei visitatori a Google
  (tema GDPR), conviene scaricarli e servirli dalla cartella del sito.
- **Anteprima social:** per una card con immagine aggiungi un PNG 1200×630 e il meta `og:image`.

## Pubblicarla (quando sarà il momento, non ora)

È una cartella statica: va bene qualunque hosting statico.

- **Netlify:** trascina la cartella su app.netlify.com/drop, oppure collega il repository (nessun comando di build, cartella da pubblicare `.`).
- **Vercel:** importa il repository, preset «Other», nessun comando di build.
- **Railway:** servizio da repository con un server statico (es. `npx serve .`).

Poi collega il dominio e aggiorna `og:url`.
