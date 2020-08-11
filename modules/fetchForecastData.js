export default async (cityName, apiKey) => {
  const currentWeatherData = await handlePromise(fetchCurrentWeatherData(cityName, apiKey))
  const coordinatesObj = currentWeatherData.coord

  const completeWeatherData = await handlePromise(fetchCompleteWeatherData(coordinatesObj, apiKey))
  completeWeatherData.city = currentWeatherData.name
  
  console.log('data fetched for ' + completeWeatherData.city.toUpperCase())
  return completeWeatherData
}

function fetchCurrentWeatherData(cityName, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
}

function fetchCompleteWeatherData({ lat, lon }, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
  exclude=minutely,hourly&appid=${apiKey}`)
}

async function handlePromise(promise) {
  const response = await promise
  const jsonFormat = await response.json()

  if (response.status === 200) {
    return jsonFormat
  } else {
    throw new Error(jsonFormat.message)
  }
}