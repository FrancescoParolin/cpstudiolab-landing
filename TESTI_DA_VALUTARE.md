# Testi da valutare

Punti in cui il layout chiederebbe di toccare un testo. La regola è non toccare il copy: i testi sono rimasti
com'erano e qui c'è solo la segnalazione. Decide Paro.

## 1. Il bottone nelle chiusure di `/manifattura/` e delle cinque lavorazioni (dal 11 novembre: «Check-up gratuito»)

**Dove:** il foglio verde in fondo alla pagina («Raccontateci cosa lavorate.», «Parliamo della vostra tornitura.» e simili).

**Cosa succede:** adesso il modulo sta in quello stesso foglio, accanto al bottone su computer e subito sotto su
telefono. Il bottone è rimasto e porta a `#contatto`, cioè al foglio in cui si trova già.

- Su computer il clic quasi non si vede: modulo e bottone sono nella stessa schermata.
- Su telefono allinea il foglio in alto; il modulo comincia a metà schermo.
- Nelle lavorazioni fa una cosa in più: spunta i servizi del percorso consigliato e lo scrive nel modulo.

**Perché non l'ho tolto:** togliere un bottone è accorciare il testo della pagina.

**Proposta:** toglierlo dalle chiusure di queste sei pagine e lasciare «Contatti diretti». Il bottone resta in
apertura e nel menu, dove serve davvero: lì porta al modulo in fondo.

## 2. I recapiti due volte in `/contatti/`

**Dove:** in alto, nel foglio verde «Parliamo del vostro lavoro.», e in fondo, nella sezione «Contatto».

**Cosa succede:** la sezione in fondo è quella della pagina principale, identica, quindi porta con sé email,
telefoni e WhatsApp. Nella stessa pagina ci sono già, due schermate più su.

**Proposta:** lasciare così. È la stessa sezione in tutto il sito e chi arriva in fondo sceglie tra modulo e telefono
senza risalire. L'alternativa è togliere i recapiti dal fondo: la sezione non sarebbe più identica.

## 3. «Cinque servizi che lavorano insieme»

Nessun problema: la sezione mostra di nuovo i cinque servizi con i loro testi. Punto chiuso.

## 4. Due nomi diversi dal catalogo nella tendina «Servizi»

**Dove:** tendina «Servizi» della testata (dalla sezione Servizi della pagina principale le tessere sono state tolte).

**Cosa succede:** «Richiesta di preventivo» (nel catalogo: «Richiesta di preventivo con disegno») e «Pagine per
servizio» (nel catalogo: «Pagine per lavorazione»). Sono i due nomi generali approvati l'11 novembre.
«Pagine per servizio» è l'unico testo che prima non esisteva nel sito. La tessera porta alla pagina Servizi, dove
il modulo ha ancora il nome del catalogo.

**Proposta:** tenerli, e decidere se rinominare anche i due moduli nella pagina Servizi.

## 5. Servizi in pagina principale: tornata com'è online

