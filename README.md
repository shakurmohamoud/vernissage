# Vernissage

Konstverk från samlingen på Metropolitan Museum of Art

Inlämningsuppgift i kursen JavaScript, HTML och CSS - FSU25D, Medieinstitutet

## Om sidan

Startsidan visar tolv konstverk från museets samling av europeiskt måleri. Klickar man på ett verk kommer man till en detaljsida med större bild och fakta om verket

## Teknik

- Ren JavaScript, inga ramverk
- Fetch API för alla anrop
- Metropolitan Museum of Art Collection API

## Så här hämtas datan

Sidan gör två anrop som slås ihop:

1. Startsidan hämtar en lista med id-nummer och sen varje verk för sig
2. Detaljsidan läser verkets id från adressfältet och hämtar det verket

## Köra sidan lokalt

Sidan behöver en lokal server för att anropen ska fungera:

    python3 -m http.server 5500

Öppna sedan http://localhost:5500 i webbläsaren

## Om AI-verktyg

Koden är skriven prompt för prompt. Varje önskemål står som en kommentar i filerna, direkt ovanför koden den gäller. På detta vis går det att följa hur sidan växte fram
