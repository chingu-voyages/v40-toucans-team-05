const apiKey = process.env.API_KEY

async function fetchCity(city) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey
  const response = await fetch(apiUrl)
  const weather = await response.json()
  return weather
}
