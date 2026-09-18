// jag vill hämta konstverk från Metropolitan Museum of Art
// listan ger bara id-nummer, jag måste hämta varje verk för sig
// jag vill ha 12 verk som har bild
// jag vill visa att sidan laddar medan verken hämtas

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1"

async function hamtaIdn() {
  const svar = await fetch(`${API_URL}/objects?departmentIds=11`)
  const data = await svar.json()
  return data.objectIDs
}

async function hamtaVerk(id) {
  const svar = await fetch(`${API_URL}/objects/${id}`)
  return await svar.json()
}

// jag vill plocka de första verken som har en bild
// jag hämtar fler än jag behöver eftersom några saknar bild

async function hamtaKonstverk() {
  const idn = await hamtaIdn()
  const forsta = idn.slice(0, 40)
  const alla = await Promise.all(forsta.map(hamtaVerk))
  return alla.filter(verk => verk.primaryImageSmall).slice(0, 12)
}

// jag vill rita ut varje konstverk som ett kort med bild, titel och konstnär
// hela kortet ska vara en länk till detaljsidan med verkets id i adressen

function ritaKort(konstverk) {
  const lista = document.getElementById("lista")

  lista.innerHTML = konstverk.map(verk => `
    <a class="kort" href="detalj.html?id=${verk.objectID}">
      <img src="${verk.primaryImageSmall}" alt="${verk.title}">
      <h2>${verk.title}</h2>
      <p>${verk.artistDisplayName || "Okänd konstnär"}</p>
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