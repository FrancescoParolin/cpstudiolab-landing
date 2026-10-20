#!/bin/sh
# Prepara la cartella da pubblicare: solo i file del sito, niente note interne (.md) né .git.
# Lo usano Netlify (netlify.toml) e la pubblicazione a mano: sh prepara.sh, poi si pubblica dist/.
set -e
cd "$(dirname "$0")"
rm -rf dist
mkdir -p dist/fonts
cp index.html privacy.html grazie.html style.css main.js robots.txt sitemap.xml site.webmanifest \
   favicon.ico favicon-32.png apple-touch-icon.png icon-192.png icon-512.png og-image.png dist/
cp fonts/*.woff2 fonts/*.txt dist/fonts/
# pagine per lavorazione e sito d'esempio
for cartella in tornitura lamiera stampaggio carpenteria esempio; do
  mkdir -p "dist/$cartella"
  cp "$cartella"/*.html "dist/$cartella/"
done
cp esempio/officina.css dist/esempio/
echo "dist/ pronta: $(find dist -type f | wc -l | tr -d ' ') file"
