// IL COLORE HO TROVATO COME FARLO MA NON HO CAPITO MOLTO

const imgDet = document.getElementById('img-details')

const img = document.getElementById('img-details')
const canvas = document.getElementById('imgCanvas')
const ctx = canvas.getContext('2d')

img.crossOrigin = 'Anonymous'

img.onload = function () {
  canvas.width = img.width
  canvas.height = img.height

  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  let r = 0,
    g = 0,
    b = 0
  const pixelCount = data.length / 4

  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  const avgR = Math.round(r / pixelCount)
  const avgG = Math.round(g / pixelCount)
  const avgB = Math.round(b / pixelCount)

  const averageColor = `rgb(${avgR}, ${avgG}, ${avgB})`

  console.log('Colore medio:', averageColor)

  document.body.style.backgroundColor = averageColor
}

// FINE COLORE SFONDO

const url = location.search
// console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('photoID')
// console.log('ID', id)

const genericURL = 'https://api.pexels.com/v1/photos/'

const titleDet = document.getElementById('details-title')
const textDet = document.getElementById('details-text')
const descriptionDet = document.getElementById('details-description')
const linkDet = document.getElementById('link-photographer')

const getPhoto = function () {
  fetch(genericURL + id, {
    headers: {
      Authorization: 'BFOJrwqQl74rQUSv1hLlvBgvlyRtfnfPrr1382phPvGDtGSYa2GrHZSc',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('ERRORE NELLA RISPOSTA')
      }
    })
    .then((data) => {
      console.log('DATI: ', data)
      imgDet.setAttribute('src', data.src.original)
      titleDet.innerText = data.photographer
      textDet.innerText = data.photographer_url
      descriptionDet.innerText = data.alt
      linkDet.setAttribute('href', data.photographer_url)
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}

getPhoto()
