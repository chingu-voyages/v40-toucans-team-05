const apiKey = process.env.API_KEY
const storageKey = "weather-app--last-search"
const KELVIN_TO_CELSIUS_CONSTANT = 273.15

// Elements

const searchButton = document.querySelector(".search-btn")
const inputBar = document.querySelector(".search-bar")
const errorBar = document.getElementById("error-bar")
const errorText = document.getElementById("error-text")
const errorClose = document.getElementById("error-close")
const windSpeed = document.querySelector(".wind-speed-figure")
const humid = document.querySelector(".humidity-amount")

// Listeners

window.onload = () => {
  const cityFromStorage = getFromStorage()
  if (cityFromStorage) {
    fetchCity(cityFromStorage)
  }
  return undefined
}

searchButton.onclick = async () => {
  await fetchCity(inputBar.value)
  clearInput()
}

inputBar.onkeydown = ({ key }) => {
  if (key == "Enter") {
    fetchCity(inputBar.value)
    clearInput()
  }
}

errorClose.onclick = () => {
  errorText.innerText = ""
  errorBar.classList.remove("show")
}

async function displayWeather(data) {
  const {
    name,
    weather,
    main: { humidity, temp },
    wind: { speed },
  } = data
  const celcius = Math.round(temp - KELVIN_TO_CELSIUS_CONSTANT)
  const { icon, description } = weather[0]

  document.querySelector(".city").innerText = `Weather in ${name}`
  document.querySelector(
    ".icon"
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  document.querySelector(".description").innerText = description
  document.querySelector(".temperature").innerText = `${celcius}°C`
  windSpeed.innerText = `${speed}km/h`
  humid.innerText = `${humidity}%`
  document.querySelector(".information").classList.remove("loading")
  document.body.style.background = `linear-gradient(
    180deg,
    rgba(95, 182, 209, 0.8) 0%,
    rgba(66, 173, 207, 0.6) 58.85%,
    rgba(156, 209, 226, 0.4) 100%
  ),url(https://source.unsplash.com/1600x900/?${name})`
}

// Functions

async function fetchCity(city) {
  try {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.status === 200) {
      saveToStorage(city)
      displayWeather(data)
    } else {
      errorBar.classList.add("show")
      errorText.innerText = "Error: " + data.message
    }
  } catch (e) {
    console.log(e)
  }
}

function createWeatherImage(iconCode) {
  const img = document.createElement("img")
  img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  return img
}

const saveToStorage = (city) => localStorage.setItem(storageKey, city)
const getFromStorage = () => localStorage.getItem(storageKey)
const clearInput = () => (inputBar.value = "")
