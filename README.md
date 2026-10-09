# Vernissage

Konstverk från samlingen på Cleveland Museum of Art

## Om sidan

Startsidan visar tolv målningar från museets samling. Klickar man på ett verk kommer man till en detaljsida med större bild och fakta om verket

## Teknik

- Ren JavaScript och inga ramverk
- Fetch API för alla anrop
- Cleveland Museum of Art Open Access API

## Om valet av API

Jag testade först Art Institute of Chicago och sen Metropolitan Museum of Art. Båda finns på listan över Public APIs men ingen av dem fungerade. Art Institute stoppade alla bilder och Met stängde av mig efter några omladdningar

Cleveland Museum of Art finns inte på listan men är ett öppet museiAPI som de andra. Det behöver ingen nyckel. Det stoppar inget och ger hela verket i ett anrop

## Så här hämtas datan

Sidan gör två anrop som slås ihop:

1. Startsidan hämtar tolv målningar i ett anrop
2. Detaljsidan läser verkets nummer från adressfältet och hämtar det verket

## Köra sidan lokalt

Sidan behöver en lokal server för att anropen ska fungera:

    python3 -m http.server 5500

Öppna sedan http://localhost:5500 i webbläsaren

## Om AI-verktyg

Koden är skriven prompt för prompt. Varje önskemål står som en kommentar i filerna direkt ovanför koden den gäller. På detta vis går det att följa hur sidan växte fram
