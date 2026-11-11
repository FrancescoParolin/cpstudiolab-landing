# Resoconto: cosa è cambiato nel sito (11 novembre 2026)

Per Campa. Lavoro fatto da Paro con Claude tra la notte e il pomeriggio dell'11 novembre 2026, pubblicato lo stesso giorno.
Questo file è la versione lunga: quella breve te l'ha mandata Paro su WhatsApp.

Legenda: ✅ deciso da Paro · ⬜ da decidere insieme · ⚠️ da sapere.

## In breve

- L'invito del sito non è più «Chiedeteci un preventivo»: è **«Check-up gratuito»**. ✅
- Il modulo ha **due campi** ed è in **otto pagine**, non più solo nella principale.
- Il **calibro** è una fascia, più un banner e una finestra con una domanda alla volta.
- Nell'apertura c'è il **video del modellino**: la tua idea del drone che entra nella casetta.
- **Menu** in alto con le voci sempre visibili su computer, tendine e un carattere nuovo.
- La pagina **Servizi** mostra solo il catalogo: le schede dei moduli torneranno più avanti. ✅

## Cosa è cambiato, pezzo per pezzo

### Menu in alto
- Da 1100px di larghezza le quattro voci (Servizi, Settori, Metodo, Lo studio) stanno in linea. Sotto resta «Menu».
- Passando sopra una voce si apre una tendina con quello che contiene. Funziona anche da tastiera; Esc la chiude.
- Sotto «Servizi» ci sono i cinque servizi e, per ognuno, i moduli «di base» (otto in tutto): vedi `SERVIZI_BASE.md`.
- Carattere delle voci: **Archivo largo**, al posto di Inter. Solo nel menu. ✅

### Apertura
- A destra su computer, sotto titolo e bottoni su telefono, il **video di 5 secondi**: dall'alto verso una casetta di
  cartoncino, dentro la porta, fermo su due figure al computer (una verde, una crema). Parte una volta, senza audio,
  quando il riquadro è in vista, e si ferma.
- Con «riduci movimento» si vede solo l'immagine finale. Su telefono il video è arrivato con una seconda
  pubblicazione, lo stesso 11 novembre: nella prima c'era solo l'immagine. Dettagli e prompt: `VIDEO_APERTURA.md`.
- Il bottone ora dice «Check-up gratuito».

### Calibro
- Nella pagina resta una fascia. Le otto domande stanno in una finestra, una alla volta.
- Dopo «Il punto» un banner in basso lo propone. Dopo la ✕ non torna per 30 giorni. ⬜
- Il risultato si porta nel modulo e arriva nella richiesta (campo nascosto `calibro`), in tutte le pagine col modulo.
- Corretto un difetto serio: su computer con il mouse non si riusciva a rispondere. In alto resta solo la ✕.

### Servizi, nella pagina principale
- Testi identici a prima: per ogni servizio titolo, frase, tre punti e riquadro «Esempio».
- Cambia l'impaginazione: da 1200px testo ed esempio sono affiancati e si alternano.
- In fondo alla sezione c'è il bottone «Check-up gratuito».

### Metodo, Il punto, Contatto
- «Metodo» è su un foglio verde, come «Il punto».
- Sui fogli verdi c'è un fondo di carta appena visibile. Contrasti controllati: restano AA.

### Lo studio
- Bottone «Check-up gratuito» accanto a «Conoscete lo studio».
- Due riquadri per i **nostri ritratti**, spenti: compaiono da soli quando in `immagini/` ci sono
  `socio-tommaso.jpg` e `socio-francesco.jpg`. Come fare lo scatto: `DA_FORNIRE.md`.

### Il modulo
- Titolo della sezione: «Check-up gratuito.» Sotto, la frase del modulo 0.1: «I tre punti che oggi vi fanno perdere più
  richieste, per iscritto.», con tempi (2 giorni lavorativi) e modo (per email, da uno di noi).
- **Due campi**: «Azienda o sito», «Email o telefono». Tolte le sei scelte «Cosa vi serve». ✅
- Bottone: «Richiedi check-up». È l'unico punto del sito al tu. ✅
- È un foglio crema sul verde, con le tacche agli angoli.
- Lo stesso modulo, identico, è in fondo a `/contatti/`, `/manifattura/` e alle cinque lavorazioni. Lì i bottoni non
  portano più alla pagina principale. I «Partiamo da qui» dei percorsi lo compilano senza cambiare pagina.

### Pagina Servizi
- Tolte le 17 schede dei moduli. Resta il catalogo: codice, nome, tempi. ✅ «Dopo faremo delle spiegazioni».
- Restano i tre percorsi, «Pronti per la fiera» e le regole. ✅
- Immagine di testata nuova, come nella pagina Metodo.

## Testi cambiati, tutti

