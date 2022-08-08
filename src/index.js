const apiKey = process.env.API_KEY

// Elements

const searchButton = document.querySelector(".search-btn")
const inputBar = document.querySelector(".search-bar")

// Listeners

searchButton.addEventListener("click", async () => {
  await fetchCity(inputBar.value)
  clearInput()
})

document.addEventListener("keydown", async ({ key }) => {
  if (key.toLocaleLowerCase() === "enter" && inputBar.value.length > 0) {
    await fetchCity(inputBar.value)
    clearInput()
  }
})

// Functions

async function fetchCity(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey
  const response = await fetch(apiUrl)
  const weather = await response.json()
  console.log(weather)
}

const clearInput = () => (inputBar.value = "")
