// CREO LE CARD

const row = document.getElementById('card-container')

const createCards = function () {
  row.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm h-100">
    <div class="h-75">
    <a class="link-details">
    <img src="https://picsum.photos/id/237/300/200"
    class="bd-placeholder-img card-img-top img-fluid card-img-fixed"
    /> </a>
    </div>
    <div class="card-body d-flex flex-column justify-content-between h-100 mt-3">
    <h5 class="card-title">Lorem Ipsum</h5>
    <p class="card-text flex-grow-1">
    This is a wider card with supporting text below as a natural
    lead-in to additional content. This content is a little bit
    longer.
    </p>
    <div class="d-flex justify-content-between align-items-center">
    <div class="btn-group">
    <button
    type="button"
    class="btn btn-sm btn-outline-secondary view"
    data-bs-toggle="modal"
    data-bs-target="#card-modal"
    >
    View
    </button>
    <button
    type="button"
    class="btn btn-sm btn-outline-secondary hide"
    >
    Hide
    </button>
    </div>
    <small class="text-muted">9 mins</small>
    </div>
    </div>
    </div>
    </div>
    `
}

for (let i = 0; i < 9; i++) {
  createCards()
}

// MANIPOLO IL CONTENUTO DELLE CARD CON I BOTTONI E I FORM

let cardsImg

const genericURL = 'https://api.pexels.com/v1/search?page=2&per_page=9&query='

const hamstersButton = document.getElementById('hamsters-img')
const tigersButton = document.getElementById('tigers-img')
const form = document.getElementById('search-photos')
const searchInput = document.getElementById('search-photos-input')

hamstersButton.addEventListener('click', () => {
  cardsImg = document.querySelectorAll('.card img')
  getPhotos('hamster')
})

tigersButton.addEventListener('click', () => {
  cardsImg = document.querySelectorAll('.card img')
  getPhotos('tigers')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  cardsImg = document.querySelectorAll('.card img')
  const search = searchInput.value
  getPhotos(search)

  form.reset()
})

// MODIFICO ANCHE DESCRIZIONE E TITOLO
const id = document.getElementsByTagName('small')
const photographer = document.getElementsByClassName('card-title')
const description = document.getElementsByClassName('card-text')

// TASTO HIDE
const hideButton = document.getElementsByClassName('hide')
for (let i = 0; i < hideButton.length; i++) {
  hideButton[i].addEventListener('click', (e) => {
    const selBut = e.target
    const cardSel = selBut.closest('.col-md-4')
    cardSel.remove()
  })
}

// TASTO VIEW
const modalTitle = document.getElementById('modal-photographer')
const modalImg = document.getElementById('modal-img')

const viewButton = document.getElementsByClassName('view')
for (let i = 0; i < viewButton.length; i++) {
  viewButton[i].addEventListener('click', (e) => {
    const selBut = e.target
    const cardSel = selBut.closest('.col-md-4')
    const photographer = cardSel.querySelector('.card-title').innerText
    const linkImg = cardSel.querySelector('.card img').getAttribute('src')
    // console.log(linkImg)
    modalImg.setAttribute('src', linkImg)
    modalTitle.innerText = photographer
  })
}

// LINK ALLA PAGINA DETTAGLI
const linkDetails = document.getElementsByClassName('link-details')

const getPhotos = function (photoType) {
  fetch(genericURL + photoType, {
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
      // console.log(data.photos[0].src.original)
      /* data.photos.forEach((link) => {
        // console.log(link.src.original)
      }) */
      for (let i = 0; i < cardsImg.length; i++) {
        cardsImg[i].setAttribute('src', data.photos[i].src.original)
        id[i].innerText = 'ID: ' + data.photos[i].id
        photographer[i].innerText = 'ph. ' + data.photos[i].photographer
        description[i].innerText = data.photos[i].alt

        linkDetails[i].setAttribute(
          'href',
          'details.html?photoID=' + data.photos[i].id
        )
      }
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}
