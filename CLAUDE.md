# CP Studio Lab — landing

Landing statica di CP Studio Lab (Tommaso Campagnolo e Francesco Parolin): HTML, CSS, un piccolo `main.js`.
Nessun build, nessuna libreria, nessuna richiesta a server esterni. Online su Netlify da `main`.

## Lavoro
- Mai commit su `main`: un ramo `paro/…` o `campa/…`, poi pull request. Netlify fa l'anteprima della PR.
- Prima della PR: pagina in locale (`python3 -m http.server 8123`), a 390px e a 1440px, console senza errori,
  nessuno scorrimento orizzontale da 320 a 1920px.
- `sh prepara.sh` crea `dist/` (quello che va online). Le note `.md` non si pubblicano.

## Testi
- Pubblico: titolare o commerciale di una PMI metalmeccanica o di subfornitura. Si dà del **voi**.
- Poche parole, concrete: frasi brevi ma intere. Le loro parole: preventivo, lavorazioni, disegno allegato, conto terzi.
- Niente inglese dove c'è l'italiano, niente parole da agenzia («soluzioni», «innovativo», «engagement»).
- Mai clienti, numeri, lavori o recensioni inventati. Gli esempi si dichiarano «Esempio».
- Lo studio vende servizi digitali; l'analisi è solo la fase 10 del metodo.

## Design e codice
- Ogni valore passa dai token in `:root` di `style.css` (colori del kit F, spazi multipli di 8, `--scarto` 4px).
  Riassunto in `DESIGN_SYSTEM.md`; il design system completo è un Artifact di Francesco.
- Caratteri: Inter per parlare, Geist Mono per annotare (cifre da Inter). Accenti con il peso leggero, mai il corsivo.
- Movimento solo con `transform` e `opacity`; gli stati nascosti dipendono da `.moto`; con «riduci movimento» nulla si muove.
  Niente `vector-effect` sui disegni animati: i tratti sono in unità del disegno (`--tratto`).
- Accessibilità AA: contrasti, fuoco sempre visibile, bersagli di almeno 24px, nessuna animazione infinita.
- Marchio (kit F): spazio libero = altezza della pillola «Lab», almeno 120px, verde su chiaro e crema su verde,
  mai deformato o ricolorato, sempre «CP Studio Lab».
- Dati ancora mancanti: `DA_FORNIRE.md` e i commenti `DA COMPILARE` nell'HTML.
