// jag vill hämta konstverk från Cleveland Museum of Art
// jag vill ha 12 målningar som har bild
// allt kommer i ett anrop, så jag behöver inte hämta varje verk för sig
// jag vill visa att sidan laddar medan verken hämtas

const API_URL = "https://openaccess-api.clevelandart.org/api/artworks"

async function hamtaKonstverk() {
  const svar = await fetch(`${API_URL}?limit=12&has_image=1&type=Painting`)
  const data = await svar.json()
  return data.data
}

// jag vill rita ut varje konstverk som ett kort med bild, titel och konstnär
// hela kortet ska vara en länk till detaljsidan med verkets nummer i adressen

function ritaKort(konstverk) {
  const lista = document.getElementById("lista")

  lista.innerHTML = konstverk.map(verk => `
    <a class="kort" href="detalj.html?id=${verk.accession_number}">
      <img src="${verk.images.web.url}" alt="${verk.title}">
      <h2>${verk.title}</h2>
      <p>${verk.creators[0]?.description || "Okänd konstnär"}</p>
    </a>
  `).join("")
}

function visaMeddelande(text) {
  const lista = document.getElementById("lista")
  lista.innerHTML = `<p class="meddelande">${text}</p>`
}

// jag vill starta sidan genom att hämta datan och sen rita ut den

async function start() {
  visaMeddelande("Hämtar konstverk…")

  try {
    const konstverk = await hamtaKonstverk()
    ritaKort(konstverk)
  } catch {
    visaMeddelande("Det gick inte att hämta samlingen. Försök igen om en stund.")
  }
}

start()