const apiKey = process.env.API_KEY

// Elements

const searchButton = document.querySelector(".search-btn")
const inputBar = document.querySelector(".search-bar")
const errorBar = document.getElementById("error-bar")
const errorText = document.getElementById("error-text")
const errorClose = document.getElementById("error-close")

// Listeners

searchButton.addEventListener("click", async () => {
  await fetchCity(inputBar.value)
  clearInput()
})

inputBar.addEventListener("keydown", ({ key }) => {
  if (key == "Enter") {
    fetchCity(inputBar.value)
    clearInput()
  }
})
// function to display user input.
/*document.querySelector("keydown", async ({ key }) => {
  if (key.toLocalLowerCase() == "enter" && inputBar.value.length > 0) {
    await fetchCity(inputBar.value)
    clearInput()
  }
})*/
async function displayWeather(data) {
  const {
    name,
    weather,
    main: { humidity, temp },
    wind: { speed },
  } = data
  const celcius = Math.round(temp - 273.15)
  const { icon, description } = weather[0]

  console.log(name, temp, humidity, icon, description, speed)
  document.querySelector(".city").innerText = `Weather in ${name}`
  document.querySelector(
    ".icon"
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  document.querySelector(".description").innerText = description
  document.querySelector(".temperature").innerText = `${celcius}°C`
  document.querySelector(".humidity").innerText = `Humidity ${humidity} %`
  document.querySelector(".wind-speed").innerText = `wind speed ${speed}km`
}

errorClose.onclick = () => {
  errorText.innerText = ""
  errorBar.classList.remove("show")
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
      console.log(data)
      displayWeather(data)
    } else {
      errorBar.classList.add("show")
      errorText.innerText += "Error: " + data.message
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

const clearInput = () => (inputBar.value = "")
