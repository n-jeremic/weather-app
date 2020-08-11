export default getAllDomElements()

function getAllDomElements() {
  const body = document.querySelector('body')
  const form = document.querySelector('form')
  const numOfDaysInput = document.getElementById('numOfDaysInput')
  const cityInput = document.getElementById('cityInput')
  const weatherInfoCard = document.getElementById('weatherInfoCard')
  const errorMessage = document.getElementById('errorMessage')
  const cityName = document.getElementById('cityName')
  const currentWeatherImg = document.getElementById('currentWeatherImg')
  const currentWeatherDescription = document.getElementById('currentWeatherDescription')
  const currTempField = document.getElementById('currTempField')
  const currHumidityField = document.getElementById('currHumidityField')
  const currPressureField = document.getElementById('currPressureField')
  const currWindField = document.getElementById('currWindField')
  const currentDay = document.getElementById('currentDay')
  const removeFromFavouritesBtn = document.getElementById('removeFromFavouritesBtn')
  const addToFavouritesBtn = document.getElementById('addToFavouritesBtn')
  const forecastTable = document.getElementById('forecastTable')
  const numOfDaysSelected = document.getElementById('numOfDaysSelected')
  const tableBody = document.getElementById('tableBody')
  const favCities = document.getElementById('favCities')

  return {
    body,
    form,
    numOfDaysInput,
    cityInput,
    weatherInfoCard,
    errorMessage,
    cityName,
    currentWeatherImg,
    currentWeatherDescription,
    currTempField,
    currHumidityField,
    currPressureField,
    currWindField,
    currentDay,
    removeFromFavouritesBtn,
    addToFavouritesBtn,
    forecastTable,
    numOfDaysSelected,
    tableBody,
    favCities
  }
}