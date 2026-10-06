// jag vill läsa ut verkets nummer från adressfältet
// sen hämtar jag verket från Cleveland Museum of Art
// jag vill visa bild, titel, konstnär, år, teknik och mått
// jag vill visa ett meddelande om något går fel
// det gäller om numret saknas i adressen eller om verket inte finns

const API_URL = "https://openaccess-api.clevelandart.org/api/artworks"

function hamtaId() {
  const adress = new URLSearchParams(window.location.search)
  return adress.get("id")
}

async function hamtaVerk(id) {
  const svar = await fetch(`${API_URL}?accession_number=${id}`)

  if (!svar.ok) {
    throw new Error("Verket kunde inte hämtas")
  }

  const data = await svar.json()

  if (data.data.length === 0) {
    throw new Error("Verket finns inte")
  }

  return data.data[0]
}

// jag vill göra texten säker innan den läggs in i html
// annars kan citattecken i en titel förstöra koden

function gorSaker(text) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

// jag vill rita ut verket med bilden först och fakta under

function ritaVerk(verk) {
  const ruta = document.getElementById("verk")

  ruta.innerHTML = `
    <img class="storbild" src="${verk.images.web.url}" alt="${gorSaker(verk.title)}">
    <h1>${gorSaker(verk.title)}</h1>
    <p class="konstnar">${gorSaker(verk.creators[0]?.description || "Okänd konstnär")}</p>
    <dl class="fakta">
      <dt>År</dt>
      <dd>${gorSaker(verk.creation_date || "Okänt")}</dd>
      <dt>Teknik</dt>
      <dd>${gorSaker(verk.technique || "Okänd")}</dd>
      <dt>Mått</dt>
      <dd>${gorSaker(verk.measurements || "Okända")}</dd>
    </dl>
  `
}

// jag vill visa en text i stället för verket
// det används när numret saknas eller när något går fel

function visaFel(text) {
  const ruta = document.getElementById("verk")
  ruta.innerHTML = `<p class="fel">${text}</p>`
}

// jag vill starta sidan genom att hämta verket och sen rita ut det

async function start() {
  const id = hamtaId()

  if (!id) {
    visaFel("Hittade inget verk. Gå tillbaka och välj ett i samlingen.")
    return
  }

  try {
    const verk = await hamtaVerk(id)
    ritaVerk(verk)
  } catch {
    visaFel("Det gick inte att hämta verket. Försök igen om en stund.")
  }
}

start()