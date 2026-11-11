#!/usr/bin/env python3
"""Correzione di colore del video dell'apertura (vedi VIDEO_APERTURA.md): una curva per canale, come per le immagini.

Il video esce da Higgsfield con il fondo color pesca; nel sito il fondo è crema. Due ancore misurate sui fotogrammi:
    verde di tetto e pareti (43, 64, 53)   → --accento #1F4D3F (31, 77, 63)
    fondo di carta          (238, 208, 185) → --crema   #F4F1EA (244, 241, 234)

Uso:  python3 immagini-originali/colore-video.py cubo <file.bin>      → la tabella di colore per la ricodifica (33³, float)
      python3 immagini-originali/colore-video.py immagine <ingresso> <uscita senza estensione> <lato> [<lato> ...]
"""
import struct, sys
from PIL import Image

def curva(punti):
    lut = []
    for i in range(256):
        for (x0, y0), (x1, y1) in zip(punti, punti[1:]):
            if x0 <= i <= x1:
                lut.append(y0 + (y1 - y0) * (i - x0) / (x1 - x0))
                break
    return lut

CURVE = (
    curva([(0, 8), (43, 31), (238, 244), (255, 252)]),
    curva([(0, 20), (64, 77), (208, 241), (255, 252)]),
    curva([(0, 16), (53, 63), (185, 234), (255, 250)]),
)
LUT = [round(v) for c in CURVE for v in c]

def cubo(uscita, n=33):
    """Tabella per CIColorCube: n³ colori RGBA in float, il rosso cambia per primo."""
    def passa(c, v):
        x = v * 255
        i = min(254, int(x))
        return (CURVE[c][i] + (CURVE[c][i + 1] - CURVE[c][i]) * (x - i)) / 255
    with open(uscita, 'wb') as f:
        for b in range(n):
            for g in range(n):
                for r in range(n):
                    f.write(struct.pack('<4f', passa(0, r / (n - 1)), passa(1, g / (n - 1)), passa(2, b / (n - 1)), 1.0))

if __name__ == '__main__':
    if sys.argv[1] == 'cubo':
        cubo(sys.argv[2])
    else:
        im = Image.open(sys.argv[2]).convert('RGB').point(LUT)
        for lato in map(int, sys.argv[4:]):
            uscita = f'{sys.argv[3]}-{lato}.webp'
            im.resize((lato, lato), Image.LANCZOS).save(uscita, 'WEBP', quality=82, method=6)
            print(uscita)
