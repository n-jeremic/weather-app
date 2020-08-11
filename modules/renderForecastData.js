export default function (forecastData, domElements, numOfDays) {
  const currentWeatherObj = forecastData.current
  domElements['cityName'].innerText = forecastData.city
  domElements['currentWeatherImg'].setAttribute('src', `http://openweathermap.org/img/wn/${currentWeatherObj.weather[0].icon}@2x.png`)
  domElements['currentWeatherDescription'].innerText = `(${currentWeatherObj.weather[0].main})`
  domElements['currTempField'].value = `${formatTempNumber(currentWeatherObj.temp)} C`
  domElements['currHumidityField'].value = `${currentWeatherObj.humidity} %`
  domElements['currPressureField'].value = `${currentWeatherObj.pressure} mbar`
  domElements['currWindField'].value = `${currentWeatherObj.wind_speed} km/h`
  domElements['currentDay'].innerText = getDayOfTheWeek(new Date().getDay())
  
  const isLiked = checkCityInFavourites(forecastData.city)
  if (isLiked) {
    domElements['removeFromFavouritesBtn'].style.display = 'inline-block'
    domElements['addToFavouritesBtn'].style.display = 'none'
  } else {
    domElements['removeFromFavouritesBtn'].style.display = 'none'
    domElements['addToFavouritesBtn'].style.display = 'inline-block'
  }


  if (numOfDays > 1) {
    generateForecastTable(domElements, forecastData.daily, numOfDays)
  } else {
    domElements['forecastTable'].style.display = 'none'
  }

  domElements['weatherInfoCard'].style.display = 'block'
}

function generateForecastTable(domElements, daysArray, numOfDays) {
  let numOfDaysString
  if (numOfDays > 2) {
    numOfDaysString = `Next ${numOfDays - 1} days`
  } else {
    numOfDaysString = `Next day`
  }
  domElements['numOfDaysSelected'].innerText = numOfDaysString

  domElements['tableBody'].innerHTML = ''
  let rows = ''
  const currentDayInt = new Date().getDay()
  for (let i = 0; i < numOfDays - 1; i++) {
    const currentWeatherObj = daysArray[i]
    rows += `<tr>
      <th scope="row">${getDayOfTheWeek(currentDayInt + 1 + i)}</th>
      <td><img width="30px" src="http://openweathermap.org/img/wn/${currentWeatherObj.weather[0].icon}@2x.png">${currentWeatherObj.weather[0].description}</td>
      <td>${formatTempNumber(currentWeatherObj.temp.day)} C</td>
      <td>${currentWeatherObj.humidity} %</td>
      <td>${currentWeatherObj.pressure} mbar</td>
      <td>${currentWeatherObj.wind_speed} km/h</td>
    </tr>`
  }

  domElements['tableBody'].innerHTML = rows
  domElements['forecastTable'].style.display = 'block'
}

function checkCityInFavourites(cityName) {
  const ls = localStorage.getItem('favouriteCities')
  if (!ls) {
    return false
  }

  const lsParsed = JSON.parse(ls)

  if (lsParsed.includes(cityName.toLowerCase())) {
    return true
  } else {
    return false
  }
}

function formatTempNumber(number) {
  return Math.round(number / 10)
}

function getDayOfTheWeek(dayInt) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const numOfDays = days.length

  if (dayInt > numOfDays - 1) return days[dayInt - numOfDays]
  else return days[dayInt]
}