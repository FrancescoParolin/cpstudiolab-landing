# Video in apertura: prova

Idea di Campa: un video di 5-7 secondi nell'apertura, a blocchi stilizzati, in cui un drone entra in una capanna
e dentro ci sono i due soci al computer. Paro ha visto la prova e l'11 novembre 2026 ha detto di metterlo:
**ora è nell'apertura della pagina principale**, nel ramo `paro/percorso-richiesta`. Online ci va con la pull request.

## Il posto (inventato)

Paro non aveva un posto in mente. Proposta: **lo studio in miniatura, fatto di cartoncino**.

- Una casetta di cartoncino crema con il tetto verde, su una collina fatta di fogli verdi sovrapposti, tagliati come
  le curve di livello di una carta. Richiama le colline sopra Bassano senza ritrarre un luogo preciso.
- Dentro: un banco lungo, due figure a blocchi sedute una accanto all'altra, ognuna al suo computer. Senza volto:
  sono «noi due», non due ritratti.
- Sulla parete di fondo due tessere di cartoncino sovrapposte, una verde e una crema: il segno del marchio, non il logo.

Perché così: le immagini già nel sito sono carta millimetrata, carta da lucido e cartoncino, negli stessi verde
`#1F4D3F` e crema `#F4F1EA`. Un mondo di cartoncino è «a blocchi» come lo voleva Campa e resta lo stesso sito.

Il drone non si vede: **la camera è il drone**. Una ripresa sola, dall'alto fin dentro la porta. È il movimento che
i modelli video fanno meglio, e chi guarda entra nello studio.

## Come si costruisce

1. Immagine di partenza: la casetta vista dall'alto, con la porta aperta.
2. Immagine finale: l'interno con le due figure. È quella che resta ferma nel sito a video finito.
3. Video: il modello riempie il movimento tra le due immagini.

Regole prese dalle guide (sono consigli di chi usa questi modelli, non documentazione ufficiale):

- l'immagine fissa l'aspetto, il prompt del video descrive **solo il movimento**, senza ridescrivere la scena;
- il percorso della camera si scrive come una lista di azioni in ordine, non con aggettivi;
- per un passaggio in una porta: avanzare, i bordi che scorrono vicini ai due lati, sbucare dall'altra parte;
- chiudere con «one continuous take»; fare più prove e tenere la migliore.

## Prompt

### 1. Immagine di partenza · 1:1

```
Miniature papercraft diorama photographed from a high three-quarter aerial angle, as seen from a small drone
approaching. A small cabin built from matte cream cardstock (hex #F4F1EA) with a deep forest green pitched roof
(hex #1F4D3F) stands on a hill made of stacked layers of green card, cut like the contour lines of a map. The cabin's
front door is wide open and faces the camera; warm light glows inside. A few simple cone trees of folded green card,
a path of cream paper leading to the door. Plain warm cream paper background, wide empty margins. Deep forest green,
warm cream and neutral grey only. Soft natural light from the left, long soft shadows, tilt-shift miniature look,
very fine paper grain, calm and precise. No text, no numbers, no logos, no people, no vehicles.
```

### 2. Immagine finale · 1:1 · con l'immagine di partenza come riferimento

```
Same miniature papercraft world and materials as the reference image: the interior of the small cardstock cabin,
seen from just inside the doorway at eye level. One long desk of cream card across the room; two simple faceless
figures made of rounded cardstock blocks sit side by side on stools, seen from behind at a three-quarter angle, each
working at a small open laptop made of grey card with a blank screen. Deep forest green walls (hex #1F4D3F), cream
floor (hex #F4F1EA), one window on the left letting in soft natural light, long soft shadows. On the back wall two
softly rounded square shapes of card, one green and one cream, overlap like a sign. Deep forest green, warm cream and
neutral grey only, tilt-shift miniature look, very fine paper grain, calm and precise. No text, no numbers, no logos,
no faces.
```

### 3. Video · 5 secondi · 1:1 · 720p · senza audio · prima immagine = inizio, seconda = fine

```
One continuous FPV drone take from the first frame to the last frame, no cuts. The camera glides down from the high
view toward the paper cabin, lines up with the open front door, slows, passes through the doorway with the door frame
sliding past close on both sides, and comes to rest inside, facing the two figures at the desk. Smooth, steady flight
that eases to a stop exactly on the last frame. Nothing else moves except a slight sway of the paper trees. Keep the
matte cardstock look and the green and cream palette. No text, no logos, silent. One continuous take.
```