| Dove | Prima | Ora |
|---|---|---|
| 38 bottoni in 11 pagine | Chiedeteci un preventivo | Check-up gratuito |
| Titolo sopra il modulo (2 pagine) | Chiedeteci un preventivo. | Check-up gratuito. |
| Sotto quel titolo (2 pagine) | Indicate cosa vi serve: vi rispondiamo entro 24 ore lavorative. | I tre punti che oggi vi fanno perdere più richieste, per iscritto. · Tempi: 2 giorni lavorativi · Come arriva: per email, da uno di noi |
| Modulo (8 pagine) | «Cosa vi serve» con sei scelte | tolto |
| Bottone del modulo (8 pagine) | Inviate la richiesta | Richiedi check-up |
| Finestra del calibro | Chiudi ✕ | solo ✕ |
| Pagina Servizi | 17 schede dei moduli | tolte |
| Tendina «Servizi» | non c'era | «Richiesta di preventivo» e «Pagine per servizio» (nel catalogo: «…con disegno», «…per lavorazione») |

Testi nuovi scritti da zero: nessuno, a parte i testi alternativi delle immagini. Tutto il resto è stato riusato da
frasi che il sito aveva già. Il vecchio contenuto è nella storia di git.

## Da decidere insieme ⬜

1. **La regola «l'analisi è solo la fase 10 del metodo»** in `CLAUDE.md`: ora l'analisi è l'invito del sito. Va riscritta.
2. **La regola sui caratteri** in `CLAUDE.md` («Inter per parlare, Geist Mono per annotare»): c'è un terzo carattere nel menu.
3. **«Vi rispondiamo entro 24 ore lavorative»** resta solo nella pagina «grazie»; il check-up arriva in 2 giorni. Può confondere.
4. **Più check-up da fare**: invito su ogni pagina e modulo da trenta secondi. Ognuno è lavoro vero.
5. **Bozza di preventivo (4.1)** tra i moduli di base: nel tuo report vale solo per la manifattura (M10). In tutte e due
   le tabelle c'è «Lavora con noi» (M15 e S20). Proposta in `SERVIZI_BASE.md`.
6. **Banner del calibro**: 30 giorni dopo la ✕, o meno.
7. **Lunghezza**: la pagina principale è 11.003px su computer e 15.629px su telefono (volevamo 10.800 e 14.500).
   Su telefono ci sono due tratti da 6,2 e 5,0 schermate senza un link al modulo.
8. **Statistiche**: proposta in `MISURE.md` (Plausible). Niente è installato.
9. Testi della pagina Servizi che parlano ancora di «schede» e «confini scritti»: `TESTI_DA_VALUTARE.md`, punto 7.

## Da fare tu

- Guardare il sito da telefono e da computer, soprattutto apertura, calibro e modulo.
- Fare il tuo ritratto (vedi `DA_FORNIRE.md`).
- Dire se «Check-up gratuito» come invito unico ti torna, e se il video è quello che avevi in mente.

## Da fare Paro

- Un invio di prova da ognuna delle otto pagine col modulo, e controllare in Netlify → Forms → «richiesta» che arrivino,
  con i campi `percorso` e `calibro`. Claude non manda moduli di prova.

## ⚠️ Da sapere

- **Netlify Forms**: lo stesso modulo in otto pagine vale come un modulo solo, «richiesta». Non verificato nel pannello.
  Il campo `servizi[]` non arriva più; è arrivato `calibro`.
- **Lighthouse mobile**: in locale 92-93 di prestazioni (prima 95-97), 100 nelle altre tre voci. Il calo viene dal peso
  in più del calibro, misurato su un server senza compressione. Da rimisurare online.
- **Safari**: Paro l'ha guardato lì; Claude ha provato in Chrome e nel motore di Safari, non in Safari vero.
- **Immagini e video** sono generati con Higgsfield (30 crediti su un tetto di 35). Mostrano carta e un modellino,
  mai clienti, lavori o persone vere.

## Come tornare indietro

- **Tutto**: in Netlify, Deploys, riaprire il deploy precedente e «Publish deploy». Oppure annullare l'unione di questa
  pull request. Il sito di prima è il commit `f549095`.
- **Solo «Check-up gratuito» → «Chiedeteci un preventivo»**: i testi di prima sono nella tabella qui sopra.
- **Le schede della pagina Servizi**: sono nel commit `9dc8a46`, file `servizi/index.html`.
- **Il carattere del menu**: togliere `--menu` dalle tre regole in `style.css` che lo usano.

## Dove sono i dettagli

| File | Cosa c'è |
|---|---|
| `TESTI_DA_VALUTARE.md` | ogni punto in cui un testo andrebbe guardato |
| `SERVIZI_BASE.md` | gli otto moduli di base e l'aggancio al tuo report del 9 novembre |
| `VIDEO_APERTURA.md` | il video: idea, prompt, prove, costi, come rifarlo |
| `IMMAGINI.md` | le immagini: prompt, varianti scartate, crediti |
| `MISURE.md` | proposta di statistiche senza cookie |
| `DA_FORNIRE.md` | cosa manca ancora, ritratti compresi |
| `DESIGN_SYSTEM.md` | i componenti nuovi |
