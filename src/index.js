const apiKey = process.env.API_KEY
const searchButton = document.querySelector(".search-btn")
const inputBar = document.querySelector(".search-bar") 
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

searchButton.addEventListener("click", function(){
  fetchCity(inputBar.value)
})