Impostazioni: immagini con `gpt_image_2_6`, `2k`, `medium`, `png`, tre varianti. Video con `seedance_2_0_mini`,
`720p`, `generate_audio: false`, una prova alla volta.

## Costi misurati (11 novembre 2026)

| Cosa | Crediti |
|---|---|
| Tre varianti di un'immagine | 3 |
| Una prova di video, 6 secondi, modello economico (`seedance_2_0_mini` o `grok_video_v15_lite`) | 6 |
| Una prova di video, 6 secondi, modello migliore (`seedance_2_5`) | 42 |

## Fatto finora

Due immagini ferme e due prove di video. Originali e prove sono in `immagini-originali/varianti/` e in `anteprime/`,
fuori da git; nel sito ci sono solo i file preparati (vedi «Com'è nel sito»).

### Immagini

| Immagine | Variante | Lavoro su Higgsfield | Esito |
|---|---|---|---|
| inizio | a | `2b9e9581-d43c-4574-ac58-ddbef41701b1` | scartata: scalini e libreria, più dettagli da sbagliare nel movimento |
| inizio | b | `6d6e6dc6-6bf5-4c21-b12c-f7bc91539acc` | usata per la prima prova, poi corretta (vedi sotto) |
| inizio | c | `aaaf26a4-8218-41f5-aafe-4c8f92432d5d` | scartata: la porta copre metà dell'ingresso |
| fine | **a** | `b7e86183-60f8-4c6b-b013-c14732678344` | **scelta**: una figura verde e una crema, come le due tessere del marchio |
| fine | b | `318cfcd8-8b73-4737-aad8-f7fafc2cf198` | riserva: due figure uguali, fuori dalla finestra si vede la collina |
| fine | c | `59b5118f-4d84-4988-97ab-5a9f7a1b35fa` | riserva: come la b, senza tappeto |
| inizio corretto | a | `b6080042-a24a-489a-bffc-0a1b0ce92db8` | scartata: la casetta cambia angolo rispetto all'originale |
| inizio corretto | **b** | `7bb0f60e-b7f4-4da6-9deb-21c91977201a` | **scelta**: uguale all'inizio b, ma dalla porta si vede già la stanza finale |
| inizio corretto | c | `f5b5abb0-bb05-4782-8d46-4e6b9d484735` | riserva: la porta copre una delle due figure |

L'immagine finale è nata con l'inizio b come riferimento: stesso cartoncino, stessi colori.

### Video

| Prova | Lavoro su Higgsfield | Inizio → fine | Esito |
|---|---|---|---|
| 1 | `1ab5db80-c828-4d68-89b4-26d86f7f150e` | inizio b → fine a | movimento giusto, ma a 3,0 secondi la stanza cambia di colpo: dalla porta si vedeva una scrivania con la lampada, poi compaiono le due figure |
| **2** | `d012ccff-e44d-4369-b749-cb1241f14bda` | inizio corretto b → fine a | **buona**: una ripresa sola, nessun salto, si ferma sull'immagine finale |

Cosa ha insegnato la prima prova: le due immagini devono raccontare **la stessa stanza**. Se dalla porta, all'inizio,
si vede un interno diverso da quello finale, il modello è costretto a trasformarlo a metà strada. Corretta l'immagine
di partenza (prompt qui sotto), il salto è sparito. Al prompt del video è stata aggiunta una frase:
«The room seen through the door is the same room from start to end: it only grows larger as the camera approaches,
nothing in it changes or appears.»

Prompt della correzione (con inizio b e fine a come riferimenti):

```
Edit the first reference image and keep everything exactly as it is: same paper cabin, same green layered hill, same
trees, same path, same camera angle, same light and background. Change only what is visible through the open front
door: instead of the small table and lamp, show the room from the second reference image, tiny and seen from outside:
deep forest green walls, a long cream desk, and the two small block figures sitting side by side with their backs to
the door, one green and one cream. Keep the windows softly lit. Matte cardstock, very fine paper grain. No text, no
numbers, no logos, no faces.
```

La terza prova non è stata fatta: la seconda basta.

### Il file

Originale: 960×960, 24 fotogrammi al secondo, 5,04 secondi, 3,4 MB. Ricodificato in H.264:

| Lato | Peso |
|---|---|
| 720px, 1,1 Mbit al secondo | **674 KB** |
| 720px, 0,8 Mbit al secondo | 491 KB |
| 600px, 0,8 Mbit al secondo | 487 KB |

Nel riquadro dell'apertura (486px, 972 sugli schermi densi) regge la versione da 674 KB. Immagine finale: 39 KB.

Per vederlo dentro la pagina, in locale: `http://localhost:8137/anteprime/prova-video.html`. È una pagina di prova
che mostra la pagina principale e scambia l'immagine dell'apertura con il video; un clic sul video lo fa ripartire.

### Spesa

| Cosa | Crediti |
|---|---|
| Immagine di partenza, tre varianti | 3 |
| Immagine finale, tre varianti | 3 |
| Prima prova di video | 5 |
| Immagine di partenza corretta, tre varianti | 3 |
| Seconda prova di video | 5 |
| **Video in apertura, totale** | **19** |

Con gli 11 delle immagini del sito fanno **30 su 35**. Saldo: 70.

## Com'è nel sito

File in `immagini/`:

| File | Cosa | Peso |
|---|---|---|
| `apertura.mp4` | il video: 720×720, H.264, 24 fotogrammi al secondo, 4,9 secondi, senza audio | 657 KB |
| `apertura-inizio-486/720/972.webp` | l'immagine da cui il video parte (il suo primo fotogramma) | 14 / 25 / 42 KB |
| `apertura-fine-486/720/972.webp` | l'immagine su cui finisce (dall'originale, più nitida del fotogramma) | 15 / 27 / 45 KB |

