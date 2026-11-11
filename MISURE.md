# Misure: proposta

Oggi nel sito non c'è nessuno strumento di misura: non si sa dove la gente si ferma, né quale bottone porta al modulo.
Questa è una proposta. **Non è installato niente**: decide Paro se e quale attivare.

## Cosa serve

- Senza cookie e senza dati personali, così non serve il banner di consenso.
- Che conti **eventi**, non solo pagine viste: il sito è quasi tutto in una pagina.
- Dati in Europa.
- Uno script piccolo: Lighthouse mobile oggi è 95-97 e non deve scendere.

## Strumenti

| Strumento | Cookie | Eventi | Dati | Costo indicativo | Note |
|---|---|---|---|---|---|
| **Plausible** | no | sì, con proprietà | UE (Germania) | circa 9 € al mese | script sotto 1 KB, pannello in italiano, imbuti nei piani superiori |
| **Umami Cloud** | no | sì, con proprietà | UE a scelta | gratuito fino a una soglia di eventi al mese | open source, si può anche ospitare da sé |
| Simple Analytics | no | sì | UE (Paesi Bassi) | circa 15 € al mese | simile a Plausible |
| Netlify Analytics | no | **no** | USA | circa 9 $ al mese | conta dal server, nessuno script, ma non vede gli eventi: non basta |
| Cloudflare Web Analytics | no | **no** | USA | gratuito | solo pagine viste: non basta |

I prezzi sono indicativi e vanno ricontrollati sul sito di ciascuno prima di scegliere.

**Consiglio: Plausible.** Fa esattamente quello che serve, con il minimo di configurazione. Se si vuole partire a
costo zero, Umami Cloud conta gli stessi eventi.

## Eventi da contare

| Evento | Quando | Proprietà |
|---|---|---|
| `sezione-vista` | una sezione entra nello schermo, una volta per visita | `sezione`: punto, servizi, settori, metodo, dati, studio, domande, calibro, contatto |
| `calibro-banner-visto` | il banner compare | |
| `calibro-banner-chiuso` | chiuso con ✕ | |
| `calibro-iniziato` | la finestra si apre | `origine`: fascia o banner |
| `calibro-risposta` | a ogni risposta | `domanda`: da 1 a 8 |
| `calibro-completato` | all'ottava risposta | `punteggio`: da 0 a 8 |
| `calibro-portato` | clic su «Portate il risultato nella richiesta» | |
| `modulo-iniziato` | primo carattere scritto in un campo | `pagina` |
| `modulo-inviato` | invio del modulo | `pagina`, `percorso`, `dal-calibro`: sì o no |
| `clic-preventivo` | clic su un bottone che porta al modulo | `dove`: apertura, servizi, studio, menu, settori |
| `clic-telefono` | clic su un numero | `chi`: Tommaso o Francesco · `dove`: menu, contatto, pagina contatti |
| `clic-whatsapp` | clic su «Scriveteci su WhatsApp» | `dove` |
| `clic-email` | clic sull'indirizzo email | `dove` |

Gli eventi del calibro esistono già: il calibro li emette su `document` come `calibro:banner-visto`,
`calibro:banner-chiuso`, `calibro:aperto`, `calibro:risposta`, `calibro:completato`, `calibro:portato`.
Basta ascoltarli e inoltrarli.

Non si conta mai il contenuto dei campi del modulo.

## Le domande a cui rispondono

1. **Dove si fermano?** `sezione-vista` in fila: quanti arrivano a Servizi, a Metodo, al Contatto.
2. **Il calibro lavora?** visto → iniziato → completato → portato → modulo inviato.
3. **Quale bottone porta richieste?** `clic-preventivo` per posizione, incrociato con `modulo-inviato`.
4. **Modulo o telefono?** `modulo-inviato` contro `clic-telefono` e `clic-whatsapp`.
5. **Il modulo fa perdere gente?** `modulo-iniziato` contro `modulo-inviato`.

## Cosa comporta attivarlo

- Una riga di script in ogni pagina e una trentina di righe in `main.js`.
- È la prima richiesta a un server esterno: oggi il sito non ne fa nessuna. Con Plausible si può far passare lo
  script dal proprio dominio con una regola in `netlify.toml`, così le richieste restano su cpstudiolab.it.
- L'informativa privacy va aggiornata con una riga sullo strumento. È un testo nuovo: lo scrive Paro.
- Dopo l'attivazione si rimisura Lighthouse mobile.

## Da decidere

1. Plausible, Umami o niente per ora.
2. Script dal dominio dello studio o da quello dello strumento.
3. La riga da aggiungere all'informativa privacy.
