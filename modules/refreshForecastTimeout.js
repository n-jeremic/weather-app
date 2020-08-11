export const setRefreshForecastTimeout = (
  updateIntervalIdMutation,
  getForecastDataFn,
  renderForecastFn,
  getForecastDataParams,
  renderForecastParams
) => {
  const intervalId = window.setTimeout(async () => {
    const { cityNameInput, apiKey } = getForecastDataParams
    try {
      const forecastData = await getForecastDataFn(cityNameInput, apiKey)
      const { domElements, numOfDays } = renderForecastParams
      renderForecastFn(forecastData, domElements, numOfDays)
      setRefreshForecastTimeout(updateIntervalIdMutation, getForecastDataFn, renderForecastFn, getForecastDataParams, renderForecastParams)
    } catch(error) {
      console.log(error.message, "error caught in timeout")
      domElements['errorMessage'].innerText = error.message.toUpperCase() + '.'
      domElements['errorMessage'].style.display = 'block'
      store.mutations.updateIntervalId(null)
      store.mutations.updateCurrentCity(null)
      store.mutations.updateCurrentNumOfDays(1)
    }
  }, 2000)

  updateIntervalIdMutation(intervalId)
}