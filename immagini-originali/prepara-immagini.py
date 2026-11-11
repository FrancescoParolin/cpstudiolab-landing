#!/usr/bin/env python3
"""Prepara le immagini del sito a partire dagli originali di Higgsfield (vedi IMMAGINI.md).

Uso:  python3 immagini-originali/prepara-immagini.py            → scrive in immagini/
      python3 immagini-originali/prepara-immagini.py --prove    → scrive tutte le varianti in immagini/prove/

Per ogni file: la stessa armonizzazione (una curva per canale, uguale per tutti: è ciò che le fa sembrare
una serie), il ritaglio alla misura dello spazio nel sito, WebP qualità 82 in versione 1x e 2x.
Serve solo Pillow (pip install pillow). Gli originali non vanno online: prepara.sh copia solo immagini/.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageStat

QUI = Path(__file__).resolve().parent
SITO = QUI.parent
QUALITA = 82


def curva(punti):
    """Curva a tratti per un canale: [(ingresso, uscita), ...] da 0 a 255."""
    lut = []
    for i in range(256):
        for (x0, y0), (x1, y1) in zip(punti, punti[1:]):
            if x0 <= i <= x1:
                lut.append(round(y0 + (y1 - y0) * (i - x0) / (x1 - x0)))
                break
    return lut


# Armonizzazione, uguale per ogni file. Tre ancore misurate sugli originali:
#   nero            → verso il verde del sito (le ombre non restano nere né calde)
#   verde dei cartoncini (43, 67, 54)  → --accento #1F4D3F (31, 77, 63)
#   crema del piano  (231, 221, 210)   → --crema   #F4F1EA (244, 241, 234)
ARMONIZZA = (
    curva([(0, 8), (43, 31), (231, 244), (255, 252)])
    + curva([(0, 20), (67, 77), (221, 241), (255, 252)])
    + curva([(0, 16), (54, 63), (210, 234), (255, 250)])
)


def ritaglia(im, rapporto, ancora=(0.5, 0.5), finestra=None):
    """Ritaglio al rapporto larghezza/altezza chiesto. finestra = (sx, alto, dx, basso) in frazioni,
    applicata prima; ancora = punto che resta al centro del ritaglio, in frazioni."""
    if finestra:
        w, h = im.size
        im = im.crop((round(w * finestra[0]), round(h * finestra[1]), round(w * finestra[2]), round(h * finestra[3])))
    w, h = im.size
    if w / h > rapporto:
        nw = round(h * rapporto)
        x = round((w - nw) * ancora[0])
        return im.crop((x, 0, x + nw, h))
    nh = round(w / rapporto)
    y = round((h - nh) * ancora[1])
    return im.crop((0, y, w, y + nh))


VERDE = (31, 77, 63)  # --accento


def solo_materia(im):
    """Per il fondo dei fogli verdi: dell'immagine resta il chiaroscuro (grana, griglia, luce che cala),
    la tinta è quella del marchio. Il tono medio diventa esattamente --accento: sopra il verde pieno
    l'immagine aggiunge materia senza spostare il colore."""
    grigio = im.convert("L")
    medio = round(ImageStat.Stat(grigio).median[0])
    # le luci si comprimono a metà: sopra il verde pieno il fondo può scurire quanto vuole, ma schiarire poco,
    # o i testi secondari (crema tenue) scendono sotto il contrasto AA
    grigio = grigio.point([v if v <= medio else round(medio + (v - medio) * 0.5) for v in range(256)])
    chiaro = tuple(min(255, round(c * 255 / medio)) for c in VERDE)
    return ImageOps.colorize(grigio, black=(0, 0, 0), white=chiaro, mid=VERDE, midpoint=medio)


def esporta(origine, nome, larghezze, rapporto, cartella, materia=False, **ritaglio):
    im = Image.open(origine).convert("RGB").point(ARMONIZZA)
    im = ritaglia(im, rapporto, **ritaglio)
    if materia:
        im = solo_materia(im)
    for larghezza in larghezze:
        altezza = round(larghezza / rapporto)
        uscita = cartella / f"{nome}-{larghezza}.webp"
        im.resize((larghezza, altezza), Image.LANCZOS).save(uscita, "WEBP", quality=QUALITA, method=6)
        print(f"{uscita.relative_to(SITO)}  {larghezza}×{altezza}  {uscita.stat().st_size / 1024:.0f} KB")


# Le immagini scelte: nome del file online → (variante, larghezze 1x e 2x, rapporto, ritaglio)
# hero: colonna destra dell'apertura, 486×486px a 1440 (generata 4:5, ritagliata 1:1 al centro);
#       sotto i 1100px lo stesso file è ritagliato 4:3 dal CSS
# testate: larghe quanto il contenitore, 1200px (21:9)
# campo-verde: fondo dei fogli verdi; via il 30% a sinistra, dove la luce è troppo chiara per i testi (AA)
SCELTE = {
    "hero": ("hero-c", (486, 972), 1, {}),
    "testata-servizi": ("testata-servizi-b", (1200, 2400), 21 / 9, {}),
    "testata-metodo": ("testata-metodo-c", (1200, 2400), 21 / 9, {}),
    "campo-verde": ("campo-verde-c", (1440,), 1440 / 1100, {"finestra": (0.30, 0, 1, 1), "materia": True}),
}


def main():
    prove = "--prove" in sys.argv
    cartella = SITO / "immagini" / ("prove" if prove else "")
    cartella.mkdir(parents=True, exist_ok=True)
    if prove:
        for origine in sorted((QUI / "varianti").glob("*.png")):
            base = origine.stem.rsplit("-", 1)[0]
            _, larghezze, rapporto, ritaglio = SCELTE[base]
            esporta(origine, origine.stem, larghezze[-1:], rapporto, cartella, **ritaglio)
        return
    for nome, (variante, larghezze, rapporto, ritaglio) in SCELTE.items():
        origine = QUI / f"{variante}.png"
        if not origine.exists():
            origine = QUI / "varianti" / f"{variante}.png"
        esporta(origine, nome, larghezze, rapporto, cartella, **ritaglio)


if __name__ == "__main__":
    main()
