import fetchForecastData from './modules/fetchForecastData.js'
import renderForecastData from './modules/renderForecastData.js'
import { setRefreshForecastTimeout} from './modules/refreshForecastTimeout.js'

export const submitFormController = async (event, domElements, store) => {
  event.preventDefault()

  const numOfDays = parseInt(domElements['numOfDaysInput'].value)
  const cityNameInput = domElements['cityInput'].value
  store.mutations.updateCurrentNumOfDays(numOfDays)
  store.mutations.updateCurrentCity(cityNameInput)

  const intervalId = store.getters.intervalId()
  if (intervalId) {
    window.clearTimeout(intervalId)
  }

  domElements['weatherInfoCard'].style.display = 'none'
  domElements['errorMessage'].style.display = 'none'
  try {
    const apiKey = store.getters.apiKey()
    const forecastData = await fetchForecastData(cityNameInput, apiKey)
    renderForecastData(forecastData, domElements, numOfDays)
    setRefreshForecastTimeout(
      store.mutations.updateIntervalId,
      fetchForecastData,
      renderForecastData,
      { cityNameInput, apiKey },
      { domElements, numOfDays }
    )
  } catch(error) {
    console.log(error.message, "error caught")
    domElements['errorMessage'].innerText = error.message.toUpperCase() + '.'
    domElements['errorMessage'].style.display = 'block'
    store.mutations.updateIntervalId(null)
    store.mutations.updateCurrentCity(null)
    store.mutations.updateCurrentNumOfDays(1)
  }
}