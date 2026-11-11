# Gli otto moduli in pagina principale: da dove vengono

Otto moduli sono quelli che valgono per ogni azienda, non solo per la manifattura. Oggi si vedono nella tendina
«Servizi» della testata, sotto i cinque servizi. Nella sezione «Servizi» della pagina principale sono stati provati il
11 novembre e poi tolti: lì Paro ha voluto di nuovo i testi del sito online.
Scelti l'11 novembre 2026 con Paro. Questa nota li aggancia alla **Banca Dati** (`~/CP STUDIO/banca-dati`).

Legenda, la stessa della Banca Dati: 📊 dato con fonte · 🔸 stima con il metodo · ⬜ da verificare.

## Da dove nasce la richiesta

Negli appunti di lettura del 10 novembre (`banca-dati/Journal_10_11.pdf`) c'è l'idea: «mettere una base di servizi
che accomuna tutti e due i settori […] e poi specializzarci su servizi più specifici». I due settori sono quelli del
report del 9 novembre (`banca-dati/ricerca-mercato-2026-11-09.md`): manifattura e subfornitura (servizi M01-M20),
serramenti e impianti (S01-S20). Negli stessi appunti: trovare i «servizi principali, consolidati e che servano sul
territorio italiano».

Il criterio usato qui: **un modulo è «di base» se nel report ha una riga in tutte e due le tabelle**, quella della
manifattura e quella di serramenti e impianti.

## Gli otto, con l'aggancio

| In pagina | Modulo del catalogo | Manifattura (report 9/11) | Serramenti e impianti (report 9/11) | Di base? |
|---|---|---|---|---|
| Sito tecnico | 1.1 | M02 «Sito tecnico per la richiesta di preventivo», in catalogo | nessuna riga sua: il sito è dentro S03 e S04 | 🔸 sì, ma il nome «tecnico» è nato per l'officina |
| Richiesta di preventivo | 1.2 «Richiesta di preventivo con disegno» | M03, in catalogo, difficoltà bassa | S03 «Pagina di richiesta del sopralluogo con le domande giuste» | 📊 sì |
| Scheda Google dell'azienda | 2.1 | M04 (2.1) | S02 «Scheda Google e recensioni dopo la posa», da adattare da 2.1 | 📊 sì |
| Pagine per servizio | 2.2 «Pagine per lavorazione» | M04 (2.2) | S04 «Lavori prima e dopo, pagine per i comuni serviti» | 📊 sì |
| Elenco delle richieste | 3.1 | M08 «Elenco delle richieste e misura» | S08 «Elenco di richieste, sopralluoghi e cantieri», da adattare da 3.1 | 📊 sì |
| Clienti che non ordinano più | 3.2 | M09, in catalogo, difficoltà bassa | S14 «Clienti passati: riattivazione e manutenzione», da adattare da 3.2 | 📊 sì |
| Bozza di preventivo dalla richiesta | 4.1 | M10 «Bozza di preventivo con lettura del disegno», da estendere, **difficoltà alta** | nessuna riga corrispondente; vicini: S09, S12 | ⬜ **non ancora**: oggi vale solo per la manifattura. Punto aperto (vedi sotto) |
| Ottimizzazione e manutenzione | 5.1 | il canone che accompagna M02, M04, M08 | il canone che accompagna S02, S04, S08 | 🔸 sì |

I codici M e S, gli stati («in catalogo», «da adattare») e le difficoltà sono copiati dalle due tabelle del report.
Sette su otto reggono il criterio. Uno non ancora.

## Il punto aperto: 4.1 non è ancora «di base»

**Non deciso.** In pagina c'è «Bozza di preventivo dalla richiesta» (4.1), come nella lista approvata l'11 novembre.
Le strade sono due: metterci «Lavora con noi» (1.4: M15 e S20, tutte e due le tabelle, difficoltà bassa), oppure
tenere 4.1 e renderlo valido per ogni azienda.

Quella che segue è una **proposta mia** per la seconda strada, da leggere con Campa. Sul sito non cambia niente:
il testo del modulo 4.1 nella pagina Servizi è quello di prima.

### Com'è oggi (catalogo, `servizi-definiti.md`)

- Legge ogni richiesta: «materiale, quantità, tolleranze, scadenza, allegati». Elenca i dati che mancano. Prepara la
  bozza della risposta e la bozza del preventivo nel modello dell'azienda, con i prezzi vuoti. Prova su 10 richieste vere.
- Paletti: l'intelligenza artificiale non manda niente e non dà prezzi; i disegni passano dallo strumento solo con il
  consenso scritto. Escluso: leggere le quote dal disegno.
- Misura: ore dalla richiesta alla risposta. Prezzo 1.200 € ⬜. Decisione 12: prima un cliente pilota, poi il prezzo sul sito.

### Perché oggi non è «di base»

1. **Parla solo la lingua dell'officina.** Materiale, tolleranze, buyer, disegno: un serramentista o un impiantista
   non ci si riconosce. 🔸
2. **Nel report è cresciuto dalla parte difficile.** M10 lo estende alla lettura del disegno, difficoltà alta;
   M11 (prezzo istantaneo) è «un progetto grosso: va fatto solo con un cliente che lo chiede». 📊
3. **Per serramenti e impianti il problema è un altro pezzo del preventivo.** Non la lettura della richiesta, ma i
   sopralluoghi a vuoto (S12) e i preventivi che restano senza risposta: «si chiude il 10-20% dei preventivi
   (nota 02): il resto si perde per silenzio, non per prezzo» (S09). 📊

