#!/bin/sh
# Prepara la cartella da pubblicare: solo i file del sito, niente note interne (.md) né .git.
# Lo usano Netlify (netlify.toml) e la pubblicazione a mano: sh prepara.sh, poi si pubblica dist/.
set -e
cd "$(dirname "$0")"
rm -rf dist
mkdir -p dist/fonts
# 404.html: Netlify la mostra da sola per ogni indirizzo che non esiste
cp index.html privacy.html grazie.html 404.html style.css main.js robots.txt sitemap.xml site.webmanifest \
   favicon.ico favicon-32.png apple-touch-icon.png icon-192.png icon-512.png og-image.png dist/
cp fonts/*.woff2 fonts/*.txt dist/fonts/
# le immagini (WebP già pronte: le prepara immagini-originali/prepara-immagini.py). Originali e prove restano fuori
mkdir -p dist/immagini
cp immagini/*.webp dist/immagini/
# pagina dei servizi, pagina di settore con i suoi segmenti (/manifattura/<segmento>/), le pagine dei contatti, dello studio e del metodo, il sito d’esempio
for cartella in servizi manifattura manifattura/tornitura manifattura/fresatura-cnc manifattura/carpenteria-saldatura \
                manifattura/lamiera manifattura/stampaggio contatti studio metodo esempio; do
  mkdir -p "dist/$cartella"
  cp "$cartella"/*.html "dist/$cartella/"
done
cp esempio/officina.css dist/esempio/
# loghi dei clienti, quando ci sono
if [ -d clienti ]; then mkdir -p dist/clienti && cp clienti/* dist/clienti/; fi

# I ritratti dei soci, tra le righe <!-- ritratti --> e <!-- /ritratti --> di index.html: foto vere, mai generate.
# Quando in immagini/ ci sono tutte e due, i riquadri si accendono da soli (via i commenti «foto» attorno agli <img>).
# Finché ne manca una, online il blocco non c'è; nelle anteprime i due riquadri restano, vuoti.
if [ -f immagini/socio-tommaso.jpg ] && [ -f immagini/socio-francesco.jpg ]; then
  cp immagini/socio-tommaso.jpg immagini/socio-francesco.jpg dist/immagini/
  sed 's/<!-- foto \(<img[^>]*>\) -->/\1/' dist/index.html > dist/index.tmp
  mv dist/index.tmp dist/index.html
elif [ "$CONTEXT" != "deploy-preview" ] && [ -z "$ANTEPRIMA" ]; then
  sed '/<!-- ritratti -->/,/<!-- \/ritratti -->/d' dist/index.html > dist/index.tmp
  mv dist/index.tmp dist/index.html
fi

# Le parti in bozza, tra le righe <!-- bozza --> e <!-- /bozza --> di index.html, si vedono solo nelle anteprime:
# Netlify mette CONTEXT=deploy-preview in quelle delle pull request; a mano: ANTEPRIMA=1 sh prepara.sh.
# Per la versione online vengono tolte, e se resta un segnaposto giallo (da-compilare) o un esempio
# da sostituire (data-segnaposto, come le recensioni inventate) ci si ferma qui.
if [ "$CONTEXT" != "deploy-preview" ] && [ -z "$ANTEPRIMA" ]; then
  inizi=$(grep -c '<!-- bozza -->' dist/index.html || true)
  fini=$(grep -c '<!-- /bozza -->' dist/index.html || true)
  if [ "$inizi" != "$fini" ]; then
    echo "Fermo: in index.html le righe <!-- bozza --> e <!-- /bozza --> non sono in coppia."
    exit 1
  fi
  sed '/<!-- bozza -->/,/<!-- \/bozza -->/d' dist/index.html > dist/index.tmp
  mv dist/index.tmp dist/index.html
  if grep -rl --include='*.html' -e 'class="da-compilare"' -e 'data-segnaposto[ >=]' dist; then
    echo "Fermo: nelle pagine qui sopra c'è ancora un segnaposto o un esempio da sostituire."
    exit 1
  fi
  [ "$inizi" = 0 ] || echo "tolte $inizi parti in bozza (si vedono solo nelle anteprime)"
fi
echo "dist/ pronta: $(find dist -type f | wc -l | tr -d ' ') file"
