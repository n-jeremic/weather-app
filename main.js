import { submitFormController } from './controllers.js'
import domElements from './modules/domElements.js'
import { store } from './modules/store.js'
import { checkFavouriteCities, addToFavourites, removeFromFavourites } from './modules/favourites.js'

// domElements['body'].addEventListener('load', () => {
//   checkFavouriteCities(domElements)
// })
checkFavouriteCities(domElements)

domElements['form'].addEventListener('submit', event => {
  submitFormController(event, domElements, store)
})

domElements['favCities'].addEventListener('change', event => {
  const cityName = event.target.value
  if (cityName !== 'null') {
    domElements['cityInput'].value = cityName
  } else {
    domElements['cityInput'].value = ''
  }
})

domElements['addToFavouritesBtn'].addEventListener('click', () => {
  addToFavourites(domElements, store.getters.currentCity)
})

domElements['removeFromFavouritesBtn'].addEventListener('click', () => {
  removeFromFavourites(domElements, store.getters.currentCity)
})