Quello che i due settori hanno in comune è il **tempo**: «le officine rispondono in 3-5 giorni (nota 02)» (M10);
«chi risponde per primo vince (nota 03)» (S06). 📊 La misura di 4.1, ore dalla richiesta alla risposta, vale già
per tutti e due.

### Proposta: un nucleo uguale per tutti, più le estensioni di settore

**Nucleo, di base (vale per ogni azienda che riceve richieste da un modulo):**

1. Legge **i campi del modulo di richiesta**, non i documenti. I campi sono quelli del modulo 1.2 di quell'azienda:
   per l'officina materiale, quantità, tolleranze (M03); per l'installatore tipo di intervento, numero di finestre,
   tempi, foto (S03). Il servizio è lo stesso, cambiano le domande.
2. Dice cosa manca per quotare e prepara la risposta con quelle domande.
3. Prepara la bozza del preventivo nel modello dell'azienda, con i prezzi vuoti.
4. Paletti invariati: prezzi e invio li fa sempre una persona.

Così 4.1 ha lo stesso prerequisito in tutti e due i settori (1.2, cioè M03 e S03) e non dipende dai disegni:
difficoltà media, non alta. 🔸

**Estensioni, non di base, solo su richiesta e dopo il nucleo:**

| Estensione | Settore | Nel report | Difficoltà |
|---|---|---|---|
| Lettura del disegno | manifattura | M10 | alta |
| Forbice di prezzo da foto e videochiamata | serramenti e impianti | S12, visto all'estero | media |
| Promemoria sui preventivi rimasti aperti | tutti e due | S09; per l'officina sta già in 3.1 | bassa |

La terza è la più interessante per rendere 4.1 davvero generale: è a difficoltà bassa, ha un dato dietro (S09) e
chiude il giro «richiesta → bozza → preventivo → risposta del cliente». Da decidere se sta in 4.1 o in 3.1.

### Cosa manca per decidere ⬜

- Un cliente pilota (decisione 12): senza, le ore e il prezzo restano stime.
- Come fanno il preventivo i serramentisti: se usano il programma del loro fornitore di infissi, la «bozza nel
  vostro modello» per loro non esiste. Nella parte di Banca Dati che ho letto non c'è: **non trovato**.
- Il contratto del fornitore dello strumento di intelligenza artificiale, per i documenti dei clienti (già ⬜ nel catalogo).
- Le parole: se il nucleo vale per tutti, il testo di 4.1 nella pagina Servizi («materiale, quantità, tolleranze»)
  va riscritto. È testo del sito: lo decidete voi.

## L'invito del sito: il check-up gratuito

Dal 11 novembre 2026 ogni bottone che porta al modulo dice «Check-up gratuito», e così il titolo della
sezione con il modulo. Deciso da Paro: «è il nostro cavallo di battaglia». L'aggancio alla Banca Dati:

- Appunti del 10 novembre: «Lead Magnet usato: check-up gratuito per agganciare clienti tramite mail […] oppure in
  call» e «Il check-up gratuito come apripista […] resta l'unico ingresso gratis». 📊
- Report del 9 novembre, M01: il check-up completo a pagamento «è il passo naturale dopo i tre punti gratuiti». 📊
- Catalogo, modulo 0.1 «Check-up gratuito»: i tre punti che fanno perdere più richieste, per email da uno di noi,
  in 2 giorni lavorativi, uno ogni 6 mesi. È già scritto così nella pagina Servizi. 📊
- Ogni scheda M e S del report ha la riga «Aggancio al check-up»: ogni servizio nasce da una falla che il
  check-up mostra. L'invito e il catalogo raccontano la stessa cosa. 🔸

I testi che ora stanno accanto al nuovo invito e andrebbero guardati sono in `TESTI_DA_VALUTARE.md`, punto 6.

## Cosa NON è in questi otto, e perché

- **S16 «Manutenzione programmata in abbonamento»**, che negli appunti è «servizio chiave»: è la manutenzione che
  il cliente vende ai *suoi* clienti (caldaie, infissi). Non è il nostro 5.1, che è la manutenzione del sito.
  Non confonderli in pagina.
- Scheda fornitore (1.3, M07), fiera (M13), versione per l'estero (1.5, M06): solo manifattura. M06 negli appunti è
  «da rivedere».
- Campagne Google e Meta (S05): oggi la pagina Servizi le esclude («Cosa non facciamo»). Il report dice che è una
  decisione da prendere.

## Nomi in pagina

| In pagina | Nel catalogo | Perché |
|---|---|---|
| Richiesta di preventivo | Richiesta di preventivo con disegno | «con disegno» vale per l'officina, non per tutti |
| Pagine per servizio | Pagine per lavorazione | idem: «lavorazione» è parola della manifattura. **Unico testo nuovo.** |

Gli altri sei nomi sono quelli del catalogo, lettera per lettera. I titoli dei cinque servizi non sono stati toccati.

## Metodo e limiti

Letti l'11 novembre 2026: `LEGGIMI.md`, `Journal_10_11.pdf` (9 pagine, testo estratto), le due tabelle dei servizi
di `ricerca-mercato-2026-11-09.md` con le schede M10, M11, S09, S12 e S17, e la scheda 4.1 di `servizi-definiti.md`. Non letti per intero: il resto del report (mega-trend, concorrenti, matrice,
roadmap), le 15 note del vault originale e `servizi-definiti.md`. Il criterio «riga in tutte e due le tabelle» è
mio: il report non dice quali servizi sono «di base». Nessun prezzo del report è finito sul sito.
