// jag vill läsa ut id-numret från adressfältet
// sen hämtar jag verket från Metropolitan Museum of Art
// jag vill visa bild, titel, konstnär, år, teknik och mått
// jag vill visa ett tydligt meddelande om något går fel
// det gäller om id saknas i adressen eller om verket inte finns

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1"

function hamtaId() {
  const adress = new URLSearchParams(window.location.search)
  return adress.get("id")
}

async function hamtaVerk(id) {
  const svar = await fetch(`${API_URL}/objects/${id}`)

  if (!svar.ok) {
    throw new Error("Verket kunde inte hämtas")
  }

  return await svar.json()
}

// jag vill rita ut verket med bilden först och fakta under

function ritaVerk(verk) {
  const ruta = document.getElementById("verk")

  ruta.innerHTML = `
    <img class="storbild" src="${verk.primaryImageSmall}" alt="${verk.title}">
    <h1>${verk.title}</h1>
    <p class="konstnar">${verk.artistDisplayName || "Okänd konstnär"}</p>
    <dl class="fakta">
      <dt>År</dt>
      <dd>${verk.objectDate || "Okänt"}</dd>
      <dt>Teknik</dt>
      <dd>${verk.medium || "Okänd"}</dd>
      <dt>Mått</dt>
      <dd>${verk.dimensions || "Okända"}</dd>
    </dl>
  `
}

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