Come si comporta (`index.html`, `main.js`, `style.css`):

- **Computer da 1100px, movimento non ridotto**: si vede subito l'immagine di partenza. A pagina caricata `main.js`
  scarica il video e lo mette sopra; quando comincia a girare compare. Gira **una volta sola** e resta fermo
  sull'ultimo fotogramma. Dura meno di 5 secondi, quindi non serve un tasto di pausa.
- **Telefono, tablet stretto, «riduci movimento»**: solo l'immagine finale. Il video non viene nemmeno scaricato.
- **Chi ha chiesto di risparmiare dati, o senza JavaScript**: resta l'immagine (di partenza su computer, finale altrove).
- Se il browser non fa partire il video, resta l'immagine: nessun riquadro vuoto.
- L'immagine ha il testo alternativo; il video è nascosto ai lettori di schermo, perché dice la stessa cosa.

Colore: il video usciva con il fondo color pesca. `immagini-originali/colore-video.py` lo porta sulla crema del sito
con una curva per canale, come per le altre immagini: verde di tetto e pareti (43, 64, 53) → `--accento`,
fondo (238, 208, 185) → `--crema`. La stessa curva vale per il video e per le due immagini.

Per rifare i file dall'originale (serve solo un Mac: AVFoundation e Core Image, niente ffmpeg):

```
python3 immagini-originali/colore-video.py cubo /tmp/cubo.bin
swiftc -O -o /tmp/prepara-video immagini-originali/prepara-video.swift
/tmp/prepara-video immagini-originali/varianti/video-prova-2.mp4 immagini/apertura.mp4 /tmp/cubo.bin 720 1100000 4.9
python3 immagini-originali/colore-video.py immagine immagini-originali/varianti/video-prova-2-primo-fotogramma.png immagini/apertura-inizio 486 720 972
python3 immagini-originali/colore-video.py immagine immagini-originali/varianti/video-fine-a.png immagini/apertura-fine 486 720 972
```

L'immagine di carta che c'era prima nell'apertura (`hero-486.webp`, `hero-972.webp`) è rimasta in `immagini/` ma non
è più usata: si può riusare altrove o togliere.

Lighthouse mobile in locale, sulla versione da pubblicare: 93-94 · 100 · 100 · 100, come prima del video
(su telefono il video non si carica). Da rimisurare su Netlify.

## Fonti delle guide

- Scenario, «Seedance 2.0: The Complete Guide»: https://help.scenario.com/articles/7140699840-seedance-2-0-the-complete-guide
- Morphed, «Seedance 2.0 Image-to-Video Guide»: https://morphed.app/blog/seedance-2-0-image-to-video
- RunDiffusion, «Seedance 2.0 Prompt Guide»: https://www.rundiffusion.com/seedance-2-0-prompt-guide
- Flick, «Seedance 2.0 and 2.5 Prompts from Real Films»: https://flick.art/tools/seedance-prompts
- Morphic, «AI FPV flight effect»: https://morphic.com/resources/vfx/fpv-flight-effect
- Morphic, «Drone shot prompt library»: https://morphic.com/resources/prompts/drone-shot-prompts
