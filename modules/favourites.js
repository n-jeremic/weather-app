export { checkFavouriteCities, addToFavourites, removeFromFavourites }

function checkFavouriteCities(domElements) {
  const ls = localStorage.getItem('favouriteCities')
  domElements['favCities'].innerHTML = ''

  if (ls) {
    const lsParsed = JSON.parse(ls)
    let options = '<option value="null">Not selected</option>'
    lsParsed.forEach(city => {
      const cityName = city[0].toUpperCase() + city.slice(1)
      options += `<option value="${cityName}">${cityName}</option>`
    })
    domElements['favCities'].innerHTML = options
  } else {
    domElements['favCities'].innerHTML = '<option value="null">No favourite cities yet</option>'
  }
}

function addToFavourites(domElements, currentCityGetter) {
  const ls = localStorage.getItem('favouriteCities')
  const cityName = currentCityGetter().toLowerCase()
  if (ls) {
    const lsParsed = JSON.parse(ls)
    lsParsed.push(cityName)
    localStorage.setItem('favouriteCities', JSON.stringify(lsParsed))
  } else {
    localStorage.setItem('favouriteCities', JSON.stringify([cityName]))
  }

  domElements['addToFavouritesBtn'].style.display = 'none'
  domElements['removeFromFavouritesBtn'].style.display = 'inline-block'
  checkFavouriteCities(domElements)
}

function removeFromFavourites(domElements, currentCityGetter) {
  const cityName = currentCityGetter().toLowerCase()
  const lsParsed = JSON.parse(localStorage.getItem('favouriteCities'))

  const index = lsParsed.findIndex(city => city === cityName)
  lsParsed.splice(index, 1)

  if (lsParsed.length) {
    localStorage.setItem('favouriteCities', JSON.stringify(lsParsed))
  } else {
    localStorage.removeItem('favouriteCities')
  }

  domElements['removeFromFavouritesBtn'].style.display = 'none'
  domElements['addToFavouritesBtn'].style.display = 'inline-block'
  checkFavouriteCities(domElements)
}