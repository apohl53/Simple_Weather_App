// Get DOM elements
const cityInput = document.querySelector('input[type="text"]');
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.querySelector(".location-btn");
const currentWeather = document.querySelector(".current-weather");
const daysForecast = document.querySelector(".days-forecast");
const apiKey = "3acc16ffae9e45df92a064e41646355f";

function displayForecast(forecastData) {
  // Display forecast
  console.log("forecast", forecastData);
}

function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayForecast(data);
    });
}

function getCoordinates(city) {
  const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(geocodingApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { lat, lon } = data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      getForecast(lat, lon);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayCurrent(currentData) {
  weatherDisplay.insertAdjacentHTML(
    "beforeend",
    `
  <div>
    <h2>${currentData.name}</h2>
    <p>${currentData.main.temp}&deg; F</p>
  </div>
`
  );

  getForecast(currentData.coord);
}

function getCurrentWeather() {
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((res) => res.json())
    .then(displayCurrent);
}

searchBtn.addEventListener("click", () => {
  console.log(cityInput.value);
  getCoordinates(cityInput.value);
});