**Dove:** pagina principale, sezione «Servizi» («Dal primo contatto all'ordine.»).

**Com'è ora (11 novembre 2026):** il contenuto è quello del sito online, lettera per lettera: per ognuno dei cinque
servizi il titolo, la frase, i tre punti e il riquadro «Esempio». Paro ha mandato la schermata del sito online con
«così ma meglio». Il «meglio» è l'impaginazione: da 1200px testo ed esempio stanno affiancati e si alternano.

**Cosa è stato provato e scartato lo stesso giorno:** una versione a cinque colonne con otto moduli e senza
spiegazioni; poi i cinque servizi con gli «Esempio» e i moduli al posto dei testi. Nessuna delle due è rimasta.

**Gli otto moduli di base** non sono più in questa sezione: stanno nella tendina «Servizi» della testata e nel
catalogo (`SERVIZI_BASE.md`).

**Da sapere:** la pagina principale è 11.003px su computer e 15.629px su telefono, sopra gli obiettivi di 10.800 e
14.500; su telefono restano due tratti senza link al modulo più lunghi di quattro schermate (6,2 e 5,0).

## 6. Dopo il cambio in «Check-up gratuito»

Il 11 novembre 2026 Paro ha chiesto tre cose, una dopo l'altra:

1. l'invito del sito non è più «Chiedeteci un preventivo» ma **«Check-up gratuito»**, senza «Chiedeteci»:
   38 bottoni e i 2 titoli della sezione con il modulo, in 11 pagine;
2. via dal modulo **«Cosa vi serve»** con le sei scelte: restano due campi, in tutte le 8 pagine;
3. la sezione dev'essere rapida e bella.

Sotto il titolo, al posto di «Indicate cosa vi serve: vi rispondiamo entro 24 ore lavorative.» (che parlava delle
scelte tolte), ora c'è la frase del modulo 0.1 della pagina Servizi, con i suoi due dati. **Parole già del sito,
copiate lettera per lettera:** «I tre punti che oggi vi fanno perdere più richieste, per iscritto.» ·
«Tempi: 2 giorni lavorativi» · «Come arriva: per email, da uno di noi».

Testi rimasti com'erano, da guardare:

| Dove | Testo | Nota |
|---|---|---|
| Bottone del modulo | «Richiedi check-up» | Deciso da Paro il 11 novembre: «richiedi, non richiedete». È l'unico punto del sito al tu: tutto il resto dà del voi («Raccontateci», «Scriveteci»), e così chiede anche `CLAUDE.md`. Scelta sua, lasciata com'è. |
| Sotto il bottone | «Usiamo questi dati solo per rispondervi.» | Va bene. |
| Pagina «grazie» | «Vi rispondiamo entro 24 ore lavorative.» | La promessa delle 24 ore ora sta solo qui. Il check-up arriva in 2 giorni: sono due cose diverse (risposta e consegna), ma chi legge può confonderle. |
| Apertura | «Più richieste di preventivo, dal vostro digitale.» | Va bene: parla dei preventivi del cliente, non del nostro. |
| `CLAUDE.md` del progetto | «l'analisi è solo la fase 10 del metodo» | Ora l'analisi è l'invito principale del sito. La regola va aggiornata da voi: io non l'ho toccata. |

Cosa si è perso togliendo le scelte:

- Nella richiesta non arriva più il campo `servizi[]`. Arrivano ancora, nascosti, `percorso` (da quale «Partiamo da
  qui» si è partiti) e `calibro` (il risultato del calibro).
- La riga «Dal percorso «…»: i servizi sono già spuntati» non compare più: non ci sono servizi da spuntare.
- Chi voleva dire subito «mi serve il sito» non ha più dove scriverlo: resta la telefonata, WhatsApp o l'email.

Da sapere:

- Nel sito non c'è più nessun bottone che dica «preventivo» per un lavoro dello studio.
- Ogni check-up gratuito è lavoro vero: 13 punti riletti da una persona, email entro 2 giorni lavorativi, uno ogni
  6 mesi per azienda (modulo 0.1). Con l'invito su ogni pagina e un modulo da trenta secondi le richieste possono salire.

## 7. Pagina Servizi: solo il catalogo, per ora

Il 11 novembre 2026 Paro ha chiesto di non spiegare i servizi uno per uno: «metti solo il catalogo, dopo faremo
delle spiegazioni». Dalla pagina `/servizi/` sono state tolte le 17 schede dei moduli (per chi, tempi, comprende,
non comprende, da voi, finito quando). Resta la distinta «Tutti i moduli, in una pagina»: codice, nome e tempi.
Il testo tolto è nella storia di git (commit `9dc8a46`, `servizi/index.html`): si rimette con un comando.

Cosa è cambiato di conseguenza, senza toccare parole:

- le 17 righe del catalogo non sono più collegamenti (non c'è una scheda a cui andare);
- 171 collegamenti in 11 pagine, che portavano a una scheda, ora portano al catalogo: le otto tessere della pagina
  principale, la tendina «Servizi», i moduli citati in Metodo, Manifattura e nelle lavorazioni.

Rimasti nella pagina Servizi, da decidere:

| Cosa | Perché l'ho lasciato | Da decidere |
|---|---|---|
| «Tre percorsi, già composti» (A, B, C) | Non spiegano un servizio: mettono insieme i moduli | Tenerli o toglierli |
| «Pronti per la fiera» | È un'offerta con scadenza (14 gennaio, 10 febbraio). **È ancora la spiegazione di un servizio.** | Tenerla o toglierla |
| «Valgono per tutti i lavori» (le regole) | Non è un servizio | Tenerle o toglierle |

Testi rimasti com'erano, che ora parlano di schede che non ci sono:

| Dove | Testo |
|---|---|
| Apertura della pagina Servizi | «Cinque servizi, fatti di moduli con i confini scritti: cosa comprende ogni lavoro, cosa no e in quanto tempo.» |
| Sopra il catalogo | «Poi i moduli che vi servono, ognuno con i confini scritti.» |
| Sotto il catalogo | «Il lavoro che non è in nessuna scheda si fa a parte» |
| Occhiello e titolo | «Servizi · per filo e per segno» · «Cosa facciamo, per filo e per segno.» |
| Pagina principale, sotto Servizi | «Tutti i moduli, per filo e per segno» (il link che porta qui) |
| Pagina Servizi, bottone in apertura | «Chiedete il check-up»: è rimasto com'era, non era «Chiedeteci un preventivo» |

Da sapere: con le schede è sparita anche la scheda 0.1 «Check-up gratuito». Cosa comprende il check-up ora si legge
solo sopra il modulo: i tre punti, 2 giorni lavorativi, per email da uno di noi.
