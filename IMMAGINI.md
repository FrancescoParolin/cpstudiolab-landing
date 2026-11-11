# Immagini del sito

Quattro immagini, generate con Higgsfield l'11 novembre 2026. Paro le ha viste dentro il sito, a 1440 e a 375px, e ha
dato il via libera lo stesso giorno: vanno online con la pull request del ramo `paro/percorso-richiesta`.
Mostrano la materia dello studio (carta millimetrata, carta da lucido, cartoncino), non l'officina del cliente.
Niente testo, numeri, persone, mani, utensili o schermi.

I ritratti dei soci in «Lo studio» non fanno parte di questa serie: saranno foto vere, mai generate. I due riquadri
sono pronti e restano spenti finché mancano i file (vedi `DA_FORNIRE.md`).

Ne erano previste al massimo sei. Ne bastano quattro:

- **`/manifattura/`** ha già la tavola dell'albero tornito in apertura: nessuna immagine.
- **`/studio/`** ha già in apertura il cartiglio «CP Studio Lab · Lo studio in breve», e più sotto il simbolo quotato
  delle due tessere. La testata prevista (due cartoncini arrotondati) avrebbe ripetuto in fotografia lo stesso segno.

## Elenco

| File | Dove | Spazio misurato | Formato |
|---|---|---|---|
| `hero-486.webp`, `hero-972.webp` | Pagina principale, apertura: colonna destra da 1100px, sotto testo e bottoni prima | 486×486 a 1440px · 418×418 a 1100px · 343×257 a 375px (ritaglio 4:3 fatto dal CSS) | generata 4:5, esportata 1:1 |
| `testata-servizi-1200.webp`, `-2400.webp` | `/servizi/`, sotto titolo, testo e bottoni | 1200×514 a 1440px · 343×147 a 375px | 21:9 |
| `testata-metodo-1200.webp`, `-2400.webp` | `/metodo/`, sotto titolo, testo e bottoni | 1200×514 a 1440px · 343×147 a 375px | 21:9 |
| `campo-verde-1440.webp` | Fondo dei fogli verdi: «Il punto», «Metodo» (pagina principale), ogni «Contatto» | blocchi larghi quanto lo schermo, alti 870-1100px a 1440px e 1000-1300px a 375px | generata 16:9, ritagliata 1440×1100 |

**Perché l'immagine dell'apertura è quadrata e non 4:5.** A 1440px la colonna di sinistra (titolo su tre righe, testo,
bottoni) è alta 450px. Con l'immagine 4:5 (486×608) l'apertura arrivava a 800px e la striscia «Per settore» usciva
dalla prima schermata; quadrata (486×486) l'apertura è alta 678px e la striscia resta visibile a 1440×900.
L'originale è 4:5: se serve tornare indietro basta cambiare un numero in `prepara-immagini.py` e in `style.css`.

## Pesi

| File | Misure | Peso |
|---|---|---|
| `hero-486.webp` | 486×486 | 6 KB |
| `hero-972.webp` | 972×972 | 23 KB |
| `testata-servizi-1200.webp` | 1200×514 | 5 KB |
| `testata-servizi-2400.webp` | 2400×1029 | 15 KB |
| `testata-metodo-1200.webp` | 1200×514 | 9 KB |
| `testata-metodo-2400.webp` | 2400×1029 | 39 KB |
| `campo-verde-1440.webp` | 1440×1100 | 20 KB |

Tutte WebP qualità 82, molto sotto i limiti (220 KB per hero e testate, 150 KB per il campo verde).

## Testi alternativi

- hero: «Fogli di carta millimetrata e da lucido sovrapposti, con due tessere di cartoncino al centro.»
- testata servizi: «Cinque cartoncini di misure diverse in fila, uno verde.»
- testata metodo: «Tre fogli di carta da lucido sovrapposti in sequenza.»
- campo verde: è uno sfondo, non ha testo alternativo.

## Generazione

Modello `gpt_image_2_6`, `resolution: "2k"`, `quality: "medium"`, `output_format: "png"`, tre varianti per soggetto
(`count: 3`). Nessun progetto né cartella su Higgsfield. Colori letti da `style.css`: verde `#1F4D3F` (`--accento`),
crema `#F4F1EA` (`--crema`).

### hero · 4:5 · 1792×2240

```
Editorial design studio still life, shot from directly above. Several sheets of matte graph paper and translucent
tracing paper layered with slight offsets on a warm cream desk surface (hex #F4F1EA), one sheet of deep forest green
card (hex #1F4D3F) partly covered by the tracing paper, two softly rounded square shapes cut from card overlapping
near the centre, natural side light from the left, long soft shadows, generous empty cream space at the top and
bottom of the frame so the composition survives a horizontal crop, muted palette of deep forest green #1F4D3F, warm
cream #F4F1EA and neutral grey only, very fine grain, calm and precise, no text, no numbers, no logos, no hands,
no tools, no screens.
```

| Variante | Lavoro su Higgsfield | Esito |
|---|---|---|
| a | `6f7c2199-ff64-4e35-a865-67a52260b54e` | scartata: la seconda tessera è grigia, sembra metallo o pietra; il marchio è verde e crema |
| b | `1d61c04c-3928-43d3-b237-6554e1f72e84` | scartata: i fogli arrivano vicino ai bordi e uno è storto; nel riquadro quadrato resta poca aria |
| **c** | `addfdd18-dd63-462c-9fb2-9d5f31cdb2e6` | **scelta**: la più ordinata, tessere verde e crema, margini larghi; regge il ritaglio 4:3 su telefono |

