# Design system

Idea: il disegno tecnico (carta millimetrata, quota, tavola, distinta, ciclo di lavoro, cartiglio) con i colori del kit F.
Ogni valore sta nei token in `:root` di `style.css`. La versione completa, con le anteprime dei componenti,
è il design system «CP Studio Lab» pubblicato come Artifact.

- **Colori del kit → token:** verde `#1F4D3F` = `--accento`, crema `#F4F1EA` = `--crema`, inchiostro `#16161A` = `--testo`,
  grigio `#6E6C68` = `--tenue`, fondo `#FAFAF8` = `--fondo`. Sul verde i testi sono crema (8,5:1) o `--crema-tenue` (5,3:1).
- **Neutri:** `--superficie` (bianco: esempi, Metodo), `--superficie-2`, `--bordo`, `--bordo-forte`, `--accento-scuro` (velo dei bottoni).
  `--velo` e `--velo-forte` sono il verde del marchio al 6% e al 21% sul fondo: solo dentro tavola ed esempi. `--mirino` solo per il mirino.
- **Caratteri:** Inter per parlare (come nel kit), Geist Mono per annotare: è una scelta di questo sistema, non del kit (pag. 6).
  Pesi 300, 400, 500, 600; accenti con il peso leggero, mai con il corsivo. Le cifre delle annotazioni vengono da Inter
  (famiglia `Cifre`): lo zero di Geist Mono è barrato e accanto a «Ø» si leggerebbe come un diametro.
  Scala: da `--t-micro` (12px) a `--t-display` (fino a 152px). `--t-tavola` e `--t-scena` sono in unità del disegno:
  cambiano con la larghezza perché a schermo i testi dei disegni restino tra 12 e 15px.
- **Spazi:** multipli di 8px (`--s1`…`--s16`); `--scarto` (4px) per i piccoli scarti. Raggio 10px come le tessere del logo, fogli verdi 40px.
  Un'ombra sola, `--ombra`, solo sugli esempi dei servizi.
- **Componenti:** `.logo`, `.micro`, `.titolo-sezione`, `.btn`, `.link`, `.link-freccia`, `.elenco-tratto`, `.quota`,
  `.tavola`, `.mirino`, `.servizio` + `.mock-*` (esempi), `.settore` + `.trama-*` + `.disegno-lavorazione`, `.fase`,
  `.simbolo-componibile` + `.richiamo`, `.socio-tessera`, `.domande`, `.modulo` + `.campo` + `.scelte`, `.cartiglio-piede`,
  `.menu` (menu a schermo intero, dialogo modale).
- **Momenti firma:** il menu, un foglio verde che sale dal fondo e chiudendo esce in alto, con le lettere delle voci che
  scorrono al passaggio del mouse; la tavola che si compone come al tornio; il mirino CAD sulla carta millimetrata; il foglio verde
  che copre l'apertura; gli esempi dei servizi che si compongono (il disegno si allega, la richiesta parte); i disegni
  delle lavorazioni nella scena ferma; il ciclo 10-20-30-40 che si disegna; le tessere che si incastrano con i richiami.
- **Movimento:** solo transform e opacity, solo a schermo e senza «riduci movimento». Gli stati nascosti dipendono
  da `.moto`, che `main.js` aggiunge per ultima: senza JavaScript nulla resta nascosto.
- **Marchio:** `#marchio` è il simbolo del kit trasformato in path: non si modifica. Corpo `--logo` 18/20px, cioè 143/159px
  di larghezza (minimo 120px; sotto, l'icona «cp»). Spazio libero = altezza della pillola «Lab». Verde su chiaro, crema
  su verde; mai deformato, ruotato o ricolorato; sempre «CP Studio Lab». In stampa il logo resta intero, pillola compresa.
- **Contenuti:** voi, poche parole, le parole delle officine; esempi sempre dichiarati «Esempio»; niente clienti,
  numeri o recensioni inventati.
