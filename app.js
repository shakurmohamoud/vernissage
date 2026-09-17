// jag vill hämta 12 konstverk från Art Institute of Chicago
// jag behöver id, titel, konstnär och bild-id för varje verk
// funktionen ska returnera listan så jag kan rita ut den sen

const API_URL = "https://api.artic.edu/api/v1/artworks"
const FALT = "id,title,artist_title,image_id"

async function hamtaKonstverk() {
  const svar = await fetch(`${API_URL}?limit=12&fields=${FALT}`)
  const data = await svar.json()
  return data.data
}

hamtaKonstverk().then(console.log)