### campo-verde · 16:9 · 2688×1520

```
Editorial design studio still life. Extreme close-up of deep forest green matte paper (hex #1F4D3F) with a faint
embossed grid of fine lines, natural light raking from the upper left and falling off into shadow on the right,
almost uniform surface, enormous negative space, very fine grain, no text, no objects, no people.
```

| Variante | Lavoro su Higgsfield | Esito |
|---|---|---|
| a | `be2bf4d2-8c05-4954-bf75-4a46c4d991c6` | scartata: quadri grandi, la griglia si legge come piastrelle |
| b | `1f1bf809-35de-4e4e-bb28-b9a4670490a8` | scartata: griglia marcata e luce forte in alto a sinistra, si percepisce un'immagine |
| **c** | `f5ec84c4-1f4d-4bd5-9d3e-73679546858a` | **scelta**: griglia più fitta e più tenue, la più vicina alla carta millimetrata del sito |

### testata-servizi · 21:9 · 2688×1152

```
Editorial design studio still life, wide horizontal composition, shot from above. Five matte card rectangles of
different sizes laid out in an ordered row, one of them deep forest green (hex #1F4D3F), on a warm cream desk
surface (hex #F4F1EA), deep forest green and cream only, natural side light from the left, long soft shadows, wide
empty margins, very fine grain, calm and precise, no text, no numbers, no logos, no hands, no tools, no screens.
```

Chieste tre varianti, Higgsfield ne ha prodotte e addebitate due.

| Variante | Lavoro su Higgsfield | Esito |
|---|---|---|
| a | `e31c60c7-4eea-4f10-9425-0b6292c79294` | scartata: i cartoncini calano da sinistra a destra, sembra un grafico in discesa |
| **b** | `30245a1e-d8b7-4217-86f3-4416e508dfd6` | **scelta**: cinque misure senza un ordine che si legga come un andamento |

### testata-metodo · 21:9 · 2688×1152

```
Editorial design studio still life, wide horizontal composition, shot from above. Three sheets of tracing paper
overlapping in sequence from left to right, each slightly more opaque than the last, on a warm cream desk surface
(hex #F4F1EA), deep forest green (hex #1F4D3F) and cream only, natural side light from the left, long soft shadows,
wide empty margins, very fine grain, calm and precise, no text, no numbers, no logos, no hands, no tools, no screens.
```

| Variante | Lavoro su Higgsfield | Esito |
|---|---|---|
| a | `73b8f7a8-d656-4e68-a2a2-0ed01300720f` | scartata: fogli ruotati e in prospettiva, ombre della finestra troppo forti |
| b | `36b69cc2-52d3-41cd-a258-796753662669` | scartata: il foglio di mezzo è verde acqua, un colore che il sito non ha |
| **c** | `a1ee17ad-ec16-49d0-a431-a41524569c46` | **scelta**: tre fogli in fila, ognuno un po' più opaco, come le tre fasi |

### Crediti

| Soggetto | Varianti | Crediti |
|---|---|---|
| hero | 3 | 3 |
| campo-verde | 3 | 3 |
| testata-servizi | 2 | 2 |
| testata-metodo | 3 | 3 |
| **Totale** | 11 | **11** su un tetto di 35 |

Saldo: 100 prima, 89 dopo. Nessuna rigenerazione, nessuna rifinitura a qualità `high`.

## Preparazione dei file

`python3 immagini-originali/prepara-immagini.py` rifà tutti i file di `immagini/` dagli originali. Serve solo Pillow.

1. **Armonizzazione, uguale per ogni file.** Una curva per canale con tre ancore misurate sugli originali: il nero
   va verso il verde del sito, il verde dei cartoncini (43, 67, 54) diventa `--accento` (31, 77, 63), la crema del
   piano (231, 221, 210) diventa `--crema` (244, 241, 234). Dopo, il fondo delle tre fotografie è `#F2EEE9`,
   `#F4F1EB` e `#F5F3E8`: una serie.
2. **Ritaglio** alla misura dello spazio nel sito, poi WebP qualità 82 in versione 1x e 2x (`srcset`).
3. **Solo per il campo verde.** Via il 30% a sinistra, dove la luce è più chiara. Dell'immagine resta il chiaroscuro
   (grana, griglia, luce che cala a destra); la tinta è quella del marchio, con il tono medio esattamente su
   `#1F4D3F`, e le luci compresse a metà. Nel sito sta sopra il verde pieno al 40% (`--materia` in `style.css`).

**Contrasto sul campo verde**, misurato sul file finale nella zona più chiara (zone di 4px): il fondo arriva al
massimo a `#255345`. Crema `#F4F1EA` 7,7:1, crema tenue `#B9C4BC` 4,8:1. Sul verde pieno erano 8,5:1 e 5,3:1.
Tutti i testi restano AA.

## Dove sono gli originali

`immagini-originali/` non va online (`prepara.sh` copia solo `immagini/*.webp`) e i PNG non sono in git: pesano
5-8 MB l'uno. Sono in locale in `immagini-originali/varianti/`, e restano su Higgsfield: con l'identificativo del
lavoro si riscaricano.
