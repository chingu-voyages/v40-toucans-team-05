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

inputBar.addEventListener("keydown", ({key}) => {
  if (key == "Enter") {
    fetchCity(inputBar.value)
    clearInput()
  }
})

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
