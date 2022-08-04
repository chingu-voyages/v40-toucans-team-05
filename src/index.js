const apiKey = "b92f6c8cab2bec8789ee1cca2ee645cc"

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
/*let weather = {
  apikey: "b92f6c8cab2bec8789ee1cca2ee645cc",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
  },
}*/
